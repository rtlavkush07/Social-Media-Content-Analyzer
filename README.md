📘 Social Media Content Analyzer

A lightweight, production-ready application that allows users to upload PDFs and images, extract text using PDF parsing + OCR, and analyze the text for readability, sentiment, and engagement insights.

🚀 Overview

The Social Media Content Analyzer helps users extract and analyze text from documents to understand how engaging, readable, and sentiment-rich their content is.

It supports:

PDF Text Extraction (structured, selectable text)

OCR Extraction (for scanned PDFs & images)

Content Quality Analysis (sentiment, readability, engagement, frequency)

This tool is ideal for analyzing social media posts, and scanned documents.

✨ Key Features
📂 1. File Upload

Upload PDF or Image files

Simple and clean UI

Auto-validation for supported file types

Smooth loading UX (spinner included)

📝 2. Text Extraction

PDF Parsing: Extracts text using pdfjs-dist while maintaining structure

OCR: Uses Tesseract.js to extract text from

Scanned PDFs

JPG, PNG, JPEG, WEBP images

Automatically deletes uploaded files to keep server clean

🧠 3. Text Analysis

After extraction, the text is analyzed for:

Sentiment (Positive / Neutral / Negative)

Sentiment Score (−1 → +1)

Readability Score (0–100)

Engagement Score (0–100)

Top Frequent Words

Total Word Count

🛠 Tech Stack
Frontend

React (Vite)

Axios

Custom CSS

Backend

Node.js + Express

Multer (file upload)

pdfjs-dist (PDF parser)

Tesseract.js (OCR engine)

fs (auto file cleanup)

📁 Project Structure
Social-Media-Content-Analyzer/
│
├── server/
│ ├── routes/
│ │ └── upload.js
│ ├── services/
│ │ ├── pdfParser.js
│ │ └── ocr.js
│ ├── server.js
│ └── package.json
│
└── client/
├── src/
│ ├── components/Upload.jsx
│ ├── utils/analysis.js
│ ├── Upload.css
│ └── App.jsx
├── index.html
└── package.json

▶️ How to Run Locally
Backend
cd server
npm install
npm start

Backend runs at:
👉 http://localhost:5000

Frontend
cd client
npm install
npm run dev

Frontend runs at:
👉 http://localhost:5173

🔌 API Endpoint
POST /api/upload

Request (form-data):

file: <PDF or Image file>

Response:

{
"text": "Extracted document text here"
}

🧪 Sample Analysis Output
{
"sentiment": "Neutral",
"sentimentScore": 0,
"readability": 72,
"engagementScore": 58,
"totalWords": 293,
"topWords": [
{ "word": "tech", "count": 4 },
{ "word": "computer", "count": 3 }
]
}

📝 Approach (200 Words)

This application is designed to extract and analyze text from real-world user documents. The backend uses Node.js and Express to provide a clean, modular API. File uploads are handled by Multer. For PDF parsing, the application uses pdfjs-dist to extract structured text from normal PDFs. If the PDF is scanned or contains no selectable text, the system automatically falls back to Tesseract.js for OCR extraction. Image uploads (JPEG, PNG, etc.) are also processed through Tesseract.

After text extraction, uploaded files are removed automatically from the server to maintain a clean production environment. The text is then analyzed using a lightweight analysis module that calculates sentiment, readability score, engagement, word frequency, and overall document structure.

The frontend is built using React with a focus on a clean and user-friendly interface. A loading spinner ensures smooth UX during long OCR operations. Axios handles API communication. The project maintains clear separation of concerns through structured folders and service files.

This project meets the technical requirements of clean code, error handling, documentation, and practical implementation within the provided time constraints.

Name :- Lav Kumar
MNNIT Allahabad
