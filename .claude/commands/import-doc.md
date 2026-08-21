---
description: HWPX/DOCX 파일을 변환하여 LLM Wiki에 통합
argument-hint: '<path-to-hwpx-or-docx>'
allowed-tools: Bash, Read, Edit, Glob
---

HWPX 또는 DOCX 파일을 LLM Wiki 표준 위치로 변환·통합한다. **HWPX 직접 변환을 권장**: 한컴오피스 export 단계가 필요 없고 헤딩 구조가 손실 없이 보존된다.

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
     "stats": { "h2": N, "h3": N, "tableMd": N, "tableGrid": N, "tableHtml": N, "figures": N },
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
   - 변환본이 무형유산 종목 소재 전사본이면 `converted/` 루트에서 종류별 하위 폴더(예: `converted/남사당놀이/`)로 옮김. 파이프라인은 항상 루트로 출력하므로 사람이 수동 이동함 (규약: [[CONVENTIONS#2. 디렉토리 구조]] converted 하위 폴더 분리). wikilink는 파일명 해석이라 이동해도 안 깨짐
   - `00_Index/MOC.md`의 "참고자료 (02_References)" 섹션에 `[[<name>]]` 항목을 추가
     - 이미 등록되어 있으면 skip
     - MOC `updated` 필드를 오늘 날짜로 갱신
   - `99_Logs/log.md`에 `ingest` 작업유형으로 다음 형식의 항목 추가:
     ```markdown
     ## [YYYY-MM-DD] ingest | <name> 변환·통합

     - 원본: `02_References/_sources/<name>.<ext>`
     - 변환본: [[<name>]]
     - 검수 큐: [[<name>.review]]
     - 백엔드: <python|pandoc>
     - 자동 통계: H2 N / H3 N / 표 N (Grid/MD/HTML 분포) / 이미지 N
     - 후속: 검수 큐 체크리스트 사람 검토 → 모두 OK면 사이드카 삭제
     ```
   - log.md의 `updated` 필드도 오늘 날짜로 갱신

4. **사용자 안내 메시지**
   - 변환 성공 시: 백엔드, 본문/사이드카 경로, 통계 요약, 다음 행동 제안("사이드카의 체크리스트를 확인 후 표/이미지 검수")
   - 변환 실패 시: 스크립트 stderr 그대로 표시 + Python/Pandoc 설치 안내

## 주의

- 스크립트는 원본 파일을 `02_References/_sources/`로 **복사**한다. 사용자의 원래 파일은 그대로 유지됨
- 같은 이름의 파일이 `_sources/`에 이미 있으면 덮어쓰기: 충돌이 우려되면 호출 전 사용자에게 확인 후 진행
- 사이드카는 사람 검수용. 검수 완료 후 사용자가 삭제하거나 본문에 흡수
- 이미지 자동 설명(Vision)은 OFF: 환각 방지. 시각 해석이 필요하면 별도 명령으로 명시 호출
- HWPX 경로는 Python 표준 라이브러리만 사용 (외부 의존성 없음). DOCX 경로는 Pandoc 바이너리 필요

## HWPX vs DOCX 선택 가이드

- **HWPX 권장**: 한글 원본을 그대로 변환 가능. 헤딩(`## N-M.`), bullet 들여쓰기, 표, 이미지 모두 자동 보존
- **DOCX 사용 케이스**: HWPX 원본이 없고 DOCX만 받은 경우. 한컴 export 한계로 헤딩 스타일 손실 가능 (텍스트 패턴 후처리로 보강하나 100% 복원 보장 없음)

## 관련 문서

- 사용 가이드: [[docx 변환 파이프라인]]
- 변환 스크립트: `scripts/import-doc.mjs`, `assets/extract_hwpx.py`
- 폴더 규약: [[AGENTS|에이전트 지침]] §디렉토리 구조 / §수정 금지 문서
