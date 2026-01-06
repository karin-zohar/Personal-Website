import OpenAI from "openai";
import {
  SYSTEM_PERSONA_MESSAGES,
  KARIN_PROFILE_CONTEXT,
} from "../data/chat.data.js";

export type PromptAndReply = {
  prompt: string;
  reply?: string;
};

interface ChatRequest {
  prompt: string;
  history: PromptAndReply[];
}

type MessageForAPI = { role: "user" | "assistant"; content: string };

const MAX_TOKENS = parseInt(process.env.OPENAI_MAX_TOKENS || "500");

const getHistoryForApi = (messages: PromptAndReply[]): MessageForAPI[] => {
  return messages.flatMap((message): MessageForAPI | MessageForAPI[] => {
    const userMessage: MessageForAPI = {
      role: "user",
      content: message.prompt,
    };
    return message.reply
      ? [userMessage, { role: "assistant", content: message.reply }]
      : [userMessage];
  });
};

export async function handleChat(
  body: ChatRequest
): Promise<{ reply?: string; error?: string }> {
  try {
    const { prompt, history } = body;
    if (!prompt) {
      return { error: "prompt required" };
    }

    const historyForApi =
      history && history.length > 0 ? getHistoryForApi(history) : [];
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: KARIN_PROFILE_CONTEXT },
        { role: "system", content: SYSTEM_PERSONA_MESSAGES },
        ...historyForApi,
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
