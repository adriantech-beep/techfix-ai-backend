import mongoose from "mongoose";
import { StepSchema } from "../schemas/StepSchema.js";

const GuideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  deviceType: String,
  brand: String,
  model: String,
  summary: String,
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Easy",
  },
  estimatedTimeMinutes: Number,
  tools: [String],
  parts: [{ name: String, partNumber: String, qty: Number, link: String }],
  steps: [StepSchema],
  published: { type: Boolean, default: false },
  version: { type: Number, default: 1 },
  author: String,
  locale: { type: String, default: "en" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

export default mongoose.model("Guide", GuideSchema);
