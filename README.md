📘 Social Media Content Analyzer

A lightweight web application that extracts and analyzes text from PDFs and image files using PDF parsing and OCR. Designed as part of a technical assessment for a Software Engineering role.

🚀 Features

1. Document Upload

Upload PDFs and images through drag-and-drop or file picker.

Supported file types: PDF, PNG, JPG, JPEG.

2. Text Extraction

PDF Parsing: Extracts structured text using a PDF parser.

OCR for Images: Uses Tesseract.js to extract text from scanned or photographed documents.

3. User Experience

Loading indicators while processing files

Clean UI

Basic error handling for incorrect or corrupted files

🛠️ Tech Stack
Layer Technology
Frontend React (Vite) / HTML / CSS / JS
Backend Node.js + Express
PDF Parsing pdf-parse
OCR Engine tesseract.js

📁 Project Structure
/
├── server/
│ ├── server.js
│ ├── routes/upload.js
│ ├── services/pdfParser.js
│ ├── services/ocr.js
│ └── README.md
├── client/
│ ├── src/
│ ├── public/
│ └── package.json
└── README.md

✔ node_modules, build folders, and sensitive files are excluded as per submission rules.

▶️ Installation & Running
Backend
cd server
npm install
npm start

Frontend
cd client
npm install
npm run dev

Access the application in your browser at the printed local URL.

🌐 Live Demo

Hosted URL: comming soon

📦 Submission Checklist (Followed)

Public GitHub repository

Branch name: main

No unnecessary dependencies

No node_modules or build artifacts

Repository is downloadable

App runs without errors

Minimal, clean project structure

🧠 Approach (Under 200 Words)

The Social Media Content Analyzer is built to efficiently extract text from uploaded documents. The backend uses Express to receive files and identify whether the uploaded file is a PDF or an image. For PDFs, pdf-parse extracts structured text. For images, tesseract.js performs OCR to convert scanned or photographed text into readable output. Both extracted outputs are sent back to the frontend for display.
The frontend is intentionally simple, focusing on core functionality within the allowed timeframe. Drag-and-drop support, loading states, and error feedback ensure smooth user experience. The project follows all submission rules—minimal dependencies, lean structure, no unnecessary files, and production-ready code. This approach emphasizes problem-solving, clarity, and maintainability.

📬 Final Submission

GitHub Link: [co](https://github.com/rtlavkush07/Social-Media-Content-Analyzer)

Live Application: comming soon
