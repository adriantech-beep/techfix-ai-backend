import mongoose from "mongoose";
import { StepSchema } from "../schemas/StepSchema";

export default mongoose.model("Step", StepSchema);
