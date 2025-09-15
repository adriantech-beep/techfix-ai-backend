import express from "express";
import { createAI } from "../controllers/aiController.js";

const router = express.Router();

router.post("/diagnose", createAI);

export default router;
