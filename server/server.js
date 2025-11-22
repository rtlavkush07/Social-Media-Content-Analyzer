import express from "express";
import cors from "cors";
import uploadRoute from "./routes/upload.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", uploadRoute); // /api/upload

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
