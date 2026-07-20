# 😊 Sentiment Analysis Web Application

**A modern Natural Language Processing (NLP) web application that analyzes user-entered text and classifies it as Positive, Negative, or Neutral using TextBlob and Flask.**

![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat\&logo=python\&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-Web%20Framework-000000?style=flat\&logo=flask\&logoColor=white)
![TextBlob](https://img.shields.io/badge/TextBlob-NLP-F7931E?style=flat)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=flat\&logo=bootstrap\&logoColor=white)

---

## ⭐ Key Highlights

* Built using Python and Flask
* NLP-powered sentiment analysis using TextBlob
* Interactive and responsive web interface
* Real-time sentiment prediction
* Displays polarity and subjectivity scores
* Interactive sentiment gauge
* Light/Dark mode support
* Character counter and sample text buttons
* Copy result to clipboard
* Modular project structure

---

## 📌 Overview

This project builds an end-to-end **Sentiment Analysis Web Application** that predicts the emotional tone of user-entered text using **TextBlob**.

Users can enter any sentence or paragraph and instantly receive:

* Sentiment classification (**Positive / Negative / Neutral**)
* Polarity score
* Subjectivity score
* Estimated confidence indicator

The application demonstrates the integration of **Flask**, **TextBlob**, **HTML/CSS/JavaScript**, and modern UI design to create a practical NLP-powered web application.

---

## ✨ Features

* ✅ Real-time sentiment analysis
* ✅ Positive / Negative / Neutral classification
* ✅ Polarity score visualization
* ✅ Subjectivity score visualization
* ✅ Estimated confidence indicator
* ✅ Interactive sentiment gauge
* ✅ Dark/Light mode toggle
* ✅ Character counter
* ✅ Sample input buttons
* ✅ Copy result button
* ✅ Responsive Bootstrap UI
* ✅ Modular Python project structure

---

## 🛠️ Tech Stack

| Category    | Tools             |
| ----------- | ----------------- |
| Language    | Python 3.11       |
| Backend     | Flask             |
| NLP Library | TextBlob          |
| Frontend    | HTML5             |
| Styling     | CSS3, Bootstrap 5 |
| Scripting   | JavaScript        |

---

## 📁 Project Structure

```text
Sentiment_Analysis_Web_App/
│
├── app.py                          # Flask application entry point
├── requirements.txt
├── README.md
├── .gitignore
│
├── src/
│   ├── sentiment.py                # Sentiment analysis logic
│   ├── validation.py               # Input validation
│   ├── text_preprocessing.py       # Text preprocessing utilities
│   └── utils.py                    # Helper functions
│
├── static/
│   ├── css/
│   │   └── style.css               # Custom styling
│   ├── js/
│   │   └── script.js               # Frontend interactions
│   └── images/
│       └── logo.png
│
├── templates/
│   ├── index.html                  # Main UI page
│   ├── about.html                  # About page
│   └── result.html                 # Result template
│
├── screenshots/
│   ├── home.png
│   ├── positive_result.png
│   ├── negative_result.png
│   └── neutral_result.png
│
└── reports/
    ├── Project_Report.pdf
    └── Project_Presentation.pptx
```

---

## 🔄 Workflow

```text
User Input
     │
     ▼
Input Validation
     │
     ▼
Flask Backend
     │
     ▼
Text Preprocessing
     │
     ▼
TextBlob Analysis
     │
     ▼
Calculate Polarity
     │
     ▼
Calculate Subjectivity
     │
     ▼
Classify Sentiment
     │
     ▼
Display Results
```

---

## 📊 Sentiment Logic

### Polarity

| Score | Sentiment   |
| ----- | ----------- |
| > 0   | 😊 Positive |
| = 0   | 😐 Neutral  |
| < 0   | 😞 Negative |

### Subjectivity

| Score       | Interpretation        |
| ----------- | --------------------- |
| 0.00 – 0.30 | Objective             |
| 0.31 – 0.70 | Moderately Subjective |
| 0.71 – 1.00 | Highly Subjective     |

---

## 📷 Application Screenshots

### Home Page

![Home]("screenshots\home.png")

### Positive Result

![Positive]("screenshots\positive.png")

### Negative Result

![Negative]("screenshots\negative.png")

### Neutral Result

![Neutral]("screenshots\neutral.png")

---

## ⚙️ Installation

```bash
# 1. Clone the repository
git clone https://github.com/AA06-hash/Sentiment_Analysis_Web_App.git
cd Sentiment_Analysis_Web_App

# 2. (Optional) Create a virtual environment
python -m venv venv
source venv/bin/activate      # On Windows: venv\\Scripts\\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Download TextBlob corpora
python -m textblob.download_corpora
```

---

## ▶️ Usage

Run the Flask application:

```bash
python app.py
```

Open your browser and visit:

```text
http://127.0.0.1:5000
```

The application will:

1. Accept user-entered text
2. Analyze sentiment using TextBlob
3. Calculate polarity and subjectivity
4. Classify sentiment
5. Display interactive results instantly

---

## 📊 Example Output

**Input**

```text
I absolutely love this product. It exceeded my expectations and made my day.
```

**Output**

```text
Sentiment      : Positive 😊
Polarity       : 0.62
Subjectivity   : 0.75
Confidence     : High
```

---

## 🧪 Sample Inputs

### Positive

```text
I absolutely love this product. It exceeded my expectations and made my day.
```

### Negative

```text
This is the worst experience I have ever had. I am extremely disappointed.
```

### Neutral

```text
The meeting starts at 10:00 AM tomorrow in the conference room.
```

---

## 🚀 Future Enhancements

* [ ] Machine Learning-based sentiment classification
* [ ] Logistic Regression / Naive Bayes models
* [ ] BERT transformer integration
* [ ] Multi-language support
* [ ] Voice-to-text sentiment analysis
* [ ] File upload support (.txt / .pdf)
* [ ] Sentiment history dashboard
* [ ] REST API development
* [ ] Docker deployment
* [ ] Cloud deployment (Render / Railway / AWS)

---

## ⚠️ Limitations

This project uses **TextBlob**, a lexicon-based sentiment analysis library. It performs well for straightforward sentiment classification but may not accurately interpret sarcasm, irony, or complex mixed-emotion sentences.

Future versions can integrate transformer-based language models such as **BERT** for improved contextual understanding and prediction accuracy.

---

## 📄 Deliverables

* ✅ Flask Web Application
* ✅ Python Source Code
* ✅ HTML/CSS/JavaScript Files
* ✅ Project Report (PDF)
* ✅ PowerPoint Presentation
* ✅ Screenshots
* ✅ README Documentation
* ✅ requirements.txt
* ✅ GitHub Repository

---

## 👤 Author

**Avani Ashiha**

* GitHub: https://github.com/AA06-hash
* LinkedIn: https://www.linkedin.com/in/avani-ashiha-s-15983a291/

---

If you found this project useful, consider giving it a ⭐ on GitHub!
