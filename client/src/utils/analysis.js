export function analyzeText(text) {
  const positiveWords = ["good","great","awesome","love","excellent","happy"];
  const negativeWords = ["bad","sad","hate","terrible","worst"];

  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  let pos = 0, neg = 0;

  words.forEach(w => { if (positiveWords.includes(w)) pos++; if (negativeWords.includes(w)) neg++; });
  const score = words.length ? (pos - neg)/words.length : 0;
  const sentiment = score > 0.1 ? "Positive" : score < -0.1 ? "Negative" : "Neutral";

  return { sentiment, sentimentScore: Number(score.toFixed(2)) };
}
