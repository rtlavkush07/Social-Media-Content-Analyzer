import React from "react";
import Upload from "./components/Upload";

export default function App() {
  // change this to deployed backend if needed
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  return (
    <div className="container">
      <div className="header">
        <div className="h1">Social Media Content Analyzer — Upload & Extract</div>
      </div>

      <Upload backendUrl={backendUrl} />

      <div style={{marginTop:20}} className="small">
        Note: This demo extracts text from PDFs and images using your backend, then performs a client-side quick analysis (offline). For production, replace backend URL in <code>VITE_BACKEND_URL</code>.
      </div>
    </div>
  );
}
