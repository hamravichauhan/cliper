from __future__ import annotations
import re
import urllib.request
import urllib.parse
import json
from pathlib import Path
from typing import List, Optional, Tuple, Dict, Any
import cv2
import numpy as np

STICKERS_CACHE_DIR = Path(".cache/stickers")

COMMON_TOPIC_ENTITIES: Dict[str, str] = {
    "money": "money cash banknotes currency",
    "dollar": "us dollar cash",
    "profit": "business growth chart",
    "loss": "financial chart down",
    "crypto": "bitcoin gold coin",
    "bitcoin": "bitcoin coin",
    "startup": "modern startup office",
    "founder": "entrepreneur speaking",
    "ai": "artificial intelligence neural network",
    "code": "programming code screen",
    "hospital": "hospital emergency room",
    "marriage": "wedding rings love",
    "divorce": "broken relationship",
    "jail": "prison bars",
    "car": "luxury sports car",
    "apple": "apple logo technology",
    "steve jobs": "steve jobs apple",
    "elon musk": "elon musk tesla",
    "india": "india flag new delhi",
    "rbi": "reserve bank of india building"
}

def extract_semantic_entities(text: str) -> List[str]:
    """Extract physical visual targets from spoken text."""
    lower_text = text.lower()
    entities: List[str] = []

    for key, query in COMMON_TOPIC_ENTITIES.items():
        if key in lower_text:
            entities.append(query)
            if len(entities) >= 2:
                break

    if not entities:
        # Fallback to general concept from first 3 non-stop words
        words = [w for w in re.findall(r"\b[a-zA-Z]{4,}\b", lower_text) if w not in {"that", "with", "this", "from", "they", "have", "would", "could", "about", "what", "when"}]
        if words:
            entities.append(" ".join(words[:2]))

    return entities or ["growth concept"]

def fetch_wikimedia_commons_image(query: str, timeout: float = 3.0) -> Optional[Path]:
    """
    Query Wikimedia Commons for public domain / Creative Commons images.
    Returns path to downloaded image or None if offline/failed.
    """
    STICKERS_CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cache_key = re.sub(r"[^a-zA-Z0-9]", "_", query.lower())[:30]
    cached_file = STICKERS_CACHE_DIR / f"raw_{cache_key}.jpg"
    if cached_file.exists() and cached_file.stat().st_size > 1000:
        return cached_file

    try:
        encoded_query = urllib.parse.quote(f"{query} filetype:bitmap")
        url = (
            f"https://commons.wikimedia.org/w/api.php?action=query"
            f"&generator=search&gsrsearch={encoded_query}&gsrlimit=3"
            f"&prop=imageinfo&iiprop=url|size&format=json"
        )
        req = urllib.request.Request(url, headers={"User-Agent": "ClipLocalBot/1.0 (offline-clip-studio)"})
        with urllib.request.urlopen(req, timeout=timeout) as response:
            if response.status == 200:
                data = json.loads(response.read().decode("utf-8"))
                pages = data.get("query", {}).get("pages", {})
                for page_id, info in pages.items():
                    img_info = info.get("imageinfo", [])
                    if img_info and "url" in img_info[0]:
                        img_url = img_info[0]["url"]
                        # Filter bitmap formats
                        if img_url.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
                            img_req = urllib.request.Request(img_url, headers={"User-Agent": "ClipLocalBot/1.0"})
                            with urllib.request.urlopen(img_req, timeout=timeout) as img_resp:
                                cached_file.write_bytes(img_resp.read())
                                return cached_file
    except Exception:
        pass

    return None

def generate_procedural_sticker_fallback(query: str, target_size: int = 420) -> Path:
    """
    Generate a high-contrast graphic card if offline or query returned no web image.
    Guarantees the engine never crashes or stalls without internet.
    """
    STICKERS_CACHE_DIR.mkdir(parents=True, exist_ok=True)
    clean_q = query.upper()[:16]
    out_path = STICKERS_CACHE_DIR / f"proc_{re.sub(r'[^a-zA-Z0-9]', '_', query.lower())}.png"
    if out_path.exists():
        return out_path

    # Create a 420x420 rounded badge with dark background and vibrant gold border
    img = np.zeros((target_size, target_size, 4), dtype=np.uint8)
    cv2.circle(img, (target_size // 2, target_size // 2), target_size // 2 - 10, (25, 25, 30, 255), -1)
    # White border
    cv2.circle(img, (target_size // 2, target_size // 2), target_size // 2 - 10, (255, 255, 255, 255), 6)
    # Text
    cv2.putText(img, clean_q, (target_size // 2 - len(clean_q) * 9, target_size // 2 + 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 215, 0, 255), 2, cv2.LINE_AA)

    cv2.imwrite(str(out_path), img)
    return out_path

def convert_to_die_cut_sticker(
    image_path: Path,
    border_px: int = 4,
    border_color_bgr: Tuple[int, int, int] = (255, 255, 255),
    target_size: int = 420
) -> Path:
    """
    Transform raw image into a 'Raj Shamani / Ali Abdaal' style Die-Cut Sticker:
    - Scales subject
    - Isolates foreground silhouette (or creates smooth rounded die-cut mask)
    - Dilates thick solid white stroke border
    - Applies soft drop shadow behind border
    """
    STICKERS_CACHE_DIR.mkdir(parents=True, exist_ok=True)
    out_sticker = STICKERS_CACHE_DIR / f"sticker_{image_path.stem}.png"
    if out_sticker.exists() and out_sticker.stat().st_size > 1000:
        return out_sticker

    raw = cv2.imread(str(image_path), cv2.IMREAD_UNCHANGED)
    if raw is None:
        return generate_procedural_sticker_fallback(image_path.stem, target_size)

    # Convert to 4-channel BGRA if RGB
    if len(raw.shape) == 2:
        raw = cv2.cvtColor(raw, cv2.COLOR_GRAY2BGRA)
    elif raw.shape[2] == 3:
        b, g, r = cv2.split(raw)
        # Check corners to detect uniform white/light background
        corner_pixels = np.array([raw[0, 0], raw[0, -1], raw[-1, 0], raw[-1, -1]])
        corner_mean = np.mean(corner_pixels)
        if corner_mean > 225:
            # Uniform white background: mask out pure white/light grey
            gray = cv2.cvtColor(raw, cv2.COLOR_BGR2GRAY)
            _, inv_mask = cv2.threshold(gray, 235, 255, cv2.THRESH_BINARY_INV)
            alpha = inv_mask
        elif corner_mean < 30:
            # Uniform black background: mask out pure black
            gray = cv2.cvtColor(raw, cv2.COLOR_BGR2GRAY)
            _, alpha = cv2.threshold(gray, 25, 255, cv2.THRESH_BINARY)
        else:
            # Complex photo: create smooth rounded-corner die-cut badge
            h_r, w_r = raw.shape[:2]
            alpha = np.zeros((h_r, w_r), dtype=np.uint8)
            pad = int(min(h_r, w_r) * 0.04)
            rad = int(min(h_r, w_r) * 0.12)
            cv2.rectangle(alpha, (pad + rad, pad), (w_r - pad - rad, h_r - pad), 255, -1)
            cv2.rectangle(alpha, (pad, pad + rad), (w_r - pad, h_r - pad - rad), 255, -1)
            cv2.circle(alpha, (pad + rad, pad + rad), rad, 255, -1)
            cv2.circle(alpha, (w_r - pad - rad, pad + rad), rad, 255, -1)
            cv2.circle(alpha, (pad + rad, h_r - pad - rad), rad, 255, -1)
            cv2.circle(alpha, (w_r - pad - rad, h_r - pad - rad), rad, 255, -1)
        raw = cv2.merge([b, g, r, alpha])

    # Resize keeping aspect ratio into target_size bounding box with padding for shadow
    h, w = raw.shape[:2]
    max_dim = target_size - border_px * 6 - 20
    scale = max_dim / max(h, w)
    new_w, new_h = max(1, int(w * scale)), max(1, int(h * scale))
    resized = cv2.resize(raw, (new_w, new_h), interpolation=cv2.INTER_AREA)

    # Base canvas for compositing (with space for offset drop shadow)
    canvas = np.zeros((target_size, target_size, 4), dtype=np.uint8)
    y_off = (target_size - new_h) // 2
    x_off = (target_size - new_w) // 2

    # Subject mask
    subj_mask = np.zeros((target_size, target_size), dtype=np.uint8)
    subj_mask[y_off:y_off + new_h, x_off:x_off + new_w] = resized[:, :, 3]

    # Dilate for thick die-cut white border
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (border_px * 2 + 1, border_px * 2 + 1))
    border_mask = cv2.dilate(subj_mask, kernel, iterations=1)

    # 1. Soft Drop Shadow (offset +6px x, +8px y, Gaussian blurred)
    shadow_canvas = np.zeros((target_size, target_size), dtype=np.uint8)
    dx, dy = 6, 8
    s_x1, s_y1 = max(0, dx), max(0, dy)
    s_x2, s_y2 = min(target_size, target_size + dx), min(target_size, target_size + dy)
    m_x1, m_y1 = max(0, -dx), max(0, -dy)
    m_x2, m_y2 = min(target_size, target_size - dx), min(target_size, target_size - dy)
    shadow_canvas[s_y1:s_y2, s_x1:s_x2] = border_mask[m_y1:m_y2, m_x1:m_x2]
    shadow_blurred = cv2.GaussianBlur(shadow_canvas, (17, 17), 5.0)
    shadow_alpha = (shadow_blurred.astype(np.float32) * 0.42).astype(np.uint8)

    # Paint shadow on canvas
    canvas[:, :, 3] = shadow_alpha

    # 2. Paint solid die-cut white border
    for c in range(3):
        canvas[:, :, c] = np.where(border_mask > 0, border_color_bgr[c], canvas[:, :, c])
    canvas[:, :, 3] = np.where(border_mask > 0, 255, canvas[:, :, 3])

    # 3. Paint original subject over border
    for c in range(3):
        canvas[y_off:y_off + new_h, x_off:x_off + new_w, c] = np.where(
            resized[:, :, 3] > 10,
            resized[:, :, c],
            canvas[y_off:y_off + new_h, x_off:x_off + new_w, c]
        )
    canvas[y_off:y_off + new_h, x_off:x_off + new_w, 3] = np.where(
        resized[:, :, 3] > 10,
        resized[:, :, 3],
        canvas[y_off:y_off + new_h, x_off:x_off + new_w, 3]
    )

    cv2.imwrite(str(out_sticker), canvas)
    return out_sticker

def get_sticker_for_transcript_snippet(snippet_text: str) -> Path:
    """
    All-in-one helper: takes transcript text, queries Wikimedia Commons or local fallback,
    and returns a ready-to-composite Die-Cut Sticker PNG.
    """
    entities = extract_semantic_entities(snippet_text)
    primary_query = entities[0] if entities else "insight"

    raw_img = fetch_wikimedia_commons_image(primary_query)
    if not raw_img:
        return generate_procedural_sticker_fallback(primary_query)

    return convert_to_die_cut_sticker(raw_img)
