import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import aiRoutes from "./routes/aiRoutes.js";
import guideRoutes from "./routes/guideRoutes.js";
import mongoose from "mongoose";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "TechFix AI Backend",
    apiKeyLoaded: !!process.env.GEMINI_API_KEY,
  });
});

app.use("/api/guides", guideRoutes);

app.use("/api", aiRoutes);

app.use("/api/upload", uploadRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
