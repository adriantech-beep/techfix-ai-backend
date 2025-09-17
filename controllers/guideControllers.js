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
    const guides = await Guide.find(query).sort({ createdAt: -1 });
    res.json(guides);
  } catch (err) {
    res.status(500).json({ message: "Error fetching guides" });
  }
};

export const deleteGuide = async (req, res, next) => {
  const guideId = req.params.id;

  try {
    const guide = await Guide.findById(guideId);

    if (!guide) {
      return res.status(404).json({ message: "Could not find guide" });
    }

    await Guide.deleteOne({ _id: guideId });

    return res.status(200).json({ message: "Guide deleted successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Something went wrong, could not delete guide" });
  }
};

export const updateGuide = async (req, res, next) => {
  try {
    const guideId = req.params.id;
    const updatedGuide = await Guide.findByIdAndUpdate(guideId, req.body, {
      new: true,
    });

    if (!updatedGuide)
      return res.status(404).json({ message: "Guide not found" });

    res.status(200).json(updatedGuide);
  } catch (error) {
    next(error);
  }
};
