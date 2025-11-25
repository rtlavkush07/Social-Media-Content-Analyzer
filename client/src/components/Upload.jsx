import React, { useState } from "react";
import { analyzeText } from "../utils/analysis";
import axios from "axios";
import "./Upload.css";

export default function Upload({ backendUrl }) {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handles file upload
  const handleUpload = async () => {
    if (!file) return alert("Select a file first");

    setLoading(true);
    setText("");
    setAnalysis(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${backendUrl}/upload`, formData);

      const extracted = res.data.text || "No text extracted from file.";
      setText(extracted);

      // Run text analysis
      const result = analyzeText(extracted);
      setAnalysis(result);

    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Please try again with a valid PDF or image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      {/* Header */}
      <h1 className="upload-title">Social Media Content Analyzer</h1>
      <h2 className="upload-subtitle">Upload PDF/Image  OR Drag and Drop</h2>

      {/* File Input */}
      <input
        type="file"
        accept=".pdf,image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="upload-input"
      />

      {/* Button */}
      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className="upload-button"
      >
        {loading && <span className="spinner" />}
        {loading ? "Processing..." : "Upload & Extract"}
      </button>

      {/* Extracted Text */}
      {text && (
        <div className="extracted-text-box">
          <h3>Extracted Text:</h3>
          <pre>{text}</pre>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="extracted-text-box">

          {/* SCORES DASHBOARD */}
          <h3>Engagement Overview</h3>
          <div className="dashboard-grid">

            {/* Engagement Score */}
            <div className="dashboard-card">
              <p className="metric-title">Engagement Score</p>
              <div className="score-bar">
                <div className="score-fill">
                  <div
                    className="score-inner"
                    style={{ width: `${analysis.engagementScore}%` }}
                  ></div>
                </div>
              </div>
              <p className="metric-value">{analysis.engagementScore}%</p>
            </div>

            {/* Readability */}
            <div className="dashboard-card">
              <p className="metric-title">Readability</p>
              <div className="score-bar">
                <div className="score-fill">
                  <div
                    className="score-inner"
                    style={{ width: `${analysis.readability}%` }}
                  ></div>
                </div>
              </div>
            <p className="metric-value">{analysis.readability.toFixed(2)}%</p>

            </div>

            {/* Sentiment Strength */}
            <div className="dashboard-card">
              <p className="metric-title">Sentiment Strength</p>
              <div className="score-bar">
                <div className="score-fill">
                  <div
                    className="score-inner"
                    style={{
                      width: `${Math.abs(analysis.sentimentScore * 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
              <p className="metric-value">{analysis.sentiment}</p>
            </div>
          </div>

          {/* Basic Info */}
          <h3>Text Details</h3>
          <p><strong>Total Words:</strong> {analysis.totalWords}</p>
          <p><strong>Hashtags:</strong> {analysis.hashtags.length ? analysis.hashtags.join(", ") : "None"}</p>
          <p><strong>Mentions:</strong> {analysis.mentions.length ? analysis.mentions.join(", ") : "None"}</p>
          <p><strong>Emojis Detected:</strong> {analysis.emojis.length ? analysis.emojis.join(" ") : "None"}</p>
          <p><strong>Contains CTA:</strong> {analysis.hasCTA ? "Yes" : "No"}</p>

          {/* Detected Topic */}
          <p>
            <strong>Detected Topic:</strong>{" "}
            {analysis.detectedCategory ? analysis.detectedCategory : "Not Found"}
          </p>

          {/* Suggested Hashtags */}
          <h3>Suggested Hashtags</h3>
          <div className="tag-box">
            {analysis.suggestedHashtags?.map((tag, i) => (
              <span key={i} className="hashtag">{tag}</span>
            ))}
          </div>

          {/* Suggested Emojis */}
          <h3>Suggested Emojis</h3>
          <p className="emoji-line">
            {analysis.suggestedEmojis?.length
              ? analysis.suggestedEmojis.join(" ")
              : "No emoji suggestions"}
          </p>

          {/* Top Frequent Words */}
          <h4>Top Frequent Words:</h4>
          <ul>
            {analysis.topWords.map((item, index) => (
              <li key={index}>
                {item.word} — {item.count}
              </li>
            ))}
          </ul>

          {/* Recommendations */}
          <h3>Recommendations</h3>
          <ul>
            {analysis.recommendations?.map((r, i) => (
              <li key={i}>• {r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
