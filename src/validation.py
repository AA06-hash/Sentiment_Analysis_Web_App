"""
validation.py
--------------
Input validation for the Sentiment Analysis Web App.

Keeps validation rules in one place so app.py stays thin and the
rules are easy to unit test in isolation.
"""

MAX_CHARACTERS = 5000


def validate_input(text: str):
    """
    Validate raw text submitted by the user.

    Returns
    -------
    (is_valid: bool, error_message: str | None)
    """
    if text is None:
        return False, "Please enter some text."

    stripped = text.strip()

    if len(stripped) == 0:
        return False, "Please enter some text."

    if stripped.isspace():
        return False, "Please enter some text."

    if len(text) > MAX_CHARACTERS:
        return False, f"Text is too long. Please keep it under {MAX_CHARACTERS} characters."

    return True, None
