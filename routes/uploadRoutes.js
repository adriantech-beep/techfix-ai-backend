import express from "express";
import { upload, uploadToCloudinary } from "../controllers/upload.js";

const router = express.Router();

// POST /api/upload  (field name: "image")
router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file" });

    const result = await uploadToCloudinary(
      req.file.buffer,
      req.file.originalname,
      "tech-fix-guides"
    );

    return res.json({ url: result.secure_url });
  } catch (err) {
    next(err);
  }
});

// router.post("/upload", upload.single("image"), async (req, res) => {
//   try {
//     const { buffer, originalname } = req.file;

//     // Call helper
//     const uploadedImage = await uploadToCloudinary(
//       buffer,
//       originalname,
//       "tech-fix-guides"
//     );

//     // ✅ Return schema-ready object
//     res.json(uploadedImage);
//   } catch (err) {
//     console.error("Upload failed:", err);
//     res.status(500).json({ error: "Upload failed" });
//   }
// });

export default router;
