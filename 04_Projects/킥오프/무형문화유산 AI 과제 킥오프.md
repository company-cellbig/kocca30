---
title: 무형문화유산 AI 과제 킥오프 (셀빅)
type: project
status: draft
tags: [project, kocca, 킥오프, 발표, 셀빅, 1차연도, 2차연도]
sources: [2. 연구개발의 목표 및 내용, 4. 마일스톤 체계 및 수행계획, 컨소시엄 회의록 - 2026-06-22, 큐랩셀빅 사전회의 - 2026-06-22, 1차연도 셀빅 개발 준비자료]
created: 2026-07-01
updated: 2026-07-01
---

> 셀빅 사내 킥오프 발표 문서. 무형문화유산 AI 과제가 무엇이고, 셀빅이 2년(1단계)에 걸쳐 무엇을 어떤 기술로 언제 만들지를 부(部)로 묶어 정리함. H1이 부(그룹), H2 하나가 슬라이드 한 장이며, 각 슬라이드는 「슬라이드」(발표 내용)와 「프롬프트」(2:1 인포그래픽 이미지 생성 프롬프트) 두 H3로 나뉨. 6부 구성: 1부 과제 개관, 2부 콘텐츠 로드맵, 3부 기술 트랙, 4부 개발 기반과 전제(데이터, 설계 전제, 디바이스), 5부 언제 어떻게 검증(일정과 실증), 6부 사업 관리. 연차(1차/2차)는 칸막이가 아니라 각 콘텐츠와 기술 안에서 발전 단계로 엮고, 순수 타임라인은 로드맵(1부 다)과 일정(5부)에서만 다룸. 각 항목은 **[확정]**(6/22 회의 합의), **[방향]**(잠정, 연구개발계획서나 미승인 초안 근거), **[미결]**(결정 필요), **[리스크]**, **[참고]**로 상태를 구분함. 근거로 삼는 「1~5. 연구개발의...」 문서는 컨소시엄이 지원 시 작성한 연구개발계획서(제안서)이지 RFP(제안요청서)가 아님. 프롬프트 블록은 이미지 생성 도구에 넣는 기계 대상 입력임. 2차연도 기술은 계획서 기준이라 1차연도 결과와 후속 협의로 조정될 수 있음.

# 1. 과제 개관

## 가. 과제 개요

### 슬라이드

> 핵심 요소 기술을 만들고, 플랫폼 장치에 담아, 지능형 4D 디지털 도제 플랫폼으로 통합해, 실증과 서비스로 확산함.

- **무엇을 만드나 [확정]**: 무형문화유산(암묵지)을 4D로 디지털화하고 AI 동작 분석과 코칭으로 배우는 「지능형 4D 디지털 도제(Digital Apprentice) 서비스 플랫폼」을 개발하고 실증함(TRL 7 목표, 1단계 2년 2026-2027). KOCCA 지원, 대상은 택견(큐랩)과 남사당놀이(셀빅) ([[2. 연구개발의 목표 및 내용]], [[컨소시엄 구성 개요]])
- **핵심 요소 기술**: 과제가 개발하는 3대 원천 기술
	- 동작 분석과 정량화: 3D 포즈 추정, LMA 기반 숙련도 평가
	- 초실감 4D 콘텐츠 생성: 4D 가우시안 스플래팅(4DGS), 모션 생성
	- 지능형 AI 인터랙션: LLM 도슨트, 실시간 코칭
- **플랫폼 구축**: 기술을 담는 장치와 시스템
	- 키오스크: 모션 인식 뎁스 카메라, 바닥 프로젝션
	- 미디어 케이브: 3면과 바닥 스크린 몰입 공간
	- 통합 플랫폼: 런처, 서버, 콘텐츠 관리(CMS)
- **지능형 4D 디지털 도제 플랫폼**: 위 기술과 장치를 엮어 체험과 학습, 양방향 코칭을 제공함
- **서비스 [방향]**: 국내외 수요처 실증(서울랜드, 해외 문화원 등)과 디지털 도제 체험 서비스 ([[2. 연구개발의 목표 및 내용]]), K-컬처 글로벌 확산 ([[5. 연구개발성과의 활용방안 및 기대효과]])

> **발표 노트**: 이 과제의 핵심 단어는 "디지털 도제"임. 1회성 체험이 아니라 배우고 다시 오는 학습 도구를 지향함. 흐름은 핵심 기술을 만들고, 플랫폼에 담아, 지능형 4D 디지털 도제 플랫폼으로 통합해, 실증과 서비스로 확산하는 것. 셀빅은 남사당 콘텐츠와 생성형 서사, 아바타를 맡음.

### 프롬프트

```
A rich, densely filled premium editorial infographic in a tech-diagram style, 2:1 landscape aspect ratio. Densely filled with meaningful content, no decorative filler; clean, organized and highly legible. Pure white (#FFFFFF) background so it drops cleanly onto a white slide; structure comes from color-headed section panels (ink-navy headers, vermilion-red and gold accents) with outlined cards, thin connectors and bold left-to-right arrows. Use small semi-realistic thumbnail illustrations for the domain items described below, and flat vector icons for abstract items. Every picture must map to its concept; add no decorative filler icons. Strong typographic hierarchy, corporate keynote quality.
Layout (left to right flow): a slim mission banner on top. On the left, two stacked section panels "핵심 요소 기술" (three items) and "플랫폼 구축" (three items). A bold arrow points right to a large center hero panel "지능형 4D 디지털 도제 플랫폼". Another bold arrow points right to a "서비스" panel (two items). A small tag top-left, a badge top-right.
Picture for each element (make each meaningful):
- 핵심 요소 기술: "동작 분석과 정량화" = a Namsadang performer overlaid with a 3D pose skeleton and joint points; "초실감 4D 콘텐츠 생성" = a Namsadang pungmul performer spinning a sangmo hat ribbon, reconstructed as a 4D volumetric point-cloud capture; "지능형 AI 인터랙션" = a traditional master figure with a speech bubble (AI docent dialogue).
- 플랫폼 구축: "키오스크" = a horizontal landscape-screen white kiosk with a floor-projection mat in front; "미디어 케이브" = a three-wall-and-floor immersive projection room; "통합 플랫폼" = a launcher/server hub linking content tiles.
- center hero "지능형 4D 디지털 도제 플랫폼" = a semi-realistic scene of a person experiencing the platform on a horizontal kiosk over a glowing floor projection in a museum-like hall, the kiosk screen showing colorful Namsadang pungmul dancers.
- 서비스: "국내외 실증 (서울랜드, 해외)" = a map with location markers and a theme-park/culture-center thumbnail; "디지털 도제 체험, K-컬처 확산" = a split thumbnail showing a Namsadang performer and a Taekkyeon practitioner in the digital-apprentice experience, with a globe and spread arrows.
Render ONLY these exact Korean texts, nothing else:
top-left tag "KOCCA 연구과제", top-right badge "TRL 7"
mission banner "지능형 4D 디지털 도제 플랫폼 개발과 실증, 2026-2027"
"핵심 요소 기술": "동작 분석과 정량화", "초실감 4D 콘텐츠 생성", "지능형 AI 인터랙션"
"플랫폼 구축": "키오스크", "미디어 케이브", "통합 플랫폼"
center "지능형 4D 디지털 도제 플랫폼"
"서비스": "국내외 실증 (서울랜드, 해외)", "디지털 도제 체험, K-컬처 확산"
```

## 나. 컨소시엄과 역할

### 슬라이드

5개 연구기관과 외부 데이터 권리자로 구성됨. 셀빅은 남사당놀이를 전담하되, 핵심 AI 일부는 다른 기관이 만든 결과를 받아 씀 ([[컨소시엄 구성 개요]]).

| 기관 | 구분 | 과제 내 역할 |
|---|---|---|
| ㈜큐랩 | 주관 | 플랫폼 통합 총괄, 동작 인식 엔진, 택견 전담, 사업화 총괄 |
| ㈜셀빅 | 공동1 | **남사당놀이 전담**, 생성형 서사, 아바타 제어, 실감 체험 플랫폼 |
| KETI(한국전자기술연구원) | 공동2 | 멀티모달 데이터, 4D 복원, 특징 추출, 모션 생성, 특화 LLM |
| 연세대학교 | 공동3 | 단일 RGB 영상 3D 스켈레톤 추정, 모델 경량화 |
| 용인대학교 | 공동4 | 택견 IP와 학습용 데이터셋 |
| 남사당놀이보존회 | 외부 협력 | 남사당 원천 데이터 권리자. 컨소시엄 미포함, 셀빅의 협의 대상 |

- **협력 기관 제공 기술 [확정]**: 영상에서 3D 스켈레톤 추출은 연세대, 특징 추출과 모션 생성은 KETI가 맡음 ([[컨소시엄 회의록 - 2026-06-22#나. 데이터와 LLM 역할]])
- **회의 주기 [확정]**: 반기 1회 대면. 필요 시 별도 실무 회의 ([[컨소시엄 회의록 - 2026-06-22#2. 핵심 합의]])

> **발표 노트**: 강조점은 "전담이지만 전부는 아니다"임. 연세대와 KETI 인도물이 늦으면 셀빅 콘텐츠도 밀리니, 이 연계 지점의 인도 시점을 일정에 반영할 것.

### 프롬프트

```
A premium editorial consortium diagram, 2:1 landscape aspect ratio, in the same rich keynote infographic style as the overview slide. Pure white (#FFFFFF) background. Do NOT draw the slide title or any header text (the presentation already provides it). Fill the width densely with large cards and avoid big empty margins.
Top area (about two thirds of height): a single row of six tall rounded institution cards, evenly spaced edge to edge. Each card has a colored header strip across its top (deep navy), a clear institution icon inside a colored circle, a bold name, and a one-line role. The 셀빅 card uses a vermilion-red header strip and red outline for emphasis.
Bottom area (about one third of height): a wide colored callout panel with a navy header, holding two clean short straight arrows drawn INSIDE the panel (provider on the left, arrow pointing right to 셀빅). Keep the dependency entirely inside this bottom panel; do NOT draw any arrows floating over or above the card row.
Render ONLY these exact Korean texts, nothing else:
card 1 "㈜큐랩 (주관)" role "플랫폼 통합, 택견 전담"
card 2 "㈜셀빅 (공동1)" role "남사당 전담, 생성과 아바타"
card 3 "KETI (공동2)" role "데이터, 4D, 모션, LLM"
card 4 "연세대 (공동3)" role "3D 스켈레톤, 경량화"
card 5 "용인대 (공동4)" role "택견 IP, 데이터셋"
card 6 "남사당놀이보존회 (외부)" role "원천 데이터 권리자"
bottom panel header "셀빅이 받는 핵심 AI"
inside bottom panel, row 1 "연세대 → 셀빅: 3D 스켈레톤 제공", row 2 "KETI → 셀빅: 모션 생성 제공"
Style: ink-navy text and flat institution icons, vermilion-red accent on the 셀빅 card, gold accents, rich rounded cards with colored header strips, dense layout matching the overview slide. 2:1 landscape.
```

## 다. 개발 로드맵

### 슬라이드

1단계는 2년 과정임. 1차연도에 프로토타입과 데이터셋으로 기반을 만들고, 2차연도에 상용 수준(TRL 7)으로 고도화하며 현장 실증까지 감 ([[2. 연구개발의 목표 및 내용]], [[4. 마일스톤 체계 및 수행계획]]).

| 연차   | 기간   | 셀빅 핵심 목표                            | 대표 산출                     |
| ---- | ---- | ----------------------------------- | ------------------------- |
| 1차연도 | 2026 | 키오스크 콘텐츠 5종, 통합 플랫폼, 데이터셋 구축        | 시범 콘텐츠 프로토타입, 코칭용 정답 데이터셋 |
| 2차연도 | 2027 | 키오스크 1종 추가와 고도화, 케이브 콘텐츠 5종, LLM 통합, 현장 실증 | 상용 수준 플랫폼, TRL 7, 실증 결과   |

- 오늘 발표는 이 로드맵을 **콘텐츠(2부) → 기술(3부) → 개발 기반과 전제(4부) → 일정과 실증(5부) → 관리(6부)** 순으로 풂

> **발표 노트**: 오늘의 뼈대임. 1차연도는 "돌아가는 것을 만든다", 2차연도는 "상용 수준으로 올리고 현장에서 검증한다"로 기억할 것. 다음 부부터는 연차가 아니라 콘텐츠와 기술로 묶어 봄.

### 프롬프트

```
A rich, densely filled premium editorial timeline infographic in a tech-diagram style, 2:1 landscape aspect ratio. Densely filled with meaningful content, no decorative filler; clean, organized and highly legible. Pure white (#FFFFFF) background so it drops cleanly onto a white slide, a bold horizontal spine arrow running left to right, two large phase panels packed with content. Ink-navy elements, one vermilion-red accent at the phase-transition point, thin gold hairlines. Each chip has its own flat vector icon plus small milestone ticks along the spine. Strong hierarchy, corporate keynote quality.
Layout: a left phase panel and a right phase panel along the spine, each with a bold year header, a goal subtitle, labeled icon chips (left panel 3 chips, right panel 4 chips), and one output tag at the bottom. A labeled marker sits on the transition arrow between the two panels.
Render ONLY these exact Korean texts, nothing else:
left block header "1차연도 2026", subtitle "프로토타입과 데이터셋", chips "키오스크 콘텐츠 5종", "통합 플랫폼", "데이터셋 구축", output tag "산출: 시범 프로토타입, 정답 데이터셋"
right block header "2차연도 2027", subtitle "고도화와 실증", chips "키오스크 1종 추가와 고도화", "케이브 콘텐츠 5종", "LLM 통합", "현장 실증", output tag "산출: 상용 플랫폼, TRL 7"
transition label: "돌아가는 것에서 상용 수준으로"
```

# 2. 콘텐츠 로드맵

## 가. 남사당 콘텐츠 로드맵

### 슬라이드

남사당 6종목을 2년에 걸쳐 콘텐츠로 만듦. 종목마다 진입 시점과 형태가 다름: 1차연도는 덜미, 덧뵈기, 버나의 키오스크 콘텐츠이고, 2차연도에 살판, 어름, 풍물이 더해지고 덧뵈기가 미디어 케이브 관람형으로 확장됨 ([[2. 연구개발의 목표 및 내용]]).

| 종목 | 1차연도 (키오스크) | 2차연도 (확장) |
|---|---|---|
| 덜미 | 나만의 유람기(생성), 나만의 꼭두각시(체험) | 고도화 |
| 덧뵈기 | 나만의 탈춤(체험), 양반 놀리기 4컷(생성) | 덧뵈기 관람(미디어 케이브) |
| 버나 | 버나잡이 한 판(체험) | 고도화 |
| 살판 | (없음) | 살판 관람(4DGS 미디어 케이브) |
| 어름 | (없음) | 어름 체험과 관람 |
| 풍물 | (없음) | 풍물 합주와 디지털 상모(미디어 케이브) |

> **발표 노트**: 1차연도는 덜미, 덧뵈기, 버나의 키오스크 콘텐츠 5종에 집중. 2차연도에 살판, 어름, 풍물이 더해지고 덧뵈기는 관람형으로 확장됨. 덧뵈기가 두 해에 걸친다는 점을 놓치지 말 것.

### 프롬프트

```
A rich, densely filled premium editorial matrix infographic in a tech-diagram style, 2:1 landscape. A 6-row by 2-column grid mapping the six Namsadang disciplines to their content across two years. The 덧뵈기 row is highlighted to show it spans both years. Each row label carries a small semi-realistic thumbnail of its Namsadang discipline: 덜미 a wooden puppet, 덧뵈기 a mask, 버나 a spinning dish on a stick, 살판 a ground-acrobatics tumble, 어름 a tightrope walk, 풍물 a spinning sangmo hat. Densely filled with meaningful content, no decorative filler; clean and highly legible.
Render ONLY these exact Korean texts, nothing else:
column headers "1차연도 키오스크", "2차연도 확장"
row "덜미": "유람기, 꼭두각시" and "고도화"
row "덧뵈기": "탈춤, 양반 놀리기 4컷" and "덧뵈기 관람"
row "버나": "버나잡이 한 판" and "고도화"
row "살판": "1차 없음" and "살판 관람"
row "어름": "1차 없음" and "어름 체험, 관람"
row "풍물": "1차 없음" and "풍물 합주, 디지털 상모"
Style: pure white (#FFFFFF) background so it drops cleanly onto a white slide; outlined cells and a colored header bar, ink-navy text, vermilion-red and gold accents, semi-realistic discipline thumbnails. 2:1 landscape.
```

## 나. 1차연도 콘텐츠 5종과 개발 순서

### 슬라이드

1차연도 키오스크 콘텐츠 5종을 개발 순서대로 정리함. 체험형(실시간 동작과 조작이 핵심) 3종과 생성형(입력에서 결과물 산출이 핵심) 2종임 ([[1차연도 셀빅 개발 준비자료#2. 2026년 셀빅 개발 콘텐츠]], [[1차연도 셀빅 개발 준비자료#나. 콘텐츠 개발 순서]]).

| 순서 | 콘텐츠 | 종목 | 유형 | 한 줄 콘셉트 |
|---|---|---|---|---|
| 1 | 나만의 유람기 | 덜미 | 생성 | 플롯 문답을 AI 서사와 삽화로 엮어 그림동화 전자책 제작 |
| 2 | 나만의 탈춤 | 덧뵈기 | 체험 | 디자인한 탈을 3D로 변환해 AR로 쓰고 춤사위 채점 |
| 3 | 양반 놀리기 4컷 | 덧뵈기 | 생성 | 풍자 플롯에 입력을 넣어 사용자 탈 캐릭터 4컷 만화 생성 |
| 4 | 버나잡이 한 판 | 버나 | 체험 | 센서 막대로 버나를 돌리는 물리 묘기와 매호씨 재담 대거리 |
| 5 | 나만의 꼭두각시 | 덜미 | 체험 | 얼굴 촬영으로 목각 인형 3D 아바타를 만들어 양손 조작 |

- **순서 논리 [방향]**: 생성형이 쉬워 유람기를 먼저 둠. 단 체험형 첫 주자 탈춤을 2번으로 앞당겨 실시간 동작, 3D, 채점 스택을 세우고 나머지 체험형에 전파. 최난도 꼭두각시(손 인식 한계)를 마지막에 둠
- **전략 [방향]**: 공용 시스템을 먼저 붙들지 않고 첫 콘텐츠(유람기)가 구체적 요구로 끌어내게 함. 앞 단계가 끝없이 늘어지는 것을 막음
- **선행 조건 [미결]**: 디바이스 규격 확정과 데이터 확보가 콘텐츠 개발에 앞섬 (4부 가. 데이터셋 확보와 구축, 4부 다. 디바이스)
- 각 콘텐츠 상세 기획서는 작성 중인 초안임(미승인). 킥오프에서는 콘셉트 수준으로만 공유함

> **발표 노트**: 이 5종이 3부 기술 트랙을 실제로 끌어냄. 순서의 핵심은 쉬운 것으로 공용 시스템을 세우고, 체험형 첫 주자를 앞당겨 기술을 전파하는 것.

### 프롬프트

```
A rich, densely filled premium editorial numbered-flow infographic in a tech-diagram style, 2:1 landscape. Five content cards left to right in development order 1 to 5, connected by arrows. Each card shows a large order number, the content name, a small discipline sub-label, a type tag, and a small semi-realistic Namsadang thumbnail of its content. "생성" and "체험" tags use different colors. Card thumbnails: 나만의 유람기 a Deolmi wooden puppet with a storybook page, 나만의 탈춤 a Deotboegi mask with a dancing figure, 양반 놀리기 4컷 a yangban-mask four-panel cartoon, 버나잡이 한 판 a spinning buna dish on a stick, 나만의 꼭두각시 a carved wooden-puppet face avatar. Densely filled with meaningful content, no decorative filler; clean and legible.
Render ONLY these exact Korean texts, nothing else:
card 1 "나만의 유람기" sub "덜미" tag "생성"
card 2 "나만의 탈춤" sub "덧뵈기" tag "체험"
card 3 "양반 놀리기 4컷" sub "덧뵈기" tag "생성"
card 4 "버나잡이 한 판" sub "버나" tag "체험"
card 5 "나만의 꼭두각시" sub "덜미" tag "체험"
bottom strip label "생성형 먼저, 체험형 첫 주자 탈춤 앞당김"
Style: pure white (#FFFFFF) background so it drops cleanly onto a white slide; outlined cards, bold order numbers, ink-navy text, vermilion-red and gold accents, flat icons. 2:1 landscape.
```

## 다. 2차연도 심화 콘텐츠 6종

### 슬라이드

2차연도 심화 서비스 콘텐츠는 미디어 케이브 관람형 중심이며, 아래 6종으로 확정함 [확정]. 이 6종을 2차연도에 개발함. 마일스톤 5.3은 살판, 어름, 군중, 대련, 풍물로 달리 표기했으나, 최종 구성은 이 6종으로 정리됨 ([[4. 마일스톤 체계 및 수행계획]] 5.3 2차연도 심화 서비스 콘텐츠(6종) 개발, [[2. 연구개발의 목표 및 내용]]).

6종의 종목, 형태, 한 줄 콘셉트를 정리함.

| 콘텐츠        | 종목  | 형태          | 한 줄 콘셉트                                           |
| ---------- | --- | ----------- | ------------------------------------------------- |
| 곤두질 한 판    | 살판  | 관람(미디어 케이브) | 살판쇠의 텀블링을 4DGS로 4면에 고실감 투사                        |
| 어름산이 되기    | 어름  | 체험(키오스크)    | 바닥에 줄과 배경을 투사하여 줄 출렁임과 이동을 표현하며 가상 어름산이 실시간 자세 코칭 |
| 외줄 위의 어름산이 | 어름  | 관람(미디어 케이브) | 관객 반응에 따라 곡예 난이도가 달라지는 인터랙티브 줄타기 공연               |
| 탈춤 군무 한마당  | 덧뵈기 | 관람(미디어 케이브) | 관객이 디자인한 탈 아바타가 화면 속에서 함께 춤추는 참여 공연               |
| 다함께 풍물 한바탕 | 풍물  | 체험(미디어 케이브) | 핸드 트래킹으로 가상 악기를 여럿이 함께 연주하는 XR 앙상블                |
| 빛의 상모놀이    | 풍물  | 체험(미디어 케이브) | 무선 센서 모자로 고개를 돌려 상모꾼 아바타와 빛의 궤적을 연동               |

> **발표 노트**: 2차연도에 개발할 확정 6종임. 어름이 체험과 관람 둘, 풍물이 합주와 디지털 상모 둘로 6항목을 이룸. 미디어 케이브 관람형이 중심이며, 6종 구성은 큐랩과 이미 확인 완료. 마일스톤 5.3의 군중, 대련 표기는 이 6종으로 대체됨.

### 프롬프트

```
A rich premium editorial card-grid infographic in a tech-diagram style, 2:1 landscape. Pure white (#FFFFFF) background so it drops cleanly onto a white slide. Do NOT draw a slide title or header text (the presentation already provides it). Organize the six cards into two labeled device categories so the layout reads clearly at a glance, with no scattered colors.
Layout: a clean 3-column by 2-row grid of six equal-sized cards, evenly spaced, filling the full width with no large empty margins. Do NOT draw a top banner or group-title band. Device grouping reads by header color: the five 케이브(media-cave) cards use a vermilion-red header strip, and the one 키오스크(kiosk) card uses a gold header strip. Fill the grid row-major with the five cave cards first (row 1 has three cards, row 2 has the remaining two cave cards) and the single kiosk card in the last cell (bottom-right). Each card has a colored header strip with the content name and a type tag ("관람" or "체험" in different colors), a small 종목 sub-label, one concise concept line, and a semi-realistic Namsadang thumbnail on the right portion. A slim legend bar at the very bottom shows a red swatch labeled 케이브 콘텐츠 5종 and a gold swatch labeled 키오스크 콘텐츠 1종.
Card thumbnails: 곤두질 한 판 a ground-acrobatics tumbler mid-flip across a 4-wall immersive screen; 외줄 위의 어름산이 a tightrope walker performing above a reacting crowd; 탈춤 군무 한마당 masked avatars dancing inside a large screen before an audience; 다함께 풍물 한바탕 several hands playing virtual pungmul instruments in XR; 빛의 상모놀이 a spinning sangmo hat drawing a glowing light trail; 어름산이 되기 a person balancing on a floor-projected rope line with a real-time coaching pose-overlay.
Render ONLY these exact Korean texts, nothing else:
(케이브, 빨강 헤더) card "곤두질 한 판" sub "살판" tag "관람" concept "살판쇠의 텀블링을 4DGS로 4면에 고실감 투사"
(케이브, 빨강 헤더) card "외줄 위의 어름산이" sub "어름" tag "관람" concept "관객 반응에 따라 곡예 난이도가 달라지는 인터랙티브 줄타기"
(케이브, 빨강 헤더) card "탈춤 군무 한마당" sub "덧뵈기" tag "관람" concept "관객이 디자인한 탈 아바타가 화면 속에서 함께 춤추는 참여 공연"
(케이브, 빨강 헤더) card "다함께 풍물 한바탕" sub "풍물" tag "체험" concept "핸드 트래킹으로 가상 악기를 여럿이 함께 연주하는 XR 앙상블"
(케이브, 빨강 헤더) card "빛의 상모놀이" sub "풍물" tag "체험" concept "무선 센서 모자로 고개를 돌려 상모꾼 아바타와 빛의 궤적을 연동"
(키오스크, 금색 헤더, 마지막 칸) card "어름산이 되기" sub "어름" tag "체험" concept "바닥에 줄과 배경을 투사, 가상 어름산이 실시간 자세 코칭"
bottom legend "케이브 콘텐츠 5종", "키오스크 콘텐츠 1종"
Style: outlined cards with colored header strips, ink-navy text, vermilion-red and gold accents, semi-realistic discipline thumbnails, dense but clean. 2:1 landscape.
```

# 3. 기술 트랙

## 가. 생성형 서사와 이미지 생성

### 슬라이드

생성 콘텐츠(유람기, 양반 놀리기 4컷)의 엔진임. 1차연도에 기본 생성을 세우고 2차연도에 서사 일관성을 고도화함.

- **1차연도 [방향]**: 플롯 문답 기반 LLM 서사 생성, 삽화와 만화 이미지 생성, 전자책과 4컷 조립 ([[1차연도 셀빅 개발 준비자료#5. 콘텐츠별 시스템과 데이터]], [[4. 마일스톤 체계 및 수행계획]] 3.4 생성형 전통 서사 및 텍스처 기술)
- **2차연도 [방향]**: 양방향 검색 증강 생성(RAG)으로 맥락 보정, 인물과 사건과 장소 메모리로 서사 일관성 확보, 텍스트와 이미지 장면 연속성 ([[2. 연구개발의 목표 및 내용]], [[4. 마일스톤 체계 및 수행계획]] 2.1 생성형 전통 서사 고도화)
- **필요 데이터**: 재담과 플롯 텍스트(서사 시드), 삽화와 캐릭터 양식 이미지(생성 레퍼런스)

> **발표 노트**: 1차의 유람기와 4컷이 이 엔진을 먼저 만들고, 2차 고도화가 전 콘텐츠 서사 품질을 끌어올림. LLM 통합 자체는 2차연도(3부 라).

### 프롬프트

```
A rich, densely filled premium editorial evolution diagram in a tech-diagram style, 2:1 landscape. A left "1차연도" panel and a right "2차연도" panel with a bold progression arrow between them. Each panel holds labeled icon chips. A bottom strip shows input-data icons. Include a small semi-realistic Namsadang thumbnail illustrating the content: a Deolmi wooden puppet with a picture-book illustration. Do NOT draw a title bar or header text (the presentation slide already provides the title). Clean and legible.
Render ONLY these exact Korean texts, nothing else:
left panel "1차연도" chips "LLM 서사 생성", "이미지 생성", "전자책과 4컷 조립"
right panel "2차연도" chips "양방향 RAG", "서사 일관성", "장면 연속성"
bottom input-data labels "재담과 플롯 텍스트", "삽화 레퍼런스"
Style: pure white (#FFFFFF) background so it drops cleanly onto a white slide; outlined panels, ink-navy text, vermilion-red and gold accents, flat icons, right panel slightly brighter to signal advancement. 2:1 landscape.
```

## 나. 실시간 동작 인식, 코칭, 아바타

### 슬라이드

체험 콘텐츠(탈춤, 꼭두각시, 버나)의 엔진임. 1차연도에 인식과 채점, 아바타 제어를 세우고 2차연도에 정밀 교정과 다중 참여로 확장함.

- **1차연도 [방향]**: 실시간 포즈 추정과 자세, 타이밍 채점, 아바타 제어와 손 관절 추적, 물리 시뮬레이션 ([[4. 마일스톤 체계 및 수행계획]] 2.1 실시간 동작 인식 및 분석, 3.3 아바타 제어 및 인터랙션 기술)
- **2차연도 [방향]**: 관절별 정밀 교정, 참여자 동작 동기화, AI 동작 인식과 의미 분석, 합주와 대련 타이밍 매칭 ([[4. 마일스톤 체계 및 수행계획]] 1.4 참여자 동작 동기화, 2.5 AI 기반 동작 인식 및 의미 분석, 5.2 다중 참여형 시뮬레이션 및 AI 합주, 대련)
- **협력 기관 제공 기술 [확정]**: 3D 스켈레톤은 연세대, 모션 생성과 특징 추출은 KETI가 제공함 (1부 나. 컨소시엄과 역할)

> **발표 노트**: 탈춤을 2번에 앞당겨 이 스택을 먼저 세우는 이유임. 손 인식이 손목까지라 꼭두각시 양손 조작이 이 범위 안에 들어와야 함(4부 나. 설계 전제).

### 프롬프트

```
A rich, densely filled premium editorial evolution diagram in a tech-diagram style, 2:1 landscape. A left "1차연도" panel and a right "2차연도" panel with a bold progression arrow between them, and a callout banner at the bottom. Pose-skeleton icons. Include a small semi-realistic Namsadang thumbnail: a Deotboegi mask-dance performer and a buna performer with pose points. Do NOT draw a title bar or header text (the presentation slide already provides the title). Clean and legible.
Render ONLY these exact Korean texts, nothing else:
left panel "1차연도" chips "포즈 추정과 채점", "아바타 제어", "물리 시뮬레이션"
right panel "2차연도" chips "정밀 교정", "참여자 동작 동기화", "합주와 대련 타이밍"
bottom callout "핵심 AI 제공: 연세대 3D 스켈레톤, KETI 모션 생성"
Style: pure white (#FFFFFF) background so it drops cleanly onto a white slide; outlined panels, ink-navy text, vermilion-red and gold accents, flat pose-skeleton icons. 2:1 landscape.
```

## 다. 실감 표현: AR, 4D, 미디어 케이브

### 슬라이드

콘텐츠를 화면과 공간에 실감으로 올리는 트랙임. 1차연도 AR에서 2차연도 4D와 미디어 케이브로 무게가 넘어감.

- **1차연도 [방향]**: 탈춤의 AR 착용과 2D 탈 캐릭터 합성(키오스크)
- **2차연도 [방향]**: 4D 가우시안 스플래팅(4DGS) 초고속 렌더링(최대 80fps), 미디어 케이브 관람 콘텐츠(2부 다. 2차연도 심화 콘텐츠) ([[2. 연구개발의 목표 및 내용]], [[4. 마일스톤 체계 및 수행계획]] 5.1 초고속 4D 렌더링 및 햅틱, VR 핵심 기술)
- **미디어 케이브 [확정]**: 셀빅이 구축. 3면과 바닥 스크린 몰입 공간. 공수 대비 사업성 판단으로 관람형으로 최소화 ([[컨소시엄 회의록 - 2026-06-22#2. 핵심 합의]], [[큐랩셀빅 사전회의 - 2026-06-22#가. 플랫폼과 하드웨어]])
- **비주얼 방향 [방향]**: 배경과 무거운 3D 모델링은 지양하고 2D 영상과 AI 생성 위주. 단 콘텐츠 핵심인 아바타와 탈의 3D 변환은 사용함 ([[큐랩셀빅 사전회의 - 2026-06-22#2. 핵심 합의]], [[2. 연구개발의 목표 및 내용]])

> **발표 노트**: 미디어 케이브는 해외에 못 가져가므로 서울랜드 전시 효과용임. 그래서 사업성 판단상 관람형으로 최소화함.

### 프롬프트

```
A rich, densely filled premium editorial evolution diagram in a tech-diagram style, 2:1 landscape. A left "1차연도" panel with a kiosk showing an AR mask-dance scene and a right "2차연도" panel with a 3-wall-and-floor immersive media-cave illustration showing a Namsadang pungmul performance, a bold progression arrow between them, and a small annotation. Do NOT draw a title bar or header text (the presentation slide already provides the title). Clean and legible.
Render ONLY these exact Korean texts, nothing else:
left panel "1차연도" chips "탈춤 AR 착용", "2D 탈 캐릭터 합성"
right panel "2차연도" chips "4DGS 초고속 렌더링", "미디어 케이브"
annotation "무거운 3D 지양, 핵심 아바타와 탈은 3D"
Style: pure white (#FFFFFF) background so it drops cleanly onto a white slide; outlined panels, ink-navy text, vermilion-red and gold accents, isometric immersive-space icon. 2:1 landscape.
```

## 라. 공용 플랫폼과 시스템

### 슬라이드

콘텐츠 5종이 함께 쓰는 기반임. 콘텐츠와 따로 먼저 완성하지 않고 첫 콘텐츠가 끌어내 만든 뒤 재사용하며 확장함 ([[1차연도 셀빅 개발 준비자료#4. 공용 시스템]]).

- **1차연도 [방향]**: 런처(메뉴 통합), 서버(결과물 저장과 로그인, 기기 간 동기화 없음), 결과물 전송과 호스팅(사진은 인화 없이 QR 코드 다운로드), 음성 입출력(STT, TTS 상용 API), 디지털 휴먼 포팅, 통합 플랫폼 아키텍처 ([[4. 마일스톤 체계 및 수행계획]] 1.2 통합 플랫폼 아키텍처 및 인프라 구축)
- **2차연도 [방향]**: 플랫폼 고도화(플러그인 구조, 오토스케일링), 통합 경험(CX) 관리(개인화 추천, 게이미피케이션 무형유산 여권, 통계 대시보드), 이어하기와 학습 기록 저장 ([[2. 연구개발의 목표 및 내용]], [[4. 마일스톤 체계 및 수행계획]] 4.2 플랫폼 고도화 및 CX 관리 시스템)
- **LLM 통합 [확정]**: 1차연도 데이터셋 기반 생성 AI를 2차연도에 플랫폼으로 통합 ([[큐랩셀빅 사전회의 - 2026-06-22#2. 핵심 합의]])

> **발표 노트**: 서버의 1차연도 범위는 익명 결과물 다운로드까지임. 이어하기와 학습 기록 저장은 2차연도(디지털 도제)로 넘어가나, 2차 연속성을 지금부터 전방 설계할지가 논점임.

### 프롬프트

```
A rich, densely filled premium editorial layered-stack diagram in a tech-diagram style, 2:1 landscape. On the left, a "1차연도" stack of six layered blocks stacked bottom to top; on the right, a "2차연도" set of added layer blocks connected by an expansion arrow. Each block has a small icon. Densely filled with meaningful content, no decorative filler; clean and legible.
Render ONLY these exact Korean texts, nothing else:
left stack header "1차연도", blocks bottom to top "서버", "결과물 전송과 호스팅", "음성 입출력 STT/TTS", "디지털 휴먼", "런처", "통합 플랫폼 아키텍처"
right added header "2차연도", blocks "플랫폼 고도화", "CX 관리", "LLM 통합", "학습 기록과 이어하기"
Style: pure white (#FFFFFF) background so it drops cleanly onto a white slide; outlined layer blocks, ink-navy text, vermilion-red and gold accents, flat icons. 2:1 landscape.
```

# 4. 개발 기반과 전제

## 가. 데이터셋 확보와 구축

### 슬라이드

AI 학습용 대규모가 아니라 **코칭용 정답 데이터(GT, Ground Truth) 중심 소규모**임. 보존회 실연자가 소수라 규모가 작음 ([[큐랩셀빅 사전회의 - 2026-06-22#2. 핵심 합의]]).

- **콘텐츠별 원천 데이터 [방향]**: 춤사위 모션, 탈과 인형 이미지, 재담 텍스트, 장단 음원, 코칭용 정답 동작 ([[1차연도 셀빅 개발 준비자료#5. 콘텐츠별 시스템과 데이터]])
- **확보 담당 [확정]**: 셀빅이 남사당놀이보존회와 협의(전문가 활용비 집행 전제). 실제 확보 시점은 미결 ([[큐랩셀빅 사전회의 - 2026-06-22#나. 데이터와 LLM]])
- **폼과 형식 [미결]**: 데이터 폼, 형식, 취득 항목은 데이터 구축 전 실무 회의에서 정함 ([[컨소시엄 회의록 - 2026-06-22#4. 미결과 후속 액션]])
- **활용 검토 [참고]**: 정부 아카이브 데이터셋은 라이선스 제약이 있음 ([[남사당놀이 아카이브 데이터셋 활용 검토]])

> **발표 노트**: 데이터가 1순위 선행임. 보존회 컨택이 늦어지면 체험형 콘텐츠의 채점 정답을 못 만들어 개발 전체가 밀림.

### 프롬프트

```
A rich, densely filled premium editorial flow diagram in a tech-diagram style, 2:1 landscape. A left start node flows by arrow to a central cluster of five source-data icons, then by arrow to a right result node. A banner on top and two small tags at the bottom. Densely filled with meaningful content, no decorative filler; clean and legible.
Render ONLY these exact Korean texts, nothing else:
top banner "대규모 학습용 아님, 코칭 GT 중심 소규모"
left start node "남사당놀이보존회"
center cluster labels "춤사위 모션", "탈과 인형 이미지", "재담 텍스트", "장단 음원", "정답 동작"
right result node "코칭용 정답 데이터셋 GT"
bottom tags "폼과 형식 미결", "아카이브 라이선스 검토"
Style: pure white (#FFFFFF) background so it drops cleanly onto a white slide; outlined nodes, ink-navy text, vermilion-red and gold accents, flat data icons. 2:1 landscape.
```

## 나. 설계 전제

### 슬라이드

기술 트랙 설계가 지켜야 할 전제임. 설계가 이 범위 안에서 이뤄져야 함.

- **손 인식 범위 [확정]**: 전신 싱글 카메라는 손목까지가 현실적임. 손가락 추적은 별도 R&D 과제 ([[컨소시엄 회의록 - 2026-06-22#라. 모션 인식 기술 범위 (연세대)]])
- **인식 인원과 연령 [확정]**: 동시 1인 인식이 정확도와 속도에 유리하고, 청소년 이상(성인 포함)이 대상 ([[컨소시엄 회의록 - 2026-06-22#라. 모션 인식 기술 범위 (연세대)]])
- **LLM 방식 [미결]**: 상용이든 오픈소스든 사용 가능. 자체 구축 여부와 프레임워크는 각 기관 프로토타입 후 결정 ([[컨소시엄 회의록 - 2026-06-22#나. 데이터와 LLM 역할]])

> **발표 노트**: 손목까지만 인식되는 점이 꼭두각시 양손 조작 설계의 상한임. 이 전제가 3부 나(동작 인식) 트랙의 설계 범위를 정함.

### 프롬프트

```
A rich, densely filled premium editorial diagram of three constraint panels in a tech-diagram style, 2:1 landscape. Three tall rounded cards side by side, filling the full width with no large empty margins. Do NOT draw a title bar, banner, or header text at the top. Each card has a colored header strip carrying the constraint title and a small status badge ("확정" in navy, "미결" in gold), a clear central icon, one bold key-value line under the icon, and two short supporting lines (a reason line, then an implication line) stacked below. A slim annotation bar spans the full width at the bottom under the three cards. Card 1 icon: a hand with a dashed red boundary line drawn across the wrist. Card 2 icon: a single-person silhouette with a "13+" age badge. Card 3 icon: an AI chip and a code file branching to a shopping cart (commercial), an open padlock (open source), and a question mark (undecided). No decorative filler; clean and highly legible.
Render ONLY these exact Korean texts, nothing else:
card 1 title "손 인식 범위" badge "확정" value "손목까지 인식" reason "전신 단일 카메라의 현실적 한계" implication "손가락 추적은 별도 R&D 과제"
card 2 title "인식 인원과 연령" badge "확정" value "동시 1인 인식" reason "정확도와 속도에 유리" implication "대상은 청소년 이상, 성인 포함"
card 3 title "LLM 방식" badge "미결" value "상용 또는 오픈소스" reason "자체 구축 여부와 프레임워크 미정" implication "각 기관 프로토타입 후 결정"
bottom annotation "세 전제가 기술 트랙 설계 범위를 규정, 손 인식 상한이 꼭두각시 양손 조작 설계를 좌우"
Style: pure white (#FFFFFF) background so it drops cleanly onto a white slide; outlined cards with colored header strips, ink-navy text, vermilion-red and gold accents, dashed boundary emphasis on card 1, flat icons. 2:1 landscape.
```

## 다. 디바이스

### 슬라이드

콘텐츠가 도는 하드웨어임. 규격은 큐랩이 정하고 셀빅이 맞춤. 정본은 [[디바이스 사양]] ([[1차연도 셀빅 개발 준비자료#6. 디바이스]]).

- **1차연도 [확정]**: 가로형 키오스크(모션 인식 뎁스 카메라, 바닥 프로젝션)
- **2차연도 [방향]**: 미디어 케이브 추가(3면과 바닥 스크린 몰입 공간)
- **규격 주체 [확정]**: 큐랩이 센서와 규격을 정하고 셀빅이 맞춤. 셀빅 포토부스(세로형)와 큐랩 케이팝 키오스크(가로형) 자산을 단일 규격으로 통합
- **미결 항목 [미결]**: 65인치, 뎁스 카메라 모델(키넥트나 오르벡), 라이다 센서 채택, 콘텐츠 적용 하드웨어(버나 센서 막대) 도입

> **발표 노트**: 규격은 큐랩이 정하고 셀빅이 맞추는 구조라, 규격 확정이 늦으면 콘텐츠 개발이 함께 밀림. 버나 센서 막대 같은 콘텐츠 적용 하드웨어는 도입 자체가 미정임.

### 프롬프트

```
A rich, densely filled premium editorial hardware infographic in an isometric flat-vector style, 2:1 landscape. On the left, an upright horizontal kiosk illustration with callout labels; on the right, a 3-wall-and-floor immersive media-cave illustration. A bottom row of undecided-item tags and a small annotation. Each bottom tag carries a small flat icon: 65인치 a diagonally measured monitor, 뎁스 카메라 모델 a stereo depth camera, 라이다 센서 a lidar sensor puck with scan rings, 콘텐츠 적용 하드웨어 a buna spinning-stick prop. Densely filled with meaningful content, no decorative filler; clean and legible.
Render ONLY these exact Korean texts, nothing else:
left kiosk callouts "가로형 키오스크", "모션 인식 뎁스 카메라", "바닥 프로젝션", tag "1차연도"
right cave label "미디어 케이브", tag "2차연도"
bottom undecided tags "65인치", "뎁스 카메라 모델", "라이다 센서", "콘텐츠 적용 하드웨어"
annotation "규격은 큐랩 주도, 셀빅 맞춤"
Style: pure white (#FFFFFF) background so it drops cleanly onto a white slide; isometric flat vector, ink-navy line work, vermilion-red and gold accents. 2:1 landscape.
```

# 5. 일정과 실증

## 가. 1차연도 일정과 마일스톤

### 슬라이드

계획서 명목 일정 기준 셀빅 관련 1차연도 마일스톤임(번호는 [[4. 마일스톤 체계 및 수행계획]]의 마일스톤 코드).

| 번호  | 마일스톤                    | 목표 일정         | 핵심 수행기관 |
| --- | ----------------------- | ------------- | ------- |
| 1.2 | 통합 플랫폼 아키텍처 및 인프라 구축    | 26.05 ~ 26.08 | 큐랩, 셀빅  |
| 1.3 | 하드웨어 인터페이스 및 키오스크 프로토타입 | 26.06 ~ 26.12 | 큐랩, 셀빅  |
| 1.4 | 통합 플랫폼 최적화 및 안정화        | 26.09 ~ 26.10 | 셀빅      |
| 2.1 | 실시간 동작 인식 및 분석          | 26.04 ~ 26.11 | 큐랩, 셀빅  |
| 3.3 | 아바타 제어 및 인터랙션 기술        | 26.07 ~ 26.09 | 셀빅      |
| 3.4 | 생성형 전통 서사 및 텍스처 기술      | 26.07 ~ 26.11 | 셀빅      |
| 4.2 | 시범 서비스 콘텐츠 프로토타입        | 26.07 ~ 26.11 | 셀빅      |
| 4.3 | 통합 실증 및 기술 검증           | 26.07 ~ 26.12 | 셀빅      |

> **발표 노트**: 계획서 명목 착수는 26.04이나 실제 착수는 늦음. 6부 나. 중점 관리 사항의 압축 리스크와 함께 봐야 함.

### 프롬프트

```
A rich, densely filled premium editorial Gantt chart in a tech-diagram style, 2:1 landscape. A horizontal month axis from 26.04 to 26.12. Eight labeled horizontal bars, each with a small icon, spanning their months on a clean grid. Densely filled with meaningful content, no decorative filler; clean and highly legible.
Render ONLY these exact Korean texts, nothing else:
month axis "26.04" to "26.12"
bars: "1.2 통합 플랫폼 아키텍처" 26.05 to 26.08, "1.3 키오스크 프로토타입" 26.06 to 26.12, "1.4 플랫폼 안정화" 26.09 to 26.10, "2.1 실시간 동작 인식" 26.04 to 26.11, "3.3 아바타 제어" 26.07 to 26.09, "3.4 생성형 서사와 텍스처" 26.07 to 26.11, "4.2 시범 콘텐츠 프로토타입" 26.07 to 26.11, "4.3 통합 실증과 검증" 26.07 to 26.12
Style: pure white (#FFFFFF) background so it drops cleanly onto a white slide; light-gray grid, ink-navy labels, vermilion-red and gold bars, bold Korean sans-serif. 2:1 landscape.
```

## 나. 2차연도 일정과 마일스톤

### 슬라이드

계획서 명목 일정 기준 셀빅 관련 2차연도 마일스톤임 ([[4. 마일스톤 체계 및 수행계획]]).

| 번호 | 마일스톤 | 목표 일정 | 핵심 수행기관 |
|---|---|---|---|
| 2.1 | 생성형 전통 서사 고도화 | 27.01 ~ 27.04 | 셀빅 |
| 4.2 | 플랫폼 고도화 및 CX 관리 시스템 | 27.01 ~ 27.10 | 셀빅 |
| 5.1 | 초고속 4D 렌더링 및 햅틱, VR 핵심 기술 | 27.03 ~ 27.06 | 셀빅 |
| 5.2 | 다중 참여형 시뮬레이션 및 AI 합주, 대련 | 27.03 ~ 27.07 | 셀빅 |
| 4.1 | 고실감 4D 콘텐츠 제작 | 27.03 ~ 27.12 | 큐랩, 셀빅 |
| 2.5 | AI 기반 동작 인식 및 의미 분석 | 27.04 ~ 27.08 | 셀빅 |
| 5.3 | 2차연도 심화 서비스 콘텐츠(6종) 개발 | 27.05 ~ 27.11 | 셀빅 |
| 1.4 | 참여자 동작 동기화 기술 | 27.08 ~ 27.11 | 셀빅 |
| 4.3 | 수요처 현장 실증 및 상용화 검증 | 27.08 ~ 27.12 | 큐랩, 셀빅 |
| 5.4 | 글로벌 실증 및 상용화 패키징 | 27.09 ~ 27.12 | 셀빅 |

> **발표 노트**: 상반기에 렌더링과 서사 고도화, 하반기에 실증과 글로벌 패키징으로 마무리됨.

### 프롬프트

```
A rich, densely filled premium editorial Gantt chart in a tech-diagram style, 2:1 landscape. A horizontal month axis from 27.01 to 27.12. Ten labeled horizontal bars, each with a small icon, spanning their months on a clean grid. Densely filled with meaningful content, no decorative filler; clean and highly legible.
Render ONLY these exact Korean texts, nothing else:
month axis "27.01" to "27.12"
bars: "2.1 생성형 서사 고도화" 27.01 to 27.04, "4.2 플랫폼 고도화와 CX" 27.01 to 27.10, "5.1 4D 렌더링과 햅틱 VR" 27.03 to 27.06, "5.2 다중 참여 시뮬과 합주 대련" 27.03 to 27.07, "4.1 고실감 4D 콘텐츠" 27.03 to 27.12, "2.5 AI 동작 인식과 의미" 27.04 to 27.08, "5.3 심화 콘텐츠 6종" 27.05 to 27.11, "1.4 참여자 동작 동기화" 27.08 to 27.11, "4.3 현장 실증과 검증" 27.08 to 27.12, "5.4 글로벌 실증과 패키징" 27.09 to 27.12
Style: pure white (#FFFFFF) background so it drops cleanly onto a white slide; light-gray grid, ink-navy labels, vermilion-red and gold bars. 2:1 landscape.
```

## 다. 실증과 TRL 7

### 슬라이드

2차연도의 마무리는 현장 실증과 상용 수준(TRL 7) 달성임. 국내외 수요처 2개소 이상에 설치, 운영해 TRL 7을 검증함 ([[2. 연구개발의 목표 및 내용]]).

실증 장소별 기간, 대상 인원, 투입 시스템을 정리함.

| 장소 | 기간 | 대상과 인원 | 투입 시스템 | 상태 |
|---|---|---|---|---|
| 서울랜드 (국내) | 27.5 ~ 27.8 | 일반 관람객 400명 | 미디어 케이브(살판), 키오스크 | 확정 |
| 해외 1곳 (태국 또는 베트남) | 27.8 ~ 27.12 | 현지 학생 100명 | 키오스크 | 미결 |

- **성과 목표 지표 [방향]**: 계획서 성능지표 기준, TRL 7 달성의 정량 근거임 ([[2. 연구개발의 목표 및 내용]])
	- 현장 실증 운영: 400명 (2차연도, 평가 가중치 20%)
	- 참여자 만족도(CSAT): 85점 이상 (참여자 100인 이상 설문, 공인인증기관 시험)
	- 무형유산 특성 분류 정확도: 95% 이상 (1차연도 85%에서 향상)
	- 동작 분석 정밀도(MPJPE): 35mm 이하 (1차연도 45mm에서 향상)
	- 4D 콘텐츠 생성 품질(FID): 4.0 이하 (1차연도 6.0에서 향상)
- **실증 검증 항목 [방향]**: 실증 현장에서 측정할 지표임 ([[2. 연구개발의 목표 및 내용]])
	- 사용자 편의성(UI/UX 만족도)
	- 콘텐츠 몰입도(체험 시간, 재방문율)
	- 하드웨어 안정성(장애 발생률)
- **국내 실증 [확정]**: 서울랜드. 셀빅이 협의 선행. 실증 영상 확보가 결과 보고의 핵심 ([[큐랩셀빅 사전회의 - 2026-06-22#마. 실증]])
- **해외 실증 [미결]**: 한 곳. 태국과 베트남을 비교해 선정(계획서의 필리핀은 6/22 회의에서 빠짐). 용인대 장경태 교수가 2026년 7월 5일 베트남을 방문해 진행 가능 여부를 확인한 뒤 선정하며, 실증은 2027년 가을 ([[컨소시엄 회의록 - 2026-06-22#바. 실증과 거버넌스]])
- **기술 성숙도 [확정]**: 착수 시점 TRL 5단계에서 2차연도 종료 시점 TRL 7단계 목표 ([[rfp_제안요청서]], [[2. 연구개발의 목표 및 내용]])

> **발표 노트**: 해외 실증지 확정이 선행임. 준비 기간이 길어 늦어지면 가을 실증 일정이 흔들림. 서울랜드 인원은 정본 KPI 400명 기준임(사전회의 녹취 500명은 미확정). 성능지표(정확도, MPJPE, FID)는 3부 기술 트랙 목표와 연동됨. 성과물 건수(특허, SW, 매출 등)는 6부 가에서 다룸.

### 프롬프트

```
A rich, densely filled premium editorial infographic in a tech-diagram style, 2:1 landscape, split into a left "실증 추진 계획" panel and a right "성과 목표 (TRL 7)" panel.
Left panel: a clean flat regional map of East and Southeast Asia (show the Korean peninsula AND mainland Southeast Asia, not just Korea). One emphasized solid red pin on Seoul, Korea labeled 서울랜드, and one muted gold dashed pin over the Thailand/Vietnam area labeled 해외 1곳. Do NOT draw any travel route or line connecting the two pins. Below the map, two site cards side by side, each with a title, a date line, a headcount line, and a system line; the domestic card is solid/emphasized (확정), the overseas card is dashed/muted (미결). Directly under the overseas card, one small caption line stating how the overseas site is selected.
Right panel, top to bottom: a semicircular gauge showing TRL progressing from 5 to 7; a row of four KPI metric cards, each with a tiny flat icon; a slim sub-strip headed 실증 검증 항목 holding three small check items; and a wide badge at the bottom.
A slim annotation bar spans the full width under both panels.
Render ONLY these exact Korean texts, nothing else:
left map pins "서울랜드", "해외 1곳"
left card 1 "서울랜드 (국내, 확정)" lines "27.5~27.8", "관람객 400명", "미디어 케이브(살판), 키오스크"
left card 2 "해외 1곳 (미결)" lines "27.8~27.12", "현지 학생 100명", "태국 또는 베트남, 키오스크"
left caption "용인대 2026.7.5 베트남 방문 후 선정"
right gauge "TRL 5에서 7로"
right KPI cards "CSAT 85점 이상", "특성 분류 정확도 95%", "동작 분석 MPJPE 35mm", "4D 생성 FID 4.0"
right sub-strip title "실증 검증 항목"
right sub-strip items "사용자 편의성(UI/UX)", "콘텐츠 몰입도(체험 시간, 재방문율)", "하드웨어 안정성(장애 발생률)"
right badge "국내외 수요처 2개소 이상 설치, 운영"
bottom annotation "실증 영상 확보가 결과 보고 핵심"
Style: pure white (#FFFFFF) background so it drops cleanly onto a white slide; ink-navy elements, vermilion-red and gold accents, flat map and gauge icons, domestic site emphasized in red, overseas site muted with a gold dashed outline. 2:1 landscape.
```

# 6. 사업 관리

## 가. 성과물 목표

### 슬라이드

6/22 회의에서 PD(과제 점검 전문가) 요구로 컨소시엄이 통일한 2년 전체 목표임. 계획서 원문과 일부 다름(특허는 등록이 아닌 출원, SW 10건) ([[컨소시엄 회의록 - 2026-06-22#가. 성과물 목표 (PD 요구로 컨소시엄 통일)]]).

| 성과물                 | 전체 목표  | 셀빅 몫   | 배분                     |
| ------------------- | ------ | ------ | ---------------------- |
| 특허                  | 출원 6건  | 2건     | KETI 2건, 나머지 큐랩과 셀빅 반반 |
| SW 등록               | 10건    | 5건     | 큐랩과 셀빅 반반              |
| 사업화 건수              | 6건     | 분담(미정) | 큐랩, 셀빅                 |
| 사업화 매출              | 1억 원   | 5천만 원  | 큐랩과 셀빅 반반              |
| 고용 창출               | 4명     | 없음     | 큐랩                     |
| 시제품 제작              | 3건     | 없음     | 큐랩                     |
| SCI(과학기술논문 인용색인) 논문 | 건수 미명시 | 없음     | 대학교                    |

- 셀빅은 SW 등록과 특허 출원, 사업화가 직접 부담임. 개발 산출물을 성과물로 연결할 계획이 필요함

> **발표 노트**: 성과물은 개발과 별도 트랙이 아님. 콘텐츠 개발 초기에 SW 등록과 특허 대상을 정해두면 연말에 몰리지 않음.

### 프롬프트

```
A rich, densely filled premium editorial KPI dashboard in a tech-diagram style, 2:1 landscape. Seven metric cards, each with a large project-total number, an icon, and a label. Below each card's label, a small secondary sub-line inside a muted gray pill showing 셀빅's share. The three cards that 셀빅 directly bears ("특허 출원", "SW 등록", "사업화") get an emphasized red border. Densely filled with meaningful content, no decorative filler; clean and legible.
Render ONLY these exact Korean texts, nothing else:
card 1 label "특허 출원 6건" sub-pill "셀빅 2건"
card 2 label "SW 등록 10건" sub-pill "셀빅 5건"
card 3 label "사업화 6건" sub-pill "셀빅 분담(미정)"
card 4 label "매출 1억 원" sub-pill "셀빅 5천만 원"
card 5 label "고용 4명" sub-pill "셀빅 없음"
card 6 label "시제품 3건" sub-pill "셀빅 없음"
card 7 label "SCI 논문" sub-pill "셀빅 없음"
Style: pure white (#FFFFFF) background so it drops cleanly onto a white slide; outlined cards, big bold numbers, ink-navy text, vermilion-red and gold accents, 셀빅 sub-pill in a small muted gray rounded badge. 2:1 landscape.
```

## 나. 중점 관리 사항

### 슬라이드

낙관 편향을 막기 위해 킥오프에서 명시함.

- **1차연도 일정 압축 [리스크]**: 오늘 기준 1차연도 실질 잔여가 약 5~6개월임. 계획서 명목 착수(26.04)와 달리 첫 컨소시엄 회의가 6/22였고, 그 안에 콘텐츠 5종, 데이터 확보, 통합 플랫폼을 해야 함 (5부 가. 1차연도 일정과 마일스톤)
- **2차연도 선행 [리스크]**: 해외 실증지 선정과 미디어 케이브 사업성 판단이 2차연도 전개를 좌우함. 실증지는 용인대 2026년 7월 5일 베트남 방문 결과로 선정하며, 지연되면 2027년 가을 실증이 흔들림
- **선행 미결 항목 [미결]**: 데이터 확보 시점, 키오스크 규격, 연산 배치(현장 GPU와 서버 오프로드 중 택일), 버나 센서 막대, LLM 방식, 회원 정보 관리 ([[1차연도 셀빅 개발 준비자료#7. 미결과 결정 요청]])

> **발표 노트**: 가장 큰 제약은 시간임. 데이터와 규격이라는 두 선행이 늦으면 1차연도 5종 전체가 밀리므로, 이 둘을 즉시 착수함.

### 프롬프트

```
A rich, densely filled premium editorial risk board in a tech-diagram style, 2:1 landscape. Three stacked full-width rows, each a rounded card with, from left to right: a warning icon, a bold title with a small status badge beside it ("리스크" in red, "미결" in gold), a bold core-value line, and one smaller supporting note line below in muted gray. Row 1 icon an hourglass, row 2 icon a warning triangle, row 3 icon a siren. A slim full-width callout bar sits at the very bottom under the three rows. Densely filled with meaningful content, no decorative filler; clean and highly legible.
Render ONLY these exact Korean texts, nothing else:
row 1 badge "리스크" title "1차연도 일정 압축" value "실질 잔여 5~6개월" note "명목 착수 26.04, 첫 회의 6/22, 콘텐츠 5종과 데이터와 통합 플랫폼을 압축 수행"
row 2 badge "리스크" title "2차연도 선행" value "해외 실증지 선정, 미디어 케이브 사업성" note "용인대 2026.7.5 베트남 방문 후 선정, 지연 시 2027 가을 실증 흔들림"
row 3 badge "미결" title "선행 미결" value "6개 항목" note "데이터, 규격, 연산 배치(GPU/서버), 센서 막대, LLM, 회원 정보"
bottom callout "즉시 착수: 데이터 확보, 키오스크 규격 (지연 시 1차연도 5종 전체 밀림)"
Style: pure white (#FFFFFF) background so it drops cleanly onto a white slide; outlined cards, ink-navy text, vermilion-red risk accents and gold, flat warning icons, muted gray note lines. 2:1 landscape.
```

## 다. 후속 조치

### 슬라이드

킥오프 직후 착수할 선행 작업임. 데이터와 규격이 1순위 선행임.

| 액션 | 담당 | 시점 |
|---|---|---|
| 남사당보존회 컨택과 데이터 확보 협의 | 셀빅 | 즉시 착수 (1순위) |
| 키오스크 규격 확정(65인치, 뎁스 카메라 모델) | 큐랩 주도, 셀빅 맞춤 | 콘텐츠 개발 선행 |
| 첫 콘텐츠(유람기) 착수와 공용 시스템 도출 | 셀빅 | 규격 확정과 병렬 |
| LLM 방식 프로토타입 | 큐랩, 셀빅, KETI | 각자 프로토타입 후 통합 회의 |
| 데이터 폼과 형식, 취득 항목 실무 회의 | 전체 | 데이터 구축 전 |
| 해외 실증지 선정 | 큐랩, 용인대 | 용인대 2026년 7월 5일 방문 후 선정 (2027년 가을 실증 선행) |

> **발표 노트**: 데이터(보존회 컨택)와 키오스크 규격이 1순위 선행임. 이 둘이 풀려야 첫 콘텐츠가 굴러감.

### 프롬프트

```
A rich, densely filled premium editorial checklist table in a tech-diagram style, 2:1 landscape. Three columns and six rows. Each row has a check icon; the top (1순위) row is emphasized. Densely filled with meaningful content, no decorative filler; clean and legible.
Render ONLY these exact Korean texts, nothing else:
column headers "액션", "담당", "시점"
row 1 "남사당보존회 컨택과 데이터 확보" | "셀빅" | "즉시 (1순위)"
row 2 "키오스크 규격 확정" | "큐랩 주도, 셀빅 맞춤" | "콘텐츠 개발 선행"
row 3 "첫 콘텐츠 유람기 착수" | "셀빅" | "규격과 병렬"
row 4 "LLM 방식 프로토타입" | "큐랩, 셀빅, KETI" | "프로토타입 후 통합 회의"
row 5 "데이터 폼과 형식 실무 회의" | "전체" | "데이터 구축 전"
row 6 "해외 실증지 선정" | "큐랩, 용인대" | "용인대 2026.7.5 방문 후 선정"
Style: pure white (#FFFFFF) background so it drops cleanly onto a white slide; outlined table, colored header bar, ink-navy text, vermilion-red and gold accents, check icons. 2:1 landscape.
```

## 라. 관련 문서

### 슬라이드

- [[1차연도 셀빅 개발 준비자료]]: 셀빅 1차연도 개발 계획 정리(초안). 본 발표의 1차연도 실행 근거
- [[컨소시엄 회의록 - 2026-06-22]]: 성과지표, 역할 분담, 데이터와 LLM, 도제 설계 근거
- [[큐랩셀빅 사전회의 - 2026-06-22]]: 콘텐츠 통합, 서버, 음성, 디지털 휴먼, 데이터 성격 근거
- [[컨소시엄 구성 개요]]: 참여 기관과 역할 분담
- [[2. 연구개발의 목표 및 내용]]: 과제 최종 목표와 연차별 개발 내용 정본. 2차연도 근거
- [[4. 마일스톤 체계 및 수행계획]]: 연차별 마일스톤 일정 정본
- [[디바이스 사양]]: 키오스크와 미디어 케이브 하드웨어 정본

> **발표 노트**: 발표 중 근거를 묻는 질문이 나오면 이 문서들로 되짚을 수 있음.

### 프롬프트

```
A rich, densely filled premium editorial document-grid infographic in a tech-diagram style, 2:1 landscape. Seven document cards in a grid, each with a document icon and a title. A label on top. Densely filled with meaningful content, no decorative filler; clean and legible.
Render ONLY these exact Korean texts, nothing else:
top label "근거 문서"
cards "1차연도 셀빅 개발 준비자료", "컨소시엄 회의록 2026-06-22", "큐랩셀빅 사전회의 2026-06-22", "컨소시엄 구성 개요", "연구개발의 목표와 내용", "마일스톤 체계와 수행계획", "디바이스 사양"
Style: pure white (#FFFFFF) background so it drops cleanly onto a white slide; outlined cards, ink-navy text, vermilion-red and gold accents, flat document icons. 2:1 landscape.
```
