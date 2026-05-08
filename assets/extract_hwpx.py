import xml.etree.ElementTree as ET
import sys

xml_path = sys.argv[1]
out_path = sys.argv[2]

tree = ET.parse(xml_path)
root = tree.getroot()

P_TAG = '{http://www.hancom.co.kr/hwpml/2011/paragraph}p'
T_TAG = '{http://www.hancom.co.kr/hwpml/2011/paragraph}t'
TBL_TAG = '{http://www.hancom.co.kr/hwpml/2011/paragraph}tbl'
TR_TAG = '{http://www.hancom.co.kr/hwpml/2011/paragraph}tr'
TC_TAG = '{http://www.hancom.co.kr/hwpml/2011/paragraph}tc'
PIC_TAG = '{http://www.hancom.co.kr/hwpml/2011/paragraph}pic'

def get_paragraph_text(p):
    parts = []
    for t in p.iter(T_TAG):
        if t.text:
            parts.append(t.text)
    return ''.join(parts).strip()

def has_picture(p):
    for _ in p.iter(PIC_TAG):
        return True
    return False

def walk(elem, lines, depth=0):
    """Walk the XML tree depth-first, outputting paragraphs and table markers."""
    for child in elem:
        tag = child.tag
        if tag == P_TAG:
            # Skip paragraphs that contain a picture (image)
            if has_picture(child):
                lines.append('[IMAGE_PARA]')
                continue
            txt = get_paragraph_text(child)
            if txt:
                lines.append(txt)
            else:
                lines.append('')
        elif tag == TBL_TAG:
            lines.append('[TABLE_START]')
            for tr in child.iter(TR_TAG):
                row_cells = []
                for tc in tr.findall(TC_TAG):
                    cell_lines = []
                    for tp in tc.iter(P_TAG):
                        if has_picture(tp):
                            continue
                        ct = get_paragraph_text(tp)
                        if ct:
                            cell_lines.append(ct)
                    row_cells.append(' / '.join(cell_lines))
                lines.append('[ROW] ' + ' | '.join(row_cells))
            lines.append('[TABLE_END]')
        else:
            # Recurse into other containers
            walk(child, lines, depth + 1)

lines = []
walk(root, lines)

with open(out_path, 'w', encoding='utf-8') as f:
    for ln in lines:
        f.write(ln + '\n')

print(f'Total lines: {len(lines)}')
