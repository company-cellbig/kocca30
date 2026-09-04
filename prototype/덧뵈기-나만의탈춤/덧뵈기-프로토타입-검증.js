const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const sourceData = require("./덧뵈기-원전대사.js");
const stateData = require("./덧뵈기-진행상태.js");
const { paginateSourceText } = require("./덧뵈기-표시도구.js");

const root = path.resolve(__dirname, "..", "..");
const transcriptLines = fs.readFileSync(path.join(root, "02_References", "converted", "남사당놀이", "남사당놀이 - 덧뵈기.md"), "utf8").split(/\r?\n/);
const designLines = fs.readFileSync(path.join(root, "04_Projects", "시범콘텐츠", "05_덧뵈기 - 탈놀음 한바탕", "덧뵈기 탈놀음 한바탕 재설계 방향.md"), "utf8").split(/\r?\n/);
const errors = [];
const reports = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function equal(actual, expected, message) {
  assert(JSON.stringify(actual) === JSON.stringify(expected), message);
}

function expectedRows(start, end) {
  const rows = [];
  for (let sourceLine = start; sourceLine <= end; sourceLine += 1) {
    const sourceText = transcriptLines[sourceLine - 1];
    if (sourceText?.trim()) rows.push({ sourceLine, sourceText });
  }
  return rows;
}

function parseSegments(sourceText) {
  const match = sourceText.match(/^\*\*(.+?)\*\*\s*(.*)$/);
  if (!match) return [{ type: "direction", speaker: "지문", text: sourceText }];
  const [, speaker, rest] = match;
  const segments = [];
  const directionPattern = /\*\([^*]*?\)\*/g;
  let cursor = 0;
  let direction;
  while ((direction = directionPattern.exec(rest))) {
    if (direction.index > cursor) segments.push({ type: "dialogue", speaker, text: rest.slice(cursor, direction.index) });
    segments.push({ type: "direction", speaker: "지문", text: direction[0] });
    cursor = directionPattern.lastIndex;
  }
  if (cursor < rest.length) segments.push({ type: "dialogue", speaker, text: rest.slice(cursor) });
  if (!segments.length) segments.push({ type: "dialogue", speaker, text: "" });
  return segments;
}

function parseSaennimEventRanges() {
  const headingIndex = designLines.indexOf("## 5.2 원전 원자 사건 추출");
  assert(headingIndex >= 0, "saennim: 원전 원자 사건 추출 헤딩을 찾지 못함");
  if (headingIndex < 0) return [];
  const rows = [];
  for (let index = headingIndex + 1; index < designLines.length; index += 1) {
    const line = designLines[index];
    if (!line.startsWith("|")) {
      if (rows.length) break;
      continue;
    }
    const cells = line.slice(1, -1).split("|").map((cell) => cell.trim());
    if (!/^S\d+$/.test(cells[0])) continue;
    const range = cells[1].match(/^(\d+)~(\d+)행$/);
    assert(Boolean(range), `saennim: ${cells[0]} 원문 행 범위를 읽을 수 없음`);
    if (range) rows.push([cells[0], Number(range[1]), Number(range[2])]);
  }
  assert(rows.length > 0, "saennim: 원전 원자 사건 범위를 찾지 못함");
  return rows;
}

const eventRanges = {
  omtal: [["A1",420,424],["A2",424,430],["A3",428,430],["A4",432,434],["A5",434,440],["A6",442,444],["A7",446,452],["A8",454,456],["A9",458,460],["A10",462,464],["A11",464,466],["A12",466,466],["A13",466,466]],
  saennim: parseSaennimEventRanges(),
  meokjung: [["M1",630,630],["M2",630,630],["M3",632,634],["M4",636,650],["M5",652,656],["M6",658,666],["M7",668,670],["M8",672,680],["M9",682,686],["M10",686,700],["M11",702,704]],
};

const stateRanges = {
  omtal: [["omtal-03",420,426],["omtal-04",428,428],["omtal-05",430,430],["omtal-07",432,456],["omtal-10",458,458],["omtal-11",460,460],["omtal-14",462,464],["omtal-15",466,466]],
  meokjung: [["meokjung-03",630,630],["meokjung-04",630,630],["meokjung-07",632,634],["meokjung-10",636,644],["meokjung-11",646,650],["meokjung-12",652,654],["meokjung-13",656,656],["meokjung-14",658,666],["meokjung-15",668,670],["meokjung-16",668,670],["meokjung-17",672,672],["meokjung-18",674,680],["meokjung-19",682,686],["meokjung-20",686,700],["meokjung-21",702,704]],
};

function idsAt(ranges, sourceLine) {
  return ranges.filter(([, start, end]) => sourceLine >= start && sourceLine <= end).map(([id]) => id);
}

for (const [sceneId, scene] of Object.entries(sourceData.scenes)) {
  const expected = expectedRows(...scene.sourceRange);
  const stateMappingIsActive = stateData.scenes[sceneId]?.active !== false;
  equal(scene.rows.map(({ sourceLine, sourceText }) => ({ sourceLine, sourceText })), expected, `${sceneId}: 원전 행 번호, 순서 또는 문자열이 다름`);
  assert(new Set(scene.rows.map((row) => row.sourceLine)).size === scene.rows.length, `${sceneId}: 원전 행이 중복됨`);
  for (const row of scene.rows) {
    assert(row.displayText === row.sourceText, `${sceneId}: ${row.sourceLine}행 표시값이 원문과 다름`);
    equal(row.segments, parseSegments(row.sourceText), `${sceneId}: ${row.sourceLine}행 segment 종류, 화자, 순서 또는 문자열이 다름`);
    equal(row.eventIds, idsAt(eventRanges[sceneId], row.sourceLine), `${sceneId}: ${row.sourceLine}행 eventIds 대응이 다름`);
    if (stateMappingIsActive) equal(row.stateIds, idsAt(stateRanges[sceneId], row.sourceLine), `${sceneId}: ${row.sourceLine}행 stateIds 대응이 다름`);
    assert(row.eventIds.length > 0 && (!stateMappingIsActive || row.stateIds.length > 0), `${sceneId}: ${row.sourceLine}행 사건 또는 활성 상태 대응이 비어 있음`);
    const pages = paginateSourceText(row.displayText);
    assert(pages.length > 0 && pages.every((page) => page.length > 0), `${sceneId}: ${row.sourceLine}행 문장 페이지가 비었음`);
    assert(pages.join("") === row.displayText, `${sceneId}: ${row.sourceLine}행 문장 페이지 재결합이 원문과 다름`);
  }
  reports.push(stateMappingIsActive
    ? `${scene.title}: ${scene.rows.length}/${expected.length}행, 원문/segment/사건/상태/문장 페이지 일치`
    : `${scene.title}: ${scene.rows.length}/${expected.length}행, 원문/segment/사건/문장 페이지 일치. 상태 대응은 현 정본 미반영으로 검사하지 않음`);
}

const tableHeadings = {
  meokjung: "## 6.5 먹중잡이 상세 진행",
};

const fieldNames = {
  omtal: ["name", "cast", "bottomText", "action", "input", "outcomes"],
  saennim: ["name", "basis", "cast", "bottomText", "action", "input", "outcomes"],
  meokjung: ["name", "basis", "cast", "bottomText", "action", "input", "outcomes"],
};

function parseDesignTable(sceneId) {
  const headingIndex = designLines.indexOf(tableHeadings[sceneId]);
  assert(headingIndex >= 0, `${sceneId}: 상세 진행 헤딩을 찾지 못함`);
  if (headingIndex < 0) return [];
  const headerIndex = designLines.findIndex((line, index) => index > headingIndex && line.startsWith("| 순서 |"));
  assert(headerIndex > headingIndex, `${sceneId}: 상세 진행 표 머리말을 찾지 못함`);
  if (headerIndex <= headingIndex) return [];
  const rows = [];
  for (let index = headerIndex + 2; index < designLines.length && designLines[index].startsWith("|"); index += 1) {
    const cells = designLines[index].slice(1, -1).split("|").map((cell) => cell.trim());
    const row = {};
    fieldNames[sceneId].forEach((field, fieldIndex) => { row[field] = cells[fieldIndex] || ""; });
    rows.push(row);
  }
  assert(rows.length > 0, `${sceneId}: 상세 진행 표 본문을 찾지 못함`);
  return rows;
}

const expectedGraphs = {
  omtal: [["omtal-02"],["omtal-03","recovery-end"],["omtal-04"],["omtal-05","omtal-06"],["omtal-07"],["omtal-05","omtal-07"],["omtal-07","omtal-08","omtal-09"],["omtal-10"],["omtal-07"],["omtal-11","recovery-end"],["omtal-12","omtal-13"],["omtal-14"],["omtal-12","omtal-14"],["omtal-15","omtal-16"],["omtal-16"],["scene-end"]],
  meokjung: [["meokjung-02"],["meokjung-03","recovery-screen"],["meokjung-04"],["meokjung-05"],["meokjung-06","meokjung-07"],["meokjung-07"],["meokjung-08"],["meokjung-09","meokjung-10"],["meokjung-10"],["meokjung-11"],["meokjung-12"],["meokjung-13"],["meokjung-14"],["meokjung-15"],["meokjung-16"],["meokjung-17"],["meokjung-18"],["meokjung-19"],["meokjung-20"],["meokjung-21"],["scene-end"]],
};

const expectedStateEvents = {
  omtal: [[],[],["A1","A2"],["A2","A3"],["A3"],[],["A4","A5","A6","A7","A8"],[],[],["A9"],["A9"],[],[],["A10","A11"],["A11","A12","A13"],[]],
  meokjung: [[],[],["M1"],["M2"],["M2"],["M2"],["M3"],["M3"],["M3"],["M4"],["M4"],["M5"],["M5"],["M6"],["M7"],["M7","M8"],["M8"],["M8"],["M9"],["M9","M10"],["M10","M11"]],
};

function canReachTerminal(startId, stateMap, pseudoTransitions) {
  const visited = new Set();
  const queue = [startId];
  while (queue.length) {
    const id = queue.shift();
    if (id === "scene-end") return true;
    if (visited.has(id)) continue;
    visited.add(id);
    const next = stateMap.get(id)?.next || pseudoTransitions[id] || [];
    next.forEach((target) => queue.push(target));
  }
  return false;
}

reports.push("옴탈잡이: 정본에 상세 진행표가 없어 표 전 열 대조를 실행하지 않음");
reports.push("샌님잡이: 현 정본 미반영으로 상태 전이와 상세 진행표 대조를 실행하지 않음");

for (const sceneId of Object.keys(tableHeadings)) {
  const expectedRowsFromDesign = parseDesignTable(sceneId);
  const states = stateData.scenes[sceneId].states;
  assert(states.length === expectedRowsFromDesign.length, `${sceneId}: 상세 진행표와 상태 수가 다름`);
  const ids = states.map((state) => state.id);
  assert(new Set(ids).size === ids.length, `${sceneId}: 상태 ID가 중복됨`);
  states.forEach((state, index) => {
    assert(state.id === `${sceneId}-${String(index + 1).padStart(2, "0")}`, `${sceneId}: ${index + 1}번째 상태 ID가 순서와 다름`);
    assert(state.order === index + 1, `${sceneId}: ${state.id} order가 연속 순서와 다름`);
    for (const field of fieldNames[sceneId]) assert(state[field] === expectedRowsFromDesign[index]?.[field], `${sceneId}: ${state.id} ${field}가 상세 진행표와 다름`);
    equal(state.eventIds, expectedStateEvents[sceneId][index], `${sceneId}: ${state.id} eventIds가 다름`);
    equal(state.next, expectedGraphs[sceneId][index], `${sceneId}: ${state.id} next가 승인된 전이와 다름`);
    assert(state.next.length > 0, `${sceneId}: ${state.id}에 다음 상태가 없음`);
  });

  const stateMap = new Map(states.map((state) => [state.id, state]));
  const allowedTargets = new Set(["scene-end", "recovery-screen", "recovery-end"]);
  for (const state of states) for (const target of state.next) assert(stateMap.has(target) || allowedTargets.has(target), `${sceneId}: ${state.id}의 다음 상태 ${target}가 없음`);

  const reachable = new Set();
  const queue = [states[0]?.id];
  while (queue.length) {
    const id = queue.shift();
    if (!stateMap.has(id) || reachable.has(id)) continue;
    reachable.add(id);
    stateMap.get(id).next.forEach((target) => queue.push(target));
  }
  assert(reachable.size === states.length, `${sceneId}: 시작 상태에서 도달할 수 없는 상태가 있음`);

  const pseudoTransitions = {
    "recovery-screen": [`${sceneId}-02`, "scene-end"],
    "recovery-end": ["scene-end"],
  };
  for (const state of states) assert(canReachTerminal(state.id, stateMap, pseudoTransitions), `${sceneId}: ${state.id}에서 종료 또는 복구 종료에 도달할 수 없음`);

  for (const state of states) {
    const rowsForState = sourceData.scenes[sceneId].rows.filter((row) => row.stateIds.includes(state.id));
    if (!rowsForState.length || !state.eventIds.length) continue;
    const hasEventOverlap = rowsForState.some((row) => row.eventIds.some((eventId) => state.eventIds.includes(eventId)));
    assert(hasEventOverlap, `${sceneId}: ${state.id}의 원전 행과 상태 eventIds가 하나도 겹치지 않음`);
  }
  reports.push(`${sceneId}: 상세표 전 열/ID/order/eventIds/next/도달성/종료 가능성 일치`);
}

const schedule = stateData.scenes.omtal.sourceSchedule;
const expectedScheduledLines = expectedRows(...schedule.range).map((row) => row.sourceLine);
equal(schedule.blocks.flat(), expectedScheduledLines, "omtal: 재담 블록이 432~456행을 전수 순서대로 덮지 않음");
assert(schedule.blocks.length === schedule.newApproachCount, "omtal: 원전 블록 수와 새로운 접근 수가 다름");
assert(schedule.retryConsumesNextBlock === false, "omtal: 실패 재시도가 다음 원전 블록을 소비함");
reports.push(`옴탈잡이: 원전 블록 ${schedule.blocks.length}개와 새로운 접근 ${schedule.newApproachCount}회 대응`);

function displayedDialogueLines(sceneId, statePath) {
  const seen = new Set();
  const displayed = [];
  for (const stateId of statePath) {
    for (const row of sourceData.scenes[sceneId].rows) {
      if (seen.has(row.sourceLine) || !row.stateIds.includes(stateId)) continue;
      seen.add(row.sourceLine);
      if (row.segments.some((segment) => segment.type === "dialogue")) displayed.push(row.sourceLine);
    }
  }
  return displayed;
}

for (const [sceneId, paths] of Object.entries({
  meokjung: [
    stateData.scenes.meokjung.states.map((state) => state.id),
    stateData.scenes.meokjung.states.map((state) => state.id).filter((id) => !["meokjung-06", "meokjung-09"].includes(id)),
  ],
})) {
  assert(!JSON.stringify(stateData.scenes[sceneId].states).includes("잽이"), `${sceneId}: 각색 상태에 잽이 화자나 독립 배역이 남아 있음`);
  const expectedDialogueLines = sourceData.scenes[sceneId].rows.filter((row) => row.segments.some((segment) => segment.type === "dialogue")).map((row) => row.sourceLine);
  paths.forEach((statePath, index) => equal(displayedDialogueLines(sceneId, statePath), expectedDialogueLines, `${sceneId}: 실행 경로 ${index + 1}에서 원전 대사 행이 누락되거나 순서가 다름`));
  reports.push(`${sceneId}: 정상/무입력 경로에서 원전 대사 ${expectedDialogueLines.length}개 행 전수 표시 가능`);
  reports.push(`${sceneId}: 각색 상태의 잽이 화자와 독립 배역 0건`);
}

const prototypePath = path.join(__dirname, "덧뵈기-나만의탈춤-프로토타입.html");
const prototypeHtml = fs.readFileSync(prototypePath, "utf8");
const inlineScript = prototypeHtml.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert(stateData.scenes.saennim.active === false, "진행 상태: 현 정본 미반영 샌님잡이가 비활성 상태가 아님");
assert(Boolean(inlineScript), "프로토타입 HTML: 인라인 스크립트를 찾을 수 없음");
assert(prototypeHtml.includes("row.segments.filter(segment=>segment.type==='dialogue')"), "프로토타입 HTML: 원전 지문이 화면 큐에서 제외되지 않음");
assert(prototypeHtml.includes("function input(prompt,options){return {kind:'설계 대사',speaker:'장쇠'"), "프로토타입 HTML: 행동 안내가 장쇠의 설계 대사로 처리되지 않음");
assert(!prototypeHtml.includes("kind:'원전 지문'"), "프로토타입 HTML: 원전 지문 표시 항목이 남아 있음");
assert(/<button[^>]*data-start="saennim"[^>]*disabled/.test(prototypeHtml), "프로토타입 HTML: 현 정본 미반영 샌님잡이 선택이 비활성화되지 않음");
assert(prototypeHtml.includes('data-start="meokjung"'), "프로토타입 HTML: 먹중잡이 시작 경로가 없음");
assert(prototypeHtml.includes("ctx.earlyCounts[id]>=2"), "프로토타입 HTML: 먹중잡이 이른 지목 반복의 종료 상한이 없음");
assert(!prototypeHtml.includes("$('kind').textContent=item.kind;"), "프로토타입 HTML: 내부 대사 분류명이 관람객 화면에 노출됨");
assert(prototypeHtml.includes("speaker:segment.speaker==='잽이'?'장쇠':segment.speaker"), "프로토타입 HTML: 잽이 원전 대사의 화면 화자가 장쇠로 전환되지 않음");
assert(prototypeHtml.includes("sourceSpeaker:segment.speaker"), "프로토타입 HTML: 화면 화자 전환 뒤 원전 화자 추적값이 보존되지 않음");
const runtimeCastList = prototypeHtml.match(/const known=\[([^\]]*)\]/)?.[1] || "";
assert(!runtimeCastList.includes("'잽이'"), "프로토타입 HTML: 화면 배역 목록에 잽이가 남아 있음");
if (inlineScript) {
  try {
    new vm.Script(inlineScript, { filename: prototypePath });
    reports.push("프로토타입 HTML: 인라인 스크립트 구문 통과");
  } catch (error) {
    errors.push(`프로토타입 HTML: 인라인 스크립트 구문 오류 - ${error.message}`);
  }
}
reports.push("프로토타입 HTML: 원전 지문 비표시와 장쇠 행동 안내 규칙 일치");

if (errors.length) {
  console.error(`검증 실패 ${errors.length}건`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("활성 검사 통과");
reports.forEach((report) => console.log(`- ${report}`));
