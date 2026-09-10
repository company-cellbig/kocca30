---
title: CONVENTIONS와 HowTo 역할 분리 6단계 외부 검수 지시문
type: agentnote
status: draft
tags: [agentnote, 규칙, 정비, 외부검수]
sources: [CONVENTIONS와 HowTo 역할 분리 계획, CONVENTIONS와 HowTo 역할 분리 실행 기준선, 외부 검수 포커스, 반복 결함 카탈로그]
created: 2026-09-10
updated: 2026-09-10
---

> 역할 분리 6단계에서 H01([[docx 변환 파이프라인]])의 HWPX와 DOCX 변환 경계를 정리한 결과를 새 Claude Code 세션에서 검토할 때 전달하는 독립 맥락 검수 패킷임. 변환 산출물 예외와 공통 규칙의 소유 경계, 문서와 구현의 일치, 경로 및 권한, 기존 변환본과 파생 명령의 정합성 및 가독성을 검토하고 파일은 수정하지 않은 채 발견만 보고하도록 지시함.

# 1. 사용 방법

- 새 Claude Code 세션을 열고 이 문서의 `검수 지시문` 절부터 끝까지 전달함
- 작성 대화, 작성 의도와 중간 추론은 전달하지 않음
- 저장소 루트에서 실행하고 Git 객체와 지정된 파일을 직접 대조함
- 검토 보고를 받은 뒤 발견별 수용, 보류 또는 반려 여부는 사용자가 결정함

# 2. 검수 지시문

당신은 이 변경의 외부 검토자다. [[#7. 금지 사항]]을 준수하고 발견만 보고하라.

작성자의 의도나 중간 추론을 추정하지 말고 완성된 변경, Git 객체, 실제 구현과 지정된 규칙을 직접 대조하라. 아래 변경 계약과 작성자 보고값도 정답으로 가정하지 말고 독립적으로 확인하라. `괜찮아 보임`은 승인 근거가 아니다. 결함을 적극적으로 찾되 발견의 수용 여부나 최종 통과 여부는 판정하지 마라.

검토에서 발견이 없으면 해당 절에 수행 범위와 `0건`만 적어라. 무발견을 결함 부재의 증명이나 `검증 완료`로 표현하지 마라.

## 2.1 검토 대상

역할 분리 계획의 6단계 H01 변경 커밋 하나를 검토한다.

- **대상 커밋**: `f71e40b6a5a079146ffdeef9242b920abd091b96`
- **대상 커밋의 직접 부모**: `391374c2ec28e99127cb4d3a4a17c7fbcefeec30`
- **대상 변경 범위**: `391374c2ec28e99127cb4d3a4a17c7fbcefeec30..f71e40b6a5a079146ffdeef9242b920abd091b96`
- **커밋 제목**: `f71e40b refactor: 역할 분리 6단계 H01 정리`

대상 커밋이 바꾼 파일은 다음 7개다.

- `.claude/commands/import-doc.md`
- `00_Index/MOC.md`
- `01_HowTo/docx 변환 파이프라인.md`
- `99_Logs/log.md`
- `CONVENTIONS.md`
- `assets/extract_hwpx.py`
- `scripts/import-doc.mjs`

대상 커밋 뒤의 커밋, 이 검수 패킷과 그에 따른 MOC 및 로그 변경, 현재 작업 트리의 모든 변경은 범위 밖이다. 특히 `05_산출물/`, 이미지 자산과 `90_Temp/`의 현재 변경을 H01 변경이나 근거로 판정하지 마라. 검토 결과와 근거에 현재 작업 트리 상태를 섞지 말고 Git 객체를 읽어라.

다음 읽기 전용 명령으로 범위를 먼저 고정하라.

```powershell
$base = '391374c2ec28e99127cb4d3a4a17c7fbcefeec30'
$target = 'f71e40b6a5a079146ffdeef9242b920abd091b96'

git show --stat --oneline $target
git rev-parse "$target^"
git -c core.quotepath=false diff --name-status $base $target
git -c core.quotepath=false diff $base $target -- '.claude/commands/import-doc.md' '00_Index/MOC.md' '01_HowTo/docx 변환 파이프라인.md' '99_Logs/log.md' 'CONVENTIONS.md' 'assets/extract_hwpx.py' 'scripts/import-doc.mjs'
git log --oneline "$target..HEAD"
git -c core.quotepath=false status --short
```

## 2.2 반드시 읽을 파일과 Git 객체

검색 결과 일부만 보지 말고 다음 범위를 직접 읽어라.

- 직접 부모 `391374c`와 대상 `f71e40b` 사이 변경 파일 7개의 diff 전체
- 대상 `f71e40b:AGENTS.md` 전체
- 대상 `f71e40b:CONVENTIONS.md` 전체
- 대상 `f71e40b:01_HowTo/docx 변환 파이프라인.md` 전체
- 대상 `f71e40b:01_HowTo/위키 운영 워크플로.md` 전체
- 대상 `f71e40b:01_HowTo/반복 결함 카탈로그.md` 전체
- 대상 `f71e40b:01_HowTo/외부 검수 포커스.md`의 2절, 3절과 5절
- 대상 `f71e40b:00_Index/MOC.md`
	- `# 2. 가이드 (01_HowTo)`
	- `## 6.4 위키 규칙 정비 (위키 규칙 정비/)`
- 대상 `f71e40b:99_Logs/log.md`의 `update | 역할 분리 6단계 H01 변환 파이프라인 경계 정리` 항목 전체
- 대상 `f71e40b:07_작업노트/위키 규칙 정비/CONVENTIONS와 HowTo 역할 분리 계획.md`
	- `# 2. 최초 근거 추출표`의 H01-01~H01-05
	- `# 5. 근거 단위와 정리 방향 대응`의 R01, R02, R03과 R07
	- `# 6. CONVENTIONS 정리 방향`
	- `## 7.1 H01 docx 변환 파이프라인`
	- `# 8. 선결 정책 판단`의 변환본 프론트매터와 변환본 문체
	- `# 9. 실행 순서`
	- `# 10. 검증과 완료 기준`
- 대상 `f71e40b:07_작업노트/위키 규칙 정비/CONVENTIONS와 HowTo 역할 분리 실행 기준선.md`
	- `# 3. anchor 참조 기준선`
	- `# 4. 자동 실행 결과 기준선`
	- `# 5. 선결 정책 결정`
- 대상 `f71e40b`의 구현과 파생 명령 전체
	- `.claude/commands/import-doc.md`
	- `scripts/import-doc.mjs`
	- `assets/extract_hwpx.py`
- 대상 `f71e40b`의 자동 검사 스크립트 전체
	- `scripts/wiki_number.mjs`
	- `scripts/wiki_lint.mjs`
	- `scripts/quote_check.mjs`
- 대상 `f71e40b`이 추적하는 `02_References/converted/`의 마크다운 8개에서 frontmatter와 이미지 링크가 있는 본문 구간. 표본 일부만 보고 전체 스키마가 같다고 추정하지 마라
- 대상 `f71e40b`의 `02_References/_reviews/`에는 추적 파일이 없다는 점을 확인하고, 사이드카 스키마와 권한은 현재 표본이 아니라 생성 코드 및 규칙에서 대조하라

## 2.3 변경 계약

대상 변경이 다음 계약을 실제로 만족하는지 확인하라. 이 목록은 검토할 주장이지 정답이 아니다.

1. `CONVENTIONS.md`는 `converted/`, `_sources/`, `_figures/`, `_reviews/`의 저장소 전체 역할과 수정 권한을 소유하고, H01은 변환 작업자가 필요한 실제 입출력 경로와 실행 방법만 남겨야 한다
2. `02_References/converted/` 변환 본문과 `02_References/_reviews/` 사이드카는 일반 문서의 `type`, `status` 필드를 요구하지 않는 명시적 예외여야 한다. 정확한 스키마는 H01과 생성 코드가 소유하고 서로 일치해야 한다
3. 변환 본문의 스키마는 `title`, `tags`, `source`, `converted`, `created`, `updated`를 사용해야 한다. 사이드카는 `title`, `tags`, `source`, `created`, `updated`만 사용해야 하며 `type`, `status`, `converted`를 요구하지 않아야 한다
4. 변환 본문의 원문 영역에서는 의미가 있는 가운뎃점, em dash, 괄호와 특수문자를 보존하되 구조 표지는 파서 정책에 따라 마크다운으로 바꿀 수 있어야 한다. 작성자가 덧붙이는 요약, 변환 한계와 수정 기록에는 일반 문체가 적용되어야 한다
5. MOC 등록, 관련 문서 갱신과 로그 기록의 일반 절차는 H01이나 슬래시 명령이 다른 형식으로 복제하지 않고 `위키 운영 워크플로.md`와 `CONVENTIONS.md`의 실제 소유 절을 가리켜야 한다
6. 파이프라인의 실제 출력은 `_sources/<name>.<ext>`, `converted/<name>.md`, `_figures/<name>/`, `_reviews/<name>.review.md`여야 하며 H01, 슬래시 명령, Node 스크립트와 Python 스크립트의 설명이 같은 경로를 가리켜야 한다
7. 다른 위치의 입력과 같은 이름의 `_sources/` 파일이 있으면 SHA-256이 같을 때만 복사를 건너뛰고, 다르면 덮어쓰지 않고 실패해야 한다. 입력 자체가 이미 목표 `_sources/` 경로인 경우를 포함해 문서 설명과 구현의 경계가 맞아야 한다
8. HWPX 본문 이미지 링크는 `converted/` 루트에서 `_figures/<name>/imageN.<ext>`를 가리키고, DOCX 링크는 Pandoc의 `media/` 하위 경로까지 보존해야 한다. 변환 본문을 `converted/` 하위 폴더로 옮길 때 새 위치 기준으로 링크를 고치고 실제 파일 존재를 확인해야 한다
9. HWPX의 `N-M.`은 H1, `N-M-K.`와 파서가 지원하는 한국어 라벨은 H2로 매핑되어야 한다. 공통 통계와 HWPX 세부 통계, 사이드카 체크리스트 및 문서의 H1/H2 명칭이 실제 코드와 일치해야 한다
10. DOCX는 원본에 헤딩 스타일이 있을 때 Pandoc 결과를 사용하고, 구현에 없는 텍스트 패턴 후처리를 했다고 설명하지 않아야 한다
11. `_reviews/`는 파이프라인만 생성할 수 있고 작성자 에이전트에게는 읽기 전용이어야 한다. 사용자가 사이드카를 확인하고 검수 결과를 기록한 뒤 사이드카를 삭제하며, 손상된 본문은 작성자가 `converted/`에서 고친다는 역할이 `CONVENTIONS.md`, H01과 슬래시 명령에서 충돌하지 않아야 한다
12. `scripts/import-doc.mjs`와 `assets/extract_hwpx.py`의 대상 변경은 경로 및 소유자 설명을 바로잡는 주석과 오류 안내 변경이어야 한다. 변경 계약 밖의 파서 동작 변화가 섞이지 않아야 하며, 바뀐 설명은 주변의 남은 주석과 실행 코드에도 모순되지 않아야 한다
13. 기존 `converted/` 8개의 frontmatter는 새 예외 설명과 모순되지 않아야 한다. 기존 하위 폴더 이동 뒤 이미지 링크가 있다면 실제 `_figures/` 자산을 가리켜야 한다
14. MOC의 H01 요약은 HWPX 직접 파싱, DOCX Pandoc 변환, 변환 자산과 검수 큐라는 현행 범위를 정확히 설명해야 한다
15. H01 관련 헤딩을 바꾸지 않았으므로 기존 anchor 사용처가 불필요하게 이동하거나 깨지지 않아야 한다. 새 링크는 실제 소유 내용을 가리켜야 한다

## 2.4 독립 재현

원 저장소를 수정하지 말고 직접 부모와 대상 커밋을 저장소 밖 임시 디렉터리에 전개해 읽기 전용 검사를 실행하라. 직접 부모 결과는 대상에서 오류, 경고와 검사 문서 수가 새로 달라졌는지 보는 회귀 기준이다. 아래 다섯 검사의 종료 코드와 출력을 `$results`에 모으고 종료 코드가 0이 아니면 검사 실패로 보고하라. 압축이나 전개 단계에서 예외가 나면 해당 단계를 실패로 보고하라. 결과 확인 뒤 검증된 임시 경로만 삭제하라.

```powershell
$reviewRoot = Join-Path ([IO.Path]::GetTempPath()) ('h01-review-' + [guid]::NewGuid().ToString('N'))
$baseDir = Join-Path $reviewRoot 'base'
$targetDir = Join-Path $reviewRoot 'target'
$baseZip = Join-Path $reviewRoot 'base.zip'
$targetZip = Join-Path $reviewRoot 'target.zip'
$results = @()

function Invoke-NodeCheck {
	param(
		[string]$Snapshot,
		[string]$Name,
		[string[]]$Arguments
	)
	$nodeCommand = Get-Command node -CommandType Application -ErrorAction SilentlyContinue
	if (-not $nodeCommand) {
		return [pscustomobject]@{
			Snapshot = $Snapshot
			Check = $Name
			ExitCode = 127
			Output = 'Node.js 실행 파일을 찾을 수 없음. 이 검사는 실행하지 못함.'
		}
	}
	$output = & $nodeCommand.Source @Arguments 2>&1
	$exitCode = $LASTEXITCODE
	[pscustomobject]@{
		Snapshot = $Snapshot
		Check = $Name
		ExitCode = $exitCode
		Output = ($output -join "`n")
	}
}

function Invoke-PythonSyntaxCheck {
	param([string]$Snapshot)
	$pythonCommand = Get-Command python -CommandType Application -ErrorAction SilentlyContinue
	if (-not $pythonCommand) {
		return [pscustomobject]@{
			Snapshot = $Snapshot
			Check = 'extract_hwpx syntax'
			ExitCode = 127
			Output = 'Python 실행 파일을 찾을 수 없음. 이 검사는 실행하지 못함.'
		}
	}
	$output = & $pythonCommand.Source -c "from pathlib import Path; compile(Path(r'assets/extract_hwpx.py').read_text(encoding='utf-8'), r'assets/extract_hwpx.py', 'exec'); print('PYTHON_SYNTAX_OK')" 2>&1
	$exitCode = $LASTEXITCODE
	[pscustomobject]@{
		Snapshot = $Snapshot
		Check = 'extract_hwpx syntax'
		ExitCode = $exitCode
		Output = ($output -join "`n")
	}
}

try {
	New-Item -ItemType Directory -Path $baseDir, $targetDir -ErrorAction Stop | Out-Null
	git -c core.excludesFile=NUL archive --format=zip --output="$baseZip" 391374c2ec28e99127cb4d3a4a17c7fbcefeec30
	if ($LASTEXITCODE -ne 0) { throw '직접 부모 archive 실패' }
	git -c core.excludesFile=NUL archive --format=zip --output="$targetZip" f71e40b6a5a079146ffdeef9242b920abd091b96
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
			$results += Invoke-NodeCheck $snapshot.Name 'wiki_number' @('scripts/wiki_number.mjs', '--check')
			$results += Invoke-NodeCheck $snapshot.Name 'wiki_lint' @('scripts/wiki_lint.mjs')
			$results += Invoke-NodeCheck $snapshot.Name 'quote_check' @('scripts/quote_check.mjs')
			$results += Invoke-NodeCheck $snapshot.Name 'import-doc syntax' @('--check', 'scripts/import-doc.mjs')
			$results += Invoke-PythonSyntaxCheck $snapshot.Name
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
		if ((Split-Path -Leaf $resolvedReviewRoot) -notlike 'h01-review-*') {
			throw "예상 이름이 아닌 대상: $resolvedReviewRoot"
		}
		Remove-Item -LiteralPath $resolvedReviewRoot -Recurse -Force
	}
}
```

대상 커밋에서 다음 작성자 보고값을 독립적으로 재현하라.

- `wiki_number.mjs --check`: 문서 74개, 어긋남 0건
- `wiki_lint.mjs`: 일반 lint 66개 문서, MOC 등록 검사 74개 문서, 오류 0건, 직접 부모에도 같은 종류와 위치로 존재한 경고 16건
- `quote_check.mjs`: 인용 어긋남 0건, 건너뜀 7건
- `node --check scripts/import-doc.mjs`: 종료 코드 0
- `assets/extract_hwpx.py`를 파일 생성 없이 `compile()`한 구문 검사: 종료 코드 0
- 대상 커밋의 변경 파일: 7개
- 로그와 `04_Projects/_archive/`를 제외한 활성 마크다운의 직접 링크
	- `CONVENTIONS`: 93건에서 100건, 고유 문서와 anchor 조합은 20개로 변동 없음
	- `docx 변환 파이프라인`: 19건에서 21건, 고유 문서와 anchor 조합은 9개로 변동 없음
- 대상 `AGENTS.md`: UTF-8, LF와 마지막 줄바꿈 기준 21,265바이트, 32 KiB까지 11,503바이트
- 대상 `02_References/converted/`의 변환 본문: 8개이며 `_reviews/`의 추적 사이드카: 0개

직접 링크 수는 다음 명령으로 재현하라. Git이 추적하는 활성 마크다운의 원문 전체에 문서명, 선택적 anchor와 별칭을 포함하는 정규식을 적용하므로 같은 줄의 복수 링크도 각각 집계한다. 로그와 `04_Projects/_archive/`는 제외하지만 코드 블록은 포함한다.

```powershell
$commits = @('391374c2ec28e99127cb4d3a4a17c7fbcefeec30', 'f71e40b6a5a079146ffdeef9242b920abd091b96')
$documents = @('CONVENTIONS', 'docx 변환 파이프라인')

foreach ($commit in $commits) {
	$files = & git -c core.quotepath=false ls-tree -r --name-only $commit
	if ($LASTEXITCODE -ne 0) { throw "파일 목록 읽기 실패: $commit" }
	$files = $files | Where-Object {
		$_ -match '\.md$' -and $_ -notlike '99_Logs/*' -and $_ -notlike '04_Projects/_archive/*'
	}
	foreach ($document in $documents) {
		$pattern = '\[\[(?<target>' + [regex]::Escape($document) + '(?:#[^\]|]+)?)(?:\|[^\]]+)?\]\]'
		$count = 0
		$targets = [Collections.Generic.HashSet[string]]::new()
		foreach ($file in $files) {
			$content = (& git -c core.excludesFile=NUL show "$commit`:$file") -join "`n"
			if ($LASTEXITCODE -ne 0) { throw "파일 읽기 실패: $commit`:$file" }
			foreach ($match in [regex]::Matches($content, $pattern)) {
				$count++
				[void]$targets.Add($match.Groups['target'].Value)
			}
		}
		[pscustomobject]@{
			Commit = $commit
			Document = $document
			ActiveLinks = $count
			UniqueDocumentAnchorPairs = $targets.Count
		}
	}
}
```

`AGENTS.md` 크기는 `git show`의 줄 배열을 다시 합칠 때 PowerShell이 제거한 마지막 줄바꿈을 복원해 UTF-8 BOM 없이 계산하라. 로컬 `project_doc_max_bytes` 설정의 존재 여부는 Git 객체만으로 확인할 수 없다. 현재 검토 환경에서 설정을 읽지 않았다면 그 부분을 검증하지 못한 범위로 남기고, 32 KiB 기본값을 근거로 사용할 때는 [OpenAI 공식 AGENTS.md 안내](https://learn.chatgpt.com/docs/agent-configuration/agents-md)를 직접 확인하라.

# 3. 사실과 정합 검토

## 3.1 P1 사실 오류와 출처 불일치

- 커밋 해시, 직접 부모, 대상 변경 범위와 변경 파일 7개가 실제 Git 객체와 일치하는가
- 변환 본문과 사이드카의 frontmatter 필드 설명이 Node 생성 코드 및 기존 변환 본문 8개와 일치하는가
- HWPX의 H1/H2 패턴, 한국어 라벨, 구조 기반 승격과 통계 설명이 Python 구현 및 Node 집계와 일치하는가
- DOCX의 헤딩, 표, 미디어 추출과 상대경로 설명이 실제 Pandoc 인자 및 Node 후처리와 일치하는가
- `_sources/` 충돌 시 SHA-256 비교와 거부 조건이 실제 분기와 일치하는가. 같은 입력 경로, 같은 내용과 다른 내용의 세 경우를 구별하는가
- HWPX와 DOCX 이미지 경로 및 하위 폴더 이동 뒤 경로 보정 설명이 구현의 실제 출력 구조와 일치하는가
- 사이드카 생성 위치, 이름, 체크리스트와 삭제 주체가 코드 및 규칙과 일치하는가
- 코드 변경이 주석과 오류 안내에 한정되고 파서의 실행 동작은 바꾸지 않았다는 범위 설명이 diff와 일치하는가
- MOC 요약, 링크 수, 자동 검사 결과, 파일 수와 `AGENTS.md` 바이트 수가 독립 재현되는가
- 로그에 적힌 독립 검토 횟수와 발견 수는 Git 객체만으로 증명할 수 있는 사실과 그렇지 않은 작성 과정 기록을 구별해 서술하는가

## 3.2 P5 위키 정합성

- 공통 디렉터리 역할과 권한, 변환 예외 스키마, 작업별 실행 절차의 각 참조가 실제 내용을 소유한 절을 가리키는가
- `CONVENTIONS.md`만 읽어도 일반 문서와 변환 산출물 예외를 구별하고 정확한 H01 절로 이동할 수 있는가
- H01만 읽어도 실제 변환, 이동, 검수와 위키 통합 절차를 수행할 수 있으며 공통 규칙을 다른 조건으로 재정의하지 않는가
- 슬래시 명령이 H01, `CONVENTIONS.md`, `위키 운영 워크플로.md`의 실제 anchor를 가리키며 옛 `§` 표기나 죽은 경로가 남지 않았는가
- H01 내부 링크가 실제 헤딩을 가리키는가. 문서와 코드 전반에 옛 H2/H3 명칭, 옛 디렉터리 번호, 옛 사이드카 이름과 옛 소유자 표현이 남지 않았는가
- 기존 변환 본문 8개의 frontmatter와 이미지 링크가 새 예외 규칙 및 현재 폴더 구조와 일치하는가
- MOC의 H01 요약과 역할 분리 계획의 H01 소유 경계가 실제 본문과 일치하는가
- 대상 커밋에서 새로 깨지거나 의미가 달라진 anchor, wikilink, 이미지 경로와 파생 텍스트가 없는가

# 4. 적대적 검토

## 4.1 P2 논리적 비약과 문서 간 모순

- H01에서 공통 폴더 및 MOC와 로그 설명을 줄인 결과 작업자가 실제로 실행할 조건이나 순서까지 사라지지 않았는가
- 반대로 H01과 슬래시 명령에 공통 규칙이 다른 조건으로 다시 남아 복수 정본이 되지 않았는가
- `converted/`와 `_reviews/`를 같은 frontmatter 예외로 묶으면서 두 산출물의 수명, 권한과 필드 차이가 흐려지지 않았는가
- `_reviews/`는 파이프라인만 생성 가능하고 에이전트에게 읽기 전용이라는 규칙과, 슬래시 명령을 실행하는 에이전트가 변환 파이프라인을 호출하는 행위 사이의 권한 경계가 모순되지 않는가
- 원문 부호 보존과 구조 표지 변환의 경계가 파서가 임의로 의미 문자를 버리는 근거로 넓게 해석되지 않는가
- `converted/` 하위 폴더 이동을 사람이 맡기면서 이미지 링크 정정, 파일 존재 확인, 자동 검사와 사용자 승인 중 필요한 절차가 누락되지 않았는가
- `_sources/`에 같은 이름의 다른 파일이 있을 때 제시하는 해결 방법이 수정 금지 영역 규칙과 충돌하거나 원본 삭제를 쉽게 유도하지 않는가
- 문서가 HWPX의 특정 RFP 번호 패턴을 일반 HWPX 전체에 적용 가능한 표준처럼 과장하지 않는가
- 구문 검사와 정적 문서 대조만으로 실제 변환 동작이 검증됐다고 과장하지 않는가

## 4.2 P3 누락된 반론과 견고성

- 기존 변환 본문이나 `_figures/`가 이미 있을 때 재실행이 무엇을 덮어쓰는지, 그 동작과 권한이 충분히 드러나는가
- 입력이 이미 `_sources/`에 있을 때 원본 동일성 검사를 건너뛰는 구현을 문서가 잘못 일반화하지 않는가
- DOCX의 Pandoc `--extract-media`가 실제로 만드는 `media/` 깊이와 링크 치환이 운영체제별 경로에서 성립하는가
- 본문을 하위 폴더로 옮긴 뒤 이미지가 없는 문서와 여러 깊이의 폴더를 어떻게 점검할지 실행 가능한가
- `_reviews/`의 추적 표본이 없는데도 사이드카 스키마와 운영이 실증됐다고 과장하지 않는가
- 기존 변환본 8개가 모두 HWPX 파이프라인 생성물인지, 수동 전사본이 섞였다면 새 스키마와의 일치를 구현 검증으로 오해하지 않는가
- Python, Node 또는 Pandoc이 없거나 버전 차이가 있을 때 독립 재현에서 검증하지 못한 범위를 명시하는가
- 원문 영역과 작성자 추가 영역을 기계적으로 구별할 표지가 없는데도 문체 예외가 자동 판정 가능한 규칙처럼 쓰이지 않는가
- 대상 커밋 뒤 변경과 현재 작업 트리의 사용자 변경이 H01 수치, 경로와 판정에 섞이지 않았는가

## 4.3 반복 결함 우선 점검

`01_HowTo/반복 결함 카탈로그.md` 전체를 읽고 다음 유형의 재발을 우선 확인하되 여기에만 한정하지 마라.

- `STRUCT-001`: 옛 경로, 역할 소유자와 헤딩 등 stale 표현 잔류
- `STRUCT-007`: 제목과 본문 묶음을 헤딩이 아닌 볼드 라벨로 둠
- `STRUCT-008`: 한 불릿이나 복수 주제 제목 아래에 여러 항목을 평면으로 욱여넣음
- `CONTENT-002`: 한 줄 라벨만 있고 역할, 입력과 출력 또는 용도가 없음
- `CONTENT-004`: 역할과 목적이 비대해지거나 소유 밖 내용을 재서술하고 사족을 붙임
- `CONTENT-005`: 폴더 권한, 스키마나 실행 규칙을 잘못된 정본에 귀속
- `PROCESS-001`: 중심 문서만 바꾸고 파생 명령, 구현 주석, MOC, 로그와 관련 참조를 갱신하지 않음
- 일반 수치 점검: 링크 수, 파일 수와 검사 결과에 모집단과 단위가 빠지지 않았는지 확인함

# 5. 가독성 검토

## 5.1 P4 문체, 구조와 가독성

맥락 없는 독자의 관점에서 대상 diff의 새 문장과 수정 문장 전체를 읽고 다음을 확인하라.

- 공통 폴더 및 권한 규칙과 HWPX 및 DOCX 전용 절차를 처음 읽어도 구별할 수 있는가
- `변환 본문`, `원문 영역`, `사이드카`, `검수 큐`, `원본`, `정본`, `추출 이미지`가 일관된 뜻으로 쓰이는가
- H1/H2, `N-M.`, `N-M-K.`, 한국어 라벨과 구조 기반 승격 설명이 서로 섞이지 않고 읽히는가
- HWPX와 DOCX의 이미지 경로 차이 및 하위 폴더 이동 뒤 조치가 한 번에 이해되는가
- 원본 충돌 시 같은 내용, 다른 내용과 이미 `_sources/`에 있는 입력의 조건이 모호하지 않은가
- 사용자, 작성자 에이전트와 변환 파이프라인의 검수 큐 권한이 주체별로 명확한가
- 같은 소유 경계와 후속 절차를 H01, 슬래시 명령, `CONVENTIONS.md`와 MOC에서 불필요하게 되풀이하지 않는가
- H01의 TL;DR, 1절, 2절, 5절, 6.2절, 6.5절, 6.7절, 7절, 9절, 11절과 12절이 한 번에 읽히는가
- 슬래시 명령의 실행 및 주의 문구와 두 구현 파일의 바뀐 주석 및 오류 메시지가 한 번에 읽히는가
- 음슴체, 한 불릿 한 생각, 병렬 접속, 조사 범위와 영문 용어 사용이 일관되는가
- 로그 항목이 소유 경계 정리, 사실 정정, 링크 변동, 독립 검토와 자동 검사 결과를 과장 없이 구분하는가

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
