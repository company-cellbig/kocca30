function paginateSourceText(text) {
  if (typeof text !== "string") throw new TypeError("표시할 원문은 문자열이어야 함");
  if (!text.length) return [""];
  const pages = [];
  const punctuation = new Set([".", "!", "?", "。", "！", "？"]);
  let start = 0;
  for (let index = 0; index < text.length; index += 1) {
    if (!punctuation.has(text[index])) continue;
    let end = index + 1;
    while (end < text.length && /\s/.test(text[end])) end += 1;
    pages.push(text.slice(start, end));
    start = end;
    index = end - 1;
  }
  if (start < text.length) pages.push(text.slice(start));
  return pages.length ? pages : [text];
}

const DEOTBOEGI_DISPLAY = { paginateSourceText };
if (typeof module !== "undefined" && module.exports) module.exports = DEOTBOEGI_DISPLAY;
if (typeof globalThis !== "undefined") globalThis.DEOTBOEGI_DISPLAY = DEOTBOEGI_DISPLAY;
