#!/usr/bin/env node
// DOCX → MD 변환 파이프라인
// 사용법: node scripts/import-doc.mjs <path-to-docx>
// 출력:
//   03_References/_sources/<name>.docx          (원본 보존)
//   03_References/converted/<name>/<name>.md    (변환 본문)
//   03_References/converted/<name>/figures/     (추출 이미지)
//   03_References/converted/<name>/<name>_review_pending.md  (검수 큐 사이드카)
//
// JSON 결과를 stdout으로 출력. 호출자(슬래시 커맨드 등)가 파싱하여 사용자에게 안내.

import { spawnSync, execFileSync } from 'node:child_process';
import {
  copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync,
  statSync, writeFileSync,
} from 'node:fs';
import { basename, dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '..');

function fail(msg, extra = {}) {
  console.log(JSON.stringify({ ok: false, error: msg, ...extra }, null, 2));
  process.exit(1);
}

function findPandoc() {
  // 1) PATH
  try {
    execFileSync('pandoc', ['--version'], { stdio: 'ignore' });
    return 'pandoc';
  } catch {}

  // 2) 환경 변수
  if (process.env.PANDOC_PATH && existsSync(process.env.PANDOC_PATH)) {
    return process.env.PANDOC_PATH;
  }

  // 3) winget 설치 경로 (Windows)
  if (process.platform === 'win32') {
    const wingetBase = join(process.env.LOCALAPPDATA || '', 'Microsoft', 'WinGet', 'Packages');
    if (existsSync(wingetBase)) {
      try {
        const dirs = readdirSync(wingetBase).filter(d => d.startsWith('JohnMacFarlane.Pandoc'));
        for (const dir of dirs) {
          const subdirs = readdirSync(join(wingetBase, dir)).filter(d => d.startsWith('pandoc-'));
          for (const subdir of subdirs) {
            const candidate = join(wingetBase, dir, subdir, 'pandoc.exe');
            if (existsSync(candidate)) return candidate;
          }
        }
      } catch {}
    }
  }

  // 4) 일반 설치 경로
  const candidates = [
    join(process.env.ProgramFiles || '', 'Pandoc', 'pandoc.exe'),
    '/usr/bin/pandoc',
    '/usr/local/bin/pandoc',
  ];
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }

  return null;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function countMatches(text, pattern) {
  const m = text.match(pattern);
  return m ? m.length : 0;
}

function listFigures(figuresDir) {
  if (!existsSync(figuresDir)) return [];
  const out = [];
  function walk(dir) {
    for (const ent of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, ent.name);
      if (ent.isDirectory()) walk(full);
      else if (ent.isFile()) out.push(full);
    }
  }
  walk(figuresDir);
  return out;
}

// ---- main ----
const inputArg = process.argv[2];
if (!inputArg) {
  fail('Usage: node scripts/import-doc.mjs <path-to-docx>');
}

const inputAbs = resolve(inputArg);
if (!existsSync(inputAbs)) fail(`입력 파일이 없음: ${inputAbs}`);
if (!statSync(inputAbs).isFile()) fail(`파일이 아님: ${inputAbs}`);
if (extname(inputAbs).toLowerCase() !== '.docx') {
  fail(`DOCX 파일이 아님 (.docx 확장자 필요): ${inputAbs}`);
}

const pandoc = findPandoc();
if (!pandoc) {
  fail('pandoc을 찾을 수 없음. winget install --id JohnMacFarlane.Pandoc 으로 설치 후 새 셸에서 재시도.');
}

const sourceName = basename(inputAbs, '.docx');
const sourcesDir = join(REPO_ROOT, '03_References', '_sources');
const sourcePath = join(sourcesDir, `${sourceName}.docx`);
const convertedDir = join(REPO_ROOT, '03_References', 'converted', sourceName);
const mdPath = join(convertedDir, `${sourceName}.md`);
const figuresDir = join(convertedDir, 'figures');
const sidecarPath = join(convertedDir, `${sourceName}_review_pending.md`);

mkdirSync(sourcesDir, { recursive: true });
mkdirSync(convertedDir, { recursive: true });
mkdirSync(figuresDir, { recursive: true });

// 원본을 _sources/로 복사 (이미 거기에 있으면 skip)
if (resolve(inputAbs) !== resolve(sourcePath)) {
  copyFileSync(inputAbs, sourcePath);
}

// Pandoc 실행
// - DOCX → markdown (grid_tables로 셀 병합 보존)
// - 미디어는 figures/ 로 추출
const pandocArgs = [
  '--from', 'docx',
  '--to', 'markdown+grid_tables+pipe_tables+raw_html+footnotes',
  '--wrap=none',
  `--extract-media=${figuresDir}`,
  '--standalone',
  '-o', mdPath,
  sourcePath,
];

const result = spawnSync(pandoc, pandocArgs, { encoding: 'utf8' });
if (result.status !== 0) {
  fail('Pandoc 변환 실패', {
    stderr: result.stderr,
    stdout: result.stdout,
    pandoc,
    args: pandocArgs,
  });
}

// Frontmatter 주입 (Pandoc 기본 헤더가 있으면 제거 후 새로 주입)
const dateStr = today();
let content = readFileSync(mdPath, 'utf8');
content = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');

const relSource = relative(REPO_ROOT, sourcePath).replace(/\\/g, '/');
const frontmatter = `---
title: ${sourceName}
tags: [reference, converted, docx]
source: ${relSource}
converted: ${dateStr}
created: ${dateStr}
updated: ${dateStr}
---

`;

writeFileSync(mdPath, frontmatter + content);

// 간이 통계 (검수 큐 사이드카 생성용)
const finalContent = readFileSync(mdPath, 'utf8');
const tableMd = countMatches(finalContent, /\n\|.+\|\n/g);
const tableGrid = countMatches(finalContent, /\n\+[-+=]+\+\n/g);
const tableHtml = countMatches(finalContent, /<table[\s>]/g);
const figures = listFigures(figuresDir);
const pandocWarnings = (result.stderr || '').trim();

// 검수 큐 사이드카
const sidecar = `---
title: ${sourceName} — 검수 큐
tags: [review-queue, converted]
source: ${relSource}
created: ${dateStr}
updated: ${dateStr}
---

# ${sourceName} — 검수 큐

> 변환 과정의 자동 통계와 사람 검수가 필요한 항목 목록. 항목별 확인 후 본 줄에 \`[x]\` 체크. 모두 완료되면 본 사이드카 파일 삭제 가능.

## 자동 통계

| 항목 | 수 |
|---|---|
| 파이프 테이블 (markdown) | ${tableMd} |
| 그리드 테이블 (markdown, 복잡 구조) | ${tableGrid} |
| HTML 테이블 (raw_html fallback) | ${tableHtml} |
| 추출 이미지 | ${figures.length} |

## 검수 체크리스트

### 표
- [ ] 모든 표가 원본과 셀 내용 일치 (특히 그리드/HTML 테이블)
- [ ] 셀 병합이 있던 표가 의미적으로 보존됐는지 (rowspan/colspan)
- [ ] 표 헤더 행 위치 정확 (다중 헤더는 수동 점검 필요)
- [ ] 표 내 인용 수치 → 원본 \`[[${sourceName}|원본]]\` 대조

### 이미지
${figures.length === 0
  ? '- (추출된 이미지 없음)'
  : figures.map(f => `- [ ] \`${relative(convertedDir, f).replace(/\\/g, '/')}\` — 본문 참조 위치 확인, 캡션 보존 여부 확인`).join('\n')}

### 본문 일관성
- [ ] 페이지/문단 누락 없음
- [ ] 각주/주석 보존
- [ ] 한자/특수문자 인코딩 정상

## Pandoc 경고

${pandocWarnings ? '```\n' + pandocWarnings + '\n```' : '(경고 없음)'}

## 관련 문서

- 원본: \`${relSource}\`
- 변환본: [[${sourceName}]]
- 가이드: [[docx 변환 파이프라인]]
`;

writeFileSync(sidecarPath, sidecar);

// 결과 출력 (호출자가 파싱)
console.log(JSON.stringify({
  ok: true,
  pandoc,
  source: relSource,
  converted: relative(REPO_ROOT, mdPath).replace(/\\/g, '/'),
  figuresDir: relative(REPO_ROOT, figuresDir).replace(/\\/g, '/'),
  sidecar: relative(REPO_ROOT, sidecarPath).replace(/\\/g, '/'),
  stats: {
    tableMd,
    tableGrid,
    tableHtml,
    figures: figures.length,
  },
  warnings: pandocWarnings || null,
}, null, 2));
