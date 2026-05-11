---
description: DOCX 파일을 변환하여 LLM Wiki에 통합
argument-hint: '<path-to-docx>'
allowed-tools: Bash, Read, Edit, Glob
---

DOCX 파일을 LLM Wiki 표준 위치로 변환·통합한다. 사용자는 한컴오피스에서 HWPX → DOCX로 직접 저장한 뒤 이 명령으로 가져온다.

Raw 인자: `$ARGUMENTS`

## 실행 절차

1. **인자 검증**
   - `$ARGUMENTS`가 비어 있으면 사용자에게 DOCX 경로를 요청
   - 경로에 공백·한글이 있으면 따옴표로 감쌌는지 확인

2. **변환 스크립트 실행**

   ```bash
   node "scripts/import-doc.mjs" "$ARGUMENTS"
   ```

   스크립트는 stdout에 JSON으로 결과를 출력한다:
   ```json
   {
     "ok": true,
     "pandoc": "<pandoc 경로>",
     "source": "03_References/_sources/<name>.docx",
     "converted": "03_References/converted/<name>/<name>.md",
     "figuresDir": "03_References/converted/<name>/figures",
     "sidecar": "03_References/converted/<name>/<name>_review_pending.md",
     "stats": { "tableMd": N, "tableGrid": N, "tableHtml": N, "figures": N },
     "warnings": "..." | null
   }
   ```

3. **결과 파싱 및 후속 작업**

   - JSON을 파싱하여 사용자에게 다음을 안내:
     - 변환된 본문 파일 경로
     - 검수 큐 사이드카 경로
     - 추출 이미지/표 통계
     - Pandoc 경고가 있다면 그대로 표시
   - `00_Index/MOC.md`의 "참고자료 (03_References)" 섹션에 `[[<name>]]` 항목을 추가
     - 이미 등록되어 있으면 skip
     - MOC `updated` 필드를 오늘 날짜로 갱신
   - `05_Logs/log.md`에 `ingest` 작업유형으로 다음 형식의 항목 추가:
     ```markdown
     ## [YYYY-MM-DD] ingest | <name> 변환·통합

     - 원본: `03_References/_sources/<name>.docx`
     - 변환본: [[<name>]]
     - 검수 큐: [[<name>_review_pending]]
     - 자동 통계: 표 N개 (MD/Grid/HTML 분포), 이미지 N개
     - 후속: 검수 큐 체크리스트 사람 검토 → 모두 OK면 사이드카 삭제
     ```
   - log.md의 `updated` 필드도 오늘 날짜로 갱신

4. **사용자 안내 메시지**
   - 변환 성공 시: 본문/사이드카 경로, 검수 큐 항목 요약, 다음 행동 제안("사이드카의 체크리스트를 확인 후 표/이미지 검수")
   - 변환 실패 시: 스크립트 stderr 그대로 표시 + Pandoc 설치/PATH 확인 안내

## 주의

- 스크립트는 원본 DOCX를 `03_References/_sources/`로 **복사**한다. 사용자의 원래 파일은 그대로 유지됨
- 같은 이름의 DOCX가 `_sources/`에 이미 있으면 덮어쓰기 — 충돌이 우려되면 호출 전 사용자에게 확인 후 진행
- 사이드카는 사람 검수용. 검수 완료 후 사용자가 삭제하거나 본문에 흡수
- 이미지 자동 설명(Vision)은 OFF — 환각 방지. 시각 해석이 필요하면 별도 명령으로 명시 호출

## 관련 문서

- 사용 가이드: [[docx 변환 파이프라인]]
- 변환 스크립트: `scripts/import-doc.mjs`
- 폴더 규약: [[AGENTS|에이전트 지침]] §디렉토리 구조 / §수정 금지 문서
