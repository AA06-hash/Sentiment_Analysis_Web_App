"""
app.py
------
Flask entry point for the Sentiment Analysis Web App.

Routes
------
GET  /          -> renders the single-page UI
POST /analyze   -> receives {"text": "..."} as JSON, returns sentiment result
"""

from flask import Flask, render_template, request, jsonify

from src.validation import validate_input
from src.sentiment import analyze_sentiment

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/analyze", methods=["POST"])
def analyze():
    payload = request.get_json(silent=True) or {}
    text = payload.get("text", "")

    is_valid, error_message = validate_input(text)
    if not is_valid:
        return jsonify({"error": error_message}), 400

    result = analyze_sentiment(text)
    return jsonify(result), 200


if __name__ == "__main__":
    app.run(debug=True)
