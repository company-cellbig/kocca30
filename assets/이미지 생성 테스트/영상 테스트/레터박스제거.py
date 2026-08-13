# -*- coding: utf-8 -*-
"""Veo 클립의 위아래 검은 띠(레터박스)를 잘라 낸다.

첫 프레임에서 검은 띠의 경계를 찾아 그 범위만 남기고 다시 묶는다.
프레임을 하나하나 손대지 않으므로 떨림이 생기지 않는다.

쓰는 법
    python 레터박스제거.py 입력.mp4 출력.mp4

필요한 것: Pillow, ffmpeg (PATH에 있어야 함)
"""
import argparse
import os
import subprocess
import sys
import tempfile

from PIL import Image

INSET = 8   # 띠 경계의 어두운 번짐을 함께 잘라 내는 폭


def find_band(path):
    """첫 프레임을 뽑아 검은 띠를 뺀 세로 범위를 돌려준다."""
    work = tempfile.mkdtemp(prefix="letterbox_")
    frame = os.path.join(work, "f.png")
    subprocess.run(
        ["ffmpeg", "-v", "error", "-y", "-i", path, "-vframes", "1", frame],
        check=True)
    im = Image.open(frame).convert("RGB")
    px = im.load()
    w, h = im.size
    top = next((y for y in range(h) if sum(px[w // 2, y]) > 60), None)
    bot = next((y for y in range(h - 1, -1, -1) if sum(px[w // 2, y]) > 60), None)
    os.remove(frame)
    os.rmdir(work)
    if top is None or bot is None:
        sys.exit("그림 범위를 찾지 못했음")
    return w, h, top + INSET, bot - INSET


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("dst")
    a = ap.parse_args()

    w, h, top, bot = find_band(a.src)
    height = bot - top + 1
    if height >= h:
        print("잘라 낼 띠가 없음. 그대로 복사함")
    print(f"원본 {w}x{h} → 잘라 낸 뒤 {w}x{height} (y {top}~{bot})")

    # 인코더가 짝수 크기를 요구하므로 홀수면 한 줄 줄인다
    if height % 2:
        height -= 1

    subprocess.run(
        ["ffmpeg", "-v", "error", "-y", "-i", a.src,
         "-vf", f"crop={w}:{height}:0:{top}",
         "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "16", a.dst],
        check=True)
    print("저장:", a.dst)


if __name__ == "__main__":
    main()
