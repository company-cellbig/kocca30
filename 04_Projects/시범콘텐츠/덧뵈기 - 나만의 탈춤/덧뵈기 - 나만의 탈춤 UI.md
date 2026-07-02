---
title: 덧뵈기 - 나만의 탈춤 UI
type: project
status: draft
tags: [project, kocca, 시범콘텐츠, 덧뵈기, UI]
created: 2026-06-15
updated: 2026-07-01
---

> 덧뵈기 AR 탈춤 체험 키오스크의 화면별 UI 설계. 각 화면의 레이아웃(16:9 영역 배치)과 예시 이미지 생성 프롬프트를 함께 담음. 공용 화면(인트로, 대기, 전송, 종료)은 [[시범콘텐츠 공통 사양#5. 공통 화면]] 표준을, 이어하기 토큰 스캔은 [[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]]를 따르고 덧뵈기 고유분만 더하며, 고유 화면(탈 디자인, AR 춤사위, 기념 촬영, 결과)은 레이아웃을 상세 설계함. 기획은 [[덧뵈기 - 나만의 탈춤 기획서]].

# 1. 개요

- **목적**: 화면별 UI 레이아웃을 설계하고 예시 이미지 생성 프롬프트를 정리함
- **문서 성격**: 레이아웃 기획과 이미지 생성 프롬프트를 함께 담음. 레이아웃은 [[시범콘텐츠 공통 사양#5. 공통 화면]]의 16:9 영역 골격을 따름
- **대상 화면**: 13개. Step 순으로 배열함(§2.가 화면 목록)
- **공용과 고유**: 공용 화면 9개는 콘텐츠 무관 표준을 참조하고 덧뵈기 고유분(말뚝이, 탈 비주얼, 카피)만 더함. 이 중 8개는 [[시범콘텐츠 공통 사양#5. 공통 화면]] 세션 표준을(실패 안내 화면 포함), 학습 토큰 스캔 화면 1개는 [[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]] 이어하기 복원(콘텐츠 횡단 학습 기능)을 정본으로 함. 덧뵈기 고유 화면 4개는 레이아웃을 상세 설계함
- **공통 규격**: 16:9 가로 키오스크, 실사풍 UI 목업, 영어 프롬프트. 이미지 안 UI 텍스트는 한글로 렌더링함
- **사용법**: §13에 중립 레이아웃 이미지가 있는 공용 화면 8개는 그 이미지를 첨부해 참조 이미지 기반으로 생성하고(학습 토큰 스캔은 §13에 이어하기 예시 이미지가 있으나 2차연도라 1차연도 UI는 미작성), 중립 이미지가 없는 화면(덧뵈기 고유 화면)은 §2.다 공통 제약에 화면별 프롬프트를 이어 붙여 생성함. 생성 방식은 분류(공용/고유)와 별개 축임 (방식 구분은 §2.다 공통 프롬프트 양식)
- **텍스트 주의 (후편집)**: 이미지에는 UI 텍스트를 렌더링하지 않음. 타이틀, 버튼, 카피 등 모든 텍스트 영역을 빈 자리로 두고 실제 문구는 후편집(Figma)으로 넣음(2026-07-02 결정). 문서와 프롬프트의 한글 문구는 후편집용 참조 카피이며 이미지에 박지 않음. AI 한글 렌더 불안정 문제도 이로써 회피함

# 2. 공통 설계

## 가. 화면 목록과 분류

화면을 Step 순으로 정리함. 분류는 공용(공유 화면)과 덧뵈기 고유로 나눔. 공용은 [[시범콘텐츠 공통 사양#5. 공통 화면]] 세션 화면을 포함함. 이어하기(학습 토큰 스캔)는 2차연도 전방 설계라 1차연도 미적용이며([[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]]) 참고로만 표에 둠.

| 순서 | 화면 | Step | 분류 | 기획서 근거 |
| --- | --- | --- | --- | --- |
| 가 | 시작 화면 | Step 1 | 공용 (인트로, §5.나) | [[덧뵈기 - 나만의 탈춤 기획서#1) Step 1. 인트로 (시작 + 동의)]] |
| 나 | 학습 토큰 스캔 화면 | Step 1 | 공용 (플랫폼 이어하기, 2차연도 전방 설계, 1차연도 미적용) | [[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]] |
| 다 | 가이드 화면 | Step 1 | 공용 (인트로, §5.나) | [[덧뵈기 - 나만의 탈춤 기획서#1) Step 1. 인트로 (시작 + 동의)]] |
| 라 | 동의 약관 화면 | Step 1 | 공용 (인트로, §5.나) | [[덧뵈기 - 나만의 탈춤 기획서#1) Step 1. 인트로 (시작 + 동의)]] |
| 마 | 탈 디자인 도구 화면 | Step 2 | 덧뵈기 고유 | [[덧뵈기 - 나만의 탈춤 기획서#2) Step 2. 탈 디자인]] |
| 바 | 변환 대기 화면 | Step 3 | 공용 (대기, §5.다) | [[덧뵈기 - 나만의 탈춤 기획서#3) Step 3. 3D 변환 + 대기 화면]] |
| 사 | AR 춤사위 체험 화면 | Step 4 | 덧뵈기 고유 (핵심) | [[덧뵈기 - 나만의 탈춤 기획서#4) Step 4. AR 착용 + 춤사위 따라하기 (핵심 체험)]] |
| 아 | 기념 촬영 화면 | Step 5 | 덧뵈기 고유 | [[덧뵈기 - 나만의 탈춤 기획서#5) Step 5. 기념 촬영]] |
| 자 | 생성 대기 화면 | Step 5 | 공용 (대기, §5.다) | [[덧뵈기 - 나만의 탈춤 기획서#5) Step 5. 기념 촬영]] |
| 차 | 결과물 미리보기 화면 | Step 6 | 덧뵈기 고유 | [[덧뵈기 - 나만의 탈춤 기획서#6) Step 6. 결과물 전송]] |
| 카 | 연락처 입력과 전송 화면 | Step 6 | 공용 (전송, §5.라) | [[덧뵈기 - 나만의 탈춤 기획서#6) Step 6. 결과물 전송]] |
| 타 | 마무리 인사 화면 | Step 7 | 공용 (종료, §5.마) | [[덧뵈기 - 나만의 탈춤 기획서#7) Step 7. 종료와 리셋]] |
| 파 | 실패 안내 화면 | 실패 시(공통) | 공용 (실패 안내, §5.바) | [[시범콘텐츠 공통 사양#바. 실패 안내 (사과 화면)]] |

## 나. 공통 레이아웃

모든 화면은 [[시범콘텐츠 공통 사양#5. 공통 화면]] 가. 공통 영역 골격(16:9 가로)을 따름. 헤더(제목과 상태), 본문(주기능), 액션(버튼) 세 영역에 호스트 슬롯(진행 호스트가 들어갈 자리)을 얹는 구조임. 참여자가 화면 앞 가운데 서서 터치하므로 터치 조작 요소는 중앙 도달 존(가운데 폭, 눈높이~허리)에 두고 화면 가장자리는 피함([[시범콘텐츠 공통 사양#5. 공통 화면]] 가. 도달성). 공용 화면은 §13 참조 이미지가 이 배치와 호스트 측면 안내를 이미 담고 있어 그대로 계승함.

- **공용 화면**: §5 나~마의 동작별 표준 레이아웃을 그대로 따르고, 덧뵈기 고유분(말뚝이, 탈 비주얼, 한글 카피)만 각 영역에 끼움. 각 화면 설계의 레이아웃 항목에 준용 절을 명시함. 단 학습 토큰 스캔은 [[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]]를 정본으로 하되 §5 세션 화면 목록 밖이라 16:9 골격 위에서 레이아웃을 직접 설계함
- **고유 화면**: 같은 16:9 영역 골격 위에서 덧뵈기 메커닉(탈 디자인, AR 춤사위, 기념 촬영, 결과)에 맞춰 레이아웃을 상세 설계함
- **덧뵈기 공통 요소**: 진행 호스트는 말뚝이임(역할은 [[덧뵈기 - 나만의 탈춤 기획서#바. 말뚝이 진행 호스트]], 구체 비주얼 미확정이라 전 화면에서 "말뚝이 탈 호스트 캐릭터"로만 묘사). 공통 화면에서는 말뚝이를 중앙 조작 존 옆 여유 공간에 또렷한 안내 캐릭터로 두고 유저를 향해 안내하는 포즈로 함(실사 행인이나 다른 사용자로 오인되지 않게, §5.가 호스트 슬롯). 본문이 화면 전체를 쓰는 고유 화면(탈 디자인 캔버스, AR 카메라 뷰, 촬영)에서만 작게 두거나 숨김

## 다. 공통 프롬프트 양식

모든 화면 프롬프트가 공유하는 고정부(제약과 부정 프롬프트)와, 화면마다 채우는 변수 슬롯을 정의함.

생성 방식은 §13 중립 이미지 유무로 갈리며, 분류(공용/고유)와 별개 축임.

- **참조 이미지 기반** (시작, 가이드, 동의 약관, 대기, 전송, 종료, 실패 안내. 학습 토큰 스캔은 2차연도라 1차연도 프롬프트 미작성): [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]]의 중립 레이아웃 이미지를 첨부 입력으로 받아, 영역 구조와 요소 배치를 유지하며 중립 플레이스홀더를 덧뵈기 고유 요소(말뚝이, 탈 비주얼, 한글 카피)로 치환함. 프롬프트에 첨부 이미지를 명시함
- **단독 프롬프트** (탈 디자인, AR 춤사위, 기념 촬영, 결과): 첨부할 중립 이미지가 없어 아래 공통 제약에 화면별 내용을 이어 붙인 단독 완결형 프롬프트로 생성함

### 1) 공통 제약 (모든 화면 공유)

- **매체와 형식**: 키오스크 터치스크린 UI 화면 목업, 풀스크린, 실사풍 고해상도
- **화면비와 규격**: 16:9 가로 (해상도는 디바이스 규격 확정 후, 예: 1920x1080, 확인 필요)
- **아트 디렉션 (제안, 확정 필요)**: 한국 전통 탈춤(덧뵈기) 모티프와 현대 키오스크 UI의 결합. 오방색과 단청 계열 포인트 컬러, 한지와 목재 질감을 절제해 사용
- **전통 정합성**: 한국 탈춤 탈 양식 유지, 일본 노멘(일본 가면극 가면)이나 중국 가면과 혼동 금지 ([[덧뵈기 - 나만의 탈춤 기획서#나. 탈 디자인 도구 (Step 2)]])
- **톤과 무드**: 마당놀이 축제의 신명, 밝고 활기차며 친근함
- **UI 원칙**: 큰 터치 타깃, 명확한 시각 위계, 노년층 포함 가독성
- **화면 내 텍스트 (후편집)**: 이미지에 텍스트를 렌더링하지 않음. 텍스트 영역은 빈 플레이스홀더로 두고 문구는 후편집(Figma)으로 넣음. 프롬프트와 각 화면 "화면 내 텍스트"의 한글 문구는 참조 카피임

### 2) 화면별 변수 슬롯

화면마다 아래 항목을 채움. 단독 프롬프트는 §2.다 1) 공통 제약 뒤에 화면별 내용을 이어 붙이고, 참조 이미지 기반 프롬프트는 §13 중립 이미지를 첨부함(위 생성 방식 구분, 분류와 별개 축).

1. **레이아웃**: 16:9 영역(헤더, 본문, 액션) 배치. 공용 화면은 §5 준용 절을 밝힘(이어하기 토큰 스캔은 [[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]] 정본, §5 세션 목록 밖이라 직접 설계)
2. **핵심 UI 컴포넌트**: 이 화면 고유 요소
3. **말뚝이 호스트**: 위치, 상태, 안내 포즈. 공통 화면은 측면에 또렷한 안내 캐릭터, 본문 전체를 쓰는 고유 화면(창작 캔버스, 카메라 뷰)만 작게 두거나 숨김
4. **화면 내 텍스트**: 이미지에 한글로 렌더링할 정확한 문구

### 3) 부정 프롬프트 (모든 화면 공통)

- 깨지거나 왜곡된 한글, UI 내 영어 텍스트
- 기형 손과 얼굴, 워터마크와 서명
- 저작권 캐릭터
- 말뚝이 호스트가 실사 행인이나 옆에 선 다른 사용자로 오인되는 형태 (화면 속 안내 캐릭터로 명확히)
- 일본 노멘(일본 가면극 가면)이나 중국 가면과 혼동되는 형태
- 프롬프트에 지정하지 않은 임의 UI 버튼, 툴바, 컨트롤 (생성기가 키오스크 맥락에서 임의로 채우는 환각 방지)

# 3. 화면별 설계

각 화면을 §2.다 2) 변수 슬롯으로 설계하고, 그 뒤에 영어 프롬프트를 둠. 공용 화면은 레이아웃에서 §5 표준을 준용하고 덧뵈기 고유분만 더함(이어하기 토큰 스캔은 [[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]] 정본이라 직접 설계). 고유 화면은 레이아웃을 상세히 설계함.

## 가. Step 1. 시작 화면

공용 화면(인트로, [[시범콘텐츠 공통 사양#5. 공통 화면]] 나). 대기 상태에서 관람객을 맞이하고 체험을 시작시킴. 종료 후 복귀 화면과 동일 자산임.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.나 인트로 시작 화면 준용. 헤더에 콘텐츠 타이틀, 본문에 탈춤 대표 비주얼, 액션에 큰 시작 버튼을 둠. 말뚝이가 환영하며 등장함 (보조 이어하기 버튼은 2차연도 전방 설계라 1차연도 미배치, §6)
- **핵심 UI 컴포넌트**: 큰 "시작하기" 터치 버튼, 콘텐츠 타이틀, 탈춤 대표 비주얼
- **말뚝이 호스트**: 한쪽 측면에서 유저를 향해 손짓하며 환영, 밝은 표정(중앙은 타이틀과 시작 버튼 자리)
- **화면 내 텍스트**: 타이틀 "나만의 탈춤", 버튼 "시작하기"

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.1) 시작 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 header/body/action regions and the position and size of every element (title, primary start button, host). There is no secondary button (the resume/이어하기 button is a 2nd-year feature and is not placed in year 1). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum) experience, without moving or resizing them:
- the guide-host placeholder (keep its clear side presence and presenting pose from the reference) -> a Korean Maldukki mask host character welcoming with a beckoning gesture and a bright expression
- the content-area and background placeholders -> Korean talchum motifs over a vibrant traditional madang stage, festive attract mood
Keep title '나만의 탈춤', primary button '시작하기'.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 나. Step 1. 학습 토큰 스캔 화면 (2차연도 전방 설계, 1차연도 미적용)

이 화면은 2차연도 전방 설계이며 1차연도 UI는 구현하지 않음. 재방문 옵트인 학습자가 학습 토큰(QR)을 스캔해 진척과 동의를 복원하는 플랫폼 이어하기 화면으로, 정본은 [[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]](subject_id 기반 복원)임. 상세 레이아웃과 프롬프트는 2차연도 설계에서 확정함.

## 다. Step 1. 가이드 화면

공용 화면(인트로, [[시범콘텐츠 공통 사양#5. 공통 화면]] 나). 말뚝이가 인사하고 체험 흐름을 안내함.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.나 인트로 가이드 화면 준용. 본문에 진행 흐름 안내 일러스트, 액션에 다음 버튼을 둠. 말뚝이가 화자로 등장함
- **핵심 UI 컴포넌트**: 진행 흐름 안내 일러스트(탈 디자인, AR 춤, 촬영, 공유), "다음" 버튼
- **말뚝이 호스트**: 화자로 등장해 설명, 재담하는 표정
- **화면 내 텍스트**: 인사말 "어서 오세요"(표본 카피), 버튼 "다음"

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.2) 가이드 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 header/body/action regions and the position and size of every element (flow illustration, next button, host). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum) experience, without moving or resizing them:
- the guide-host placeholder (keep its clear side presence and presenting pose from the reference) -> a Korean Maldukki mask host character acting as the narrator with a lively storytelling expression
- the flow-illustration placeholder -> an instructional illustration of the flow (mask design, AR dance, photo, share) in talchum styling
- background -> a traditional madang stage, friendly mood
Keep greeting '어서 오세요', button '다음'.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 라. Step 1. 동의 약관 화면

공용 화면(인트로, [[시범콘텐츠 공통 사양#5. 공통 화면]] 나). 필수와 선택 동의를 받음.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.나 인트로 동의 약관 화면 준용. 본문에 약관 텍스트와 동의 토글 목록, 액션에 동의하고 시작 버튼(필수 카메라 동의 시 활성)과 그만두기 보조 버튼을 둠. 화면 타임아웃 미적용. 말뚝이는 넓은 측면에 또렷한 안내 캐릭터로 둠
- **핵심 UI 컴포넌트**
	- 동의 항목 토글: 필수 카메라 촬영
	- 주 버튼 "동의하고 시작": 필수 카메라 촬영 토글이 켜져야 활성화됨(꺼져 있으면 비활성)
	- 보조 "그만두기" 버튼: 동의하지 않고 Step 7로 종료함
- **말뚝이 호스트**: 넓은 측면에 또렷한 안내 캐릭터로, 유저를 향해 안내하는 포즈(중앙 도달 존 조작은 가리지 않음)
- **개인정보 고지 (기획서 §5.나 준용)**: 약관과 안내 문구에 카메라 촬영(얼굴과 신체)뿐 아니라, 기념 사진(얼굴과 신체 포함)을 생성하고 저장하며 결과 페이지로 48시간 제공하는 처리 범위를 포함함(정확한 고지 문구와 동의 범위는 규정 검토 확정, 확인 필요)
- **상태별 안내 (기획서 준용)**: 그만두기 버튼 터치, 카메라 촬영 미동의, 터치 미입력 타임아웃 시 미동의로 간주해 종료 Step 직행은 기획서 Step 1과 공통 사양 §5.나를 준용함(목업은 정상 동의 상태만)
- **화면 내 텍스트**: 타이틀 "이용 동의"(표본), 항목 "카메라 촬영 (필수)"(표본), 버튼 "동의하고 시작", "그만두기"

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.3) 동의 약관 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 header/body/action regions and the position and size of every element (title, terms area, a single consent toggle, primary/secondary buttons, host). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum) experience, without moving or resizing them:
- the guide-host placeholder (keep its clear side presence and presenting pose from the reference) -> a Korean Maldukki mask host guide as a clear side presence in a presenting pose (an on-screen guide character, not a realistic bystander or a second user)
- background -> a calm traditional madang stage
Keep title '이용 동의'. Use exactly one consent toggle '카메라 촬영 (필수)' (shown ON); if the reference mockup shows two toggle rows, keep only this one and do not render a second toggle (this content has a single required consent). Keep primary button '동의하고 시작' (active), secondary button '그만두기'.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 마. Step 2. 탈 디자인 도구 화면

덧뵈기 고유 화면. 사용자가 배역 탈 양식을 바탕으로 자기 탈을 디자인함. 디자인 방식은 드로잉형(배역 탈 템플릿 시작점)이며, 상세는 [[덧뵈기 - 나만의 탈춤 기획서#나. 탈 디자인 도구 (Step 2)]].

### 1) 화면 설계

- **레이아웃** (고유, 16:9 골격, 작업 영역을 중앙 도달 존에 집약)
	- 헤더: 안내 카피 한 줄 (상단 표시)
	- 본문 중앙: 넓은 탈 도안 캔버스를 중앙 도달 존에 크게 둠 (주기능, 손 닿는 범위)
	- 도구 패널: 캔버스 바로 아래(또는 캔버스에 인접한 도달 존 안쪽)에 툴바로 둠. 탈 템플릿과 프리셋, 팔레트, 스탬프, 대칭 토글은 모두 터치 조작이라 도달 존 안에 모으고 좌우 끝에 두지 않음 (§5.가 도달성)
	- 3D 미리보기: 표시 전용(비조작)이라 한쪽 측면 가장자리에 작게 둠 (캔버스보다 확연히 작음)
	- 액션: 완료 버튼을 화면 물리 최하단이 아니라 중앙 도달 존 아래쪽(허리 높이 안)에 둠
- **핵심 UI 컴포넌트**
	- 탈 도안 캔버스: 고해상도 드로잉으로 디자인 중인 전통 탈 (도트 픽셀 아님)
	- 도구 패널: 배역 탈 템플릿과 프리셋, 제한 팔레트, 도형과 전통 문양 스탬프, 대칭 모드 토글
	- 경량 3D 미리보기: 그린 도안을 3D 탈에 입힌 실시간 미리보기 패널(표시 전용, 측면에 작게. 정식 변환은 Step 3)
	- "완료" 버튼
- **말뚝이 호스트**: 모서리에 작게 두거나 숨김 (작업 집중 우선)
- **상태별 안내 (기획서 준용)**: 입력 유효성 검증, 가드레일 실패 시 차단과 재입력 안내, 한도 초과 처리는 기획서 Step 2 분기를 준용함(목업은 정상 편집 상태만)
- **치수 (확인 필요)**: 캔버스 높이와 툴바 터치 폭 등 도달 존 안 배분 치수는 설계 단계에서 확정(§5.가 도달성)
- **화면 내 텍스트**: 안내 "탈을 꾸며보세요", 버튼 "완료"

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a horizontal 16:9 kiosk touchscreen, full screen.
The mask design tool screen of a Korean traditional mask dance (talchum) experience.
Large-screen kiosk where a person stands centered and touches: keep all interactive tools within a central reachable zone (center of the width, eye-to-waist height), not at the screen edges.
Top header: a one-line caption '탈을 꾸며보세요'.
Center: a large high-resolution drawing canvas (not pixel/dot art) with a Korean traditional mask being designed from a role-mask template, the main focus within the central reachable zone.
Directly below the canvas and within reach: a tool bar with role-mask templates and presets, a limited traditional color palette, shape tools, traditional-pattern stamps, and a left-right symmetry (mirror) toggle. These are touch tools, so they stay in the central reachable zone, not on the far left or right edge.
To one side, display-only (non-touch): a small live 3D preview pane showing the design applied to a 3D mask, clearly smaller than the canvas.
A primary button labeled '완료' in the lower part of the central reachable zone, not at the physical bottom edge.
A calm, focused working layout with a small Korean Maldukki mask host in a corner (can be omitted).
Art direction: Korean traditional talchum motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 바. Step 3. 변환 대기 화면

공용 화면(대기, [[시범콘텐츠 공통 사양#5. 공통 화면]] 다). 2D 도안을 3D 탈로 변환하는 동안 진행을 보여줌.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.다 대기 준용. 본문 중앙에 진행 인디케이터와 변환 중 탈 프리뷰, 상태 문구를 둠. 헤더와 액션은 비움(입력받지 않음). 두 타임아웃 미적용. 말뚝이는 측면에 또렷한 안내 캐릭터로 둠
- **핵심 UI 컴포넌트**: 진행 인디케이터(원형이나 바), 변환 중인 탈 비주얼, 안내 문구
- **말뚝이 호스트**: 대기 동안 추임새로 흥을 돋움 (측면 또렷한 안내 캐릭터)
- **화면 내 텍스트**: 안내 "탈을 빚는 중", 진행률

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.4) 대기 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 body-centered layout and the position and size of every element (progress indicator, status caption, host). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum) experience, without moving or resizing them:
- the progress/visual placeholder -> a progress indicator with a preview of a Korean traditional mask being converted into 3D
- the guide-host placeholder (keep its clear side presence and presenting pose from the reference) -> a Korean Maldukki mask host guide keeping up the mood during the wait, as a clear side presence (an on-screen guide character, not a realistic bystander)
- background -> a traditional madang stage, an anticipatory waiting mood
Keep status caption '탈을 빚는 중'.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 사. Step 4. AR 춤사위 체험 화면

덧뵈기 고유 화면(핵심 체험). 사용자가 자기 탈을 AR로 쓰고 풍물 장단에 맞춰 춤사위를 따라 추며, 자세와 타이밍을 실시간 채점받아 신명 게이지로 보상받음.

### 1) 화면 설계

- **레이아웃** (고유, 16:9 골격 위 카메라 우세 구성)
	- 헤더 모서리(우상단): 신명 게이지를 상태 표시로 얹음
	- 본문(최대 비중): AR 카메라 뷰. 사용자 얼굴에 사용자가 디자인한 탈이 오버레이된 실시간 화면
	- 본문 하단: 춤사위 가이드(시연 아바타나 실루엣)
	- 액션: 별도 버튼 없음(체험 중). 자동으로 진행하며, 화면 타임아웃이 발동하면 정상 진행으로 다음 단계로 넘어감
- **핵심 UI 컴포넌트**
	- AR 카메라 뷰: 사용자 얼굴에 사용자 디자인 탈이 오버레이된 실시간 화면
	- 춤사위 가이드: 따라 출 동작을 보여주는 시연 아바타나 실루엣
	- 신명(興) 게이지: 채점이 쌓일수록 차오르는 상승형 게이지
- **말뚝이 호스트**: 화면 모서리에서 추임새로 호응, 활기찬 표정
- **상태별 안내 (기획서 준용)**: 포즈 미검출이나 저신뢰 시 재시도 안내는 기획서 Step 4 분기를 준용함(목업은 정상 체험 상태만)
- **화면 내 텍스트**: 게이지 라벨 "신명", 안내 "춤사위를 따라 해보세요"

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a horizontal 16:9 kiosk touchscreen, full screen.
Korean traditional mask dance (talchum) AR experience screen.
Center: a live AR camera view of a participant wearing a hand-designed Korean traditional mask overlaid on their face, dancing.
Bottom: a dance-move guide with a demonstrator silhouette performing a talchum move, with a caption '춤사위를 따라 해보세요'. The bottom area contains only this dance-move guide; this is a hands-free experience screen with no bottom toolbar, no action buttons, and no extra UI controls.
Top-right: a rising excitement gauge labeled '신명', filling up, festive.
A corner: a Korean Maldukki mask host character cheering with a lively expression.
Background: a traditional madang (outdoor courtyard) stage, lively festival mood.
Art direction: Korean traditional talchum motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, any bottom toolbar or action buttons not specified (e.g. sound, camera-switch, dance, retry, home).
```

## 아. Step 5. 기념 촬영 화면

덧뵈기 고유 화면. 사용자가 만든 탈을 쓴 2D 탈 캐릭터가 탈춤 포즈를 취한 옆에서, 맨 얼굴의 사용자가 같이 포즈를 잡아 기념 사진을 촬영함. 탈을 쓴 쪽은 캐릭터뿐이고 사용자는 맨 얼굴이라 둘이 구별됨. 촬영은 버튼 없이 컷마다 주어진 시간이 카운트다운돼 0이 되면 자동으로 찍히고(찰칵), 정해진 촬영 횟수만큼 반복함 (기획서 "카운트다운 촬영", [[덧뵈기 - 나만의 탈춤 기획서#5) Step 5. 기념 촬영]]).

### 1) 화면 설계

- **레이아웃** (고유, 16:9 골격 위 합성 카메라 구성)
	- 헤더 상단: 안내 카피 배너 "같이 포즈를 잡아 보세요"와 잔여 촬영 횟수 배지(예 "3장 남음")를 상단 모서리에
	- 본문(최대 비중): 사용자 카메라 뷰에 2D 탈 캐릭터를 옆에 합성해 한 장 사진 구도로 보여주고, 그 위에 촬영까지 남은 시간을 큰 카운트다운 숫자로 오버레이(포즈 잡는 유저가 바로 봄)
	- 액션 하단: 비움 (촬영 버튼 없이 시간 0에 자동 촬영). 카운트다운은 본문 오버레이로, 잔여 횟수는 상단 배지로 분산
- **핵심 UI 컴포넌트**
	- 카메라 뷰: 맨 얼굴의 사용자 (탈을 쓰지 않음)
	- 2D 탈 캐릭터: 사용자가 만든 탈을 쓰고 덧뵈기 탈옷을 입은 채 탈춤 포즈를 취함
	- 카운트다운 오버레이 (본문 위 큰 숫자): 촬영까지 남은 시간을 표시, 0이 되면 자동 촬영(찰칵)하고 다음 컷으로. 컷당 예 3초에서 0까지(확인 필요, [[덧뵈기 - 나만의 탈춤 기획서]] §3.라 운영 파라미터). 별도 촬영 버튼 없음
	- 잔여 촬영 횟수 배지 (상단 모서리): "N장 남음". 카운트다운 숫자와 분리해 혼동 방지
- **말뚝이 호스트**: 촬영을 거들며 분위기를 돋움 (선택, 작게 두거나 숨김). 사진 합성 프레임 밖 UI 요소로만 두고 카메라 뷰 안에 탈 쓴 사람을 더 넣지 않음 (사용자와 2D 캐릭터 구분 보존)
- **상태별 안내 (기획서 준용)**: 카메라에 사람이 안 잡히면 다시 서도록 안내하는 상태는 기획서 Step 5 분기를 준용함(목업은 정상 촬영 상태만)
- **화면 내 텍스트**: 안내 "같이 포즈를 잡아 보세요", 촬영까지 남은 시간 카운트다운 숫자, 잔여 촬영 횟수(예 "3장 남음")

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a horizontal 16:9 kiosk touchscreen, full screen.
The commemorative photo capture screen of a Korean traditional mask dance (talchum) experience.
A single composite frame: a live camera view of a real user with a bare face and NO mask, posing next to a 2D mask character (the character wears the user-designed Korean traditional mask and a deotboegi talchum costume, striking a talchum pose) composited right beside the user so they pose together in one shot. Only the 2D character wears a mask; the real user's face is bare and clearly human, so the two are easy to tell apart.
Top header: a caption banner '같이 포즈를 잡아 보세요' across the top, and a small remaining-shots badge in a top corner showing a count with '장 남음' (render the example '3장 남음').
Overlaid on the camera view, a single large prominent countdown number (example '3', ticking 3 -> 2 -> 1 -> 0) for the seconds until the automatic capture, placed where the posing user can see it and visually distinct from the remaining-shots badge.
Bottom action area: empty, with NO capture button or shutter button anywhere (the photo auto-fires when the countdown reaches zero).
Optionally, a small non-photographic Maldukki mascot icon may appear as a UI element outside the camera/composite frame (can be omitted); it must NOT be a masked person inside the camera view. The camera view contains exactly two figures: the bare-faced user and the single 2D mask character. No additional masked people or faces anywhere in the camera view.
Background: a traditional madang stage, a festive celebratory mood.
Art direction: Korean traditional talchum motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; a numeric keypad may remain as a blank keypad graphic. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, a mask on the real user's face, any extra masked person or face in the camera view besides the single 2D mask character, any capture or shutter button (capture is automatic on the countdown), and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 자. Step 5. 생성 대기 화면

공용 화면(대기, [[시범콘텐츠 공통 사양#5. 공통 화면]] 다). 기념 사진을 만드는 동안 노출함.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.다 대기 준용. 본문 중앙에 진행 인디케이터와 생성 중 안내, 대기 콘텐츠를 둠. 헤더와 액션은 비움. 두 타임아웃 미적용. 말뚝이는 측면에 또렷한 안내 캐릭터로 둠
- **핵심 UI 컴포넌트**: 진행 인디케이터, 기념 사진 생성 중 안내, 대기 콘텐츠
- **말뚝이 호스트**: 대기 동안 흥을 돋움 (측면 또렷한 안내 캐릭터)
- **화면 내 텍스트**: 안내 "결과물을 만드는 중", 진행률

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.4) 대기 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 body-centered layout and the position and size of every element (progress indicator, status caption, host). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum) experience, without moving or resizing them:
- the guide-host placeholder (keep its clear side presence and presenting pose from the reference) -> a Korean Maldukki mask host guide keeping up the mood during the wait, as a clear side presence (an on-screen guide character, not a realistic bystander)
- background -> a traditional madang stage, an anticipatory waiting mood
The body center shows a progress indicator with light talchum-themed waiting content while a commemorative photo is being created. Keep the status caption '결과물을 만드는 중'.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 차. Step 6. 결과물 미리보기 화면

덧뵈기 고유 화면. 완성된 기념 사진을 미리 봄.

### 1) 화면 설계

- **레이아웃** (고유, 16:9 골격 위 카드 구성)
	- 헤더: 타이틀
	- 본문: 기념 사진 카드를 중앙에 배치
	- 액션: 다음 버튼을 중앙 도달 존 아래쪽에 둠(물리 최하단 아님)
- **핵심 UI 컴포넌트**
	- 기념 사진 미리보기: 2D 탈 캐릭터와 사용자가 같이 포즈 (신명 게이지 점수와 등급을 스탬프로 표기)
	- "다음" 버튼
- **말뚝이 호스트**: 측면에 또렷한 안내 캐릭터로 결과를 자랑하듯
- **화면 내 텍스트**: 타이틀 "결과물 미리보기", 버튼 "다음"

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a horizontal 16:9 kiosk touchscreen, full screen.
The result preview screen of a Korean traditional mask dance (talchum) experience.
Title: '결과물 미리보기'.
Layout: a commemorative photo card (a 2D mask character and the user posing together, with an excitement score and grade stamp) in the center, with a primary button labeled '다음' in the lower part of the central reachable zone (not at the physical bottom edge).
To one side: a Korean Maldukki mask host guide reacting proudly to the result, as a clear side presence (an on-screen guide character, not a realistic bystander or a second user).
Background: a traditional madang stage, a proud showcase mood.
Art direction: Korean traditional talchum motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 카. Step 6. 연락처 입력과 전송 화면

공용 화면(전송, [[시범콘텐츠 공통 사양#5. 공통 화면]] 라). 연락처를 받아 결과물 링크를 SMS로 보냄.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.라 전송 준용. 본문에 연락처 입력 필드와 숫자 키패드, 개인정보 수집과 이용 안내 문구를 둠(고지 요소는 핵심 UI 컴포넌트 참조). 액션에 전송 버튼과 받지 않기 보조 버튼을 두며, 전송이 곧 발송 동의, 받지 않기가 거부임(별도 동의 토글 없음). 화면 타임아웃 미적용. 말뚝이는 넓은 측면에 또렷한 안내 캐릭터로 둠
- **핵심 UI 컴포넌트**
	- 전화번호 입력 필드와 숫자 키패드
	- 개인정보 수집과 이용 안내 문구: 별도 동의 토글 대신 고지 요소를 노출 (수집 항목 휴대폰 번호, 이용 목적 결과 링크 발송, 발송 즉시 파기, 받지 않기로 거부 가능). 전송/받지 않기 버튼이 동의/거부를 담음. 기념 사진(얼굴과 신체 포함)을 결과 페이지로 48시간 제공하는 처리도 고지 범위에 포함함(기획서 §5.나 개인정보와 연속성). 처리 주체와 정확한 문구는 규정 검토 단계 확정(확인 필요). 파기 정본은 기획서 Step 6 sub-step 4
	- "전송"과 "받지 않기" 버튼
- **말뚝이 호스트**: 넓은 측면에 또렷한 안내 캐릭터로, 유저를 향해 안내하는 포즈(중앙 도달 존 조작은 가리지 않음)
- **상태별 안내 (기획서 준용)**: 수신처 영구 실패 시 재입력 1회 허용, 터치 미입력 타임아웃 시 연락처 즉시 파기 후 종료 Step 직행 등 실패 안내는 기획서 Step 6과 공통 사양 §5.라 결과물 전송을 준용함(목업은 정상 입력 상태만)
- **화면 내 텍스트**: 안내 "연락처를 입력하면 링크를 보내드려요", 개인정보 안내 "번호는 링크 발송에만 쓰고 발송 즉시 파기"(예시, 정확한 고지 문구는 규정 검토 확정), 버튼 "전송" "받지 않기"

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.5) 전송 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 header/body/action regions and the position and size of every element (caption, phone-number field, numeric keypad, one-line privacy notice, send/decline buttons, host). There is no consent toggle. Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum) experience, without moving or resizing them:
- the guide-host placeholder (keep its clear side presence and presenting pose from the reference) -> a Korean Maldukki mask host guide as a clear side presence in a presenting pose (an on-screen guide character, not a realistic bystander or a second user)
- background -> a calm traditional madang stage
Add a top-header caption '연락처를 입력하면 링크를 보내드려요' in the header area; keep the placeholder privacy notice '번호는 링크 발송에만 쓰고 발송 즉시 파기' (example wording, to be finalized after policy review), buttons '전송' and '받지 않기'.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; a numeric keypad may remain as a blank keypad graphic. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 타. Step 7. 마무리 인사 화면

공용 화면(종료, [[시범콘텐츠 공통 사양#5. 공통 화면]] 마). 마무리 인사 뒤 시작 화면으로 복귀함.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.마 종료 준용. 본문 중앙에 말뚝이의 작별 인사와 마무리 메시지를 크게 둠. 액션은 없음(자동으로 시작 화면 복귀). 말뚝이가 중심
- **핵심 UI 컴포넌트**: 마무리 인사 메시지, 말뚝이 작별 연출
- **말뚝이 호스트**: 중심에서 정겹게 작별 인사
- **화면 내 텍스트**: 인사 "또 만나요"

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.6) 종료 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 body-centered layout and the position and size of every element (host at center, closing message). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum) experience, without moving or resizing them:
- the guide-host placeholder (keep its central position and farewell pose from the reference; on this closing screen the host is centered, not to the side) -> a Korean Maldukki mask host character giving a warm farewell
- background -> a traditional madang stage, a warm closing mood
Keep the closing message '또 만나요'.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 파. 실패 안내 화면 (실패 분기 공통)

공용 화면(실패 안내, [[시범콘텐츠 공통 사양#바. 실패 안내 (사과 화면)]]). 변환이나 생성, 전송 실패, 상태 조회 무응답 등 실패 분기가 모이는 공통 화면임. 사과 안내를 보이고 종료 Step으로 자동 진행함.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.바 실패 안내 준용. 본문 중앙에 사과 메시지와 짧은 안내를 크게 두고, 액션은 기본 비움(자동 종료 진행). 오류 코드나 기술 세부는 노출하지 않음. 말뚝이는 다독이는 모습으로 둠
- **핵심 UI 컴포넌트**: 사과 메시지, 선택적 "처음으로" 보조 버튼(두면 중앙 도달 존)
- **말뚝이 호스트**: 측면이나 중앙에서 다독이는 표정
- **화면 내 텍스트**: 사과 "문제가 생겼어요"(표본), 선택 버튼 "처음으로"

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.8) 실패 안내 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 body-centered layout and the position and size of every element (apology message, optional secondary button, host). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum) experience, without moving or resizing them:
- the guide-host placeholder (keep its clear presence and reassuring pose from the reference) -> a stylized Korean Maldukki mask host character (the talchum servant, an on-screen guide character, not a realistic bystander) reassuring the user warmly
- background -> a calm traditional madang stage, a reassuring mood
Keep the apology message '문제가 생겼어요'; do not show error codes or technical details.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, error codes or technical error details, and any UI buttons, toolbars, or controls not specified in this prompt.
```

# 4. 관련 문서

- [[덧뵈기 - 나만의 탈춤 기획서]]: 콘텐츠 로직과 Step 명세 정본
- [[시범콘텐츠 공통 사양]]: 공통 화면 레이아웃(§5)과 진행 호스트(§6) 골격 정본
- [[덜미 - 나만의 꼭두각시 UI]]: 자매 UI 문서 (체험형 화면 설계 방식 공유)
