import React from "react";
import Upload from "./components/Upload";

export default function App() {
  const backendUrl = "http://localhost:5000/api";
  return (
    <div className="container">
      <h1>Social Media Content Analyzer — Upload PDF or Image</h1>
      <Upload backendUrl={backendUrl} />
    </div>
  );
}
