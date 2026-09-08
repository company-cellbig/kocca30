---
title: CONVENTIONS와 HowTo 역할 분리 3단계 외부 검수 지시문
type: agentnote
status: draft
tags: [agentnote, 규칙, 정비, 외부검수]
sources: [CONVENTIONS와 HowTo 역할 분리 계획, CONVENTIONS와 HowTo 역할 분리 실행 기준선, 외부 검수 포커스, 반복 결함 카탈로그]
created: 2026-09-08
updated: 2026-09-08
---

> 역할 분리 3단계의 정보 구조 규칙 이동을 새 Claude Code 세션에서 검토할 때 전달하는 독립 맥락 검수 패킷임. 세부 규칙의 의미 보존, `CONVENTIONS.md`와 [[문서 작성 세부 규칙]]의 소유 경계, 링크 집계와 가독성을 검토하고 파일은 수정하지 않은 채 발견만 보고하도록 지시함.

# 1. 사용 방법

- 새 Claude Code 세션을 열고 이 문서의 `검수 지시문` 절부터 끝까지 전달함
- 작성 대화, 작성 의도와 중간 추론은 전달하지 않음
- 저장소 루트에서 실행하고 Git 객체와 지정된 파일을 직접 대조함
- 검토 보고를 받은 뒤 발견별 수용, 보류 또는 반려는 사용자가 결정함

# 2. 검수 지시문

당신은 이 변경의 외부 검토자다. [[#5. 금지 사항]]을 준수하고 발견만 보고하라.

변경 판정 대상은 부모 커밋과 대상 커밋 사이의 diff임. 현재 작업 트리와 대상 커밋 이후 변경은 판정 대상에 넣지 마라. 어떤 검토에서 발견이 없으면 해당 검토 절에는 수행 범위와 `0건`만 적고 마지막 요약은 [[#4. 출력 형식]]을 따르라. 무발견을 결함 부재의 증명으로 표현하지 마라.

## 2.1 대상

- **대상 커밋**: `ebd92fb867fffa3eaa51f92dbddeb5599bbb1265`
- **부모 커밋**: `8703aa5974e7843bfb1887491af9463a10231e96`
- **중심 문서**: `CONVENTIONS.md`, `01_HowTo/문서 작성 세부 규칙.md` 전체
- **동반 변경**: `00_Index/MOC.md`, `99_Logs/log.md`의 2026-09-08 `update | 역할 분리 3단계 H03 정보 구조 정리` 항목
- **원자료 경로**: 해당 없음. 이동 전 규칙은 부모 커밋의 중심 문서를 근거로 삼음
- **검토 종류**: 사실과 정합, 적대, 가독성

다음 명령으로 대상과 범위를 먼저 고정하라.

```powershell
git show --stat --oneline ebd92fb867fffa3eaa51f92dbddeb5599bbb1265
git diff 8703aa5974e7843bfb1887491af9463a10231e96 ebd92fb867fffa3eaa51f92dbddeb5599bbb1265 -- CONVENTIONS.md '01_HowTo/문서 작성 세부 규칙.md' '00_Index/MOC.md' '99_Logs/log.md'
git status --short
```

`git status --short`는 판정 대상에서 제외할 현재 작업 트리 변경을 식별하기 위한 읽기 전용 확인임. 출력에 다른 파일이 있더라도 수정하거나 대상 diff에 섞지 마라.

## 2.2 반드시 읽을 규칙과 근거

검색 결과 일부만 보지 말고 다음 범위를 직접 읽고 대조하라. 아래 저장소 파일은 별도 표시가 없으면 모두 대상 커밋 판본을 뜻함.

- 부모 커밋과 대상 커밋의 `CONVENTIONS.md`, `01_HowTo/문서 작성 세부 규칙.md` 전체
- 대상 커밋의 `00_Index/MOC.md` 6.4절과 `99_Logs/log.md`의 3단계 H03 정리 항목 전체
- `07_작업노트/위키 규칙 정비/CONVENTIONS와 HowTo 역할 분리 계획.md`의 5절 R04, 6절, 7.3절, 9절과 10절
- `07_작업노트/위키 규칙 정비/CONVENTIONS와 HowTo 역할 분리 실행 기준선.md`의 anchor 집계와 자동 검사 절 전체
- `AGENTS.md`의 규칙 로딩 순서, 작성자 절차, 사용자 승인 게이트와 검수 기준
- `01_HowTo/외부 검수 포커스.md`의 머리말, 사실과 정합, 적대, 가독성 발췌와 끝맺음
- `01_HowTo/반복 결함 카탈로그.md`에서 frontmatter를 제외한 본문 전체
- `scripts/wiki_number.mjs`, `scripts/wiki_lint.mjs`, `scripts/quote_check.mjs`
- 현재 공개된 [OpenAI 공식 AGENTS.md 안내](https://learn.chatgpt.com/docs/agent-configuration/agents-md)

## 2.3 독립 재현 항목

원 저장소의 파일과 Git 상태를 바꾸지 말고 Git 객체에서 부모와 대상 판본을 꺼내 다음 항목을 각각 재현하라. 저장소 밖의 임시 디렉터리에 두 판본을 전개하고 읽기 전용 검사만 실행하라.

```powershell
$reviewRoot = Join-Path ([IO.Path]::GetTempPath()) ('h03-review-' + [guid]::NewGuid())
$parentDir = Join-Path $reviewRoot 'parent'
$targetDir = Join-Path $reviewRoot 'target'
New-Item -ItemType Directory -Path $parentDir, $targetDir -ErrorAction Stop

$parentZip = Join-Path $reviewRoot 'parent.zip'
$targetZip = Join-Path $reviewRoot 'target.zip'
git archive --format=zip --output="$parentZip" 8703aa5974e7843bfb1887491af9463a10231e96
if ($LASTEXITCODE -ne 0) { throw '부모 커밋 archive 실패' }
git archive --format=zip --output="$targetZip" ebd92fb867fffa3eaa51f92dbddeb5599bbb1265
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

다음 항목을 전후 비교와 대상 단독 확인으로 나눠 수행하라.

### 2.3.1 부모와 대상 전후 비교

- 부모 `CONVENTIONS.md` 3.4.3의 개조식 세부 규칙 6개가 대상 [[문서 작성 세부 규칙#4.2 읽기 쉬운 개조식]]에 각각 대응하는지 확인함
  - 개수만 맞추지 말고 한 불릿 한 생각, 슬래시 제한, 길잡이 문장, 음슴체 완결과 예외, 두괄식과 자족성, 시각적 호흡의 의무와 예외가 보존됐는지 대조함
- 부모 `CONVENTIONS.md` 3.8.1의 작성 전 절차 4단계가 대상 [[문서 작성 세부 규칙#2.1 작성 전 절차]]에 각각 대응하는지 확인함
- 원자료 선추출 원칙이 대상 `CONVENTIONS.md` 3.8에 유지되는지 확인함. 그 아래 관리 규칙 6개인 임시 ID, 이력, 대응표, `설계 추가`와 `제외`, 전수 대응, 개수 구분이 남았는지도 확인함
- 로그에 적힌 11개 대상 문서를 가리키는 링크의 변경 전후 출현 수와 고유 링크 대상 수를 다시 셈
  - 각 커밋의 저장소 전체 마크다운 파일을 검색함
  - `[[문서명]]`, `[[문서명#anchor]]`와 별칭형을 포함하고 같은 줄의 복수 링크도 각각 셈
  - 별칭 구분자 `|` 또는 마크다운 표 안에서 이스케이프한 `\|` 이후 문자열은 anchor에 포함하지 않음
  - `로그와 아카이브 제외 후` 값은 링크가 출현한 원본 마크다운 파일의 경로가 `99_Logs/` 아래이거나 `_archive/`를 포함하면 그 파일을 제외한 뒤 각각 다시 셈
- [[CONVENTIONS와 HowTo 역할 분리 실행 기준선#3.3 같은 문서의 절을 가리키는 링크]] 표의 링크 출처 문서 6개를 부모와 대상에서 다시 세고 합계 42건 유지 여부를 확인함
- 삭제한 `CONVENTIONS#3.8.1 작성 전 절차`를 가리키는 링크가 부모와 대상의 저장소 전체에 있는지 확인함
- 부모와 대상의 자동 검사 결과 차이와 대상 로그의 검사 결과를 대조함

### 2.3.2 대상 판본 단독 확인

- 대상 커밋 해시, 대상 커밋의 부모 해시와 변경 파일 4개가 Git 객체에서 재현되는지 확인함
- 기본 한도 32 KiB(32,768바이트)에서 대상 `AGENTS.md` 바이트 수를 뺀 잔여량이 로그와 맞는지 확인함
- 대상 `00_Index/MOC.md`의 H03 요약이 실제 상세 소유 범위와 일치하는지 확인함

# 3. 검토 지침

이 저장소는 마크다운 문서 저장소임. `괜찮아 보임`은 사유가 아니며 결함을 적극적으로 찾아야 함. 접근할 수 없는 근거만 `검증 불가`로 보고하라.

세 검토를 한데 섞지 말고 `사실과 정합`, `적대`, `가독성` 순서로 각각 수행한 뒤 발견도 같은 구분으로 보고하라.

## 3.1 사실과 정합

### 3.1.1 P1 사실 오류와 출처 불일치

- 커밋 해시, 부모 관계, 변경 파일과 로그의 정량 집계가 독립 재현값과 일치하는가
- 자동 검사 명령, 스캔 문서 수, 오류, 경고, 인용 대조와 건너뜀 수가 스냅샷 실행 결과와 일치하는가
- 개조식 세부 규칙 6개, 작성 전 절차 4단계와 원자료 관리 규칙 6개의 대응 관계가 실제 문장과 일치하는가
- `AGENTS.md` 크기, 기본 한도와 잔여 바이트 계산이 Git 객체 및 공식 문서와 일치하는가
- 독립 검토 횟수와 발견 건수는 작성 과정 기록이므로 저장소에서 검증할 근거가 없으면 검증 불가로 구분하는가

### 3.1.2 P5 위키 정합성

- `CONVENTIONS.md`가 구조 우선과 원자료 선추출을 소유하고 H03이 구조 설계 및 표현 형식을 소유한다는 경계가 양쪽에서 같은가
- `CONVENTIONS.md`만 읽어도 상세 정본을 찾을 수 있고, H03만 읽어도 원자료 선추출이 선행돼야 하는 작업을 식별할 수 있는가
- 상호 참조가 서로 상세를 미루는 빈 순환이 아니라 각 문서에 맡은 규칙의 실체를 남기는가
- 옮긴 규칙의 외부 사용처가 새 정본을 가리키거나 보존한 `CONVENTIONS.md` anchor를 통해 새 정본에 도달하는가
- 삭제한 헤딩, 새 하위 헤딩과 기존 1~5절 anchor가 저장소의 wikilink와 맞는가
- MOC 요약, 로그와 관련 문서 목록이 대상 커밋의 실제 소유 구조와 일치하는가

깨진 링크와 anchor 존재 자체는 기계 검사 결과를 확인하고 의미상 소유처와 참조 정합에 집중하라.

## 3.2 적대

### 3.2.1 P2 논리적 비약과 문서 간 모순

- `CONVENTIONS.md`를 줄이는 과정에서 규칙의 이름만 H03에 남고 판정 기준이나 예외가 사라지지 않았는가
- 같은 규칙을 양쪽이 서로 다른 말로 소유하거나, 어느 문서도 최종 책임을 갖지 않는 빈틈이 생기지 않았는가
- 개조식의 공통 문체 원칙과 H03의 상세 형식 규칙이 서로 다른 조건을 요구하지 않는가
- 한 문단과 라벨형 불릿의 분리 기준, 한 불릿 한 생각과 중첩 불릿 조건이 서로 충돌하지 않는가
- 원자료 선추출 뒤 H03의 작성 전 절차로 넘어가는 순서가 역전되거나 순환하지 않는가
- MOC와 로그가 실제 변경보다 넓은 완료 상태를 주장하지 않는가

### 3.2.2 P3 누락된 반론과 견고성

- 옮기는 과정에서 라벨과 값 또는 표 셀의 명사 종결 예외, 하위 절만 묶는 헤딩의 길잡이 문장 예외와 같은 한계 조건이 빠지지 않았는가
- `원자료 분석이 아닌 작업`과 원자료 기반 분석의 진입 경로가 모두 설명되는가
- 긴 값과 불균일한 값, 여러 목록 형식이 겹치는 경우의 선택 기준이 남아 있는가
- H03을 읽지 않은 작업자가 `CONVENTIONS.md`의 필수 링크를 선택 사항으로 오해할 표현이 없는가
- 삭제한 3.8.1 절을 자연어 또는 wikilink로 가리키는 파생 텍스트가 검사 범위 밖에 남을 가능성을 놓치지 않았는가

### 3.2.3 반복 결함 우선 점검

`01_HowTo/반복 결함 카탈로그.md` 본문 전체를 읽고 대상 변경에서 재발한 항목을 우선 찾아라. 특히 다음 결함류를 주의하되 여기에만 한정하지 마라.

- `STRUCT-001`: 이동한 절의 옛 anchor와 역할 표현이 로그나 관련 문서에 남음
- `STRUCT-003`: 원칙, 절차와 예외처럼 위계가 다른 항목을 같은 수준에 섞음
- `STRUCT-007`, `STRUCT-008`: 긴 설명을 한 라벨이나 한 단계 불릿에 넣고 분리하지 않음
- `STRUCT-009`: 정보 성격과 맞지 않는 표 또는 목록을 선택함
- `CONTENT-002`: 규칙 이름과 링크만 있고 판정 방법이 없음
- `CONTENT-005`: 공통 원칙과 상세 절차의 소유처를 잘못 지목함
- `PROCESS-001`: 중심 문서만 고치고 MOC, 로그와 관련 anchor를 함께 갱신하지 않음
- `PROCESS-002`: 원자료를 끝까지 추출하기 전에 구조나 개수를 먼저 확정함

## 3.3 가독성

### 3.3.1 P4 문체, 구조와 가독성

맥락 없는 독자의 관점에서 대상 diff의 새 문장과 바뀐 문장 전체를 읽고 다음을 적극 확인하라.

- **문장 결함**
  - 정의하지 않은 용어, 지시어 또는 참조 범위가 있는가
  - 구어체, 비표준어, 임의 조어 또는 같은 뜻의 반복이 있는가
  - 음슴체를 지키지 않거나 가운뎃점, em dash 또는 불필요한 슬래시를 사용했는가
- **구조 결함**
  - 한 단계 불릿에 규칙, 예외와 사례를 여러 개 넣었는가
  - 형식 선택 기준이 긴 평문에 묻히거나 표의 값이 지나치게 길고 불균일한가
  - 같은 수준의 헤딩, 번호 단계, 라벨과 표 행이 병렬 구조를 이루지 않는가
  - 헤딩과 TL;DR만 훑어도 원칙, 선행 절차, 상세 규칙과 관련 문서의 관계를 복원할 수 있는가
- **용어와 소유권 혼동**
  - `구조 우선`, `원자료 선추출`, `작성 전 절차`, `분류와 배열`, `개조식`과 `중첩 불릿`을 처음 보는 독자가 구별하기 어려운가
  - `정본`, `상위 정본`, `상세 정본`이 서로 다른 소유 관계를 가리키는가
  - `헤더`와 `헤딩`, `서브 불릿`과 `중첩 불릿`처럼 같은 개념의 용어가 흔들리는가

`CONVENTIONS.md`의 문체, 구조 우선 작성, 수치 및 목표 인용 원칙과 외부 근거의 권위 계층, `AGENTS.md`의 검수 기준을 우선 판단 기준으로 삼아라.

# 4. 출력 형식

발견은 `사실과 정합`, `적대`, `가독성` 세 절로 나눠 다음 형식으로 작성하라. 발견이 없으면 해당 절에 수행 범위와 `0건`만 적어라.

ID는 세 절을 통틀어 `F-01`, `F-02` 순서의 전역 연번을 사용하고 절이 바뀌어도 다시 시작하지 마라.

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

# 6. 관련 문서

- [[CONVENTIONS와 HowTo 역할 분리 계획]]
- [[CONVENTIONS와 HowTo 역할 분리 실행 기준선]]
- [[외부 검수 포커스]]
- [[반복 결함 카탈로그]]
