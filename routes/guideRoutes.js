import express from "express";
import { createGuide, getGuides } from "../controllers/guideControllers.js";

const router = express.Router();

router.post("/", createGuide);
router.get("/get-guides", getGuides);
export default router;
