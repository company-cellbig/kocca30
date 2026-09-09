---
title: CONVENTIONS와 HowTo 역할 분리 4단계 외부 검수 지시문
type: agentnote
status: draft
tags: [agentnote, 규칙, 정비, 외부검수]
sources: [CONVENTIONS와 HowTo 역할 분리 계획, CONVENTIONS와 HowTo 역할 분리 실행 기준선, 외부 검수 포커스, 반복 결함 카탈로그]
created: 2026-09-09
updated: 2026-09-09
---

> 역할 분리 4단계의 H06 위키 운영 절차 이동을 새 Claude Code 세션에서 검토할 때 전달하는 독립 맥락 검수 패킷임. 생성과 갱신 절차의 의미 보존, 정본 소유 경계, 링크 집계, 파생 텍스트와 가독성을 검토하고 파일은 수정하지 않은 채 발견만 보고하도록 지시함.

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

역할 분리 계획의 4단계 H06 변경을 검토한다.

- **단계 비교 기준 커밋**: `1bc1090ea7aaf728f7e1d8e8b0ae2f65aeeb25aa`
- **대상 커밋**: `454c741f729d795d81a3bbe77591412ae81ce0f2`
- **대상 커밋의 직접 부모**: `37a63ad9306f821d0f36388fa67783037da3c3ce`
- **검토 범위**: `1bc1090ea7aaf728f7e1d8e8b0ae2f65aeeb25aa..454c741f729d795d81a3bbe77591412ae81ce0f2`
- **범위 안 커밋**
	- `37a63ad refactor: 역할 분리 4단계 H06 정리`
	- `454c741 fix: H06 파생 텍스트 안내 갱신`

변경 파일은 다음 7개다.

- `AGENTS.md`
- `CONVENTIONS.md`
- `01_HowTo/위키 운영 워크플로.md`
- `00_Index/MOC.md`
- `07_작업노트/위키 규칙 정비/CONVENTIONS와 HowTo 역할 분리 계획.md`
- `99_Logs/log.md`
- `scripts/diff_companion.mjs`

대상 커밋 뒤의 커밋과 현재 작업 트리 변경은 모두 검토 범위 밖이다. 검수 패킷 자체와 그에 따른 MOC 및 로그 변경도 대상 커밋 뒤의 이력이므로 본문 판정에는 반드시 Git 객체나 아래 스냅샷의 대상 판본만 사용하라. 특히 아래 초안 1개와 이미지 2개는 수정하지 마라.

- `05_산출물/시범콘텐츠/06_덜미 - 나만의 꼭두각시/덜미 - 나만의 꼭두각시 초안.md`
- `assets/시범콘텐츠/탈놀음/2026-09-07_덧뵈기_피격_옴탈_투명_v1.png`
- `assets/시범콘텐츠/탈놀음/옴탈_조우.png`

다음 읽기 전용 명령으로 판정 범위를 먼저 고정하라.

```powershell
git show --stat --oneline 454c741f729d795d81a3bbe77591412ae81ce0f2
git log --oneline 1bc1090ea7aaf728f7e1d8e8b0ae2f65aeeb25aa..454c741f729d795d81a3bbe77591412ae81ce0f2
git -c core.quotepath=false diff --name-status 1bc1090ea7aaf728f7e1d8e8b0ae2f65aeeb25aa 454c741f729d795d81a3bbe77591412ae81ce0f2
git -c core.quotepath=false diff 1bc1090ea7aaf728f7e1d8e8b0ae2f65aeeb25aa 454c741f729d795d81a3bbe77591412ae81ce0f2 -- AGENTS.md CONVENTIONS.md '01_HowTo/위키 운영 워크플로.md' '00_Index/MOC.md' '07_작업노트/위키 규칙 정비/CONVENTIONS와 HowTo 역할 분리 계획.md' '99_Logs/log.md' scripts/diff_companion.mjs
git -c core.quotepath=false status --short
```

현재 작업 트리와 대상 커밋 이후 변경은 판정 대상에 섞지 마라. `git status`에 나타나는 모든 항목은 범위 밖이며, 다음 명령으로 대상 뒤의 커밋도 구분하라.

```powershell
git log --oneline 454c741f729d795d81a3bbe77591412ae81ce0f2..HEAD
```

## 2.2 반드시 읽을 파일

검색 결과 일부만 보지 말고 다음 범위를 직접 읽어라.

- 비교 기준과 대상 커밋의 `AGENTS.md` 전체
- 비교 기준과 대상 커밋의 `CONVENTIONS.md` 전체
- 비교 기준과 대상 커밋의 `01_HowTo/위키 운영 워크플로.md` 전체
- 비교 기준과 대상 커밋의 `scripts/diff_companion.mjs` 전체
- 대상 커밋의 `00_Index/MOC.md` 중 가이드 및 규칙 문서 목록
- 대상 커밋의 `99_Logs/log.md` 최상단 `update | 역할 분리 4단계 H06 위키 운영 절차 정리` 항목 전체
- `07_작업노트/위키 규칙 정비/CONVENTIONS와 HowTo 역할 분리 계획.md`의 5절 R07, 6절, 7.6절, 9절과 10절
- `07_작업노트/위키 규칙 정비/CONVENTIONS와 HowTo 역할 분리 실행 기준선.md`의 3절 anchor 기준선, 4절 자동 실행 결과 기준선과 5절 선결 정책 결정
- `01_HowTo/문서 작성 세부 규칙.md` 전체
- `01_HowTo/반복 결함 카탈로그.md` 전체
- `01_HowTo/외부 검수 포커스.md`의 사실과 정합, 적대, 가독성 기준
- `scripts/wiki_number.mjs`
- `scripts/wiki_lint.mjs`
- `scripts/quote_check.mjs`

## 2.3 변경 계약

대상 변경이 다음 계약을 실제로 만족하는지 확인하라. 이 목록을 정답으로 가정하지 말고 Git 객체와 문장을 직접 대조하라.

1. 비교 기준 `CONVENTIONS.md` 5.1의 문서 생성 6개 항목과 5.2의 문서 갱신 6개 항목이 대상에서 누락되지 않아야 한다
2. 실행 순서는 대상 `위키 운영 워크플로.md` 5.1과 5.2가 소유해야 한다
3. 대상 `CONVENTIONS.md` 5절에는 실행 순서가 아니라 완성된 새 문서와 갱신 문서의 정적 완료 조건만 남아야 한다
4. 실행 절차, 완성 문서의 형식과 정적 완료 조건, 자동 검사, 사용자 게이트, 로그 기록 의무와 로그 형식의 소유처가 다음과 같이 구분돼야 한다
	- **실행 절차**: `위키 운영 워크플로.md`
	- **완성 문서의 형식과 정적 완료 조건**: `CONVENTIONS.md`
	- **자동 검사와 작성자 절차**: `AGENTS.md` 2.2.1
	- **G1과 G2 게이트**: `AGENTS.md` 2.4
	- **기록 대상과 기록 의무**: `AGENTS.md` 2.5
	- **로그 항목 형식**: `CONVENTIONS.md` 7절
5. `AGENTS.md` 선택표는 일반 위키 문서 생성과 갱신에도 `위키 운영 워크플로.md`를 읽게 해야 한다
6. `AGENTS.md`의 `diff_companion.mjs` 비차단 알림 확인 안내는 실제 갱신 절차의 해당 단계를 가리켜야 한다
7. 수집, 질의, 유지와 Overview의 기존 의미가 일반 생성과 갱신 절차를 추가하는 과정에서 달라지지 않아야 한다
8. MOC 요약과 역할 분리 계획의 선택표 및 H01과 H06 대응 문장이 새 소유 경계와 맞아야 한다
9. `scripts/diff_companion.mjs`의 주석과 사용자 출력이 모두 현행 `위키 운영 워크플로` 5.2의 5번을 가리켜야 한다
10. 옛 anchor는 활성 문서에서 제거돼야 하며, 로그에 남은 옛 anchor는 당시 판본을 설명하는 역사적 이력인지 구별해야 한다
11. 현재 작업 트리의 범위 밖 파일은 대상 변경이나 검사 결과에 섞이지 않아야 한다

## 2.4 독립 재현

원 저장소를 수정하지 말고 두 커밋을 저장소 밖 임시 디렉터리에 전개해 읽기 전용 검사를 실행하라. 전체 저장소 스냅샷 두 개를 압축하고 푸는 작업이므로 수 GB의 임시 공간과 충분한 실행 시간을 확보하고, 결과 확인 뒤 검증된 임시 경로만 삭제하라.

```powershell
$reviewRoot = Join-Path ([IO.Path]::GetTempPath()) ('h06-review-' + [guid]::NewGuid())
$baseDir = Join-Path $reviewRoot 'base'
$targetDir = Join-Path $reviewRoot 'target'
$baseZip = Join-Path $reviewRoot 'base.zip'
$targetZip = Join-Path $reviewRoot 'target.zip'

try {
	New-Item -ItemType Directory -Path $baseDir, $targetDir -ErrorAction Stop

	git archive --format=zip --output="$baseZip" 1bc1090ea7aaf728f7e1d8e8b0ae2f65aeeb25aa
	if ($LASTEXITCODE -ne 0) { throw '기준 커밋 archive 실패' }

	git archive --format=zip --output="$targetZip" 454c741f729d795d81a3bbe77591412ae81ce0f2
	if ($LASTEXITCODE -ne 0) { throw '대상 커밋 archive 실패' }

	Expand-Archive -LiteralPath $baseZip -DestinationPath $baseDir -ErrorAction Stop
	Expand-Archive -LiteralPath $targetZip -DestinationPath $targetDir -ErrorAction Stop

	$results = @()

	foreach ($snapshot in @($baseDir, $targetDir)) {
		Push-Location $snapshot
		try {
			$numberOutput = & node scripts/wiki_number.mjs --check 2>&1
			$numberExit = $LASTEXITCODE
			$lintOutput = & node scripts/wiki_lint.mjs 2>&1
			$lintExit = $LASTEXITCODE
			$quoteOutput = & node scripts/quote_check.mjs 2>&1
			$quoteExit = $LASTEXITCODE
			$companionSyntax = & node --check scripts/diff_companion.mjs 2>&1
			$companionExit = $LASTEXITCODE
			$results += [pscustomobject]@{ Snapshot = $snapshot; Check = 'wiki_number'; ExitCode = $numberExit; Output = ($numberOutput -join "`n") }
			$results += [pscustomobject]@{ Snapshot = $snapshot; Check = 'wiki_lint'; ExitCode = $lintExit; Output = ($lintOutput -join "`n") }
			$results += [pscustomobject]@{ Snapshot = $snapshot; Check = 'quote_check'; ExitCode = $quoteExit; Output = ($quoteOutput -join "`n") }
			$results += [pscustomobject]@{ Snapshot = $snapshot; Check = 'diff_companion syntax'; ExitCode = $companionExit; Output = ($companionSyntax -join "`n") }
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
		if ((Split-Path -Leaf $resolvedReviewRoot) -notlike 'h06-review-*') {
			throw "예상 이름이 아닌 대상: $resolvedReviewRoot"
		}
		Remove-Item -LiteralPath $resolvedReviewRoot -Recurse -Force
	}
}
```

대상 로그가 주장하는 다음 값을 독립적으로 재현하라.

아래 화살표의 왼쪽은 단계 비교 기준 커밋, 오른쪽은 대상 커밋의 값이다.

- **대상 문서 11개의 전체 wikilink 수 합계**: `460→474`
- **고유 링크 대상 합계**: `97→99`
- **로그와 아카이브를 제외한 링크 수**: `299→313`
- **로그와 아카이브를 제외한 고유 링크 대상**: `77→79`
- **자기 문서 절 링크**: `45→51`
	- `CONVENTIONS.md`: `23→29`
	- 나머지 집계 문서: 변동 없음
- **활성 문서에 남은 옛 anchor**: 0건
- **대상 `AGENTS.md`**: 21,128바이트
- **기본 32KiB 한도까지 잔여량**: 11,640바이트
- **대상 자동 검사**
	- `wiki_number.mjs --check`: 문서 72개, 어긋남 0건
	- `wiki_lint.mjs`: 문서 64개, 오류 0건, 경고 16건
	- `quote_check.mjs`: 인용 어긋남 0건, 건너뜀 7건
	- `node --check scripts/diff_companion.mjs`: 오류 0건

링크 집계에서는 다음을 지켜라.

- Git이 추적하는 마크다운 전체를 대상으로 함
- `[[문서명]]`, `[[문서명#anchor]]`와 별칭형 링크를 포함함
- 같은 줄에 링크가 여러 개면 각각 셈
- 표에서 이스케이프된 `\|`는 별칭 구분자 `|`로 정규화함
- `로그와 아카이브 제외 후` 집계는 링크가 출현한 파일이 `99_Logs/` 또는 `04_Projects/_archive/` 아래이면 제외함
- 고유 링크 대상은 별칭을 제거한 `문서명#anchor` 조합으로 셈

검토 대상 11개 문서는 다음과 같다.

- `AGENTS`
- `CONVENTIONS`
- `docx 변환 파이프라인`
- `PDF 읽기 절차`
- `문서 작성 세부 규칙`
- `반복 결함 카탈로그`
- `외부 검수 포커스`
- `위키 운영 워크플로`
- `인포그래픽 생성 지침`
- `절 참조 오변환 점검 절차`
- `클라이언트 데이터 번역 규칙`

`project_doc_max_bytes`의 기본값을 검증할 수 있다면 OpenAI 공식 AGENTS.md 문서만 외부 근거로 사용하라. 네트워크 접근이 불가능하면 해당 외부 사실만 `검증 불가`로 구분하고 나머지 로컬 값은 계속 검토하라.

# 3. 사실과 정합 검토

## 3.1 P1 사실 오류와 출처 불일치

- 커밋 해시, 직접 부모, 단계 비교 기준과 변경 파일 7개가 실제 Git 객체와 일치하는가
- 로그의 단계 수, 검토 횟수, 문서 수, 링크 수, 경고 수와 바이트 수가 재현값과 일치하는가
- 비교 기준의 생성 6개 항목과 갱신 6개 항목이 대상 절차 및 완료 조건에 대응하는가
- MOC와 계획 문서의 요약이 대상 변경을 과장하거나 누락하지 않는가
- `diff_companion.mjs`의 주석, 출력과 로그가 실제 절 번호 및 단계 번호와 일치하는가

## 3.2 P5 위키 정합성

- 각 참조가 제목만 맞는 곳이 아니라 실제 규칙을 소유한 절을 가리키는가
- 실행 절차와 정적 완료 조건이 서로 상세를 미루기만 하는 빈 순환 참조가 아닌가
- `AGENTS.md`만 읽은 작성자가 작업 조건에 맞는 필수 문서를 선택할 수 있는가
- `CONVENTIONS.md`만 읽은 작성자가 생성과 갱신 실행 절차의 정본에 도달할 수 있는가
- `위키 운영 워크플로.md`만 읽은 작성자가 형식, 자동 검사, 게이트, 기록 의무와 로그 형식의 정본에 도달할 수 있는가
- 바뀐 anchor와 새 anchor의 모든 활성 사용처가 의미상 올바른 절을 가리키는가
- MOC 요약, 관련 문서 목록, 계획의 소유 경계와 실제 본문이 일치하는가

# 4. 적대적 검토

## 4.1 P2 논리적 비약과 문서 간 모순

- 실행 절차를 옮기면서 기존 의무가 빠지거나 새 의무가 근거 없이 추가되지 않았는가
- 동일한 의무를 `AGENTS.md`, `CONVENTIONS.md`와 워크플로가 서로 다른 조건으로 규정하지 않는가
- 일반 생성과 갱신 절차가 수집, 질의, 유지에만 적용되는 것처럼 좁아지지 않았는가
- 문서 생성 및 갱신 절차에 로그 기록을 넣은 방식이 `AGENTS.md`의 기록 대상, 자동 검사와 게이트 순서에 충돌하지 않는가
- MOC 등록과 양방향 연결 조건이 적용 대상 예외를 삼켜 모든 파일에 무조건 적용되는 것으로 넓어지지 않았는가
- `updated` 날짜 조건이 frontmatter만 고친 변경이나 본문이 아닌 파일 변경과 모순되지 않는가
- 자동 넘버링 실행 시점과 작성 사이클 마지막 자동 검사가 중복되거나 서로 다른 완료 상태를 만들지 않는가
- 라우터 선택표를 일반 생성 및 갱신까지 확장하면서 불필요한 문서 로딩이나 순환 지시가 생기지 않았는가
- 로그가 4단계를 완료했다고 과장하거나 아직 외부 검토 전이라는 상태를 숨기지 않는가

## 4.2 P3 누락된 반론과 견고성

- 새 문서가 MOC 등록이나 상호 연결을 요구하지 않는 예외가 필요한데 빠지지 않았는가
- 갱신 중 헤딩을 바꾸지 않은 경우와 헤딩을 바꾼 경우가 모두 실행 가능하게 설명되는가
- 새 연결이 없거나 관련 문서가 없는 경우에도 절차가 모순 없이 끝나는가
- `wiki_number.mjs`가 처리하지 않는 파일이나 `05_산출물/` 예외가 일반 위키 절차에 잘못 포함되지 않았는가
- 로그 형식과 기록 의무를 분리한 결과 어느 문서도 실제 기록 시점을 안내하지 않는 공백이 생기지 않았는가
- 옛 anchor가 마크다운 밖의 스크립트, 훅 메시지, 주석이나 다른 파생 텍스트에 남지 않았는가
- 기준 커밋과 대상 커밋을 전개하는 과정에서 현재 작업 트리 변경을 잘못 읽을 여지가 없는가

## 4.3 반복 결함 우선 점검

`01_HowTo/반복 결함 카탈로그.md` 전체를 읽고 다음 유형의 재발을 우선 확인하되 여기에만 한정하지 마라.

- `STRUCT-001`: 옛 anchor와 소유 표현 잔류
- `STRUCT-003`: 원칙, 절차와 예외의 위계 혼합
- `STRUCT-007`, `STRUCT-008`: 긴 단계나 라벨에 이질적인 규칙 과적
- `STRUCT-009`: 정보 성격과 맞지 않는 목록 또는 표
- `CONTENT-002`: 규칙 이름과 링크만 있고 판정 방법이 없음
- `CONTENT-005`: 성격이 다른 절이나 잘못된 정본에 규칙을 귀속
- `PROCESS-001`: 중심 문서만 바꾸고 MOC, 로그, 스크립트와 anchor를 갱신하지 않음

# 5. 가독성 검토

## 5.1 P4 문체, 구조와 가독성

맥락 없는 독자의 관점에서 대상 diff의 새 문장과 수정 문장 전체를 읽고 다음을 확인하라.

- 정의되지 않은 용어, 지시어와 적용 범위가 있는가
- 같은 뜻을 반복하거나 소유 관계를 여러 표현으로 흔드는가
- 음슴체를 지키지 않거나 불필요한 슬래시, 가운뎃점 또는 em dash를 사용했는가
- 한 단계에 서로 다른 행동, 조건과 예외를 과도하게 넣었는가
- 생성 7단계와 갱신 6단계가 각각 같은 문법 구조를 이루는가
- `새 문서`, `갱신 문서`, `실행 절차`, `완료 조건`, `작성자 절차`와 `게이트 규칙`을 처음 읽는 사람이 구별할 수 있는가
- 헤딩, TL;DR, MOC 요약과 관련 문서 설명만 훑어도 소유 경계를 복원할 수 있는가
- 표의 행과 로그 불릿이 지나치게 길거나 한 항목에 여러 생각을 섞지 않았는가
- 한국어 병렬 접속과 조사 범위가 명확한가

# 6. 출력 형식

발견을 `사실과 정합`, `적대`, `가독성` 세 절로 나눠라. ID는 세 절 전체에서 `F-01`, `F-02`처럼 연속해서 부여하라.

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

- 내부 파일, Git 객체와 문장 자체만 근거이면 `해당 없음`으로 적음
- 외부 근거가 약하면 근거 앞에 `[근거 약함]`을 붙임
- 같은 원인의 반복은 하나의 대표 발견 아래 모든 위치를 나열함
- 발견이 없는 검토 절에는 수행 범위와 `0건`만 적음

마지막 요약에는 다음만 적어라.

- 판정한 커밋 범위와 변경 파일
- 직접 읽은 파일
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
