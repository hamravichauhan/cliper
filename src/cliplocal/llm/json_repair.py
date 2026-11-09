import json
import re
from typing import Any, Optional

def extract_and_repair_json(raw_text: str) -> Optional[Any]:
    """
    Extract and parse JSON from LLM response text, repairing common LLM formatting issues
    such as markdown code blocks, preamble text, trailing commas, and unclosed brackets.
    """
    if not raw_text or not raw_text.strip():
        return None

    text = raw_text.strip()

    # 1. Strip markdown code fences if present
    fence_match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", text)
    if fence_match:
        text = fence_match.group(1).strip()
    else:
        # Find first [ or { and last ] or }
        first_bracket = min(
            (pos for pos in (text.find("["), text.find("{")) if pos != -1),
            default=-1
        )
        last_bracket = max(text.rfind("]"), text.rfind("}"))
        if first_bracket != -1 and last_bracket != -1 and last_bracket > first_bracket:
            text = text[first_bracket:last_bracket + 1].strip()

    # Direct parse attempt
    try:
        return json.loads(text)
    except Exception:
        pass

    # 2. Repair trailing commas: e.g. ", \n }" or ", \n ]"
    cleaned = re.sub(r",\s*([\]}])", r"\1", text)
    try:
        return json.loads(cleaned)
    except Exception:
        pass

    # 3. Balance unclosed brackets/braces
    open_braces = cleaned.count("{") - cleaned.count("}")
    open_brackets = cleaned.count("[") - cleaned.count("]")

    repaired = cleaned
    if open_braces > 0:
        repaired += "}" * open_braces
    if open_brackets > 0:
        repaired += "]" * open_brackets

    try:
        return json.loads(repaired)
    except Exception:
        return None
