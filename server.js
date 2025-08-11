import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/api/diagnose", async (req, res) => {
  try {
    const { description } = req.body;

    const prompt = `
You are TechFix AI — a professional cellphone and laptop repair mentor for beginners.
Follow these rules:
1. Ask clarifying questions if the problem is unclear.
2. Use simple but accurate explanations.
3. Always start with easiest/safest checks first.
4. Include:
   - Possible causes
   - Step-by-step repair instructions
   - Tools needed
   - Safety precautions
5. Tailor to the specific device model if mentioned.
6. Warn if repair is risky or requires advanced skill.

User issue: ${description}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ result: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI service error" });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
