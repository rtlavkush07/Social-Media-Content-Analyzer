import express from "express";
import multer from "multer";
import { extractPDFText } from "../services/pdfParser.js";
import extractOCR from "../services/ocr.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const mimetype = file.mimetype;
    let text = "";

    // PDF
    if (mimetype === "application/pdf") {
      text = await extractPDFText(file.path);
    }
    // IMAGE (png, jpg, jpeg, webp, etc.)
    else if (mimetype.startsWith("image/")) {
      text = await extractOCR(file.path);
    }
    // unsupported
    else {
      return res.status(400).json({ error: "Only PDF or image allowed" });
    }

    return res.json({ text });

  } catch (err) {
    console.error("Critical upload error:", err);
    return res.status(500).json({ error: "Processing failed" });
  }
});

export default router;
