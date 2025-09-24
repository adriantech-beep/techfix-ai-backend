import { conversationRepository } from "../repositories/conversationRepository.js";
import { searchDbGuide } from "./searchDbGuide.js";
import { askGemini } from "./askGemini.js";
import { SYSTEM_PROMPT } from "../config/geminiClient.js";
import { formatGuideResponse } from "./formatGuideResponse.js";

function isGuideQuery(message) {
  const keywords = ["repair", "replacement", "disassembly", "fix"];
  return keywords.some((word) => message.toLowerCase().includes(word));
}

export const aiService = {
  async sendMessage(conversationId, message) {
    const history = conversationRepository.getHistory(conversationId) || [];

    let reply;

    if (isGuideQuery(message)) {
      const guide = await searchDbGuide(message);
      if (guide) {
        reply = formatGuideResponse(guide);
      }
    }

    if (!reply) {
      const textHistory = history.map((h) => ({
        ...h,
        message:
          typeof h.message === "string" ? h.message : JSON.stringify(h.message),
      }));

      reply = await askGemini(message, textHistory, SYSTEM_PROMPT);
    }

    conversationRepository.addMessage(conversationId, {
      role: "user",
      message,
    });
    conversationRepository.addMessage(conversationId, {
      role: "assistant",
      message: reply,
    });

    return {
      reply,
      history: conversationRepository.getHistory(conversationId),
    };
  },
};
