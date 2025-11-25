export function analyzeText(text) {
  const safeText = text || "";
  const lower = safeText.toLowerCase();

  // ---------- WORD SPLIT ----------
  const words = lower.split(/\s+/).filter(Boolean);

  // ---------- SENTIMENT ----------
  const positiveWords = ["good", "great", "awesome", "love", "excellent", "happy"];
  const negativeWords = ["bad", "sad", "hate", "terrible", "worst"];

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
  words.forEach(w => freq[w] = (freq[w] || 0) + 1);

  const topWords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word, count]) => ({ word, count }));

  // ---------- READABILITY ----------
  const cleanText = safeText.replace(/\s+/g, "");
  const avgWordLength = words.length ? cleanText.length / words.length : 0;

  let readability = 100 - (avgWordLength - 4) * 12;
  readability = Math.max(0, Math.min(100, readability));

  // ---------- HASHTAGS ----------
  const hashtags = safeText.match(/#[\w]+/g) || [];

  // ---------- MENTIONS ----------
  const mentions = safeText.match(/@[\w]+/g) || [];

  // ---------- EMOJIS ----------
  const emojis = safeText.match(/[\u{1F600}-\u{1F64F}]/gu) || [];

  // ---------- CTA ----------
  const ctaWords = ["follow", "subscribe", "share", "comment", "like", "check out", "click"];
  const hasCTA = ctaWords.some(c => lower.includes(c));

  // ---------- ENGAGEMENT SCORE ----------
  const hashtagScore = Math.min(100, hashtags.length * 15);
  const emojiBoost = emojis.length * 2;

  const engagementScore = Math.round(
    readability * 0.3 +
    Math.abs(sentimentScore) * 20 +
    hashtagScore * 0.25 +
    emojiBoost +
    (hasCTA ? 10 : 0)
  );

  // ======================================================
  //               🔥 CATEGORY DETECTION
  // ======================================================
  const topicMap = {
    coding: ["coding", "developer", "react", "javascript", "mern", "software", "programming"],
    fitness: ["fitness", "gym", "workout", "health"],
    travel: ["travel", "trip", "vacation", "journey"],
    food: ["food", "recipe", "eat", "cooking"],
    study: ["study", "student", "exam", "notes"],
    motivation: ["motivation", "success", "inspiration"],
    business: ["business", "startup", "marketing"],
    fashion: ["fashion", "style", "outfit"],
  };

  let detectedCategory = null;

  for (const category in topicMap) {
    if (topicMap[category].some(word => lower.includes(word))) {
      detectedCategory = category;
      break;
    }
  }

  // ======================================================
  //               🔥 HASHTAG SUGGESTIONS
  // ======================================================
  const hashtagSuggestions = {
    coding: ["#coding", "#developer", "#javascript", "#reactjs", "#programming"],
    fitness: ["#fitness", "#workout", "#gym", "#fitlife", "#health"],
    travel: ["#travel", "#wanderlust", "#vacation", "#explore", "#travelgram"],
    food: ["#foodie", "#delicious", "#foodlover", "#recipe", "#yum"],
    study: ["#study", "#studentlife", "#examprep", "#notes", "#studymotivation"],
    motivation: ["#motivation", "#success", "#inspiration", "#mindset", "#goals"],
    business: ["#business", "#startup", "#entrepreneur", "#marketing", "#branding"],
    fashion: ["#fashion", "#style", "#outfit", "#ootd", "#trend"],
    default: ["#trending", "#viral", "#exploremore"]
  };

  const suggestedHashtags =
    detectedCategory ? hashtagSuggestions[detectedCategory].slice(0, 4)
                     : hashtagSuggestions.default;

  // ======================================================
  //               🔥 EMOJI SUGGESTIONS
  // ======================================================
  const emojiSuggestions = {
    coding: ["💻", "👨‍💻", "⚡", "🤖"],
    fitness: ["💪", "🔥", "🏋️"],
    travel: ["✈️", "🌍", "📸"],
    food: ["🍕", "🍔", "😋"],
    study: ["📘", "✏️", "🧠"],
    motivation: ["🔥", "🚀", "✨"],
    business: ["📈", "💼", "💡"],
    fashion: ["👗", "✨", "💖"],
    default: ["✨", "🔥"]
  };

  const suggestedEmojis =
    detectedCategory ? emojiSuggestions[detectedCategory]
                     : emojiSuggestions.default;

  // ======================================================
  //               🔥 RECOMMENDATIONS (same)
  // ======================================================
  const recommendations = [];

  if (sentiment === "Negative") {
    recommendations.push("Try using a more positive tone to improve engagement.");
  } else if (sentiment === "Neutral") {
    recommendations.push("Add emotional words or emojis to make the post more expressive.");
  } else {
    recommendations.push("Great tone! Positive posts usually get more engagement.");
  }

  if (readability < 40) {
    recommendations.push("Simplify your text. Use shorter and clearer sentences.");
  } else if (readability < 70) {
    recommendations.push("Readability is okay, but you can still make it simpler for better reach.");
  } else {
    recommendations.push("Your text is easy to read! Good job.");
  }

  if (hashtags.length === 0) {
    recommendations.push("Add 2–5 relevant hashtags to improve discoverability.");
  } else if (hashtags.length < 3) {
    recommendations.push("Use at least 3–5 hashtags for better visibility.");
  } else {
    recommendations.push("Good number of hashtags! Keep them relevant to your content.");
  }

  if (mentions.length === 0) {
    recommendations.push("Mention relevant accounts to increase interaction.");
  } else {
    recommendations.push("Good use of mentions! They help increase engagement.");
  }

  if (emojis.length === 0) {
    recommendations.push("Add 1–3 emojis to make your post more eye-catching.");
  } else if (emojis.length > 6) {
    recommendations.push("Reduce emoji usage — too many emojis can look spammy.");
  } else {
    recommendations.push("Nice emoji usage! Balanced and engaging.");
  }

  if (!hasCTA) {
    recommendations.push("Add a CTA like 'Follow for more', 'Share your thoughts', or 'Check this out!'");
  } else {
    recommendations.push("Good job adding a CTA! It encourages user interaction.");
  }

  if (engagementScore < 50) {
    recommendations.push("Improve your opening line and use stronger engagement hooks.");
  } else if (engagementScore < 75) {
    recommendations.push("Your post is decent — a stronger hook could make it even better.");
  } else {
    recommendations.push("High engagement potential! This post is ready to publish 🚀");
  }

  return {
    sentiment,
    sentimentScore: Number(sentimentScore.toFixed(2)),
    readability,
    engagementScore,
    totalWords: words.length,

    hashtags,
    mentions,
    emojis,
    hasCTA,

    topWords,
    recommendations,

    // ⭐ NEW
    detectedCategory,
    suggestedHashtags,
    suggestedEmojis,
  };
}
