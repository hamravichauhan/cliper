from __future__ import annotations
import re
from typing import List, Optional, Tuple, Set
from pydantic import BaseModel, Field

from src.cliplocal.core.models import Sentence, Word, CandidateClip, ScoreBreakdown, ReframeMode, CaptionStyleName
from src.cliplocal.config.settings import config

# Interrogative starter words (5W1H + Modals)
INTERROGATIVE_STARTERS: Set[str] = {
    "what", "why", "how", "who", "where", "when", "which", "whom", "whose"
}

AUXILIARY_INVERSIONS: Set[str] = {
    "do", "did", "does", "have", "has", "had", "can", "could",
    "would", "should", "will", "is", "are", "was", "were", "if"
}

IMPERATIVE_QUESTION_PROMPTS: List[str] = [
    "tell me", "explain to me", "explain why", "walk me through",
    "describe the", "talk about", "i want to ask", "my question is",
    "give me an example", "what would you say"
]

# Phrases that are conversational filler rather than real interview questions
BACKCHANNEL_OR_RHETORICAL: Set[str] = {
    "right", "yeah", "yes", "really", "you know", "you think", "why not",
    "you know what i mean", "makes sense", "is that right", "okay", "sure"
}

# Conclusion cues that signal a natural out-point
CONCLUSIVE_MIC_DROPS: List[str] = [
    "that is why", "that's why", "that's the whole point", "that is the point",
    "that changed everything", "and that's the lesson", "at the end of the day",
    "that's the real secret", "never look back", "the rest is history",
    "that's how you win", "that was the turning point", "period", "bottom line"
]

# Host reaction affirmations that make perfect closing punchlines
HOST_REACTIONS: Set[str] = {
    "exactly", "damn", "wow", "100%", "that's wild", "that is wild",
    "that's crazy", "that is crazy", "boom", "totally", "right on",
    "insane", "unbelievable", "facts", "preach", "that's so true"
}

class PodcastQAPair(BaseModel):
    qa_id: int
    question_text: str
    question_start: float
    question_end: float
    answer_text: str
    answer_start: float
    answer_end: float
    total_start: float
    total_end: float
    duration: float
    asker: str = "Host"
    answerer: str = "Guest"
    viral_score: float = 0.0
    viral_archetype: str = "General Insight"
    recommended_platform: str = "YouTube Shorts"
    hook_headline: str = ""
    social_caption: str = ""
    hashtags: List[str] = Field(default_factory=list)
    sentences: List[Sentence] = Field(default_factory=list)
    words: List[Word] = Field(default_factory=list)

    def to_candidate_clip(self, index: int) -> CandidateClip:
        """Convert PodcastQAPair into a fully compatible CandidateClip."""
        full_text = f"{self.question_text} {self.answer_text}".strip()
        score = ScoreBreakdown(
            total_score=self.viral_score,
            hook_score=min(100.0, self.viral_score * 1.05),
            acoustic_score=75.0,
            pace_score=80.0,
            payoff_score=85.0,
            hook_type=self.viral_archetype,
            hook_reason=f"Q&A Unit: {self.question_text[:60]}..."
        )
        return CandidateClip(
            clip_id=f"podcast_qa_{self.qa_id:03d}",
            index=index,
            start=self.total_start,
            end=self.total_end,
            duration=self.duration,
            text=full_text,
            words=self.words,
            sentences=self.sentences,
            score=score,
            title=self.hook_headline or self.question_text[:50],
            caption=self.social_caption or self.question_text,
            hashtags=self.hashtags or ["#podcast", "#interview", "#shorts"],
            reframe_mode=ReframeMode.AUTO,
            caption_style=CaptionStyleName.HORMOZI,
            top_banner=False,
            multicam=True
        )

def clean_token(token: str) -> str:
    """Strip punctuation and lowercase."""
    return re.sub(r"[^a-zA-Z0-9]", "", token.lower())

def is_interrogative_sentence(sentence: Sentence) -> bool:
    """
    Determine if a sentence functions as a genuine interview question.
    Filters out backchannel chatter and rhetorical rhetorical tags.
    """
    raw = sentence.text.strip()
    clean = clean_token(raw)
    words = [clean_token(w.word) for w in sentence.words if clean_token(w.word)]

    if len(words) < 3:
        return False

    # Check for backchannel chatter like "Right?", "Really?", "Yeah?"
    if " ".join(words) in BACKCHANNEL_OR_RHETORICAL:
        return False

    # 1. Ends with question mark and has substance
    if raw.endswith("?") and len(words) >= 4:
        return True

    # 2. Starts with 5W1H interrogative
    if words and words[0] in INTERROGATIVE_STARTERS:
        return True

    # 3. Starts with auxiliary inversion + pronoun (e.g. "Do you think", "Can you tell")
    if len(words) >= 3 and words[0] in AUXILIARY_INVERSIONS:
        if words[1] in {"you", "we", "they", "he", "she", "it", "one", "people"}:
            return True

    # 4. Imperative prompt ("Tell me about...", "Walk me through...")
    lower_raw = raw.lower()
    for prompt in IMPERATIVE_QUESTION_PROMPTS:
        if lower_raw.startswith(prompt):
            return True

    return False

def strip_host_fluff(question_sent: Sentence) -> Tuple[str, float, float]:
    """
    Strips rambling preamble from a host's question to keep the hook punchy (under 6s).
    Returns (cleaned_text, start_time, end_time).
    """
    raw = question_sent.text.strip()
    words = question_sent.words

    # If already concise (under 12 words), keep intact
    if len(words) <= 12:
        return raw, question_sent.start, question_sent.end

    lower_raw = raw.lower()

    # Look for the interrogative pivot within the sentence
    for prompt in IMPERATIVE_QUESTION_PROMPTS:
        idx = lower_raw.find(prompt)
        if idx > 0:
            # Find closest word boundary
            for w in words:
                if w.word.lower().startswith(prompt.split()[0]) and w.start > question_sent.start:
                    slice_words = [item for item in words if item.start >= w.start]
                    slice_text = " ".join(item.word.strip() for item in slice_words)
                    return slice_text, slice_words[0].start, slice_words[-1].end

    # Look for 5W1H pivot in second half of preamble
    for i, w in enumerate(words):
        cleaned = clean_token(w.word)
        if cleaned in INTERROGATIVE_STARTERS and i >= 3:
            slice_words = words[i:]
            if len(slice_words) >= 4:
                slice_text = " ".join(item.word.strip() for item in slice_words)
                return slice_text, slice_words[0].start, slice_words[-1].end

    return raw, question_sent.start, question_sent.end

def is_conclusive_payoff(sentence: Sentence) -> bool:
    """Check if sentence contains definitive mic-drop payoff phrases."""
    lower_text = sentence.text.lower()
    for phrase in CONCLUSIVE_MIC_DROPS:
        if phrase in lower_text:
            return True
    return False

def is_host_reaction_interjection(sentence: Sentence) -> bool:
    """Check if sentence is a short host reaction interjection (e.g. 'Boom.', 'Exactly.')."""
    words = [clean_token(w.word) for w in sentence.words if clean_token(w.word)]
    if 1 <= len(words) <= 3:
        joined = " ".join(words)
        return joined in HOST_REACTIONS
    return False

def extract_podcast_qa_pairs(
    sentences: List[Sentence],
    min_duration: float = 20.0,
    max_duration: float = 65.0,
    target_duration: float = 45.0
) -> List[PodcastQAPair]:
    """
    Scan transcript sentences for question & answer conversational units.
    Identifies question anchors, trims wind-ups, attaches guest responses,
    and cuts cleanly on concluding mic-drops or host reactions.
    """
    if not sentences:
        return []

    qa_pairs: List[PodcastQAPair] = []
    num_sents = len(sentences)
    visited_questions: Set[int] = set()

    for i in range(num_sents):
        sent = sentences[i]
        if not is_interrogative_sentence(sent):
            continue

        if i in visited_questions:
            continue
        visited_questions.add(i)

        q_text, q_start, q_end = strip_host_fluff(sent)

        # Build answer span starting from next sentence
        accumulated_sentences: List[Sentence] = [sent]
        accumulated_words: List[Word] = list(sent.words)

        answer_sentences: List[Sentence] = []
        answer_words: List[Word] = []

        cut_found = False
        j = i + 1

        while j < num_sents:
            current_sent = sentences[j]
            current_duration = current_sent.end - q_start

            # Check if this sentence is another distinct question
            if is_interrogative_sentence(current_sent) and len(answer_sentences) >= 2:
                # Next question begins; close current QA
                break

            answer_sentences.append(current_sent)
            answer_words.extend(current_sent.words)
            accumulated_sentences.append(current_sent)
            accumulated_words.extend(current_sent.words)

            # Check for natural out-point conditions once minimum duration is reached
            if current_duration >= min_duration:
                # Condition A: Host reaction cue (e.g. 'Boom.', 'Exactly.')
                if is_host_reaction_interjection(current_sent):
                    cut_found = True
                    j += 1
                    break

                # Condition B: Definitive mic-drop payoff sentence
                if is_conclusive_payoff(current_sent):
                    # Swallow immediate host reaction interjection if present
                    if j + 1 < num_sents and is_host_reaction_interjection(sentences[j + 1]):
                        next_sent = sentences[j + 1]
                        answer_sentences.append(next_sent)
                        answer_words.extend(next_sent.words)
                        accumulated_sentences.append(next_sent)
                        accumulated_words.extend(next_sent.words)
                        j += 1
                    cut_found = True
                    j += 1
                    break

                # Condition C: Sentence has terminal punctuation and we hit target duration
                if current_duration >= target_duration and current_sent.has_terminal_punct and not current_sent.dangling_end:
                    cut_found = True
                    j += 1
                    break

            # Absolute max duration boundary
            if current_duration >= max_duration:
                # Find cleanest recent sentence boundary
                cut_found = True
                j += 1
                break

            j += 1

        if not answer_sentences:
            continue

        ans_start = answer_sentences[0].start
        ans_end = answer_sentences[-1].end
        tot_start = q_start
        tot_end = ans_end
        tot_dur = tot_end - tot_start

        # Discard trivially short responses (< 10 seconds total)
        if tot_dur < 12.0:
            continue

        ans_text = " ".join(s.text.strip() for s in answer_sentences)

        qa_pair = PodcastQAPair(
            qa_id=len(qa_pairs) + 1,
            question_text=q_text,
            question_start=q_start,
            question_end=q_end,
            answer_text=ans_text,
            answer_start=ans_start,
            answer_end=ans_end,
            total_start=tot_start,
            total_end=tot_end,
            duration=tot_dur,
            asker="Host",
            answerer="Guest",
            sentences=accumulated_sentences,
            words=accumulated_words
        )
        qa_pairs.append(qa_pair)

    return qa_pairs
