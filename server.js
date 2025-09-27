import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();

import express from "express";
import cors from "cors";
import aiRoutes from "./routes/aiRoutes.js";
import guideRoutes from "./routes/guideRoutes.js";
import mongoose from "mongoose";
import uploadRoutes from "./routes/uploadRoutes.js";
import authGoogleRoutes from "./routes/authGoogleRoutes.js";
import authUserRoutes from "./routes/authUserRoutes.js";

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  helmet({
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
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

app.use("/api/chat", aiRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/auth", authGoogleRoutes);

app.use("/api/auth", authUserRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
