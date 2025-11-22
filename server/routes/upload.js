import express from "express";
import multer from "multer";
// We no longer need 'fs/promises' because we aren't deleting files manually!
import extractPDFText from "../services/pdfParser.js";
import extractOCR from "../services/ocr.js";

const router = express.Router();

// 💡 CHANGE 1: Use memory storage instead of disk storage
const upload = multer({ storage: multer.memoryStorage() }); 

router.post("/upload", upload.single("file"), async (req, res) => {
  // const filePath = req.file?.path; // No longer needed
  
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const isPDF = file.mimetype === "application/pdf";
    const isImage = file.mimetype.startsWith("image/");
    
    // 💡 CHANGE 2: The source is now the file Buffer
    const fileSource = file.buffer; 
    
    let text = "";

    if (isPDF) {
      // Pass the Buffer to the parser
      text = await extractPDFText(fileSource); 
    } else if (isImage) {
      // Pass the Buffer to the OCR service
      text = await extractOCR(fileSource); 
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    res.json({ text });

  } catch (err) {
    console.error("Critical Server Error:", err);
    // The previous 'finally' block for cleanup is now obsolete
    res.status(500).json({ error: "Processing failed" });
  } 
});

export default router;