import fs from "fs";
import * as pdfParse from "pdf-parse";

// Extract text from PDF
export default async function extractPDFText(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const data = await pdfParse.default(fileBuffer);
  return data.text;
}
