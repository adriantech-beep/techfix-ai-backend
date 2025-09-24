// import dotenv from "dotenv";

// import { GoogleGenerativeAI } from "@google/generative-ai";
// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// export const createAI = async (req, res, next) => {
//   try {
//     const { description } = req.body;

//     if (!description || description.trim() === "") {
//       return res.status(400).json({ error: "Description is required" });
//     }

//     const prompt = `
// You are TechFix AI — a professional cellphone and laptop repair mentor for beginners.
// Follow these rules:
// 1. Ask clarifying questions if the problem is unclear.
// 2. Use simple but accurate explanations.
// 3. Always start with easiest/safest checks first.
// 4. Include:
//    - Possible causes
//    - Step-by-step repair instructions
//    - Tools needed
//    - Safety precautions
// 5. Tailor to the specific device model if mentioned.
// 6. Warn if repair is risky or requires advanced skill.

// User issue: ${description}
//     `;

//     const result = await model.generateContent(prompt);
//     const text = result.response.text();

//     res.status(200).json({ result: text });
//   } catch (error) {
//     console.error("AI Service Error:", error);
//     res.status(500).json({ error: "AI service error" });
//   }
// };

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
