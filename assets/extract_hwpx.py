#!/usr/bin/env python3
r"""HWPX → Markdown 변환기 (V2).

input: HWPX 파일 경로
output:
  - MD 본문 (-o 옵션)
  - figures/media/ 폴더에 BinData 이미지 복사

설계:
  - HWPX의 paragraph 스타일은 모두 styleIDRef=0(Normal). 헤딩 스타일은 미사용.
  - 헤딩 식별은 텍스트 패턴 기반:
      ^\d+-\d+\.\s          → H2
      ^\d+-\d+-\d+\.\s      → H3
      ^[○●◇■]\s            → H3
  - bullet 들여쓰기는 paraPr의 <hh:heading idRef="N"> 값으로 결정 (1, 2, 3 단)
  - 그림 캡션: align=CENTER + 텍스트가 "[그림]" 시작
  - 표: <hp:tbl> 안의 행/셀을 grid_table로 렌더 (paragraph 내부에 있어도 추출)
  - 이미지: <hp:pic>/<hc:img binaryItemIDRef="N"> → figures/media/N.<ext>
  - frontmatter title은 파일명에서 자동 생성. 챕터 제목 paragraph는 본문에도 그대로 출력
    (제거하면 N-M. 패턴 H2가 없는 문서에서 본문 전체가 삼켜지는 위험)
"""

import argparse
import os
import re
import shutil
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path


NS = {
    'p':  'http://www.hancom.co.kr/hwpml/2011/paragraph',
    'h':  'http://www.hancom.co.kr/hwpml/2011/head',
    'c':  'http://www.hancom.co.kr/hwpml/2011/core',
    's':  'http://www.hancom.co.kr/hwpml/2011/section',
}


def t(tag, ns='p'):
    return f'{{{NS[ns]}}}{tag}'


# ---- HWPX 메타 분석 ----

def load_header(zf):
    """header.xml을 파싱해 paraPr별 bullet level과 align 정보를 반환."""
    h = ET.fromstring(zf.read('Contents/header.xml').decode('utf-8'))
    paraPr = {}  # id -> dict(bullet_level, align)
    for pp in h.iter(t('paraPr', 'h')):
        pid = pp.get('id')
        info = {'bullet_level': 0, 'align': 'LEFT'}
        align_el = pp.find(t('align', 'h'))
        if align_el is not None:
            info['align'] = align_el.get('horizontal', 'LEFT')
        heading_el = pp.find(t('heading', 'h'))
        if heading_el is not None and heading_el.get('type') == 'BULLET':
            info['bullet_level'] = int(heading_el.get('idRef', '0'))
        paraPr[pid] = info
    return paraPr


def map_bindata(zf):
    """BinData/image1, image2 ... → 실제 파일명(확장자 포함) 매핑."""
    out = {}
    for n in zf.namelist():
        if n.startswith('BinData/'):
            stem = Path(n).stem  # image1, image2, ...
            ext = Path(n).suffix  # .png, .bmp, ...
            out[stem] = (n, ext)
    return out


# ---- 텍스트/요소 추출 ----

def _extract_inline(p, on_linebreak=None):
    """paragraph 순회하면서 텍스트 + inline equation을 결합 추출.

    <hp:t>: 텍스트 그대로
    <hp:equation>: 안의 <hp:script>를 ` ` `로 감싸서 inline 삽입 (수식 본문 보존)
    <hp:lineBreak>: on_linebreak callback 호출 (라인 분리용)
    """
    T_TAG = t('t', 'p')
    EQ_TAG = t('equation', 'p')
    SCRIPT_TAG = t('script', 'p')
    LB_TAG = t('lineBreak', 'p')
    out = []
    skip_descendants_of = set()  # equation 안의 t/script를 별도로 처리하지 않게

    def walk(elem):
        for ch in elem:
            if id(ch) in skip_descendants_of:
                continue
            if ch.tag == T_TAG:
                if ch.text:
                    out.append(ch.text)
            elif ch.tag == EQ_TAG:
                # equation 안의 script (한컴 수식 표기) 텍스트를 백틱 inline 코드로 보존
                script = ch.find(SCRIPT_TAG)
                if script is None:
                    # 깊은 곳에 있을 수도
                    for sub in ch.iter(SCRIPT_TAG):
                        script = sub
                        break
                if script is not None and script.text:
                    # 한컴 script 텍스트 안의 backtick은 LaTeX의 공백 분리자 같은 의미.
                    # inline code 표기와 충돌하므로 공백으로 치환
                    eq_text = script.text.strip().replace('`', ' ')
                    out.append(f' `{eq_text}` ')
                # equation 자손은 별도 walk 안 함 (script가 이미 처리됨)
                for desc in ch.iter():
                    skip_descendants_of.add(id(desc))
            elif ch.tag == LB_TAG and on_linebreak is not None:
                on_linebreak(out)
            else:
                walk(ch)
    walk(p)
    return out


def para_text(p):
    """paragraph 안의 텍스트 + inline equation 결합. lineBreak는 공백으로 처리."""
    out = _extract_inline(p)
    return ''.join(out)


def para_lines(p):
    """paragraph 안의 텍스트를 <hp:lineBreak> 기준으로 split.

    한컴 원본 셀이 paragraph 1개에 lineBreak로 줄바꿈을 표현하는 케이스가 많음.
    inline equation(<hp:equation>의 script)는 백틱 코드로 감싸서 보존.
    """
    lines = []

    def on_lb(parts):
        line = ''.join(parts).strip()
        if line:
            lines.append(line)
        parts.clear()
    parts = _extract_inline(p, on_linebreak=on_lb)
    # 마지막 부분
    line = ''.join(parts).strip()
    if line:
        lines.append(line)
    return lines


def para_has_pic(p):
    return next(iter(p.iter(t('pic', 'p'))), None) is not None


def para_pic_refs(p):
    """paragraph 내 모든 <hc:img binaryItemIDRef="..."> 의 ref 리스트."""
    refs = []
    for img in p.iter(t('img', 'c')):
        ref = img.get('binaryItemIDRef')
        if ref:
            refs.append(ref)
    return refs


# ---- 헤딩 식별 ----

# 한컴 RFP는 원본을 H1별로 분리해서 각 .hwpx 파일이 1챕터에 해당.
# 따라서 파일 내부의 `N-M.` 패턴은 H1, `N-M-K.`는 H2.
# (파일 제목 자체 = `N. 챕터제목`은 frontmatter title이 담당, 본문 헤딩 아님)
# 한국어 라벨(`가-1.`, `나-2.` 등)은 H1 아래 하위 섹션이므로 H2.
# 단독 한글 라벨(`가.`, `나.` 등)도 한컴 원본에서 동일 paraPr로 같은 위계에 쓰이므로 H2.
H1_PAT = re.compile(r'^\s*\d+-\d+\.\s')
H2_PAT = re.compile(r'^\s*(?:\d+-\d+-\d+\.|[가-하]-\d+\.|[가-하]\.)\s')
# 시작 시각 bullet 기호 — bullet으로 변환 시 마크 자체는 제거
CIRCLE_BULLET_PAT = re.compile(r'^\s*[○●◇◆■□▶▸▣]\s')
LEADING_VISUAL_MARK = re.compile(r'^\s*(?:[○●◇◆■□▶▸▣•·ㆍ]|-)\s+')


def strip_visual_marker(text):
    """텍스트 시작의 시각 마커(○/●/◇/■/□/▶/• 등) 제거. 기호 자체가 정보가 아니라
    한컴 원본의 시각적 들여쓰기 표지일 때 사용. 시작 위치만 처리하고 텍스트 내부
    기호는 의미를 가질 수 있어 보존."""
    return LEADING_VISUAL_MARK.sub('', text).strip()


def detect_heading(text):
    """text → (level, cleaned_text) 또는 (None, text).

    `○`/`●`/`◇`/`■` 시작 paragraph는 헤딩이 아니라 1단 bullet으로 처리한다
    (호출자에서 별도로). 헤딩으로 만들면 자식 bullet들의 paraPr.idRef 기반
    들여쓰기와 충돌해 Obsidian이 비정상 렌더하기 때문.
    """
    if H2_PAT.match(text):
        return 2, text.strip()
    if H1_PAT.match(text):
        return 1, text.strip()
    return None, text


# ---- 표 렌더링 ----

def extract_cells(tbl, paraPr_map=None):
    """tbl → 2D grid (rowCnt × colCnt). 셀 병합(rowSpan/colSpan) 반영.

    각 셀은 paragraph (text, indent) tuple 리스트.
    indent=0: 셀 안 부모 paragraph (heading.type=NONE)
    indent>=1: 셀 안 자식 bullet (heading.type=BULLET의 idRef-1)
    <hp:cellAddr>의 colAddr/rowAddr 위치에 값을 두고, 병합된 영역의 후속 위치는
    빈 리스트(`[]`)로 표시. 이렇게 하면 한컴 표의 셀 병합 구조가 row별 컬럼 정렬에 반영됨.

    paraPr_map은 load_header() 결과 (paraPrIDRef → {bullet_level, align}). 셀 내
    paragraph의 들여쓰기 hierarchy를 추출하는 데 사용. None이면 indent=0으로 통일.
    """
    if paraPr_map is None:
        paraPr_map = {}
    try:
        row_cnt = int(tbl.get('rowCnt') or 0)
        col_cnt = int(tbl.get('colCnt') or 0)
    except (TypeError, ValueError):
        row_cnt = col_cnt = 0
    if row_cnt == 0 or col_cnt == 0:
        # fallback: 직접 카운트
        trs = list(tbl.iter(t('tr', 'p')))
        row_cnt = len(trs)
        col_cnt = max((len(tr.findall(t('tc', 'p'))) for tr in trs), default=0)
    if row_cnt == 0 or col_cnt == 0:
        return []

    grid = [[None] * col_cnt for _ in range(row_cnt)]
    for tr in tbl.iter(t('tr', 'p')):
        for tc in tr.findall(t('tc', 'p')):
            addr = tc.find(t('cellAddr', 'p'))
            span = tc.find(t('cellSpan', 'p'))
            try:
                col_addr = int(addr.get('colAddr')) if addr is not None else 0
                row_addr = int(addr.get('rowAddr')) if addr is not None else 0
            except (TypeError, ValueError):
                col_addr = row_addr = 0
            try:
                col_span = int(span.get('colSpan')) if span is not None else 1
                row_span = int(span.get('rowSpan')) if span is not None else 1
            except (TypeError, ValueError):
                col_span = row_span = 1

            paras = []
            for cp in tc.iter(t('p', 'p')):
                if para_has_pic(cp):
                    continue
                ppid = cp.get('paraPrIDRef')
                bullet_level = paraPr_map.get(ppid, {}).get('bullet_level', 0)
                # bullet_level=0(heading.type=NONE) → 부모 paragraph (indent=0)
                # bullet_level>=1 → 자식 bullet (indent=1..)
                indent = 0 if bullet_level == 0 else max(1, bullet_level - 1)
                # paragraph 안의 lineBreak로 split (한컴 셀이 한 paragraph에 여러 줄을
                # 담는 케이스 처리 — 패턴 12)
                for sub in para_lines(cp):
                    # 한 줄 안에 inline `•` (U+2022) 마커가 항목 구분자로 쓰인 경우 추가 split
                    # (한컴이 paragraph도 lineBreak도 안 쓰고 `•`만으로 항목 구분한 케이스)
                    # 공백 유무 관계없이 split — 예: "분석• 전문가" 같은 케이스도 처리
                    for piece in re.split(r'\s*•\s*', sub):
                        txt = strip_visual_marker(piece)
                        if txt:
                            paras.append((txt, indent))

            if 0 <= row_addr < row_cnt and 0 <= col_addr < col_cnt:
                grid[row_addr][col_addr] = paras
            # 병합 영역의 후속 위치: 빈 리스트로 점유 표시
            for r in range(row_addr, min(row_addr + row_span, row_cnt)):
                for c in range(col_addr, min(col_addr + col_span, col_cnt)):
                    if (r, c) != (row_addr, col_addr) and grid[r][c] is None:
                        grid[r][c] = []

    # 점유되지 않은 None은 빈 리스트로
    return [[(cell if cell is not None else []) for cell in row] for row in grid]


def _cell_text(cell):
    """cell은 [(text, indent), ...] 또는 호환을 위해 [text, ...] 형태."""
    out = []
    for p in cell:
        if isinstance(p, tuple):
            out.append(p[0])
        else:
            out.append(p)
    return out


def is_label_content_table(rows):
    """\"라벨 ↔ 긴 내용\" 정의식 표 판정.

    조건:
      - 모든 행에서 비어있지 않은 셀이 정확히 2개
        (원본이 끝 빈 컬럼이 있는 3열 표여도 라벨↔내용 의미라면 인정)
      - 첫 번째 비어있지 않은 셀(라벨)이 짧음 (≤ 30자)
      - 어느 한 행의 두 번째 비어있지 않은 셀(내용)이
        (paragraph 수 ≥ 3) 또는 (합산 텍스트 길이 ≥ 100자)
    """
    if not rows:
        return False
    parsed = []
    for row in rows:
        non_empty = [c for c in row if ' '.join(_cell_text(c)).strip()]
        if len(non_empty) != 2:
            return False
        parsed.append((non_empty[0], non_empty[1]))
    for label_paras, _ in parsed:
        if len(' '.join(_cell_text(label_paras))) > 30:
            return False
    for _, content_paras in parsed:
        if len(content_paras) >= 3:
            return True
        if len(' '.join(_cell_text(content_paras))) >= 100:
            return True
    return False


def render_definition_list(rows):
    """라벨/내용 표 → 정의 목록 형태.

    각 row에서 비어있지 않은 셀 2개를 추출. 셀 내용 paragraph의 indent 메타데이터로
    부모-자식 hierarchy 출력:
      - indent=0 (heading.type=NONE) → 부모 paragraph: 1단 bullet (`- text`)
      - indent>=1 (heading.type=BULLET) → 자식 paragraph: 2단 bullet (`\\t- text`)
    카테고리 마커(`[xxx]`로 시작)는 indent와 무관하게 1단 bullet으로.

    첫 row의 우측 셀이 짧으면(≤50자) 헤더 row로 간주하고 생략. 라벨이 이미
    H2(`## 가-2. ...`) 등으로 컨텍스트를 주므로 헤더 row 중복 표시 불필요.
    """
    out = []
    # 첫 row가 헤더 row면 생략 (우측 셀 짧음)
    start = 0
    if len(rows) >= 2:
        first = rows[0]
        non_empty = [c for c in first if ' '.join(_cell_text(c)).strip()]
        if len(non_empty) >= 2:
            right_text = ' '.join(_cell_text(non_empty[1]))
            if len(right_text) <= 50:
                start = 1
    for row in rows[start:]:
        non_empty = [c for c in row if ' '.join(_cell_text(c)).strip()]
        if len(non_empty) < 2:
            continue
        label_paras, content_paras = non_empty[0], non_empty[1]
        label = ' '.join(_cell_text(label_paras)).strip()
        out.append(f'**{label}**')
        out.append('')
        for para in content_paras:
            if isinstance(para, tuple):
                text, indent = para
            else:
                text, indent = para, 0
            if re.match(r'^\[[^\]]+\]', text):
                # 카테고리 마커: indent와 무관하게 1단
                out.append(f'- {text}')
            elif indent >= 1:
                out.append(f'\t- {text}')
            else:
                out.append(f'- {text}')
        out.append('')
    return '\n'.join(out).rstrip()


def render_pipe_table(rows):
    """진짜 데이터 표 → GFM/Obsidian 호환 pipe_table.

    셀 내부 줄바꿈은 `<br>`. pipe_table은 Pandoc grid_table과 달리
    Obsidian/GitHub 등 표준 마크다운 뷰어에서 모두 렌더됨.
    셀 안의 `|` 문자는 `\\|`로 이스케이프.
    """
    if not rows:
        return ''
    rendered_rows = [
        ['<br>'.join(_cell_text(cell)).replace('|', '\\|') for cell in row]
        for row in rows
    ]
    n_cols = max(len(r) for r in rendered_rows)
    rendered_rows = [r + [''] * (n_cols - len(r)) for r in rendered_rows]
    # 헤더 행 + 구분선 + 본문
    out = []
    out.append('| ' + ' | '.join(rendered_rows[0]) + ' |')
    out.append('|' + '|'.join(['---'] * n_cols) + '|')
    for r in rendered_rows[1:]:
        out.append('| ' + ' | '.join(r) + ' |')
    return '\n'.join(out)


def render_flattened_rows(rows):
    """bullet block 안의 표를 cross-product 평탄화.

    각 셀을 `row_label / col_label: value` 형식 한 줄로 출력. AI 에이전트가
    본문 한 줄만 인용해도 row 라벨 + 컬럼 라벨 + 값 모두 추출 가능 (self-contained).
    헤더와 본문 row의 위치 매핑 의존이 없어 부분 인용에서도 의미 모호성 없음.

    출력 예 (시너지 효과 표 — 헤더: 구분/택견/남사당놀이/기술 범용성):
      - 특성 / 택견(K-Motion): 개인 수련 중심
      - 특성 / 남사당놀이(K-Play): 합동 공연 중심
      - 특성 / 기술 범용성 입증: 1인칭 체험 ↔ 다자간 상호작용
      - 유형 / 택견(K-Motion): 격투 기반 역동성
      - ...

    규칙:
      - 첫 row를 헤더로 사용 (첫 컬럼 = row label 컬럼, 나머지 = col label들)
      - 본문 row 각 셀을 `row_label / header[j]: cell_value` 형태로
      - 첫 컬럼(row label)이 비어있으면(rowSpan 후속) `header[j]: cell_value` 형태로
      - 셀 값이 비어있으면 그 셀 줄은 출력 안 함 (빈 셀 정보 생략)
      - 헤더가 비어있는 컬럼은 `(컬럼N)`으로 fallback
    """
    if not rows:
        return []
    header_cells = [' '.join(_cell_text(c)).strip() for c in rows[0]]
    headers = [h if h else f'(컬럼{i+1})' for i, h in enumerate(header_cells)]
    out = []
    last_row_label = ''  # rowSpan 후속 row가 그룹 라벨을 상속 (택견 rowSpan=3 등)
    for i in range(1, len(rows)):
        row = rows[i]
        # row의 모든 셀이 비어있으면 skip
        if not any(' '.join(_cell_text(c)).strip() for c in row):
            continue
        # 첫 셀의 paragraph들을 하나로 join하여 row label로 사용
        row_label_paras = _cell_text(row[0]) if row else []
        row_label = ' '.join(p.strip() for p in row_label_paras if p.strip())
        if row_label:
            last_row_label = row_label
        else:
            row_label = last_row_label
        for j in range(1, len(row)):
            col_label = headers[j] if j < len(headers) else f'(컬럼{j+1})'
            # 셀 안 paragraph마다 별도 row로 expand (AI 인용 안전 + 정보 손실 없음)
            for para in _cell_text(row[j]):
                para = para.strip()
                if not para:
                    continue
                if row_label:
                    out.append(f'- {row_label} / {col_label}: {para}')
                else:
                    out.append(f'- {col_label}: {para}')
        # 컬럼이 1개인 표 (row_label만 있고 값 없음)
        if len(row) == 1 and row_label:
            out.append(f'- {row_label}')
    return out


def render_table(rows):
    """rows (2D grid) → markdown (bullet block 밖 전용).

    분류:
      - 1행 × 1열 표 (전체 행 수 1, 셀 1개): 섹션 라벨로 보고 **bold** 단락
      - 라벨↔내용 표 (2열, 좌측 짧음, 우측 다행): 정의 목록
      - 그 외: pipe_table

    bullet block 안 표 처리는 호출자(emit_table)에서 render_flattened_rows()로 분기.
    rows는 extract_cells(tbl, paraPr_map) 결과 — 셀 paragraph가 (text, indent) tuple 형태.
    """
    if not rows:
        return ''
    # 1행 × 1열 (또는 1행 N열로 모든 셀이 짧음) → bold 라벨
    if len(rows) == 1 and all(len(' '.join(_cell_text(c))) <= 30 for c in rows[0]):
        text = ' / '.join(' '.join(_cell_text(c)).strip() for c in rows[0] if c)
        return f'**{text}**' if text else ''
    if is_label_content_table(rows):
        return render_definition_list(rows)
    return render_pipe_table(rows)


# ---- 메인 변환 ----

def convert(hwpx_path, out_md, figures_dir, source_rel):
    hwpx_path = Path(hwpx_path)
    figures_dir = Path(figures_dir)
    figures_dir.mkdir(parents=True, exist_ok=True)
    # 본문 내 이미지 link prefix: MD 파일 위치 기준 figures_dir 상대경로
    # 예: MD가 03_References/converted/x.md, figures가 03_References/_figures/x/
    #     → link prefix = ../_figures/x
    out_md_path = Path(out_md).resolve()
    link_prefix = os.path.relpath(figures_dir.resolve(), out_md_path.parent).replace(os.sep, '/')

    stats = {'h1': 0, 'h2': 0, 'tables': 0, 'images': 0, 'bullets': 0, 'sections': 0}

    section_pat = re.compile(r'^Contents/section(\d+)\.xml$')

    with zipfile.ZipFile(hwpx_path) as zf:
        paraPr = load_header(zf)
        bin_map = map_bindata(zf)

        # 이미지는 사용 여부 무관하게 모두 추출 (BinData 통째로)
        for stem, (zip_name, ext) in bin_map.items():
            out_path = figures_dir / f'{stem}{ext}'
            with zf.open(zip_name) as src, open(out_path, 'wb') as dst:
                shutil.copyfileobj(src, dst)
            stats['images'] += 1

        # 모든 section*.xml 발견 + 숫자 정렬 (HWPX가 multi-section일 수 있음)
        # section0만 하드코딩하면 section1+ 콘텐츠 silent data loss
        section_entries = []
        for name in zf.namelist():
            m = section_pat.match(name)
            if m:
                section_entries.append((int(m.group(1)), name))
        section_entries.sort()
        if not section_entries:
            fail_msg = f'Contents/section*.xml 없음: {hwpx_path}'
            raise RuntimeError(fail_msg)
        sections = [ET.fromstring(zf.read(name).decode('utf-8')) for _, name in section_entries]
        stats['sections'] = len(sections)

    lines = []
    last_bullet_indent = [-1]  # 마지막 bullet의 들여쓰기 단계 (-1 = bullet block 밖)

    def emit_table(tbl):
        rows = extract_cells(tbl, paraPr)
        if not rows:
            return
        # 1행 × 짧은 셀들 표 = 섹션 라벨 (예: "1 단계(2차연도)"). 위치(bullet block 안/밖)와
        # 무관하게 list block을 끊고 들여쓰기 0으로 emit. 그러지 않으면 동일 라벨이
        # 직전 bullet 깊이를 이어받아 들여쓰기 4단 자식 등으로 잘못 출력됨
        col_cnt = len(rows[0]) if rows else 0
        if len(rows) == 1 and all(len(' '.join(_cell_text(c))) <= 30 for c in rows[0]):
            rendered = render_table(rows)  # bold 라벨로 변환
            if rendered:
                last_bullet_indent[0] = -1  # list block 끊음
                lines.append('')
                lines.append(rendered)
                lines.append('')
                stats['tables'] += 1
            return

        # 직전 line이 isolated 1단 bullet 짧은 라벨이면 H2로 승격 + list block 끊음
        # → 표를 bullet block 밖 분기(pipe_table 등)로 강제. 헤더+표 구조 자연스러움
        # 조건: 1단 bullet, ≤25자, 콜론 끝X, 시각 마커X, 위 라인이 bullet 아님(isolated)
        if (lines
            and lines[-1].startswith('- ')
            and not re.match(r'^- [○●◇◆■□▶▸▣\-]', lines[-1])
        ):
            cand_text = lines[-1][2:].strip()
            if (len(cand_text) <= 25
                and not cand_text.endswith(':')
                and (len(lines) < 2
                     or not lines[-2].lstrip().startswith(('-', '\t-')))
            ):
                lines[-1] = f'## {cand_text}'
                last_bullet_indent[0] = -1

        # 의미 보존 어려운 표(월별 그리드 등 colCnt ≥ 12)는 메모로 대체
        # 텍스트 추출 시 셀 마킹 위치 정보가 손실되어 본문에 두면 환각 위험만 증가
        if col_cnt >= 12:
            note = (f'> **변환 한계**: 원본의 {len(rows)}×{col_cnt} 표(월별 그리드 등)는 '
                    f'텍스트 추출 시 셀 위치 정보가 손실되어 의미 보존이 어려움. '
                    f'인용 시 원본 HWPX 직접 참조 필요.')
            if last_bullet_indent[0] >= 0:
                indent = '\t' * (last_bullet_indent[0] + 1)
                lines.append(indent + note)
            else:
                lines.append('')
                lines.append(note)
                lines.append('')
            stats['tables'] += 1
            return

        if last_bullet_indent[0] >= 0:
            # bullet block 안: row를 자식 bullet으로 평탄화
            # (들여쓰기된 pipe_table은 Obsidian이 렌더 안 함 — list continuation으로 해석)
            flat = render_flattened_rows(rows)
            indent = '\t' * (last_bullet_indent[0] + 1)
            for ln in flat:
                lines.append(indent + ln)
            # last_bullet_indent 보존하여 표 다음 bullet이 흐름을 이어감
            stats['tables'] += 1
        else:
            # bullet block 밖: bold 라벨 / 정의 목록 / pipe_table 분기
            rendered = render_table(rows)
            if rendered:
                lines.append('')
                lines.append(rendered)
                lines.append('')
                stats['tables'] += 1

    def walk(elem):
        for ch in elem:
            if ch.tag == t('p', 'p'):
                # paragraph 내부에 <hp:tbl>이 있으면 그것만 표로 처리하고 본문 텍스트는 건너뜀
                nested_tbls = [el for el in ch.iter(t('tbl', 'p'))]
                if nested_tbls:
                    for tbl in nested_tbls:
                        emit_table(tbl)
                else:
                    handle_paragraph(ch)
            elif ch.tag == t('tbl', 'p'):
                emit_table(ch)
            else:
                walk(ch)

    def handle_paragraph(p):
        # 이미지 paragraph — bullet block 안이면 마지막 bullet 들여쓰기에 맞춰 inline,
        # 밖이면 평문 출력 (빈 줄로 단락 분리)
        pic_refs = para_pic_refs(p)
        if pic_refs:
            if last_bullet_indent[0] >= 0:
                indent = '\t' * (last_bullet_indent[0] + 1)
            else:
                indent = ''
            for ref in pic_refs:
                if ref in bin_map:
                    _, ext = bin_map[ref]
                    lines.append(f'{indent}![]({link_prefix}/{ref}{ext})')
                else:
                    lines.append(f'{indent}![]({link_prefix}/{ref})')
            txt = para_text(p).strip()
            if txt:
                lines.append(f'{indent}*{txt}*')
            return

        text = para_text(p)
        if not text.strip():
            # bullet block 안에서는 빈 줄 출력 안 함 (list 끊김 방지)
            if last_bullet_indent[0] >= 0:
                return
            if lines and lines[-1] != '':
                lines.append('')
            return

        # headings
        level, cleaned = detect_heading(text)
        if level is not None:
            last_bullet_indent[0] = -1  # 헤딩은 list block 끊음
            if lines and lines[-1] != '':
                lines.append('')
            lines.append(f'{"#" * level} {cleaned}')
            lines.append('')
            stats[f'h{level}'] = stats.get(f'h{level}', 0) + 1
            return

        # caption (centered + starts with [그림]/[표]/[도표]/[사진])
        pp_id = p.get('paraPrIDRef')
        pp_info = paraPr.get(pp_id, {})
        is_centered = pp_info.get('align') == 'CENTER'
        stripped = text.lstrip()
        is_caption = is_centered and any(
            stripped.startswith(prefix) for prefix in ('[그림]', '[표]', '[도표]', '[사진]')
        )
        if is_caption:
            # bullet block 안이면 같은 들여쓰기로 inline, 밖이면 평문
            if last_bullet_indent[0] >= 0:
                indent = '\t' * (last_bullet_indent[0] + 1)
                lines.append(f'{indent}*{text.strip()}*')
            else:
                lines.append(f'*{text.strip()}*')
                lines.append('')
            return

        # bullet
        bullet_level = pp_info.get('bullet_level', 0)
        # 시각 bullet 기호(○/●/◇/◆/■/□/▶/▸/▣) 시작 paragraph는 paraPr와 무관하게 1단 bullet
        if CIRCLE_BULLET_PAT.match(text):
            last_bullet_indent[0] = 0
            lines.append(f'- {strip_visual_marker(text)}')
            stats['bullets'] += 1
            return
        if bullet_level >= 1:
            indent_level = bullet_level - 1
            last_bullet_indent[0] = indent_level
            indent = '\t' * indent_level
            # paraPr.heading=BULLET인 paragraph도 시작 시각 마커 제거 (한컴이 시각 표지로 넣은 경우)
            cleaned = strip_visual_marker(text)
            lines.append(f'{indent}- {cleaned}')
            stats['bullets'] += 1
            return

        # plain paragraph — list block 끊음
        last_bullet_indent[0] = -1
        lines.append(text.strip())
        lines.append('')

    # 모든 section을 순서대로 처리. section 경계에서는 list block을 끊어
    # 다음 section 첫 paragraph가 직전 bullet 흐름에 종속되지 않게 함
    for sec_root in sections:
        last_bullet_indent[0] = -1
        walk(sec_root)

    # 본문 첫 비어있지 않은 줄이 챕터 헤더 표(`**N / 챕터제목**`)이면 제거.
    # 한컴 RFP가 원본을 H1별로 분리하면서 각 .hwpx 첫머리에 챕터 번호+제목을
    # 1행 표로 담는데, 이는 파일명 + frontmatter title과 중복이므로 본문에서 제외.
    for i, ln in enumerate(lines):
        s = ln.strip()
        if not s:
            continue
        if s.startswith('**') and s.endswith('**') and len(s) >= 4:
            lines[i] = ''
        break

    # collapse multiple blank lines
    out = []
    prev_blank = False
    for ln in lines:
        if ln == '':
            if prev_blank:
                continue
            prev_blank = True
        else:
            prev_blank = False
        out.append(ln)
    # leading blank lines 제거 (frontmatter 뒤 본문 시작 부분이 비어있지 않게)
    while out and out[0] == '':
        out.pop(0)

    # frontmatter
    name = hwpx_path.stem
    today = __import__('datetime').date.today().isoformat()
    fm = (
        f'---\n'
        f'title: {name}\n'
        f'tags: [reference, converted, hwpx]\n'
        f'source: {source_rel}\n'
        f'converted: {today}\n'
        f'created: {today}\n'
        f'updated: {today}\n'
        f'---\n'
    )

    Path(out_md).parent.mkdir(parents=True, exist_ok=True)
    with open(out_md, 'w', encoding='utf-8', newline='\n') as f:
        f.write(fm)
        f.write('\n'.join(out).rstrip() + '\n')

    return stats


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('hwpx', help='HWPX 파일 경로')
    ap.add_argument('-o', '--out', required=True, help='출력 MD 경로')
    ap.add_argument('--figures-dir', required=True, help='figures/ 폴더 경로 (media/ 하위 생성)')
    ap.add_argument('--source-rel', default='', help='frontmatter의 source 필드값 (저장소 상대경로)')
    args = ap.parse_args()

    stats = convert(args.hwpx, args.out, args.figures_dir, args.source_rel)
    # stats를 JSON으로 stdout 출력
    import json
    print(json.dumps(stats))


if __name__ == '__main__':
    main()
