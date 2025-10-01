import express from "express";
import { upload, uploadToCloudinary } from "../controllers/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file" });

    const { guideId } = req.body;
    const folder = guideId ? `tech-fix-guides/${guideId}` : "tech-fix-guides";

    const result = await uploadToCloudinary(
      req.file.buffer,
      req.file.originalname,
      folder
    );

    return res.json({ url: result.secure_url });
  } catch (err) {
    next(err);
  }
});

export default router;
