#!/usr/bin/env node
// wiki_lint.mjs - LLM Wiki 정합성 자동 검증
// 사용법: node scripts/wiki_lint.mjs [--json]
//
// 검증 항목 (v2):
//   1. 깨진 wikilink: [[파일명]]의 대상 파일이 실재하는지
//      severity: warning (CONVENTIONS 3.5 Wikilink 규칙 "링크 대상 문서가 아직 없어도 괜찮음(나중에 생성)" 허용)
//   2. wikilink anchor 정합: [[파일#anchor]]의 anchor가 헤딩 텍스트와 일치하는지
//      severity: error (대상 파일 존재인데 anchor 매칭 안 됨: 명백한 stale)
//   3. 가운뎃점(·) 위배: 일반 위키 영역에 가운뎃점 사용 (CONVENTIONS 3.4 문체 위배)
//      severity: error
//   4. § 절 참조 사용: 2026-07-14에 폐기된 표기 (CONVENTIONS 3.5 Wikilink 규칙)
//      severity: error. 절 참조는 wikilink anchor로만 씀
//      예외: 당시 문서 상태를 인용한 이력 (log.md, _archive/, 반복 결함 카탈로그,
//            검수 기록 3종)과 폐지 정책 자체를 설명하는 CONVENTIONS 본문
//
// exit code:
//   - 0: error 0건 (warning은 표시만 하고 통과)
//   - 1: error 1건 이상
//
// 별도 스크립트:
//   - 헤딩 넘버링 정합 (H1 `1.` / H2 `1.1` / H3 `1.1.1` / H4 `1)` / H5 `(1)`) → scripts/wiki_number.mjs
//     점검은 `node scripts/wiki_number.mjs --check`, 정정은 `--write` (anchor 연쇄 갱신 포함)
//
// 예외 영역:
//   - 03_References/_locked/, _sources/, _figures/, _reviews/, converted/ (read-only)
//   - 05_Logs/log.md (이력 보존: 가운뎃점/문체 검사 제외)
//   - .claude/, node_modules/, .git/, .obsidian/, assets/, scripts/
//
// 가운뎃점 의도 예외:
//   - CONVENTIONS.md (가운뎃점 규칙 정의)
//   - 02_HowTo/반복 결함 카탈로그.md (정규식 예시)
//   - 02_HowTo/codex 검수 포커스.md (정책 언급)

import { readdirSync, readFileSync, statSync } from 'node:fs';
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
  '.claude',
  'node_modules',
  '.git',
  '.obsidian',
  'assets',
  'scripts',
]);

const SKIP_CONTENT_CHECKS = new Set([
  '05_Logs/log.md',
]);

const ALLOW_GAWUNDEOTJEOM = new Set([
  'CONVENTIONS.md',
  '02_HowTo/반복 결함 카탈로그.md',
  '02_HowTo/codex 검수 포커스.md',
  '03_References/converted_모순점.md', // 변환본 인용 컨텍스트
]);

// § 표기가 허용되는 곳. 모두 "당시 문서 상태"를 인용한 기록이라 고치면 기록이 왜곡됨
const ALLOW_SECTION_MARK = new Set([
  'CONVENTIONS.md',                                          // § 폐지 정책을 설명하는 본문
  '02_HowTo/반복 결함 카탈로그.md',                            // 과거 결함 사례 인용
  '06_작업노트/위키 정합성 검수 2026-07-02.md',                 // 검수 시점 문서 상태 인용
  '06_작업노트/시범콘텐츠 신규 3종 기획서 야간 작성 검토 패킷.md',  // 검토 시점 문서 상태 인용
  '06_작업노트/시범콘텐츠 신규 3종 UI 야간 작성 검토 패킷.md',     // 검토 시점 문서 상태 인용
]);
const ALLOW_SECTION_MARK_PREFIX = ['04_Projects/_archive/']; // 폐기 문서, 이력 보존

// fileIndex 빌드 시 read-only 영역도 포함 (link target 매칭용)
// 다만 검사 대상은 EXCLUDED_PATHS 제외한 일반 위키만
const INDEX_INCLUDED_DIRS = [
  '03_References/_locked',
  '03_References/converted',
];

const args = process.argv.slice(2);
const JSON_OUT = args.includes('--json');

function normRel(p) {
  return p.split('\\').join('/');
}

function collectMd(root, rel = '') {
  const out = [];
  const dirPath = rel ? join(root, rel) : root;
  let entries;
  try {
    entries = readdirSync(dirPath);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const relPath = rel ? `${rel}/${entry}` : entry;
    if (EXCLUDED_PATHS.has(relPath)) continue;
    const full = join(root, relPath);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      out.push(...collectMd(root, relPath));
    } else if (extname(entry) === '.md') {
      out.push(normRel(relPath));
    }
  }
  return out;
}

function extractHeadings(content) {
  const headings = [];
  const lines = content.split('\n');
  let inCodeBlock = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;
    const m = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (m) {
      headings.push({ level: m[1].length, text: m[2].trim(), line: i + 1 });
    }
  }
  return headings;
}

function extractWikilinks(content) {
  const links = [];
  // [[파일명#anchor|별칭]]: | escape도 처리 (\|)
  // 파일명이 비면([[#anchor]]) 자기 문서 참조 (CONVENTIONS 3.5 Wikilink 규칙이 정한 형식)
  const regex = /\[\[([^\[\]\|#]*)(?:#([^\[\]\|]+?))?(?:\\?\|([^\[\]]+?))?\]\]/g;
  const lines = content.split('\n');
  let inCodeBlock = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;
    // 인라인 백틱 안 wikilink 무시
    const lineNoCode = line.replace(/`[^`]*`/g, '');
    let m;
    regex.lastIndex = 0;
    while ((m = regex.exec(lineNoCode)) !== null) {
      links.push({
        target: m[1].trim(),
        anchor: m[2] ? m[2].trim() : null,
        alias: m[3] ? m[3].trim() : null,
        line: i + 1,
      });
    }
  }
  return links;
}

function buildFileIndex(allMdFiles) {
  const index = new Map();
  for (const relPath of allMdFiles) {
    const name = basename(relPath, '.md');
    if (!index.has(name)) {
      index.set(name, relPath);
    }
  }
  // EXCLUDED 영역의 .md도 link target 매칭용으로 인덱스에 포함
  for (const inclDir of INDEX_INCLUDED_DIRS) {
    const dirPath = join(REPO_ROOT, inclDir);
    let entries;
    try {
      entries = readdirSync(dirPath, { recursive: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      const e = typeof entry === 'string' ? entry : entry.name;
      if (extname(e) === '.md') {
        const name = basename(e, '.md');
        if (!index.has(name)) {
          index.set(name, `${inclDir}/${e}`);
        }
      }
    }
  }
  return index;
}

function checkBrokenWikilinks(allMdFiles, fileIndex) {
  const findings = [];
  for (const relPath of allMdFiles) {
    const content = readFileSync(join(REPO_ROOT, relPath), 'utf8');
    const links = extractWikilinks(content);
    for (const link of links) {
      // log.md는 이력: wikilink 검사 제외 (과거 참조 보존)
      if (SKIP_CONTENT_CHECKS.has(relPath)) continue;
      if (link.target === '') continue; // [[#anchor]] 자기 문서 참조: 대상 파일이 자기 자신
      if (!fileIndex.has(link.target)) {
        findings.push({
          type: 'broken_wikilink',
          severity: 'warning',
          file: relPath,
          line: link.line,
          message: `[[${link.target}]]: 대상 파일 없음 (미작성 stub link로 간주)`,
        });
      }
    }
  }
  return findings;
}

// anchor가 헤딩과 맞는지 봄. 중첩 경로(`#부모#자식`)도 지원함
//   Obsidian은 `[[파일#부모#자식]]`으로 부모 아래의 자식 헤딩을 콕 집을 수 있음. 시스템마다
//   반복되는 명세 항목 헤더(동작과 규칙 등)를 가리킬 때 씀. 통짜 텍스트로 비교하면 broken으로
//   오판정하므로, `#`로 나눠 부모에서 자식으로 내려가는 헤딩 경로가 실재하는지 순서대로 확인함
function matchHeadingPath(headings, anchor) {
  const segs = anchor.split('#').map(s => s.trim()).filter(Boolean);
  if (segs.length === 0) return false;
  if (segs.length === 1) return headings.some(h => h.text === segs[0]);

  // 부모 후보마다, 그 부모의 하위 구간(더 깊은 레벨이 이어지는 동안) 안에서 다음 조각을 찾음
  const search = (from, to, depth, si) => {
    for (let i = from; i < to; i++) {
      const h = headings[i];
      if (h.level <= depth) continue;          // 형제나 상위는 하위 구간이 아님
      if (h.text !== segs[si]) continue;
      if (si === segs.length - 1) return true;
      // 이 헤딩의 하위 구간 끝을 찾음
      let end = i + 1;
      while (end < to && headings[end].level > h.level) end++;
      if (search(i + 1, end, h.level, si + 1)) return true;
    }
    return false;
  };

  for (let i = 0; i < headings.length; i++) {
    if (headings[i].text !== segs[0]) continue;
    let end = i + 1;
    while (end < headings.length && headings[end].level > headings[i].level) end++;
    if (search(i + 1, end, headings[i].level, 1)) return true;
  }
  return false;
}

function checkWikilinkAnchors(allMdFiles, fileIndex) {
  const findings = [];
  const headingsCache = new Map();
  for (const relPath of allMdFiles) {
    if (SKIP_CONTENT_CHECKS.has(relPath)) continue;
    const content = readFileSync(join(REPO_ROOT, relPath), 'utf8');
    const links = extractWikilinks(content);
    for (const link of links) {
      if (!link.anchor) continue;
      // [[#anchor]]는 자기 문서 헤딩 참조
      const targetPath = link.target === '' ? relPath : fileIndex.get(link.target);
      if (!targetPath) continue;
      // 블록 ID anchor (#^id): 헤딩이 아니라 블록 참조(Obsidian transclusion): 헤딩이 아니라 블록 ID 존재로 검증
      if (link.anchor.startsWith('^')) {
        const blockContent = readFileSync(join(REPO_ROOT, targetPath), 'utf8');
        const blockId = link.anchor.slice(1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const blockRe = new RegExp('\\^' + blockId + '\\s*$', 'm');
        if (!blockRe.test(blockContent)) {
          findings.push({
            type: 'broken_anchor',
            severity: 'error',
            file: relPath,
            line: link.line,
            message: `[[${link.target}#${link.anchor}]]: 블록 ID가 ${link.target}에 없음`,
          });
        }
        continue;
      }
      let targetHeadings;
      if (headingsCache.has(targetPath)) {
        targetHeadings = headingsCache.get(targetPath);
      } else {
        const targetContent = readFileSync(join(REPO_ROOT, targetPath), 'utf8');
        targetHeadings = extractHeadings(targetContent);
        headingsCache.set(targetPath, targetHeadings);
      }
      if (!matchHeadingPath(targetHeadings, link.anchor)) {
        findings.push({
          type: 'broken_anchor',
          severity: 'error',
          file: relPath,
          line: link.line,
          message: `[[${link.target}#${link.anchor}]]: anchor가 ${link.target} 헤딩 텍스트와 매칭 안 됨`,
        });
      }
    }
  }
  return findings;
}

function checkGawundeotjeom(allMdFiles) {
  const findings = [];
  for (const relPath of allMdFiles) {
    if (SKIP_CONTENT_CHECKS.has(relPath)) continue;
    if (ALLOW_GAWUNDEOTJEOM.has(relPath)) continue;
    const content = readFileSync(join(REPO_ROOT, relPath), 'utf8');
    const lines = content.split('\n');
    let inCodeBlock = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^```/.test(line)) {
        inCodeBlock = !inCodeBlock;
        continue;
      }
      if (inCodeBlock) continue;
      // 인라인 백틱 안 가운뎃점은 무시
      const lineNoCode = line.replace(/`[^`]*`/g, '');
      if (lineNoCode.includes('·')) {
        findings.push({
          type: 'gawundeotjeom',
          severity: 'error',
          file: relPath,
          line: i + 1,
          message: `가운뎃점 \`·\` 사용: CONVENTIONS 3.4 문체 위배 (쉼표 또는 슬래시로 대체)`,
        });
      }
    }
  }
  return findings;
}

// § 절 참조는 2026-07-14에 폐기됨. 절 참조는 wikilink anchor로만 씀
function checkSectionMark(allMdFiles) {
  const findings = [];
  for (const relPath of allMdFiles) {
    if (SKIP_CONTENT_CHECKS.has(relPath)) continue;
    if (ALLOW_SECTION_MARK.has(relPath)) continue;
    if (ALLOW_SECTION_MARK_PREFIX.some(p => relPath.startsWith(p))) continue;
    const content = readFileSync(join(REPO_ROOT, relPath), 'utf8');
    const lines = content.split('\n');
    let inCodeBlock = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^```/.test(line)) {
        inCodeBlock = !inCodeBlock;
        continue;
      }
      if (inCodeBlock) continue;
      // 인라인 백틱 안 § 는 무시 (표기 자체를 예시로 드는 경우)
      const lineNoCode = line.replace(/`[^`]*`/g, '');
      if (lineNoCode.includes('§')) {
        findings.push({
          type: 'section_mark',
          severity: 'error',
          file: relPath,
          line: i + 1,
          message: `§ 절 참조 사용: 폐기된 표기임 (CONVENTIONS 3.5 Wikilink 규칙). wikilink anchor로 씀`,
        });
      }
    }
  }
  return findings;
}

function main() {
  const allMdFiles = collectMd(REPO_ROOT);
  const fileIndex = buildFileIndex(allMdFiles);
  const findings = [
    ...checkBrokenWikilinks(allMdFiles, fileIndex),
    ...checkWikilinkAnchors(allMdFiles, fileIndex),
    ...checkGawundeotjeom(allMdFiles),
    ...checkSectionMark(allMdFiles),
  ];
  const errors = findings.filter(f => f.severity === 'error');
  const warnings = findings.filter(f => f.severity === 'warning');
  if (JSON_OUT) {
    console.log(JSON.stringify({
      ok: errors.length === 0,
      errorCount: errors.length,
      warningCount: warnings.length,
      scanned: allMdFiles.length,
      findings,
    }, null, 2));
  } else {
    console.log(`Wiki lint v2: ${allMdFiles.length}개 .md 스캔`);
    if (findings.length === 0) {
      console.log('✓ 발견 0건');
    } else {
      console.log(`✗ error ${errors.length}건 / warning ${warnings.length}건\n`);
      const byType = {};
      for (const f of findings) {
        byType[f.type] = byType[f.type] || [];
        byType[f.type].push(f);
      }
      for (const type of Object.keys(byType)) {
        const sev = byType[type][0].severity;
        console.log(`[${type}] (${sev}) ${byType[type].length}건`);
        for (const f of byType[type]) {
          console.log(`  ${f.file}:${f.line}: ${f.message}`);
        }
        console.log('');
      }
    }
  }
  process.exit(errors.length === 0 ? 0 : 1);
}

main();
