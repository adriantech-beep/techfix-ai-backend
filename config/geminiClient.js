import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// Ensure API key exists
if (!process.env.GEMINI_API_KEY) {
  throw new Error("⚠️ Missing GEMINI_API_KEY in .env");
}

// Recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load TechFix AI system prompt (markdown file)
export const SYSTEM_PROMPT = fs.readFileSync(
  path.join(__dirname, "..", "prompts", "TECHFIX_AI.md"),
  "utf-8"
);

// Setup Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Export Gemini model
export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // swap with "gemini-1.5-pro" if you need
});
