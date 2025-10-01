import { conversationRepository } from "../repositories/conversationRepository.js";
import { searchDbGuide } from "./searchDbGuide.js";
import { askGemini } from "./askGemini.js";
import { SYSTEM_PROMPT } from "../config/geminiClient.js";
import { formatGuideResponse } from "./formatGuideResponse.js";

function detectQueryIntent(message) {
  const lower = message.toLowerCase();

  if (
    /(disassembly|disassemble|teardown|open|step by step|guide|manual)/.test(
      lower
    )
  ) {
    return "disassembly";
  }

  if (
    /(repair|replace|replacement|fix|issue|problem|root cause|why|cause)/.test(
      lower
    )
  ) {
    return "repair";
  }

  return "general";
}

export const aiService = {
  async sendMessage(conversationId, message) {
    const history = conversationRepository.getHistory(conversationId) || [];

    const intent = detectQueryIntent(message);
    let reply;

    if (intent !== "general") {
      const guide = await searchDbGuide(message, intent);
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
