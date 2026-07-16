"""
sentiment.py
------------
Core NLP logic: runs TextBlob over cleaned text and packages the result.
"""

from datetime import datetime, timezone

from textblob import TextBlob

from src.text_preprocessing import preprocess_text
from src.utils import (
    classify_sentiment,
    get_emoji,
    get_subjectivity_label,
    get_subjectivity_emoji,
    get_confidence,
)


def analyze_sentiment(raw_text: str) -> dict:
    """
    Run sentiment analysis on raw user text.

    Returns a dict ready to be serialized as JSON:
        {
            "input_text": str,
            "polarity": float,       # -1.0 .. 1.0
            "subjectivity": float,   # 0.0 .. 1.0
            "sentiment": str,        # "Positive" | "Negative" | "Neutral"
            "emoji": str,
            "subjectivity_label": str,
            "subjectivity_emoji": str,
            "confidence": int,       # 0-100, heuristic estimate, not a model confidence
            "analyzed_at": str,      # ISO 8601 UTC timestamp
        }
    """
    cleaned = preprocess_text(raw_text)

    blob = TextBlob(cleaned)
    polarity = round(blob.sentiment.polarity, 4)
    subjectivity = round(blob.sentiment.subjectivity, 4)

    sentiment = classify_sentiment(polarity)

    return {
        "input_text": raw_text.strip(),
        "polarity": polarity,
        "subjectivity": subjectivity,
        "sentiment": sentiment,
        "emoji": get_emoji(sentiment),
        "subjectivity_label": get_subjectivity_label(subjectivity),
        "subjectivity_emoji": get_subjectivity_emoji(subjectivity),
        "confidence": get_confidence(polarity),
        "analyzed_at": datetime.now(timezone.utc).isoformat(),
    }