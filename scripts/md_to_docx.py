#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
MD 기획서 -> 지정 양식 docx 변환기.

동작:
  1) MD 전처리: frontmatter 제거, 첫 H1 앞 내용 절단, 헤딩 한국 공문서 번호 제거
     (Word 자동 번호에 위임), 임베드 ![[파일#^블록]] 실제 내용 평탄화, 위키링크 [[ ]]
     표시 텍스트만 남김.
  2) pandoc: 전처리 MD -> 본문 content.docx (--reference-doc 로 양식 스타일 승계).
  3) 조립: 양식 docx 패키지를 베이스로, word/document.xml 을
     [양식 앞부분(표지/버전/목차) + 섹션 나누기] + [pandoc 본문] + [양식 최종 sectPr]
     로 교체. styles.xml 은 pandoc 상위집합으로, numbering.xml 은 양식+pandoc 병합으로 교체.
     푸터(페이지 -1- 부터), 페이지 설정, 표지 서식은 양식 그대로 보존.

사용법:
  python scripts/md_to_docx.py <입력.md> [출력.docx]

의존성: pandoc (PATH 또는 winget 경로), Python 표준 라이브러리만 사용.
"""

import sys
import os
import re
import glob
import shutil
import zipfile
import tempfile
import subprocess

# ---------------------------------------------------------------------------
# 경로
# ---------------------------------------------------------------------------

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
VAULT = os.path.dirname(SCRIPT_DIR)  # scripts/ 의 상위 = vault root
TEMPLATE = os.path.join(
    VAULT, "assets", "무형문화유산 전승_기획서 양식_ver.0.0.0_20260702.docx"
)


def fail(msg):
    print("[오류] " + msg, file=sys.stderr)
    sys.exit(1)


def find_pandoc():
    """PATH 우선, 없으면 winget 설치 경로 탐색."""
    if shutil.which("pandoc"):
        return "pandoc"
    winget = os.path.join(
        os.environ.get("LOCALAPPDATA", ""),
        "Microsoft", "WinGet", "Packages",
    )
    if os.path.isdir(winget):
        for d in os.listdir(winget):
            if d.startswith("JohnMacFarlane.Pandoc"):
                hits = glob.glob(os.path.join(winget, d, "pandoc-*", "pandoc.exe"))
                if hits:
                    return hits[0]
    for c in [
        os.path.join(os.environ.get("ProgramFiles", ""), "Pandoc", "pandoc.exe"),
        "/usr/bin/pandoc", "/usr/local/bin/pandoc",
    ]:
        if c and os.path.isfile(c):
            return c
    fail("pandoc 을 찾을 수 없음. winget install --id JohnMacFarlane.Pandoc 후 재시도.")


# ---------------------------------------------------------------------------
# MD 전처리
# ---------------------------------------------------------------------------

def strip_frontmatter(text):
    """맨 앞 YAML frontmatter(--- ... ---) 제거."""
    if text.startswith("---"):
        m = re.match(r"^---\r?\n.*?\r?\n---\r?\n", text, re.S)
        if m:
            return text[m.end():]
    return text


def cut_before_first_h1(text):
    """첫 번째 H1(# ) 앞 내용(TL;DR 등) 절단. 첫 H1부터 옮김."""
    lines = text.split("\n")
    for i, ln in enumerate(lines):
        if re.match(r"^#\s+\S", ln):
            return "\n".join(lines[i:])
    return text  # H1 없으면 원문 유지


def drop_h1_sections(text, numbers):
    """지정한 번호의 H1 절(# N. …)을 통째로 제거. numbers 예: {'11','12','13'}."""
    if not numbers:
        return text
    out = []
    skip = False
    for ln in text.split("\n"):
        if re.match(r"^#\s+\S", ln):  # H1 경계마다 skip 재판정
            m = re.match(r"^#\s+(\d+)\.\s", ln)
            skip = bool(m and m.group(1) in numbers)
        if not skip:
            out.append(ln)
    return "\n".join(out)


def drop_excluded_refs(text, numbers):
    """제외 절을 가리키는 댕글링 참조 정리(변환 시에만, 소스 MD 불변).

    (1) 문서맵 표에서 첫 셀이 제외 절인 행(`| §N …`) 삭제.
    (2) 줄 끝 괄호절에 제외 절 §참조가 들어 있으면 그 괄호절 삭제.
        예: `…정함(예시는 §13.다 8) 실패 안내)` -> `…정함`.
        괄호절 안 한글 서수의 `8)` 닫는 괄호와 충돌하지 않게 줄 끝(`$`)에만 적용.
    """
    if not numbers:
        return text
    alt = "|".join(sorted(numbers, key=len, reverse=True))
    row_re = re.compile(r"^\s*\|\s*§(?:" + alt + r")(?![0-9])\b")
    paren_re = re.compile(r"\s*\([^(]*§(?:" + alt + r")(?![0-9])[^(]*\)\s*$")
    out = []
    for ln in text.split("\n"):
        if row_re.match(ln):
            continue
        ln = paren_re.sub("", ln)
        out.append(ln)
    return "\n".join(out)


# 레벨별 한국 공문서 헤딩 번호 접두 패턴 (선행 토큰만)
# H1~H4는 리터럴 번호를 떼어 Word 멀티레벨 헤딩 자동번호(제목 1~4)에 위임함.
# H5(제목 5)는 양식에서 무번호 레벨(ilvl 4)이라 여기서 처리하지 않고, 접두를 남겨 수동 번호로 렌더됨.
_HEAD_NUM = {
    1: re.compile(r"^\d+\.\s+"),        # 1. 개요
    2: re.compile(r"^[가-힣]\.\s+"),     # 가. 세션 정의
    3: re.compile(r"^\d+\)\s+"),        # 1) Step 1. 인트로  (뒤 'Step 1.' 은 보존)
    4: re.compile(r"^[가-힣]\)\s+"),     # 가) 역할과 목적  (번호 떼고 Word 자동번호에 위임)
}


def strip_heading_numbers(text):
    """헤딩의 한국 공문서 번호 접두만 제거. 본문 속 숫자는 건드리지 않음."""
    out = []
    for ln in text.split("\n"):
        m = re.match(r"^(#{1,6})\s+(.*)$", ln)
        if m:
            level = len(m.group(1))
            title = m.group(2)
            pat = _HEAD_NUM.get(level)
            if pat:
                title = pat.sub("", title, count=1)
            out.append(m.group(1) + " " + title)
        else:
            out.append(ln)
    return "\n".join(out)


# ---------------------------------------------------------------------------
# 임베드 평탄화 (블록 ID)
# ---------------------------------------------------------------------------

_MD_INDEX = None


def _build_md_index():
    global _MD_INDEX
    if _MD_INDEX is not None:
        return
    _MD_INDEX = {}
    for p in glob.glob(os.path.join(VAULT, "**", "*.md"), recursive=True):
        name = os.path.splitext(os.path.basename(p))[0]
        _MD_INDEX.setdefault(name, p)  # 첫 매치 우선


def _find_md(name):
    _build_md_index()
    return _MD_INDEX.get(name)


def _extract_block(lines, marker_idx):
    """marker_idx 는 '^id' 를 담은 줄. 그 위 블록(콜아웃/표/문단)을 추출."""
    # 마커가 줄 끝에 붙은 문단형(... ^id)인지, 독립 줄인지 판별
    marker_line = lines[marker_idx]
    if marker_line.strip().startswith("^"):
        i = marker_idx - 1
        while i >= 0 and lines[i].strip() == "":
            i -= 1
        end = i  # 블록 마지막 줄
    else:
        end = marker_idx  # 문단 끝에 붙음
    if end < 0:
        return ""
    probe = lines[end].lstrip()
    if probe.startswith(">"):
        kind = "quote"
    elif "|" in lines[end]:
        kind = "table"
    else:
        kind = "para"
    start = end
    while start - 1 >= 0:
        prev = lines[start - 1]
        if kind == "quote" and prev.lstrip().startswith(">"):
            start -= 1
        elif kind == "table" and "|" in prev:
            start -= 1
        elif kind == "para" and prev.strip() != "" and not prev.lstrip().startswith(">") and "|" not in prev:
            start -= 1
        else:
            break
    block = lines[start:end + 1]
    # 문단 끝에 붙은 ^id 제거
    block = [re.sub(r"\s*\^[A-Za-z0-9-]+\s*$", "", b) for b in block]
    return "\n".join(block)


def _flatten_callout(block):
    """콜아웃(> [!note] ...)을 일반 본문(진짜 불릿 리스트)으로 평탄화.

    인용블록(>)으로 두면 제목/문단/리스트 사이 빈 줄이 없어 pandoc이 한 문단으로
    뭉쳐 불릿이 풀림. 그래서 > 접두를 벗기고, 블록 종류(문단/불릿)가 바뀌는 경계에
    빈 줄을 넣어 리스트가 리스트로 렌더되게 함. 콜아웃이 아니면(표/문단) 원본 반환.
    """
    lines = block.split("\n")
    if not lines or not lines[0].lstrip().startswith(">"):
        return block  # 콜아웃 아님(표/문단 등)은 그대로

    # 1) 인용 접두(> ) 한 겹 제거 + 선행 탭을 4칸 공백으로(하위 불릿 들여쓰기 보존)
    stripped = []
    for ln in lines:
        m = re.match(r"^\s*>\s?(.*)$", ln)
        c = m.group(1) if m else ln
        c = re.sub(r"^\t+", lambda mm: "    " * len(mm.group(0)), c)
        stripped.append(c)

    # 2) 첫 줄 [!note] 제목 -> H3 헤딩(### ). 워드 제목 3 스타일로 매핑됨.
    m = re.match(r"^\[!\w+\]\s*(.*)$", stripped[0])
    title_present = bool(m)
    if m:
        t = m.group(1).strip()
        stripped[0] = ("### " + t) if t else ""

    # 3) 블록 경계에 빈 줄 삽입 (문단<->불릿 전환, 제목 뒤)
    def is_bullet(s):
        return bool(re.match(r"^\s*[-*+]\s", s))

    out = []
    for i, ln in enumerate(stripped):
        prev = out[-1] if out else ""
        if ln.strip() and prev.strip():
            change = is_bullet(ln) != is_bullet(prev)  # 문단<->불릿 전환
            after_title = (i == 1 and title_present)    # 제목 바로 뒤
            if (change or after_title) and prev.strip() != "":
                out.append("")
        out.append(ln)
    return "\n".join(out)


def resolve_embeds(text):
    """![[파일#^블록]] -> 대상 블록 실제 내용. (블록 ID 형만 처리, 그 외는 경고 후 잔류)"""
    warned = []

    def repl(m):
        target, block_id = m.group(1).strip(), m.group(2).strip()
        path = _find_md(target)
        if not path:
            warned.append("파일 없음: " + target)
            return m.group(0)
        with open(path, encoding="utf-8") as f:
            tlines = f.read().split("\n")
        idx = None
        for i, ln in enumerate(tlines):
            if re.search(r"\^" + re.escape(block_id) + r"\s*$", ln):
                idx = i
                break
        if idx is None:
            warned.append("블록 없음: " + target + "#^" + block_id)
            return m.group(0)
        blk = _extract_block(tlines, idx)
        blk = _flatten_callout(blk)
        return "\n\n" + blk + "\n\n"

    # 블록 ID 임베드
    text = re.sub(r"!\[\[([^\]#|]+)#\^([A-Za-z0-9-]+)\]\]", repl, text)
    # 남은 임베드(헤딩/전체 파일형) 경고
    for m in re.finditer(r"!\[\[([^\]]+)\]\]", text):
        warned.append("미평탄화 임베드(블록ID 아님): " + m.group(1))
    for w in warned:
        print("[경고] " + w, file=sys.stderr)
    return text


# ---------------------------------------------------------------------------
# 위키링크 -> 표시 텍스트
# ---------------------------------------------------------------------------

def strip_wikilinks(text):
    def repl(m):
        target, anchor, alias = m.group(1), m.group(2), m.group(3)
        if alias:
            return alias.strip()
        if target and target.strip():
            return target.strip()
        return (anchor or "").strip()  # [[#anchor]] 자기참조
    return re.sub(
        r"\[\[([^\]\|#]*)(?:#([^\]\|]+))?(?:\|([^\]]+))?\]\]", repl, text
    )


# ---------------------------------------------------------------------------
# § 상호참조 번호 변환 (한글 공문서 -> Word 십진 다단계)
# ---------------------------------------------------------------------------

# H2 서수 글자 -> 십진. [가-하] 범위는 수천 음절을 포함하므로 14자만 명시.
_SEC_H2 = {c: str(i + 1) for i, c in enumerate("가나다라마바사아자차카타파하")}
# §N.<서수>  또는  §N.<서수> <한자리>)  형태 (H3 색인은 한 자리로 제한해 오탐 축소)
_SEC_RE = re.compile(
    r"§(\d+)\.([가나다라마바사아자차카타파하])(?:\s+(\d)\)?)?"
)


def convert_section_refs(text):
    """§4.가 -> §4.1, §3.다 4) -> §3.3.4 (Word 십진 다단계에 맞춤).

    Word 제목 번호는 H1=4, H2=4.1, H3=4.1.3 형식(템플릿 numbering 확인).
    범위 표기(~라)나 두 자리 이상 색인은 건드리지 않음(엣지, 스킵).
    """
    def repl(m):
        s = "§" + m.group(1) + "." + _SEC_H2[m.group(2)]
        if m.group(3):
            s += "." + m.group(3)
        return s
    return _SEC_RE.sub(repl, text)


def flatten_native_callouts(text):
    """문서 자체 본문의 > [!note] 콜아웃을 평탄화(임베드 아닌 원본 콜아웃 대상).

    임베드된 콜아웃은 resolve_embeds 에서 이미 평탄화됨. 소스 문서(공통 사양 등)를
    직접 변환할 때는 자체 콜아웃도 같은 방식(제목 H3 + 불릿)으로 풀어야 함.
    """
    lines = text.split("\n")
    out = []
    i, n = 0, len(lines)
    while i < n:
        if re.match(r"^\s*>\s*\[!\w+\]", lines[i]):
            j = i
            block = []
            while j < n and lines[j].lstrip().startswith(">"):
                block.append(lines[j])
                j += 1
            out.append("")
            out.append(_flatten_callout("\n".join(block)))
            out.append("")
            i = j
        else:
            out.append(lines[i])
            i += 1
    return "\n".join(out)


def strip_block_ids(text):
    """Obsidian 블록 ID 마커 제거: 독립 줄 `^id` 와 문단 끝 ` ^id`."""
    out = []
    for ln in text.split("\n"):
        if re.match(r"^\s*\^[A-Za-z0-9_-]+\s*$", ln):
            continue  # 독립 블록 ID 줄
        ln = re.sub(r"\s+\^[A-Za-z0-9_-]+\s*$", "", ln)  # 문단 끝 블록 ID
        out.append(ln)
    return "\n".join(out)


def preprocess(md_path, exclude=None):
    with open(md_path, encoding="utf-8") as f:
        text = f.read()
    text = strip_frontmatter(text)
    text = cut_before_first_h1(text)
    text = drop_h1_sections(text, exclude)   # 제외 절 제거(임베드 처리 전)
    text = drop_excluded_refs(text, exclude)  # 제외 절 댕글링 참조 정리
    text = resolve_embeds(text)              # 임베드 평탄화 (![[ ]])
    text = flatten_native_callouts(text)     # 자체 콜아웃 평탄화 (> [!note])
    text = strip_block_ids(text)             # 블록 ID 마커 제거 (^id)
    text = strip_wikilinks(text)             # 위키링크 표시텍스트화 ([[ ]])
    text = convert_section_refs(text)        # § 참조 번호 십진화
    text = strip_heading_numbers(text)
    return text


# ---------------------------------------------------------------------------
# docx 조립
# ---------------------------------------------------------------------------

def merge_numbering(tpl_num, pan_num):
    """양식 numbering + pandoc 리스트 numbering 병합 (ID 충돌 없음 전제)."""
    pan_abs = re.findall(r"<w:abstractNum\b.*?</w:abstractNum>", pan_num, re.S)
    pan_nums = re.findall(r"<w:num\s.*?</w:num>", pan_num, re.S)
    merged = tpl_num
    # abstractNum 은 첫 <w:num 앞에 삽입
    first_num = re.search(r"<w:num\s", merged)
    ins = first_num.start() if first_num else merged.find("</w:numbering>")
    merged = merged[:ins] + "".join(pan_abs) + merged[ins:]
    # num 은 </w:numbering> 앞에 삽입
    close = merged.rfind("</w:numbering>")
    merged = merged[:close] + "".join(pan_nums) + merged[close:]
    return merged


def assemble(content_docx, out_docx):
    with zipfile.ZipFile(TEMPLATE) as z:
        names = z.namelist()
        datas = {n: z.read(n) for n in names}
    tpl_doc = datas["word/document.xml"].decode("utf-8")
    tpl_num = datas["word/numbering.xml"].decode("utf-8")

    with zipfile.ZipFile(content_docx) as z:
        pan_doc = z.read("word/document.xml").decode("utf-8")
        pan_styles = z.read("word/styles.xml")
        pan_num = z.read("word/numbering.xml").decode("utf-8")

    # 양식 앞부분: 첫 <w:sectPr(섹션 나누기)를 담은 문단 끝까지.
    # 단, 그 문단이 목차 <w:sdt> 안 마지막 문단이면 sdt 닫는 태그까지 포함해야
    # 함(안 그러면 sdt 미닫힘으로 XML 깨짐).
    first_sect = tpl_doc.find("<w:sectPr")
    if first_sect < 0:
        fail("양식에서 섹션 나누기(sectPr)를 찾지 못함")
    head_end = tpl_doc.find("</w:p>", first_sect) + len("</w:p>")
    closer = re.match(r"\s*(?:</w:sdtContent>\s*</w:sdt>\s*)*", tpl_doc[head_end:])
    head_end += closer.end()
    head = tpl_doc[:head_end]
    # 양식 최종 sectPr(본문 섹션 = 페이지 -1- 설정)
    last_sect = tpl_doc.rfind("<w:sectPr")
    tail = tpl_doc[last_sect:]

    # pandoc 본문: <w:body> 다음 ~ pandoc 자체 최종 sectPr 앞
    pb = pan_doc.find("<w:body>") + len("<w:body>")
    pan_last_sect = pan_doc.rfind("<w:sectPr")
    body = pan_doc[pb:pan_last_sect]

    # pandoc 본문이 새 관계(rId: 이미지/하이퍼링크)를 참조하면 경고 (양식 rels 와 어긋날 위험)
    rels = re.findall(r'r:(?:id|embed)="([^"]+)"', body)
    if rels:
        print("[경고] pandoc 본문에 관계 참조 %d건: %s (rels 병합 필요할 수 있음)"
              % (len(rels), sorted(set(rels))), file=sys.stderr)

    new_doc = head + body + tail
    datas["word/document.xml"] = new_doc.encode("utf-8")
    datas["word/styles.xml"] = pan_styles
    datas["word/numbering.xml"] = merge_numbering(tpl_num, pan_num).encode("utf-8")

    with zipfile.ZipFile(out_docx, "w", zipfile.ZIP_DEFLATED) as z:
        for n in names:
            z.writestr(n, datas[n])


# ---------------------------------------------------------------------------
# main
# ---------------------------------------------------------------------------

def main():
    # --exclude "11,12,13" : 해당 번호의 H1 절 제외
    argv = sys.argv[1:]
    exclude = set()
    rest = []
    i = 0
    while i < len(argv):
        a = argv[i]
        if a == "--exclude" and i + 1 < len(argv):
            exclude = {t.strip() for t in argv[i + 1].split(",") if t.strip()}
            i += 2
        elif a.startswith("--exclude="):
            exclude = {t.strip() for t in a.split("=", 1)[1].split(",") if t.strip()}
            i += 1
        else:
            rest.append(a)
            i += 1

    if not rest:
        fail("사용법: python scripts/md_to_docx.py <입력.md> [출력.docx] [--exclude 11,12,13]")
    md_path = os.path.abspath(rest[0])
    if not os.path.isfile(md_path):
        fail("입력 파일 없음: " + md_path)
    if not os.path.isfile(TEMPLATE):
        fail("양식 파일 없음: " + TEMPLATE)

    base = os.path.splitext(os.path.basename(md_path))[0]
    if len(rest) >= 2:
        out_docx = os.path.abspath(rest[1])
    else:
        export_dir = os.path.join(VAULT, "export")
        os.makedirs(export_dir, exist_ok=True)
        out_docx = os.path.join(export_dir, base + ".docx")
    os.makedirs(os.path.dirname(out_docx), exist_ok=True)

    pandoc = find_pandoc()
    cleaned = preprocess(md_path, exclude=exclude)

    with tempfile.TemporaryDirectory() as td:
        clean_md = os.path.join(td, "clean.md")
        content_docx = os.path.join(td, "content.docx")
        with open(clean_md, "w", encoding="utf-8") as f:
            f.write(cleaned)
        r = subprocess.run(
            [pandoc, clean_md, "--reference-doc", TEMPLATE, "-o", content_docx],
            capture_output=True, text=True,
        )
        if r.returncode != 0:
            fail("pandoc 실패:\n" + r.stderr)
        assemble(content_docx, out_docx)

    print("[완료] " + out_docx)


if __name__ == "__main__":
    main()
