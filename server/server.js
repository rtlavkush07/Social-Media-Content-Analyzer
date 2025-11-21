import express from "express";
import cors from "cors";
import uploadRoute from "./routes/upload.js";
// initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// Routes from upload
app.use("/api", uploadRoute);
// port for server
const PORT = 5000;
// listen to the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
