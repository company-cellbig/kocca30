---
title: CONVENTIONS와 HowTo 역할 분리 2단계 외부 검수 지시문
type: agentnote
status: draft
tags: [agentnote, 규칙, 정비, 외부검수]
sources: [CONVENTIONS와 HowTo 역할 분리 계획, CONVENTIONS와 HowTo 역할 분리 실행 기준선, 외부 검수 포커스, 반복 결함 카탈로그]
created: 2026-09-08
updated: 2026-09-08
---

> 역할 분리 2단계의 `AGENTS.md` 라우터 변경을 새 Claude Code 세션에서 검토할 때 전달하는 독립 맥락 검수 패킷임. 역할과 승인 게이트의 의미 보존, 작업별 규칙 로딩 경로, 지침 크기와 문장 가독성을 검토하고 파일은 수정하지 않은 채 발견만 보고하도록 지시함.

# 1. 사용 방법

- 새 Claude Code 세션을 열고 이 문서의 `검수 지시문` 절부터 끝까지 전달함
- 작성 대화, 작성 의도와 중간 추론은 전달하지 않음
- 저장소 루트에서 실행하고 OpenAI 공식 문서에 접근할 수 있는 환경인지 확인함
- 검토 보고를 받은 뒤 발견별 수용, 보류 또는 반려는 사용자가 결정함

# 2. 검수 지시문

당신은 이 변경의 외부 검토자다. [[#5. 금지 사항]]을 준수하고 발견만 보고하라.

변경 판정 대상은 부모 커밋과 대상 커밋 사이의 diff임. 현재 작업 트리와 대상 커밋 이후 변경은 판정 대상에 넣지 마라. 검토에서 발견이 없다는 사실은 결함 부재의 증명이 아니므로 수행 범위와 발견 건수만 보고하라.

## 2.1 대상

- **대상 커밋**: `e4deb997451c62af5adcf791031d28a3618c9fac`
- **부모 커밋**: `fa3c414c50ea41beae0d0bd54b49666080229923`
- **중심 문서**: `AGENTS.md` 전체
- **동반 변경**: `99_Logs/log.md`의 2026-09-08 `update | 역할 분리 2단계 AGENTS 라우터 정비` 항목
- **검토 종류**: 사실과 정합, 적대, 가독성

다음 명령으로 대상과 범위를 먼저 고정하라.

```powershell
git show --stat --oneline e4deb997451c62af5adcf791031d28a3618c9fac
git diff fa3c414c50ea41beae0d0bd54b49666080229923 e4deb997451c62af5adcf791031d28a3618c9fac -- AGENTS.md 99_Logs/log.md
git status --short
```

`git status --short`는 판정 대상에서 제외할 현재 작업 트리 변경을 식별하기 위한 읽기 전용 확인임. 출력에 다른 파일이 있더라도 수정하거나 대상 diff에 섞지 마라.

## 2.2 반드시 읽을 규칙과 근거

검색 결과 일부만 보지 말고 다음 범위를 직접 읽고 대조하라. 아래 저장소 파일은 별도 표시가 없으면 모두 대상 커밋 판본을 뜻함.

- 부모 커밋과 대상 커밋의 `AGENTS.md` 전체
- 대상 커밋의 `CONVENTIONS.md` 전체
- `07_작업노트/위키 규칙 정비/CONVENTIONS와 HowTo 역할 분리 계획.md`의 3절, 4절, 5절, 8절, 9절과 10절
- `07_작업노트/위키 규칙 정비/CONVENTIONS와 HowTo 역할 분리 실행 기준선.md` 전체
- `01_HowTo/외부 검수 포커스.md`의 머리말, 사실과 정합, 적대, 가독성 발췌와 끝맺음
- `01_HowTo/반복 결함 카탈로그.md`에서 frontmatter를 제외한 본문 전체
- `AGENTS.md`의 작업별 선택표가 가리키는 HowTo 문서 9개 전체
- `scripts/wiki_number.mjs`, `scripts/wiki_lint.mjs`, `scripts/quote_check.mjs`와 `scripts/hooks/pre-commit`
- `00_Index/MOC.md`
- 현재 공개된 [OpenAI 공식 AGENTS.md 안내](https://learn.chatgpt.com/docs/agent-configuration/agents-md)

## 2.3 독립 재현 항목

원 저장소의 파일과 Git 상태를 바꾸지 말고 Git 객체에서 부모와 대상 판본을 꺼내 다음 항목을 각각 재현하라. 다음 예시처럼 저장소 밖의 임시 디렉터리에 두 판본을 각각 전개하고 같은 읽기 전용 검사를 실행하라.

```powershell
$reviewRoot = Join-Path ([IO.Path]::GetTempPath()) ('agents-review-' + [guid]::NewGuid())
$parentDir = Join-Path $reviewRoot 'parent'
$targetDir = Join-Path $reviewRoot 'target'
New-Item -ItemType Directory -Path $parentDir, $targetDir -ErrorAction Stop

$parentZip = Join-Path $reviewRoot 'parent.zip'
$targetZip = Join-Path $reviewRoot 'target.zip'
git archive --format=zip --output="$parentZip" fa3c414c50ea41beae0d0bd54b49666080229923
if ($LASTEXITCODE -ne 0) { throw '부모 커밋 archive 실패' }
git archive --format=zip --output="$targetZip" e4deb997451c62af5adcf791031d28a3618c9fac
if ($LASTEXITCODE -ne 0) { throw '대상 커밋 archive 실패' }
Expand-Archive -LiteralPath $parentZip -DestinationPath $parentDir -ErrorAction Stop
Expand-Archive -LiteralPath $targetZip -DestinationPath $targetDir -ErrorAction Stop

$results = @()
foreach ($snapshot in @($parentDir, $targetDir)) {
	Push-Location $snapshot
	try {
		$numberOutput = & node scripts/wiki_number.mjs --check 2>&1
		$numberExit = $LASTEXITCODE
		$lintOutput = & node scripts/wiki_lint.mjs 2>&1
		$lintExit = $LASTEXITCODE
		$quoteOutput = & node scripts/quote_check.mjs 2>&1
		$quoteExit = $LASTEXITCODE
		$results += [pscustomobject]@{ Snapshot = $snapshot; Check = 'wiki_number'; ExitCode = $numberExit; Output = ($numberOutput -join "`n") }
		$results += [pscustomobject]@{ Snapshot = $snapshot; Check = 'wiki_lint'; ExitCode = $lintExit; Output = ($lintOutput -join "`n") }
		$results += [pscustomobject]@{ Snapshot = $snapshot; Check = 'quote_check'; ExitCode = $quoteExit; Output = ($quoteOutput -join "`n") }
	} finally {
		Pop-Location
	}
}
$results | Format-List
```

- 부모와 대상의 `AGENTS.md` 바이트 수와 LF 문자(`0x0A`) 개수
- 기본 32 KiB를 32,768바이트로 계산했을 때 각 판본의 잔여 바이트
- 로그의 두 집계표에 적힌 11개 대상 문서를 가리키는 링크의 변경 전후 출현 수와 고유 대상 수
  - 각 커밋의 저장소 전체 마크다운 파일을 검색함
  - `[[문서명]]`, `[[문서명#anchor]]`와 별칭형을 포함하고 같은 줄의 복수 링크도 각각 셈
  - 별칭 구분자 `|` 또는 마크다운 표 안에서 이스케이프한 `\|` 이후 문자열은 anchor에 포함하지 않음
  - `제외 링크`와 `제외 고유 대상`은 링크가 출현한 원본 마크다운 파일의 경로가 `99_Logs/` 아래이거나 `_archive/`를 포함하면 그 파일을 제외한 뒤 각각 다시 셈
- 부모와 대상 `AGENTS.md` 안의 자기 문서 절 링크 `[[#anchor]]` 수와 각 anchor에 대응하는 실제 헤딩의 존재 여부
- 부모와 대상의 자동 검사 결과 차이
- 대상 커밋 `00_Index/MOC.md`의 `[[AGENTS|에이전트 작업 지침]]` 요약이 대상 커밋의 역할과 여전히 맞는지 여부

# 3. 검토 지침

이 저장소는 마크다운 문서 저장소임. `괜찮아 보임`은 사유가 아니며 결함을 적극적으로 찾아야 함. 접근할 수 없는 근거만 `검증 불가`로 보고하라.

세 검토를 한데 섞지 말고 `사실과 정합`, `적대`, `가독성` 순서로 각각 수행한 뒤 발견도 같은 구분으로 보고하라.

## 3.1 사실과 정합

### 3.1.1 P1 사실 오류와 출처 불일치

- 대상 커밋, 부모 관계와 변경 파일 목록이 Git 객체와 일치하는가
- `AGENTS.md`의 바이트 수, LF 문자 개수, 잔여 바이트와 링크 집계가 독립 재현값과 일치하는가
- 자동 검사 명령과 훅 동작 설명이 실제 스크립트에 구현된 동작과 일치하는가
- Codex의 지침 탐색 순서, 합산 크기 한도와 기본값 설명이 공식 문서와 일치하는가
- 외부 검토 호출 조건과 사용자가 패킷을 전달한다는 설명이 실제 운영 권한과 일치하는가

### 3.1.2 P5 위키 정합성

- 작업별 선택표의 각 링크가 존재하며 실제로 해당 절차를 소유하는 문서를 가리키는가
- 한 작업이 여러 조건에 해당할 때 모든 해당 행의 문서를 읽으라는 규칙이 분명한가
- `AGENTS.md`가 역할, 권한, 승인 시점과 필수 검사만 소유하고 문체나 도구별 절차를 불필요하게 다시 소유하지 않는가
- `CONVENTIONS.md`와 각 HowTo를 전체 읽으라는 경로가 서로 미루기만 하는 빈 참조 없이 실행 가능한가
- 부모 판본의 핵심 역할, G1/G2, 작은 변경 면제, 독립 검토, 수정 금지 영역과 `05_산출물/` 권한이 의미 손실 없이 남았는가
- 로그, 계획, 실행 기준선과 MOC가 대상 커밋의 상태 및 역할 구분과 일치하는가

깨진 링크와 anchor 존재 자체는 기계 검사 결과를 확인하고 의미상 소유처와 참조 정합에 집중하라.

## 3.2 적대

### 3.2.1 P2 논리적 비약과 문서 간 모순

- `짧은 라우터`라는 목표 때문에 실행에 필요한 예외나 승인 권한까지 삭제하지 않았는가
- 공통 규칙과 작업별 규칙의 선택 순서가 순환하거나 서로 충돌하지 않는가
- 모든 사이클에 필수인 자동 검사와 위키 규칙을 적용하지 않는 `05_산출물/`의 편집 제한이 충돌하지 않는가
  - `wiki_number.mjs --write`가 `05_산출물/`의 헤딩을 실제로 바꿀 수 있는지, `wiki_lint.mjs`가 그 폴더에 위키 전용 규칙을 적용하는지 소스에서 확인하라
- 외부 검토가 필요한 큰 변경과 작은 변경 면제의 경계에서 빠진 사례가 없는가
- 큰 변경과 작은 변경 면제의 두 범주가 겹치지 않는가
- 사용자 요청, G1 결정과 G2 수용이 서로 다른 승인 권한으로 유지되는가
- 독립 검토 결과를 결함 부재의 증명처럼 단정하는 표현이 없는가

### 3.2.2 P3 누락된 반론과 견고성

- 여러 선택표 조건에 동시에 해당하는 작업, 하위 폴더에서 시작한 세션과 출력이 잘린 경우의 처리 기준이 빠지지 않았는가
- `AGENTS.md`의 설명이 로컬 설정이나 실행 옵션에 따라 `project_doc_max_bytes` 값이 달라질 가능성을 배제하지 않는가
- 자동 검사에 기존 경고가 있을 때 새 경고와 구별하는 방법이 남아 있는가
- 사실 층 변경의 독립 대조와 큰 변경의 Claude Code 외부 검토가 각각 언제 필요한지 복원 가능한가
- 외부 검토를 사용할 수 없거나 사용자가 면제할 때의 대체 절차와 제한이 남아 있는가
- 헤딩이나 정본 규칙 변경 뒤 파생 텍스트와 저장소 전체 링크를 다시 확인하는 절차가 충분한가
- 대상 커밋에 `05_산출물/` 자동 명령 충돌을 해소하는 규칙이 있는가

충돌 해소 규칙이 없으면 정책 결함으로 보고하되 어떤 대안을 승인할지는 판정하지 마라.

### 3.2.3 반복 결함 우선 점검

`01_HowTo/반복 결함 카탈로그.md` 본문 전체를 읽고 대상 변경에서 재발한 항목을 우선 찾아라. 특히 다음 결함류를 주의하되 여기에만 한정하지 마라.

- `STRUCT-001`: 삭제하거나 이동한 절의 옛 anchor와 역할 표현이 로그나 관련 문서에 남음
- `STRUCT-005`: 역할, 절차와 검사 결과가 같은 종류처럼 한 목록에 섞임
- `STRUCT-008`, `STRUCT-009`: 긴 한 단계 불릿과 정보 성격에 맞지 않는 표 또는 목록
- `CONTENT-002`: 명령이나 문서명만 있고 실행 조건, 결과와 판정 기준이 없음
- `CONTENT-004`: 라우터가 상세 절차를 재서술해 다시 비대해짐
- `CONTENT-005`: 공통 규칙, 작업별 절차와 승인 권한의 소유처를 잘못 지목함
- `LOGIC-003`: 아직 정하지 않은 정책을 현행 규칙처럼 단정함
- `PROCESS-001`: `AGENTS.md`만 고치고 로그, MOC, 관련 anchor와 파생 텍스트를 점검하지 않음

## 3.3 P4 문체, 구조와 가독성

맥락 없는 독자의 관점에서 `AGENTS.md`와 새 로그 항목의 각 문장을 읽고 다음을 적극 확인하라.

- **문장 결함**
  - 정의하지 않은 용어나 지시어가 있는가
  - 구어체, 비표준어 또는 임의 조어가 있는가
  - 같은 뜻을 반복하는 군더더기나 방어적 사족이 있는가
  - 음슴체를 지키지 않거나 가운뎃점, em dash 또는 불필요한 슬래시를 사용했는가
- **구조 결함**
  - 한 단계 불릿에 역할, 단계 또는 종류를 여러 개 욱여넣었는가
  - 조건과 결과, 담당자와 산출물이 평문에 섞이는 등 목록 형식을 잘못 골랐는가
  - 같은 수준 항목의 문법이 병렬 구조를 이루지 않는가
  - 헤딩만 훑어서는 규칙 로딩, 역할, 사이클, 게이트와 검수 흐름을 복원하기 어려운가
- **용어와 상태 혼동**
  - `모든 사이클`, `작은 변경`, `큰 변경`, `즉시 정정`, `외부 검토 면제`를 처음 보는 작업자가 구별하기 어려운가
  - 현재 적용 중인 규칙, 후속 계획과 사용자 결정이 필요한 정책이 서로 혼동되는가

`CONVENTIONS.md`의 수치 및 목표 인용 원칙과 외부 근거의 권위 계층, `AGENTS.md`의 검수 기준을 우선 판단 기준으로 삼아라.

# 4. 출력 형식

발견은 `사실과 정합`, `적대`, `가독성` 세 절로 나눠 다음 형식으로 작성하라. 발견이 없으면 해당 절에 수행 범위와 `0건`만 적어라.

```text
ID: F-01
우선순위: P1, P2, P3, P4, P5 중 하나
위치: 파일명:행과 대상 문구
문제: 무엇이 틀리거나 모호한지
근거: 직접 대조한 파일, Git 객체, 스크립트 또는 공식 문서
영향: 그대로 둘 때 생기는 문제
제안: 최소 정정안
외부 근거 등급: L1~L5 또는 해당 없음
```

- 내부 파일, Git 객체나 문장 자체만 근거이면 외부 근거 등급에 `해당 없음`을 적음
- 외부 근거가 약하면 근거 앞에 `[근거 약함]`을 추가함
- 같은 원인의 반복은 대표 발견 아래 모든 위치를 나열함

마지막에는 다음 내용만 요약하라.

- 판정 대상 커밋과 변경 파일
- 근거로 읽은 파일
- 세 검토별 발견 건수
- 검증하지 못한 범위와 이유
- 반복 결함 카탈로그에서 대조한 항목

# 5. 금지 사항

- 작성 의도와 중간 추론을 추정하지 않음
- 원 저장소의 파일과 로그를 수정하지 않음
- Git 등록, 커밋, 전송과 브랜치 조작을 하지 않음
- 발견을 자동 반영하지 않음
- 승인, 통과와 최종 판정을 선언하지 않음
