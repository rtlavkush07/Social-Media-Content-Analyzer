import React, { useState } from "react";
import axios from "axios";
import './Upload.css'; 

export default function Upload({ backendUrl }) {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // Handles file upload
  const handleUpload = async () => {
    if (!file) return alert("Select a file first");

    setLoading(true); 
    setText("");      

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${backendUrl}/upload`, formData);
      setText(res.data.text || "No text extracted from file.");
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
        {loading && (
          <span className="spinner" />
        )}
        {loading ? "Processing..." : "Upload & Extract"}
      </button>

      {/* Extracted Text Display */}
      {text && (
        <div className="extracted-text-box">
          <h3>Extracted Text:</h3>
          <pre>{text}</pre>
        </div>
      )}

    </div>
  );
}