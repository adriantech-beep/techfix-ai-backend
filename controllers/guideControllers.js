import { validationResult } from "express-validator";
import Guide from "../model/Guide.js";
import HttpError from "../model/HttpError.js";
import { GuideService } from "../services.js/GuideService.js";

const guideService = new GuideService();

export class GuideController {
  async create(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "Invalid inputs passed, please check your data." });
    }

    let {
      title,
      deviceType,
      brand,
      model,
      summary,
      difficulty,
      estimatedTimeMinutes,
      tools,
      parts,
      symptom,
      steps,
      published,
      version,
      author,
    } = req.body;

    if (typeof steps === "string") {
      try {
        steps = JSON.parse(steps);
      } catch {
        return next(new HttpError("Invalid steps format", 400));
      }
    }

    if (!Array.isArray(steps) || steps.length === 0) {
      return res
        .status(400)
        .json({ message: "Guide must have atleast one step" });
    }

    try {
      const newGuide = {
        title,
        deviceType,
        brand,
        model,
        summary,
        difficulty,
        estimatedTimeMinutes,
        tools,
        parts,
        symptom,
        steps,
        published,
        version,
        author,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const savedGuide = await guideService.createGuide(newGuide);
      res.status(201).json(savedGuide);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Creating guide failed, please try again later." });
    }
  }

  async fetch(req, res, next) {
    const { search } = req.query;
    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } },
            { model: { $regex: search, $options: "i" } },
            { tools: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    try {
      const guides = await guideService.getAllGuides(query);
      return res.status(200).json(guides);
    } catch (err) {
      res.status(500).json({ message: "Error fetching guides" });
    }
  }

  async delete(req, res, next) {
    const guideId = req.params.id;

    try {
      const guide = await Guide.findById(guideId);

      if (!guide) {
        return res.status(404).json({ message: "Could not find guide" });
      }

      await guideService.deleteGuide({ _id: guideId });

      return res.status(200).json({ message: "Guide deleted successfully" });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Something went wrong, could not delete guide" });
    }
  }

  async update(req, res, next) {
    try {
      const guideId = req.params.id;
      const updatedGuide = await guideService.updateGuide(guideId, req.body, {
        new: true,
      });

      if (!updatedGuide)
        return res.status(404).json({ message: "Guide not found" });

      res.status(200).json(updatedGuide);
    } catch (error) {
      next(error);
    }
  }
}
