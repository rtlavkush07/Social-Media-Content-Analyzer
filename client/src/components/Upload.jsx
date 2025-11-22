import React, { useState } from "react";
import { analyzeText } from "../utils/analysis";
import axios from "axios";
import './Upload.css'; 

export default function Upload({ backendUrl }) {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState(null);   // NEW
  const [loading, setLoading] = useState(false);

  // Handles file upload
  const handleUpload = async () => {
    if (!file) return alert("Select a file first");

    setLoading(true); 
    setText("");      
    setAnalysis(null); // reset

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${backendUrl}/upload`, formData);

      const extracted = res.data.text || "No text extracted from file.";
      setText(extracted);

      // 🔥 RUN ANALYSIS (NEW)
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
      <h1 className="upload-title">
        Social Media Content Analyzer
      </h1>
      
      <h2 className="upload-subtitle">Upload PDF or Image</h2>

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

      {/* Extracted Text Display */}
      {text && (
        <div className="extracted-text-box">
          <h3>Extracted Text:</h3>
          <pre>{text}</pre>
        </div>
      )}

      {/* 🔥 NEW: Analysis Results */}
      {analysis && (
        <div className="extracted-text-box">
          <h3>Text Analysis</h3>

          <p><strong>Sentiment:</strong> {analysis.sentiment} ({analysis.sentimentScore})</p>
          <p><strong>Readability:</strong> {analysis.readability}/100</p>
          <p><strong>Engagement Score:</strong> {analysis.engagementScore}/100</p>
          <p><strong>Total Words:</strong> {analysis.totalWords}</p>

          <h4>Top Frequent Words:</h4>
          <ul>
            {analysis.topWords.map((item, index) => (
              <li key={index}>
                {item.word} — {item.count}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}
