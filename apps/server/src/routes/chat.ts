import OpenAI from "openai";
import {
  SYSTEM_PERSONA_MESSAGES,
  KARIN_PROFILE_CONTEXT,
} from "../data/chat.data.js";

interface ChatRequest {
  prompt: string;
}

const MAX_TOKENS = parseInt(process.env.OPENAI_MAX_TOKENS || "500");

export async function handleChat(
  body: ChatRequest
): Promise<{ reply?: string; error?: string }> {
  try {
    const { prompt } = body;
    if (!prompt) {
      return { error: "prompt required" };
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: KARIN_PROFILE_CONTEXT },
        { role: "system", content: SYSTEM_PERSONA_MESSAGES },
        { role: "user", content: prompt },
      ],
      max_tokens: MAX_TOKENS,
    });

    const reply = response.choices?.[0]?.message?.content ?? "";
    return { reply };
  } catch (err) {
    console.error("Chat error:", err);
    return { error: "server error" };
  }
}
