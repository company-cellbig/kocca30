from pathlib import Path

import fitz
from PIL import Image, ImageDraw


PDF = next(Path(__file__).parent.glob("*.pdf"))
OUT = Path(__file__).parent / "contact_sheets"
OUT.mkdir(exist_ok=True)

doc = fitz.open(PDF)
DETAIL = Path(__file__).parent / "detail_pages"
DETAIL.mkdir(exist_ok=True)
for page_number in range(41, 86):
    page = doc[page_number - 1]
    pix = page.get_pixmap(matrix=fitz.Matrix(2.0, 2.0), alpha=False)
    pix.save(DETAIL / f"page_{page_number:03d}.png")

thumbs = []
for index, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(0.35, 0.35), alpha=False)
    image = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    canvas = Image.new("RGB", (image.width, image.height + 32), "white")
    canvas.paste(image, (0, 32))
    ImageDraw.Draw(canvas).text((8, 8), f"PDF {index + 1}", fill="black")
    thumbs.append(canvas)

cols = 4
rows = 4
for start in range(0, len(thumbs), cols * rows):
    batch = thumbs[start : start + cols * rows]
    cell_w = max(img.width for img in batch)
    cell_h = max(img.height for img in batch)
    sheet = Image.new("RGB", (cols * cell_w, rows * cell_h), "#dddddd")
    for pos, image in enumerate(batch):
        x = (pos % cols) * cell_w
        y = (pos // cols) * cell_h
        sheet.paste(image, (x, y))
    end = start + len(batch)
    sheet.save(OUT / f"pages_{start + 1:03d}_{end:03d}.jpg", quality=88)
