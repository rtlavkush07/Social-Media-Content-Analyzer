// very simple keyword sentiment
const positiveWords = ["good","great","awesome","love","excellent","happy","amazing","nice","best","fantastic"];
const negativeWords = ["bad","sad","hate","terrible","worst","awful","angry","poor","sucks","disappoint"];

export function analyzeText(text) {
  const t = text.toLowerCase();
  const words = t.split(/\s+/).filter(Boolean);

  // sentiment
  let pos=0, neg=0;
  for (const w of words) {
    if (positiveWords.includes(w)) pos++;
    if (negativeWords.includes(w)) neg++;
  }
  const sentimentScore = words.length ? (pos - neg) / Math.sqrt(words.length) : 0;
  const sentiment = sentimentScore > 0.1 ? "Positive" : sentimentScore < -0.1 ? "Negative" : "Neutral";

  // length/readability
  const charCount = text.length;
  const wordCount = words.length;
  const avgWordLen = wordCount? (text.replace(/\s+/g,'').length / wordCount).toFixed(1) : 0;
  const suggestion = [];
  if (wordCount < 10) suggestion.push("Post is very short — consider adding 1–2 lines for context.");
  if (wordCount > 80) suggestion.push("Post is long — try shortening to keep attention.");
  if (avgWordLen > 6) suggestion.push("Consider simpler words to increase readability.");

  // CTA detection
  const hasCTA = /\b(call to action|click|buy|signup|subscribe|follow|learn more|dm|message)\b/i.test(text);
  if (!hasCTA) suggestion.push("Add a clear CTA (e.g., 'Click link to learn more', 'DM for collab').");

  // hashtag suggestions (simple: extract nouns-ish by picking capitalized words or frequent words)
  const freq = {};
  for (const w of words) freq[w] = (freq[w]||0)+1;
  const sorted = Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,8).map(x=>x[0]);
  const hashtags = sorted.filter(w=>w.length>3).slice(0,5).map(w=>'#'+w.replace(/[^a-z0-9]/g,''));

  return {
    sentiment,
    sentimentScore: Number(sentimentScore.toFixed(2)),
    wordCount,
    charCount,
    avgWordLen: Number(avgWordLen),
    suggestions: suggestion,
    hashtags
  };
}
