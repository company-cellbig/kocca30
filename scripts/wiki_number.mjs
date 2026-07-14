#!/usr/bin/env node
// wiki_number.mjs - 헤딩 넘버링 자동 부여 + wikilink anchor 연쇄 갱신
// 사용법:
//   node scripts/wiki_number.mjs                 # dry-run (기본): 바뀔 내용만 출력, 파일 안 건드림
//   node scripts/wiki_number.mjs --write         # 실제 반영 (헤딩 번호 + anchor 갱신)
//   node scripts/wiki_number.mjs --check         # 어긋난 헤딩 있으면 exit 1 (lint/CI용)
//   node scripts/wiki_number.mjs --json          # 기계 판독용 출력
//   node scripts/wiki_number.mjs 04_Projects/x.md  # 특정 파일만 (anchor 갱신은 저장소 전체)
//
// 하는 일:
//   1. 헤딩 번호 재부여: CONVENTIONS §4.나 한국 공문서 넘버링 규칙대로
//      H1 `1.` / H2 `가.` / H3 `1)` / H4 `가)` / H5 `(1)`
//      상위 레벨이 올라가면 하위 카운터는 1로 리셋. 기존 번호는 떼고 다시 매김 (멱등)
//   2. wikilink anchor 연쇄 갱신: 번호가 바뀐 헤딩을 가리키는 [[파일#헤딩]], ![[파일#헤딩]],
//      [[파일#헤딩|별칭]], 자기 문서 [[#헤딩]]를 저장소 전체에서 새 텍스트로 치환
//      (CONVENTIONS §4.다가 수동 grep 의무로 두던 작업)
//
// 안 하는 일 (수동 확인 필요):
//   - 본문 § 참조 (§4.가 같은 자연어 표기): 번호가 바뀐 헤딩이 있으면 목록으로 경고만 함.
//     자연어에 녹아 있어 자동 치환이 위험 (wiki_lint.mjs가 § 검증을 폐기한 것과 같은 이유)
//
// 예외 영역 (넘버링 안 함):
//   - 05_Logs/log.md: CONVENTIONS §4.나 명시 예외 (`# 작업 로그` H1 + `## [날짜] 유형 | 제목`)
//   - 03_References/_locked/, _sources/, _figures/, _reviews/, converted/: 변환 산출물, read-only
//   - 04_Projects/_archive/: 폐기 문서, read-only (CONVENTIONS §6)
//   - .obsidian/, .claude/, scripts/, assets/, export/, node_modules/, .git/
//
// exit code: 0 = 정상 / 1 = --check 모드에서 어긋난 헤딩 발견, 또는 처리 불가 오류

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, resolve, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '..');

const EXCLUDED_PATHS = new Set([
  '03_References/_locked',
  '03_References/_sources',
  '03_References/_figures',
  '03_References/_reviews',
  '03_References/converted',
  '04_Projects/_archive',
  '.claude',
  '.git',
  '.obsidian',
  'node_modules',
  'assets',
  'export',
  'scripts',
]);

// 넘버링 대상 외 (본문은 스캔하되 헤딩 번호는 안 건드림)
const NO_NUMBER = new Set([
  '05_Logs/log.md',
]);

// H2/H4에 쓰는 한글 기호. 이 목록에 있는 글자만 기존 번호로 인정하고 떼어냄
const KO = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하'];

// 레벨별 번호 형식
function marker(level, n) {
  switch (level) {
    case 1: return `${n}. `;
    case 2: return KO[n - 1] ? `${KO[n - 1]}. ` : null;
    case 3: return `${n}) `;
    case 4: return KO[n - 1] ? `${KO[n - 1]}) ` : null;
    case 5: return `(${n}) `;
    default: return null;
  }
}

// 기존 번호 접두사 제거. 5개 형식 모두 인정 (레벨이 바뀐 헤딩도 다시 매기려면 형식 무관하게 떼야 함)
const KO_CLASS = `[${KO.join('')}]`;
const PREFIX_RE = new RegExp(`^(?:\\(\\d+\\)|\\d+\\.|\\d+\\)|${KO_CLASS}\\.|${KO_CLASS}\\))\\s+`);

function stripMarker(text) {
  return text.replace(PREFIX_RE, '');
}

const args = process.argv.slice(2);
const WRITE = args.includes('--write');
const CHECK = args.includes('--check');
const JSON_OUT = args.includes('--json');
const TARGETS = args.filter(a => !a.startsWith('--')).map(normRel);

function normRel(p) {
  return p.split('\\').join('/');
}

function collectMd(rel = '') {
  const out = [];
  const dirPath = rel ? join(REPO_ROOT, rel) : REPO_ROOT;
  let entries;
  try {
    entries = readdirSync(dirPath);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const relPath = rel ? `${rel}/${entry}` : entry;
    if (EXCLUDED_PATHS.has(relPath)) continue;
    const full = join(REPO_ROOT, relPath);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      out.push(...collectMd(relPath));
    } else if (extname(entry) === '.md') {
      out.push(normRel(relPath));
    }
  }
  return out;
}

function buildFileIndex(allMdFiles) {
  const index = new Map();
  for (const relPath of allMdFiles) {
    const name = basename(relPath, '.md');
    if (!index.has(name)) index.set(name, relPath);
  }
  return index;
}

// 본문 라인 판별: frontmatter와 코드펜스 안은 헤딩/링크로 치지 않음
function bodyLineFlags(lines) {
  const isBody = new Array(lines.length).fill(true);
  let i = 0;
  if (lines[0] !== undefined && lines[0].trim() === '---') {
    isBody[0] = false;
    for (i = 1; i < lines.length; i++) {
      isBody[i] = false;
      if (lines[i].trim() === '---') { i++; break; }
    }
  }
  let inCode = false;
  for (; i < lines.length; i++) {
    if (/^\s*```/.test(lines[i])) {
      inCode = !inCode;
      isBody[i] = false;
      continue;
    }
    if (inCode) isBody[i] = false;
  }
  return isBody;
}

// 한 파일의 헤딩을 규칙대로 다시 매김. { newLines, renames[], problems[] } 반환
function renumberFile(relPath, content) {
  const lines = content.split('\n');
  const isBody = bodyLineFlags(lines);
  const counters = [0, 0, 0, 0, 0]; // H1~H5
  const renames = [];
  const problems = [];
  const newLines = lines.slice();

  for (let i = 0; i < lines.length; i++) {
    if (!isBody[i]) continue;
    // CRLF 파일에서 줄 끝 \r을 잃지 않게 분리해 두고, 다시 쓸 때 되붙임
    const eol = lines[i].endsWith('\r') ? '\r' : '';
    const raw = eol ? lines[i].slice(0, -1) : lines[i];
    const m = /^(#{1,6})\s+(.+?)\s*$/.exec(raw);
    if (!m) continue;
    const level = m[1].length;
    const oldText = m[2].trim();

    if (level === 6) {
      problems.push({ file: relPath, line: i + 1, kind: 'h6', message: `H6 사용: CONVENTIONS §4.가는 H5까지만 허용. 번호 안 매기고 넘어감: "${oldText}"` });
      continue;
    }

    counters[level - 1] += 1;
    for (let d = level; d < 5; d++) counters[d] = 0;

    const mk = marker(level, counters[level - 1]);
    if (mk === null) {
      problems.push({ file: relPath, line: i + 1, kind: 'overflow', message: `H${level} 형제 항목이 ${counters[level - 1]}개: 한글 기호(가~하) 14개를 넘김. 번호 안 매기고 넘어감: "${oldText}"` });
      continue;
    }

    const bare = stripMarker(oldText);
    const newText = mk + bare;
    if (newText !== oldText) {
      newLines[i] = `${m[1]} ${newText}${eol}`;
      renames.push({ file: relPath, line: i + 1, level, oldText, newText, hadMarker: PREFIX_RE.test(oldText) });
    }
  }
  return { newLines, renames, problems };
}

// 번호가 바뀐 헤딩을 가리키는 anchor를 저장소 전체에서 치환
function rewriteAnchors(allFiles, contents, renamesByFile, fileIndex) {
  // 파일별 old→new 맵. 같은 old 텍스트가 서로 다른 new로 갈리면(중복 헤딩) 모호: 치환 안 함
  const mapByFile = new Map();
  const ambiguous = [];
  for (const [file, renames] of renamesByFile) {
    const m = new Map();
    const conflict = new Set();
    for (const r of renames) {
      if (m.has(r.oldText) && m.get(r.oldText) !== r.newText) conflict.add(r.oldText);
      m.set(r.oldText, r.newText);
    }
    for (const c of conflict) {
      m.delete(c);
      ambiguous.push({ file, oldText: c });
    }
    mapByFile.set(file, m);
  }

  const edits = [];
  // [[대상#anchor|별칭]] / ![[...]]: 별칭 구분자는 | 또는 표 안 escape된 \|
  const LINK_RE = /(!?\[\[)([^\[\]|#]*?)#([^\[\]|]+?)((?:\\?\|[^\[\]]+?)?\]\])/g;

  for (const file of allFiles) {
    if (NO_NUMBER.has(file)) continue; // log.md는 이력 보존: 과거 anchor 그대로 둠
    const lines = contents.get(file).split('\n');
    const isBody = bodyLineFlags(lines);
    let changed = false;

    for (let i = 0; i < lines.length; i++) {
      if (!isBody[i]) continue;
      LINK_RE.lastIndex = 0;
      const replaced = lines[i].replace(LINK_RE, (whole, open, target, anchor, tail) => {
        if (anchor.startsWith('^')) return whole; // 블록 ID는 헤딩 아님
        const targetName = target.trim();
        // 대상 미표기([[#헤딩]])면 자기 문서
        const targetPath = targetName === '' ? file : fileIndex.get(targetName);
        if (!targetPath) return whole;
        const map = mapByFile.get(targetPath);
        if (!map) return whole;
        const newAnchor = map.get(anchor.trim());
        if (!newAnchor) return whole;
        edits.push({ file, line: i + 1, from: `${targetName}#${anchor.trim()}`, to: `${targetName}#${newAnchor}` });
        changed = true;
        return `${open}${target}#${newAnchor}${tail}`;
      });
      if (replaced !== lines[i]) lines[i] = replaced;
    }
    if (changed) contents.set(file, lines.join('\n'));
  }
  return { edits, ambiguous };
}

function main() {
  const allFiles = collectMd();
  const fileIndex = buildFileIndex(allFiles);
  const contents = new Map();
  for (const f of allFiles) contents.set(f, readFileSync(join(REPO_ROOT, f), 'utf8'));

  const scope = TARGETS.length > 0 ? TARGETS.filter(t => allFiles.includes(t)) : allFiles;
  const unknown = TARGETS.filter(t => !allFiles.includes(t));

  const renamesByFile = new Map();
  const problems = [];
  const touched = new Set();

  for (const file of scope) {
    if (NO_NUMBER.has(file)) continue;
    const { newLines, renames, problems: p } = renumberFile(file, contents.get(file));
    problems.push(...p);
    if (renames.length > 0) {
      contents.set(file, newLines.join('\n'));
      renamesByFile.set(file, renames);
      touched.add(file);
    }
  }

  const { edits, ambiguous } = rewriteAnchors(allFiles, contents, renamesByFile, fileIndex);
  for (const e of edits) touched.add(e.file);

  // 번호가 실제로 바뀐 헤딩(원래 번호가 있었는데 값이 달라진 것)만 § 참조 위험
  const renumbered = [...renamesByFile.values()].flat().filter(r => r.hadMarker);

  if (WRITE) {
    for (const f of touched) writeFileSync(join(REPO_ROOT, f), contents.get(f), 'utf8');
  }

  if (JSON_OUT) {
    console.log(JSON.stringify({
      mode: WRITE ? 'write' : CHECK ? 'check' : 'dry-run',
      scanned: allFiles.length,
      headingChanges: [...renamesByFile.values()].flat(),
      anchorEdits: edits,
      problems,
      ambiguous,
      unknownTargets: unknown,
    }, null, 2));
  } else {
    const total = [...renamesByFile.values()].flat().length;
    console.log(`Wiki numbering: ${allFiles.length}개 .md 스캔 (${WRITE ? '반영' : CHECK ? '점검' : 'dry-run'})`);
    for (const u of unknown) console.log(`  ! 대상 파일 없음: ${u}`);

    if (total === 0 && edits.length === 0) {
      console.log('✓ 넘버링 어긋남 0건');
    } else {
      console.log(`\n[헤딩 번호] ${total}건 (${renamesByFile.size}개 파일)`);
      for (const [file, renames] of renamesByFile) {
        console.log(`\n  ${file}`);
        for (const r of renames) {
          console.log(`    :${r.line}  H${r.level}  "${r.oldText}"  →  "${r.newText}"`);
        }
      }
      if (edits.length > 0) {
        console.log(`\n[wikilink anchor 연쇄 갱신] ${edits.length}건`);
        for (const e of edits) console.log(`  ${e.file}:${e.line}  [[${e.from}]] → [[${e.to}]]`);
      }
    }

    if (ambiguous.length > 0) {
      console.log(`\n[경고] 같은 파일에 같은 헤딩 텍스트가 둘 이상: anchor 자동 치환 제외 (수동 확인)`);
      for (const a of ambiguous) console.log(`  ${a.file}: "${a.oldText}"`);
    }
    if (renumbered.length > 0) {
      console.log(`\n[경고] 번호가 바뀐 헤딩 ${renumbered.length}건: 본문 § 참조는 자동 갱신 안 됨. grep으로 수동 점검 필요`);
      for (const r of renumbered) console.log(`  ${r.file}: "${r.oldText}" → "${r.newText}"`);
    }
    if (problems.length > 0) {
      console.log(`\n[처리 못 함] ${problems.length}건`);
      for (const p of problems) console.log(`  ${p.file}:${p.line}: ${p.message}`);
    }

    if (WRITE && touched.size > 0) {
      console.log(`\n✓ ${touched.size}개 파일 반영 완료. node scripts/wiki_lint.mjs로 정합 재확인 권장`);
    } else if (!WRITE && (total > 0 || edits.length > 0)) {
      console.log(`\n반영하려면: node scripts/wiki_number.mjs --write`);
    }
  }

  const failed = (CHECK && ([...renamesByFile.values()].flat().length > 0 || edits.length > 0)) || problems.length > 0;
  process.exit(failed ? 1 : 0);
}

main();
