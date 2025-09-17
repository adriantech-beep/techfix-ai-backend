import express from "express";
import {
  createGuide,
  deleteGuide,
  getGuides,
  updateGuide,
} from "../controllers/guideControllers.js";

const router = express.Router();

router.post("/", createGuide);
router.get("/get-guides", getGuides);
router.delete("/:id", deleteGuide);
router.put("/:id", updateGuide);
export default router;
