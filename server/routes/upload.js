import express from "express";
import multer from "multer";
import pdfParser from "../services/pdfParser.js";
import ocr from "../services/ocr.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
 console.log(req.file);
    res.json({ message: "File uploaded!" });
    if (!file) { // if not file contains
      return res.status(400).json({ error: "No file uploaded" });
    }
// check which type of file is uploaded
    const isPDF = file.mimetype === "application/pdf";
    const isImage = file.mimetype.startsWith("image/");

    let extractedText = "";

    if (isPDF) {
      extractedText = await pdfParser(file.path);
    } else if (isImage) {
      extractedText = await ocr(file.path);
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    return res.json({ text: extractedText });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Processing failed" });
  }
});

export default router;
