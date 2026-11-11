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
    - Generates circular/rounded vignette mask
    - Dilates thick solid white stroke border
    - Applies soft drop shadow
    """
    STICKERS_CACHE_DIR.mkdir(parents=True, exist_ok=True)
    out_sticker = STICKERS_CACHE_DIR / f"sticker_{image_path.stem}.png"
    if out_sticker.exists() and out_sticker.stat().st_size > 1000:
        return out_sticker

    raw = cv2.imread(str(image_path), cv2.IMREAD_UNCHANGED)
    if raw is None:
        return generate_procedural_sticker_fallback(image_path.stem, target_size)

    # Convert to 4-channel BGRA
    if raw.shape[2] == 3:
        b, g, r = cv2.split(raw)
        alpha = np.ones(b.shape, dtype=b.dtype) * 255
        raw = cv2.merge([b, g, r, alpha])

    # Resize keeping aspect ratio into target_size bounding box
    h, w = raw.shape[:2]
    scale = (target_size - border_px * 4) / max(h, w)
    new_w, new_h = max(1, int(w * scale)), max(1, int(h * scale))
    resized = cv2.resize(raw, (new_w, new_h), interpolation=cv2.INTER_AREA)

    # Create padded square canvas
    canvas = np.zeros((target_size, target_size, 4), dtype=np.uint8)
    y_off = (target_size - new_h) // 2
    x_off = (target_size - new_w) // 2
    canvas[y_off:y_off + new_h, x_off:x_off + new_w] = resized

    # Create mask for white die-cut border
    mask = canvas[:, :, 3]
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (border_px * 2 + 1, border_px * 2 + 1))
    dilated_mask = cv2.dilate(mask, kernel, iterations=1)
    border_region = cv2.subtract(dilated_mask, mask)

    # Stamp border
    for c in range(3):
        canvas[:, :, c] = np.where(border_region > 0, border_color_bgr[c], canvas[:, :, c])
    canvas[:, :, 3] = dilated_mask

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
