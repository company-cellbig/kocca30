---
title: CONVENTIONS와 HowTo 역할 분리 7단계 외부 검수 지시문
type: agentnote
status: draft
tags: [agentnote, 규칙, 정비, 외부검수]
sources: [CONVENTIONS와 HowTo 역할 분리 계획, CONVENTIONS와 HowTo 역할 분리 실행 기준선, 외부 검수 포커스, 반복 결함 카탈로그]
created: 2026-09-10
updated: 2026-09-10
---

> 역할 분리 7단계에서 H04([[반복 결함 카탈로그]])를 과거 사례와 현행 정본에서 파생한 재발 검수 질문의 소유처로 정리한 결과를 새 Claude Code 세션에서 검토할 때 전달하는 독립 맥락 검수 패킷임. 과거 발견 사실의 보존, 현행 규칙과 파생 질문의 정합성, P1부터 P5까지의 분류, 검토자와 작성자의 역할 경계 및 가독성을 검토하고 파일은 수정하지 않은 채 발견만 보고하도록 지시함.

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

역할 분리 계획의 7단계 H04 변경 커밋 두 개를 하나의 범위로 검토한다.

- **기준 커밋**: `18623113c7dce2b9836ef817b0bfa1cbc667f31a`
- **본문 커밋**: `231abfe1c129aa03b66be5d59179a25864bf5b9e` (`refactor: 역할 분리 7단계 H04 정리`)
- **정정 커밋이자 대상 끝점**: `f685be5293433d2ec02fcf9c526de109b9c7899c` (`fix: H04 역사 필드 보존`)
- **대상 끝점의 직접 부모**: `231abfe1c129aa03b66be5d59179a25864bf5b9e`
- **대상 변경 범위**: `18623113c7dce2b9836ef817b0bfa1cbc667f31a..f685be5293433d2ec02fcf9c526de109b9c7899c`

대상 범위가 바꾼 파일은 다음 2개다.

- `01_HowTo/반복 결함 카탈로그.md`
- `99_Logs/log.md`

대상 끝점 뒤의 커밋, 이 검수 패킷과 그에 따른 MOC 및 로그 변경, 현재 작업 트리의 모든 변경은 범위 밖이다. 특히 `05_산출물/`, 이미지 자산과 `90_Temp/`의 현재 변경을 H04 변경이나 근거로 판정하지 마라. 검토 결과와 근거에 현재 작업 트리 상태를 섞지 말고 Git 객체를 읽어라.

다음 읽기 전용 명령으로 범위를 먼저 고정하라.

```powershell
$base = '18623113c7dce2b9836ef817b0bfa1cbc667f31a'
$target = 'f685be5293433d2ec02fcf9c526de109b9c7899c'

git show --stat --oneline $target
git rev-parse "$target^"
git log --oneline --reverse "$base..$target"
git -c core.quotepath=false diff --name-status $base $target
git -c core.quotepath=false diff $base $target -- '01_HowTo/반복 결함 카탈로그.md' '99_Logs/log.md'
git -c core.quotepath=false diff $base 231abfe1c129aa03b66be5d59179a25864bf5b9e -- '01_HowTo/반복 결함 카탈로그.md' '99_Logs/log.md'
git -c core.quotepath=false diff 231abfe1c129aa03b66be5d59179a25864bf5b9e $target -- '01_HowTo/반복 결함 카탈로그.md' '99_Logs/log.md'
git log --oneline "$target..HEAD"
git -c core.quotepath=false status --short
```

## 2.2 반드시 읽을 파일과 Git 객체

검색 결과 일부만 보지 말고 다음 범위를 직접 읽어라.

- 기준 `1862311`과 대상 끝점 `f685be5` 사이 변경 파일 2개의 diff 전체
- 본문 `231abfe`와 정정 `f685be5`의 개별 diff 전체
- 기준 `1862311:01_HowTo/반복 결함 카탈로그.md` 전체
- 대상 `f685be5:AGENTS.md` 전체
- 대상 `f685be5:CONVENTIONS.md` 전체
- 대상 `f685be5:01_HowTo/반복 결함 카탈로그.md` 전체
- 대상 `f685be5:01_HowTo/문서 작성 세부 규칙.md` 전체
- 대상 `f685be5:01_HowTo/위키 운영 워크플로.md` 전체
- 대상 `f685be5:01_HowTo/외부 검수 포커스.md`의 2절, 3절과 5절
- 대상 `f685be5:07_작업노트/위키 규칙 정비/CONVENTIONS와 HowTo 역할 분리 계획.md`
	- `# 2. 최초 근거 추출표`의 H04 관련 행
	- `# 5. 근거 단위와 정리 방향 대응`의 H04 관련 행
	- `## 7.4 H04 반복 결함 카탈로그`
	- `# 9. 실행 순서`
	- `# 10. 검증과 완료 기준`
- 대상 `f685be5:07_작업노트/위키 규칙 정비/CONVENTIONS와 HowTo 역할 분리 실행 기준선.md`
	- `# 3. anchor 참조 기준선`
	- `# 4. 자동 실행 결과 기준선`
- 대상 `f685be5:00_Index/MOC.md`의 `## 6.4 위키 규칙 정비 (위키 규칙 정비/)`
- 대상 `f685be5:99_Logs/log.md`의 `maint | 역할 분리 7단계 H04 정리` 항목 전체
- 대상 `f685be5`의 자동 검사 스크립트 전체
	- `scripts/wiki_number.mjs`
	- `scripts/wiki_lint.mjs`
	- `scripts/quote_check.mjs`
- 역사 기록과 현행 질문의 경계를 확인하는 데 필요하면 `git log --follow -- '01_HowTo/반복 결함 카탈로그.md'`와 관련 커밋의 해당 행을 읽되, 현재 작업 트리를 근거로 쓰지 마라

## 2.3 변경 계약

대상 변경이 다음 계약을 실제로 만족하는지 확인하라. 이 목록은 검토할 주장이지 정답이 아니다.

1. H04는 과거 결함의 발견 이력과 재발 검수 질문을 소유하되 현행 작성 규칙, 검토자 권한이나 승인 절차를 새로 정하지 않아야 한다
2. `발견/log`, `증상`, `진단`은 당시 사실을 보존하고, 현행 규칙이 바뀌어도 새 기준에 맞춰 과거 사실을 다시 쓰지 않아야 한다
3. `권고 점검`은 현행 정본에서 파생한 질문이어야 하며 사실과 출처, 문서 구조, 갱신 실행, 갱신 결과와 전수 점검의 실제 소유처를 각각 가리켜야 한다
4. 프로젝트별 스키마 질문은 과거 사례에 적힌 스키마를 저장소 전체 규칙으로 일반화하지 않고 검수 패킷이 지정한 현행 정본과 대조하도록 작성되어야 한다
5. `재발 시 첨부 포커스 발췌`는 [[외부 검수 포커스]]가 정한 검수 블록과 발췌 조합을 고르는 색인이어야 하며 H04가 검수 블록이나 운영 권한을 복제하지 않아야 한다
6. 일반적인 문체와 구조 결함은 P4, 사실 오류는 P1, 논리 모순은 P2, 한계와 누락은 P3, 참조가 실제 소유 내용을 가리키는지는 P5로 분류되어야 한다. 구조 일관성만을 이유로 P5를 붙이지 않아야 한다
7. STRUCT-007은 제목과 본문 묶음의 헤딩 승격 원칙을 유지하면서 깊이 한계의 평탄화와 중복 헤딩으로 anchor 갱신이 보류된 경우의 사람 확정을 현행 정본과 같은 조건으로 물어야 한다
8. STRUCT-010은 과거 스키마 회귀 사례를 보존하되 폐기될 수 있는 특정 H1부터 H5까지의 구조를 현행 일반 규칙으로 단정하지 않아야 한다. 자동 검사가 의미적 스키마 준수를 판정하지 못한다는 한계와 정본 대조 필요를 구별해야 한다
9. PROCESS-001은 저장소 전수 점검을 작성자 책임으로, 패킷 지정 범위의 직접 대조를 외부 검토자 책임으로 구분해야 한다. 현행 `역할 경계`와 `권고 점검`에는 저장소 접근 불가와 `grep`이라는 옛 전제를 남기지 않아야 한다
10. STRUCT-011은 당시 양식의 조건부 항목을 역사로 보존하고, 현재 질문은 패킷이 지정한 양식 정본이 해당 항목을 조건부로 둘 때만 적용되도록 한정해야 한다
11. PROCESS-002의 역사와 질문은 검수 패킷의 자체 완결성을 위해 유지하되 [[CONVENTIONS#3.8 구조 우선 작성 (정보 설계)]]과 [[AGENTS#2.2.1 작성자]]에서 파생됐음을 밝혀야 한다. 특정 프로젝트의 말과 행동 구분을 모든 원자료의 필수 분절 기준으로 일반화하지 않아야 한다
12. 일반 구조 결함의 `재발 시 첨부 포커스 발췌`에서 P5를 P4로 바꾼 항목은 실제 결함 성격과 맞아야 하며, 참조 소유처 정합성을 보는 항목의 P5는 유지되어야 한다
13. 대상 범위는 기존 헤딩을 바꾸지 않았으므로 기존 H04 anchor 사용처를 불필요하게 이동시키거나 깨뜨리지 않아야 한다. 새 wikilink는 실제 소유 내용을 가리켜야 한다
14. 로그는 자동 검사 기준선, 독립 검토의 발견 수, 사용자 판정과 즉시 정정 항목을 과장 없이 구분해야 한다. Git 객체로 증명할 수 있는 결과와 작성 과정 기록의 차이를 흐리지 않아야 한다

## 2.4 독립 재현

원 저장소를 수정하지 말고 대상 Git 객체를 임시 폴더에 전개해 자동 검사를 재현하라. 기준 커밋 결과는 대상에서 새 오류나 경고가 생겼는지 비교하는 기준이다. 각 명령의 종료 코드와 출력 수치를 기록하고, 도구가 없거나 실행이 실패하면 검증하지 못한 범위와 이유를 적어라.

```powershell
$reviewRoot = Join-Path ([IO.Path]::GetTempPath()) ('h04-review-' + [guid]::NewGuid().ToString('N'))
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
	git -c core.excludesFile=NUL archive --format=zip --output="$baseZip" 18623113c7dce2b9836ef817b0bfa1cbc667f31a -- '*.md' 'scripts' 'prototype/덜미-나만의유람기/결과물/유람기 런 2026-09-04-1'
	if ($LASTEXITCODE -ne 0) { throw '기준 커밋 archive 실패' }
	git -c core.excludesFile=NUL archive --format=zip --output="$targetZip" f685be5293433d2ec02fcf9c526de109b9c7899c -- '*.md' 'scripts' 'prototype/덜미-나만의유람기/결과물/유람기 런 2026-09-04-1'
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
		if ((Split-Path -Leaf $resolvedReviewRoot) -notlike 'h04-review-*') {
			throw "예상 이름이 아닌 대상: $resolvedReviewRoot"
		}
		Remove-Item -LiteralPath $resolvedReviewRoot -Recurse -Force
	}
}
```

대상 끝점에서 다음 작성자 보고값을 독립적으로 재현하라.

- `wiki_number.mjs --check`: 문서 75개, 넘버링 어긋남 0건
- `wiki_lint.mjs`: 일반 lint 67개 문서, MOC 등록 검사 75개 문서, 오류 0건, 기준 커밋과 같은 기존 경고 16건
- `quote_check.mjs`: 인용 어긋남 0건, 건너뜀 7건
- 대상 범위의 변경 파일: 2개

# 3. 사실과 정합 검토

## 3.1 P1 사실 오류와 출처 불일치

- 커밋 해시, 직접 부모, 대상 범위와 변경 파일 2개가 실제 Git 객체와 일치하는가
- 과거 `발견/log`, `증상`, `진단`이 직접 부모와 비교해 사실상 다시 쓰이지 않았는가. 문법 보정이나 `당시` 한정이 역사적 의미를 바꾸지 않았는가
- H04 상단의 정본 소유처가 `AGENTS.md`, `CONVENTIONS.md`, `문서 작성 세부 규칙.md`, `위키 운영 워크플로.md`와 실제로 일치하는가
- P1부터 P5까지의 의미와 각 항목의 `재발 시 첨부 포커스 발췌`가 `AGENTS.md`와 `외부 검수 포커스.md`의 정의와 일치하는가
- 깊이 한계, 중복 헤딩과 anchor 갱신 보류의 설명이 `CONVENTIONS.md` 및 `AGENTS.md`의 실제 조건과 일치하는가
- `wiki_lint`의 검사 범위와 의미적 스키마 판정 한계에 관한 설명이 실제 스크립트와 모순되지 않는가
- 로그의 자동 검사 수치, 독립 검토 발견 수와 사용자 판정 기록이 대상 범위의 본문 및 작성 과정 기록과 일치하는가

## 3.2 P5 위키 정합성

- H04 상단의 각 wikilink가 실제 내용을 소유한 절을 가리키는가
- `권고 점검`이 현행 규칙의 새 소유처처럼 읽히지 않고 지정된 정본을 검사하는 파생 질문으로 한정되는가
- `재발 시 첨부 포커스 발췌`가 외부 검수 포커스의 블록과 발췌 조합을 선택하는 색인으로만 기능하는가
- STRUCT-007, STRUCT-010, PROCESS-001, STRUCT-011과 PROCESS-002의 수정 문장이 현행 정본 및 역할 분리 계획의 H04 경계와 맞는가
- P4로 바뀐 구조 결함과 P5가 유지된 정본 참조 결함의 구분이 문서 전체에서 일관되는가
- 대상 범위에서 새로 깨지거나 의미가 달라진 anchor와 wikilink가 없는가

# 4. 적대적 검토

## 4.1 P2 논리적 비약과 문서 간 모순

- 과거 사실을 보존한다는 원칙과 현행 질문을 동기화한다는 원칙이 어느 필드를 언제 바꾸는지 모호하게 겹치지 않는가
- 현행 정본에서 파생했다는 설명이 H04의 모든 `권고 점검`을 현재도 유효한 의무 규칙으로 과장하지 않는가
- 프로젝트별 스키마를 패킷 지정 정본과 대조하게 한 결과, 패킷에 정본이 지정되지 않은 재발 검토가 실행 불가능해지지 않는가
- PROCESS-001에서 작성자 전수 점검과 외부 검토자의 지정 범위 대조가 중복되거나 서로 책임을 미루는 구조가 되지 않는가
- PROCESS-002의 자체 완결성을 위한 반복과 공통 정본의 단일 소유 원칙이 충돌하지 않도록 파생 관계가 충분히 드러나는가
- 구조 결함의 P5를 P4로 바꾼 결과 실제 anchor, 링크나 소유처 정합성까지 함께 있는 사례의 P5 검토가 빠지지 않는가

## 4.2 P3 누락된 반론과 견고성

- 과거 사실과 현행 질문 사이에 현재는 폐기된 용어나 스키마가 남아 있을 때 독자가 두 층을 구별할 수 있는가
- 검수 패킷이 현행 정본을 잘못 지정하거나 지정하지 않았을 때 프로젝트별 스키마 질문을 어떻게 취급할지 최소한의 경계가 있는가
- 자동 검사가 스키마 의미를 판정하지 못한다는 설명이 자동 검사 전체를 무용한 것으로 오해하게 하지 않는가
- `rg` 잔여 0건 보고를 외부 검토자가 대조할 때 검색 범위와 패턴이 빠진 보고를 통과시키지 않도록 질문이 충분한가
- 중복 헤딩 때문에 자동 anchor 갱신이 보류되는 경우와 단순히 같은 제목이 존재하는 경우를 구별할 수 있는가
- 로그의 여러 독립 검토와 즉시 정정 기록이 실제 검토의 한계와 미검증 범위를 가리지 않는가

## 4.3 반복 결함 우선 점검

`f685be5:01_HowTo/반복 결함 카탈로그.md` 전체를 읽고 다음 유형의 재발을 우선 확인하되 여기에만 한정하지 마라.

- `STRUCT-001`: 옛 P 분류, 옛 도구명, 폐기된 스키마나 역할 전제의 잔류
- `STRUCT-007`: 제목과 자기 본문을 가진 새 소유 경계 설명을 구조 없는 볼드 라벨이나 긴 문장에 묻음
- `STRUCT-008`: 하나의 불릿에 서로 독립된 정본 소유처나 점검 질문을 평면으로 욱여넣음
- `CONTENT-004`: H04의 역할 설명이 비대해져 다른 정본의 규칙과 권한을 다시 서술함
- `CONTENT-005`: 작성자, 외부 검토자, 검수 포커스와 위키 운영 절차의 소유처를 잘못 귀속함
- `PROCESS-001`: 대표 항목만 고치고 같은 P 분류, 옛 전제와 파생 질문을 문서 전체에서 전수 점검하지 않음
- `PROCESS-002`: 현행 정본과 파생 관계를 밝히지 않은 채 질문이 새 의무 규칙처럼 남음
- 일반 수치 점검: 검사 결과와 발견 수에 모집단, 기준선과 작성 과정 기록 여부가 빠지지 않았는지 확인함

# 5. 가독성 검토

## 5.1 P4 문체, 구조와 가독성

맥락 없는 독자의 관점에서 대상 diff의 새 문장과 수정 문장 전체를 읽고 다음을 확인하라.

- 과거 사실 필드와 현행 정본에서 파생한 질문 필드를 처음 읽어도 구별할 수 있는가
- `소유`, `정본`, `파생`, `색인`, `검수 블록`, `발췌 조합`과 `검수 패킷`이 일관된 뜻으로 쓰이는가
- H04 상단의 정본 소유처 목록이 한 번에 훑어지고 각 링크의 역할을 구별할 수 있는가
- P1부터 P5까지의 번호와 괄호 안 설명이 실제 검토 성격과 맞고 불필요하게 중복되지 않는가
- STRUCT-007, STRUCT-010, PROCESS-001과 STRUCT-011의 중첩 번호 목록이 질문 단위를 명확히 나누는가
- 역사적 사례 문장에 붙인 `당시`와 현재 질문의 조건문이 시간 층을 자연스럽게 구별하는가
- PROCESS-002의 파생 관계 설명이 길거나 추상적이지 않고 뒤 질문들과 자연스럽게 이어지는가
- 음슴체, 한 불릿 한 생각, 병렬 접속, 조사 범위와 영문 용어 사용이 일관되는가
- 로그 항목이 변경 내용, 사용자 판정, 즉시 정정, 독립 검토와 자동 검사 결과를 시간 순서대로 구별하는가

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
