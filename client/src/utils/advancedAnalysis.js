import { HfInference } from "@huggingface/inference";

const hf = new HfInference(import.meta.env.VITE_HF_API_KEY);

// ⭐ 1. SENTIMENT ANALYSIS — FIXED
export async function getSentiment(text) {
  try {
    const result = await hf.textClassification({
      model: "distilbert-base-uncased-finetuned-sst-2-english",
      inputs: text
    });

    return {
      label: result[0].label.toLowerCase(),
      score: result[0].score
    };
  } catch (err) {
    console.error("Sentiment error:", err);
    return { label: "unknown", score: 0 };
  }
}

// ⭐ 2. AUTO CAPTION GENERATOR (simple)
export function generateCaption(text) {
  if (!text) return "No content extracted.";

  const firstSentence = text.split(".")[0].slice(0, 80);

  return `Quick thoughts on "${firstSentence}" — what do you think?`;
}

// ⭐ 3. VIRAL HASHTAGS
export function generateHashtags(text) {
  if (!text) return "";

  let words = text
    .split(/\s+/)
    .filter((w) => w.length > 5)
    .slice(0, 5);

  let tags = words.map((w) => `#${w.toLowerCase()}`).join(" ");

  if (!tags.length) tags = "#trending #viral #explore";

  return tags;
}

// ⭐ 4. READABILITY SCORE
export function getReadability(text) {
  if (!text) return 0;

  const words = text.split(/\s+/).length;
  const sentences = text.split(/[.!?]/).length || 1;

  let score = Math.round((words / sentences) * 5);

  if (score > 100) score = 100;

  return score;
}

// ⭐ 5. RUN ALL ANALYSIS TOGETHER
export async function runAdvancedAnalysis(text) {
  const sentiment = await getSentiment(text);
  const caption = generateCaption(text);
  const hashtags = generateHashtags(text);
  const readability = getReadability(text);

  return {
    sentiment,
    caption,
    hashtags,
    readability
  };
}
