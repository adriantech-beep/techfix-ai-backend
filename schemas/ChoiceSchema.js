import mongoose from "mongoose";

export const ChoiceSchema = new mongoose.Schema({
  label: String,
  nextStepIndex: Number,
});
