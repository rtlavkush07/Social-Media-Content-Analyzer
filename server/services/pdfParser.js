// services/pdfParser.js

import fs from "fs/promises"; // 👈 Use non-blocking fs
import * as pdfParse from "pdf-parse";

/**
 * Extracts text from a PDF given a file path (string) or a file buffer (Buffer).
 * @param {string | Buffer} source - The path to the PDF file or a Buffer containing the PDF data.
 * @returns {Promise<string>} The extracted text content of the PDF.
 */
export default async function extractPDFText(source) {
  let fileBuffer;
if (source instanceof Buffer) { 
    fileBuffer = source;
  }
  // --- Step 1: Get the Buffer (Non-blocking I/O) ---
  if (typeof source === 'string') {
    try {
      // Non-blocking file read
      fileBuffer = await fs.readFile(source); 
    } catch (error) {
      console.error("Error reading PDF file:", error);
      throw new Error("Could not read the PDF file from disk.");
    }
  } else if (source instanceof Buffer) {
    fileBuffer = source;
  } else {
    throw new Error("Invalid source type provided to extractPDFText.");
  }

  // --- Step 2: Parse the Buffer ---
  try {
    // 💥 FIX: Correctly access the parsing function 
    // The main function might be on the default export or the object root.
    const parserFunction = pdfParse.default || pdfParse; 
    
    // Check again to ensure it is callable
    if (typeof parserFunction !== 'function') {
        throw new Error("pdf-parse function is not callable. Check library import.");
    }

    const data = await parserFunction(fileBuffer);
    return data.text;
  } catch (error) {
    console.error("PDF Parse specific error:", error.message);
    throw error;
  }
}