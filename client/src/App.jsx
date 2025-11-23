import React from "react";
import Upload from "./components/Upload";

export default function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL + "/api"; // backend route
  
  return (
    <div>
      <Upload backendUrl={backendUrl} />
    </div>
  );
}

