---
title: 덜미 - 나만의 유람기 UI
type: project
status: draft
tags: [project, kocca, 시범콘텐츠, 덜미, UI]
created: 2026-07-01
updated: 2026-07-21
---

> 덜미(꼭두각시놀음) 전자책 생성 키오스크의 화면별 UI 설계. 각 화면의 레이아웃(16:9 영역 배치)과 예시 이미지 생성 프롬프트를 함께 담음. 공용 화면(인트로, 대기, 종료)은 [[시범콘텐츠 공통 사양#5. 공통 화면]] 표준을 따르고, 고유 화면(이름 입력, 캐릭터 카드, 마당 선택, 박첨지 문답, 결과물 감상)은 레이아웃을 상세 설계함. 카메라를 쓰지 않아 전 화면이 터치라 도달 존을 엄격히 적용함. 기획은 [[덜미 - 나만의 유람기 기획서]].

# 1. 개요

- **목적**: 화면별 UI 레이아웃을 설계하고 예시 이미지 생성 프롬프트를 정리함
- **문서 성격**: 레이아웃 기획과 이미지 생성 프롬프트를 함께 담음. 레이아웃은 [[시범콘텐츠 공통 사양#5. 공통 화면]]의 16:9 영역 골격을 따름
- **대상 화면**: 11개. Step 순으로 배열함([[#2.1 화면 목록과 분류]])
- **공용과 고유**: 공용 화면 6개는 콘텐츠 무관 표준을 참조하고 덜미 고유분(박첨지, 인형 비주얼, 카피)만 더함. 6개 모두 [[시범콘텐츠 공통 사양#5. 공통 화면]] 세션 표준을 정본으로 함(실패 안내 화면 포함). 덜미 고유 화면 5개는 레이아웃을 상세 설계함. 결과물 받기(QR)는 감상 화면이 아니라 완주 시 마무리 인사 화면에서 하므로 [[시범콘텐츠 공통 사양#5.4 결과물 감상]] 전송 공용 화면은 쓰지 않음
- **입력 특성**: 카메라를 쓰지 않고 터치와 음성(STT)만 씀(하드웨어 정본은 [[디바이스 사양]]). 따라서 카메라/모션 화면 예외가 없고, 전 화면에서 터치 조작 요소를 중앙 도달 존([[시범콘텐츠 공통 사양#5.1 공통 영역 골격 (16:9 가로)]] 도달성)에 둠
- **공통 규격**: 16:9 가로 키오스크, 실사풍 UI 목업, 영어 프롬프트. 이미지 안 UI 텍스트는 한글로 렌더링함
- **사용법**: [[시범콘텐츠 공통 사양#12. 공용 화면 예시 이미지]]에 중립 레이아웃 이미지가 있는 공용 화면 6개는 그 이미지를 첨부해 참조 이미지 기반으로 생성하고, 중립 이미지가 없는 화면 3개(캐릭터 카드, 마당 선택, 결과물 감상)는 [[#2.3 공통 프롬프트 양식]] 제약에 화면별 프롬프트를 이어 붙여 생성함. 생성 방식은 분류(공용/고유)와 별개 축임 (방식 구분은 [[#2.3 공통 프롬프트 양식]])
- **텍스트 주의 (후편집)**: 이미지에는 UI 텍스트를 렌더링하지 않음. 타이틀, 버튼, 카피 등 모든 텍스트 영역을 빈 자리로 두고 실제 문구는 후편집(Figma)으로 넣음(2026-07-02 결정). 문서와 프롬프트의 한글 문구는 후편집용 참조 카피이며 이미지에 박지 않음. AI 한글 렌더 불안정 문제도 이로써 회피함

# 2. 공통 설계

## 2.1 화면 목록과 분류

화면을 Step 순으로 정리함. 분류는 공용(공유 화면)과 덜미 고유로 나눔. 공용은 [[시범콘텐츠 공통 사양#5. 공통 화면]] 세션 화면을 포함함.

| 순서 | 화면 | Step | 분류 | 기획서 근거 |
| --- | --- | --- | --- | --- |
| 가 | 시작 화면 | Step 1 | 공용 (인트로, [[시범콘텐츠 공통 사양#5.2 인트로 (시작 + 동의)]]) | [[덜미 - 나만의 유람기 기획서#4.1 Step 1. 인트로]] |
| 나 | 가이드 화면 | Step 1 | 공용 (인트로, [[시범콘텐츠 공통 사양#5.2 인트로 (시작 + 동의)]]) | [[덜미 - 나만의 유람기 기획서#4.1 Step 1. 인트로]] |
| 다 | 이용 동의 화면 | Step 1 | 공용 (인트로, [[시범콘텐츠 공통 사양#5.2 인트로 (시작 + 동의)]]) | [[덜미 - 나만의 유람기 기획서#4.1 Step 1. 인트로]] |
| 라 | 마당 유형 선택 화면 | Step 2 | 덜미 고유 | [[덜미 - 나만의 유람기 기획서#4.2 Step 2. 마당 유형 선택]] |
| 마 | 캐릭터 카드 선택 화면 | Step 3 | 덜미 고유 | [[덜미 - 나만의 유람기 기획서#4.3 Step 3. 주인공 설정]] |
| 바 | 이름 입력 화면 | Step 3 | 덜미 고유 | [[덜미 - 나만의 유람기 기획서#4.3 Step 3. 주인공 설정]] |
| 사 | 박첨지 문답 화면 | Step 4 | 덜미 고유 (핵심) | [[덜미 - 나만의 유람기 기획서#4.4 Step 4. 플롯 문답]] |
| 아 | 생성 대기 화면 | Step 5 | 공용 (대기, [[시범콘텐츠 공통 사양#5.3 생성과 변환 대기]]) | [[덜미 - 나만의 유람기 기획서#4.5 Step 5. 결과물 생성과 대기 화면 (병행)]] |
| 자 | 결과물 감상 화면 | Step 6 | 덜미 고유 | [[덜미 - 나만의 유람기 기획서#4.6 Step 6. 결과물 감상]] |
| 차 | 마무리 인사 화면 | Step 7 | 공용 (종료, [[시범콘텐츠 공통 사양#5.5 종료와 리셋]]) | [[덜미 - 나만의 유람기 기획서#4.7 Step 7. 종료와 리셋]] |
| 카 | 실패 안내 (모달 팝업) | 실패 시(공통) | 공용 (실패 안내, [[시범콘텐츠 공통 사양#5.6 실패 안내 (상황 안내 모달 팝업)]]) | [[시범콘텐츠 공통 사양#5.6 실패 안내 (상황 안내 모달 팝업)]] |

## 2.2 공통 레이아웃

모든 화면은 [[시범콘텐츠 공통 사양#5.1 공통 영역 골격 (16:9 가로)]]을 따름. 헤더(제목과 상태), 본문(주기능), 액션(버튼) 세 영역에 호스트 슬롯(진행 호스트가 들어갈 자리)을 얹는 구조임. 참여자가 화면 앞 가운데 서서 터치하므로 터치 조작 요소는 중앙 도달 존(가운데 폭, 눈높이~허리)에 두고 화면 가장자리는 피함([[시범콘텐츠 공통 사양#5.1 공통 영역 골격 (16:9 가로)]] 도달성). 본 콘텐츠는 카메라를 쓰지 않아 모션/카메라 화면 예외가 없으므로 전 화면에 도달 존을 그대로 적용함. 공용 화면은 [[시범콘텐츠 공통 사양#12. 공용 화면 예시 이미지]] 참조 이미지가 이 배치와 호스트 측면 안내를 이미 담고 있어 그대로 계승함.

- **공용 화면**: [[시범콘텐츠 공통 사양#5. 공통 화면]]의 동작별 표준 레이아웃(인트로, 대기, 결과물 감상, 종료)을 그대로 따르고, 덜미 고유분(박첨지, 인형 비주얼, 한글 카피)만 각 영역에 끼움. 각 화면 설계의 레이아웃 항목에 준용 절을 명시함
- **고유 화면**: 같은 16:9 영역 골격 위에서 덜미 메커닉(이름 입력, 캐릭터 카드, 마당 선택, 박첨지 문답, 결과물 감상)에 맞춰 레이아웃을 상세 설계함. 전부 터치 화면이라 입력 필드, 가상 키보드, 카드, 페이지 넘김 등 조작 요소를 중앙 도달 존에 둠
- **덜미 공통 요소**: 진행 호스트는 박첨지임(역할은 [[덜미 - 나만의 유람기 기획서#3.4 진행 호스트]], 구체 비주얼 미확정이라 전 화면에서 "진행 호스트 캐릭터"로만 묘사). 박첨지는 떠돌이 노인 해설자 인형이라 실사 행인이나 다른 사용자로 오인되지 않게, 공통 화면에서는 박첨지를 중앙 조작 존 옆 여유 공간에 화면 속 안내 캐릭터로 또렷이 두고 유저를 향해 안내하는 포즈로 함([[시범콘텐츠 공통 사양#5.1 공통 영역 골격 (16:9 가로)]] 호스트 슬롯). 박첨지 문답 화면은 박첨지가 화자로 전면에 서는 고유 화면임

## 2.3 공통 프롬프트 양식

모든 화면 프롬프트가 공유하는 고정부(제약과 부정 프롬프트)와, 화면마다 채우는 변수 슬롯을 정의함.

생성 방식은 [[시범콘텐츠 공통 사양#12. 공용 화면 예시 이미지]] 중립 이미지 유무로 갈리며, 분류(공용/고유)와 별개 축임.

- **참조 이미지 기반** (시작, 가이드, 이용 동의, 이름 입력, 박첨지 문답, 대기, 종료, 실패 안내): [[시범콘텐츠 공통 사양#12. 공용 화면 예시 이미지]]의 중립 레이아웃 이미지를 첨부 입력으로 받아, 영역 구조와 요소 배치를 유지하며 중립 플레이스홀더를 덜미 고유 요소(박첨지, 인형 비주얼, 한글 카피)로 치환함. 프롬프트에 첨부 이미지를 명시함. 이름 입력과 박첨지 문답은 텍스트 입력 화면이라 [[시범콘텐츠 공통 사양#12.3.8 텍스트 입력]] 중립 이미지를 씀
- **단독 프롬프트** (캐릭터 카드, 마당 선택, 결과물 감상): 첨부할 중립 이미지가 없어 아래 공통 제약에 화면별 내용을 이어 붙인 단독 완결형 프롬프트로 생성함

### 2.3.1 공통 제약 (모든 화면 공유)

- **매체와 형식**: 키오스크 터치스크린 UI 화면 목업, 풀스크린, 실사풍 고해상도
- **화면비와 규격**: 16:9 가로 (해상도는 디바이스 규격 확정 후, 예: 1920x1080, 확인 필요)
- **아트 디렉션 (제안, 확정 필요)**: 한국 남사당 인형극(덜미, 꼭두각시놀음) 모티프와 현대 키오스크 UI의 결합. 목각 인형 질감과 포장막(인형이 오르는 막 무대) 배경, 오방색과 단청 계열 포인트 컬러, 한지와 목재 질감을 절제해 사용. 진행 호스트(박첨지)는 2D 플랫 일러스트 스타일로 통일함(3D 아님, 2026-07-02 결정)
- **전통 정합성**: 한국 남사당 목각 인형(꼭두각시) 양식 유지, 일본 분라쿠 인형이나 서양 마리오네트와 혼동 금지 ([[덜미 - 나만의 유람기 기획서#4.5 Step 5. 결과물 생성과 대기 화면 (병행)]])
- **톤과 무드**: 마당놀이 축제의 신명, 밝고 활기차며 친근함
- **UI 원칙**: 큰 터치 타깃, 명확한 시각 위계, 노년층 포함 가독성
- **화면 내 텍스트 (후편집)**: 이미지에 텍스트를 렌더링하지 않음. 텍스트 영역은 빈 플레이스홀더로 두고 문구는 후편집(Figma)으로 넣음. 프롬프트와 각 화면 "화면 내 텍스트"의 한글 문구는 참조 카피임

### 2.3.2 화면별 변수 슬롯

화면마다 아래 항목을 채움. 단독 프롬프트는 [[#2.3.1 공통 제약 (모든 화면 공유)]] 뒤에 화면별 내용을 이어 붙이고, 참조 이미지 기반 프롬프트는 [[시범콘텐츠 공통 사양#12. 공용 화면 예시 이미지]] 중립 이미지를 첨부함(위 생성 방식 구분, 분류와 별개 축).

1. **레이아웃**: 16:9 영역(헤더, 본문, 액션) 배치. 공용 화면은 [[시범콘텐츠 공통 사양#5. 공통 화면]] 준용 절을 밝힘
2. **핵심 UI 컴포넌트**: 이 화면 고유 요소
3. **박첨지 호스트**: 위치, 상태, 안내 포즈. 공통 화면은 측면에 또렷한 안내 캐릭터, 박첨지 문답 화면은 화자로 전면에 둠
4. **화면 내 텍스트**: 이미지에 한글로 렌더링할 정확한 문구

### 2.3.3 부정 프롬프트 (모든 화면 공통)

- 깨지거나 왜곡된 한글, UI 내 영어 텍스트
- 기형 손과 얼굴, 워터마크와 서명
- 저작권 캐릭터
- 박첨지 호스트가 실사 행인이나 옆에 선 다른 사용자로 오인되는 형태 (화면 속 안내 캐릭터로 명확히)
- 일본 분라쿠 인형이나 서양 마리오네트와 혼동되는 형태
- 프롬프트에 지정하지 않은 임의 UI 버튼, 툴바, 컨트롤 (생성기가 키오스크 맥락에서 임의로 채우는 환각 방지)

# 3. 화면별 설계

각 화면을 [[#2.3.2 화면별 변수 슬롯]] 슬롯으로 설계하고, 그 뒤에 영어 프롬프트를 둠. 공용 화면은 레이아웃에서 [[시범콘텐츠 공통 사양#5. 공통 화면]] 표준을 준용하고 덜미 고유분만 더함. 고유 화면은 레이아웃을 상세히 설계함.

## 3.1 Step 1. 시작 화면

공용 화면(인트로, [[시범콘텐츠 공통 사양#5. 공통 화면]] 나). 대기 상태에서 관람객을 맞이하고 체험을 시작시킴. 종료 후 복귀 화면과 동일 자산임.

### 3.1.1 화면 설계

- **레이아웃**: [[시범콘텐츠 공통 사양#5.2 인트로 (시작 + 동의)]] 시작 화면 준용. 헤더에 콘텐츠 타이틀, 본문 중앙에 태그라인과 부제 한 줄을 유람기 대표 비주얼 위에 얹고, 액션에 큰 시작 버튼과 그 옆에 언어 선택 요소를 둠(고른 언어가 세션 전체에 적용됨). 박첨지가 환영하며 등장함
- **핵심 UI 컴포넌트**: 콘텐츠 타이틀과 태그라인("AI 덜미 스토리 생성"), 부제 한 줄, 큰 "시작하기" 터치 버튼, 유람기 대표 비주얼, 언어 선택 요소(한국어와 영어, [[시범콘텐츠 공통 사양#5.2 인트로 (시작 + 동의)]])
- **박첨지 호스트**: 한쪽 측면에서 유저를 향해 손짓하며 환영, 밝은 표정(중앙은 타이틀과 시작 버튼 자리)
- **화면 내 텍스트**: 타이틀 "나만의 유람기", 태그라인 "AI 덜미 스토리 생성", 부제 "박첨지와 함께 나만의 이야기를 만들고 전자책으로 완성해보세요", 버튼 "시작하기", 언어 선택 "한국어"/"English"(표본)

### 3.1.2 프롬프트 (영어, 공통 사양 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#12.3.1 시작 (인트로 화면)]] 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 header/body/action regions and the position and size of every element (title, primary start button, host, language selector). There is no secondary button. Replace the neutral placeholders with content-specific elements for a Korean traditional namsadang puppet play (deolmi/kkokdugaksi) illustrated e-book experience, without moving or resizing them:
- the guide-host placeholder (keep its clear side presence and presenting pose from the reference) -> a stylized Korean Bak Cheomji host character (the wandering old-man narrator puppet of the deolmi puppet play, an on-screen guide character, not a realistic bystander or a second user) welcoming with a beckoning gesture and a bright expression
- the content-area and background placeholders -> Korean wooden-puppet (mokgak) motifs over a vibrant namsadang booth-curtain (pojangmak) puppet stage, festive attract mood
Keep title '나만의 유람기', a tagline 'AI 덜미 스토리 생성' and a one-line subtitle '박첨지와 함께 나만의 이야기를 만들고 전자책으로 완성해보세요' in the content area above the start button, and primary button '시작하기'. Also keep a small language-selector control in a top corner of the header (two options, Korean and English), clearly display-and-touch but visually secondary to the start button.
Art direction: Korean traditional namsadang puppet-play motifs, wooden-puppet textures, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Bunraku puppets or Western string marionettes, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 3.2 Step 1. 가이드 화면

공용 화면(인트로, [[시범콘텐츠 공통 사양#5. 공통 화면]] 나). 박첨지가 인사하고 체험 흐름을 안내함.

### 3.2.1 화면 설계

- **레이아웃**: [[시범콘텐츠 공통 사양#5.2 인트로 (시작 + 동의)]]가이드 화면 준용. 헤더에 타이틀 "이용 안내", 본문에 4단계 진행 흐름 안내(단계별 그림 칸과 라벨 칸을 위아래로 두고 사이를 화살표로 이음), 액션에 다음으로 버튼을 두고, 헤더 좌상단에 홈 버튼을 상시 둠(진행 중 종료). 박첨지가 화자로 등장해 말풍선으로 안내함
- **핵심 UI 컴포넌트**: 타이틀 "이용 안내", 박첨지 안내 말풍선, 4단계 진행 흐름 안내(이름 짓기, 마당 고르기, 박첨지와 문답, 전자책 받기 / 각 단계 그림 칸 + 라벨 칸), "다음으로" 버튼, 홈 버튼(헤더 좌상단 원형, 진행 중 종료, [[공통 UI 컴포넌트]] 홈 버튼)
- **박첨지 호스트**: 화자로 등장해 설명, 재담하는 표정
- **상태별 안내 (기획서 준용)**: 홈 버튼 터치 시 확인 팝업([[시범콘텐츠 공통 사양#5.8 그만두기 확인 팝업]]) 확정 시 마무리 인사 화면을 건너뛴 종료(비완주, [[시범콘텐츠 공통 사양#5.5 종료와 리셋]]), 터치 미입력 타임아웃은 종료 처리. 기획서 Step 1 가이드 화면 분기를 준용함(목업은 정상 안내 상태만)
- **화면 내 텍스트**: 타이틀 "이용 안내", 박첨지 말풍선 "이용 방법을 알려주겠소.", 버튼 "다음으로"

### 3.2.2 프롬프트 (영어, 공통 사양 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#12.3.2 가이드 (인트로 화면)]] 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 header/body/action regions and the position and size of every element (flow illustration, next button, host, home button). Replace the neutral placeholders with content-specific elements for a Korean traditional namsadang puppet play (deolmi/kkokdugaksi) illustrated e-book experience, without moving or resizing them:
- the guide-host placeholder (keep its clear side presence and presenting pose from the reference) -> a stylized Korean Bak Cheomji host character (the wandering old-man narrator puppet of the deolmi puppet play, an on-screen guide character, not a realistic bystander) acting as the narrator with a lively storytelling expression
- the flow-illustration placeholder -> an instructional illustration of the flow (name your hero, choose a madang, answer Bak Cheomji, receive an e-book) in namsadang puppet-play styling
- background -> a namsadang booth-curtain (pojangmak) puppet stage, friendly mood
Keep title '이용 안내', a host speech bubble '이용 방법을 알려주겠소.', and a 4-step flow (each step is an image cell on top with a label cell below, arrows between steps), primary button '다음으로'.
Art direction: Korean traditional namsadang puppet-play motifs, wooden-puppet textures, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Bunraku puppets or Western string marionettes, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 3.3 Step 1. 이용 동의 화면

공용 화면(인트로, [[시범콘텐츠 공통 사양#5. 공통 화면]] 나). 필수 동의를 받음. 본 콘텐츠는 카메라를 쓰지 않아 필수 동의 항목은 이용 약관 동의임(카메라 동의 없음). 정확한 동의 항목과 문구는 규정 검토 확정(확인 필요).

### 3.3.1 화면 설계

- **레이아웃**: [[시범콘텐츠 공통 사양#5.2 인트로 (시작 + 동의)]] 이용 동의 화면 준용. 본문에 약관 텍스트(스크롤), 액션에 동의하고 시작 버튼만 두고, 헤더 좌상단에 홈 버튼을 상시 둠(진행 중 종료). 동의하고 시작이 곧 약관 동의이며, 1차연도는 선택 동의가 없어 별도 토글과 미동의 버튼을 두지 않음. 화면 타임아웃 미적용. 박첨지는 넓은 측면에 또렷한 안내 캐릭터로 말풍선으로 안내함
- **핵심 UI 컴포넌트**
	- 약관 텍스트 영역 (필수 이용 약관, 스크롤, 문구는 규정 검토 확정)
	- 주 버튼 "동의하고 시작": 약관 동의를 담음(별도 토글 없음, 항상 활성). 액션 영역의 유일한 버튼임(별도 미동의 버튼 없음)
	- 홈 버튼(헤더 좌상단 원형, 진행 중 종료, [[공통 UI 컴포넌트]] 홈 버튼): 터치 시 그만두기 확인 팝업을 거쳐 확정 시 동의하지 않고 종료함(미동의, 시작 화면 리셋)
- **박첨지 호스트**: 넓은 측면에 또렷한 안내 캐릭터로, 유저를 향해 안내하는 포즈(중앙 도달 존 조작은 가리지 않음)
- **상태별 안내 (기획서 준용)**: 홈 버튼 터치 시 그만두기 확인 팝업([[시범콘텐츠 공통 사양#5.8 그만두기 확인 팝업]]) 확정 시 미동의로 간주해 시작 화면으로 리셋함(비완주, [[시범콘텐츠 공통 사양#5.5 종료와 리셋]]). 터치 미입력 타임아웃도 팝업 없이 미동의 리셋. 액션 영역에는 별도 미동의 버튼을 두지 않음. 기획서 Step 1과 [[시범콘텐츠 공통 사양#5. 공통 화면]]나를 준용함(목업은 정상 동의 상태만)
- **화면 내 텍스트**: 타이틀 "이용 동의", 박첨지 말풍선 "동의가 필요하오.", 약관 라벨 "이용 약관 (필수)"(표본, 문구는 규정 검토 확정), 버튼 "동의하고 시작"

### 3.3.2 프롬프트 (영어, 공통 사양 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#12.3.3 이용 동의 (인트로 화면)]] 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 header/body/action regions and the position and size of every element (title, host speech bubble, terms area, primary button, home button). Replace the neutral placeholders with content-specific elements for a Korean traditional namsadang puppet play (deolmi/kkokdugaksi) illustrated e-book experience, without moving or resizing them:
- the guide-host placeholder (keep its clear side presence and presenting pose from the reference) -> a stylized Korean Bak Cheomji host guide as a clear side presence in a presenting pose (an on-screen guide character, not a realistic bystander or a second user)
- background -> a calm namsadang booth-curtain puppet stage
Keep title '이용 동의' and a host speech bubble '동의가 필요하오.'. Do NOT render any consent toggle; consent is expressed by the single button (this content has a single required 약관 consent and no camera consent, so there is no toggle row; if the reference mockup shows toggle rows, omit them). Keep the primary button '동의하고 시작' (active) as the only action-area button (no separate decline button).
Art direction: Korean traditional namsadang puppet-play motifs, wooden-puppet textures, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Bunraku puppets or Western string marionettes, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 3.4 Step 2. 마당 유형 선택 화면

덜미 고유 화면. 유저가 마당 유형 4종 중 하나를 고름. 시스템은 그 유형 풀에서 랜덤 마당 1개를 배정함 ([[덜미 - 나만의 유람기 기획서#4.2 Step 2. 마당 유형 선택]], 유형 정의는 같은 문서 [[덜미 - 나만의 유람기 기획서#3) 마당 유형 (4종)]]).

### 3.4.1 화면 설계

- **레이아웃** (고유, 16:9 골격, 카드를 중앙 도달 존에 집약)
	- 헤더: 타이틀 "이야기 마당 선택"
	- 본문 중앙: 마당 유형 4종 카드(병렬, 각 카드 그림 칸 위 + 라벨 칸 아래)를 중앙 도달 존에 둠(터치 선택이라 좌우 끝에 두지 않음)
	- 액션: 선택 후 다음으로 버튼을 중앙 도달 존 아래쪽에 둠(물리 최하단 아님). 진행 중 종료는 헤더 좌상단 홈 버튼으로 함
- **핵심 UI 컴포넌트**
	- 마당 유형 카드 4종: "위협 - 구원", "권력 풍자", "위선 폭로", "욕심과 다툼"(유형명을 카드 라벨로 그대로 씀, [[덜미 - 나만의 유람기 기획서#3) 마당 유형 (4종)]])
	- 각 카드의 인형극 양식 일러스트와 라벨
	- 선택 표시(하이라이트)
	- "다음으로" 버튼
	- 홈 버튼(헤더 좌상단 원형, 진행 중 종료, [[공통 UI 컴포넌트]] 홈 버튼)
- **박첨지 호스트**: 측면에 또렷한 안내 캐릭터로, 어떤 마당으로 놀지 권하는 포즈(중앙 도달 존 조작은 가리지 않음)
- **상태별 안내 (기획서 준용)**: 터치 미입력 타임아웃 등은 기획서 Step 2 분기를 준용함. 홈 버튼 터치 시 확인 팝업([[시범콘텐츠 공통 사양#5.8 그만두기 확인 팝업]]) 확정 시 종료 Step 직행(목업은 정상 선택 상태만)
- **화면 내 텍스트**: 타이틀 "이야기 마당 선택", 카드 라벨 "위협 - 구원"/"권력 풍자"/"위선 폭로"/"욕심과 다툼"(4종 유형명), 버튼 "다음으로"

### 3.4.2 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a horizontal 16:9 kiosk touchscreen, full screen.
The madang (episode-type) selection screen of a Korean traditional namsadang puppet play (deolmi/kkokdugaksi) illustrated e-book experience.
Large-screen kiosk where a person stands centered and touches: keep all interactive cards within a central reachable zone (center of the width, eye-to-waist height), not at the screen edges.
Top header: a title '이야기 마당 선택'.
Center, within reach: four selectable madang-type cards side by side, each with a top illustration area and a bottom label, labeled '위협 - 구원', '권력 풍자', '위선 폭로', '욕심과 다툼'. One card is highlighted as selected.
A primary button labeled '다음으로' in the lower part of the central reachable zone, not at the physical bottom edge. A small circular home button sits in the top-left corner of the header (icon only, no text).
To one side: a stylized Korean Bak Cheomji host character (the wandering old-man narrator puppet of the deolmi puppet play, an on-screen guide character, not a realistic bystander) inviting the user to pick a madang, not blocking the central controls.
Background: a namsadang booth-curtain puppet stage, festive mood.
Art direction: Korean traditional namsadang puppet-play motifs blended with a modern kiosk UI, wooden-puppet textures, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Bunraku puppets or Western string marionettes, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 3.5 Step 3. 캐릭터 카드 선택 화면

덜미 고유 화면. 유저가 성별 토글(남/여)로 성별을 고르고 연령대 카드 3종(어린이/청소년/어른) 중 하나를 골라 주인공을 정함. 성별과 연령대의 조합이 곧 6종 주인공임([[덜미 - 나만의 유람기 기획서#4.3 Step 3. 주인공 설정]]).

### 3.5.1 화면 설계

- **레이아웃** (고유, 16:9 골격, 토글과 카드를 중앙 도달 존에 집약)
	- 헤더: 타이틀 "주인공 선택"
	- 본문 상단: 성별 토글(남/여)을 카드 위에 둠(현재 성별 강조)
	- 본문 중앙: 연령대 카드 3종(어린이/청소년/어른)을 병렬로 중앙 도달 존에 둠(선택 성별에 맞는 인물 일러스트, 터치 선택이라 좌우 끝에 두지 않음)
	- 액션: 선택 후 다음으로 버튼을 중앙 도달 존 아래쪽에 둠(물리 최하단 아님). 진행 중 종료는 헤더 좌상단 홈 버튼으로 함
- **핵심 UI 컴포넌트**
	- 성별 토글(남/여): 현재 성별을 강조하고, 토글 값에 따라 카드 인물 성별이 바뀜
	- 연령대 카드 3종(어린이/청소년/어른): 각 카드는 인형극 양식의 인물 일러스트. 성별 토글과의 조합이 6종 주인공
	- 선택 표시(하이라이트)
	- "다음으로" 버튼
	- 홈 버튼(헤더 좌상단 원형, 진행 중 종료, [[공통 UI 컴포넌트]] 홈 버튼)
- **박첨지 호스트**: 측면에 또렷한 안내 캐릭터로, 유저에게 고르라고 권하는 포즈(중앙 도달 존 조작은 가리지 않음)
- **상태별 안내 (기획서 준용)**: 카드 미선택 시 다음 비활성, 터치 미입력 타임아웃 등은 기획서 Step 3 분기를 준용함. 홈 버튼 터치 시 확인 팝업([[시범콘텐츠 공통 사양#5.8 그만두기 확인 팝업]]) 확정 시 종료 Step 직행(목업은 정상 선택 상태만)
- **화면 내 텍스트**: 타이틀 "주인공 선택", 성별 토글 "남"/"여", 카드 라벨 "어린이"/"청소년"/"어른", 버튼 "다음으로"

### 3.5.2 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a horizontal 16:9 kiosk touchscreen, full screen.
The character card selection screen of a Korean traditional namsadang puppet play (deolmi/kkokdugaksi) illustrated e-book experience.
Large-screen kiosk where a person stands centered and touches: keep all interactive cards within a central reachable zone (center of the width, eye-to-waist height), not at the screen edges.
Top header: a title '주인공 선택'.
Below the header: a gender toggle with two options '남' and '여' (one highlighted). Below the toggle, within reach: three selectable character cards side by side, each a puppet-play styled figure of a hero, labeled by age '어린이', '청소년', '어른' (the figures match the selected gender). One card is highlighted as selected.
A primary button labeled '다음으로' in the lower part of the central reachable zone, not at the physical bottom edge. A small circular home button sits in the top-left corner of the header (icon only, no text).
To one side: a stylized Korean Bak Cheomji host character (the wandering old-man narrator puppet of the deolmi puppet play, an on-screen guide character, not a realistic bystander) encouraging the choice, not blocking the central controls.
Background: a namsadang booth-curtain puppet stage, warm inviting mood.
Art direction: Korean traditional namsadang puppet-play motifs blended with a modern kiosk UI, wooden-puppet textures, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Bunraku puppets or Western string marionettes, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 3.6 Step 3. 이름 입력 화면

덜미 고유 화면. 유저가 주인공 캐릭터의 이름을 가상 키보드나 음성(STT)으로 지어 입력함. 실명이 아니라 주인공에게 붙이는 이름이라 박첨지가 "나와 같이 여행을 떠날 당신은 누구신가요?"로 물음. 클라이언트 비속어 필터로 검증하고, 걸리면 재입력 안내함 ([[덜미 - 나만의 유람기 기획서#4.3 Step 3. 주인공 설정]]).

### 3.6.1 화면 설계

- **레이아웃** (고유, 16:9 골격, 조작 요소를 중앙 도달 존에 집약)
	- 헤더: 타이틀 "이름 입력"
	- 본문 상단: 박첨지 질문 말풍선. 본문 중앙: 이름 입력 필드와 글자수 표시, 랜덤 입력 버튼, 가상 키보드, 음성 입력 마이크 아이콘을 중앙 도달 존에 둠(터치와 음성 조작이라 좌우 끝에 두지 않음). 키보드는 하단에 한정해 말풍선과 입력 필드가 위에 보이게 함
	- 액션: 다음으로 버튼을 중앙 도달 존 아래쪽에 둠(물리 최하단 아님, 빈 입력이면 비활성). 진행 중 종료는 헤더 좌상단 홈 버튼으로 함
- **핵심 UI 컴포넌트**
	- 박첨지 질문 말풍선("나와 같이 여행을 떠날 당신은 누구신가요?")
	- 이름 입력 필드(플레이스홀더 "주인공의 이름을 입력해주세요.")와 글자수 표시(N/20, 상한 초과 시 빨강)
	- 가상 키보드(한글)와 음성 입력 마이크 아이콘 버튼(STT). 두 입력 수단 병행 ([[시범콘텐츠 공통 사양#5.7 텍스트 입력]])
	- "랜덤 입력" 버튼: 사전 이름 목록에서 하나를 랜덤으로 뽑아 입력 필드를 채우는 보조 입력 수단(직전 이름 중복 회피, 현재 언어 반영). 채운 이름은 일반 입력과 동일하게 편집하거나 다시 눌러 바꿀 수 있음 ([[덜미 - 나만의 유람기 기획서#4.3 Step 3. 주인공 설정]] 2))
	- "다음으로" 버튼(빈 입력이면 비활성)
	- 홈 버튼(헤더 좌상단 원형, 진행 중 종료, [[공통 UI 컴포넌트]] 홈 버튼)
- **박첨지 호스트**: 측면에 또렷한 안내 캐릭터로, 유저를 향해 이름을 청하는 포즈(중앙 도달 존 조작은 가리지 않음)
- **상태별 안내 (기획서 준용)**: 길이 초과(이름 20자, 초과 시 글자수 빨강과 다음 비활성)나 비속어 검출 시 팝업 안내와 재입력, 각 3회(잠정) 초과 시 종료 Step 직행, 터치 미입력 타임아웃은 기획서 Step 3 분기를 준용함. 홈 버튼 터치 시 확인 팝업([[시범콘텐츠 공통 사양#5.8 그만두기 확인 팝업]]) 확정 시 종료 Step 직행(목업은 정상 입력 상태만)
- **화면 내 텍스트**: 타이틀 "이름 입력", 박첨지 말풍선 "나와 같이 여행을 떠날 당신은 누구신가요?", 입력 필드 플레이스홀더 "주인공의 이름을 입력해주세요.", 글자수 "0/20"(예), 버튼 "랜덤 입력", "다음으로"(음성 입력은 마이크 아이콘 버튼이라 라벨 없음)

### 3.6.2 프롬프트 (영어, 공통 사양 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#12.3.8 텍스트 입력]] 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 header/body/action regions and the position and size of every element (header/prompt area, text input field, character counter, on-screen keyboard confined to a lower band, voice-input mic icon, random-name button, primary '다음으로' button, host). Replace the neutral placeholders with content-specific elements for a Korean traditional namsadang puppet play (deolmi/kkokdugaksi) illustrated e-book experience, without moving or resizing them:
- the guide-host placeholder (keep its clear side presence from the reference) -> a stylized Korean Bak Cheomji host character (the wandering old-man narrator puppet of the deolmi puppet play, an on-screen guide character, not a realistic bystander or a second user) inviting the user to name their hero, not blocking the central controls
- the prompt/question area -> a host speech bubble with the question '나와 같이 여행을 떠날 당신은 누구신가요?'
- the background placeholders -> a namsadang booth-curtain (pojangmak) puppet stage, warm inviting mood
Keep title '이름 입력', a host speech-bubble question '나와 같이 여행을 떠날 당신은 누구신가요?', an input field with placeholder '주인공의 이름을 입력해주세요.' and a character counter '0/20' beside it, a small circular voice-input mic icon button, primary button '다음으로', and a random-name button '랜덤 입력' near the input field. A small circular home button sits in the top-left corner of the header (icon only, no text). The on-screen keyboard stays confined to a lower band and the question and input field remain clearly visible above it.
Art direction: Korean traditional namsadang puppet-play motifs, wooden-puppet textures, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Bunraku puppets or Western string marionettes, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 3.7 Step 4. 박첨지 문답 화면

덜미 고유 화면(핵심 상호작용). 배정된 마당의 거리(도입/전개/절정/마무리)마다 박첨지가 사전 생성된 고정 질문을 던지고, 유저가 가상 키보드나 음성(STT)으로 답함. 거리 수만큼 반복함 ([[덜미 - 나만의 유람기 기획서#4.4 Step 4. 플롯 문답]]).

### 3.7.1 화면 설계

- **레이아웃** (고유, 16:9 골격, 박첨지 화자 전면 + 응답 입력 중앙 도달 존)
	- 헤더: 타이틀 "박첨지와 대화하기"와 그 아래 거리 진행 표시(도입 → 전개 → 절정 → 마무리 중 현재 위치)
	- 본문 상단: 박첨지 캐릭터와 질문 말풍선(사전 생성 고정 질문)
	- 본문 중앙: 응답 입력 필드와 글자수 표시(N/50), 가상 키보드, 음성 입력 마이크 아이콘을 중앙 도달 존에 둠(터치와 음성 조작이라 좌우 끝에 두지 않음)
	- 액션: 다음으로(제출) 버튼을 중앙 도달 존 아래쪽에 둠(빈 입력이면 비활성). 진행 중 종료는 헤더 좌상단 홈 버튼으로 함
- **핵심 UI 컴포넌트**
	- 타이틀 "박첨지와 대화하기"
	- 박첨지 캐릭터와 질문 말풍선
	- 응답 입력 필드(플레이스홀더 "박첨지의 질문에 답하세요.")와 글자수 표시(N/50, 상한 초과 시 빨강)
	- 가상 키보드(한글)와 음성 입력 마이크 아이콘 버튼(STT). 두 입력 수단 병행
	- 거리 진행 인디케이터(4거리)
	- "다음으로" 버튼(빈 입력이면 비활성)
	- 홈 버튼(헤더 좌상단 원형, 진행 중 종료, [[공통 UI 컴포넌트]] 홈 버튼)
- **박첨지 호스트**: 본문 상단에 화자로 전면 등장(질문을 던지는 주역). 본 화면은 박첨지가 조작을 가리지 않는 상단 영역에 서고 응답 입력이 중앙 도달 존을 차지함
- **상태별 안내 (기획서 준용)**: 길이 초과(거리별 답변 50자, 초과 시 글자수 빨강과 다음 비활성)이나 가드레일 위반 시 팝업 안내와 재입력, 각 3회(잠정) 초과 시 종료 Step 직행, 터치 미입력 타임아웃은 기획서 Step 4 분기를 준용함. 홈 버튼 터치 시 확인 팝업([[시범콘텐츠 공통 사양#5.8 그만두기 확인 팝업]]) 확정 시 종료 Step 직행(목업은 정상 문답 상태만)
- **화면 내 텍스트**: 타이틀 "박첨지와 대화하기", 거리 라벨 "도입"/"전개"/"절정"/"마무리", 질문 예시 "길을 가는데 땅에 무언가 보이네. 과연 무엇일까?"(표본, 사전 생성 고정 질문), 입력 필드 플레이스홀더 "박첨지의 질문에 답하세요.", 글자수 "0/50"(예), 버튼 "다음으로"(음성 입력은 마이크 아이콘 버튼이라 라벨 없음)

### 3.7.2 프롬프트 (영어, 공통 사양 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#12.3.8 텍스트 입력]] 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 header/body/action regions and the position and size of every element (title/progress area, prompt/question area, text answer field, character counter, on-screen keyboard confined to a lower band, voice-input mic icon, primary '다음으로' button, host). Replace the neutral placeholders with content-specific elements for a Korean traditional namsadang puppet play (deolmi/kkokdugaksi) illustrated e-book experience, without moving or resizing them:
- the header placeholder -> a title '박첨지와 대화하기' with a 4-stage progress indicator '도입', '전개', '절정', '마무리' below it, the current stage marked
- the host placeholder and the prompt/question area -> a stylized Korean Bak Cheomji host character (the wandering old-man narrator puppet of the deolmi puppet play, an on-screen guide character, not a realistic bystander or a second user) as the narrator posing the question, with a speech bubble showing a fixed question '길을 가는데 땅에 무언가 보이네. 과연 무엇일까?', kept in the upper area and not blocking the central controls
- the background placeholders -> a namsadang booth-curtain (pojangmak) puppet stage, storytelling mood
Keep title '박첨지와 대화하기', progress labels '도입'/'전개'/'절정'/'마무리', question '길을 가는데 땅에 무언가 보이네. 과연 무엇일까?', an answer field with placeholder '박첨지의 질문에 답하세요.' and a character counter '0/50' beside it, a small circular voice-input mic icon button, primary button '다음으로'. A small circular home button sits in the top-left corner of the header (icon only, no text). The on-screen keyboard stays confined to a lower band and the question and answer field remain clearly visible above it.
Art direction: Korean traditional namsadang puppet-play motifs, wooden-puppet textures, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Bunraku puppets or Western string marionettes, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 3.8 Step 5. 생성 대기 화면

공용 화면(대기, [[시범콘텐츠 공통 사양#5. 공통 화면]] 다). 결과물을 생성하는 동안 대기 콘텐츠를 노출함.

### 3.8.1 화면 설계

- **레이아웃**: [[시범콘텐츠 공통 사양#5.3 생성과 변환 대기]] 준용. 헤더에 타이틀 "나만의 유람기 생성 중", 본문 중앙에 대기 콘텐츠(남사당 소개 영상 등)와 그 아래 진행 바를 둠. 액션은 비움(입력받지 않음). 두 타임아웃 미적용. 박첨지는 측면에 또렷한 안내 캐릭터로 말풍선으로 흥을 돋움
- **핵심 UI 컴포넌트**: 타이틀 "나만의 유람기 생성 중", 대기 콘텐츠(남사당 소개 영상 등, [[덜미 - 나만의 유람기 기획서#4.5 Step 5. 결과물 생성과 대기 화면 (병행)]]), 진행 바, 박첨지 안내 말풍선
- **박첨지 호스트**: 대기 동안 재담으로 흥을 돋움 (측면 또렷한 안내 캐릭터)
- **화면 내 텍스트**: 타이틀 "나만의 유람기 생성 중", 박첨지 말풍선 "멋진 이야기가 만들어지고 있다네.", 진행률(진행 바)

### 3.8.2 프롬프트 (영어, 공통 사양 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#12.3.4 대기 (생성과 변환 대기 화면)]] 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 body-centered layout and the position and size of every element (progress indicator, status caption, host). Replace the neutral placeholders with content-specific elements for a Korean traditional namsadang puppet play (deolmi/kkokdugaksi) illustrated e-book experience, without moving or resizing them:
- the progress/visual placeholder -> waiting content (e.g. a namsadang introduction video) with a progress bar below it while the e-book is being generated
- the guide-host placeholder (keep its clear side presence and presenting pose from the reference) -> a stylized Korean Bak Cheomji host guide keeping up the mood during the wait with a speech bubble '멋진 이야기가 만들어지고 있다네.', as a clear side presence (an on-screen guide character, not a realistic bystander)
- background -> a namsadang booth-curtain puppet stage, an anticipatory waiting mood
Keep title '나만의 유람기 생성 중' and the host speech bubble '멋진 이야기가 만들어지고 있다네.'.
Art direction: Korean traditional namsadang puppet-play motifs, wooden-puppet textures, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Bunraku puppets or Western string marionettes, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 3.9 Step 6. 결과물 감상 화면

덜미 고유 화면. 완성된 전자책을 페이지를 넘기며 감상하고, 페이지를 열면 그 페이지의 박첨지 낭독 음성이 재생됨. 마지막 페이지까지 본 뒤 다음으로 넘기면 마무리 확인을 거쳐 완주로 마무리 인사 화면(Step 7)으로 감. 결과물 받기(QR)는 이 화면이 아니라 마무리 인사 화면에서 함. 호스팅과 다운로드 URL 발급은 Step 5 생성 파이프라인에서 이미 끝남 ([[덜미 - 나만의 유람기 기획서#4.6 Step 6. 결과물 감상]], [[덜미 - 나만의 유람기 기획서#3.2 개인정보 처리]]).

### 3.9.1 화면 설계

- **레이아웃** (고유, 16:9 골격, 전자책 뷰어를 중앙에 크게)
	- 헤더: 타이틀
	- 본문 중앙: 세로 형식 전자책 페이지 1장을 가로 화면 중앙에 배치하고 양옆은 여백으로 둠. 결과물 원본이 세로 형식임([[덜미 - 나만의 유람기 기획서#1. 개요]] 산출물)
	- 페이지 넘김: 좌우 넘김 버튼을 페이지 양옆 중앙 도달 존 안에 둠(화면 물리 좌우 끝이 아니라 손 닿는 범위). 스와이프 병행 가능
	- 낭독 재생: 페이지를 열면 그 페이지 박첨지 낭독이 자동 재생되고, 페이지를 넘기면 이전 낭독을 멈춤. 별도 재생 컨트롤은 두지 않음(자동 재생)
	- 액션: 하단 별도 버튼 없음(넘김 화살표만). 진행 중 종료는 헤더 좌상단 홈 버튼으로 함. 완주는 마지막 페이지에서 다음으로 넘길 때 감상 종료 확인 팝업(취소/확인)으로 처리하고, 별도 "마침" 버튼은 두지 않음
- **핵심 UI 컴포넌트**
	- 세로 전자책 페이지 뷰어(제목 칸 + 인형극 양식 일러스트 + 서사 텍스트의 3단 구성)
	- 좌우 페이지 넘김 컨트롤(도달 존 안)
	- 낭독 음성 자동 재생(페이지 열면 재생, 넘기면 정지. 별도 재생 컨트롤 없음)
	- 감상 종료 확인 팝업(취소/확인): 완주 시점에 뜨는 마무리 확인 팝업
	- 홈 버튼(헤더 좌상단 원형, 진행 중 종료, [[공통 UI 컴포넌트]] 홈 버튼)
- **박첨지 호스트**: 측면에 또렷한 안내 캐릭터로 결과를 자랑하듯(중앙 도달 존 조작은 가리지 않음)
- **상태별 안내 (기획서 준용)**: 마지막 페이지에서 다음으로 넘기면 감상 종료 확인 팝업("감상을 종료하시겠습니까?" / 취소/확인)을 거쳐 완주로 마무리 인사 화면 진행, 화면 타임아웃(감상용 300초 잠정 오버라이드)과 미입력 타임아웃 시 종료 Step 직행(비완주라 마무리 인사 건너뜀), 낭독 음성 합성 실패 시 낭독 없이 페이지만 표시, 홈 버튼 터치 시 확인 팝업([[시범콘텐츠 공통 사양#5.8 그만두기 확인 팝업]]) 확정 시 종료 Step 직행은 기획서 Step 6 분기를 준용함(목업은 정상 열람 상태만). 호스팅 실패는 이 화면에 닿기 전 Step 5 대기 화면에서 상황 안내 뒤 종료 Step으로 갈림
- **화면 내 텍스트**: 감상 종료 확인 팝업 "감상을 종료하시겠습니까?" / "다음 페이지에서 전자책을 다운로드할 수 있는 QR 코드를 안내드립니다." / 버튼 "취소"/"확인"(전자책 페이지 본문은 결과물)

### 3.9.2 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a horizontal 16:9 kiosk touchscreen, full screen.
The result reading screen (e-book reader) of a Korean traditional namsadang puppet play (deolmi/kkokdugaksi) illustrated e-book experience. This screen has NO QR code (the download QR is on the later closing screen).
Title: '나만의 유람기'.
Center: a single portrait-oriented e-book page displayed in the middle with side margins (the result image is portrait, independent of the landscape screen). The page has a small title area on top, a large puppet-play styled illustration in the middle, and narrative text at the bottom.
Page-turn: left and right page-turn controls placed just beside the page, within the central reachable zone (not at the physical left/right screen edges).
Narration plays automatically when a page opens; there is NO visible playback control.
Action: no bottom action button (only the page-turn arrows); a small circular home button sits in the top-left corner of the header (icon only, no text). There is no '마침' button (finishing happens by paging past the last page, which opens a viewing-end confirm popup).
To one side: a stylized Korean Bak Cheomji host character (the wandering old-man narrator puppet of the deolmi puppet play, an on-screen guide character, not a realistic bystander or a second user) reacting proudly to the result, not blocking the central controls.
Background: a namsadang booth-curtain puppet stage, a proud showcase mood.
Art direction: Korean traditional namsadang puppet-play motifs blended with a modern kiosk UI, wooden-puppet textures, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Bunraku puppets or Western string marionettes, any QR code, and any UI buttons, toolbars, or controls not specified in this prompt.
```


## 3.10 Step 7. 마무리 인사 화면

공용 화면(종료, [[시범콘텐츠 공통 사양#5. 공통 화면]] 마). 완주(Step 6에서 마지막 페이지까지 보고 마무리 확인)로 진입한 경우에만 표시하는 완주 전용 화면임. 박첨지 마무리 인사와 함께 결과물 받기 QR을 보여주고, "처음으로" 버튼 터치나 화면 타임아웃 뒤 시작 화면으로 복귀함. 비완주 종료(그만두기, 터치 미입력 타임아웃, 위반 한도 초과, 실패 중단)는 이 화면을 건너뜀([[시범콘텐츠 공통 사양#5.5 종료와 리셋]]).

### 3.10.1 화면 설계

- **레이아웃**: [[시범콘텐츠 공통 사양#5.5 종료와 리셋]] 준용에 결과물 받기 QR을 더함. 헤더에 타이틀 "이야기 완성", 본문 중앙에 결과물 QR과 스캔 안내를 두고, 그 아래 "처음으로" 버튼을 둠. 박첨지가 측면에서 작별 인사를 함. "처음으로" 터치나 화면 타임아웃(기본 60초, 잠정) 뒤 시작 화면에 복귀함
	- QR: QR 코드 아래에 스캔 안내 문구를 두고, 유저가 폰을 들어 스캔하므로 손 닿는 높이에 둠
- **핵심 UI 컴포넌트**
	- 타이틀 "이야기 완성", 박첨지 작별 말풍선("고맙소 또 만납시다")
	- 결과물 QR 코드(Step 5가 발급한 다운로드 URL 인코딩, 유저가 본인 휴대폰으로 스캔)
	- 스캔 안내 문구
	- "처음으로" 버튼(시작 화면 복귀)
- **박첨지 호스트**: 측면에서 정겹게 작별 인사(QR은 가리지 않음)
- **상태별 안내 (기획서 준용)**: 완주로 진입한 경우에만 표시하고, "처음으로" 버튼 터치나 화면 타임아웃 시 다음 단계(종료와 리셋)로 진행함은 기획서 Step 7 분기를 준용함
- **화면 내 텍스트**: 타이틀 "이야기 완성", 박첨지 말풍선 "고맙소 또 만납시다", 안내 "QR 코드를 스캔하면 완성된 이야기를 확인할 수 있습니다", 버튼 "처음으로", 다운로드 가능 기간 안내(예시, 규정 검토 확정)
- **연락처 관련 요소 없음**: 입력 필드와 키패드, 전송이나 받지 않기 버튼, 개인정보 수집 고지를 두지 않음(QR 익명 다운로드, [[덜미 - 나만의 유람기 기획서#3.2 개인정보 처리]])

### 3.10.2 프롬프트 (영어, 공통 사양 중립 이미지 첨부 + QR 추가)

첨부: [[시범콘텐츠 공통 사양#12.3.5 종료 (종료와 리셋 화면)]] 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 layout. Replace the neutral placeholders with content-specific elements for a Korean traditional namsadang puppet play (deolmi/kkokdugaksi) illustrated e-book experience:
- header -> a title '이야기 완성'
- the guide-host placeholder -> a stylized Korean Bak Cheomji host character to one side giving a warm farewell, with a speech bubble '고맙소 또 만납시다'
- center -> a download QR code with a scan-guide caption 'QR 코드를 스캔하면 완성된 이야기를 확인할 수 있습니다' below it, at a comfortable height for a person holding up a phone to scan
- below the QR -> a primary button '처음으로'
- background -> a namsadang booth-curtain puppet stage, a warm closing mood
Art direction: Korean traditional namsadang puppet-play motifs, wooden-puppet textures, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. The QR code is a generic decorative square pattern and encodes nothing. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Bunraku puppets or Western string marionettes, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 3.11 실패 안내 (모달 팝업, 실패 분기 공통)

공용 화면(실패 안내, [[시범콘텐츠 공통 사양#5.6 실패 안내 (상황 안내 모달 팝업)]]). 생성이나 호스팅 실패, 상태 조회 무응답 등 실패 분기가 모이는 공통 화면임. 상황 안내를 보이고 종료 Step으로 자동 진행함.

### 3.11.1 화면 설계

- **레이아웃**: [[시범콘텐츠 공통 사양#5.6 실패 안내 (상황 안내 모달 팝업)]] 준용. 전체 화면이 아니라 직전 화면을 어둡게 깐 위에 중앙 모달 다이얼로그 카드를 띄우고, 카드 안에 경고 아이콘, 상황 안내 메시지, 확인 버튼 하나를 둠. 확인을 누르면 즉시 종료 Step으로 가고, 누르지 않아도 잠깐 뒤 자동으로 진행함. 오류 코드나 기술 세부는 노출하지 않음. 박첨지는 카드 옆에서 다독이는 모습으로 둠
- **핵심 UI 컴포넌트**: 상황 안내 메시지, "확인" 버튼(중앙 도달 존)
- **박첨지 호스트**: 측면이나 중앙에서 다독이는 표정
- **화면 내 텍스트**: 안내 "문제가 생겼어요"(표본, 케이스마다 문구를 달리함), 버튼 "확인"

### 3.11.2 프롬프트 (영어, 공통 사양 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#12.3.7 실패 안내 (모달 팝업)]] 중립 레이아웃 이미지

```
Use the attached neutral modal-popup mockup as the structural reference. Keep its centered modal dialog card over a dimmed background and the position and size of every element (warning icon, apology message, a single confirm button, host beside the card). Replace the neutral placeholders with content-specific elements for a Korean traditional namsadang puppet play (deolmi/kkokdugaksi) illustrated e-book experience, without moving or resizing them:
- the guide-host placeholder (keep its clear presence and reassuring pose from the reference) -> a stylized Korean Bak Cheomji host character (the wandering old-man narrator puppet of the deolmi puppet play, an on-screen guide character, not a realistic bystander) reassuring the user warmly
- background -> a calm namsadang booth-curtain (pojangmak) puppet stage, a reassuring mood
Keep the apology message '문제가 생겼어요'; do not show error codes or technical details.
Art direction: Korean traditional namsadang puppet-play motifs, wooden-puppet textures, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Bunraku puppets or Western string marionettes, error codes or technical error details, and any UI buttons, toolbars, or controls not specified in this prompt.
```

# 4. 관련 문서

- [[덜미 - 나만의 유람기 기획서]]: 콘텐츠 로직과 Step 명세 정본
- [[시범콘텐츠 공통 사양]]: 공통 화면 레이아웃([[시범콘텐츠 공통 사양#5. 공통 화면]])과 진행 호스트([[시범콘텐츠 공통 사양#6. 진행 호스트]]) 골격 정본
- [[공통 UI 컴포넌트]]: 본 문서 화면 요소의 위젯 단위 공통 컴포넌트 색인
- [[덜미 - 나만의 꼭두각시 UI]]: 자매 UI 문서 (같은 덜미 소재, 체험형)
- [[덧뵈기 - 나만의 탈춤 UI]]: 자매 UI 문서 (화면 설계 방식 공유)
