import mongoose from "mongoose";

export const ImageSchema = new mongoose.Schema({
  url: String,
  caption: String,
  alt: String,
  thumbnailUrl: String,
  hotspotAnnotations: [
    {
      x: Number,
      y: Number,
      note: String,
    },
  ],
});
