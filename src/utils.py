"""
utils.py
--------
Small shared helpers: sentiment classification and emoji/label mapping.
"""


def classify_sentiment(polarity: float) -> str:
    """Map a TextBlob polarity score (-1 to 1) to a sentiment label."""
    if polarity > 0:
        return "Positive"
    elif polarity < 0:
        return "Negative"
    return "Neutral"


def get_emoji(sentiment: str) -> str:
    return {
        "Positive": "😊",
        "Negative": "😞",
        "Neutral": "😐",
    }.get(sentiment, "😐")


def get_subjectivity_label(subjectivity: float) -> str:
    """Human-readable label for the 0 (objective) - 1 (subjective) scale."""
    if subjectivity < 0.34:
        return "Mostly Objective"
    elif subjectivity < 0.67:
        return "Moderately Subjective"
    return "Highly Subjective"


def get_subjectivity_emoji(subjectivity: float) -> str:
    if subjectivity < 0.34:
        return "📘"
    elif subjectivity < 0.67:
        return "📝"
    return "💭"


def get_confidence(polarity: float) -> int:
    """
    Heuristic confidence estimate (0-100), NOT a true model confidence score.

    Larger |polarity| means TextBlob found stronger sentiment-bearing words,
    which we treat as a rough proxy for how confident the reading is. A 50%
    baseline is used so a polarity of 0 (a deliberate "Neutral" call) still
    reads as a reasonably confident result rather than a failure state.
    """
    confidence = 50 + min(abs(polarity), 1.0) * 50
    return round(confidence)