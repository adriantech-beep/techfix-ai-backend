import mongoose from "mongoose";

export const ChoiceSchema = new mongoose.Schema({
  label: String, // e.g. "Yes — boots to BIOS"
  nextStepIndex: Number, // index in steps array to jump to
});
