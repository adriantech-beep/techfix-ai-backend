import mongoose from "mongoose";
import { ChoiceSchema } from "./ChoiceSchema.js";
import { ImageSchema } from "./ImageSchema.js";

export const StepSchema = new mongoose.Schema({
  index: { type: Number, required: true },
  title: String,
  bodyMarkdown: String,
  images: [ImageSchema],
  actionType: {
    type: String,
    enum: ["instruction", "test", "measurement", "decision"],
    default: "instruction",
  },
  expectedOutcome: String,
  warnings: String,
  toolsNeeded: [String],
  // partsNeeded: [
  //   { name: String, partNumber: String, qty: Number, link: String },
  // ],
  // durationMinutes: Number,
  // choices: [ChoiceSchema],
});
