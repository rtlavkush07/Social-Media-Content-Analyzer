import express from "express";
import multer from "multer";
import extractPDFText from "../services/pdfParser.js";
import extractOCR from "../services/ocr.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temp storage

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const isPDF = file.mimetype === "application/pdf";
    const isImage = file.mimetype.startsWith("image/");

    let text = "";

    if (isPDF) {
      text = await extractPDFText(file.path); // extract text
    } else if (isImage) {
      text = await extractOCR(file.path); // OCR
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    res.json({ text });

  } catch (err) {
    console.error("Error processing file:", err);
    res.status(500).json({ error: "Processing failed" });
  }
});

export default router;
