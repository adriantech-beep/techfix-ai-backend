import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("⚠️ Missing GEMINI_API_KEY in .env");
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const SYSTEM_PROMPT = fs.readFileSync(
  path.join(__dirname, "..", "prompts", "TECHFIX_AI.md"),
  "utf-8"
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
