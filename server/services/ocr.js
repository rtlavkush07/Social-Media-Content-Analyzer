import Tesseract from "tesseract.js";

export default async function extractOCR(filePath) {
  const result = await Tesseract.recognize(filePath, "eng");
  return result.data.text;
}
