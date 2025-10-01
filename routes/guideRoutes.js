import express from "express";
import { GuideController } from "../controllers/guideControllers.js";

const router = express.Router();
const controller = new GuideController();

router.post("/", (req, res, next) => controller.create(req, res, next));
router.get("/get-guides", (req, res, next) => controller.fetch(req, res, next));
router.delete("/:id", (req, res, next) => controller.delete(req, res, next));
router.put("/:id", (req, res, next) => controller.update(req, res, next));
export default router;
