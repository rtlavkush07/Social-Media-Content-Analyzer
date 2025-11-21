import Tesseract from "tesseract.js";

async function extractOCR(filePath) {
  const result = await Tesseract.recognize(filePath, "eng");
  return result.data.text;
}

export default extractOCR;
