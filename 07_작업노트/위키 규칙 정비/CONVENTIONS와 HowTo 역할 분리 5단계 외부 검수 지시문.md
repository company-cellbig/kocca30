---
title: CONVENTIONS와 HowTo 역할 분리 5단계 외부 검수 지시문
type: agentnote
status: draft
tags: [agentnote, 규칙, 정비, 외부검수]
sources: [CONVENTIONS와 HowTo 역할 분리 계획, CONVENTIONS와 HowTo 역할 분리 실행 기준선, 외부 검수 포커스, 반복 결함 카탈로그]
created: 2026-09-09
updated: 2026-09-09
---

> 역할 분리 5단계의 H08 절 참조 복구 경계 정리를 새 Claude Code 세션에서 검토할 때 전달하는 독립 맥락 검수 패킷임. 현행 규칙과 과거 복구 절차의 소유 경계, 이관 수치와 도구 동작, lint 예외 축소 및 파생 참조의 정합성을 검토하고 파일은 수정하지 않은 채 발견만 보고하도록 지시함.

# 1. 사용 방법

- 새 Claude Code 세션을 열고 이 문서의 `검수 지시문` 절부터 끝까지 전달함
- 작성 대화, 작성 의도와 중간 추론은 전달하지 않음
- 저장소 루트에서 실행하고 Git 객체와 지정된 파일을 직접 대조함
- 검토 보고를 받은 뒤 발견별 수용, 보류 또는 반려 여부는 사용자가 결정함

# 2. 검수 지시문

당신은 이 변경의 외부 검토자다. [[#7. 금지 사항]]을 준수하고 발견만 보고하라.

작성자의 의도나 중간 추론을 추정하지 말고 완성된 변경, Git 객체와 지정된 규칙을 직접 대조하라. `괜찮아 보임`은 승인 근거가 아니다. 결함을 적극적으로 찾되 발견의 수용 여부나 최종 통과 여부는 판정하지 마라.

검토에서 발견이 없으면 해당 절에 수행 범위와 `0건`만 적어라. 무발견을 결함 부재의 증명이나 `검증 완료`로 표현하지 마라.

## 2.1 검토 대상

역할 분리 계획의 5단계 H08 변경 커밋 하나를 검토한다.

- **H08 단계 비교 기준 커밋**: `0a7be7049191bfb3a0e54ced0dfd051730e38f78`
- **대상 커밋**: `f54f4660784d5cf91f928534d1baebe473c8eb19`
- **대상 커밋의 직접 부모**: `dd62892af5d7a62d4babf782e6a08566eb60f8e5`
- **대상 변경 범위**: `dd62892af5d7a62d4babf782e6a08566eb60f8e5..f54f4660784d5cf91f928534d1baebe473c8eb19`
- **커밋 제목**: `f54f466 refactor: 역할 분리 5단계 H08 정리`

`dd62892`는 H08 작성 도중 별도로 들어온 인포그래픽 커밋이다. 대상 커밋의 직접 부모 관계를 확인할 때만 사용하고 H08 변경으로 판정하지 마라. H08 로그의 변경 전 수치와 문장은 작업 착수 시점인 `0a7be70`을 기준으로 대조하라.

대상 커밋이 바꾼 파일은 다음 5개다.

- `CONVENTIONS.md`
- `01_HowTo/절 참조 오변환 점검 절차.md`
- `01_HowTo/반복 결함 카탈로그.md`
- `99_Logs/log.md`
- `scripts/wiki_lint.mjs`

대상 커밋 뒤의 커밋, 검수 패킷 자체와 그에 따른 MOC 및 로그 변경, 현재 작업 트리의 모든 변경은 범위 밖이다. 검토 결과와 근거에 현재 작업 트리 상태를 섞지 말고 Git 객체를 읽어라.

다음 읽기 전용 명령으로 범위를 먼저 고정하라.

```powershell
git show --stat --oneline f54f4660784d5cf91f928534d1baebe473c8eb19
git rev-parse f54f4660784d5cf91f928534d1baebe473c8eb19^
git -c core.quotepath=false diff --name-status dd62892af5d7a62d4babf782e6a08566eb60f8e5 f54f4660784d5cf91f928534d1baebe473c8eb19
git -c core.quotepath=false diff dd62892af5d7a62d4babf782e6a08566eb60f8e5 f54f4660784d5cf91f928534d1baebe473c8eb19 -- CONVENTIONS.md '01_HowTo/절 참조 오변환 점검 절차.md' '01_HowTo/반복 결함 카탈로그.md' '99_Logs/log.md' scripts/wiki_lint.mjs
git log --oneline f54f4660784d5cf91f928534d1baebe473c8eb19..HEAD
git -c core.quotepath=false status --short
```

## 2.2 반드시 읽을 파일과 Git 객체

검색 결과 일부만 보지 말고 다음 범위를 직접 읽어라.

- 직접 부모 `dd62892`와 대상 `f54f466`의 변경 파일 5개 전체
- 대상 `f54f466:AGENTS.md` 전체
- 대상 `f54f466:01_HowTo/위키 운영 워크플로.md` 전체
- 대상 `f54f466:00_Index/MOC.md`
	- `# 2. 가이드 (01_HowTo)`
	- `## 6.4 위키 규칙 정비 (위키 규칙 정비/)`
- 대상 `f54f466:07_작업노트/위키 규칙 정비/CONVENTIONS와 HowTo 역할 분리 계획.md`
	- `# 2. 최초 근거 추출표`의 H08-01~H08-04
	- `# 5. 근거 단위와 정리 방향 대응`의 R09
	- `# 6. CONVENTIONS 정리 방향`
	- `## 7.8 H08 절 참조 오변환 점검 절차`
	- `# 9. 실행 순서`
	- `# 10. 검증과 완료 기준`
- 대상 `f54f466:07_작업노트/위키 규칙 정비/CONVENTIONS와 HowTo 역할 분리 실행 기준선.md`
	- `# 3. anchor 참조 기준선`
	- `# 4. 자동 실행 결과 기준선`
	- `# 5. 선결 정책 결정`
- 대상 `f54f466:01_HowTo/문서 작성 세부 규칙.md` 전체
- 대상 `f54f466:01_HowTo/외부 검수 포커스.md`의 2절, 3절과 5절
- 대상 `f54f466:scripts/migrate_secref.mjs` 전체
- 대상 `f54f466`의 `scripts/wiki_number.mjs`, `scripts/wiki_lint.mjs`, `scripts/quote_check.mjs` 전체
- 이관 커밋 `64920eb6b7dd5f40e8695815b5442ca038741885`
	- `scripts/migrate_secref.mjs` 전체
	- 당시 경로 `05_Logs/log.md`의 `maint | § 참조 621건을 wikilink anchor로 이관 (§ 표기 폐지 1단계)` 항목
- 흔적 축소 전후의 `01_HowTo/절 참조 오변환 점검 절차.md`
	- `6a0e524^`: 다섯 흔적 판본
	- `6a0e524`: 세 흔적으로 줄인 판본
	- `82f443e`: 후속 검토 판본
- 변환 직전 커밋 `3af09e8`과 표본 파일 `3af09e8:CONVENTIONS.md`. H08 5절의 `<파일>`은 실제 의심 anchor가 있는 파일 경로로 바꾸는 자리인지 확인함

## 2.3 변경 계약

대상 변경이 다음 계약을 실제로 만족하는지 확인하라. 이 목록을 정답으로 가정하지 말고 Git 객체와 문장을 직접 대조하라.

1. 현행 절 참조 표기, 범위 참조와 이력 보존 예외는 `CONVENTIONS.md` 3.5가 소유해야 한다
2. 헤딩 재번호와 anchor 연쇄 갱신의 현행 동작은 `CONVENTIONS.md` 4.3이 소유해야 한다
3. 2026-07-14 이관 경위, 오변환 흔적, 자동 탐지 한계, 표본 검증과 복구 절차는 `절 참조 오변환 점검 절차.md`가 소유해야 한다
4. H08 문서는 현행 공통 규칙을 복제하지 않고 정본 anchor를 가리키되, 과거 오변환을 실제로 복구할 수 있을 만큼 자족적이어야 한다
5. 621건 변환, 수동 처리 대상 113건과 `stale 의심` 15건은 당시 기록과 일치해야 하며, 15건을 확정 오류로 단정하지 않아야 한다
6. `migrate_secref.mjs`의 설명은 이름 겹침을 후보 선택에 사용한 사실과 의미 일치를 검증하지 못한 한계를 모두 반영해야 한다
7. H08 3절의 현행 세 흔적(옛 경로 조각 잔류, 문서 이름 뒤 자기 문서 anchor, anchor 뒤 다른 헤딩 이름)은 2026-08-23에 삭제된 두 흔적(앞 문서 이름과 대상 문서 불일치, 외부 문서 목록 속 자기 문서 anchor)을 임의로 복원하지 않아야 한다
8. 복구 절차의 수정 뒤 연쇄 갱신, 자동 검사, 로그와 커밋은 현행 `위키 운영 워크플로.md` 및 `AGENTS.md`의 실제 소유 절을 가리켜야 한다
9. `CONVENTIONS.md`의 정책 설명을 위해 파일 전체를 `§` 검사에서 면제하지 않아야 한다. 정책 설명의 기호는 인라인 코드로 구별하고, 이력 보존 예외와 lint 구현의 범위가 맞아야 한다
10. `CONVENTIONS.md` 3.6의 원자료 경로와 인용 예시가 실제 `_locked/rfp_제안요청서.md`와 헤딩을 가리켜야 한다
11. `반복 결함 카탈로그.md`의 관련 문서 링크는 카탈로그 첨부를 실제로 정한 `외부 검수 포커스` 3.2를 가리켜야 한다
12. 헤딩을 바꾸지 않았으므로 기존 anchor 사용처가 불필요하게 이동하지 않아야 하며, MOC 요약은 대상 문서의 범위를 계속 정확히 설명해야 한다

## 2.4 독립 재현

원 저장소를 수정하지 말고 직접 부모와 대상 커밋을 저장소 밖 임시 디렉터리에 전개해 읽기 전용 검사를 실행하라. 직접 부모 결과는 대상에서 오류, 경고와 검사 문서 수가 새로 달라졌는지 보는 회귀 기준이다. 명령별 종료 코드와 출력을 모두 보존하고 종료 코드가 0이 아니면 검사 실패로 보고하라. 결과 확인 뒤 검증된 임시 경로만 삭제하라.

```powershell
$reviewRoot = Join-Path ([IO.Path]::GetTempPath()) ('h08-review-' + [guid]::NewGuid())
$baseDir = Join-Path $reviewRoot 'base'
$targetDir = Join-Path $reviewRoot 'target'
$baseZip = Join-Path $reviewRoot 'base.zip'
$targetZip = Join-Path $reviewRoot 'target.zip'
$results = @()

function Invoke-ReviewCheck {
	param(
		[string]$Snapshot,
		[string]$Name,
		[string[]]$Arguments
	)
	$output = & node @Arguments 2>&1
	$exitCode = $LASTEXITCODE
	[pscustomobject]@{
		Snapshot = $Snapshot
		Check = $Name
		ExitCode = $exitCode
		Output = ($output -join "`n")
	}
}

try {
	New-Item -ItemType Directory -Path $baseDir, $targetDir -ErrorAction Stop
	git archive --format=zip --output="$baseZip" dd62892af5d7a62d4babf782e6a08566eb60f8e5
	if ($LASTEXITCODE -ne 0) { throw '직접 부모 archive 실패' }
	git archive --format=zip --output="$targetZip" f54f4660784d5cf91f928534d1baebe473c8eb19
	if ($LASTEXITCODE -ne 0) { throw '대상 커밋 archive 실패' }
	Expand-Archive -LiteralPath $baseZip -DestinationPath $baseDir -ErrorAction Stop
	Expand-Archive -LiteralPath $targetZip -DestinationPath $targetDir -ErrorAction Stop

	$snapshots = @(
		[pscustomobject]@{ Name = 'direct-parent'; Path = $baseDir },
		[pscustomobject]@{ Name = 'target'; Path = $targetDir }
	)

	foreach ($snapshot in $snapshots) {
		Push-Location $snapshot.Path
		try {
			$results += Invoke-ReviewCheck $snapshot.Name 'wiki_number' @('scripts/wiki_number.mjs', '--check')
			$results += Invoke-ReviewCheck $snapshot.Name 'wiki_lint' @('scripts/wiki_lint.mjs')
			$results += Invoke-ReviewCheck $snapshot.Name 'quote_check' @('scripts/quote_check.mjs')
			$results += Invoke-ReviewCheck $snapshot.Name 'wiki_lint syntax' @('--check', 'scripts/wiki_lint.mjs')
		}
		finally {
			Pop-Location
		}
	}

	$results | Format-List
}
finally {
	if (Test-Path -LiteralPath $reviewRoot) {
		$resolvedReviewRoot = (Resolve-Path -LiteralPath $reviewRoot -ErrorAction Stop).Path
		$tempRoot = [IO.Path]::GetFullPath([IO.Path]::GetTempPath()).TrimEnd('\')
		if (-not $resolvedReviewRoot.StartsWith($tempRoot + '\', [StringComparison]::OrdinalIgnoreCase)) {
			throw "임시 폴더 밖 대상: $resolvedReviewRoot"
		}
		if ((Split-Path -Leaf $resolvedReviewRoot) -notlike 'h08-review-*') {
			throw "예상 이름이 아닌 대상: $resolvedReviewRoot"
		}
		Remove-Item -LiteralPath $resolvedReviewRoot -Recurse -Force
	}
}
```

대상 커밋에서 다음 작성자 보고값을 독립적으로 재현하라.

- `wiki_number.mjs --check`: 문서 73개, 어긋남 0건
- `wiki_lint.mjs`: 일반 lint 65개 문서, MOC 등록 검사 73개 문서, 오류 0건, 직접 부모에도 존재한 경고 16건
- `quote_check.mjs`: 인용 어긋남 0건, 건너뜀 7건
- `node --check scripts/wiki_lint.mjs`: 오류 0건
- H08 단계 비교 기준 `0a7be70`에서 대상까지 활성 문서의 직접 참조
	- `[[절 참조 오변환 점검 절차]]`: 6건에서 7건
	- `[[CONVENTIONS#3.5 Wikilink 규칙]]`: 6건으로 변동 없음
	- `[[CONVENTIONS#4.3 번호 자동 부여]]`: 3건으로 변동 없음
- 대상 커밋의 변경 파일: 5개
- 대상 `CONVENTIONS.md`에서 인라인 코드를 벗어난 `§`: 0건
- 대상 변경 파일에서 `_locked/RFP.md`, `_locked/컨소시엄 별 역할.md`, `[[RFP]] §3.2`, `[[AGENTS]] §3`, `검수 기록 3종`의 활성 잔류: 0건

직접 참조 수는 다음 명령으로 재현하라. Git이 추적하는 마크다운에서 정확히 같은 문자열을 세므로 같은 줄의 복수 링크도 각각 집계하며, 별칭형이나 다른 anchor는 합치지 않는다.

```powershell
$commits = @('0a7be7049191bfb3a0e54ced0dfd051730e38f78', 'f54f4660784d5cf91f928534d1baebe473c8eb19')
$needles = @(
	'[[절 참조 오변환 점검 절차]]',
	'[[CONVENTIONS#3.5 Wikilink 규칙]]',
	'[[CONVENTIONS#4.3 번호 자동 부여]]'
)

foreach ($commit in $commits) {
	$files = & git -c core.quotepath=false ls-tree -r --name-only $commit
	if ($LASTEXITCODE -ne 0) { throw "파일 목록 읽기 실패: $commit" }
	$files = $files | Where-Object {
		$_ -match '\.md$' -and $_ -notlike '99_Logs/*' -and $_ -notlike '04_Projects/_archive/*'
	}
	foreach ($needle in $needles) {
		$count = 0
		foreach ($file in $files) {
			$content = (& git show "$commit`:$file") -join "`n"
			if ($LASTEXITCODE -ne 0) { throw "파일 읽기 실패: $commit`:$file" }
			$count += [regex]::Matches($content, [regex]::Escape($needle)).Count
		}
		[pscustomobject]@{ Commit = $commit; Link = $needle; Count = $count }
	}
}
```

# 3. 사실과 정합 검토

## 3.1 P1 사실 오류와 출처 불일치

- 커밋 해시, 직접 부모, 비교 기준, 대상 변경 범위와 변경 파일 5개가 실제 Git 객체와 일치하는가
- 이관 규모 621건과 변환 대상 일반 문서 42개가 당시 Git 객체와 로그에 근거하는가
- 수동 처리 대상 113건, `stale 의심` 15건과 수정 anchor 120건이 당시 분류와 일치하는가
- 이름 대조 172건 중 오탐 148건, 표본 후보 50건과 대조한 앞 25건이 H08에 적힌 모집단과 일치하는가
- `stale 의심`과 확정 오변환, 자동 검출 실패와 미판정 범위를 섞어 단정하지 않는가
- 변환기가 이름 겹침을 사용한 방식과 번호 경로를 anchor로 만든 설명이 실제 코드와 일치하는가
- 2026-08-23 흔적 축소를 작성자가 임의로 되돌리거나 삭제 이유를 과장하지 않았는가
- 로그의 링크 수, 자동 검사 결과, 수정 파일과 자기검수 이력이 재현되는가

## 3.2 P5 위키 정합성

- 현행 규칙과 과거 복구 절차의 각 참조가 실제 내용을 소유한 절을 가리키는가
- `CONVENTIONS.md`만 읽어도 현행 의무와 과거 복구 절차를 구별하고 H08에 도달할 수 있는가
- H08만 읽어도 의심 anchor를 판정한 뒤 현행 갱신 절차로 복귀할 수 있는가
- `CONVENTIONS.md`, H08, lint의 `§` 허용 범위가 서로 일치하는가
- RFP 경로와 anchor, 카탈로그의 외부 검수 포커스 anchor가 실제 파일과 해당 내용을 가리키는가
- MOC 요약, 관련 문서 목록과 역할 분리 계획의 H08 소유 경계가 실제 본문과 일치하는가
- 대상 커밋에서 새로 깨지거나 의미가 달라진 anchor, 평문 절 참조와 죽은 경로가 없는가

# 4. 적대적 검토

## 4.1 P2 논리적 비약과 문서 간 모순

- 현행 규칙을 H08에서 줄인 결과 복구 절차에 필요한 전제까지 사라지지 않았는가
- 반대로 H08에 현행 공통 규칙이 다른 조건으로 다시 남아 두 정본이 생기지 않았는가
- `§` 파일 전체 면제를 제거하면서 정당한 역사 인용까지 오류로 막지 않는가
- 인라인 코드 안의 `§`를 모두 허용하는 구현이 활성 사용법이나 stale 참조를 숨기는 우회로가 되지 않는가
- 카탈로그 예외가 과거 사례뿐 아니라 현행 참조의 stale까지 가리는 구조로 남지 않았는가
- 복구 1~4단계의 판정과 5~6단계의 수정 흐름 사이에 승인, 자동 검사나 로그 의무 공백이 없는가
- 이름을 정답으로 삼는 규칙이 이름도 틀렸거나 이름이 없는 사례에 과도하게 적용되지 않는가
- 세 흔적을 유지한 결정이 과거 다섯 흔적의 복구 지식을 부당하게 잃게 하지는 않았는가

## 4.2 P3 누락된 반론과 견고성

- 원문 이름이 없거나 이름과 번호가 모두 틀린 사례를 `검증 가능`처럼 서술하지 않는가
- 표본 검증과 자동 대조 실패를 근거로 미검증분이 안전하다고 결론내리지 않는가
- H08 5절의 `<파일>`이 의심 anchor가 있는 파일 경로를 뜻하는지 명확하며, 표본 명령 `git show 3af09e8:CONVENTIONS.md`와 당시 헤딩 트리 복원이 실행 가능한가
- 원자료 파일이 이동되거나 폐기된 경우의 한계가 충분히 드러나는가
- 일반 갱신 절차로 넘긴 뒤 사용자가 명시한 비기록이나 게이트 예외와 충돌하지 않는가
- lint 예외 축소가 로그, 아카이브와 카탈로그의 이력 보존을 실제로 유지하는가
- 현재 작업 트리와 `dd62892`의 인포그래픽 변경이 H08 수치나 판정에 섞이지 않았는가

## 4.3 반복 결함 우선 점검

`01_HowTo/반복 결함 카탈로그.md` 전체를 읽고 다음 유형의 재발을 우선 확인하되 여기에만 한정하지 마라.

- `STRUCT-001`: 옛 경로, 절 표기와 소유 표현 잔류
- `STRUCT-003`: 현행 규칙, 이관 이력과 복구 예외의 위계 혼합
- `STRUCT-007`, `STRUCT-008`: 긴 절차나 라벨에 이질적인 의무 과적
- `CONTENT-002`: 규칙 이름과 링크만 있고 실제 판정 방법이 없음
- `CONTENT-004`: 수치의 모집단, 단위나 불확실성 누락
- `CONTENT-005`: 성격이 다른 절이나 잘못된 정본에 규칙을 귀속
- `PROCESS-001`: 중심 문서만 바꾸고 로그, lint, 관련 문서와 파생 참조를 갱신하지 않음

# 5. 가독성 검토

## 5.1 P4 문체, 구조와 가독성

맥락 없는 독자의 관점에서 대상 diff의 새 문장과 수정 문장 전체를 읽고 다음을 확인하라.

- 현행 규칙과 과거 이관 복구라는 두 범위를 처음 읽어도 구별할 수 있는가
- `절 참조`, `anchor`, `번호 경로`, `대상 후보`, `이름 겹침`, `stale 의심`과 `오변환`이 일관되게 쓰이는가
- 확정 오류와 조사 후보, 검증된 결과와 남은 위험의 단정 수준이 문장마다 흔들리지 않는가
- 복구 1~6단계가 같은 문법 구조를 이루고 한 단계에 이질적인 행동을 과도하게 넣지 않았는가
- 같은 소유 경계나 현행 규칙을 H08의 앞뒤와 관련 문서에서 불필요하게 반복하지 않는가
- `CONVENTIONS.md` 3.5와 3.6의 불릿이 한 번에 읽히는가
- H08의 TL;DR 및 1절과 7절이 한 번에 읽히는가
- 카탈로그 관련 문서와 lint 주석이 한 번에 읽히는가
- 음슴체, 한 불릿 한 생각, 병렬 접속과 조사 범위가 명확한가
- 로그 항목이 변경 이유, 사실 정정, 링크 변동과 검사 결과를 과장 없이 구분하는가

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

- 판정한 커밋 범위와 변경 파일
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
