---
title: 버나 - 버나잡이 한 판 UI
type: project
status: draft
tags: [project, kocca, 시범콘텐츠, 버나, UI]
created: 2026-07-02
updated: 2026-07-07
---

> 버나(접시돌리기) 묘기와 매호씨 재담 대결 체험 키오스크의 화면별 UI 설계. 각 화면의 레이아웃(16:9 영역 배치)과 예시 이미지 생성 프롬프트를 함께 담음. 공용 화면(인트로, 전송, 종료)은 [[시범콘텐츠 공통 사양#5. 공통 화면]] 표준을, 이어하기 학습 토큰 스캔은 [[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]]를 따르고 버나 고유분만 더하며, 고유 화면(버나 돌리기, 마무리 연출, 기록증 미리보기)은 레이아웃을 상세 설계함. 캐릭터 입력과 생성 대기가 없어 설계 화면이 9개(학습 토큰 스캔 제외)로 자매 콘텐츠보다 적음. 기획은 [[버나 - 버나잡이 한 판 기획서]].

# 1. 개요

- **목적**: 화면별 UI 레이아웃을 설계하고 예시 이미지 생성 프롬프트를 정리함
- **문서 성격**: 레이아웃 기획과 이미지 생성 프롬프트를 함께 담음. 레이아웃은 [[시범콘텐츠 공통 사양#5. 공통 화면]]의 16:9 영역 골격을 따름
- **대상 화면**: 10개. Step 순으로 배열함(§2.가 화면 목록). 캐릭터 정보 입력과 생성 대기 화면이 없어 자매 콘텐츠(13화면)보다 적음
- **공용과 고유**: 공용 화면 7개는 콘텐츠 무관 표준을 참조하고 버나 고유분(매호씨, 버나 비주얼, 카피)만 더함. 이 중 6개는 [[시범콘텐츠 공통 사양#5. 공통 화면]] 세션 표준을(실패 안내 화면 포함), 학습 토큰 스캔 화면 1개는 [[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]] 이어하기 복원(콘텐츠 횡단 학습 기능)을 정본으로 함. 버나 고유 화면 3개는 레이아웃을 상세 설계함. 생성 대기 화면은 없음(기념 기록증이 사전 제작 템플릿에 세션 수치를 얹는 결정적 합성이라 실시간 완료됨, [[버나 - 버나잡이 한 판 기획서#마. 기념 기록증 생성 (Step 4)]])
- **입력 특성**: 카메라를 쓰지 않고 센서 막대 주변기기와 터치, 음향을 씀([[버나 - 버나잡이 한 판 기획서]] §5.다 2) 하드웨어). 버나 돌리기 화면은 센서 막대 모션 화면이라 시뮬 뷰가 화면을 크게 쓰되, 터치 조작 요소(대거리 선택지)는 중앙 도달 존(§5.가 도달성)에 둠
- **공통 규격**: 16:9 가로 키오스크, 실사풍 UI 목업, 영어 프롬프트. 이미지 안 UI 텍스트는 한글로 렌더링함
- **사용법**: §13에 중립 레이아웃 이미지가 있는 공용 화면 6개(시작, 가이드, 동의, 전송, 종료, 실패 안내)는 그 이미지를 첨부해 참조 이미지 기반으로 생성하고(학습 토큰 스캔은 §13에 이어하기 예시 이미지가 있으나 2차연도라 1차연도 UI는 미작성. 대기 이미지는 본 콘텐츠에 해당 화면이 없어 미사용), 중립 이미지가 없는 화면(버나 고유 화면)은 §2.다 공통 제약에 화면별 프롬프트를 이어 붙여 생성함. 생성 방식은 분류(공용/고유)와 별개 축임 (방식 구분은 §2.다 공통 프롬프트 양식)
- **텍스트 주의 (후편집)**: 이미지에는 UI 텍스트를 렌더링하지 않음. 타이틀, 버튼, 카피 등 모든 텍스트 영역을 빈 자리로 두고 실제 문구는 후편집(Figma)으로 넣음(2026-07-02 결정). 문서와 프롬프트의 한글 문구는 후편집용 참조 카피이며 이미지에 박지 않음. AI 한글 렌더 불안정 문제도 이로써 회피함

# 2. 공통 설계

## 가. 화면 목록과 분류

화면을 Step 순으로 정리함. 분류는 공용(공유 화면)과 버나 고유로 나눔. 공용은 [[시범콘텐츠 공통 사양#5. 공통 화면]] 세션 화면을 포함함. 이어하기(학습 토큰 스캔)는 2차연도 전방 설계라 1차연도 미적용이며([[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]]) 참고로만 표에 둠.

| 순서 | 화면 | Step | 분류 | 기획서 근거 |
| --- | --- | --- | --- | --- |
| 가 | 시작 화면 | Step 1 | 공용 (인트로, §5.나) | [[버나 - 버나잡이 한 판 기획서#1) Step 1. 인트로 (시작 + 동의)]] |
| 나 | 학습 토큰 스캔 화면 | Step 1 | 공용 (플랫폼 이어하기, 2차연도 전방 설계, 1차연도 미적용) | [[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]] |
| 다 | 가이드 화면 (센서 막대 사용법) | Step 1 | 공용 (인트로, §5.나) | [[버나 - 버나잡이 한 판 기획서#1) Step 1. 인트로 (시작 + 동의)]] |
| 라 | 동의 약관 화면 | Step 1 | 공용 (인트로, §5.나) | [[버나 - 버나잡이 한 판 기획서#1) Step 1. 인트로 (시작 + 동의)]] |
| 마 | 버나 돌리기 화면 (재담 대결) | Step 2~3 | 버나 고유 (핵심) | [[버나 - 버나잡이 한 판 기획서#3) Step 3. 매호씨 재담 대결 (핵심 체험, 돌리기와 동시)]] |
| 바 | 마무리 연출 화면 | Step 4 | 버나 고유 | [[버나 - 버나잡이 한 판 기획서#4) Step 4. 마무리와 기록증 생성]] |
| 사 | 기록증 미리보기 화면 | Step 5 | 버나 고유 | [[버나 - 버나잡이 한 판 기획서#5) Step 5. 결과물 전송]] |
| 아 | 결과물 QR 화면 | Step 5 | 공용 (전송, §5.라) | [[버나 - 버나잡이 한 판 기획서#5) Step 5. 결과물 전송]] |
| 자 | 마무리 인사 화면 | Step 6 | 공용 (종료, §5.마) | [[버나 - 버나잡이 한 판 기획서#6) Step 6. 종료와 리셋]] |
| 차 | 실패 안내 (모달 팝업) | 실패 시(공통) | 공용 (실패 안내, §5.바) | [[시범콘텐츠 공통 사양#바. 실패 안내 (사과 모달 팝업)]] |

## 나. 공통 레이아웃

모든 화면은 [[시범콘텐츠 공통 사양#5. 공통 화면]] 가. 공통 영역 골격(16:9 가로)을 따름. 헤더(제목과 상태), 본문(주기능), 액션(버튼) 세 영역에 호스트 슬롯(진행 호스트가 들어갈 자리)을 얹는 구조임. 참여자가 화면 앞 가운데 서서 조작하므로 터치 조작 요소는 중앙 도달 존(가운데 폭, 눈높이~허리)에 두고 화면 가장자리는 피함([[시범콘텐츠 공통 사양#5. 공통 화면]] 가. 도달성). 버나 돌리기 화면은 센서 막대 모션 화면이라 시뮬 뷰가 화면을 크게 쓰는 예외이되, 그 안의 터치 조작(대거리 선택지)은 도달 존에 둠. 공용 화면은 §13 참조 이미지가 이 배치와 호스트 측면 안내를 이미 담고 있어 그대로 계승함.

- **공용 화면**: §5 나~마의 동작별 표준 레이아웃을 그대로 따르고, 버나 고유분(매호씨, 버나 비주얼, 한글 카피)만 각 영역에 끼움. 각 화면 설계의 레이아웃 항목에 준용 절을 명시함. 단 학습 토큰 스캔은 [[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]]를 정본으로 하되 §5 세션 화면 목록 밖이라 16:9 골격 위에서 레이아웃을 직접 설계함
- **고유 화면**: 같은 16:9 영역 골격 위에서 버나 메커닉(버나 돌리기와 재담 대결, 마무리 연출, 기록증 미리보기)에 맞춰 레이아웃을 상세 설계함
- **버나 공통 요소**: 진행 호스트는 매호씨임(역할은 [[버나 - 버나잡이 한 판 기획서#바. 매호씨 진행 호스트]], 구체 비주얼 미확정이라 전 화면에서 "매호씨 진행 호스트 캐릭터"로만 묘사). 매호씨는 다른 콘텐츠의 안내형 호스트와 달리 유저와 겨루는 재담 대결 상대를 겸함([[버나 - 버나잡이 한 판 기획서]] §4.라 재담 대결). 공통 화면에서는 매호씨를 중앙 조작 존 옆 여유 공간에 화면 속 안내 캐릭터로 또렷이 두고 유저를 향해 안내하는 포즈로 하며(실사 행인이나 다른 사용자로 오인되지 않게, §5.가 호스트 슬롯), 버나 돌리기 화면에서는 도발 재담을 던지는 대결 상대로 측면에 둠

## 다. 공통 프롬프트 양식

모든 화면 프롬프트가 공유하는 고정부(제약과 부정 프롬프트)와, 화면마다 채우는 변수 슬롯을 정의함.

생성 방식은 §13 중립 이미지 유무로 갈리며, 분류(공용/고유)와 별개 축임.

- **참조 이미지 기반** (시작, 가이드, 동의 약관, 전송, 종료, 실패 안내. 학습 토큰 스캔은 2차연도라 1차연도 프롬프트 미작성. 대기 화면은 본 콘텐츠에 없음): [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]]의 중립 레이아웃 이미지를 첨부 입력으로 받아, 영역 구조와 요소 배치를 유지하며 중립 플레이스홀더를 버나 고유 요소(매호씨, 버나 비주얼, 한글 카피)로 치환함. 프롬프트에 첨부 이미지를 명시함
- **단독 프롬프트** (버나 돌리기, 마무리 연출, 기록증 미리보기): 첨부할 중립 이미지가 없어 아래 공통 제약에 화면별 내용을 이어 붙인 단독 완결형 프롬프트로 생성함

### 1) 공통 제약 (모든 화면 공유)

- **매체와 형식**: 키오스크 터치스크린 UI 화면 목업, 풀스크린, 실사풍 고해상도
- **화면비와 규격**: 16:9 가로 (해상도는 디바이스 규격 확정 후, 예: 1920x1080, 확인 필요)
- **아트 디렉션 (제안, 확정 필요)**: 한국 남사당 버나(접시돌리기) 놀이판 모티프와 현대 키오스크 UI의 결합. 버나 도구(접시, 대접, 앵두나무막대기)와 풍물 장단 분위기, 오방색과 단청 계열 포인트 컬러, 한지와 목재 질감을 절제해 사용. 진행 호스트(매호씨)는 2D 플랫 일러스트 스타일로 통일함(3D 아님, 2026-07-02 결정)
- **전통 정합성**: 한국 남사당 버나(접시돌리기) 양식 유지, 중국 접시돌리기 곡예나 서양 서커스 저글링과 혼동 금지 ([[버나 - 버나잡이 한 판 기획서#가. 버나와 재담 고증 (공통 레퍼런스)]])
- **톤과 무드**: 남사당 놀이판의 신명, 밝고 활기차며 친근함
- **UI 원칙**: 큰 터치 타깃, 명확한 시각 위계, 노년층 포함 가독성
- **화면 내 텍스트 (후편집)**: 이미지에 텍스트를 렌더링하지 않음. 텍스트 영역은 빈 플레이스홀더로 두고 문구는 후편집(Figma)으로 넣음. 프롬프트와 각 화면 "화면 내 텍스트"의 한글 문구는 참조 카피임

### 2) 화면별 변수 슬롯

화면마다 아래 항목을 채움. 단독 프롬프트는 §2.다 1) 공통 제약 뒤에 화면별 내용을 이어 붙이고, 참조 이미지 기반 프롬프트는 §13 중립 이미지를 첨부함(위 생성 방식 구분, 분류와 별개 축).

1. **레이아웃**: 16:9 영역(헤더, 본문, 액션) 배치. 공용 화면은 §5 준용 절을 밝힘(이어하기 토큰 스캔은 [[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]] 정본, §5 세션 목록 밖이라 직접 설계)
2. **핵심 UI 컴포넌트**: 이 화면 고유 요소
3. **매호씨 호스트**: 위치, 상태, 안내 포즈. 공통 화면은 측면에 또렷한 안내 캐릭터, 버나 돌리기 화면은 도발 재담을 던지는 대결 상대로 측면에 둠
4. **화면 내 텍스트**: 이미지에 한글로 렌더링할 정확한 문구

### 3) 부정 프롬프트 (모든 화면 공통)

- 깨지거나 왜곡된 한글, UI 내 영어 텍스트
- 기형 손과 얼굴, 워터마크와 서명
- 저작권 캐릭터
- 매호씨 호스트가 실사 행인이나 옆에 선 다른 사용자로 오인되는 형태 (화면 속 안내 캐릭터로 명확히)
- 중국 접시돌리기 곡예나 서양 서커스 저글링과 혼동되는 형태
- 프롬프트에 지정하지 않은 임의 UI 버튼, 툴바, 컨트롤 (생성기가 키오스크 맥락에서 임의로 채우는 환각 방지)

# 3. 화면별 설계

각 화면을 §2.다 2) 변수 슬롯으로 설계하고, 그 뒤에 영어 프롬프트를 둠. 공용 화면은 레이아웃에서 §5 표준을 준용하고 버나 고유분만 더함(이어하기 토큰 스캔은 [[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]] 정본이라 직접 설계). 고유 화면은 레이아웃을 상세히 설계함.

## 가. Step 1. 시작 화면

공용 화면(인트로, [[시범콘텐츠 공통 사양#5. 공통 화면]] 나). 대기 상태에서 관람객을 맞이하고 체험을 시작시킴. 종료 후 복귀 화면과 동일 자산임.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.나 인트로 시작 화면 준용. 헤더에 콘텐츠 타이틀, 본문에 버나 대표 비주얼, 액션에 큰 시작 버튼을 둠. 매호씨가 환영하며 등장함 (보조 이어하기 버튼은 2차연도 전방 설계라 1차연도 미배치, §2.가 나. 학습 토큰 스캔)
- **핵심 UI 컴포넌트**: 큰 "시작하기" 터치 버튼, 콘텐츠 타이틀, 버나 돌리기 대표 비주얼
- **매호씨 호스트**: 한쪽 측면에서 유저를 향해 손짓하며 환영, 활기찬 표정(중앙은 타이틀과 시작 버튼 자리)
- **화면 내 텍스트**: 타이틀 "버나잡이 한 판", 버튼 "시작하기"

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.1) 시작 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 header/body/action regions and the position and size of every element (title, primary start button, host). There is no secondary button (the resume/이어하기 button is a 2nd-year feature and is not placed in year 1). Replace the neutral placeholders with content-specific elements for a Korean traditional namsadang buna (plate-spinning) performance experience, without moving or resizing them:
- the guide-host placeholder (keep its clear side presence and presenting pose from the reference) -> a stylized Korean Maehossi host character (the buna banter partner and playful sparring opponent, an on-screen guide character, not a realistic bystander or a second user) welcoming with a beckoning gesture and a lively expression
- the content-area and background placeholders -> Korean namsadang buna plate-spinning motifs over a vibrant outdoor play-yard (madang) stage, festive attract mood
Keep title '버나잡이 한 판', primary button '시작하기'.
Art direction: Korean traditional namsadang buna plate-spinning motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Chinese acrobatic plate-spinning or Western circus juggling, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 나. Step 1. 학습 토큰 스캔 화면 (2차연도 전방 설계, 1차연도 미적용)

이 화면은 2차연도 전방 설계이며 1차연도 UI는 구현하지 않음. 재방문 옵트인 학습자가 학습 토큰(QR)을 스캔해 진척과 동의를 복원하는 플랫폼 이어하기 화면으로, 정본은 [[플랫폼 사양#6. 2차연도 전방 설계 (디지털 도제 연속성, 현재 구현 밖)]](subject_id 기반 복원)임. 상세 레이아웃과 프롬프트는 2차연도 설계에서 확정함.

## 다. Step 1. 가이드 화면 (센서 막대 사용법)

공용 화면(인트로, [[시범콘텐츠 공통 사양#5. 공통 화면]] 나). 매호씨가 인사하고 체험 흐름과 센서 막대 잡는 법을 안내함.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.나 인트로 가이드 화면 준용. 본문에 진행 흐름과 센서 막대 사용법 안내 일러스트, 액션에 다음 버튼을 둠. 매호씨가 화자로 등장함
- **핵심 UI 컴포넌트**: 진행 흐름과 센서 막대 사용법 안내 일러스트(센서 막대 잡기, 버나 돌리기, 매호씨와 재담, 기록증 받기), "다음" 버튼
- **매호씨 호스트**: 화자로 등장해 설명, 재담하는 표정
- **화면 내 텍스트**: 인사말 "어서 오세요"(표본 카피), 버튼 "다음"

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.2) 가이드 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 header/body/action regions and the position and size of every element (flow illustration, next button, host). Replace the neutral placeholders with content-specific elements for a Korean traditional namsadang buna (plate-spinning) performance experience, without moving or resizing them:
- the guide-host placeholder (keep its clear side presence and presenting pose from the reference) -> a stylized Korean Maehossi host character (the buna banter partner, an on-screen guide character, not a realistic bystander) acting as the narrator with a lively storytelling expression
- the flow-illustration placeholder -> an instructional illustration of the flow (hold the sensor stick, spin the buna plate, banter with Maehossi, receive a record certificate) in namsadang buna styling
- background -> a namsadang outdoor play-yard (madang) stage, friendly mood
Keep greeting '어서 오세요', button '다음'.
Art direction: Korean traditional namsadang buna plate-spinning motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Chinese acrobatic plate-spinning or Western circus juggling, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 라. Step 1. 동의 약관 화면

공용 화면(인트로, [[시범콘텐츠 공통 사양#5. 공통 화면]] 나). 필수 동의를 받음. 본 콘텐츠는 카메라를 쓰지 않아 필수 동의 항목은 이용 약관 동의임(카메라 동의 없음, 연락처 미수집). 정확한 동의 항목과 문구는 규정 검토 확정(확인 필요).

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.나 인트로 동의 약관 화면 준용. 본문에 약관 텍스트, 액션에 동의하고 시작 버튼과 그만두기 보조 버튼을 둠(동의하고 시작이 곧 약관 동의, 그만두기가 미동의. 1차연도는 선택 동의가 없어 별도 토글을 두지 않음). 화면 타임아웃 미적용. 매호씨는 넓은 측면에 또렷한 안내 캐릭터로 둠
- **핵심 UI 컴포넌트**
	- 약관 텍스트 영역 (필수 이용 약관, 문구는 규정 검토 확정)
	- 주 버튼 "동의하고 시작": 약관 동의를 담음(별도 토글 없음, 항상 활성)
	- 보조 "그만두기" 버튼: 동의하지 않고 Step 6으로 종료함
- **매호씨 호스트**: 넓은 측면에 또렷한 안내 캐릭터로, 유저를 향해 안내하는 포즈(중앙 도달 존 조작은 가리지 않음)
- **상태별 안내 (기획서 준용)**: 그만두기 버튼 터치, 미동의, 터치 미입력 타임아웃 시 미동의로 간주해 종료 Step 직행은 기획서 Step 1과 공통 사양 §5.나를 준용함(목업은 정상 동의 상태만)
- **화면 내 텍스트**: 타이틀 "이용 동의"(표본), 약관 라벨 "이용 약관 (필수)"(표본, 문구는 규정 검토 확정), 버튼 "동의하고 시작", "그만두기"

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.3) 동의 약관 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 header/body/action regions and the position and size of every element (title, terms area, primary/secondary buttons, host). Replace the neutral placeholders with content-specific elements for a Korean traditional namsadang buna (plate-spinning) performance experience, without moving or resizing them:
- the guide-host placeholder (keep its clear side presence and presenting pose from the reference) -> a stylized Korean Maehossi host guide as a clear side presence in a presenting pose (an on-screen guide character, not a realistic bystander or a second user)
- background -> a calm namsadang outdoor play-yard stage
Keep title '이용 동의'. Do NOT render any consent toggle; consent is expressed by the buttons (this content has a single required 약관 consent and no camera consent, so there is no toggle row; if the reference mockup shows toggle rows, omit them). Keep primary button '동의하고 시작' (active), secondary button '그만두기'.
Art direction: Korean traditional namsadang buna plate-spinning motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Chinese acrobatic plate-spinning or Western circus juggling, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 마. Step 2~3. 버나 돌리기 화면 (재담 대결)

버나 고유 화면(핵심 체험). 유저가 센서 막대로 버나(접시)를 돌리는 묘기를 유지하면서, 매호씨가 도발 재담으로 끼어들면 반응 윈도우 안에 대거리 선택지를 골라 받아침. 묘기 유지와 재담 적절성을 함께 채점해 신명 게이지로 보상하고 난이도를 올림. Step 2(돌리기 도입)와 Step 3(재담 대결)이 한 화면에서 이어짐 ([[버나 - 버나잡이 한 판 기획서#3) Step 3. 매호씨 재담 대결 (핵심 체험, 돌리기와 동시)]]).

### 1) 화면 설계

- **레이아웃** (고유, 16:9 골격 위 버나 시뮬 우세 + 센서 막대 모션 화면)
	- 헤더 모서리(우상단): 신명 게이지와 난이도 단계를 상태 표시로 얹음
	- 본문(최대 비중): 버나 시뮬 뷰. 센서 막대 동작에 연동해 버나(접시)가 회전하고 균형과 낙하가 시뮬레이션됨
	- 매호씨: 한쪽 측면에서 도발 재담 말풍선과 추임새(대결 상대)
	- 대거리 선택지 오버레이(재담 윈도우에만): 반응 윈도우가 열리면 대거리 선택지 2~3개를 중앙 도달 존에 띄움(터치 조작이라 도달 존 안). 남은 반응 시간 표시
	- 액션: 상시 버튼 없음(센서 막대 모션과 재담 윈도우 선택으로 진행). 화면 타임아웃 발동 시 다음 단계로 정상 진행
- **핵심 UI 컴포넌트**
	- 버나 시뮬 뷰: 센서 막대로 돌리는 버나 회전과 균형, 낙하
	- 신명(興) 게이지와 난이도 단계 표시(우상단)
	- 매호씨 도발 재담 말풍선과 추임새(측면)
	- 대거리 선택지 2~3개(재담 반응 윈도우에만, 도달 존, 동문서답 함정 선택지 포함)와 남은 시간 표시
- **매호씨 호스트**: 측면에서 도발 재담을 던지는 대결 상대로 등장([[버나 - 버나잡이 한 판 기획서]] §4.라 재담 대결). 활기차고 짓궂은 표정
- **도달성과 입력 수단 (확정)**: 센서 막대 모션 화면이라 시뮬 뷰는 화면을 크게 쓰되 대거리 선택지 터치는 중앙 도달 존에 둠. 대거리 입력은 센서 막대를 한 손으로 쥔 채(버나 회전 유지) 반대 손으로 도달 존 안 선택지를 터치하는 방식으로 확정함(2026-07-02 사용자 결정). 핸드 트래킹은 미채택이라 카메라 미사용 전제를 유지함([[버나 - 버나잡이 한 판 기획서#8. 리스크와 검증]] 대거리 입력)
- **상태별 안내 (기획서 준용)**: 센서 막대 입력 미검출 재시도 안내와 타임아웃, 무응답(윈도우 초과) 판정은 기획서 Step 2~3 분기를 준용함(목업은 정상 묘기와 재담 상태만)
- **화면 내 텍스트**: 게이지 라벨 "신명", 안내 "장단에 맞춰 버나를 돌려요"(표본), 매호씨 도발 예시 "그 솜씨로 밥은 벌겠나?"(표본), 대거리 선택지 예시 "얼씨구 봐라"/"어이쿠 잠깐"(표본)

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a horizontal 16:9 kiosk touchscreen, full screen.
The buna (plate-spinning) performance screen with a banter duel, for a Korean traditional namsadang buna experience.
Center (main focus): a live buna simulation view of a Korean namsadang plate (buna) spinning on a stick, with balance and wobble, driven by a handheld sensor stick (the sensor stick is a physical peripheral, off-screen).
Top-right: an excitement gauge labeled '신명' and a difficulty-stage indicator.
To one side: a stylized Korean Maehossi host character (the buna banter partner and playful sparring opponent, an on-screen guide character, not a realistic bystander) provoking the user with a speech bubble '그 솜씨로 밥은 벌겠나?'.
During a banter window, a set of 2-3 comeback choice buttons appears within the central reachable zone (touch controls, kept in reach, not at the screen edges), for example '얼씨구 봐라' and '어이쿠 잠깐', with a small remaining-time indicator.
No always-on action buttons (the play advances by sensor-stick motion and banter-window choices).
Background: a namsadang outdoor play-yard (madang) stage, lively festival mood.
Art direction: Korean traditional namsadang buna plate-spinning motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Chinese acrobatic plate-spinning or Western circus juggling, and any UI buttons, toolbars, or controls not specified in this prompt (no always-on toolbar).
```

## 바. Step 4. 마무리 연출 화면

버나 고유 화면. 한 판을 맺는 게이지 결과 연출임. 달성 시 환호 사운드로 완성하고, 미달 시 매호씨가 눙치며 마무리함. 기념 기록증은 백그라운드에서 결정적 템플릿 합성으로 실시간 만들어지므로 별도 생성 대기 화면이 없음 ([[버나 - 버나잡이 한 판 기획서#4) Step 4. 마무리와 기록증 생성]]). 화면 흐름 명칭(마무리 연출 화면)을 화면 단위 정본으로 삼되, 기획서 프로세스의 "UI(버나 돌리기 화면)" 표기는 이 연출을 그리는 렌더러가 버나 돌리기 화면 컴포넌트를 재사용함을 뜻함(별도 화면과 모순 아님).

### 1) 화면 설계

- **레이아웃** (고유, 16:9 골격 위 결과 연출 구성)
	- 헤더: 결과 타이틀
	- 본문 중앙: 신명 게이지 최종 결과(점수와 등급)와 한 판 완성 연출(환호나 눙침)을 크게 둠
	- 액션: 없음(자동으로 기록증 미리보기로 진행). 화면 타임아웃 발동 시 정상 진행
- **핵심 UI 컴포넌트**: 신명 게이지 최종 결과(점수와 등급), 한 판 완성 연출(달성 환호 또는 미달 눙침)
- **매호씨 호스트**: 중앙 근처에서 결과에 반응(달성이면 함께 환호, 미달이면 짓궂게 눙침)
- **화면 내 텍스트**: 안내 "한 판 끝!"(표본), 게이지 라벨 "신명"

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a horizontal 16:9 kiosk touchscreen, full screen.
The finale screen of a Korean traditional namsadang buna (plate-spinning) experience.
Center: a final excitement-gauge result (a score and grade) labeled '신명', with a one-round completion flourish (a cheering celebration if achieved, or a playful shrug if not).
Header: a result caption '한 판 끝!'.
Near the center: a stylized Korean Maehossi host character (the buna banter partner, an on-screen guide character, not a realistic bystander) reacting to the result (cheering along if achieved, teasing playfully if not).
No action buttons (it auto-advances to the record preview).
Background: a namsadang outdoor play-yard stage, a celebratory mood.
Art direction: Korean traditional namsadang buna plate-spinning motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Chinese acrobatic plate-spinning or Western circus juggling, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 사. Step 5. 기록증 미리보기 화면

버나 고유 화면. 완성된 기념 기록증(성적표)을 미리 봄. 신명 게이지 점수와 등급, 묘기 통계를 사전 제작 템플릿에 얹은 이미지임. 감상 뒤 받기 버튼이 나옴 ([[버나 - 버나잡이 한 판 기획서#5) Step 5. 결과물 전송]], §4.마 기념 기록증 생성).

### 1) 화면 설계

- **레이아웃** (고유, 16:9 골격 위 기록증 카드 구성)
	- 헤더: 타이틀
	- 본문 중앙: 기념 기록증(성적표) 카드를 중앙에 크게 배치
	- 액션: "받기" 버튼을 중앙 도달 존 아래쪽에 둠(물리 최하단 아님)
- **핵심 UI 컴포넌트**
	- 기념 기록증 미리보기: 신명 게이지 점수와 등급, 묘기 통계를 얹은 성적표 이미지(버나 양식 배경, 등급 스탬프). 사용자 얼굴이나 영상은 없음
	- "받기" 버튼
- **매호씨 호스트**: 측면에 또렷한 안내 캐릭터로 결과를 자랑하듯(중앙 도달 존 조작은 가리지 않음)
- **상태별 안내 (기획서 준용)**: 화면 타임아웃 발동 시 다운로드 URL 발급으로 정상 진행은 기획서 Step 5 분기를 준용함(목업은 정상 미리보기 상태만)
- **화면 내 텍스트**: 타이틀 "나의 버나 기록증", 버튼 "받기"

### 2) 프롬프트 (영어)

```
A high-fidelity, photorealistic UI mockup of a horizontal 16:9 kiosk touchscreen, full screen.
The record-certificate preview screen of a Korean traditional namsadang buna (plate-spinning) experience.
Title: '나의 버나 기록증'.
Center: a commemorative record certificate (a report card) shown large in the middle, with an excitement-gauge score and grade, trick statistics, a grade stamp, and a buna-styled background. It contains NO user face or photo.
A primary button labeled '받기' in the lower part of the central reachable zone, not at the physical bottom edge.
To one side: a stylized Korean Maehossi host character (the buna banter partner, an on-screen guide character, not a realistic bystander or a second user) reacting proudly to the result, not blocking the central controls.
Background: a namsadang outdoor play-yard stage, a proud showcase mood.
Art direction: Korean traditional namsadang buna plate-spinning motifs blended with a modern kiosk UI, obangsaek and dancheong accent colors, subtle hanji and wood textures.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Chinese acrobatic plate-spinning or Western circus juggling, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 아. Step 5. 결과물 QR 화면

공용 화면(전송, [[시범콘텐츠 공통 사양#5. 공통 화면]] 라). 기념 기록증 결과물을 웹에 호스팅하고 그 다운로드 주소를 QR로 화면에 표시해 유저가 본인 휴대폰으로 스캔해 받게 함. 연락처를 받지 않아 본 콘텐츠가 수집하는 개인정보는 없음([[버나 - 버나잡이 한 판 기획서#나. 개인정보와 연속성]]).

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.라 전송 준용. 본문 중앙에 QR 코드를 크게 두고, 그 위나 아래에 스캔 안내와 다운로드 가능 기간 문구를 둠. 액션에 마침 버튼을 둠. 연락처 입력 필드와 키패드, 전송이나 받지 않기 버튼, 개인정보 수집 고지는 두지 않음. 화면 타임아웃 적용(감상 성격). 매호씨는 넓은 측면에 또렷한 안내 캐릭터로 둠. 조작 요소는 중앙 도달 존에 둠
- **핵심 UI 컴포넌트**
	- 결과물 QR 코드(다운로드 URL 인코딩, 유저가 본인 휴대폰으로 스캔)
	- 스캔 안내와 다운로드 가능 기간 문구
	- "마침" 버튼
- **매호씨 호스트**: 넓은 측면에 또렷한 안내 캐릭터로, QR을 가리키며 안내하는 포즈(중앙 도달 존 조작은 가리지 않음)
- **상태별 안내 (기획서 준용)**: 결과물 업로드나 호스팅 실패 시 사과 후 종료 Step, 화면 타임아웃 발동 시 종료 Step 정상 진행 등은 기획서 Step 5와 공통 사양 §5.라 결과물 전송을 준용함(목업은 정상 표시 상태만)
- **화면 내 텍스트**: 안내 "휴대폰으로 스캔해 받으세요", 다운로드 가능 기간 안내(예시, 정확한 문구는 규정 검토 확정), 버튼 "마침"

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.5) 전송 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 header/body/action regions and the position and size of every element (guide caption, large QR code, finish button, host). Replace the neutral placeholders with content-specific elements for a Korean traditional namsadang buna (plate-spinning) performance experience, without moving or resizing them:
- the guide-host placeholder (keep its clear side presence and presenting pose from the reference) -> a stylized Korean Maehossi host guide as a clear side presence in a presenting pose (an on-screen guide character, not a realistic bystander or a second user)
- background -> a calm namsadang outdoor play-yard stage
Keep the large QR-code placeholder (a generic decorative square pattern that encodes nothing) centered, add a guide caption '휴대폰으로 스캔해 받으세요', and a single button '마침'.
Art direction: Korean traditional namsadang buna plate-spinning motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image. The QR code is a generic decorative square pattern and encodes nothing. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Chinese acrobatic plate-spinning or Western circus juggling, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 자. Step 6. 마무리 인사 화면

공용 화면(종료, [[시범콘텐츠 공통 사양#5. 공통 화면]] 마). 마무리 인사 뒤 시작 화면으로 복귀함.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.마 종료 준용. 본문 중앙에 매호씨의 작별 인사와 마무리 메시지를 크게 둠. 액션은 없음(자동으로 시작 화면 복귀). 매호씨가 중심
- **핵심 UI 컴포넌트**: 마무리 인사 메시지, 매호씨 작별 연출
- **매호씨 호스트**: 중심에서 정겹게 작별 인사
- **화면 내 텍스트**: 인사 "또 만나요"

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.6) 종료 중립 레이아웃 이미지

```
Use the attached neutral layout mockup as the structural reference. Keep its 16:9 body-centered layout and the position and size of every element (host at center, closing message). Replace the neutral placeholders with content-specific elements for a Korean traditional namsadang buna (plate-spinning) performance experience, without moving or resizing them:
- the guide-host placeholder (keep its central position and farewell pose from the reference; on this closing screen the host is centered, not to the side) -> a stylized Korean Maehossi host character giving a warm farewell
- background -> a namsadang outdoor play-yard stage, a warm closing mood
Keep the closing message '또 만나요'.
Art direction: Korean traditional namsadang buna plate-spinning motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Chinese acrobatic plate-spinning or Western circus juggling, and any UI buttons, toolbars, or controls not specified in this prompt.
```

## 차. 실패 안내 (모달 팝업, 실패 분기 공통)

공용 화면(실패 안내, [[시범콘텐츠 공통 사양#바. 실패 안내 (사과 모달 팝업)]]). 기록증 조립이나 전송 실패 등 실패 분기가 모이는 공통 화면임. 사과 안내를 보이고 종료 Step으로 자동 진행함.

### 1) 화면 설계

- **레이아웃**: 공통 사양 §5.바 실패 안내 준용. 전체 화면이 아니라 직전 화면을 어둡게 깐 위에 중앙 모달 다이얼로그 카드를 띄우고, 카드 안에 경고 아이콘, 사과 메시지, 짧은 안내, (선택) 처음으로 보조 버튼을 둠. 액션은 기본 비움(자동 종료 진행), 오류 코드나 기술 세부는 노출하지 않음. 매호씨는 카드 옆에서 다독이는 모습으로 둠
- **핵심 UI 컴포넌트**: 사과 메시지, 선택적 "처음으로" 보조 버튼(두면 중앙 도달 존)
- **매호씨 호스트**: 측면이나 중앙에서 다독이는 표정
- **화면 내 텍스트**: 사과 "문제가 생겼어요"(표본), 선택 버튼 "처음으로"

### 2) 프롬프트 (영어, §13 중립 이미지 첨부)

첨부: [[시범콘텐츠 공통 사양#13. 공용 화면 예시 이미지]] 다.8) 실패 안내 중립 레이아웃 이미지

```
Use the attached neutral modal-popup mockup as the structural reference. Keep its centered modal dialog card over a dimmed background and the position and size of every element (warning icon, apology message, optional secondary button, host beside the card). Replace the neutral placeholders with content-specific elements for a Korean traditional namsadang buna (plate-spinning) performance experience, without moving or resizing them:
- the guide-host placeholder (keep its clear presence and reassuring pose from the reference) -> a stylized Korean Maehossi host character (the buna banter partner, an on-screen guide character, not a realistic bystander) reassuring the user warmly
- background -> a calm namsadang outdoor play-yard (madang) stage, a reassuring mood
Keep the apology message '문제가 생겼어요'; do not show error codes or technical details.
Art direction: Korean traditional namsadang buna plate-spinning motifs, obangsaek and dancheong accent colors, subtle hanji and wood textures, photorealistic high-fidelity.
Large touch targets, clear visual hierarchy, high readability. The host character is drawn as a flat 2D illustration (flat vector/cartoon style), NOT a 3D character, figurine, or clay/render look.
Do NOT draw any titles, labels, button text, captions, or badges; leave every text area as a blank placeholder box (all text is added later in post-production, e.g. Figma). The Korean strings quoted above are post-production reference copy only and must not be rendered in the image; treat any keep/label/caption instruction above as reference, not as text to draw. No English text either.
Avoid: garbled or broken Hangul, any English UI text, deformed hands and faces, watermark, copyrighted characters, Chinese acrobatic plate-spinning or Western circus juggling, error codes or technical error details, and any UI buttons, toolbars, or controls not specified in this prompt.
```

# 4. 관련 문서

- [[버나 - 버나잡이 한 판 기획서]]: 콘텐츠 로직과 Step 명세 정본
- [[시범콘텐츠 공통 사양]]: 공통 화면 레이아웃(§5)과 진행 호스트(§6) 골격 정본
- [[공통 UI 컴포넌트]]: 본 문서 화면 요소의 위젯 단위 공통 컴포넌트 색인
- [[덧뵈기 - 나만의 탈춤 UI]]: 자매 UI 문서 (체험형 화면 설계 방식 공유)
- [[덜미 - 나만의 꼭두각시 UI]]: 자매 UI 문서 (체험형, 신명 게이지 채점 공유)
