---
title: 작업 로그
tags: [log]
created: 2026-04-27
updated: 2026-05-11
---

# 작업 로그

> 에이전트(Claude Code 작성, Codex 검수)의 모든 작업 기록. 최신 항목이 위에 옴.

## [2026-05-11] update | HWPX 파서 V2 — 표 직전 isolated bullet 라벨 H2 자동 승격

- 사용자 요청 (2-3 §창의성·혁신성 검수): 1단 bullet 하위에 표가 있을 때 bullet을 헤더로 변환 + 표를 일반 pipe_table로 표시. 공용 규칙 적합성 검토
- 검토 결과 (적합) — 조건부 적용으로 false positive 회피
  - 적합 케이스: "기술적 차별성", "사업화 모델(BM)" 같은 isolated 라벨 + 표 구조 (RFP 형식 흔한 패턴)
  - 부적합 위험: "시너지 효과" 같은 nested bullet 자식이 잘못 승격될 수 있음. 텍스트 길이만으론 라벨 판정 불가
- 안전 조건 5가지 (모두 만족 시 승격):
  1. `- text` 형태 (1단 bullet, 들여쓰기 0)
  2. text 길이 ≤ 25자
  3. text가 `:` 로 끝나지 않음
  4. text가 시각 마커(○/●/◇/■/-)로 시작 안 함
  5. 그 위 paragraph가 bullet이 아님 (isolated 라벨만 후보 — nested 자식 보호)
- 적용: `emit_table()` 진입 시점에 직전 lines 검사. 조건 만족 시 `lines[-1]`을 `## text`로 교체 + `last_bullet_indent = -1` reset → 표가 자동으로 bullet block 밖 분기(pipe_table)로 emit
- 검증:
  - 2.md 2-3 `- 기술적 차별성` (8자, isolated) → `## 기술적 차별성` + table 11(8×3, 병합 없음) pipe_table로 정상 출력
  - 2.md `- 연구 목표 대비 기존 기술과 해당 과제와의 차이점` (29자) → 한계 25자 초과로 미승격, cross-product 평탄화 유지
  - 1.md `- 시너지 효과` (6자) → 위 paragraph가 bullet(nested)이라 미승격, 기존 cross-product 유지 ✓
- 회귀: 다른 문서 영향 0 (5개 grep 결과 2.md "기술적 차별성"만 새 H2)
- 가이드 §HWPX 파싱 정책에 "구조 기반 헤딩 승격" 항목 추가

## [2026-05-11] update | HWPX 파서 V2 — 한글 라벨 H2 + 정의 목록 헤더 row 생략

- 사용자 검수에서 발견:
  - `가-1. 결과물의 성능지표`, `가-2. 평가방법 및 평가환경` 같은 한글 라벨이 plain paragraph로 떨어짐 (헤딩 부여 안 됨)
  - 정의 목록 변환 시 헤더 row(`주요 성능지표` / `세부 평가방법 및 평가환경`)가 본문 라벨과 중복되어 시각적 노이즈
- 진단:
  - H2 패턴 정규식이 `\d+-\d+-\d+\.`만 인식. 한글 라벨(`가-N.`, `나-N.` 등)은 RFP에서 H2 하위 섹션으로 흔히 사용되지만 누락
  - 정의 목록은 모든 row 동일 처리. 첫 row가 헤더이면 본문 라벨(예: `**무형문화유산 특성 분류 정확도**`)과 헤더 라벨(예: `**주요 성능지표**`)이 같이 출력되어 어느 게 헤더인지 모호
- 수정:
  - H2_PAT 정규식 확장: `^\s*(?:\d+-\d+-\d+\.|[가-하]-\d+\.)\s` — 한글 라벨도 H2로 매핑
  - render_definition_list 첫 row 헤더 감지: 우측 셀 텍스트 ≤50자면 헤더로 간주, 출력 생략. H2 헤딩이 이미 컨텍스트를 주므로 헤더 row 중복 불필요
- 결과 (2.md):
  - `## 가-1. 결과물의 성능지표` + 그 아래 pipe_table
  - `## 가-2. 평가방법 및 평가환경` + 헤더 row 생략 + 본문 row들의 라벨이 곧바로 `**...**`로 출력
- AI 데이터 파악 측면 분석 정리 (사용자 질문):
  - **셀 짧음·균등** → pipe_table (격자 보존)
  - **셀 paragraph 다수·hierarchy 있음** → 정의 목록 (각 항목 별도 bullet)
  - **셀 병합 있음** → cross-product (병합 정보 보존 + self-contained 라인)
- 가이드 §HWPX 파싱 정책에 한글 라벨 H2 매핑 추가 (다음 update에서)

## [2026-05-11] update | HWPX 파서 V2 — inline equation + 시작 dash 마커 처리

- 사용자 검수 (2.md 가-2 평가방법 표): 수식·변수 누락 + `- - text` 이중 dash 발견
- 진단:
  - 한컴 원본 셀에 `<hp:equation>` element 안 `<hp:script>` 에 LaTeX-like 수식 텍스트(`FID= LEFT ∥ mu _{r} - mu _{g} ...`)와 변수(`X_{r}`, `X_{g}`, `SIGMA _{r}` 등) 보관. V2가 `<hp:t>`만 추출해서 수식 element 전체 무시 → 의미 불가능
  - 원본 paragraph 텍스트가 시각적으로 `- 멀티모달...`처럼 dash로 시작하는 케이스가 많음(paraPr.heading=NONE인데 사용자가 직접 입력한 dash). V2가 dash를 정보로 보존한 상태에서 다시 `- ` bullet prefix → `- - text` 이중 dash
- 수정:
  - `_extract_inline()` 신규: paragraph 순회 시 `<hp:t>` 텍스트 + `<hp:equation>` 내부 `<hp:script>` 텍스트 결합. 수식은 백틱 inline code(`` `text` ``)로 감싸 정보 보존. lineBreak callback도 동일 함수에서 처리(`para_text`/`para_lines` 두 함수 공유)
  - 한컴 script 안의 backtick 문자는 LaTeX 공백 분리자 같은 의미 → 공백으로 치환해 inline code 중첩 방지
  - `LEADING_VISUAL_MARK`에 `-` 추가: `^\s*(?:[○●◇◆■□▶▸▣•·ㆍ]|-)\s+` — 시작 dash도 시각 마커로 인정해 strip
- 검증: 2.md L611-614에 `X_{r}`, `X_{g}` 변수 + 전체 FID 수식 + μ/Σ 정의 모두 inline 백틱으로 보존. `- - text` 케이스 모두 단일 `- text`로 정정
- 가이드 §HWPX 파싱 정책에 inline equation 처리 정책 추가 필요 (다음 update에서)

## [2026-05-11] review | Codex adversarial review 결과 반영 — 2종 high finding 해소

- 2.md 1차 자기검수 통과 후 `/codex:adversarial-review` 호출. verdict: `needs-attention` (high 2건)
- **Finding 1 [high, scripts/import-doc.mjs:135]**: `_sources` 원본 silent overwrite. 같은 basename의 다른 파일을 import하면 `copyFileSync`가 기존 원본을 덮어쓰는데 AGENTS.md `_xxx/` read-only 정책과 직접 충돌. provenance 손실 위험
  - 수정: copy 직전 `sourcePath` 존재 시 SHA256 비교. 동일 hash면 skip (idempotent), 다른 hash면 명시적 error + 두 hash 노출. `crypto.createHash` 사용
- **Finding 2 [high, assets/extract_hwpx.py:442]**: `Contents/section0.xml` 하드코딩. HWPX가 multi-section이면 section1+ 본문이 silent data loss
  - 수정: ZIP에서 `^Contents/section(\d+)\.xml$` 패턴으로 발견 → 숫자 정렬 → 순차 walk. section 경계에서 `last_bullet_indent = -1` reset. stats에 `sections` 수 추가
- 회귀 검증: 5개 모두 `sections=1`로 처리, H1/표/이미지/bullets 통계 동일. 본 5종 RFP는 section0만 사용하나 향후 multi-section HWPX 대응 확보
- 갱신: `02_HowTo/docx 변환 파이프라인.md`
  - §HWPX 파싱 정책 §Section 처리 신규
  - §문제 패턴 사전 패턴 12(다중 section silent data loss) + 패턴 13(_sources silent overwrite) 신규
- 일반 원리:
  - "컨테이너 포맷의 첫 entry만 하드코딩 금지 — 패턴 매칭으로 전체 발견" (PDF/EPUB/DOCX 등 모든 컨테이너 변환기에 적용)
  - "read-only 영역에 쓰는 코드 경로는 모두 동일성 검증 — 정책 문서만으로는 강제력 없음"

## [2026-05-11] update | HWPX 파서 V2 — 섹션 라벨 1행 표 list block 강제 reset (재진단)

- 사용자 재지적: 직전 fix 후 `1 단계(2차연도)`가 자식 들여쓰기 4단(`\t\t\t- **1 단계(2차연도)**`)으로 떨어짐. 원본은 `1 단계(1차연도)`와 같은 1×1 짧은 라벨 표인데 출력 깊이가 다름
- 재진단: 원문은 정상 (두 표 동일 형식). 변환기가 last_bullet_indent를 무조건 상속해서 위치별로 깊이 다르게 출력하는 게 원인. 직전 fix(1행 표 fallback `- **label**`)는 누락은 해결했으나 위계 문제 미해결
- 수정: `emit_table()`에 1행 × 짧은 셀들(`≤30자`) 표 전용 분기 추가. **위치 무관하게 list block 끊고**(`last_bullet_indent = -1`) 들여쓰기 0의 bold 라벨로 emit. `render_flattened_rows()`의 1행 fallback은 의미 없으므로 제거
- 결과:
  - 2.md L49 `**1 단계(1차연도)**` (들여쓰기 0)
  - 2.md L274 `**1 단계(2차연도)**` (들여쓰기 0, 동일 깊이) — 원문 의도 일치
- 가이드 패턴 11 갱신: "섹션 라벨 1행 표가 직전 bullet 깊이를 잘못 상속". 일반 원리 — 의미상 명확한 라벨류(섹션 라벨, 헤딩, 캡션)는 list block 자동 상속 대상이 아님

## [2026-05-11] update | HWPX 파서 V2 — bullet block 안 1행 표 누락 fix

- 사용자 검수에서 발견: 2.md 2-2 §단계별 연구개발에서 `1 단계(1차연도)`는 변환됐는데 `1 단계(2차연도)`는 누락
- 진단: 한컴 원본 table 2 (1행 1열, "1 단계(1차연도)") 와 table 6 (1행 1열, "1 단계(2차연도)") 두 개 1×1 라벨 표. table 2는 bullet block 밖(H1 직후)에서 emit → `render_table()`의 1행 짧은 셀 → bold 라벨 정상 출력. table 6은 bullet block 안(1차연도 본문 종료 시점)에서 emit → `render_flattened_rows()` 호출 → 첫 row를 헤더로 두고 i=1부터 본문 처리하는데 1행만 있어 본문 row 0 → 빈 리스트 반환 → 누락
- 수정: `render_flattened_rows()`에 1행 표 fallback. `len(rows) == 1`이면 `[f'- **{label}**']` 반환
- 검증: 2.md L273에 `- **1 단계(2차연도)**` 자식 들여쓰기로 정상 출력
- 가이드 §문제 패턴 사전에 패턴 11 신규 추가: 엣지 케이스(rows=1, cols=1) 누락 — 일반 원리 "추출-렌더 사이 모든 경로에서 빈 결과 가능성 점검"

## [2026-05-11] update | 02_HowTo §HWPX 파싱 정책·§설계 원칙·§문제 패턴 사전 일관성 정리

- 사용자 질문: "지금까지 수정 내용이 일회성인지 향후 재발 시 대처할 수 있게 규칙에 추가되어 있는지". 정직한 답: 코드+log는 반영됐으나 가이드 §문제 패턴 사전이 최근 5건 누락. 보강 진행
- §HWPX 파싱 정책 갱신:
  - 표 처리 §라벨↔내용 정의식 표: 휴리스틱 완화 조건(끝 빈 컬럼 허용, 텍스트 100자 기준) + 셀 내 paragraph hierarchy 보존 명시
  - §의미 보존 불가 표(colCnt ≥ 12) 자동 메모 정책 명시
  - §이미지 경로 갱신 (V2 분리 구조 `../_figures/<name>/...`) + 캡션 패턴 4종(`[그림]/[표]/[도표]/[사진]`)
  - §시각 마커 처리 신규 — strip_visual_marker 정책 명시
  - §Frontmatter 형식 신규 — `---` 직후 빈 줄 0개 정책
- §설계 원칙 확장 (5개 → 8개): 메타데이터 보존(6), AI 인용 안전성(7), fail-safe 휴리스틱(8) 추가. 모두 검증된 일반 원리 — 다른 변환기·다른 문서 형식에 재사용 가능
- §문제 패턴 사전 패턴 10 신규: 셀 안 paragraph hierarchy 손실
  - 일반 원리 명시: "추출 단계에서 메타데이터 폐기 금지. 단순화는 출력 단계 책임"
  - 재발 가능 케이스 나열: PDF font 메타데이터, HTML 인라인 태그, 표 셀 hierarchy 등
- 결과: 현재 코드 상태와 가이드 문서가 동기화됨. 향후 다른 변환 작업(PDF, RTF, HTML 등)에서도 §설계 원칙 + §문제 패턴 사전 참고 가능

## [2026-05-11] update | HWPX 파서 V2 — 셀 paragraph 들여쓰기 hierarchy 보존

- 문제: 2.md 2-1 §최종 목표에서 원본 hierarchy(□ 부모 1개 + • 자식 4개)가 모두 1단 bullet으로 평탄화. paraPr 63(heading.type=NONE) = 부모와 paraPr 65(heading.type=BULLET, idRef=3) = 자식 구분 정보가 변환 과정에서 손실
- 진단: 셀 paragraph 추출 시 단순 text 리스트로만 수집해 paraPr 들여쓰기 정보 폐기
- 수정:
  - `extract_cells()`가 `paraPr_map`을 인자로 받고 셀 paragraph를 `(text, indent)` tuple로 반환
  - indent 매핑: `heading.type=NONE` → 0(부모), `heading.type=BULLET idRef=N` → max(1, N-1)
  - `render_definition_list()`가 indent로 부모/자식 출력 (`- text` vs `\t- text`)
  - `render_table()`의 시그니처를 `tbl` → `rows`로 변경 (호출자에서 paraPr_map과 함께 추출 후 전달, 이중 추출 방지)
  - 호환성: `_cell_text()` helper로 tuple/string 양쪽 모두 처리
- 검증:
  - 2.md 최종 목표: `- 무형문화유산...` 부모 1개 + `\t- 암묵지의 형식지화...` 자식 4개로 정확히 1+4 계층 복원
  - 2.md 세부 목표 카테고리 마커(`[무형유산 동작 분석 및 정량화]`) + 자식 매핑도 정상
- 5개 모두 재변환

## [2026-05-11] update | HWPX 파서 V2 — bullet block 안 표 평탄화를 cross-product 형식으로

- 사용자 요구: 변환물에서 AI 에이전트가 원본 표 의미를 정확히 파악 가능해야 함. 부분 인용 시에도 모호성 없어야 함
- 직전 평탄화 형식(`col1: col2 / col3 / col4`)의 한계:
  - 헤더 row와 본문 row가 분리 인용되면 컬럼 매핑 잃음
  - 셀 내용에 `/`가 있으면 셀 구분자와 모호
  - 빈 셀이 있는 row에서 슬래시 카운트가 헤더와 어긋남
- 수정: `render_flattened_rows()`를 cross-product 형식으로 재작성. 각 셀을 `row_label / col_label: value` 한 줄로 출력
  - 시너지 효과 표 예: `- 특성 / 택견(K-Motion): 개인 수련 중심`
  - 부분 인용 안전: 한 줄에 row 라벨 + 컬럼 라벨 + 값 모두 내장
  - 헤더가 비어있는 컬럼은 `(컬럼N)` fallback
  - 빈 셀 줄은 출력 안 함 (정보 생략)
- 추가 보정: rowSpan 후속 row의 첫 컬럼(row 라벨)이 비어있으면 직전 row 라벨 상속
  - 멀티모달 데이터 확보 종목 표: "택견" rowSpan=3 / "남사당놀이" rowSpan=6 → 후속 row 6개에 자동 라벨 부여
  - 예: `- 택견 / 종목: 홀새김`, `- 남사당놀이 / 분야: 인형극`
- 5개 재변환: 통계 동일, 표 평탄화 결과만 cross-product 형식으로 변경. 표 격자 시각 손실은 그대로(이미 list 안 pipe_table 미지원), 대신 의미 보존 완벽

## [2026-05-11] update | HWPX 파서 V2 — 검수 발견 4종 결함 일괄 보정

사용자 검수에서 발견된 4종 이슈 일괄 처리:

**(1) 표 셀 병합 (rowSpan/colSpan) 미반영 — 가장 심각**
- 증상: 4.md 마일스톤 표(rowCnt=17, colCnt=8)에서 첫 컬럼 rowSpan=4/rowSpan=5 병합을 무시 → 후속 row의 셀들이 한 칸씩 밀려 모든 값 어긋남. 인용 신뢰성 fatal
- 수정: `extract_cells()`를 2D grid 기반으로 재작성. `<hp:cellAddr colAddr rowAddr>`와 `<hp:cellSpan rowSpan colSpan>` 정보 사용. 병합 영역의 후속 위치는 빈 리스트로 점유 표시. row-major 출력 시 컬럼 위치가 정확히 정렬됨
- `render_flattened_rows()` / `render_pipe_table()` 모두 grid 기반으로 갱신. 평탄화 시 첫 셀이 비어있는 row(병합 후속)는 라벨 없이 `- col2 / col3` 형태로 출력

**(2) 시각 bullet 기호 (□, ●, ▶, • 등) 텍스트에 남음**
- 증상: 2.md L15에 `- □ 무형문화유산(암묵지)...` 처럼 `□` 마크가 bullet 텍스트 안에 그대로 노출
- 수정: `CIRCLE_BULLET_PAT` 확장(`[○●◇◆■□▶▸▣]`) + `strip_visual_marker()` 함수 추가. paragraph bullet 출력 시 시작 시각 마커 제거. `extract_cells()`의 셀 paragraph 추출 시에도 동일 적용 (정의 목록 변환물에서도 마커 제거)

**(3) 5.md 사업화 모델 표가 정의 목록 판정 못 받음**
- 증상: 5-3 사업화 모델/추진 주체/시장분석/사업화 전략 표가 4행짜리 라벨↔내용 구조인데 pipe_table로 출력되어 가독성 떨어짐
- 진단: 원본이 3열(끝 빈 컬럼) 표 + 우측 셀 paragraph가 1개씩만 있어서 `is_label_content_table()`의 `len(r) == 2` + `paragraph ≥ 3` 조건 모두 실패
- 수정: 휴리스틱 완화 — 비어있지 않은 셀이 정확히 2개인 row 모두 인정(끝 빈 컬럼 무시) + 우측 셀 paragraph 수 ≥ 3 또는 합산 텍스트 ≥ 100자
- `render_definition_list()`도 동적으로 비어있지 않은 셀 위치 결정
- 캡션 패턴에 `[도표]`, `[사진]` 추가 (`[그림]`/`[표]`만 잡던 정규식 확장)

**(4) 3-3 추진일정 등 의미 보존 불가 표 자동 메모 처리**
- 증상: 3-3 §추진일정의 19×13 / 21×13 월별 그리드 표가 텍스트 추출 시 셀 위치 정보 손실 → 의미 없는 콘텐츠 노출
- 수정: `emit_table()`에 자동 감지 추가 — `col_cnt ≥ 12`인 표는 의미 보존 불가로 판정하고 `> **변환 한계**: 원본의 N×M 표(월별 그리드 등)는 텍스트 추출 시 셀 위치 정보 손실...` 메모로 대체. 본문에서 가짜 데이터 제거, 인용은 원본 HWPX 참조하도록 안내

**5개 재변환 최종 통계** (`pipe_table만 tableMd, 나머지 bold/정의목록/평탄화는 backendStats.tables에 포함`)
- 1.hwpx: H1 4 / 표 3 / 이미지 18 / bullets 97
- 2.hwpx: H1 4 / 표 17 / 이미지 44 / bullets 270
- 3.hwpx: H1 3 / 표 7(월별 그리드 2개는 메모 대체) / 이미지 1 / bullets 58
- 4.hwpx: H1 0 / 표 5 (마일스톤 표 셀 병합 정상 반영) / 이미지 0 / bullets 0
- 5.hwpx: H1 3 / 표 4 / 이미지 20 / bullets 87

## [2026-05-11] update | HWPX 파서 V2 — bullet block 안 표 평탄화 (Obsidian 호환)

- 직전 시도(들여쓰기 inline pipe_table)가 사용자 검수에서 실패 확인. Obsidian이 들여쓰기된 pipe_table을 list item continuation으로 해석해서 표 문법 무효, raw text로 표시 (`| 구분 | 종목 | 분야 |` 그대로 노출)
- 원인: GFM pipe_table은 들여쓰기 0에서만 보장. 들여쓰기 안 표는 뷰어 구현마다 동작 다름
- 사용자 결정: bullet block 안 표는 row 단위 1단 bullet으로 평탄화 (ref_1~5 수작업 방식과 일관). bullet block 밖은 pipe_table 유지
- 수정: `assets/extract_hwpx.py`
  - 신규 `render_flattened_rows(rows)` — 헤더 행 `**col1 / col2 / col3**`, 본문 행 `col1: col2 / col3` (빈 셀 제외)
  - `emit_table()` 분기: list block 안 → 평탄화 + 자식 들여쓰기 + last_bullet_indent 보존. list block 밖 → 기존 분류(bold/정의 목록/pipe_table)
- 갱신: `02_HowTo/docx 변환 파이프라인.md`
  - §표 처리에 위치별 분기(bullet block 안 vs 밖) 명시
  - §문제 패턴 사전 패턴 3 보강 + 신규 패턴 7(bullet block 안 pipe_table 미렌더) 추가
- 5개 재변환 결과:
  - 1.hwpx 시너지 효과/글로벌 거점 표가 부모 bullet 자식 들여쓰기 안에 row bullet으로 평탄화 (ref_1과 동일 형태)
  - 2.hwpx 멀티모달 데이터 확보 종목 표도 동일하게 평탄화. 표 다음 bullet은 원래 2단 들여쓰기 흐름 정상 유지

## [2026-05-11] update | HWPX 파서 V2 — bullet block 안 표 inline 출력

- 문제: 2.hwpx 검수에서 표 다음에 이어지는 bullet들이 엉킴. L94 "멀티모달 데이터 수집 총괄..." (3단) → L95-105 표 → L107 "무형문화유산 특화..." (2단) 흐름에서 표가 list block을 끊어 후속 bullet이 부모 없는 들여쓰기로 깨짐
- 진단: §문제 패턴 사전 패턴 3(list block 끊김)과 동일 부류. 이미지/캡션은 list block 안 inline으로 해결했지만 emit_table()은 여전히 빈 줄로 list block 끊고 last_bullet_indent를 -1로 reset함
- 수정: `assets/extract_hwpx.py`의 `emit_table()`이 list block 안일 때(`last_bullet_indent >= 0`) 각 표 라인에 `\t * (last+1)` 들여쓰기 prefix. last_bullet_indent는 보존 — 표 다음 bullet이 원래 들여쓰기 흐름을 이어감
- 카운터 보정: `scripts/import-doc.mjs`의 `tableMd` 정규식이 들여쓰기된 pipe table을 매치하도록 `\n[\t ]*\|...` 패턴으로 갱신
- 재변환: 5개 모두 정상. 1.hwpx 시너지/글로벌 거점 표가 부모 bullet 자식 들여쓰기로 inline (3단), 2.hwpx 멀티모달 데이터 확보 종목 표도 동일 형태로 inline
- 통계: 1번 표 2 / 2번 11 / 3번 6 / 4번 2 / 5번 1 (pipe_table만 카운트). 4번은 5개 중 2개만 카운트 — 나머지 3개는 정의 목록/bold 라벨로 변환

## [2026-05-11] update | HWPX 파서 V2 — 헤딩 한 단 올리기 + 챕터 헤더 줄 제거

- 사용자 명확화: 5개 HWPX는 원본 RFP를 H1별로 분리한 것. 따라서 (1) 파일 내부의 `N-M.`은 H1, `N-M-K.`는 H2여야 함. (2) 본문 첫 줄의 챕터 헤더(`**N / 챕터제목**`)는 파일명과 중복이므로 제거
- 수정 1 (헤딩 레벨): `assets/extract_hwpx.py`의 `detect_heading()` 매핑 변경. `H2_PAT`/`H3_PAT` 변수명을 `H1_PAT`/`H2_PAT`으로 갱신 (의미 명확화). H2 패턴 → level 1, H3 패턴 → level 2
- 수정 2 (챕터 헤더 줄 제거): `walk()` 후처리 단계 추가. lines 순회하면서 첫 비어있지 않은 줄이 `**...**` bold 단락이면 빈 줄로 교체. 한컴 RFP가 챕터 시작 1행 표(`[ N | | 챕터제목 ]`)를 V2 `render_table()`이 bold 라벨로 변환하는 패턴을 후처리로 제거
- 수정 3 (stats): `extract_hwpx.py`의 stats 초기값에 `h1` 추가. `scripts/import-doc.mjs`의 `h3Count` 제거, `h1Count` 추가. 사이드카 검수 체크리스트의 헤딩 항목도 H1/H2 기준으로 갱신
- 갱신: `02_HowTo/docx 변환 파이프라인.md` §HWPX 파싱 정책의 헤딩 매핑 표 (H2→H1, H3→H2). "원본 RFP를 H1별로 분리" 가정 명시
- 5개 일괄 재변환 결과:
  - 1.hwpx: H1 4 (1-1~1-4) / 표 3 / 이미지 18 / bullets 97
  - 2.hwpx: H1 4 (2-1~2-4) / 표 17 / 이미지 44 / bullets 270
  - 3.hwpx: H1 3 (3-1~3-3) / 표 7 / 이미지 1 / bullets 58
  - 4.hwpx: H1 0 / 표 5 / 이미지 0 / bullets 0 (`N-M.` 패턴 없는 표 모음 문서)
  - 5.hwpx: H1 3 (5-1~5-3) / 표 4 / 이미지 20 / bullets 87
- ref_1~5와 정합성: ref_1~5(_locked)는 수작업 시 `## N-M.` H2로 작성. converted는 V2가 `# N-M.` H1로 자동 부여. 의미상 동일하나 깊이 한 단 차이 — 정본 후보 결정 시 양쪽 중 어느 깊이를 표준으로 할지 사용자 결정 필요

## [2026-05-11] ingest | 5. 연구개발성과의 활용방안 및 기대효과.hwpx 변환·통합

- 원본: `03_References/_sources/5. 연구개발성과의 활용방안 및 기대효과.hwpx`
- 변환본: [[5. 연구개발성과의 활용방안 및 기대효과]]
- 검수 큐: [[5. 연구개발성과의 활용방안 및 기대효과.review]]
- 백엔드: python (extract_hwpx.py)
- 자동 통계: H2 3 / H3 0 / 표 4 (pipe 1 + 정의 목록·bold 라벨 3) / 이미지 20 / bullets 87
- 변환기 경고: 없음
- 특이사항: H2 3개(`5-1, 5-2, 5-3`). ref_5 로그에서 언급된 7개 사업화 영역은 본문 bullet으로 들어갔을 가능성 — 검수 시 §5-3 구조 확인 권장
- 후속: 5개 HWPX 전체 변환 완료. 일괄 검수 후 사이드카 삭제 → 정본 후보로 승격 또는 _locked/와의 정합성 점검

## [2026-05-11] update | HWPX 파서 V2 — 챕터 제목 흡수 게이트 제거

- 문제: 4.hwpx 첫 시도에서 모든 통계 0 (H2/표/이미지/bullets 전부). 본문이 완전히 비어 변환됨
- 진단: `seen_first_h2` 게이트가 첫 H2(`\d+-\d+\.` 패턴) 만날 때까지 모든 paragraph를 frontmatter title로 흡수. 4.hwpx는 H2 패턴(`N-M.`)이 없는 구조(`1 단계(1차연도)`, `1 단계(2차연도)` 같은 패턴) → 281개 paragraph 전체가 삼켜짐
- 진짜 원인: 챕터 제목 흡수 휴리스틱이 1.hwpx에 특화되어 일반 규칙으로 부적합. 한컴 문서마다 헤딩 패턴이 다른데 단일 정규식에 의존
- 수정: `assets/extract_hwpx.py`의 `seen_first_h2` 게이트 + `if not seen_first_h2[0]: return` paragraph 차단 + `emit_table()`의 차단 모두 제거. 모든 paragraph는 본문 출력. frontmatter title은 파일명에서 자동 생성되므로 중복 정보(`1`, `연구개발의 필요성`)가 본문 최상단에 추가되지만 무해
- 회귀: 1.hwpx 표 2→3 (챕터 헤더 1×3 표 `**1 / 연구개발의 필요성**` 추가 출력). 2.hwpx 표 16→17. 3.hwpx 표 6→7. 모두 챕터 헤더 표가 본문에 추가된 결과 — 정보 손실 없음, 본문 상단에 한 줄 추가될 뿐
- 문서 패턴 사전(02_HowTo) 갱신 필요 (다음 update에서)

## [2026-05-11] ingest | 4. 마일스톤 체계 및 수행계획.hwpx 변환·통합

- 원본: `03_References/_sources/4. 마일스톤 체계 및 수행계획.hwpx`
- 변환본: [[4. 마일스톤 체계 및 수행계획]]
- 검수 큐: [[4. 마일스톤 체계 및 수행계획.review]]
- 백엔드: python (extract_hwpx.py)
- 자동 통계: H2 0 / H3 0 / 표 5 (pipe) / 이미지 0 / bullets 0
- 변환기 경고: 없음
- 특이사항: 이 문서는 `N-M.` 패턴 H2 없음 — 마일스톤 표 위주의 표 모음 문서. 본문 텍스트가 거의 없고 표 5개가 핵심 콘텐츠. ref_4(이전 수작업)에서 `# 1단계(1차연도)`/`# 1단계(2차연도)` H1 추가했었음 — V2는 그 H1을 자동 부여 못 하므로 검수 시 수동 추가 또는 표 라벨로 그대로 두기 결정 필요
- 후속: 사용자 Obsidian 검수 → 이상 없으면 다음 파일(5.hwpx) 변환

## [2026-05-11] ingest | 3. 연구개발의 추진전략과 방법 및 추진일정.hwpx 변환·통합

- 원본: `03_References/_sources/3. 연구개발의 추진전략과 방법 및 추진일정.hwpx`
- 변환본: [[3. 연구개발의 추진전략과 방법 및 추진일정]]
- 검수 큐: [[3. 연구개발의 추진전략과 방법 및 추진일정.review]]
- 백엔드: python (extract_hwpx.py)
- 자동 통계: H2 3 / H3 0 / 표 6 (pipe) / 이미지 1 / bullets 58
- 변환기 경고: 없음
- 특이사항: H2가 3개(`3-1, 3-2, 3-3`) — 다른 문서들의 4개 구조와 다름. 원본 RFP 챕터 3 구조 그대로 보존됨. 이미지 1장(추진체계 다이어그램으로 추정)
- 후속: 사용자 Obsidian 검수 → 이상 없으면 다음 파일(4.hwpx) 변환

## [2026-05-11] ingest | 2. 연구개발의 목표 및 내용.hwpx 변환·통합

- 원본: `03_References/_sources/2. 연구개발의 목표 및 내용.hwpx`
- 변환본: [[2. 연구개발의 목표 및 내용]]
- 검수 큐: [[2. 연구개발의 목표 및 내용.review]]
- 백엔드: python (extract_hwpx.py)
- 자동 통계: H2 4 / H3 0 / 표 16 (pipe 11 + 정의 목록 3 + bold 라벨 2) / 이미지 44 / bullets 270
- 변환기 경고: 없음
- 후속: 사용자 Obsidian 검수 → 이상 없으면 다음 파일(3.hwpx) 변환

## [2026-05-11] update | converted/는 본문만 — _figures/, _reviews/ 신규 분리

- 사용자 요청: converted/에 1차적으로 변환된 문서만 보이도록. figures, reviews는 별도 폴더로
- 새 구조 (AGENTS.md `_xxx/` 컨벤션 일관 적용):
  ```
  03_References/
  ├── _sources/   (원본, read-only)
  ├── _locked/    (정본, read-only)
  ├── _figures/   (변환 추출 이미지, 변환 파이프라인 외 수정 금지) ← 신규
  ├── _reviews/   (검수 큐, 일시 — 검수 후 삭제) ← 신규
  └── converted/  (변환 본문 .md만, 1차 탐색 대상)
  ```
- 분리 근거: 자산 수명·역할 차이. figures(영구)·reviews(일시)는 본문(인용 대상)과 다른 성격
- 수정:
  - `assets/extract_hwpx.py`: figures link prefix를 MD 기준 동적 상대경로(`os.path.relpath`)로 계산. figures 위치 이동에 자동 보정
  - `scripts/import-doc.mjs`: `figuresDir` → `_figures/<name>/`, `sidecarPath` → `_reviews/<name>.review.md`. DOCX 경로 Pandoc 후처리도 동일 link 전략 적용
  - `AGENTS.md`: §디렉토리 구조에 `_figures/`/`_reviews/` 추가, §수정 금지 문서에 read-only 대상으로 등록, §하지 말 것 갱신
  - `02_HowTo/docx 변환 파이프라인.md` §출력 위치 + 절차 다이어그램 갱신
  - `.claude/commands/import-doc.md` JSON 출력 예시 갱신
- 재변환: 1.hwpx 새 구조로. 본문 link 정상(`![](../_figures/<name>/imageN.png)`), figures/reviews 위치 분리 확인

## [2026-05-11] ingest | 1. 연구개발의 필요성.hwpx 변환·통합

- 원본: `03_References/_sources/1. 연구개발의 필요성.hwpx`
- 변환본: [[1. 연구개발의 필요성]]
- 검수 큐: [[1. 연구개발의 필요성.review]]
- 백엔드: python (extract_hwpx.py)
- 자동 통계: H2 4 / H3 0 / 표 2 (pipe) / 이미지 18 / bullets 97
- 변환기 경고: 없음
- 후속: 사용자 Obsidian 검수 → 이상 없으면 다음 파일(2.hwpx) 변환

## [2026-05-11] update | converted/ 디렉토리 평탄화

- 문제: `converted/<name>/<name>.md` 폴더당 중첩 + `figures/media/` 이중 폴더 구조가 불필요하게 복잡 (사용자 지적). Pandoc 기본 동작(`--extract-media` → media/ 서브폴더) + 폴더당 묶음 의도를 그대로 유지한 결과
- 새 구조:
  ```
  03_References/converted/
  ├── <name>.md
  ├── <name>.review.md
  └── <name>.figures/
      ├── image1.png
      └── ...
  ```
- 수정: `assets/extract_hwpx.py` — `figures_dir/media/` 제거, figures_dir 바로 아래에 이미지 복사. 본문 link prefix를 figures_dir의 basename(예: `1. 연구개발의 필요성.figures`)으로 사용
- 수정: `scripts/import-doc.mjs` — `convertedDir` 변수 제거, `convertedRoot` 기준으로 `.md`/`.review.md`/`.figures/` 평탄 배치. DOCX 경로의 Pandoc 출력 후처리도 figures_name 기준으로 치환
- 갱신: `.claude/commands/import-doc.md`, `02_HowTo/docx 변환 파이프라인.md` — 새 출력 위치와 경로 표기 반영
- 갱신: MOC — 사이드카 wikilink `[[xxx_review_pending]]` → `[[xxx.review]]`
- 재변환: 1.hwpx, 2.hwpx 모두 새 구조로. 산출물 통계 동일 (H2/표/이미지 개수 변화 없음)

## [2026-05-11] update | HWPX 파서 V2 — 이미지/캡션 list-block 인식 (들여쓰기 inline)

- 문제: 1-4 섹션에서 bullet 자식 사이에 이미지가 들어가면 빈 줄 + 들여쓰기 0 출력으로 list block이 끊김. Obsidian이 후속 bullet을 "부모 없는 들여쓰기"로 인식해 코드 블록처럼 raw 렌더
- 진단: list 흐름 안에 있는 이미지/캡션/빈 paragraph가 모두 들여쓰기 0 + 빈 줄로 출력되어 마크다운 list가 끊김. 한컴 원본은 한 절에서 bullet-이미지-bullet 순서로 paragraph 흐름이 이어지는 게 일반적
- 수정: `assets/extract_hwpx.py`
  - `last_bullet_indent` 상태 추가 (마지막 bullet 들여쓰기 단계, -1 = block 밖)
  - bullet 출력 시 갱신, 헤딩/표/plain paragraph 출력 시 -1로 reset (list block 명시적 끊음)
  - 이미지 paragraph: list block 안이면 `\t * (last+1)` 들여쓰기로 inline, 밖이면 평문
  - 캡션 paragraph (align=CENTER + `[그림]/[표]`): 동일 들여쓰기 정책
  - 빈 paragraph: list block 안에서는 무시, 밖에서만 빈 줄 출력
- 재변환:
  - 1.hwpx: 1-4 섹션 list 흐름 끊김 없이 자연스럽게 이어짐. ref_1.md(수작업) 들여쓰기와 동일
  - 2.hwpx: 단계별 bullet/이미지 흐름 모두 정상

## [2026-05-11] update | HWPX 파서 V2 — ○/●/◇/■ 처리를 H3에서 1단 bullet으로 변경

- 문제: 사용자 검수에서 1-4 섹션 렌더가 깨짐을 확인. `### ○ 주관연구기관:` 헤딩 직후 자식 bullet들이 paraPr.heading.idRef=1/2 기반 들여쓰기로 출력되어 Obsidian이 들여쓰기 코드처럼 인식
- 진단: ○를 H3로 만들면 자식 bullet 들여쓰기 정합성 깨짐. ref_1.md(수작업)도 ○를 H3가 아닌 1단 bullet으로 처리했음
- 수정: `detect_heading()`에서 `H3_BULLET_PAT` 제거. paragraph 처리 단계에서 `^[○●◇■]\s` 패턴은 paraPr와 무관하게 강제로 1단 bullet으로 변환. ○ 마크는 그대로 유지(원본 보존)
- 재변환:
  - 1.hwpx: H3 0개 (○ 4개가 모두 bullet으로 이동), bullets 93 → 97
  - 2.hwpx: H3 0개 (○ 20개가 모두 bullet으로 이동), bullets 250 → 270
- ref_1.md(수작업) 구조와 동일 형태 자동 산출

## [2026-05-11] update | HWPX 파서 V2 — 표 출력을 pipe_table로 교체

- 문제: 사용자 검수에서 1번 변환본의 grid_table이 Obsidian에서 raw text로 표시 + 한글 너비 차이로 정렬 깨짐 확인
- 진단: Pandoc grid_table(`+---+`) 문법은 Pandoc 확장. Obsidian/GitHub/VS Code 등 표준 마크다운 뷰어는 pipe_table만 지원
- 수정: `assets/extract_hwpx.py` 의 `render_grid_table()` → `render_pipe_table()` 교체
  - `| header | ... |` + `|---|---|` 구분선 + 본문 행
  - 셀 내 줄바꿈: `<br>` (Obsidian/GFM 모두 지원)
  - 셀 내 `|` 문자: `\|` 이스케이프
- 재변환:
  - 1.hwpx: 표 2개 모두 pipe_table로 출력 (시너지 효과 4×3, 글로벌 거점 5×4)
  - 2.hwpx: 16개 표 중 11개 pipe_table, 3개 정의 목록, 2개 bold 라벨
- 변환기 stats 자동 분포 변화: tableGrid → tableMd로 이동 (출력 포맷만 바뀜, 표 개수 자체는 동일)

## [2026-05-11] ingest | 1. 연구개발의 필요성.hwpx 재변환 (파일명 통일)

- 사용자가 외부에서 `_sources/1 연구개발의 필요성.hwpx` → `1. 연구개발의 필요성.hwpx`로 rename (2~5번과 `N. xxx` 형식 일관성 맞춤)
- 재변환 산출물: `converted/1. 연구개발의 필요성/` (V2 HWPX 파서, 표 처리 정책 V2 반영)
- 자동 통계: H2 4 / H3 4 / 표 2 (grid) / 이미지 18 / bullets 93 (이전과 동일)
- 폐기: 구 폴더 `converted/1 연구개발의 필요성/` 삭제
- MOC 갱신: `[[1. 연구개발의 필요성]]`으로 wikilink 변경

## [2026-05-11] update | HWPX 파서 V2 — 표 처리 정책 보강

- 문제: V2 1차 산출물에서 한컴 원본의 "라벨↔내용" 표(좌측 짧은 라벨, 우측 paragraph 수십 개)가 단일 cell에 `<br>` 수십 개로 join되어 grid_table 폭이 폭주. 2.md L13~15 ("최종 목표" / "세부 목표" 표)에서 표 폭이 페이지 넘김
- 진단: 원본 표 자체가 정의식 표(라벨 + 긴 내용 paragraph 다수). 셀 병합 없음 (colSpan=1, rowSpan=1). 데이터 표가 아니라 의미 단위 컨테이너로 사용된 표
- 사용자 결정: 정의 목록(`**label**` + bullet list) 형태로 변환. 진짜 데이터 표(시너지 효과, 글로벌 거점 등)는 grid_table 유지
- 보강: `assets/extract_hwpx.py` 의 `render_table()` 분기 추가
  - `is_label_content_table()` 휴리스틱: 2열, 좌측 모든 셀 ≤30자, 어느 행 우측 paragraph ≥3개
  - `render_definition_list()`: `**라벨**` + bullets. 카테고리 마커(`[xxx]` 시작) 다음 paragraph들은 자동 2단 들여쓰기
  - 1행 × 1열 표 (또는 1행 N열 짧은 셀들): `**text**` bold 단락으로 변환 (섹션 라벨용)
  - 그 외: `render_grid_table()` 유지
- 재검증:
  - 1.hwpx: 표 2개 (시너지 효과, 글로벌 거점) 모두 grid_table 유지 (진짜 데이터 표 판정)
  - 2.hwpx: 16개 표 중 3개가 정의 목록으로 변환 (라벨↔내용 표), 13개는 grid_table 유지. "1 단계(1차연도)" 같은 섹션 라벨 표는 bold로 처리

## [2026-05-11] update | HWPX 직접 변환 파이프라인 V2 + 결함 3건 해소

- 배경: 1.docx/2.docx 변환에서 (1) 헤딩 손실 (2) 이미지 절대경로 (3) 표 카운터 0 보고 3종 결함 발견. 원인 분석 결과 (1)은 한컴오피스 HWPX→DOCX export 시 paragraph 스타일이 Word `Heading 1/2`로 매핑되지 않는 한계임을 확정. DOCX 후처리 보강보다 HWPX 직접 파싱이 효율적
- 신규: `assets/extract_hwpx.py` 전면 재작성 (V2 파서)
  - HWPX(ZIP)에서 `Contents/section0.xml` paragraph 순회 + `Contents/header.xml`의 `<hh:paraPr>` 분석
  - 헤딩 자동 부여: 텍스트 패턴(`^\d+-\d+\.\s` → H2, `^\d+-\d+-\d+\.\s`/`^[○●◇■]\s` → H3). 첫 H2 이전 단락(챕터 번호/제목)은 frontmatter title로만 사용, 본문 생략
  - Bullet 들여쓰기: `<hh:heading type="BULLET" idRef="N">` 값으로 자동 결정 (1/2/3 단)
  - 표 보존: `<hp:tbl>` (paragraph 내부 중첩 포함) → Pandoc grid_table 렌더, 셀 내 줄바꿈은 `<br>`
  - 이미지: `BinData/*` 전체를 `figures/media/`로 복사, `<hp:pic>`의 `binaryItemIDRef` 기반 본문 위치 매핑. 캡션은 align=CENTER + `[그림]` 패턴
  - LLM 호출 0 — 결정론적 XML 처리
- 확장: `scripts/import-doc.mjs` 분기 처리 추가
  - `.hwpx` → Python 파서 호출 (권장 경로)
  - `.docx` → 기존 Pandoc 경로 + 후처리(이미지 절대경로 → 상대경로 치환, 백슬래시 → 슬래시)
  - 표 카운터 버그 수정: grid_table 헤더 구분선(`+===+`)만 매치 — `+---+` 행 구분선까지 잡던 V1 버그 해소
  - 사이드카에 H2/H3 헤딩 수 추가 표시
- 갱신: `.claude/commands/import-doc.md` — HWPX 인자 지원, 백엔드/통계 필드 추가
- 갱신: `02_HowTo/docx 변환 파이프라인.md` — HWPX 우선 워크플로우로 재구성, 파싱 정책 명시
- 검증: 1.hwpx (H2 4 + H3 4 + 표 2 + 이미지 18, ref_1과 구조 일치), 2.hwpx (H2 4 + H3 20 + 표 16 + 이미지 44)
- 폐기: `03_References/converted/1/` (DOCX V1 산출물, 헤딩 손실 / 이미지 경로 결함). `converted/2. 연구개발의 목표 및 내용/`은 HWPX V2 산출물로 덮어쓰기됨
- 정리: `_sources/`의 DOCX 사본 5개 제거 (`1 연구개발의 필요성..docx`, `2.docx`, `3.docx`, `4.docx`, `5.docx`). HWPX 직접 변환 V2가 정본 경로이므로 한컴 export 산출물 불필요. HWPX 5종(`1~5.hwpx`)은 유지

## [2026-05-11] ingest | 1 연구개발의 필요성.hwpx 변환·통합 (V2 HWPX 직접 파서)

- 원본: `03_References/_sources/1 연구개발의 필요성.hwpx`
- 변환본: [[1 연구개발의 필요성]]
- 검수 큐: [[1 연구개발의 필요성_review_pending]]
- 백엔드: python (assets/extract_hwpx.py)
- 자동 통계: H2 4 / H3 4 / 표 2 (grid) / 이미지 18 / bullets 93
- 변환기 경고: 없음
- ref_1.md(수작업 H2 부여, 표 평탄화, 이미지 제외)와의 차이: V2는 표 grid_table 보존 + 이미지 본문 위치 매핑 + 가운뎃점 `·` 원문 보존. 헤딩 구조는 ref_1과 일치(`## 1-1.`~`## 1-4.`)
- 후속: 검수 큐 체크리스트 사람 검토 (인용문/캡션 위치 일부 어색, 본문 흐름 점검)

## [2026-05-11] ingest | 2. 연구개발의 목표 및 내용.hwpx 변환·통합 (V2 HWPX 직접 파서)

- 원본: `03_References/_sources/2. 연구개발의 목표 및 내용.hwpx`
- 변환본: [[2. 연구개발의 목표 및 내용]]
- 검수 큐: [[2. 연구개발의 목표 및 내용_review_pending]]
- 백엔드: python (assets/extract_hwpx.py)
- 자동 통계: H2 4 / H3 20 / 표 16 (grid) / 이미지 44 / bullets 250
- 변환기 경고: 없음
- 직전 DOCX 변환(2.docx, 한컴 export)의 헤딩 손실 + 표 카운터 0 결함 모두 해소
- 후속: 검수 큐 체크리스트 사람 검토

## [2026-05-11] ingest | 2. 연구개발의 목표 및 내용.docx 변환·통합

- 원본: `03_References/_sources/2. 연구개발의 목표 및 내용.docx`
- 변환본: [[2. 연구개발의 목표 및 내용]]
- 검수 큐: [[2. 연구개발의 목표 및 내용_review_pending]]
- 자동 통계: 표 0개 보고 (스크립트 카운터 버그 — 실제로는 다수 grid 테이블 존재, 1.docx 변환 시 확인된 결함 ② 재현), 이미지 41개 (image18~image58, 원본 HWPX 시리즈의 전역 번호 그대로 보존)
- Pandoc 경고: 없음
- 헤딩 손실 검증: `**2-1.**`~`**2-4.**` 볼드 단락만 존재, `## ` H2 없음. 1.docx와 동일 증상 → **한컴오피스 HWPX→DOCX export 한계로 확정**. Pandoc은 DOCX의 Heading 스타일에 의존하므로 한컴이 부여 안 한 스타일은 복원 불가
- 후속: import-doc.mjs 결함 ①(이미지 절대경로) ②(표 카운터) 수정 → 1.docx/2.docx 재변환 또는 후처리 패치 결정 필요

## [2026-05-11] ingest | 1.docx 변환·통합

- 원본: `03_References/_sources/1.docx`
- 변환본: [[1]]
- 검수 큐: [[1_review_pending]]
- 자동 통계: 표 0개 (MD/Grid/HTML 모두 0), 이미지 18개 (png 8 / bmp 8 / wmf 1 / 기타 1)
- Pandoc 경고: 없음
- 후속: 검수 큐 체크리스트 사람 검토 → 본문 참조 위치/캡션 보존 확인 → 모두 OK면 사이드카 삭제

## [2026-05-11] create | DOCX 변환 파이프라인 구축

- 목적: HWPX 제안서 등 문서를 AI 에이전트가 후속 작업에서 환각 없이 인용 가능한 MD 형태로 변환하는 표준 절차
- 입력 경로: 사용자가 한컴에서 HWPX → DOCX로 직접 저장 (Pandoc DOCX 처리가 HWPX보다 안정적)
- 컨벤션 확장: `AGENTS.md` 디렉토리 구조에 `_sources/`, `converted/`, `scripts/` 추가. 수정 금지 규칙을 `_xxx/` 접두 폴더 일반 패턴으로 갱신 (기존 `_locked/` 단일 폴더 → `_locked/` + `_sources/` + 향후 추가될 `_archive/` 등에 자동 적용)
- 신규 파일:
  - `scripts/import-doc.mjs` — Node.js 변환 스크립트. Pandoc 자동 탐색(PATH → env → winget → 일반 경로), DOCX → MD + figures/ + frontmatter + 검수 큐 사이드카
  - `.claude/commands/import-doc.md` — 슬래시 커맨드 정의. 스크립트 호출 + 결과 사용자 안내 + MOC/log 자동 갱신 절차
  - `02_HowTo/docx 변환 파이프라인.md` — 사용 가이드. 표 fallback 정책(4단), 이미지 처리 정책(Vision OFF 기본값), 환각 방지 원칙, 트러블슈팅
- 스캐폴딩: `03_References/_sources/.gitkeep`, `03_References/converted/.gitkeep`
- 정책 핵심:
  - 텍스트(셀·본문·캡션)는 충실 전사, 시각(도표·차트)은 파일 보존만, 자동 해석 금지
  - 변환물(`converted/`)은 정본 아님. 인용은 `_sources/` 원본 또는 `_locked/` 정본 기준
  - 검수 큐 사이드카 도입으로 사람 검수 게이트 명시화
- 메모리 반영: `reference_pandoc_path.md` 등록 (winget 설치 경로, PATH fallback용)
- 다음 단계: 실제 DOCX로 end-to-end 테스트 → 표 fallback 정밀화 (V2)

## [2026-05-11] review | C안 자기검수 결과 반영 — 포커스 텍스트 자체 결함 정정

- 실증 비교 결과: (a) 기본 호출 1 finding [medium] vs (b) 포커스 첨부 호출 3 findings [high/medium/low]. 포커스 첨부 시 catch율 33% → 100%, 저장소 고유 규약 위반(파일명 underscore, 가운뎃점) 발견은 (b) 전용
- 정정 1 [high → 해소]: `AGENTS.md` §검수 호출 방식의 호출 예시가 placeholder(`<[[codex_검수_포커스]] §표준 포커스 텍스트 블록 전체>`)였던 것을 실제 P1~P5 블록 전문으로 교체 — 복사-붙여넣기로 동작
- 정정 2 [medium → 해소]: `02_HowTo/codex_검수_포커스.md` → `02_HowTo/codex 검수 포커스.md` (git mv). AGENTS.md L31 "공백 대신 언더스코어 사용 금지" 위반 해소. MOC, log 내 wikilink/경로 표기 갱신
- 정정 3 [low → 해소]: 포커스 텍스트 P1~P4 헤더 및 본문의 `·` → `/`로 교체 (가운뎃점 금지 자가모순 해소). 단 L46의 `` `·` ``는 문자 자체 인용이므로 inline code로 유지 (AGENTS.md L73과 동일 패턴)
- 결론: 자기검수 회로 작동 확인. 포커스 첨부 워크플로우가 자기 산출물 결함을 실제로 잡아냄

## [2026-05-11] create | Codex 검수 포커스 텍스트 표준화 (C안)

- 배경: 외부 Claude 세션 피드백("검토 에이전트에 비판적 리뷰어 시스템 프롬프트를 명시적으로 줘야 catch율이 올라감") 반영
- 진단: `/codex:adversarial-review`의 기본 attack surface가 코드 중심(auth/race/migration)으로 하드코딩 → 마크다운 저장소에는 부적합. 직전 commit(`4e28ed8`)에서 _locked 변경은 잡았으나 frontmatter `updated:` 누락 등 문서 규약 위반 미검출
- 작성: `02_HowTo/codex 검수 포커스.md` 신규 — 5층 우선순위(P1 사실 오류 → P5 위키 정합성) 포커스 텍스트 정의
- 갱신: `AGENTS.md` §검수 호출 방식 — 모든 검수 호출에 포커스 텍스트 첨부 의무화. 호출 예시를 포커스 템플릿 참조 형태로 갱신
- 갱신: `00_Index/MOC.md` 가이드 섹션에 `[[codex 검수 포커스]]` 등록, updated 갱신
- 정정: 로드맵 3종(`로드맵 전체`, `1년차`, `2년차`) frontmatter `updated: 2026-04-27` → `2026-05-11` (직전 commit `4e28ed8`에서 누락된 AGENTS.md L122 규칙 준수)
- 후속: 동일 diff에 (a) 기본 호출 vs (b) 포커스 첨부 호출의 catch율 비교 실증 예정. 결과는 별도 로그 항목으로 기록

## [2026-05-11] update | 04_Projects 로드맵 3종 검토 및 정합 보정

- 검토 대상: `04_Projects/로드맵 전체.md`, `04_Projects/로드맵 1단계 1년차.md`, `04_Projects/로드맵 1단계 2년차.md`
- (a) 위키링크 오타 일괄 수정: `[[ref_3. 연구갭라의 추진전략과 방법 및 추진일정]]` → `[[ref_3. 연구개발의 추진전략과 방법 및 추진일정]]` (3개 파일)
- (b) "(6종)" 라벨 의미 명시: RFP 정량 요건([[ref_제안요청서]] L33/56/78 "서비스 시나리오 6종 이상")의 인용임을 3개 문서에 명시. 1차연도 택견 6종으로 1차 충족, 2차연도 누적 확장. 2년차 §3 5.3에 비고 추가, §8 헤더 보강. 모든 문서 관련 문서에 `[[ref_제안요청서]]` 추가
- (c) 글로벌 실증 출처 명시: 일정·인원·검증항목 정본이 `[[ref_2]] L253~262`임을 로드맵 전체 §7, 2년차 §6 헤더 아래에 인라인 표기
- (d) **원문 정정 (전사 오류 수정)**: `ref_4. 마일스톤 체계 및 수행계획.md` L170의 3.2 목표일정 `26.06 ~ 26.12` → `27.01 ~ 27.12`. **사용자가 외부 원본 RFP/근거자료를 직접 대조하여 확인한 결과** — 추론 정정이 아니라 _locked 파일 import 단계의 전사 오류를 정본 기준으로 수정. 정본은 `27.01 ~ 27.12`임. 로드맵 2년차의 3.2 항목에 일정 추가 및 플래그 비고 제거
- (d-review) Codex adversarial review가 (d)를 "추론 기반 _locked 변경"으로 [high] 플래그했으나, 사용자 확인 결과 외부 원본 대조에 따른 정정임이 확인되어 현재 상태 유지. 후속 검수에서 동일 항목 재플래그 시 본 메모 참조
- 수정 파일: `04_Projects/로드맵 전체.md`, `04_Projects/로드맵 1단계 1년차.md`, `04_Projects/로드맵 1단계 2년차.md`, `03_References/_locked/ref_4. 마일스톤 체계 및 수행계획.md`
- 메모리 신규: `project_scenario_scope.md` ("6종"의 RFP 출처와 단위 해석)
- 미해결: `ref_2:540` SW 등록 5건 목표 vs 연차별 2+2=4건 합산 불일치 (원문 모순, 별도 조치 필요)

## [2026-05-08] update | CLAUDE.md stub 삭제 (AGENTS.md 자동 로드 검증)

- `CLAUDE.md` (`@AGENTS.md` import 1줄 stub) 제거 — Claude Code 최신 버전이 AGENTS.md를 직접 자동 로드하는지 검증
- `AGENTS.md` 디렉토리 구조 도식에서 `CLAUDE.md` 라인 삭제, 주석을 "Claude Code, Codex 공용 자동 로드"로 갱신
- `00_Index/MOC.md` 관련 문서에서 CLAUDE stub 항목 제거
- 검증 방법: 다음 새 Claude Code 세션 시작 시 시스템 컨텍스트에 AGENTS.md 본문이 자동 인라인되는지 확인. 자동 로드 안 되면 `git revert HEAD`로 stub 복구
- 삭제 파일: `CLAUDE.md`
- 수정 파일: `AGENTS.md`, `00_Index/MOC.md`

## [2026-05-08] update | AGENTS.md 락 대상 명시 항목 제거

- `### 수정 금지 문서 (read-only)` 섹션에서 하드코딩된 "현재 락 대상" 두 항목 삭제
- 사유: 여러 프로젝트에서 재사용되는 지침 문서이므로 특정 파일명 명시는 부적절
- 대체: 락 대상은 `03_References/_locked/` 디렉토리의 실제 파일 목록을 그때그때 확인하라는 안내로 일반화
- 수정 파일: `AGENTS.md`

## [2026-05-08] update | git 도입 + CLAUDE.md → AGENTS.md 이전 + Codex 검수 기준 신설

- vault를 git 저장소로 초기화, 원격 `https://github.com/company-cellbig/kocca30.git` 연결
- `CLAUDE.md` 본문을 `AGENTS.md`로 이전 (Claude/Codex 공용 지침)
  - `## Claude 작업 지침` → `## 에이전트 작업 지침`으로 일반화, 역할 분담 표 추가
  - `## Codex 검수 기준 (lint checklist)` 섹션 신설: 수치 인용/락 영역/문체/wikilink/메타데이터/로그 6개 항목
  - 디렉토리 구조 도식 갱신
  - 작업유형 접두사에 `review` 추가
- `CLAUDE.md`는 `@AGENTS.md` import 한 줄짜리 stub으로 축소 (Claude Code 자동 로드 호환 유지)
- `00_Index/MOC.md` 관련 문서 항목 갱신 — AGENTS 메인, CLAUDE stub 표기
- `.gitignore` 신설 — `.obsidian/workspace*.json`, `.trash/`, OS 임시파일 제외
- 생성 파일: `AGENTS.md`, `.gitignore`
- 수정 파일: `CLAUDE.md`, `00_Index/MOC.md`
- 새 wikilink: `[[AGENTS]]` (양방향)

## [2026-05-08] update | CLAUDE.md 수치·목표 인용 원칙 추가

- `문서 작성 규칙` 섹션 말미(Wikilink 규칙 다음)에 `### 수치·목표 인용 원칙 (엄격)` 항목 신설
- 핵심: 모든 정량 지표·목표·일정·조직·산출물 수치는 `03_References/` 원문 직접 참조 의무화, 임의 추정·창작 금지
- 절차 5단계(원문 확인 → wikilink 출처 → 미명시 시 `원문 미명시` 표기 → 충돌 시 양측 병기 후 확인 요청 → 외부 자료 구분 표기) 명시
- 금지 사항 4건(어림값/시장 평균/출처 없는 N단위/단위변환 시 원문 병기 누락) 명시
- 수정 파일: `CLAUDE.md`

## [2026-04-27] create | 개발 로드맵 3종 작성

- ref_2/ref_3/ref_4를 종합하여 `04_Projects/`에 3개 로드맵 문서 작성
- 생성 파일
	- `04_Projects/로드맵 전체.md` — 1단계(2년) 전체 로드맵, 5개 기관 Value Chain, 4대 트랙, KPI 추적, 글로벌 실증, 최종 산출물
	- `04_Projects/로드맵 1단계 1년차.md` — 2026.04~12 3 Phase 분기별 일정, 4 그룹 16개 마일스톤, 시나리오 6종 + 데이터 수집 종목
	- `04_Projects/로드맵 1단계 2년차.md` — 2027.01~12 4 Q 분기별 일정, 5 그룹 18개 마일스톤, 글로벌 실증 3개소, 사업화 패키징
- MOC 갱신: `00_Index/MOC.md`에 프로젝트 항목 3건 등록
- 새 wikilink: `[[로드맵 전체]]`, `[[로드맵 1단계 1년차]]`, `[[로드맵 1단계 2년차]]` (각각 ref_1~ref_5와 양방향 연결)

## [2026-04-27] ingest | 5.hwpx → ref_5. 연구개발성과의 활용방안 및 기대효과

- 사용자 승인하에 `_locked/ref_5. 연구개발성과의 활용방안 및 기대효과.md` 본문 작성 (H1 3개 항목 골격 유지: `# 5-1` ~ `# 5-3`)
- 소스: `D:\Sangyeon\02_Task\2026\03_KOCCA\30_무형문화유산_4D\5.hwpx` (Contents/section0.xml, 122줄)
- 처리 규칙
	- 이미지/`[그림]`/`[사진]`/`[도표]` 라인 제외 (다수의 사업화 사례 이미지 제외됨)
	- 5-1: 5개 카테고리(공통/시장중심형/도전혁신형/공공증진형/대중소협력형) 구조 유지
	- 5-2: 3개 측면(기술적/경제산업적/문화사회적) 구조 유지
	- 5-3: 7개 사업화 영역(가상스포츠실/글로벌 사업화/이벤트 네트워크/유아 에듀테크/셀빅 인프라/대학 협력/해외 시장)으로 정리
	- 가운뎃점(`·`,`ㆍ`)을 슬래시(`/`)로 치환
- 표기 정정 사항 (원문 명백한 오타 정정)
	- `시법 사용` → `시범 사용` (Ateneo de Manila University 항목)
	- `애듀테크` → `에듀테크` (키즐 사업화 항목)
	- `Melbourn` → `Melbourne` (호주 대학명)
	- `파라나 주` → `파라나주`, `다낭`/`후에` 정리

## [2026-04-27] ingest | 4.hwpx → ref_4. 마일스톤 체계 및 수행계획

- 사용자 승인하에 `_locked/ref_4. 마일스톤 체계 및 수행계획.md` 본문 작성 (기존 파일이 비어있어 H1 골격을 새로 구성)
- 소스: `D:\Sangyeon\02_Task\2026\03_KOCCA\30_무형문화유산_4D\4.hwpx` (Contents/section0.xml, 7줄)
- 처리 규칙
	- ref_2/ref_3와 일관되게 `# 1단계(1차연도)` / `# 1단계(2차연도)` H1 2개 구성
	- 마일스톤 표 2건(1차연도 4그룹 16개 마일스톤 + 2차연도 5그룹 18개 마일스톤)을 모두 블릿 변환
	- 각 마일스톤은 목표일정/핵심수행기관/주요 가시적 결과물/점검기준/점검방법 5필드로 정리
- 원본 보존 사항
	- 2차년도 3.2 마일스톤의 일정이 원문에 `26.06~26.12`로 표기됨 (1차연도 일정으로 보이나 원문 그대로 유지) - 사용자 검토 필요
	- 2차년도 그룹 5에 `시범서비스 시나리오 기반 실증 및 기술검증/고도화`라는 그룹명이 다른 그룹들과 다소 중복되어 보임 (4그룹 4.3과 유사) - 원문 그대로 유지

## [2026-04-27] ingest | 3.hwpx → ref_3. 연구개발 추진전략과 방법 및 추진일정

- 사용자 승인하에 `_locked/ref_3. 연구갭라의 추진전략과 방법 및 추진일정.md` 본문 작성 (H1 3개 항목 골격 유지: `# 3-1` ~ `# 3-3`)
- 소스: `D:\Sangyeon\02_Task\2026\03_KOCCA\30_무형문화유산_4D\3.hwpx` (Contents/section0.xml, 74줄)
- 처리 규칙
	- 이미지/`[그림]` 라인 제외 (3-2의 추진체계 다이어그램 1건)
	- 도표 4건 모두 블릿으로 변환 (다학제 포럼 1/2차, AI 검증위원회 4단계, 저작권 관리 4분류, 기술별 장애요소/추진방안 8건)
	- 가운뎃점(`·`,`ㆍ`)을 슬래시(`/`)로 치환
- 한계: `# 3-3` 추진일정의 월별 그리드(1~12월 셀 마킹)는 hwpx → 텍스트 추출 시 셀 위치 정보가 손실되어 연도별 활동 목록만 추출. 월별 일정은 원본 hwpx 또는 별도 표 도구로 확인 필요
- 표기 메모: 원문에 `2 단계(2차연도)`로 표기되어 있으나 ref_2와 일관성 위해 `2단계(2차연도)`로 정리 (1단계/2단계 표기는 원문 그대로 유지)

## [2026-04-27] ingest | 2.hwpx → ref_2. 연구개발의 목표 및 내용

- 사용자 승인하에 `_locked/ref_2. 연구개발의 목표 및 내용.md` 본문 작성 (H1 4개 항목 골격 유지: `# 2-1` ~ `# 2-4`)
- 소스: `D:\Sangyeon\02_Task\2026\03_KOCCA\30_무형문화유산_4D\2.hwpx` (Contents/section0.xml, 396줄)
- 처리 규칙
	- 이미지/`[그림]` 라인 제외 (이로 인해 `# 2-1`은 본문 비어있음 - 원문에서 [그림] 개념도가 유일한 콘텐츠)
	- 도표 11건 모두 블릿으로 변환 (멀티모달 데이터 확보 종목, 시범서비스 시나리오 6종, 택견 표준수련체계, 국내외 실증계획, 맞대거리 응용동작, 기술적 차별성, 연구목표별 차이점, 결과물 성능지표, 평가방법, 성과물 목표, 단계별 성과 목표)
	- 가운뎃점(`·`,`ㆍ`)을 슬래시(`/`)로 치환
- 구조: 1단계(1차연도)/1단계(2차연도) 각각 ① 개발목표 / ② 개발내용을 5개 기관(큐랩/셀빅/KETI/연세대/용인대)별로 세분화

## [2026-04-27] ingest | 1.hwpx → ref_1. 연구개발의 필요성

- 사용자 승인하에 `_locked/ref_1. 연구개발의 필요성.md` 본문 작성 (H2 4개 항목 골격 유지, 각 항목 하위에 블릿/탭 들여쓰기로 내용 채움)
- 소스: `D:\Sangyeon\02_Task\2026\03_KOCCA\30_무형문화유산_4D\1.hwpx` (Contents/section0.xml 추출)
- 처리 규칙: 이미지/`[그림]` 라인 제외, 도표 2건(시너지 효과 / 서비스 검증 방안)을 블릿으로 변환, 가운뎃점(`·`)을 슬래시(`/`)로 치환
- 생성/수정 파일
	- `03_References/_locked/ref_1. 연구개발의 필요성.md` (수정)
	- `assets/extract_hwpx.py` (생성, hwpx 파싱 유틸리티 - ref_2~ref_5 작업에 재사용 예정)

## [2026-04-27] create | 디렉토리 구조 초기화

- CLAUDE.md 지침에 따라 vault 디렉토리 구조 생성
- 생성된 디렉토리: `00_Index/`, `01_Concepts/`, `02_HowTo/`, `03_References/`, `03_References/_locked/`, `04_Projects/`, `05_Logs/`, `assets/`
- 생성된 파일: `00_Index/MOC.md`, `05_Logs/log.md`
- 새 wikilink: `[[MOC]]`, `[[log]]`, `[[CLAUDE]]`
