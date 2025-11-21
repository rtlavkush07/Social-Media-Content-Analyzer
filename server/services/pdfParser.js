import fs from "fs";
import * as pdfParse from "pdf-parse";

async function extractPDFText(filePath) {
  const fileBuffer = fs.readFileSync(filePath);

  // pdfParse default function ko call karna padta hai
  const result = await pdfParse.default(fileBuffer);

  return result.text;
}

export default extractPDFText;
