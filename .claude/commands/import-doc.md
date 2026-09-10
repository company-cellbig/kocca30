---
description: HWPX/DOCX 파일을 변환하여 LLM Wiki에 통합
argument-hint: '<path-to-hwpx-or-docx>'
allowed-tools: Bash, Read, Edit, Glob
---

HWPX 또는 DOCX 파일을 LLM Wiki 표준 위치로 변환·통합한다. 이 명령을 실행하는 에이전트는 사용자의 명시적 호출 범위에서 작성자 역할을 맡아 MOC 등록과 로그 기록까지 수행한다. **HWPX 직접 변환을 권장**: 한컴오피스 export 단계가 필요 없고 헤딩 구조가 손실 없이 보존된다.

Raw 인자: `$ARGUMENTS`

## 실행 절차

1. **인자 검증**
   - `$ARGUMENTS`가 비어 있으면 사용자에게 HWPX/DOCX 경로를 요청
   - 경로에 공백·한글이 있으면 따옴표로 감쌌는지 확인
   - 확장자가 `.hwpx` 또는 `.docx`가 아니면 거절

2. **변환 스크립트 실행**

   ```bash
   node "scripts/import-doc.mjs" "$ARGUMENTS"
   ```

   스크립트는 stdout에 JSON으로 결과를 출력한다:
   ```json
   {
     "ok": true,
     "backend": "python (extract_hwpx.py)" | "pandoc (...)",
     "source": "02_References/_sources/<name>.<ext>",
     "converted": "02_References/converted/<name>.md",
     "figuresDir": "02_References/_figures/<name>",
     "sidecar": "02_References/_reviews/<name>.review.md",
     "stats": { "h1": N, "h2": N, "tableMd": N, "tableGrid": N, "tableHtml": N, "figures": N },
     "backendStats": { ... } | null,
     "warnings": "..." | null
   }
   ```

3. **결과 파싱 및 후속 작업**

   - JSON을 파싱하여 사용자에게 다음을 안내:
     - 변환된 본문 파일 경로 + 백엔드 (Python/Pandoc)
     - 검수 큐 사이드카 경로
     - 헤딩/표/이미지 통계
     - 경고가 있다면 그대로 표시
   - 변환본이 무형유산 종목 소재 전사본이면 `converted/` 루트에서 종류별 하위 폴더(예: `converted/남사당놀이/`)로 옮김. 파이프라인은 항상 루트로 출력하므로 사람이 수동 이동함. [[CONVENTIONS]]의 "converted 하위 폴더 분리"를 따름. wikilink는 파일명 해석이라 이동해도 안 깨지지만, 본문 이미지의 상대경로는 새 위치에 맞게 고치고 대상 파일이 있는지 확인함
   - [[위키 운영 워크플로]]의 "수집 (Ingest): 소스 1개의 연쇄 갱신"과 "공통 문서 생성과 갱신 절차"에 따라 MOC 등록, 관련 문서 갱신과 로그 기록을 수행

4. **사용자 안내 메시지**
   - 변환 성공 시: 백엔드, 본문/사이드카 경로, 통계 요약, 다음 행동 제안("사이드카의 체크리스트를 확인 후 표/이미지 검수")
   - 변환 실패 시: 스크립트 stderr 그대로 표시 + Python/Pandoc 설치 안내

## 주의

- 스크립트는 원본 파일을 `02_References/_sources/`로 **복사함**. 사용자의 원래 파일은 그대로 유지됨
- 같은 이름의 파일이 `_sources/`에 이미 있으면 SHA-256을 비교함. 내용이 같으면 복사를 건너뛰고, 다르면 기존 원본을 덮어쓰지 않고 실패함
- 재실행하면 변환 본문과 사이드카를 새 결과로 덮어쓰며, 추출 이미지도 같은 이름의 기존 파일을 덮어씀. `_sources/` 원본만 SHA-256으로 보호됨. 본문을 하위 폴더로 옮긴 뒤 재실행하면 `converted/` 루트에 새 본문이 생김
- 사이드카는 사람 검수용. 손상된 항목은 변환 본문에서 고치고, 검수 완료 후 사용자가 사이드카를 삭제함
- 이미지 자동 설명(Vision)은 OFF: 환각 방지. 시각 해석이 필요하면 별도 명령으로 명시 호출
- HWPX 경로는 Python 표준 라이브러리만 사용 (외부 의존성 없음). DOCX 경로는 Pandoc 바이너리 필요

## HWPX vs DOCX 선택 가이드

- **HWPX 권장**: 한글 원본을 직접 변환함. 텍스트 패턴과 구조 정보에 따라 H1/H2 헤딩, bullet 들여쓰기, 표와 이미지를 처리함
- **DOCX 사용 케이스**: HWPX 원본이 없고 DOCX만 받은 경우. 한컴 export에서 헤딩 스타일이 손실되면 Pandoc이 복원하지 못하므로 검수 큐에서 확인하고 수동으로 보정함

## 관련 문서

- 사용 가이드: [[docx 변환 파이프라인]]
- 변환 스크립트: `scripts/import-doc.mjs`, `assets/extract_hwpx.py`
- 폴더 규약: [[CONVENTIONS]]의 "디렉토리 구조"와 "수정 금지 영역"
