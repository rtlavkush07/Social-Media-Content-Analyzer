// Text analysis utility
// Adds sentiment, word frequency, readability, and engagement score.

export function analyzeText(text) {
  // ---------- SENTIMENT WORD LISTS ----------
  const positiveWords = ["good", "great", "awesome", "love", "excellent", "happy"];
  const negativeWords = ["bad", "sad", "hate", "terrible", "worst"];

  // ---------- BASIC TOKENIZATION ----------
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);

  // ---------- SENTIMENT ----------
  let pos = 0, neg = 0;

  words.forEach(w => {
    if (positiveWords.includes(w)) pos++;
    if (negativeWords.includes(w)) neg++;
  });

  const sentimentScore = words.length ? (pos - neg) / words.length : 0;

  const sentiment =
    sentimentScore > 0.1 ? "Positive" :
    sentimentScore < -0.1 ? "Negative" :
    "Neutral";

  // ---------- WORD FREQUENCY ----------
  const freq = {};
  words.forEach(w => {
    freq[w] = (freq[w] || 0) + 1;
  });

  const topWords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8) // taking top 8 only
    .map(([word, count]) => ({ word, count }));

  // ---------- READABILITY ----------
  const cleanText = text.replace(/\s+/g, "");
  const avgWordLength = words.length ? cleanText.length / words.length : 0;

  // Simple readability score: 0 (hard) → 100 (easy)
  let readability = 100 - (avgWordLength - 4) * 12;
  readability = Math.max(0, Math.min(100, readability));

  // ---------- ENGAGEMENT SCORE ----------
  const variety = words.length ? Object.keys(freq).length / words.length : 0;

  const engagementScore = Math.round(
    (variety * 40) + (readability * 0.4) + (Math.abs(sentimentScore) * 20)
  );

  return {
    sentiment,
    sentimentScore: Number(sentimentScore.toFixed(2)),
    readability: Math.round(readability),
    engagementScore,
    topWords,
    totalWords: words.length
  };
}
