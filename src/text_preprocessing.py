"""
text_preprocessing.py
----------------------
Light-touch cleanup before text is handed to TextBlob.

TextBlob's sentiment model works on natural language, so we intentionally
avoid aggressive cleanup (no stripping punctuation or lowercasing the
whole string) since punctuation and casing can carry sentiment signal
(e.g. "amazing!!!" vs "amazing").
"""

import re


def preprocess_text(text: str) -> str:
    """Normalize whitespace and line breaks without destroying meaning."""
    # Collapse line breaks into spaces so multi-paragraph input reads as
    # one flowing text for polarity/subjectivity scoring.
    text = text.replace("\r\n", " ").replace("\n", " ").replace("\r", " ")

    # Collapse repeated whitespace.
    text = re.sub(r"\s+", " ", text)

    return text.strip()
