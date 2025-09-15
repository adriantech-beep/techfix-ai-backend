import { validationResult } from "express-validator";
import Guide from "../model/Guide.js";
import HttpError from "../model/HttpError.js";

export const createGuide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const {
    title,
    deviceType,
    brand,
    model,
    summary,
    difficulty,
    estimatedTimeMinutes,
    tools,
    parts,
    steps,
    published,
    version,
    author,
  } = req.body;

  let parsedSteps = steps;
  if (typeof parsedSteps === "string") {
    parsedSteps = JSON.parse(parsedSteps);
  }
  if (!Array.isArray(parsedSteps) || parsedSteps.length === 0) {
    return next(new HttpError("Guide must have at least one step.", 400));
  }

  try {
    const newGuide = new Guide({
      title,
      deviceType,
      brand,
      model,
      summary,
      difficulty,
      estimatedTimeMinutes,
      tools,
      parts,
      steps,
      published,
      version,
      author,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedGuide = await newGuide.save();
    res.status(201).json(savedGuide);
  } catch (err) {
    console.error(err);
    next(new HttpError("Creating guide failed, please try again later.", 500));
  }
};

export const getGuides = async (req, res, next) => {
  try {
    const guides = await Guide.find();

    const formatted = guides.map((guide) => {
      const obj = guide.toObject();
      obj.id = obj._id.toString();
      return obj;
    });

    res.status(200).json({ guides: formatted });
  } catch (err) {
    res.status(500).json({ message: "Fetching guides failed." });
  }
};
