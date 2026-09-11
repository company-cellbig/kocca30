---
title: CONVENTIONS와 HowTo 역할 분리 8단계 외부 검수 지시문
type: agentnote
status: draft
tags: [agentnote, 규칙, 정비, 외부검수]
sources: [CONVENTIONS와 HowTo 역할 분리 계획, CONVENTIONS와 HowTo 역할 분리 실행 기준선, 외부 검수 포커스, 반복 결함 카탈로그]
created: 2026-09-11
updated: 2026-09-11
---

> 역할 분리 8단계에서 H05([[외부 검수 포커스]])를 파생 검수 문구와 발췌 조합 및 패킷 구성의 소유처로 정리한 결과를 새 Claude Code 세션에서 검토할 때 전달하는 독립 맥락 검수 패킷임. 원본 anchor 대응, 작성 및 운영 정본과 파생 텍스트의 경계, 패킷 필드의 완전성 및 가독성을 검토하고 파일은 수정하지 않은 채 발견만 보고하도록 지시함.

# 1. 사용 방법

- 새 Claude Code 세션을 열고 이 문서의 `검수 지시문` 절부터 끝까지 전달함
- 작성 대화, 작성 의도와 중간 추론은 전달하지 않음
- 저장소 루트에서 실행하고 Git 객체와 지정된 파일을 직접 대조함
- 검토 보고를 받은 뒤 발견별 수용, 보류 또는 반려 여부는 사용자가 결정함

# 2. 검수 지시문

당신은 이 변경의 외부 검토자다. [[#7. 금지 사항]]을 준수하고 발견만 보고하라.

작성자의 의도나 중간 추론을 추정하지 말고 완성된 변경, Git 객체와 지정된 규칙을 직접 대조하라. 아래 변경 계약과 작성자 보고값도 정답으로 가정하지 말고 독립적으로 확인하라. `괜찮아 보임`은 승인 근거가 아니다. 결함을 적극적으로 찾되 발견의 수용 여부나 최종 통과 여부는 판정하지 마라.

검토에서 발견이 없으면 해당 절에 수행 범위와 `0건`만 적어라. 무발견을 결함 부재의 증명이나 `검증 완료`로 표현하지 마라.

## 2.1 검토 대상

역할 분리 계획의 8단계 H05 변경 커밋을 검토한다.

- **기준 커밋이자 대상의 직접 부모**: `a21cbbece0058baf6166868dc8e4e48bdc6169a4`
- **대상 커밋**: `6477d0a02874345f4281bae2e3667ead40a6bf1b` (`refactor: 역할 분리 8단계 H05 정리`)
- **대상 변경 범위**: `a21cbbece0058baf6166868dc8e4e48bdc6169a4..6477d0a02874345f4281bae2e3667ead40a6bf1b`

대상 커밋이 바꾼 파일은 다음 2개다.

- 본문 검토 대상: `01_HowTo/외부 검수 포커스.md`
- 기록 대조 대상: `99_Logs/log.md`

본문의 새 발견은 `01_HowTo/외부 검수 포커스.md`의 대상 diff 안에서만 보고하라. `99_Logs/log.md`에서는 Git 객체로 재현할 수 있는 자동 검사 수치, 수정 파일과 관련 커밋 목록만 직접 대조하라. 사용자 판정과 독립 검토 발견 건수는 대상 범위에 별도 기록 근거가 있을 때만 대조하고, 없으면 `검증하지 못한 범위`로 보고하라. 이를 본문 결함이나 로그 표현의 새 발견으로 보고하지 마라. 대상 커밋 뒤에 이루어진 외부 검토 진행 결정은 이 항목에 요구하지 마라.

대상 커밋 뒤의 커밋, 이 검수 패킷과 그에 따른 로그 변경, 현재 작업 트리의 모든 변경은 범위 밖이다. 특히 `05_산출물/`, 이미지 자산과 `90_Temp/`의 현재 변경을 H05 변경이나 근거로 판정하지 마라. 검토 결과와 근거에 현재 작업 트리 상태를 섞지 말고 Git 객체를 읽어라.

다음 읽기 전용 명령으로 범위를 먼저 고정하라.

```powershell
$base = 'a21cbbece0058baf6166868dc8e4e48bdc6169a4'
$target = '6477d0a02874345f4281bae2e3667ead40a6bf1b'

git show --stat --oneline $target
git rev-parse "$target^"
git -c core.quotepath=false diff --name-status $base $target
git -c core.quotepath=false diff $base $target -- '01_HowTo/외부 검수 포커스.md'
git diff $base $target -- '99_Logs/log.md'
git log --oneline "$target..HEAD"
git -c core.quotepath=false status --short
```

## 2.2 반드시 읽을 파일과 Git 객체

검색 결과 일부만 보지 말고 다음 범위를 직접 읽어라.

- 기준 `a21cbbe:01_HowTo/외부 검수 포커스.md` 전체
- 대상 `6477d0a:01_HowTo/외부 검수 포커스.md` 전체
- 기준과 대상 사이 `01_HowTo/외부 검수 포커스.md` diff 전체
- 대상 `6477d0a:AGENTS.md` 전체
- 대상 `6477d0a:CONVENTIONS.md` 전체
- 대상 `6477d0a:01_HowTo/문서 작성 세부 규칙.md` 전체
- 대상 `6477d0a:01_HowTo/반복 결함 카탈로그.md` 전체
- 대상 `6477d0a:07_작업노트/위키 규칙 정비/CONVENTIONS와 HowTo 역할 분리 계획.md`
	- `# 2. 최초 근거 추출표`의 H05 관련 행
	- `# 5. 근거 단위와 정리 방향 대응`의 R06 행
	- `## 7.5 H05 외부 검수 포커스`
	- `# 8. 선결 정책 판단`의 파생 규칙 행
	- `# 9. 실행 순서`
	- `# 10. 검증과 완료 기준`
- 대상 `6477d0a:07_작업노트/위키 규칙 정비/CONVENTIONS와 HowTo 역할 분리 실행 기준선.md`
	- `# 3. anchor 참조 기준선`
	- `# 4. 자동 실행 결과 기준선`
	- `# 5. 선결 정책 결정`의 파생 규칙 행
- 대상 `6477d0a:00_Index/MOC.md`에서 `외부 검수 포커스`를 설명한 항목
- 대상 `6477d0a:99_Logs/log.md`의 `update | 역할 분리 8단계 H05 정리` 항목에서 자동 검사 수치와 파일 목록 및 사용자 판정과 발견 건수의 별도 기록 근거 유무
- 대상 `6477d0a`의 자동 검사 스크립트 전체
	- `scripts/wiki_number.mjs`
	- `scripts/wiki_lint.mjs`
	- `scripts/quote_check.mjs`

대상 H05의 새 원본 anchor 대응표를 정답으로 가정하지 마라. 표의 각 링크가 가리키는 대상 절을 직접 열고 질문의 실제 소유처인지 확인하라.

## 2.3 변경 계약

대상 변경이 다음 계약을 실제로 만족하는지 확인하라. 이 목록은 검토할 주장이지 정답이 아니다.

1. H05는 외부 검토에 쓰는 자체 완결형 검수 문구, P1부터 P5까지의 블록, 발췌 조합과 패킷 구성 방법을 소유해야 한다
2. H05의 검수 블록은 공통 작성 및 운영 규칙을 검토 질문으로 바꾼 파생 텍스트이며 새 작성 규칙이나 운영 권한을 만들지 않아야 한다
3. 검토자의 권한, 호출 조건, 전달 주체, G1과 G2 승인 판정은 `AGENTS.md`가 소유하고 H05는 이를 별도 정책으로 반복하지 않아야 한다
4. 외부 검토자가 독립 맥락에서 바로 쓸 수 있어야 하므로 파일 수정과 Git 조작 및 승인 판정을 금지하는 문구는 자체 완결형 패킷 지시로 유지되어야 한다. 이 반복은 `AGENTS.md`에서 파생됐음을 밝혀야 한다
5. 원본 anchor 대응표는 머리말과 끝맺음, P1, P2, P3, P4 및 가독성, P5, 패킷 머리말과 금지 사항의 실제 소유처를 빠짐없이 가리켜야 한다
6. P1의 수치와 출처 질문은 [[CONVENTIONS#3.6 수치/목표 인용 원칙 (엄격)]]과 [[CONVENTIONS#3.7 외부 근거의 권위 계층]]에 닿아야 한다
7. P2의 구조화, 모순, 순환 참조와 원자료 선추출 질문은 [[CONVENTIONS#3.8 구조 우선 작성 (정보 설계)]], [[CONVENTIONS#3.9 모순(contradiction) 처리]] 및 [[반복 결함 카탈로그]]의 실제 항목에 닿아야 한다
8. P3의 일반적인 반론과 한계 범위는 [[AGENTS#3.1 P1~P5 우선순위]]에 닿고, 근거 등급과 모순 보존 질문은 해당 `CONVENTIONS.md` 절에 닿아야 한다
9. P4와 가독성 블록의 문체 및 구조 질문은 [[CONVENTIONS#3.4 문체]], [[CONVENTIONS#3.8 구조 우선 작성 (정보 설계)]], [[문서 작성 세부 규칙#2. 구조화 규칙]]과 [[문서 작성 세부 규칙#4. 읽기 쉬운 개조식과 목록 형식]]에 닿아야 한다
10. P5의 내용 소유처 정합과 자동 검사 경계는 [[CONVENTIONS#3.5 Wikilink 규칙]] 및 [[AGENTS#2.2.1 작성자]]의 실제 범위와 모순되지 않아야 한다
11. 원본 anchor의 의미가 바뀌면 대응 블록을 함께 점검하도록 하고, 작성과 운영 의무는 원본이, 외부 검토용 문구와 발췌 조합은 H05가 소유한다는 경계가 분명해야 한다
12. H05 5절은 패킷 대상, 검토 지침, 근거, 출력과 금지 사항의 필수 내용을 빠짐없이 정하되 검수 실시 여부나 대체 검토의 진입 조건은 `AGENTS.md`로 돌려야 한다
13. 기존 검수 블록의 질문 강도와 P1부터 P5까지의 분류를 역할 분리 범위 밖에서 임의로 늘리거나 줄이지 않아야 한다
14. 출처가 없던 `LLM-as-judge` 효과 일반화를 제거한 뒤 검수 패킷을 두는 저장소 내부 목적만 남겨, 근거 없는 외부 사실 주장을 새로 만들지 않아야 한다
15. 대상 범위는 기존 헤딩을 바꾸지 않았으므로 기존 H05 anchor 사용처를 이동시키거나 깨뜨리지 않아야 한다. 새 wikilink는 실제 소유 내용을 가리켜야 한다
16. MOC의 기존 H05 요약은 변경 뒤 역할을 여전히 설명해야 하며, 불필요한 MOC 변경을 만들지 않아야 한다
17. 로그의 자동 검사 수치, 수정 파일과 관련 커밋 목록은 Git 객체와 일치해야 한다. 사용자 판정과 독립 검토 발견 건수는 별도 기록 근거가 없으면 검증하지 못한 범위로 남겨야 한다. 대상 커밋 뒤의 외부 검토 진행 결정은 요구하지 않으며 로그의 문체나 표현은 검토 대상이 아니다

## 2.4 독립 재현

원 저장소를 수정하지 말고 기준과 대상 Git 객체를 임시 폴더에 전개해 자동 검사를 재현하라. 각 명령의 종료 코드와 출력 수치를 기록하고, 도구가 없거나 실행이 실패하면 검증하지 못한 범위와 이유를 적어라.

```powershell
$reviewRoot = Join-Path ([IO.Path]::GetTempPath()) ('h05-review-' + [guid]::NewGuid().ToString('N'))
$baseDir = Join-Path $reviewRoot 'base'
$targetDir = Join-Path $reviewRoot 'target'
$baseZip = Join-Path $reviewRoot 'base.zip'
$targetZip = Join-Path $reviewRoot 'target.zip'
$nodeCommand = Get-Command node -CommandType Application -ErrorAction SilentlyContinue

if (-not $nodeCommand) {
	throw 'Node.js 실행 파일을 찾을 수 없어 자동 검사를 재현할 수 없음'
}

try {
	New-Item -ItemType Directory -Path $baseDir, $targetDir -ErrorAction Stop | Out-Null
	git -c core.excludesFile=NUL archive --format=zip --output="$baseZip" a21cbbece0058baf6166868dc8e4e48bdc6169a4 -- '*.md' 'scripts' 'prototype/덜미-나만의유람기/결과물/유람기 런 2026-09-04-1'
	if ($LASTEXITCODE -ne 0) { throw '기준 커밋 archive 실패' }
	git -c core.excludesFile=NUL archive --format=zip --output="$targetZip" 6477d0a02874345f4281bae2e3667ead40a6bf1b -- '*.md' 'scripts' 'prototype/덜미-나만의유람기/결과물/유람기 런 2026-09-04-1'
	if ($LASTEXITCODE -ne 0) { throw '대상 커밋 archive 실패' }
	Expand-Archive -LiteralPath $baseZip -DestinationPath $baseDir -ErrorAction Stop
	Expand-Archive -LiteralPath $targetZip -DestinationPath $targetDir -ErrorAction Stop

	foreach ($snapshot in @($baseDir, $targetDir)) {
		Push-Location $snapshot
		try {
			& $nodeCommand.Source scripts/wiki_number.mjs --check
			if ($LASTEXITCODE -ne 0) { throw "wiki_number 실패: $snapshot" }
			& $nodeCommand.Source scripts/wiki_lint.mjs
			if ($LASTEXITCODE -ne 0) { throw "wiki_lint 실패: $snapshot" }
			& $nodeCommand.Source scripts/quote_check.mjs
			if ($LASTEXITCODE -ne 0) { throw "quote_check 실패: $snapshot" }
		}
		finally {
			Pop-Location
		}
	}
}
finally {
	if (Test-Path -LiteralPath $reviewRoot) {
		$resolvedReviewRoot = (Resolve-Path -LiteralPath $reviewRoot -ErrorAction Stop).Path
		$tempRoot = [IO.Path]::GetFullPath([IO.Path]::GetTempPath()).TrimEnd('\')
		if (-not $resolvedReviewRoot.StartsWith($tempRoot + '\', [StringComparison]::OrdinalIgnoreCase)) {
			throw "임시 폴더 밖 대상: $resolvedReviewRoot"
		}
		if ((Split-Path -Leaf $resolvedReviewRoot) -notlike 'h05-review-*') {
			throw "예상 이름이 아닌 대상: $resolvedReviewRoot"
		}
		Remove-Item -LiteralPath $resolvedReviewRoot -Recurse -Force
	}
}
```

기준과 대상에서 다음 작성자 보고값을 독립적으로 재현하라.

- `wiki_number.mjs --check`: 문서 77개, 넘버링 어긋남 0건
- `wiki_lint.mjs`: 일반 lint 69개 문서, MOC 등록 검사 77개 문서, 오류 0건, 기존 경고 16건
- `quote_check.mjs`: 인용 어긋남 0건, 건너뜀 7건
- 대상 커밋의 변경 파일: 본문 1개와 로그 1개, 합계 2개

# 3. 사실과 정합 검토

## 3.1 P1 사실 오류와 출처 불일치

- 커밋 해시, 직접 부모, 대상 범위와 변경 파일이 실제 Git 객체와 일치하는가
- H05가 가리키는 `AGENTS.md`, `CONVENTIONS.md`, [[문서 작성 세부 규칙]] 및 [[반복 결함 카탈로그]]의 anchor가 대상 커밋에 실제로 존재하는가
- 원본 anchor 대응표의 각 행이 파생 블록의 질문을 실제로 소유하는 절을 빠짐없이 가리키는가
- P1부터 P5까지의 뜻과 우선순위가 대상 `AGENTS.md`의 정의와 일치하는가
- 패킷의 필수 필드와 검토 결과 형식이 대상 H05의 실제 내용과 일치하는가
- `LLM-as-judge` 효과 문장 제거 뒤 새 배경 문장이 외부 사실을 근거 없이 단정하지 않는가
- 로그의 자동 검사 수치와 파일 목록이 Git 객체 및 독립 재현 결과와 일치하는가. 사용자 판정과 독립 검토 발견 건수에 별도 기록 근거가 없으면 검증하지 못한 범위로 남겼는가. 대상 커밋 뒤의 결정이나 로그 문체는 평가하지 마라

## 3.2 P5 위키 정합성

- H05가 원본이라고 지목한 각 wikilink가 제목만 맞는 절이 아니라 해당 질문이나 운영 의무를 실제로 소유하는 절을 가리키는가
- P2 행의 CONTENT-003과 PROCESS-002 anchor가 실제 카탈로그 항목을 정확히 가리키는가
- P3 행에 일반적인 한계 조건을 소유한 `AGENTS.md`의 P3 정의가 포함되어 있는가
- P5 행에서 내용 소유처 정합과 자동 검사의 역할을 잘못된 절에 귀속하지 않았는가
- H05의 자체 완결형 문구 소유와 `AGENTS.md`의 운영 권한 소유가 서로 미루기만 하는 빈 순환 참조가 아닌가
- 대상 범위에서 새로 깨지거나 의미가 달라진 anchor와 wikilink가 없는가

# 4. 적대적 검토

## 4.1 P2 논리적 비약과 문서 간 모순

- `파생 텍스트`와 `새 규칙이 아님`이라는 선언 뒤에도 H05가 호출 조건, 대체 조건이나 승인 권한을 사실상 새로 정하는 문장이 남아 있지 않은가
- H05가 검수 블록의 문구를 소유한다는 설명과 원본 문서가 작성 및 운영 의무를 소유한다는 설명이 책임을 서로 미루거나 충돌하지 않는가
- 원본 anchor 변경 시 동기화 점검 규칙이 H05만 고치면 원본 의무까지 바뀌는 것으로 오해되지 않는가
- 검수 패킷의 자체 완결성을 위한 금지 문구 반복과 운영 권한의 단일 정본 원칙이 구별되는가
- 패킷 필드 표가 필수 내용을 정하는 범위를 넘어 검수 실시 여부나 사용자 전달 절차를 다시 소유하지 않는가
- P1부터 P5까지의 블록과 가독성 블록에서 원본보다 질문을 과도하게 확대하거나 필수 질문을 누락하지 않았는가
- H05와 H04가 서로 링크하더라도 H05는 검수 블록을, H04는 과거 사례와 재발 질문을 각각 보유해 실체 없는 순환 참조가 되지 않는가

## 4.2 P3 누락된 반론과 견고성

- 원본 anchor 대응표에서 한 블록이 여러 정본에서 파생될 때 소유 범위가 빠져 동기화 누락을 만들 가능성이 없는가
- P1부터 P5까지의 정의와 세부 질문 원본이 다른데 이를 독자가 구별할 단서가 충분한가
- `AGENTS.md`가 바뀌었을 때 H05의 패킷 머리말, 금지 사항과 발췌 조합 중 무엇을 재대조해야 하는지 식별할 수 있는가
- 외부 검토 패킷이 독립 맥락에서 쓰이면서도 대상 경로, diff 범위와 원자료를 누락하지 않도록 필수 필드가 충분한가
- 근거가 `해당 없음`인 경우와 접근할 수 없어 검증하지 못한 경우가 혼동되지 않는가
- 자동 검사 경계를 외부 검토에서 전혀 보지 말라는 뜻으로 확대해 의미 정합이나 소유처 대조까지 빠뜨리지 않는가
- 로그를 기계적 기록 대조로 한정한 범위가 본문 H05의 실제 결함 보고를 막지 않는가

## 4.3 반복 결함 우선 점검

`6477d0a:01_HowTo/반복 결함 카탈로그.md` 전체를 읽고 다음 유형의 재발을 우선 확인하되 여기에만 한정하지 마라.

- `STRUCT-001`: 옛 역할, 전달 절차, 호출 조건이나 `LLM-as-judge` 효과 문장의 잔류
- `STRUCT-002`, `STRUCT-009`: 원본 anchor 대응표와 패킷 필드 표에 길거나 이질적인 값을 과도하게 넣어 항목 구분이 흐려짐
- `STRUCT-008`: 한 불릿에 정본 소유, 파생 관계와 실행 조건을 평면으로 욱여넣음
- `CONTENT-003`: H05, H04와 `AGENTS.md`가 서로 미루기만 하고 검수 문구나 운영 의무의 실체가 사라짐
- `CONTENT-004`: 역할과 목적 설명이 비대해져 다른 문서의 규칙과 권한을 다시 서술함
- `CONTENT-005`: 검수 문구, 작성 규칙, 검토자 권한과 승인 게이트의 정본 소유처를 잘못 귀속함
- `PROCESS-001`: 대표 문장만 고치고 같은 역할 중복이나 옛 전제를 H05 전체에서 쓸어내지 않음
- `STRUCT-010`: 원본 규칙 변경 뒤 파생 검수 블록이 옛 기준으로 남는 회귀 가능성을 대응표가 막지 못함
- 일반 수치 점검: 검사 결과와 발견 수에 모집단, 기준선과 작성 과정 기록 여부가 빠지지 않았는지 확인함

# 5. 가독성 검토

## 5.1 P4 문체, 구조와 가독성

맥락 없는 독자의 관점에서 `a21cbbe..6477d0a`의 `01_HowTo/외부 검수 포커스.md` diff에 새로 쓰거나 고친 문장만 읽고 다음을 확인하라. `99_Logs/log.md`, 이 검수 패킷과 범위 밖 파일의 표현은 새 발견으로 보고하지 마라.

- H05가 무엇을 소유하고 무엇을 `AGENTS.md`와 작성 정본으로 돌리는지 첫 요약과 각 절에서 같은 뜻으로 읽히는가
- `원본 anchor`, `파생 블록`, `작성과 운영 의무`, `자체 완결형 문구`, `발췌 조합`과 `패킷 구성`이 일관된 뜻으로 쓰이는가
- 원본 anchor 대응표에서 각 행의 검수 블록과 원본 절을 한 번에 연결할 수 있는가
- P2처럼 링크가 많은 표 셀이 과적되어 소유 관계를 읽기 어렵게 만들지 않는가
- 3.3절의 호출 및 대체 조건 링크와 5절의 필드 설명이 같은 운영 경계를 불필요하게 반복하지 않는가
- 패킷 머리말과 필드 표의 금지 사항이 자체 완결성을 위해 필요한 반복인지, 같은 내용을 읽기 어렵게 되풀이하는지 구별되는가
- 5절의 세 불릿이 발췌 결합, 전문 사용과 대체 검토 형식을 같은 수준의 병렬 문장으로 설명하는가
- TL;DR, 절 제목, 표 머리말과 관련 문서가 변경 뒤 본문 역할과 일치하는가
- 음슴체, 한 불릿 한 생각, 병렬 구조, 조사 범위와 영문 용어 사용이 일관되는가

# 6. 출력 형식

발견을 `사실과 정합`, `적대`, `가독성` 세 절로 나눠라. `F`는 발견(Finding)을 뜻하며 검토 종류와 무관하다. ID는 세 절 전체에서 `F-01`, `F-02`처럼 연속해서 부여하라.

각 발견은 다음 형식을 사용하라.

```text
ID: F-01
우선순위: P1, P2, P3, P4, P5 중 하나
심각도: 높음, 중간, 낮음 중 하나
위치: 파일명:행과 대상 문구
문제: 무엇이 틀리거나 모호한지
근거: 직접 대조한 파일, Git 객체, 스크립트 또는 공식 문서
영향: 그대로 둘 때 생기는 문제
제안: 최소 정정안
외부 근거 등급: L1~L5 또는 해당 없음
```

- 대상 문장, 규칙과 Git 객체만 근거이면 `해당 없음`으로 적음. 저장소 내부라도 `_locked/`와 `_sources/` 원본은 L1, `converted/` 변환본은 L2로 분류함
- 외부 근거가 약하면 근거 앞에 `[근거 약함]`을 붙임
- 같은 원인의 반복은 하나의 대표 발견 아래 모든 위치를 나열함
- 발견이 없는 검토 절에는 수행 범위와 `0건`만 적음

마지막 요약에는 다음만 적어라.

- 직접 읽은 파일과 Git 객체
- 실행한 검사와 재현 결과
- 사실과 정합, 적대, 가독성의 발견 건수
- 검증하지 못한 범위와 이유
- 반복 결함 카탈로그에서 대조한 항목

# 7. 금지 사항

- 작성 의도와 중간 추론을 추정하지 않음
- 원 저장소의 파일, 로그와 Git 상태를 수정하지 않음
- `git checkout`, `git switch`, `git reset`, `git clean`, `git stash`를 실행하지 않음
- 원 저장소에서 쓰기 모드 자동 정비 명령을 실행하지 않음
- Git 등록, 커밋, 전송과 브랜치 조작을 하지 않음
- 발견을 자동 반영하지 않음
- 발견의 수용, 보류, 반려나 최종 통과를 선언하지 않음

# 8. 관련 문서

- [[CONVENTIONS와 HowTo 역할 분리 계획]]
- [[CONVENTIONS와 HowTo 역할 분리 실행 기준선]]
- [[외부 검수 포커스]]
- [[반복 결함 카탈로그]]
