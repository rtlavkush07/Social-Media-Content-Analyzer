import React, { useState } from "react";
import axios from "axios";
import { runAdvancedAnalysis } from "../utils/advancedAnalysis";

export default function Upload({ backendUrl }) {
  const [file, setFile] = useState(null);
  const [extracted, setExtracted] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a PDF or image file!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${backendUrl}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const text = res.data?.text || "";
      setExtracted(text);

      // Run advanced AI analysis
      const adv = await runAdvancedAnalysis(text);
      setAnalysis(adv);

    } catch (err) {
      console.error(err);
      alert("Error uploading file.");
    }

    setLoading(false);
  };

  return (
    <div className="box">
      <h2>Upload PDF or Image</h2>

      <input type="file" accept=".pdf, image/*" onChange={handleFileSelect} />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Processing..." : "Upload & Analyze"}
      </button>

      {extracted && (
        <div className="text-box">
          <h3>Extracted Text</h3>
          <pre>{extracted}</pre>
        </div>
      )}

      {/* ADVANCED ANALYSIS SECTION */}
      {analysis && (
        <div className="analysis-box">
          <h3 style={{ marginBottom: "10px" }}>Advanced Analysis</h3>

          {/* Sentiment */}
          <div className="suggestion">
            <strong>Sentiment:</strong>{" "}
            {analysis?.sentiment?.label}{" "}
            ({analysis?.sentiment?.score?.toFixed(2)})
          </div>

          {/* Caption */}
          <div className="suggestion" style={{ marginTop: "12px" }}>
            <strong>Auto-Generated Caption:</strong>
            <div
              style={{
                marginTop: "4px",
                background: "#f1f1f1",
                padding: "8px",
                borderRadius: "6px",
              }}
            >
              {analysis?.caption}
            </div>
          </div>

          {/* Hashtags */}
          <div className="suggestion" style={{ marginTop: "12px" }}>
            <strong>Viral Hashtags:</strong>
            <div
              style={{
                marginTop: "4px",
                background: "#f1f1f1",
                padding: "8px",
                borderRadius: "6px",
              }}
            >
              {analysis?.hashtags}
            </div>
          </div>

          {/* Readability */}
          <div className="suggestion" style={{ marginTop: "12px" }}>
            <strong>Readability Score:</strong>{" "}
            {analysis?.readability} / 100
            <div style={{ fontSize: "12px", color: "#666" }}>
              Higher = easier to read
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
