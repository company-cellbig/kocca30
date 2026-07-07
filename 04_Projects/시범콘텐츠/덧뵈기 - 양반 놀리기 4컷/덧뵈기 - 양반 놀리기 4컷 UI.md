---
title: 덧뵈기 - 양반 놀리기 4컷 UI
type: project
status: draft
tags: [project, kocca, 시범콘텐츠, 덧뵈기, UI]
created: 2026-07-02
updated: 2026-07-07
---

> 덧뵈기(탈춤) 양반 풍자 4컷 만화 생성 키오스크의 화면별 UI 설계. 각 화면의 레이아웃(16:9 영역 배치)과 예시 이미지 생성 프롬프트를 함께 담음. 공용 화면(인트로, 대기, 전송, 종료)은 [[시범콘텐츠 공통 사양#5. 공통 화면]] 표준을, 이어하기 학습 토큰 스캔은 [[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]]를 따르고 덧뵈기 고유분만 더하며, 고유 화면(이름 입력, 캐릭터 카드, 세부 유형 선택, 말뚝이 문답, 결과물 감상)은 레이아웃을 상세 설계함. 카메라를 쓰지 않아 전 화면이 터치라 도달 존을 엄격히 적용함. 기획은 [[덧뵈기 - 양반 놀리기 4컷 기획서]].

# 1. 개요

- **목적**: 화면별 UI 레이아웃을 설계하고 예시 이미지 생성 프롬프트를 정리함
- **문서 성격**: 레이아웃 기획과 이미지 생성 프롬프트를 함께 담음. 레이아웃은 [[시범콘텐츠 공통 사양#5. 공통 화면]]의 16:9 영역 골격을 따름
- **대상 화면**: 13개. Step 순으로 배열함(§2.가 화면 목록)
- **공용과 고유**: 공용 화면 8개는 콘텐츠 무관 표준을 참조하고 덧뵈기 고유분(말뚝이, 탈 비주얼, 카피)만 더함. 이 중 7개는 [[시범콘텐츠 공통 사양#5. 공통 화면]] 세션 표준을(실패 안내 화면 포함), 학습 토큰 스캔 화면 1개는 [[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]] 이어하기 복원(콘텐츠 횡단 학습 기능)을 정본으로 함. 덧뵈기 고유 화면 5개는 레이아웃을 상세 설계함
- **입력 특성**: 카메라를 쓰지 않고 터치와 음성(STT)만 씀([[덧뵈기 - 양반 놀리기 4컷 기획서]] §5.다 2) 하드웨어). 따라서 카메라/모션 화면 예외가 없고, 전 화면에서 터치 조작 요소를 중앙 도달 존(§5.가 도달성)에 둠
- **공통 규격**: 16:9 가로 키오스크, 실사풍 UI 목업, 영어 프롬프트. 이미지 안 UI 텍스트는 한글로 렌더링함
- **사용법**: §13에 중립 레이아웃 이미지가 있는 공용 화면 7개는 그 이미지를 첨부해 참조 이미지 기반으로 생성하고(학습 토큰 스캔은 §13에 이어하기 예시 이미지가 있으나 2차연도라 1차연도 UI는 미작성), 중립 이미지가 없는 화면(덧뵈기 고유 화면)은 §2.다 공통 제약에 화면별 프롬프트를 이어 붙여 생성함. 생성 방식은 분류(공용/고유)와 별개 축임 (방식 구분은 §2.다 공통 프롬프트 양식)
- **텍스트 주의 (후편집)**: 이미지에는 UI 텍스트를 렌더링하지 않음. 타이틀, 버튼, 카피 등 모든 텍스트 영역을 빈 자리로 두고 실제 문구는 후편집(Figma)으로 넣음(2026-07-02 결정). 문서와 프롬프트의 한글 문구는 후편집용 참조 카피이며 이미지에 박지 않음. AI 한글 렌더 불안정 문제도 이로써 회피함

# 2. 공통 설계

## 가. 화면 목록과 분류

화면을 Step 순으로 정리함. 분류는 공용(공유 화면)과 덧뵈기 고유로 나눔. 공용은 [[시범콘텐츠 공통 사양#5. 공통 화면]] 세션 화면을 포함함. 이어하기(학습 토큰 스캔)는 2차연도 전방 설계라 1차연도 미적용이며([[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]]) 참고로만 표에 둠.

| 순서 | 화면 | Step | 분류 | 기획서 근거 |
| --- | --- | --- | --- | --- |
| 가 | 시작 화면 | Step 1 | 공용 (인트로, §5.나) | [[덧뵈기 - 양반 놀리기 4컷 기획서#1) Step 1. 인트로 (시작 + 동의)]] |
| 나 | 학습 토큰 스캔 화면 | Step 1 | 공용 (플랫폼 이어하기, 2차연도 전방 설계, 1차연도 미적용) | [[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]] |
| 다 | 가이드 화면 | Step 1 | 공용 (인트로, §5.나) | [[덧뵈기 - 양반 놀리기 4컷 기획서#1) Step 1. 인트로 (시작 + 동의)]] |
| 라 | 동의 약관 화면 | Step 1 | 공용 (인트로, §5.나) | [[덧뵈기 - 양반 놀리기 4컷 기획서#1) Step 1. 인트로 (시작 + 동의)]] |
| 마 | 이름 입력 화면 | Step 2 | 덧뵈기 고유 | [[덧뵈기 - 양반 놀리기 4컷 기획서#2) Step 2. 캐릭터 정보 입력]] |
| 바 | 캐릭터 카드 선택 화면 | Step 2 | 덧뵈기 고유 | [[덧뵈기 - 양반 놀리기 4컷 기획서#2) Step 2. 캐릭터 정보 입력]] |
| 사 | 양반 놀리기 세부 유형 선택 화면 | Step 3 | 덧뵈기 고유 | [[덧뵈기 - 양반 놀리기 4컷 기획서#3) Step 3. 양반 놀리기 세부 유형 선택과 플롯 문답 (컷별 반복)]] |
| 아 | 말뚝이 문답 화면 | Step 3 | 덧뵈기 고유 (핵심) | [[덧뵈기 - 양반 놀리기 4컷 기획서#3) Step 3. 양반 놀리기 세부 유형 선택과 플롯 문답 (컷별 반복)]] |
| 자 | 생성 대기 화면 | Step 4 | 공용 (대기, §5.다) | [[덧뵈기 - 양반 놀리기 4컷 기획서#4) Step 4. 결과물 생성과 대기 화면 (병행)]] |
| 차 | 결과물 감상 화면 (4컷 만화) | Step 5 | 덧뵈기 고유 | [[덧뵈기 - 양반 놀리기 4컷 기획서#5) Step 5. 결과물 표시 (4컷 만화)]] |
| 카 | 결과물 QR 화면 | Step 6 | 공용 (전송, §5.라) | [[덧뵈기 - 양반 놀리기 4컷 기획서#6) Step 6. 결과물 전송]] |
| 타 | 마무리 인사 화면 | Step 7 | 공용 (종료, §5.마) | [[덧뵈기 - 양반 놀리기 4컷 기획서#7) Step 7. 종료와 리셋]] |
| 파 | 실패 안내 (모달 팝업) | 실패 시(공통) | 공용 (실패 안내, §5.바) | [[시범콘텐츠 공통 사양#바. 실패 안내 (사과 모달 팝업)]] |

## 나. 공통 레이아웃

모든 화면은 [[시범콘텐츠 공통 사양#5. 공통 화면]] 가. 공통 영역 골격(16:9 가로)을 따름. 헤더(제목과 상태), 본문(주기능), 액션(버튼) 세 영역에 호스트 슬롯(진행 호스트가 들어갈 자리)을 얹는 구조임. 참여자가 화면 앞 가운데 서서 터치하므로 터치 조작 요소는 중앙 도달 존(가운데 폭, 눈높이~허리)에 두고 화면 가장자리는 피함([[시범콘텐츠 공통 사양#5. 공통 화면]] 가. 도달성). 본 콘텐츠는 카메라를 쓰지 않아 모션/카메라 화면 예외가 없으므로 전 화면에 도달 존을 그대로 적용함. 공용 화면은 §13 참조 이미지가 이 배치와 호스트 측면 안내를 이미 담고 있어 그대로 계승함.

- **공용 화면**: §5 나~마의 동작별 표준 레이아웃을 그대로 따르고, 덧뵈기 고유분(말뚝이, 탈 비주얼, 한글 카피)만 각 영역에 끼움. 각 화면 설계의 레이아웃 항목에 준용 절을 명시함. 단 학습 토큰 스캔은 [[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]]를 정본으로 하되 §5 세션 화면 목록 밖이라 16:9 골격 위에서 레이아웃을 직접 설계함
- **고유 화면**: 같은 16:9 영역 골격 위에서 덧뵈기 메커닉(이름 입력, 캐릭터 카드, 세부 유형 선택, 말뚝이 문답, 결과물 감상)에 맞춰 레이아웃을 상세 설계함. 전부 터치 화면이라 입력 필드, 가상 키보드, 카드, 컷 넘김 등 조작 요소를 중앙 도달 존에 둠
- **덧뵈기 공통 요소**: 진행 호스트는 말뚝이임(역할은 [[덧뵈기 - 양반 놀리기 4컷 기획서#바. 말뚝이 진행 호스트]], 구체 비주얼 미확정이라 전 화면에서 "말뚝이 탈 호스트 캐릭터"로만 묘사). 공통 화면에서는 말뚝이를 중앙 조작 존 옆 여유 공간에 화면 속 안내 캐릭터로 또렷이 두고 유저를 향해 안내하는 포즈로 함(실사 행인이나 다른 사용자로 오인되지 않게, §5.가 호스트 슬롯). 말뚝이 문답 화면은 말뚝이가 화자로 전면에 서는 고유 화면임

## 다. 공통 프롬프트 양식

모든 화면 프롬프트가 공유하는 고정부(제약과 부정 프롬프트)와, 화면마다 채우는 변수 슬롯을 정의함.

생성 방식은 §13 중립 이미지 유무로 갈리며, 분류(공용/고유)와 별개 축임.

- **참조 이미지 기반** (시작, 가이드, 동의 약관, 이름 입력, 말뚝이 문답, 대기, 전송, 종료, 실패 안내. 학습 토큰 스캔은 2차연도라 1차연도 프롬프트 미작성): [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]]의 중립 레이아웃 이미지를 첨부 입력으로 받아, 영역 구조와 요소 배치를 유지하며 중립 플레이스홀더를 덧뵈기 고유 요소(말뚝이, 탈 비주얼, 한글 카피)로 치환함. 프롬프트에 첨부 이미지를 명시함. 이름 입력과 말뚝이 문답은 텍스트 입력 화면이라 §13.다 9) 텍스트 입력 중립 이미지를 씀
- **단독 프롬프트** (캐릭터 카드, 세부 유형 선택, 결과물 감상): 첨부할 중립 이미지가 없어 아래 공통 제약에 화면별 내용을 이어 붙인 단독 완결형 프롬프트로 생성함

### 1) 공통 제약 (모든 화면 공유)

- **매체와 형식**: 키오스크 터치스크린 UI 화면 목업, 풀스크린, 실사풍 고해상도
- **화면비와 규격**: 16:9 가로 (해상도는 디바이스 규격 확정 후, 예: 1920x1080, 확인 필요)
- **아트 디렉션 (제안, 확정 필요)**: 한국 전통 탈춤(덧뵈기) 모티프와 현대 키오스크 UI의 결합. 오방색과 단청 계열 포인트 컬러, 한지와 목재 질감을 절제해 사용. 진행 호스트(말뚝이)는 2D 플랫 일러스트 스타일로 통일함(3D 아님, 2026-07-02 결정)
- **전통 정합성**: 한국 탈춤 탈 양식 유지, 일본 노멘(일본 가면극 가면)이나 중국 가면과 혼동 금지 ([[덧뵈기 - 양반 놀리기 4컷 기획서#라. 4컷 만화 이미지 생성 모델 (런타임)]])
- **톤과 무드**: 마당놀이 축제의 신명, 밝고 활기차며 친근함
- **UI 원칙**: 큰 터치 타깃, 명확한 시각 위계, 노년층 포함 가독성
- **화면 내 텍스트 (후편집)**: 이미지에 텍스트를 렌더링하지 않음. 텍스트 영역은 빈 플레이스홀더로 두고 문구는 후편집(Figma)으로 넣음. 프롬프트와 각 화면 "화면 내 텍스트"의 한글 문구는 참조 카피임

### 2) 화면별 변수 슬롯

화면마다 아래 항목을 채움. 단독 프롬프트는 §2.다 1) 공통 제약 뒤에 화면별 내용을 이어 붙이고, 참조 이미지 기반 프롬프트는 §13 중립 이미지를 첨부함(위 생성 방식 구분, 분류와 별개 축).

1. **레이아웃**: 16:9 영역(헤더, 본문, 액션) 배치. 공용 화면은 §5 준용 절을 밝힘(이어하기 토큰 스캔은 [[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]] 정본, §5 세션 목록 밖이라 직접 설계)
2. **핵심 UI 컴포넌트**: 이 화면 고유 요소
3. **말뚝이 호스트**: 위치, 상태, 안내 포즈. 공통 화면은 측면에 또렷한 안내 캐릭터, 말뚝이 문답 화면은 화자로 전면에 둠
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

- **레이아웃**: 공통 사양 §5.나 인트로 시작 화면 준용. 헤더에 콘텐츠 타이틀, 본문에 4컷 만화 대표 비주얼, 액션에 큰 시작 버튼을 둠. 말뚝이가 환영하며 등장함 (보조 이어하기 버튼은 2차연도 전방 설계라 1차연도 미배치, §2.가 나. 학습 토큰 스캔)
- **핵심 UI 컴포넌트**: 큰 "시작하기" 터치 버튼, 콘텐츠 타이틀, 양반 풍자 만화 대표 비주얼
- **말뚝이 호스트**: 한쪽 측면에서 유저를 향해 손짓하며 환영, 밝은 표정(중앙은 타이틀과 시작 버튼 자리)
- **화면 내 텍스트**: 타이틀 "양반 놀리기 4컷", 버튼 "시작하기"

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.1) 시작 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 header/body/action regions and the position and size of every element (title, primary start button, host). There is no secondary button (the resume/이어하기 button is a 2nd-year feature and is not placed in year 1). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum/deotboegi) 4-panel satire comic experience, without moving or resizing them:
- the guide-host placeholder (keep its clear side presence and presenting pose from the reference) -> a stylized Korean Maldukki mask host character (the talchum servant who mocks the yangban, an on-screen guide character, not a realistic bystander or a second user) welcoming with a beckoning gesture and a bright expression
- the content-area and background placeholders -> Korean talchum mask motifs over a vibrant traditional madang stage, festive attract mood
Keep title '양반 놀리기 4컷', primary button '시작하기'.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 나. Step 1. 학습 토큰 스캔 화면 (2차연도 전방 설계, 1차연도 미적용)

이 화면은 2차연도 전방 설계이며 1차연도 UI는 구현하지 않음. 재방문 옵트인 학습자가 학습 토큰(QR)을 스캔해 진척과 동의를 복원하는 플랫폼 이어하기 화면으로, 정본은 [[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]](subject_id 기반 복원)임. 상세 레이아웃과 프롬프트는 2차연도 설계에서 확정함.

## 다. Step 1. 가이드 화면

공용 화면(인트로, [[시범콘텐츠 공통 사양#5. 공통 화면]] 나). 말뚝이가 인사하고 체험 흐름을 안내함.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.나 인트로 가이드 화면 준용. 본문에 진행 흐름 안내 일러스트, 액션에 다음 버튼을 둠. 말뚝이가 화자로 등장함
- **핵심 UI 컴포넌트**: 진행 흐름 안내 일러스트(이름 짓기, 유형 고르기, 말뚝이와 문답, 4컷 만화 받기), "다음" 버튼
- **말뚝이 호스트**: 화자로 등장해 설명, 재담하는 표정
- **화면 내 텍스트**: 인사말 "어서 오세요"(표본 카피), 버튼 "다음"

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.2) 가이드 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 header/body/action regions and the position and size of every element (flow illustration, next button, host). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum/deotboegi) 4-panel satire comic experience, without moving or resizing them:
- the guide-host placeholder (keep its clear side presence and presenting pose from the reference) -> a stylized Korean Maldukki mask host character (the talchum servant who mocks the yangban, an on-screen guide character, not a realistic bystander) acting as the narrator with a lively storytelling expression
- the flow-illustration placeholder -> an instructional illustration of the flow (name your hero, choose a type, answer Maldukki, receive a 4-panel comic) in talchum styling
- background -> a traditional madang stage, friendly mood
Keep greeting '어서 오세요', button '다음'.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 라. Step 1. 동의 약관 화면

공용 화면(인트로, [[시범콘텐츠 공통 사양#5. 공통 화면]] 나). 필수 동의를 받음. 본 콘텐츠는 카메라를 쓰지 않아 필수 동의 항목은 이용 약관 동의임(카메라 동의 없음). 정확한 동의 항목과 문구는 규정 검토 확정(확인 필요).

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.나 인트로 동의 약관 화면 준용. 본문에 약관 텍스트, 액션에 동의하고 시작 버튼과 그만두기 보조 버튼을 둠(동의하고 시작이 곧 약관 동의, 그만두기가 미동의. 1차연도는 선택 동의가 없어 별도 토글을 두지 않음). 화면 타임아웃 미적용. 말뚝이는 넓은 측면에 또렷한 안내 캐릭터로 둠
- **핵심 UI 컴포넌트**
	- 약관 텍스트 영역 (필수 이용 약관, 문구는 규정 검토 확정)
	- 주 버튼 "동의하고 시작": 약관 동의를 담음(별도 토글 없음, 항상 활성)
	- 보조 "그만두기" 버튼: 동의하지 않고 Step 7로 종료함
- **말뚝이 호스트**: 넓은 측면에 또렷한 안내 캐릭터로, 유저를 향해 안내하는 포즈(중앙 도달 존 조작은 가리지 않음)
- **상태별 안내 (기획서 준용)**: 그만두기 버튼 터치, 미동의, 터치 미입력 타임아웃 시 미동의로 간주해 종료 Step 직행은 기획서 Step 1과 공통 사양 §5.나를 준용함(목업은 정상 동의 상태만)
- **화면 내 텍스트**: 타이틀 "이용 동의"(표본), 약관 라벨 "이용 약관 (필수)"(표본, 문구는 규정 검토 확정), 버튼 "동의하고 시작", "그만두기"

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.3) 동의 약관 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 header/body/action regions and the position and size of every element (title, terms area, primary/secondary buttons, host). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum/deotboegi) 4-panel satire comic experience, without moving or resizing them:
- the guide-host placeholder (keep its clear side presence and presenting pose from the reference) -> a stylized Korean Maldukki mask host guide as a clear side presence in a presenting pose (an on-screen guide character, not a realistic bystander or a second user)
- background -> a calm traditional madang stage
Keep title '이용 동의'. Do NOT render any consent toggle; consent is expressed by the buttons (this content has a single required 약관 consent and no camera consent, so there is no toggle row; if the reference mockup shows toggle rows, omit them). Keep primary button '동의하고 시작' (active), secondary button '그만두기'.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 마. Step 2. 이름 입력 화면

덧뵈기 고유 화면. 유저가 주인공(자기 탈 캐릭터)의 이름을 가상 키보드나 음성(STT)으로 지어 입력함. 클라이언트 비속어 필터로 검증하고, 걸리면 재입력 안내함 ([[덧뵈기 - 양반 놀리기 4컷 기획서#2) Step 2. 캐릭터 정보 입력]]).

### 1) 화면 설계

- **레이아웃** (고유, 16:9 골격, 조작 요소를 중앙 도달 존에 집약)
	- 헤더: 안내 카피 한 줄
	- 본문 중앙: 이름 입력 필드와 가상 키보드, 음성 입력 버튼을 중앙 도달 존에 둠(터치와 음성 조작이라 좌우 끝에 두지 않음). 키보드는 하단에 한정해 안내와 입력 필드가 위에 보이게 함
	- 액션: 다음 버튼을 중앙 도달 존 아래쪽에 둠(물리 최하단 아님)
- **핵심 UI 컴포넌트**
	- 이름 입력 필드
	- 가상 키보드(한글)와 "음성으로 입력" 버튼(STT). 두 입력 수단 병행 ([[시범콘텐츠 공통 사양#사. 텍스트 입력]])
	- "다음" 버튼
- **말뚝이 호스트**: 측면에 또렷한 안내 캐릭터로, 유저를 향해 이름을 청하는 포즈(중앙 도달 존 조작은 가리지 않음)
- **상태별 안내 (기획서 준용)**: 비속어 검출 시 팝업 안내와 재입력, 백엔드 재검증, 터치 미입력 타임아웃 시 종료 Step 직행은 기획서 Step 2와 §5.나 개인정보와 연속성을 준용함(목업은 정상 입력 상태만)
- **화면 내 텍스트**: 안내 "이름을 지어 주세요", 버튼 "음성으로 입력", "다음"

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.9) 텍스트 입력 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 header/body/action regions and the position and size of every element (header/prompt area, text input field, on-screen keyboard confined to a lower band, voice-input button, primary '다음' button, host). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum/deotboegi) 4-panel satire comic experience, without moving or resizing them:
- the guide-host placeholder (keep its clear side presence from the reference) -> a stylized Korean Maldukki mask host character (the talchum servant who mocks the yangban, an on-screen guide character, not a realistic bystander or a second user) inviting the user to name their hero, not blocking the central controls
- the prompt/question area -> a one-line caption prompting for a name (this screen has no host question bubble)
- the background placeholders -> a traditional madang stage, warm inviting mood
Keep caption '이름을 지어 주세요', voice-input button '음성으로 입력', primary button '다음'. The on-screen keyboard stays confined to a lower band and the caption and input field remain clearly visible above it.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 바. Step 2. 캐릭터 카드 선택 화면

덧뵈기 고유 화면. 유저가 주인공 탈 캐릭터 카드 1개를 고름. 카드는 연령대(아이/청소년/청년/장년)와 성별(남/여)을 곱한 8종이며, 각 카드는 덧뵈기 배역 탈 양식의 캐릭터임 ([[덧뵈기 - 양반 놀리기 4컷 기획서#2) Step 2. 캐릭터 정보 입력]], §4.가 3) 유저 탈 캐릭터).

### 1) 화면 설계

- **레이아웃** (고유, 16:9 골격, 카드 그리드를 중앙 도달 존에 집약)
	- 헤더: 안내 카피 한 줄
	- 본문 중앙: 8개 캐릭터 카드 그리드(예: 4열 2행)를 중앙 도달 존에 둠(터치 선택이라 좌우 끝에 두지 않음)
	- 액션: 선택 후 다음 버튼을 중앙 도달 존 아래쪽에 둠(물리 최하단 아님)
- **핵심 UI 컴포넌트**
	- 캐릭터 카드 8종: 연령대(아이/청소년/청년/장년) × 성별(남/여). 각 카드는 덧뵈기 배역 탈 양식의 인물
	- 선택 표시(하이라이트)
	- "다음" 버튼
- **말뚝이 호스트**: 측면에 또렷한 안내 캐릭터로, 유저에게 고르라고 권하는 포즈(중앙 도달 존 조작은 가리지 않음)
- **상태별 안내 (기획서 준용)**: 카드 미선택 시 다음 비활성, 터치 미입력 타임아웃 등은 기획서 Step 2 분기를 준용함(목업은 정상 선택 상태만)
- **화면 내 텍스트**: 안내 "주인공을 골라 주세요", 카드 라벨 "아이 남"/"아이 여"/"청소년 남"/"청소년 여"/"청년 남"/"청년 여"/"장년 남"/"장년 여"(표본), 버튼 "다음"

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a horizontal 16:9 kiosk touchscreen, full screen.
The character card selection screen of a Korean traditional mask dance (talchum/deotboegi) 4-panel satire comic experience.
Large-screen kiosk where a person stands centered and touches: keep all interactive cards within a central reachable zone (center of the width, eye-to-waist height), not at the screen edges.
Top header: a one-line caption '주인공을 골라 주세요'.
Center, within reach: a grid of 8 selectable character cards (for example 4 columns by 2 rows), each card a Korean talchum role-mask styled hero figure, labeled by age and gender '아이 남', '아이 여', '청소년 남', '청소년 여', '청년 남', '청년 여', '장년 남', '장년 여'. One card is highlighted as selected.
A primary button labeled '다음' in the lower part of the central reachable zone, not at the physical bottom edge.
To one side: a stylized Korean Maldukki mask host character (the talchum servant who mocks the yangban, an on-screen guide character, not a realistic bystander) encouraging the choice, not blocking the central controls.
Background: a traditional madang stage, warm inviting mood.
Art direction: Korean traditional talchum motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 사. Step 3. 양반 놀리기 세부 유형 선택 화면

덧뵈기 고유 화면. 유저가 양반 놀리기 세부 유형 중 하나를 고름. 시스템은 그 세부 유형 풀에서 랜덤 플롯 1개를 배정함 ([[덧뵈기 - 양반 놀리기 4컷 기획서#3) Step 3. 양반 놀리기 세부 유형 선택과 플롯 문답 (컷별 반복)]]). 구체 세부 유형 로스터는 기획서 세분화 설계에서 확정 예정이라 카드 수와 라벨은 표본임(확인 필요).

### 1) 화면 설계

- **레이아웃** (고유, 16:9 골격, 카드를 중앙 도달 존에 집약)
	- 헤더: 안내 카피 한 줄
	- 본문 중앙: 양반 놀리기 세부 유형 카드(병렬)를 중앙 도달 존에 둠(터치 선택이라 좌우 끝에 두지 않음)
	- 액션: 선택 후 다음 버튼을 중앙 도달 존 아래쪽에 둠(물리 최하단 아님)
- **핵심 UI 컴포넌트**
	- 세부 유형 카드(표본 3종: 허세, 탐욕, 무능). 구체 로스터와 카드 수는 확인 필요([[덧뵈기 - 양반 놀리기 4컷 기획서]] §4.가 1) 세분화)
	- 각 카드의 짧은 소개 문구와 탈춤 양식 일러스트
	- 선택 표시(하이라이트)
	- "다음" 버튼
- **말뚝이 호스트**: 측면에 또렷한 안내 캐릭터로, 어떤 양반을 놀릴지 권하는 포즈(중앙 도달 존 조작은 가리지 않음)
- **상태별 안내 (기획서 준용)**: 터치 미입력 타임아웃 등은 기획서 Step 3 분기를 준용함(목업은 정상 선택 상태만)
- **화면 내 텍스트**: 안내 "어떤 양반을 놀려 볼까요"(표본), 카드 라벨 "허세"/"탐욕"/"무능"(표본, 로스터 확인 필요), 버튼 "다음"

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a horizontal 16:9 kiosk touchscreen, full screen.
The yangban-satire subtype selection screen of a Korean traditional mask dance (talchum/deotboegi) 4-panel satire comic experience.
Large-screen kiosk where a person stands centered and touches: keep all interactive cards within a central reachable zone (center of the width, eye-to-waist height), not at the screen edges.
Top header: a one-line caption '어떤 양반을 놀려 볼까요'.
Center, within reach: three selectable subtype cards side by side (sample roster), each with a short intro line and a talchum styled illustration, labeled '허세', '탐욕', '무능'. One card is highlighted as selected.
A primary button labeled '다음' in the lower part of the central reachable zone, not at the physical bottom edge.
To one side: a stylized Korean Maldukki mask host character (the talchum servant who mocks the yangban, an on-screen guide character, not a realistic bystander) inviting the user to pick a subtype, not blocking the central controls.
Background: a traditional madang stage, festive mood.
Art direction: Korean traditional talchum motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 아. Step 3. 말뚝이 문답 화면

덧뵈기 고유 화면(핵심 상호작용). 배정된 플롯의 컷(기/승/전/결)마다 말뚝이가 사전 생성된 고정 질문을 던지고, 유저가 가상 키보드나 음성(STT)으로 답함. 컷 수만큼 반복함 ([[덧뵈기 - 양반 놀리기 4컷 기획서#3) Step 3. 양반 놀리기 세부 유형 선택과 플롯 문답 (컷별 반복)]]).

### 1) 화면 설계

- **레이아웃** (고유, 16:9 골격, 말뚝이 화자 전면 + 응답 입력 중앙 도달 존)
	- 헤더: 컷 진행 표시(기 → 승 → 전 → 결 중 현재 위치)
	- 본문 상단: 말뚝이 캐릭터와 질문 말풍선(사전 생성 고정 질문)
	- 본문 중앙: 응답 입력 필드와 가상 키보드, 음성 입력 버튼을 중앙 도달 존에 둠(터치와 음성 조작이라 좌우 끝에 두지 않음)
	- 액션: 다음(제출) 버튼을 중앙 도달 존 아래쪽에 둠
- **핵심 UI 컴포넌트**
	- 말뚝이 캐릭터와 질문 말풍선
	- 응답 입력 필드
	- 가상 키보드(한글)와 "음성으로 답하기" 버튼(STT). 두 입력 수단 병행
	- 컷 진행 인디케이터(기/승/전/결 4컷)
	- "다음" 버튼
- **말뚝이 호스트**: 본문 상단에 화자로 전면 등장(질문을 던지는 주역). 본 화면은 말뚝이가 조작을 가리지 않는 상단 영역에 서고 응답 입력이 중앙 도달 존을 차지함
- **상태별 안내 (기획서 준용)**: 가드레일 위반 시 팝업 안내와 재입력, 터치 미입력 타임아웃은 기획서 Step 3 분기를 준용함(목업은 정상 문답 상태만)
- **화면 내 텍스트**: 컷 라벨 "기"/"승"/"전"/"결", 질문 예시 "양반이 뭐라고 뻐기던가요?"(표본, 사전 생성 고정 질문), 버튼 "음성으로 답하기", "다음"

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.9) 텍스트 입력 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 header/body/action regions and the position and size of every element (header/progress area, prompt/question area, text answer field, on-screen keyboard confined to a lower band, voice-input button, primary '다음' button, host). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum/deotboegi) 4-panel satire comic experience, without moving or resizing them:
- the header placeholder -> a 4-stage progress indicator '기', '승', '전', '결' with the current stage marked
- the host placeholder and the prompt/question area -> a stylized Korean Maldukki mask host character (the talchum servant who mocks the yangban, an on-screen guide character, not a realistic bystander or a second user) as the narrator posing the question, with a speech bubble showing a fixed question '양반이 뭐라고 뻐기던가요?', kept in the upper area and not blocking the central controls
- the background placeholders -> a traditional madang stage, satirical storytelling mood
Keep progress labels '기'/'승'/'전'/'결', question '양반이 뭐라고 뻐기던가요?', voice-input button '음성으로 답하기', primary button '다음'. The on-screen keyboard stays confined to a lower band and the question and answer field remain clearly visible above it.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 자. Step 4. 생성 대기 화면

공용 화면(대기, [[시범콘텐츠 공통 사양#5. 공통 화면]] 다). 4컷 만화를 생성하는 동안 대기 콘텐츠를 노출함.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.다 대기 준용. 본문 중앙에 진행 인디케이터와 대기 콘텐츠, 상태 문구를 둠. 헤더와 액션은 비움(입력받지 않음). 두 타임아웃 미적용. 말뚝이는 측면에 또렷한 안내 캐릭터로 둠
- **핵심 UI 컴포넌트**: 진행 인디케이터(원형이나 바), 대기 콘텐츠(덧뵈기 소개 영상이나 큐레이션, [[덧뵈기 - 양반 놀리기 4컷 기획서]] §4.사 콘텐츠 자산), 안내 문구
- **말뚝이 호스트**: 대기 동안 재담으로 흥을 돋움 (측면 또렷한 안내 캐릭터)
- **화면 내 텍스트**: 안내 "만화를 그리는 중", 진행률

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.4) 대기 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 body-centered layout and the position and size of every element (progress indicator, status caption, host). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum/deotboegi) 4-panel satire comic experience, without moving or resizing them:
- the progress/visual placeholder -> a progress indicator with light talchum themed waiting content while a 4-panel comic is being drawn
- the guide-host placeholder (keep its clear side presence and presenting pose from the reference) -> a stylized Korean Maldukki mask host guide keeping up the mood during the wait, as a clear side presence (an on-screen guide character, not a realistic bystander)
- background -> a traditional madang stage, an anticipatory waiting mood
Keep status caption '만화를 그리는 중'.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 차. Step 5. 결과물 감상 화면 (4컷 만화)

덧뵈기 고유 화면. 완성된 4컷 만화를 감상함. 4컷 전체를 보고 개별 컷을 확대하거나 넘겨 봄. 감상 뒤 받기 버튼이 나옴 ([[덧뵈기 - 양반 놀리기 4컷 기획서#5) Step 5. 결과물 표시 (4컷 만화)]]).

### 1) 화면 설계

- **레이아웃** (고유, 16:9 골격 위 4컷 만화 뷰어)
	- 헤더: 타이틀
	- 본문 중앙: 4컷 만화 전체(예: 2열 2행)를 중앙에 크게 배치
	- 확대와 컷 넘김: 개별 컷 확대와 컷 넘김 컨트롤을 중앙 도달 존 안에 둠(화면 물리 끝이 아니라 손 닿는 범위)
	- 액션: 감상 뒤 "받기" 버튼을 중앙 도달 존 아래쪽에 둠(물리 최하단 아님)
- **핵심 UI 컴포넌트**
	- 4컷 만화 뷰어(탈 캐릭터 등장, 컷별 말풍선 대사)
	- 확대(줌)와 컷 넘김 컨트롤(도달 존 안)
	- "받기" 버튼
- **말뚝이 호스트**: 측면에 또렷한 안내 캐릭터로 결과를 자랑하듯(중앙 도달 존 조작은 가리지 않음)
- **상태별 안내 (기획서 준용)**: 화면 타임아웃 발동 시 전송 단계로 정상 진행은 기획서 Step 5 분기를 준용함(목업은 정상 열람 상태만)
- **화면 내 텍스트**: 타이틀 "나의 양반 놀리기 4컷", 버튼 "받기"

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a horizontal 16:9 kiosk touchscreen, full screen.
The result viewer screen (4-panel comic reader) of a Korean traditional mask dance (talchum/deotboegi) 4-panel satire comic experience.
Title: '나의 양반 놀리기 4컷'.
Center: a complete 4-panel comic (for example a 2-by-2 grid) displayed large in the middle, featuring the user's talchum mask hero character and speech-bubble dialogue in each panel.
Zoom and panel navigation: a zoom (enlarge) control and panel-navigation controls placed within the central reachable zone (not at the physical screen edges).
After viewing, a primary button labeled '받기' in the lower part of the central reachable zone (not at the physical bottom edge).
To one side: a stylized Korean Maldukki mask host character (the talchum servant who mocks the yangban, an on-screen guide character, not a realistic bystander or a second user) reacting proudly to the result, not blocking the central controls.
Background: a traditional madang stage, a proud showcase mood.
Art direction: Korean traditional talchum motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 카. Step 6. 결과물 QR 화면

공용 화면(전송, [[시범콘텐츠 공통 사양#5. 공통 화면]] 라). 4컷 만화 결과물을 웹에 호스팅하고 그 다운로드 주소를 QR로 화면에 표시해 유저가 본인 휴대폰으로 스캔해 받게 함. 연락처를 받지 않아 본 콘텐츠가 수집하는 개인정보는 없음([[덧뵈기 - 양반 놀리기 4컷 기획서#1) 개인정보 처리]]).

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.라 전송 준용. 본문 중앙에 QR 코드를 크게 두고, 그 위나 아래에 스캔 안내와 다운로드 가능 기간 문구를 둠. 액션에 마침 버튼을 둠. 연락처 입력 필드와 키패드, 전송이나 받지 않기 버튼, 개인정보 수집 고지는 두지 않음. 화면 타임아웃 적용(감상 성격). 말뚝이는 넓은 측면에 또렷한 안내 캐릭터로 둠. 조작 요소는 중앙 도달 존에 둠
- **핵심 UI 컴포넌트**
	- 결과물 QR 코드(다운로드 URL 인코딩, 유저가 본인 휴대폰으로 스캔)
	- 스캔 안내와 다운로드 가능 기간 문구
	- "마침" 버튼
- **말뚝이 호스트**: 넓은 측면에 또렷한 안내 캐릭터로, QR을 가리키며 안내하는 포즈(중앙 도달 존 조작은 가리지 않음)
- **상태별 안내 (기획서 준용)**: 결과물 업로드나 호스팅 실패 시 사과 후 종료 Step, 화면 타임아웃 발동 시 종료 Step 정상 진행 등은 기획서 Step 6과 공통 사양 §5.라 결과물 전송을 준용함(목업은 정상 표시 상태만)
- **화면 내 텍스트**: 안내 "휴대폰으로 스캔해 받으세요", 다운로드 가능 기간 안내(예시, 정확한 문구는 규정 검토 확정), 버튼 "마침"

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.5) 전송 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 header/body/action regions and the position and size of every element (guide caption, large QR code, finish button, host). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum/deotboegi) 4-panel satire comic experience, without moving or resizing them:
- the guide-host placeholder (keep its clear side presence and presenting pose from the reference) -> a stylized Korean Maldukki mask host guide as a clear side presence in a presenting pose (an on-screen guide character, not a realistic bystander or a second user)
- background -> a calm traditional madang stage
Keep the large QR-code placeholder (a generic decorative square pattern that encodes nothing) centered, add a guide caption '휴대폰으로 스캔해 받으세요', and a single button '마침'.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image. The QR code is a generic decorative square pattern and encodes nothing. No English text either.
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
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 body-centered layout and the position and size of every element (host at center, closing message). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum/deotboegi) 4-panel satire comic experience, without moving or resizing them:
- the guide-host placeholder (keep its central position and farewell pose from the reference; on this closing screen the host is centered, not to the side) -> a stylized Korean Maldukki mask host character giving a warm farewell
- background -> a traditional madang stage, a warm closing mood
Keep the closing message '또 만나요'.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 파. 실패 안내 (모달 팝업, 실패 분기 공통)

공용 화면(실패 안내, [[시범콘텐츠 공통 사양#바. 실패 안내 (사과 모달 팝업)]]). 생성이나 호스팅 실패, 상태 조회 무응답 등 실패 분기가 모이는 공통 화면임. 사과 안내를 보이고 종료 Step으로 자동 진행함.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.바 실패 안내 준용. 전체 화면이 아니라 직전 화면을 어둡게 깐 위에 중앙 모달 다이얼로그 카드를 띄우고, 카드 안에 경고 아이콘, 사과 메시지, 짧은 안내, (선택) 처음으로 보조 버튼을 둠. 액션은 기본 비움(자동 종료 진행), 오류 코드나 기술 세부는 노출하지 않음. 말뚝이는 카드 옆에서 다독이는 모습으로 둠
- **핵심 UI 컴포넌트**: 사과 메시지, 선택적 "처음으로" 보조 버튼(두면 중앙 도달 존)
- **말뚝이 호스트**: 측면이나 중앙에서 다독이는 표정
- **화면 내 텍스트**: 사과 "문제가 생겼어요"(표본), 선택 버튼 "처음으로"

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.8) 실패 안내 중립 레이아웃 이미지

```
Use the attached neutral modal-popup mockup as the structural reference. Keep its centered modal dialog card over a dimmed background and the position and size of every element (warning icon, apology message, optional secondary button, host beside the card). Replace the neutral placeholders with content-specific elements for a Korean traditional mask dance (talchum/deotboegi) 4-panel satire comic experience, without moving or resizing them:
- the guide-host placeholder (keep its clear presence and reassuring pose from the reference) -> a stylized Korean Maldukki mask host character (the talchum servant who mocks the yangban, an on-screen guide character, not a realistic bystander) reassuring the user warmly
- background -> a calm traditional madang stage, a reassuring mood
Keep the apology message '문제가 생겼어요'; do not show error codes or technical details.
Art direction: Korean traditional talchum motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Japanese Noh or Chinese opera masks, error codes or technical error details, and any UI buttons, toolbars, or controls not specified in this prompt.
```

# 4. 관련 문서

- [[덧뵈기 - 양반 놀리기 4컷 기획서]]: 콘텐츠 로직과 Step 명세 정본
- [[시범콘텐츠 공통 사양]]: 공통 화면 레이아웃(§5)과 진행 호스트(§6) 골격 정본
- [[공통 UI 컴포넌트]]: 본 문서 화면 요소의 위젯 단위 공통 컴포넌트 색인
- [[덧뵈기 - 나만의 탈춤 UI]]: 자매 UI 문서 (같은 덧뵈기 소재, 체험형)
- [[덜미 - 나만의 유람기 UI]]: 자매 UI 문서 (생성형 화면 설계 방식 공유)
