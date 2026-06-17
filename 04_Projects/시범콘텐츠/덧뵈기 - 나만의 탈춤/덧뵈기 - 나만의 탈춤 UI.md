---
title: 덧뵈기 - 나만의 탈춤 UI
type: project
status: draft
tags: [project, kocca, 시범콘텐츠, 덧뵈기, UI]
created: 2026-06-15
updated: 2026-06-17
---

> 덧뵈기 AR 탈춤 체험의 키오스크 UI 예시 이미지를 ChatGPT 이미지 생성으로 만들기 위한 프롬프트 모음. [[덧뵈기 - 나만의 탈춤 기획서]]의 Step별 명세와 화면 구성을 근거로 작성함. 화면 총 11개이며, Step 4를 기준으로 양식을 잡고 나머지를 채워나감.

# 1. 개요

- **목적**: 화면별 ChatGPT 이미지 생성 프롬프트를 정리해 UI 예시 이미지를 만듦
- **대상 화면**: 11개 (기획서 [[덧뵈기 - 나만의 탈춤 기획서#사. 콘텐츠 자산]], 잠정값)
- **공통 규격**: 9:16 세로 키오스크, 실사풍 UI 목업, 영어 프롬프트 (이미지 내 UI 텍스트는 한글로 렌더링)
- **사용법**: §2 공통 양식을 앞부분에 두고, §3 화면별 변수를 채워 한 프롬프트로 합침
- **텍스트 주의**: 이미지 안 모든 UI 텍스트를 한글로 렌더링하도록 영어 프롬프트에 정확한 문구를 명시함. 한글 렌더링이 불완전할 수 있어 필요 시 재생성하거나 디자인 단계에서 보정함

# 2. 공통 프롬프트 양식

모든 화면 프롬프트가 공유하는 고정부와, 화면마다 채우는 변수 슬롯을 정의함.

## 가. 공통 제약 (모든 화면 공유)

- **매체와 형식**: 키오스크 터치스크린 UI 화면 목업, 풀스크린, 실사풍 고해상도
- **화면비와 규격**: 9:16 세로 (1080x1920 기준)
- **아트 디렉션 (제안, 확정 필요)**: 한국 전통 탈춤(덧뵈기) 모티프와 현대 키오스크 UI의 결합. 오방색과 단청 계열 포인트 컬러, 한지와 목재 질감을 절제해 사용
- **전통 정합성**: 한국 탈춤 탈 양식 유지, 일본 노멘(일본 가면극 가면)이나 중국 가면과 혼동 금지 (기획서 [[덧뵈기 - 나만의 탈춤 기획서#가. 탈 디자인 도구 (Step 2)]])
- **톤과 무드**: 마당놀이 축제의 신명, 밝고 활기차며 친근함
- **UI 원칙**: 큰 터치 타깃, 명확한 시각 위계, 노년층 포함 가독성
- **화면 내 텍스트**: 정확한 한글 카피를 영어 프롬프트에 명시해 이미지에 한글로 렌더링함

## 나. 화면별 변수 슬롯

화면마다 아래 6개 슬롯을 채움.

1. **화면 목적**: 이 화면이 무엇을 하는 화면인지 한 줄
2. **레이아웃과 구도**: 주요 영역 배치
3. **핵심 UI 컴포넌트**: 이 화면 고유 요소
4. **말뚝이 호스트**: 위치, 상태, 표정 (없으면 생략)
5. **배경과 분위기**: 무대와 무드
6. **화면 내 텍스트**: 이미지에 한글로 렌더링할 정확한 문구

## 다. 부정 프롬프트

모든 화면에 공통 적용함.

- 깨지거나 왜곡된 한글, UI 내 영어 텍스트
- 기형 손과 얼굴, 워터마크와 서명
- 저작권 캐릭터
- 일본 노멘(일본 가면극 가면)이나 중국 가면과 혼동되는 형태

# 3. 화면별 프롬프트

말뚝이 호스트의 구체 비주얼은 미확정이라(기획서 [[덧뵈기 - 나만의 탈춤 기획서#마. 말뚝이 진행 호스트]], 확인 필요) 전 화면에서 "말뚝이 탈 호스트 캐릭터"로만 묘사함. 말뚝이 슬롯이 "선택"인 화면은 폼이나 작업 집중이 우선이라 말뚝이를 작게 두거나 생략함. Step 4 다음은 Step 진행 순서로 배열함.

## 가. Step 4. AR 춤사위 체험 (기준 화면)

기획서 근거: [[덧뵈기 - 나만의 탈춤 기획서#4) Step 4. AR 착용 + 춤사위 따라하기 (핵심 체험)]]. AR 카메라 뷰, 춤사위 가이드, 신명 게이지, 말뚝이를 함께 표시함.

### 1) 화면 변수 (슬롯 값)

- **화면 목적**: 사용자가 자기 탈을 AR로 쓰고 풍물 장단에 맞춰 춤사위를 따라 추는 핵심 체험 화면
- **레이아웃과 구도**: 중앙에 AR 카메라 뷰, 하단에 춤사위 가이드, 우상단에 신명 게이지, 한쪽 모서리에 말뚝이
- **핵심 UI 컴포넌트**
	- AR 카메라 뷰: 사용자 얼굴에 사용자가 디자인한 전통 탈이 오버레이된 실시간 화면
	- 춤사위 가이드: 따라 출 탈춤 동작을 보여주는 시연 아바타나 실루엣
	- 신명(興) 게이지: 채점이 쌓일수록 차오르는 상승형 게이지
- **말뚝이 호스트**: 화면 모서리에서 추임새로 호응하는 말뚝이 탈 캐릭터, 활기찬 표정 (구체 비주얼은 기획서 [[덧뵈기 - 나만의 탈춤 기획서#마. 말뚝이 진행 호스트]]에서 미확정, 확인 필요)
- **배경과 분위기**: 전통 마당놀이 무대, 신명 나는 축제 분위기
- **화면 내 텍스트**: 게이지 라벨 "신명", 안내 "춤사위를 따라 해보세요"

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a vertical 9:16 kiosk touchscreen, full screen.
Korean traditional mask dance (talchum) AR experience screen.
Center: a live AR camera view of a participant wearing a hand-designed Korean traditional mask overlaid on their face, dancing.
Bottom: a dance-move guide with a demonstrator silhouette performing a talchum move, with a caption '춤사위를 따라 해보세요'.
Top-right: a rising excitement gauge labeled '신명', filling up, festive.
A corner: a Korean Maldukki mask host character cheering with a lively expression.
Background: a traditional madang (outdoor courtyard) stage, lively festival mood.
Art direction: Korean traditional talchum motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability.
All on-screen UI text in Korean (Hangul), rendered exactly as the quoted strings; no English text in the UI.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks.
```

## 나. Step 1. 시작 화면

기획서 근거: [[덧뵈기 - 나만의 탈춤 기획서#1) Step 1. 인트로 (시작 + 동의)]]. 대기 상태에서 유저를 맞이하는 화면이며, Step 7 복귀 화면과 동일 자산임.

### 1) 화면 변수 (슬롯 값)

- **화면 목적**: 대기 상태에서 관람객을 맞이하고 체험을 시작시킴. 재방문 옵트인 학습자는 이어하기로 키오스크 카메라에 학습 토큰(QR)을 비추면 진척과 동의 기록이 복원돼 동의 약관 없이 바로 체험으로 진입함
- **레이아웃과 구도**: 중앙에 큰 시작 버튼과 타이틀, 그 아래 작은 이어하기 버튼, 한쪽에 손짓하는 말뚝이
- **핵심 UI 컴포넌트**: 큰 "시작하기" 터치 버튼, 보조 "이어하기" 버튼 (재방문 옵트인 학습자의 학습 토큰 QR 스캔 진입), 콘텐츠 타이틀, 탈춤 대표 비주얼
- **말뚝이 호스트**: 중앙이나 한쪽에서 손짓하며 환영, 밝은 표정
- **배경과 분위기**: 화려한 전통 마당놀이 무대, 축제 어트랙트 분위기
- **화면 내 텍스트**: 타이틀 "나만의 탈춤", 버튼 "시작하기"와 "이어하기"

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a vertical 9:16 kiosk touchscreen, full screen.
The start (attract) screen of a Korean traditional mask dance (talchum) experience kiosk.
Center: a large primary touch button labeled '시작하기' and a content title '나만의 탈춤', with a small secondary button labeled '이어하기' below.
To one side: a Korean Maldukki mask host character welcoming visitors with a beckoning gesture and a bright expression.
Background: a vibrant traditional madang stage, festive attract mood.
Art direction: Korean traditional talchum motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability.
All on-screen UI text in Korean (Hangul), rendered exactly as the quoted strings; no English text in the UI.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks.
```

## 다. Step 1. 가이드 화면

기획서 근거: [[덧뵈기 - 나만의 탈춤 기획서#1) Step 1. 인트로 (시작 + 동의)]]. 인사말과 체험 진행 방법을 안내함.

### 1) 화면 변수 (슬롯 값)

- **화면 목적**: 말뚝이가 인사하고 체험 흐름을 안내함
- **레이아웃과 구도**: 말뚝이 중심, 진행 단계 안내 일러스트, 다음 버튼
- **핵심 UI 컴포넌트**: 진행 흐름 안내 일러스트(탈 디자인, AR 춤, 촬영, 공유), "다음" 버튼
- **말뚝이 호스트**: 화자로 등장해 설명, 재담하는 표정
- **배경과 분위기**: 전통 마당 무대, 친근하고 활기찬 분위기
- **화면 내 텍스트**: 인사말 "어서 오세요"(표본 카피), 버튼 "다음"

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a vertical 9:16 kiosk touchscreen, full screen.
The guide (onboarding) screen of a Korean traditional mask dance (talchum) experience.
Center: an instructional illustration of the flow (mask design, AR dance, photo, share) and a button labeled '다음'.
Top: a greeting '어서 오세요'.
Front: a Korean Maldukki mask host character acting as the narrator, with a lively storytelling expression.
Background: a traditional madang stage, friendly mood.
Art direction: Korean traditional talchum motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability.
All on-screen UI text in Korean (Hangul), rendered exactly as the quoted strings; no English text in the UI.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks.
```

## 라. Step 1. 동의 약관 화면

기획서 근거: [[덧뵈기 - 나만의 탈춤 기획서#1) Step 1. 인트로 (시작 + 동의)]]. 필수와 선택 동의를 받음. 학습 토큰 복원 스캔은 시작 화면의 이어하기에서 처리함.

### 1) 화면 변수 (슬롯 값)

- **화면 목적**: 카메라 촬영(필수)과 영상 산출물, 학습 프로필(선택) 동의를 받음. 필수 카메라 동의 시에만 진행 버튼이 활성화됨
- **레이아웃과 구도**: 약관 텍스트 영역과 동의 토글 목록, 하단 동의하고 시작 버튼과 그만두기 보조 버튼
- **핵심 UI 컴포넌트**
	- 동의 항목 토글: 필수 카메라 촬영, 선택 영상 녹화와 생성, 선택 학습 프로필
	- 주 버튼 "동의하고 시작": 필수 카메라 촬영 토글이 켜져야 활성화됨 (꺼져 있으면 비활성)
	- 보조 "그만두기" 버튼: 동의하지 않고 Step 7로 종료함
- **말뚝이 호스트**: 모서리에 작게 또는 생략 (선택)
- **배경과 분위기**: 차분한 마당, 폼 가독성 우선
- **화면 내 텍스트**: 타이틀 "이용 동의"(표본), 항목 "카메라 촬영 (필수)" "영상 생성 (선택)" "학습 기록 (선택)"(표본), 버튼 "동의하고 시작", "그만두기"

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a vertical 9:16 kiosk touchscreen, full screen.
The consent screen of a Korean traditional mask dance (talchum) experience.
Layout: a title '이용 동의', a terms text area, a list of consent toggles labeled '카메라 촬영 (필수)' (shown ON), '영상 생성 (선택)', '학습 기록 (선택)', a primary bottom button labeled '동의하고 시작' (active), and a small secondary button labeled '그만두기'.
A calm, form-readable layout with a small Korean Maldukki mask host in a corner (can be omitted).
Background: a calm traditional madang stage.
Art direction: Korean traditional talchum motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability.
All on-screen UI text in Korean (Hangul), rendered exactly as the quoted strings; no English text in the UI.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks.
```

## 마. Step 2. 탈 디자인 도구 화면

기획서 근거: [[덧뵈기 - 나만의 탈춤 기획서#2) Step 2. 탈 디자인]]. 사용자가 자기 탈을 디자인하는 화면임. 디자인 방식은 드로잉형(배역 탈 템플릿 시작점)이며, 상세는 기획서 [[덧뵈기 - 나만의 탈춤 기획서#가. 탈 디자인 도구 (Step 2)]].

### 1) 화면 변수 (슬롯 값)

- **화면 목적**: 사용자가 배역 탈 양식을 바탕으로 자기 탈을 디자인함
- **레이아웃과 구도**: 2개 로우. 1번 로우는 2칼럼으로 왼쪽에 좁은 경량 3D 미리보기, 오른쪽에 넓은 탈 도안 캔버스 (약 1:3, 캔버스 우세, 1:1 아님). 2번 로우는 전체 폭 1칼럼으로 도구 패널 전체. 최하단에 완료 버튼 고정
- **핵심 UI 컴포넌트**
	- 탈 도안 캔버스: 고해상도 드로잉으로 디자인 중인 전통 탈 (도트 픽셀 아님)
	- 도구 패널: 배역 탈 템플릿과 프리셋, 제한 팔레트, 도형과 전통 문양 스탬프, 대칭 모드 토글
	- 경량 3D 미리보기: 그린 도안을 3D 탈에 입힌 실시간 미리보기 패널 (작게, 정식 변환은 Step 3)
	- "완료" 버튼
- **말뚝이 호스트**: 모서리에 작게 또는 생략 (선택)
- **배경과 분위기**: 작업 집중용 차분한 배경
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
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks.
```

## 바. Step 3. 변환 대기 화면

기획서 근거: [[덧뵈기 - 나만의 탈춤 기획서#3) Step 3. 3D 변환 + 대기 화면]]. 2D 도안을 3D 탈로 변환하는 동안 진행을 보여줌.

### 1) 화면 변수 (슬롯 값)

- **화면 목적**: 3D 변환이 끝날 때까지 진행을 보여주며 기다리게 함
- **레이아웃과 구도**: 중앙 진행 표시와 변환 중 탈 프리뷰
- **핵심 UI 컴포넌트**: 진행 인디케이터(원형이나 바), 변환 중인 탈 비주얼, 안내 문구
- **말뚝이 호스트**: 대기 동안 추임새로 흥을 돋움 (선택)
- **배경과 분위기**: 전통 마당, 기대감 있는 대기 분위기
- **화면 내 텍스트**: 안내 "탈을 빚는 중", 진행률

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a vertical 9:16 kiosk touchscreen, full screen.
The 3D conversion loading screen of a Korean traditional mask dance (talchum) experience.
Center: a progress indicator (circular or bar) and a preview of a Korean traditional mask being converted into 3D, with a status caption '탈을 빚는 중'.
To one side: a Korean Maldukki mask host keeping up the mood during the wait (can be omitted).
Background: a traditional madang stage, an anticipatory waiting mood.
Art direction: Korean traditional talchum motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability.
All on-screen UI text in Korean (Hangul), rendered exactly as the quoted strings; no English text in the UI.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks.
```

## 사. Step 5. 기념 촬영 화면

기획서 근거: [[덧뵈기 - 나만의 탈춤 기획서#5) Step 5. 기념 촬영]]. 2D 탈 캐릭터와 사용자가 같이 포즈를 잡아 기념 사진을 촬영함.

### 1) 화면 변수 (슬롯 값)

- **화면 목적**: 2D 탈 캐릭터가 탈춤 포즈를 취한 가운데, AR로 자기 탈을 쓴 사용자가 옆에서 같이 포즈를 잡아 기념 사진을 촬영함
- **레이아웃과 구도**: 사용자 카메라 뷰에 2D 탈 캐릭터를 옆에 합성해 한 장 사진 구도로 함께 보여줌, 하단에 촬영 버튼과 카운트다운
- **핵심 UI 컴포넌트**
	- 카메라 뷰: AR 탈을 쓴 사용자
	- 2D 탈 캐릭터: 사용자가 만든 탈을 쓰고 덧뵈기 탈옷을 입은 채 탈춤 포즈를 취함
	- 촬영 버튼과 카운트다운 인디케이터
- **말뚝이 호스트**: 촬영을 거들며 분위기를 돋움 (선택)
- **배경과 분위기**: 전통 마당 무대, 흥겹고 기념하는 분위기
- **화면 내 텍스트**: 안내 "같이 포즈를 잡아 보세요", 버튼 "촬영", 카운트다운 숫자

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a vertical 9:16 kiosk touchscreen, full screen.
The commemorative photo capture screen of a Korean traditional mask dance (talchum) experience.
A single composite frame: a live camera view of a user wearing an AR Korean traditional mask, with a 2D mask character (wearing the user-designed mask and a deotboegi talchum costume, striking a talchum pose) composited right beside the user so they pose together in one shot.
Bottom: a capture button and a numeric countdown, with a caption '같이 포즈를 잡아 보세요'.
To one side: a Korean Maldukki mask host helping with the photo (can be omitted).
Background: a traditional madang stage, a festive celebratory mood.
Art direction: Korean traditional talchum motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability.
All on-screen UI text in Korean (Hangul), rendered exactly as the quoted strings; numbers stay numeric; no English text in the UI.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks.
```

## 아. Step 5. 생성 대기 화면

기획서 근거: [[덧뵈기 - 나만의 탈춤 기획서#5) Step 5. 기념 촬영]]. 기념 사진과 리플레이 영상을 만드는 동안 노출함.

### 1) 화면 변수 (슬롯 값)

- **화면 목적**: 기념 사진과 (영상 동의 시) 숏폼 영상 생성과 인코딩이 끝날 때까지 기다리게 함
- **레이아웃과 구도**: 중앙 진행 표시와 생성 중 안내
- **핵심 UI 컴포넌트**: 진행 인디케이터, 사진과 영상 생성 중 안내, 대기 콘텐츠
- **말뚝이 호스트**: 대기 동안 흥을 돋움 (선택)
- **배경과 분위기**: 전통 마당, 기대감 있는 대기 분위기
- **화면 내 텍스트**: 안내 "결과물을 만드는 중", 진행률

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a vertical 9:16 kiosk touchscreen, full screen.
The result generation loading screen of a Korean traditional mask dance (talchum) experience.
Center: a progress indicator and a status caption '결과물을 만드는 중' indicating a commemorative photo and a short-form video are being created.
To one side: a Korean Maldukki mask host keeping up the mood during the wait (can be omitted).
Background: a traditional madang stage, an anticipatory waiting mood.
Art direction: Korean traditional talchum motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability.
All on-screen UI text in Korean (Hangul), rendered exactly as the quoted strings; no English text in the UI.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks.
```

## 자. Step 6. 결과물 미리보기 화면

기획서 근거: [[덧뵈기 - 나만의 탈춤 기획서#6) Step 6. 결과물 전송]]. 완성된 기념 사진과 리플레이 영상을 미리 봄.

### 1) 화면 변수 (슬롯 값)

- **화면 목적**: 완성된 기념 사진과 리플레이 영상을 미리 보여줌
- **레이아웃과 구도**: 기념 사진 카드와 리플레이 영상 카드를 나란히 또는 상하 배치, 하단 다음 버튼
- **핵심 UI 컴포넌트**
	- 기념 사진 미리보기: 2D 탈 캐릭터와 사용자가 같이 포즈 (점수 스탬프 없음)
	- 리플레이 영상 미리보기: 세로형 숏폼 재생 썸네일 (신명 게이지 점수와 등급 스탬프 포함)
	- "다음" 버튼
- **말뚝이 호스트**: 모서리에서 결과를 자랑하듯 (선택)
- **배경과 분위기**: 전통 마당, 결과를 뽐내는 분위기
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
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks.
```

## 차. Step 6. 연락처 입력과 전송 화면

기획서 근거: [[덧뵈기 - 나만의 탈춤 기획서#6) Step 6. 결과물 전송]]. 연락처를 받아 결과물 링크를 SMS로 보냄.

### 1) 화면 변수 (슬롯 값)

- **화면 목적**: 연락처와 전송 동의를 받아 결과물 링크를 SMS로 보냄
- **레이아웃과 구도**: 연락처 입력 필드와 숫자 키패드, 전송 동의 토글, 하단 전송과 거부 버튼
- **핵심 UI 컴포넌트**
	- 전화번호 입력 필드와 숫자 키패드
	- 전송 동의 토글
	- "전송"과 "받지 않기" 버튼
	- 학습 토큰(QR) 발급 안내 (옵트인 시)
- **말뚝이 호스트**: 모서리에 작게 또는 생략 (선택)
- **배경과 분위기**: 차분한 마당, 폼 가독성 우선
- **화면 내 텍스트**: 안내 "연락처를 입력하면 링크를 보내드려요", 버튼 "전송" "받지 않기"

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a vertical 9:16 kiosk touchscreen, full screen.
The contact entry and send screen of a Korean traditional mask dance (talchum) experience.
Layout: a caption '연락처를 입력하면 링크를 보내드려요', a phone number input field with a numeric keypad, a send-consent toggle, bottom buttons labeled '전송' and '받지 않기', and a learning-token QR issuing area to one side.
A calm, form-readable layout with a small Korean Maldukki mask host in a corner (can be omitted).
Background: a calm traditional madang stage.
Art direction: Korean traditional talchum motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability.
All on-screen UI text in Korean (Hangul), rendered exactly as the quoted strings; numbers stay numeric; no English text in the UI.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks.
```

## 카. Step 7. 마무리 인사 화면

기획서 근거: [[덧뵈기 - 나만의 탈춤 기획서#7) Step 7. 종료와 리셋]]. 마무리 인사 뒤 시작 화면으로 복귀함.

### 1) 화면 변수 (슬롯 값)

- **화면 목적**: 체험을 마치며 작별 인사를 하고 다음 유저용 시작 화면으로 복귀함
- **레이아웃과 구도**: 말뚝이 중심의 작별 인사와 마무리 메시지
- **핵심 UI 컴포넌트**: 마무리 인사 메시지, 말뚝이 작별 연출
- **말뚝이 호스트**: 중심에서 정겹게 작별 인사
- **배경과 분위기**: 전통 마당, 따뜻한 마무리 분위기
- **화면 내 텍스트**: 인사 "또 만나요"

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a vertical 9:16 kiosk touchscreen, full screen.
The closing farewell screen of a Korean traditional mask dance (talchum) experience.
Center: a Korean Maldukki mask host character giving a warm farewell, with a closing message '또 만나요'.
Background: a traditional madang stage, a warm closing mood.
Art direction: Korean traditional talchum motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability.
All on-screen UI text in Korean (Hangul), rendered exactly as the quoted strings; no English text in the UI.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks.
```

# 4. 관련 문서

- [[덧뵈기 - 나만의 탈춤 기획서]]
- [[시범콘텐츠 공통 사양]]
