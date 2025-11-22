import React from "react";
import Upload from "./components/Upload";

export default function App() {
  const backendUrl = "http://localhost:5000/api"; // backend route
  return (
    <div>
      
      <Upload backendUrl={backendUrl} />
    </div>
  );
}
