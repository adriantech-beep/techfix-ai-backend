import mongoose from "mongoose";
import { ImageSchema } from "../schemas/ImageSchema";

export default mongoose.model("Image", ImageSchema);
