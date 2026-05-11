---
title: DOCX 변환 파이프라인
tags: [howto, pipeline, docx, pandoc, ingest]
created: 2026-05-11
updated: 2026-05-11
---

# DOCX 변환 파이프라인

> 제안서/보고서 등 한컴 HWPX 문서를 LLM Wiki에 통합 가능한 MD로 변환하는 표준 절차. AI 에이전트가 후속 작업에서 환각 없이 인용할 수 있는 수준의 구조 보존이 목표.

## 한눈에 보는 절차

```
HWPX 원본
  ↓ (사용자: 한컴오피스 "다른 이름으로 저장" → DOCX)
DOCX 파일
  ↓ (사용자: /import-doc <DOCX 경로>)
[스크립트 자동 실행]
  ├─ 03_References/_sources/<name>.docx               (원본 보존)
  ├─ 03_References/converted/<name>/<name>.md         (변환 본문)
  ├─ 03_References/converted/<name>/figures/          (추출 이미지)
  └─ 03_References/converted/<name>/<name>_review_pending.md   (검수 큐)
  ↓
[사용자 검수]
  - 사이드카 체크리스트 확인
  - 표/이미지 정합성 검토
  - 완료 후 사이드카 삭제
```

## 사전 준비

- Pandoc 설치 (최초 1회): `winget install --id JohnMacFarlane.Pandoc`. 설치 후 새 셸 열어 `pandoc --version`으로 확인
- Node.js 설치 (Codex 플러그인과 공유). 별도 설치 불필요
- 한컴오피스 (HWPX → DOCX 저장용)

## 사용법

### 1. HWPX를 DOCX로 변환

한컴오피스에서 HWPX 파일 열기 → **파일 > 다른 이름으로 저장** → 파일 형식 **`.docx`** 선택 → 임의의 작업 폴더에 저장.

### 2. 슬래시 커맨드 호출

Claude Code 프롬프트에서:

```
/import-doc "C:/path/to/제안서.docx"
```

또는 이미 `_sources/`에 두었다면:

```
/import-doc "03_References/_sources/제안서.docx"
```

### 3. 결과 확인

스크립트가 다음을 출력:
- 변환된 MD 경로 (`03_References/converted/<name>/<name>.md`)
- 검수 큐 사이드카 경로
- 자동 통계 (표 N개, 이미지 N개)
- Pandoc 경고가 있으면 그대로 표시

Claude Code는 추가로:
- MOC에 신규 변환본 등록
- log.md에 `ingest` 항목 추가

### 4. 검수 큐 처리

`<name>_review_pending.md` 파일을 열어 체크리스트 항목을 하나씩 확인:
- 표가 원본과 셀 내용 일치하는지
- 셀 병합이 의미적으로 보존됐는지 (rowspan/colspan)
- 이미지가 본문에서 올바르게 참조되는지
- 각주·한자·특수문자 보존 여부

문제 없으면 사이드카 파일 삭제. 일부 항목이 손상됐다면 본문 직접 수정 후 사이드카에 수정 내역 기록.

## 표 처리 정책

복잡한 제안서 표는 단계적 fallback으로 처리:

| 단계 | 형식 | 적용 조건 | 신뢰도 |
|---|---|---|---|
| 1 | 파이프 테이블 (markdown) | 단순 표 (병합 없음, 단일 헤더) | 높음 |
| 2 | 그리드 테이블 (markdown) | 다중 행 헤더 또는 복잡 구조 | 중간 |
| 3 | HTML 테이블 (raw_html) | rowspan/colspan 셀 병합 | 중간 — 사람 검수 권장 |
| 4 | PNG 캡처 + 캡션 인용 | Pandoc도 처리 못 하는 극단적 표 | 낮음 — 원본 참조 필수 |

Pandoc은 기본적으로 1~3을 자동 선택. 4는 V1에서는 자동화하지 않음 (수동 보정).

검수 큐 사이드카의 자동 통계에 분포가 표시되므로, HTML 테이블이 많으면 사람 검수 시간을 더 배정.

## 이미지 처리 정책

- **추출**: 항상. `figures/` 폴더에 `image1.png`, `image2.jpg` 등으로 분리
- **본문 참조**: 항상. `![](figures/image1.png)` 형태로 자동 삽입
- **자동 설명 (Vision 모델)**: **OFF**. 환각 위험으로 기본 비활성
- **캡션**: 원본 DOCX의 텍스트 캡션은 보존 (Pandoc이 자동 처리)
- **사용자가 시각 해석을 원한다면**: 별도 명령(`/describe-image` 등, 미구현)을 명시적으로 호출. 자동으로 일어나지 않음

## 환각 방지 원칙

이 파이프라인은 **"AI 에이전트가 후속 작업에서 인용해도 안전한 형태"**가 목표. 따라서:

- **텍스트 콘텐츠 (표 셀, 본문, 캡션)**: 충실 전사. Pandoc 신뢰
- **시각 콘텐츠 (도표·차트·다이어그램)**: 파일로 보존만, 자동 해석 금지
- **불확실한 변환**: 검수 큐 사이드카에 명시. 사람 검수 전까지 "신뢰도 낮음"으로 취급
- **변환물은 정본이 아님**: `converted/`는 사본. 인용 기준은 항상 `_sources/`의 원본 또는 `_locked/`의 정본

## 트러블슈팅

### `pandoc을 찾을 수 없음` 에러

1. 새 PowerShell 창에서 `pandoc --version` 확인
2. 설치되어 있는데도 안 잡히면 PATH 미반영 — 셸 재시작 또는 `PANDOC_PATH` 환경변수로 직접 지정
3. 스크립트는 winget 설치 경로를 자동 탐색하므로 보통 자동 해결됨

### 한글 파일명/경로

- 따옴표로 감쌀 것: `/import-doc "03_References/_sources/연구계획서_v2.docx"`
- Windows 경로 구분자(`\`)는 Node.js가 자동 정규화

### 변환 결과가 깨짐

- DOCX 자체가 손상되었을 가능성 — 한컴에서 다시 저장
- DOCX가 비밀번호 보호되어 있으면 Pandoc 실패 — 보호 해제 후 재시도
- 표가 너무 복잡하면 일부 손실 가능 — 검수 큐에서 확인 후 수동 보정

## 관련 문서

- [[AGENTS|에이전트 작업 지침]] §디렉토리 구조 / §수정 금지 문서
- 스크립트: `scripts/import-doc.mjs`
- 슬래시 커맨드: `.claude/commands/import-doc.md`
