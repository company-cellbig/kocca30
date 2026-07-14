#!/usr/bin/env node
// wiki_lint.mjs - LLM Wiki 정합성 자동 검증
// 사용법: node scripts/wiki_lint.mjs [--json]
//
// 검증 항목 (v2):
//   1. 깨진 wikilink: [[파일명]]의 대상 파일이 실재하는지
//      severity: warning (CONVENTIONS §3.마 "링크 대상 문서가 아직 없어도 괜찮음: 나중에 생성" 허용)
//   2. wikilink anchor 정합: [[파일#anchor]]의 anchor가 헤딩 텍스트와 일치하는지
//      severity: error (대상 파일 존재인데 anchor 매칭 안 됨: 명백한 stale)
//   3. 가운뎃점(·) 위배: 일반 위키 영역에 가운뎃점 사용 (CONVENTIONS §3.라 위배)
//      severity: error
//
// exit code:
//   - 0: error 0건 (warning은 표시만 하고 통과)
//   - 1: error 1건 이상
//
// 검증 대상 외 (자동 검증의 본질적 한계):
//   - 본문 § 참조 stale: 자연어 본문에 § 표시가 녹아있어 라벨 경계 정확 검출이 NLP 수준
//     필요. 정규식 단순 매칭은 false positive 과다: 정책으로 보완 (CONVENTIONS §3.마):
//     절 라벨 변경 시 본문 grep 의무. 더 안전하려면 § 표시 대신 wikilink anchor 사용
//
// 별도 스크립트:
//   - 헤딩 넘버링 정합 (H1 1./H2 가./H3 1)/H4 가) 끊김/중복) → scripts/wiki_number.mjs
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
  // 파일명이 비면([[#anchor]]) 자기 문서 참조 (CONVENTIONS §3.마가 허용하는 형식)
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
      const matched = targetHeadings.some(h => h.text === link.anchor);
      if (!matched) {
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
          message: `가운뎃점 \`·\` 사용: CONVENTIONS §3.라 위배 (쉼표 또는 슬래시로 대체)`,
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
