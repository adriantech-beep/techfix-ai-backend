import { geminiModel } from "../config/geminiClient.js";
export const askGemini = async (query, history, systemPrompt) => {
  const messages = [
    {
      role: "user",
      parts: [{ text: systemPrompt }],
    },
    ...history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.message }],
    })),
    {
      role: "user",
      parts: [{ text: query }],
    },
  ];

  const result = await geminiModel.generateContent({ contents: messages });
  return result.response.text();
};
