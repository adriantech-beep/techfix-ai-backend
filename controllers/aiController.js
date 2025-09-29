import dotenv from "dotenv";
dotenv.config();
import { aiService } from "../services.js/aiService.js";

export const createAI = async (req, res) => {
  try {
    const { conversationId, message } = req.body;

    if (!conversationId) {
      return res.status(400).json({ error: "conversationId is required" });
    }
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const result = await aiService.sendMessage(conversationId, message);

    res.json(result);
  } catch (error) {
    console.error("AI Service Error:", error);
    res.status(500).json({ error: "AI service error" });
  }
};
