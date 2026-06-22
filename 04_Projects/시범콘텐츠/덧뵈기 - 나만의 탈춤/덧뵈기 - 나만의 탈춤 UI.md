---
title: 덧뵈기 - 나만의 탈춤 UI
type: project
status: draft
tags: [project, kocca, 시범콘텐츠, 덧뵈기, UI]
created: 2026-06-15
updated: 2026-06-22
---

> 덧뵈기 AR 탈춤 체험 키오스크의 화면별 UI 설계. 각 화면의 레이아웃(9:16 영역 배치)과 예시 이미지 생성 프롬프트를 함께 담음. 공용 화면(인트로, 대기, 전송, 종료)은 [[시범콘텐츠 공통 사양#5. 공통 화면]] 표준을, 이어하기 토큰 스캔은 [[플랫폼 사양]] §5.다를 따르고 덧뵈기 고유분만 더하며, 고유 화면(탈 디자인, AR 춤사위, 기념 촬영, 결과)은 레이아웃을 상세 설계함. 기획은 [[덧뵈기 - 나만의 탈춤 기획서]].

# 1. 개요

- **목적**: 화면별 UI 레이아웃을 설계하고 예시 이미지 생성 프롬프트를 정리함
- **문서 성격**: 레이아웃 기획과 이미지 생성 프롬프트를 함께 담음. 레이아웃은 [[시범콘텐츠 공통 사양#5. 공통 화면]]의 9:16 영역 골격을 따름
- **대상 화면**: 12개. Step 순으로 배열함(§2.가 화면 목록)
- **공용과 고유**: 공용 화면 8개는 콘텐츠 무관 표준을 참조하고 덧뵈기 고유분(말뚝이, 탈 비주얼, 카피)만 더함. 이 중 7개는 [[시범콘텐츠 공통 사양#5. 공통 화면]] 세션 표준을, 학습 토큰 스캔 화면 1개는 [[플랫폼 사양]] §5.다 이어하기 복원(콘텐츠 횡단 학습 기능)을 정본으로 함. 덧뵈기 고유 화면 4개는 레이아웃을 상세 설계함
- **공통 규격**: 9:16 세로 키오스크, 실사풍 UI 목업, 영어 프롬프트. 이미지 안 UI 텍스트는 한글로 렌더링함
- **사용법**: §12에 중립 레이아웃 이미지가 있는 화면(공용 7개와 학습 토큰 스캔)은 그 이미지를 첨부해 참조 이미지 기반으로 생성하고, 중립 이미지가 없는 화면(덧뵈기 고유 화면)은 §2.다 공통 제약에 화면별 프롬프트를 이어 붙여 생성함. 생성 방식은 분류(공용/고유)와 별개 축임 (방식 구분은 §2.다)
- **텍스트 주의**: 이미지 안 모든 UI 텍스트를 한글로 렌더링하도록 영어 프롬프트에 정확한 문구를 명시함. 한글 렌더링이 불완전할 수 있어 필요 시 재생성하거나 디자인 단계에서 보정함

# 2. 공통 설계

## 가. 화면 목록과 분류

12개 화면을 Step 순으로 정리함. 분류는 공용(공유 화면)과 덧뵈기 고유로 나눔. 공용은 [[시범콘텐츠 공통 사양#5. 공통 화면]] 세션 화면과 [[플랫폼 사양]] §5.다 이어하기(학습 토큰 스캔)를 포함함.

| 순서 | 화면 | Step | 분류 | 기획서 근거 |
| --- | --- | --- | --- | --- |
| 가 | 시작 화면 | Step 1 | 공용 (인트로, §5.나) | [[덧뵈기 - 나만의 탈춤 기획서#1) Step 1. 인트로 (시작 + 동의)]] |
| 나 | 학습 토큰 스캔 화면 | Step 1 | 공용 (플랫폼 이어하기) | [[플랫폼 사양#다. 이어하기 복원]] |
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

## 나. 공통 레이아웃

모든 화면은 [[시범콘텐츠 공통 사양#5. 공통 화면]] 가. 공통 영역 골격(9:16 세로)을 따름. 헤더(제목과 상태), 본문(주기능), 액션(버튼) 세 영역에 호스트 슬롯(진행 호스트가 들어갈 자리)을 얹는 구조임.

- **공용 화면**: §5 나~마의 동작별 표준 레이아웃을 그대로 따르고, 덧뵈기 고유분(말뚝이, 탈 비주얼, 한글 카피)만 각 영역에 끼움. 각 화면 설계의 레이아웃 항목에 준용 절을 명시함. 단 학습 토큰 스캔은 [[플랫폼 사양]] §5.다를 정본으로 하되 §5 세션 화면 목록 밖이라 9:16 골격 위에서 레이아웃을 직접 설계함
- **고유 화면**: 같은 9:16 영역 골격 위에서 덧뵈기 메커닉(탈 디자인, AR 춤사위, 기념 촬영, 결과)에 맞춰 레이아웃을 상세 설계함
- **덧뵈기 공통 요소**: 진행 호스트는 말뚝이임(역할은 [[덧뵈기 - 나만의 탈춤 기획서#바. 말뚝이 진행 호스트]], 구체 비주얼 미확정이라 전 화면에서 "말뚝이 탈 호스트 캐릭터"로만 묘사). 작업 집중 화면(탈 디자인, 촬영, 폼)에서는 작게 두거나 숨김 (§5 호스트 슬롯)

## 다. 공통 프롬프트 양식

모든 화면 프롬프트가 공유하는 고정부(제약과 부정 프롬프트)와, 화면마다 채우는 변수 슬롯을 정의함.

생성 방식은 §12 중립 이미지 유무로 갈리며, 분류(공용/고유)와 별개 축임.

- **참조 이미지 기반** (시작, 가이드, 동의 약관, 학습 토큰 스캔, 대기, 전송, 종료): [[시범콘텐츠 공통 사양#12. 공용 화면 예시 이미지]]의 중립 레이아웃 이미지를 첨부 입력으로 받아, 영역 구조와 요소 배치를 유지하며 중립 플레이스홀더를 덧뵈기 고유 요소(말뚝이, 탈 비주얼, 한글 카피)로 치환함. 프롬프트에 첨부 이미지를 명시함
- **단독 프롬프트** (탈 디자인, AR 춤사위, 기념 촬영, 결과): 첨부할 중립 이미지가 없어 아래 공통 제약에 화면별 내용을 이어 붙인 단독 완결형 프롬프트로 생성함

### 1) 공통 제약 (모든 화면 공유)

- **매체와 형식**: 키오스크 터치스크린 UI 화면 목업, 풀스크린, 실사풍 고해상도
- **화면비와 규격**: 9:16 세로 (1080x1920 기준)
- **아트 디렉션 (제안, 확정 필요)**: 한국 전통 탈춤(덧뵈기) 모티프와 현대 키오스크 UI의 결합. 오방색과 단청 계열 포인트 컬러, 한지와 목재 질감을 절제해 사용
- **전통 정합성**: 한국 탈춤 탈 양식 유지, 일본 노멘(일본 가면극 가면)이나 중국 가면과 혼동 금지 ([[덧뵈기 - 나만의 탈춤 기획서#나. 탈 디자인 도구 (Step 2)]])
- **톤과 무드**: 마당놀이 축제의 신명, 밝고 활기차며 친근함
- **UI 원칙**: 큰 터치 타깃, 명확한 시각 위계, 노년층 포함 가독성
- **화면 내 텍스트**: 정확한 한글 카피를 영어 프롬프트에 명시해 이미지에 한글로 렌더링함

### 2) 화면별 변수 슬롯

화면마다 아래 항목을 채움. 단독 프롬프트는 §2.다 1) 공통 제약 뒤에 화면별 내용을 이어 붙이고, 참조 이미지 기반 프롬프트는 §12 중립 이미지를 첨부함(위 생성 방식 구분, 분류와 별개 축).

1. **레이아웃**: 9:16 영역(헤더, 본문, 액션) 배치. 공용 화면은 §5 준용 절을 밝힘(이어하기 토큰 스캔은 [[플랫폼 사양]] §5.다 정본, §5 세션 목록 밖이라 직접 설계)
2. **핵심 UI 컴포넌트**: 이 화면 고유 요소
3. **말뚝이 호스트**: 위치, 상태, 노출 여부 (작업 집중 화면은 작게 두거나 숨김)
4. **화면 내 텍스트**: 이미지에 한글로 렌더링할 정확한 문구

### 3) 부정 프롬프트 (모든 화면 공통)

- 깨지거나 왜곡된 한글, UI 내 영어 텍스트
- 기형 손과 얼굴, 워터마크와 서명
- 저작권 캐릭터
- 일본 노멘(일본 가면극 가면)이나 중국 가면과 혼동되는 형태
- 프롬프트에 지정하지 않은 임의 UI 버튼, 툴바, 컨트롤 (생성기가 키오스크 맥락에서 임의로 채우는 환각 방지)

# 3. 화면별 설계

각 화면을 §2.다 2) 변수 슬롯으로 설계하고, 그 뒤에 영어 프롬프트를 둠. 공용 화면은 레이아웃에서 §5 표준을 준용하고 덧뵈기 고유분만 더함(이어하기 토큰 스캔은 [[플랫폼 사양]] §5.다 정본이라 직접 설계). 고유 화면은 레이아웃을 상세히 설계함.

## 가. Step 1. 시작 화면

공용 화면(인트로, [[시범콘텐츠 공통 사양#5. 공통 화면]] 나). 대기 상태에서 관람객을 맞이하고 체험을 시작시킴. 종료 후 복귀 화면과 동일 자산임.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.나 인트로 시작 화면 준용. 헤더에 콘텐츠 타이틀, 본문에 탈춤 대표 비주얼, 액션에 큰 시작 버튼과 보조 이어하기 버튼을 둠. 말뚝이가 환영하며 등장함
- **핵심 UI 컴포넌트**: 큰 "시작하기" 터치 버튼, 보조 "이어하기" 버튼(재방문 옵트인 학습자가 학습 토큰 QR을 카메라에 비춰 진척과 동의 기록을 복원해 진입), 콘텐츠 타이틀, 탈춤 대표 비주얼
- **말뚝이 호스트**: 중앙이나 한쪽에서 손짓하며 환영, 밝은 표정
- **화면 내 텍스트**: 타이틀 "나만의 탈춤", 버튼 "시작하기"와 "이어하기"

### 2) 프롬프트 (영어, §12 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#12. 공용 화면 예시 이미지]] 다.1) 시작 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 9:16 header/body/action regions and the position and size of every element (title, primary/secondary buttons, host). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum) experience, without moving or resizing them:
- the generic host silhouette -> a Korean Maldukki mask host character welcoming with a beckoning gesture and a bright expression
- the content-area and background placeholders -> Korean talchum motifs over a vibrant traditional madang stage, festive attract mood
Keep title '나만의 탈춤', primary button '시작하기', secondary button '이어하기'.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability.
All on-screen UI text in Korean (Hangul), rendered exactly as the quoted strings; no English text in the UI.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 나. Step 1. 학습 토큰 스캔 화면

공용 화면(플랫폼 이어하기 경로). 학습 토큰 스캔은 덧뵈기 메커닉이 아니라 콘텐츠 무관 플랫폼 기능으로, 정본은 [[플랫폼 사양#다. 이어하기 복원]](subject_id 기반 복원)임. 화면에는 덧뵈기 고유분(말뚝이, 한글 카피)만 얹음. 재방문 옵트인 학습자가 시작 화면에서 이어하기를 누르면, 카메라로 학습 토큰(QR)을 비춰 진척과 동의 기록을 복원함. 유효 토큰이면 처음 시작 경로(가이드, 동의)를 건너뛰고 Step 2로 직행함. 무효이거나 스캔에 실패하면 처음 시작 경로로 안내함 (기획서 Step 1 sub-step 3과 4, [[덧뵈기 - 나만의 탈춤 기획서#1) Step 1. 인트로 (시작 + 동의)]]). 사용자를 촬영하는 카메라를 토큰 판독에만 쓰는 점에서 AR 체험 화면과 구분됨.

### 1) 화면 설계

- **레이아웃** (플랫폼 이어하기, 9:16 골격 위 카메라 스캔 구성)
	- 헤더: 안내 카피 한 줄
	- 본문(최대 비중): 카메라 프리뷰와 QR 조준 가이드(스캔 영역 프레임)
	- 액션 하단: 처음부터 시작 보조 버튼(이어하기를 포기하고 처음 시작 경로로)
- **핵심 UI 컴포넌트**
	- 카메라 프리뷰: 학습 토큰 QR을 비추는 실시간 화면(토큰 판독 용도)
	- QR 조준 가이드: 스캔 영역 프레임과 안내
	- 무효와 실패 처리: 무효 토큰이거나 스캔에 실패하면 처음 시작 경로(가이드, 동의)로 안내하는 fallback
- **말뚝이 호스트**: 모서리에 작게 두거나 숨김(스캔 집중)
- **화면 내 텍스트**: 안내 "학습 코드를 비춰 주세요", 보조 버튼 "처음부터 시작"

### 2) 프롬프트 (영어, §12 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#12. 공용 화면 예시 이미지]] 다.7) 이어하기 토큰 스캔 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 9:16 header/body/action regions and the position and size of every element (caption, camera-preview with QR guide frame, secondary button, host). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum) experience, without moving or resizing them:
- the generic host silhouette -> a small Korean Maldukki mask host character in a corner, not blocking the scan frame (can be omitted)
- the background -> subtle Korean talchum motifs over a traditional madang stage, a focused scanning mood
Keep the live camera preview with the centered QR scan guide frame as the main body (for reading the learning-token QR).
Keep caption '학습 코드를 비춰 주세요', secondary button '처음부터 시작'.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability.
All on-screen UI text in Korean (Hangul), rendered exactly as the quoted strings; no English text in the UI.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 다. Step 1. 가이드 화면

공용 화면(인트로, [[시범콘텐츠 공통 사양#5. 공통 화면]] 나). 말뚝이가 인사하고 체험 흐름을 안내함.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.나 인트로 가이드 화면 준용. 본문에 진행 흐름 안내 일러스트, 액션에 다음 버튼을 둠. 말뚝이가 화자로 등장함
- **핵심 UI 컴포넌트**: 진행 흐름 안내 일러스트(탈 디자인, AR 춤, 촬영, 공유), "다음" 버튼
- **말뚝이 호스트**: 화자로 등장해 설명, 재담하는 표정
- **화면 내 텍스트**: 인사말 "어서 오세요"(표본 카피), 버튼 "다음"

### 2) 프롬프트 (영어, §12 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#12. 공용 화면 예시 이미지]] 다.2) 가이드 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 9:16 header/body/action regions and the position and size of every element (flow illustration, next button, host). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum) experience, without moving or resizing them:
- the generic host silhouette -> a Korean Maldukki mask host character acting as the narrator with a lively storytelling expression
- the flow-illustration placeholder -> an instructional illustration of the flow (mask design, AR dance, photo, share) in talchum styling
- background -> a traditional madang stage, friendly mood
Keep greeting '어서 오세요', button '다음'.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability.
All on-screen UI text in Korean (Hangul), rendered exactly as the quoted strings; no English text in the UI.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 라. Step 1. 동의 약관 화면

공용 화면(인트로, [[시범콘텐츠 공통 사양#5. 공통 화면]] 나). 필수와 선택 동의를 받음. 학습 토큰 복원 스캔은 시작 화면의 이어하기에서 처리함.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.나 인트로 동의 약관 화면 준용. 본문에 약관 텍스트와 동의 토글 목록, 액션에 동의하고 시작 버튼(필수 카메라 동의 시 활성)과 그만두기 보조 버튼을 둠. 화면 타임아웃 미적용. 말뚝이는 작게 두거나 숨김
- **핵심 UI 컴포넌트**
	- 동의 항목 토글: 필수 카메라 촬영, 선택 영상 녹화와 생성, 선택 학습 프로필
	- 주 버튼 "동의하고 시작": 필수 카메라 촬영 토글이 켜져야 활성화됨(꺼져 있으면 비활성)
	- 보조 "그만두기" 버튼: 동의하지 않고 Step 7로 종료함
- **말뚝이 호스트**: 모서리에 작게 두거나 숨김 (폼 가독성 우선)
- **화면 내 텍스트**: 타이틀 "이용 동의"(표본), 항목 "카메라 촬영 (필수)" "영상 생성 (선택)" "학습 기록 (선택)"(표본), 버튼 "동의하고 시작", "그만두기"

### 2) 프롬프트 (영어, §12 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#12. 공용 화면 예시 이미지]] 다.3) 동의 약관 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 9:16 header/body/action regions and the position and size of every element (title, terms area, consent toggles, primary/secondary buttons, host). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum) experience, without moving or resizing them:
- the generic host silhouette -> a small Korean Maldukki mask host in a corner (can be omitted)
- background -> a calm traditional madang stage
Keep title '이용 동의', consent toggles '카메라 촬영 (필수)' (shown ON), '영상 생성 (선택)', '학습 기록 (선택)', primary button '동의하고 시작' (active), secondary button '그만두기'.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability.
All on-screen UI text in Korean (Hangul), rendered exactly as the quoted strings; no English text in the UI.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 마. Step 2. 탈 디자인 도구 화면

덧뵈기 고유 화면. 사용자가 배역 탈 양식을 바탕으로 자기 탈을 디자인함. 디자인 방식은 드로잉형(배역 탈 템플릿 시작점)이며, 상세는 [[덧뵈기 - 나만의 탈춤 기획서#나. 탈 디자인 도구 (Step 2)]].

### 1) 화면 설계

- **레이아웃** (고유, 9:16 골격 위 2로우 구성)
	- 헤더: 안내 카피 한 줄
	- 본문 상단 로우(2칼럼): 왼쪽에 좁은 경량 3D 미리보기, 오른쪽에 넓은 탈 도안 캔버스. 캔버스가 미리보기보다 확연히 넓음(미리보기 대 캔버스 약 1:3, 1:1 아님)
	- 본문 하단 로우(전체 폭 1칼럼): 도구 패널 전체
	- 액션: 최하단에 완료 버튼 고정
- **핵심 UI 컴포넌트**
	- 탈 도안 캔버스: 고해상도 드로잉으로 디자인 중인 전통 탈 (도트 픽셀 아님)
	- 도구 패널: 배역 탈 템플릿과 프리셋, 제한 팔레트, 도형과 전통 문양 스탬프, 대칭 모드 토글
	- 경량 3D 미리보기: 그린 도안을 3D 탈에 입힌 실시간 미리보기 패널(작게, 정식 변환은 Step 3)
	- "완료" 버튼
- **말뚝이 호스트**: 모서리에 작게 두거나 숨김 (작업 집중 우선)
- **화면 내 텍스트**: 안내 "탈을 꾸며보세요", 버튼 "완료"

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a vertical 9:16 kiosk touchscreen, full screen.
The mask design tool screen of a Korean traditional mask dance (talchum) experience.
Two-row layout.
Top row, two columns: left, a narrow live 3D preview pane showing the design applied to a 3D mask; right, a wide high-resolution drawing canvas (not pixel/dot art) with a Korean traditional mask being designed from a role-mask template, with a caption '탈을 꾸며보세요'. The canvas column is clearly wider than the preview (about 1:3, not 1:1).
Bottom row, one full-width column: a tool panel with role-mask templates and presets, a limited traditional color palette, shape tools, traditional-pattern stamps, and a left-right symmetry (mirror) toggle.
At the very bottom: a fixed button labeled '완료'.
A calm, focused working layout with a small Korean Maldukki mask host in a corner (can be omitted).
Art direction: Korean traditional talchum motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability.
All on-screen UI text in Korean (Hangul), rendered exactly as the quoted strings; no English text in the UI.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 바. Step 3. 변환 대기 화면

공용 화면(대기, [[시범콘텐츠 공통 사양#5. 공통 화면]] 다). 2D 도안을 3D 탈로 변환하는 동안 진행을 보여줌.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.다 대기 준용. 본문 중앙에 진행 인디케이터와 변환 중 탈 프리뷰, 상태 문구를 둠. 헤더와 액션은 비움(입력받지 않음). 두 타임아웃 미적용. 말뚝이는 선택 노출
- **핵심 UI 컴포넌트**: 진행 인디케이터(원형이나 바), 변환 중인 탈 비주얼, 안내 문구
- **말뚝이 호스트**: 대기 동안 추임새로 흥을 돋움 (선택 노출)
- **화면 내 텍스트**: 안내 "탈을 빚는 중", 진행률

### 2) 프롬프트 (영어, §12 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#12. 공용 화면 예시 이미지]] 다.4) 대기 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 9:16 body-centered layout and the position and size of every element (progress indicator, status caption, host). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum) experience, without moving or resizing them:
- the progress/visual placeholder -> a progress indicator with a preview of a Korean traditional mask being converted into 3D
- the generic host silhouette -> a Korean Maldukki mask host keeping up the mood during the wait (can be omitted)
- background -> a traditional madang stage, an anticipatory waiting mood
Keep status caption '탈을 빚는 중'.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability.
All on-screen UI text in Korean (Hangul), rendered exactly as the quoted strings; no English text in the UI.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 사. Step 4. AR 춤사위 체험 화면

덧뵈기 고유 화면(핵심 체험). 사용자가 자기 탈을 AR로 쓰고 풍물 장단에 맞춰 춤사위를 따라 추며, 자세와 타이밍을 실시간 채점받아 신명 게이지로 보상받음.

### 1) 화면 설계

- **레이아웃** (고유, 9:16 골격 위 카메라 우세 구성)
	- 헤더 모서리(우상단): 신명 게이지를 상태 표시로 얹음
	- 본문(최대 비중): AR 카메라 뷰. 사용자 얼굴에 사용자가 디자인한 탈이 오버레이된 실시간 화면
	- 본문 하단: 춤사위 가이드(시연 아바타나 실루엣)
	- 액션: 별도 버튼 없음(체험 중). 자동으로 진행하며, 화면 타임아웃이 발동하면 정상 진행으로 다음 단계로 넘어감
- **핵심 UI 컴포넌트**
	- AR 카메라 뷰: 사용자 얼굴에 사용자 디자인 탈이 오버레이된 실시간 화면
	- 춤사위 가이드: 따라 출 동작을 보여주는 시연 아바타나 실루엣
	- 신명(興) 게이지: 채점이 쌓일수록 차오르는 상승형 게이지
- **말뚝이 호스트**: 화면 모서리에서 추임새로 호응, 활기찬 표정
- **화면 내 텍스트**: 게이지 라벨 "신명", 안내 "춤사위를 따라 해보세요"

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a vertical 9:16 kiosk touchscreen, full screen.
Korean traditional mask dance (talchum) AR experience screen.
Center: a live AR camera view of a participant wearing a hand-designed Korean traditional mask overlaid on their face, dancing.
Bottom: a dance-move guide with a demonstrator silhouette performing a talchum move, with a caption '춤사위를 따라 해보세요'. The bottom area contains only this dance-move guide; this is a hands-free experience screen with no bottom toolbar, no action buttons, and no extra UI controls.
Top-right: a rising excitement gauge labeled '신명', filling up, festive.
A corner: a Korean Maldukki mask host character cheering with a lively expression.
Background: a traditional madang (outdoor courtyard) stage, lively festival mood.
Art direction: Korean traditional talchum motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability.
All on-screen UI text in Korean (Hangul), rendered exactly as the quoted strings; no English text in the UI.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, any bottom toolbar or action buttons not specified (e.g. sound, camera-switch, dance, retry, home).
```

## 아. Step 5. 기념 촬영 화면

덧뵈기 고유 화면. 사용자가 만든 탈을 쓴 2D 탈 캐릭터가 탈춤 포즈를 취한 옆에서, 맨 얼굴의 사용자가 같이 포즈를 잡아 기념 사진을 촬영함. 탈을 쓴 쪽은 캐릭터뿐이고 사용자는 맨 얼굴이라 둘이 구별됨. 촬영은 버튼 없이 컷마다 주어진 시간이 카운트다운돼 0이 되면 자동으로 찍히고(찰칵), 정해진 촬영 횟수만큼 반복함 (기획서 "카운트다운 촬영", [[덧뵈기 - 나만의 탈춤 기획서#5) Step 5. 기념 촬영]]).

### 1) 화면 설계

- **레이아웃** (고유, 9:16 골격 위 합성 카메라 구성)
	- 헤더 상단: 안내 카피 배너 "같이 포즈를 잡아 보세요"와 잔여 촬영 횟수 배지(예 "3장 남음")를 상단 모서리에
	- 본문(최대 비중): 사용자 카메라 뷰에 2D 탈 캐릭터를 옆에 합성해 한 장 사진 구도로 보여주고, 그 위에 촬영까지 남은 시간을 큰 카운트다운 숫자로 오버레이(포즈 잡는 유저가 바로 봄)
	- 액션 하단: 비움 (촬영 버튼 없이 시간 0에 자동 촬영). 카운트다운은 본문 오버레이로, 잔여 횟수는 상단 배지로 분산
- **핵심 UI 컴포넌트**
	- 카메라 뷰: 맨 얼굴의 사용자 (탈을 쓰지 않음)
	- 2D 탈 캐릭터: 사용자가 만든 탈을 쓰고 덧뵈기 탈옷을 입은 채 탈춤 포즈를 취함
	- 카운트다운 오버레이 (본문 위 큰 숫자): 촬영까지 남은 시간을 표시, 0이 되면 자동 촬영(찰칵)하고 다음 컷으로. 컷당 예 3초에서 0까지(확인 필요, [[덧뵈기 - 나만의 탈춤 기획서]] §4 파라미터). 별도 촬영 버튼 없음
	- 잔여 촬영 횟수 배지 (상단 모서리): "N장 남음". 카운트다운 숫자와 분리해 혼동 방지
- **말뚝이 호스트**: 촬영을 거들며 분위기를 돋움 (선택, 작게 두거나 숨김). 사진 합성 프레임 밖 UI 요소로만 두고 카메라 뷰 안에 탈 쓴 사람을 더 넣지 않음 (사용자와 2D 캐릭터 구분 보존)
- **화면 내 텍스트**: 안내 "같이 포즈를 잡아 보세요", 촬영까지 남은 시간 카운트다운 숫자, 잔여 촬영 횟수(예 "3장 남음")

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a vertical 9:16 kiosk touchscreen, full screen.
The commemorative photo capture screen of a Korean traditional mask dance (talchum) experience.
A single composite frame: a live camera view of a real user with a bare face and NO mask, posing next to a 2D mask character (the character wears the user-designed Korean traditional mask and a deotboegi talchum costume, striking a talchum pose) composited right beside the user so they pose together in one shot. Only the 2D character wears a mask; the real user's face is bare and clearly human, so the two are easy to tell apart.
Top header: a caption banner '같이 포즈를 잡아 보세요' across the top, and a small remaining-shots badge in a top corner labeled '장 남음' (e.g. '3장 남음').
Overlaid on the camera view, a single large prominent countdown number (example '3', ticking 3 -> 2 -> 1 -> 0) for the seconds until the automatic capture, placed where the posing user can see it and visually distinct from the remaining-shots badge.
Bottom action area: empty, with NO capture button or shutter button anywhere (the photo auto-fires when the countdown reaches zero).
Optionally, a small non-photographic Maldukki mascot icon may appear as a UI element outside the camera/composite frame (can be omitted); it must NOT be a masked person inside the camera view. The camera view contains exactly two figures: the bare-faced user and the single 2D mask character. No additional masked people or faces anywhere in the camera view.
Background: a traditional madang stage, a festive celebratory mood.
Art direction: Korean traditional talchum motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability.
All on-screen UI text in Korean (Hangul), rendered exactly as the quoted strings; numbers stay numeric; no English text in the UI.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, a mask on the real user's face, any extra masked person or face in the camera view besides the single 2D mask character, any capture or shutter button (capture is automatic on the countdown), and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 자. Step 5. 생성 대기 화면

공용 화면(대기, [[시범콘텐츠 공통 사양#5. 공통 화면]] 다). 기념 사진과 (영상 동의 시) 리플레이 영상을 만드는 동안 노출함.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.다 대기 준용. 본문 중앙에 진행 인디케이터와 생성 중 안내, 대기 콘텐츠를 둠. 헤더와 액션은 비움. 두 타임아웃 미적용. 말뚝이는 선택 노출
- **핵심 UI 컴포넌트**: 진행 인디케이터, 사진과 영상 생성 중 안내, 대기 콘텐츠
- **말뚝이 호스트**: 대기 동안 흥을 돋움 (선택 노출)
- **화면 내 텍스트**: 안내 "결과물을 만드는 중", 진행률

### 2) 프롬프트 (영어, §12 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#12. 공용 화면 예시 이미지]] 다.4) 대기 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 9:16 body-centered layout and the position and size of every element (progress indicator, status caption, host). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum) experience, without moving or resizing them:
- the generic host silhouette -> a Korean Maldukki mask host keeping up the mood during the wait (can be omitted)
- background -> a traditional madang stage, an anticipatory waiting mood
Keep the status caption '결과물을 만드는 중' indicating a commemorative photo and a short-form video are being created.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability.
All on-screen UI text in Korean (Hangul), rendered exactly as the quoted strings; no English text in the UI.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 차. Step 6. 결과물 미리보기 화면

덧뵈기 고유 화면. 완성된 기념 사진과 리플레이 영상을 미리 봄.

### 1) 화면 설계

- **레이아웃** (고유, 9:16 골격 위 카드 구성)
	- 헤더: 타이틀
	- 본문: 기념 사진 카드와 리플레이 영상 카드를 상하 또는 좌우로 나란히 배치
	- 액션 하단: 다음 버튼
- **핵심 UI 컴포넌트**
	- 기념 사진 미리보기: 2D 탈 캐릭터와 사용자가 같이 포즈 (점수 스탬프 없음)
	- 리플레이 영상 미리보기: 세로형 숏폼 재생 썸네일 (신명 게이지 점수와 등급 스탬프 포함)
	- "다음" 버튼
- **말뚝이 호스트**: 모서리에서 결과를 자랑하듯 (선택)
- **화면 내 텍스트**: 타이틀 "결과물 미리보기", 버튼 "다음"

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a vertical 9:16 kiosk touchscreen, full screen.
The result preview screen of a Korean traditional mask dance (talchum) experience.
Title: '결과물 미리보기'.
Layout: a commemorative photo card (a 2D mask character and the user posing together, no score stamp) next to a vertical short-form replay video card (with an excitement score and grade stamp), with a button labeled '다음' at the bottom.
To one side: a Korean Maldukki mask host reacting proudly to the result (can be omitted).
Background: a traditional madang stage, a proud showcase mood.
Art direction: Korean traditional talchum motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability.
All on-screen UI text in Korean (Hangul), rendered exactly as the quoted strings; no English text in the UI.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 카. Step 6. 연락처 입력과 전송 화면

공용 화면(전송, [[시범콘텐츠 공통 사양#5. 공통 화면]] 라). 연락처를 받아 결과물 링크를 SMS로 보냄.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.라 전송 준용. 본문에 연락처 입력 필드와 숫자 키패드, 전송 동의 토글을 둠. 액션에 전송 버튼과 받지 않기 보조 버튼을 둠. 화면 타임아웃 미적용. 말뚝이는 작게 두거나 숨김. 옵트인 시 학습 토큰(QR) 발급 안내를 한쪽에 둠
- **핵심 UI 컴포넌트**
	- 전화번호 입력 필드와 숫자 키패드
	- 전송 동의 토글
	- "전송"과 "받지 않기" 버튼
	- 학습 토큰(QR) 발급 안내 (옵트인 시)
- **말뚝이 호스트**: 모서리에 작게 두거나 숨김 (폼 가독성 우선)
- **화면 내 텍스트**: 안내 "연락처를 입력하면 링크를 보내드려요", 버튼 "전송" "받지 않기"

### 2) 프롬프트 (영어, §12 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#12. 공용 화면 예시 이미지]] 다.5) 전송 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 9:16 header/body/action regions and the position and size of every element (caption, phone-number field, numeric keypad, send-consent toggle, send/decline buttons, host). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum) experience, without moving or resizing them:
- the generic host silhouette -> a small Korean Maldukki mask host in a corner (can be omitted)
- background -> a calm traditional madang stage
- add a learning-token QR issuing area to one side
Keep caption '연락처를 입력하면 링크를 보내드려요', buttons '전송' and '받지 않기'.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability.
All on-screen UI text in Korean (Hangul), rendered exactly as the quoted strings; numbers stay numeric; no English text in the UI.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 타. Step 7. 마무리 인사 화면

공용 화면(종료, [[시범콘텐츠 공통 사양#5. 공통 화면]] 마). 마무리 인사 뒤 시작 화면으로 복귀함.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.마 종료 준용. 본문 중앙에 말뚝이의 작별 인사와 마무리 메시지를 크게 둠. 액션은 없음(자동으로 시작 화면 복귀). 말뚝이가 중심
- **핵심 UI 컴포넌트**: 마무리 인사 메시지, 말뚝이 작별 연출
- **말뚝이 호스트**: 중심에서 정겹게 작별 인사
- **화면 내 텍스트**: 인사 "또 만나요"

### 2) 프롬프트 (영어, §12 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#12. 공용 화면 예시 이미지]] 다.6) 종료 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 9:16 body-centered layout and the position and size of every element (host at center, closing message). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum) experience, without moving or resizing them:
- the generic host silhouette -> a Korean Maldukki mask host character giving a warm farewell
- background -> a traditional madang stage, a warm closing mood
Keep the closing message '또 만나요'.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability.
All on-screen UI text in Korean (Hangul), rendered exactly as the quoted strings; no English text in the UI.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

# 4. 관련 문서

- [[덧뵈기 - 나만의 탈춤 기획서]]: 콘텐츠 로직과 Step 명세 정본
- [[시범콘텐츠 공통 사양]]: 공통 화면 레이아웃(§5)과 진행 호스트(§6) 골격 정본
