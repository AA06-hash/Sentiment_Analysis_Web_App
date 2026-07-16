(() => {
  const textInput = document.getElementById('textInput');
  const charCounter = document.getElementById('charCounter');
  const inputError = document.getElementById('inputError');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const btnLabel = document.getElementById('btnLabel');
  const btnSpinner = document.getElementById('btnSpinner');
  const clearBtn = document.getElementById('clearBtn');
  const copyBtn = document.getElementById('copyBtn');
  const copyToast = document.getElementById('copyToast');
  const darkModeSwitch = document.getElementById('darkModeSwitch');
  const themeIcon = document.getElementById('themeIcon');

  const sentimentCard = document.getElementById('sentimentCard');
  const emojiEl = document.getElementById('emoji');
  const sentimentLabel = document.getElementById('sentimentLabel');
  const polarityRange = document.getElementById('polarityRange');
  const polarityBar = document.getElementById('polarityBar');

  const subjectivityValue = document.getElementById('subjectivityValue');
  const subjectivityBar = document.getElementById('subjectivityBar');
  const subjectivityLabel = document.getElementById('subjectivityLabel');

  const confidenceValue = document.getElementById('confidenceValue');
  const confidenceBar = document.getElementById('confidenceBar');

  const timestampEl = document.getElementById('timestamp');

  const MAX_CHARS = 5000;
  let lastResult = null;

  const sentimentClass = {
    Positive: 'is-positive',
    Negative: 'is-negative',
    Neutral: 'is-neutral',
  };
  const barClass = {
    Positive: 'bg-positive',
    Negative: 'bg-negative',
    Neutral: 'bg-neutral',
  };

  // ---------- character counter ----------
  function updateCounter() {
    charCounter.textContent = `${textInput.value.length} / ${MAX_CHARS}`;
  }
  textInput.addEventListener('input', () => {
    updateCounter();
    inputError.textContent = '';
  });
  updateCounter();

  // ---------- sample chips ----------
  document.querySelectorAll('[data-sample]').forEach((chip) => {
    chip.addEventListener('click', () => {
      textInput.value = chip.dataset.sample;
      updateCounter();
      inputError.textContent = '';
      textInput.focus();
    });
  });

  // ---------- clear ----------
  clearBtn.addEventListener('click', () => {
    textInput.value = '';
    updateCounter();
    inputError.textContent = '';
    resetResult();
    textInput.focus();
  });

  // ---------- dark mode ----------
  darkModeSwitch.addEventListener('change', () => {
    const isDark = darkModeSwitch.checked;
    document.documentElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
    themeIcon.textContent = isDark ? '🌙' : '🌞';
  });

  // ---------- formatting helpers ----------
  function formatPolarity(polarity) {
    const sign = polarity > 0 ? '+' : polarity < 0 ? '−' : '';
    const magnitude = Math.abs(polarity).toFixed(2);
    return `Polarity : ${sign}${magnitude} / +1.00`;
  }

  function formatTimestamp(isoString) {
    const d = new Date(isoString);
    const day = String(d.getDate()).padStart(2, '0');
    const month = d.toLocaleString(undefined, { month: 'short' });
    const year = d.getFullYear();
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `Last analyzed: ${day} ${month} ${year} • ${hours}:${minutes} ${ampm}`;
  }

  // ---------- result rendering ----------
  function resetResult() {
    sentimentCard.className = 'sentiment-card rounded-3 p-4 text-center mb-3 bg-body-secondary';
    emojiEl.textContent = '🙂';
    sentimentLabel.textContent = 'Awaiting input';
    polarityRange.textContent = 'Polarity : — / +1.00';

    polarityBar.style.width = '50%';
    polarityBar.className = 'progress-bar';

    subjectivityValue.textContent = '0.00';
    subjectivityBar.style.width = '0%';
    subjectivityLabel.textContent = 'Fact ← → Opinion';

    confidenceValue.textContent = '—';
    confidenceBar.style.width = '0%';

    timestampEl.textContent = '';

    copyBtn.disabled = true;
    lastResult = null;
  }

  function showResult(result) {
    const cls = sentimentClass[result.sentiment] || 'is-neutral';
    sentimentCard.className = `sentiment-card rounded-3 p-4 text-center mb-3 ${cls}`;
    emojiEl.textContent = result.emoji;
    sentimentLabel.textContent = result.sentiment;
    polarityRange.textContent = formatPolarity(result.polarity);

    const polarityPercent = ((result.polarity + 1) / 2) * 100; // -1..1 -> 0..100
    polarityBar.style.width = `${polarityPercent}%`;
    polarityBar.className = `progress-bar ${barClass[result.sentiment] || 'bg-neutral'}`;

    subjectivityValue.textContent = result.subjectivity.toFixed(2);
    subjectivityBar.style.width = `${result.subjectivity * 100}%`;
    subjectivityLabel.textContent = `${result.subjectivity_label} ${result.subjectivity_emoji}`;

    confidenceValue.textContent = `${result.confidence}%`;
    confidenceBar.style.width = `${result.confidence}%`;

    timestampEl.textContent = formatTimestamp(result.analyzed_at);

    copyBtn.disabled = false;
    lastResult = result;
  }

  function setLoading(isLoading) {
    analyzeBtn.disabled = isLoading;
    btnSpinner.classList.toggle('d-none', !isLoading);
    btnLabel.textContent = isLoading ? 'Analyzing…' : 'Analyze';
  }

  // ---------- analyze ----------
  async function analyze() {
    const text = textInput.value;
    inputError.textContent = '';

    if (text.trim().length === 0) {
      inputError.textContent = 'Please enter some text.';
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        inputError.textContent = data.error || 'Something went wrong.';
        return;
      }

      showResult(data);
    } catch (err) {
      inputError.textContent = 'Could not reach the server. Is the Flask app running?';
    } finally {
      setLoading(false);
    }
  }

  analyzeBtn.addEventListener('click', analyze);

  textInput.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      analyze();
    }
  });

  // ---------- copy result ----------
  copyBtn.addEventListener('click', async () => {
    if (!lastResult) return;
    const summary = `Sentiment: ${lastResult.sentiment} ${lastResult.emoji}\nPolarity: ${lastResult.polarity.toFixed(2)} / +1.00\nSubjectivity: ${lastResult.subjectivity.toFixed(2)} (${lastResult.subjectivity_label})\nConfidence (estimate): ${lastResult.confidence}%`;
    try {
      await navigator.clipboard.writeText(summary);
      copyToast.textContent = 'Copied to clipboard ✓';
    } catch (err) {
      copyToast.textContent = 'Could not copy';
    }
    copyToast.classList.add('show-toast');
    setTimeout(() => copyToast.classList.remove('show-toast'), 1800);
  });

  resetResult();
})();