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

const isKarinRelated = (input: string) => {
  const keywords = [
    "karin",
    "her",
    "she",
    "experience",
    "skills",
    "background",
    "projects",
    "frontend",
    "fullstack",
    "react",
    "work",
    "cv",
    "resume",
    "קארין",
    "היא",
    "ניסיון",
    "פרוייקטים",
    "פרויקטים",
    "עבודה",
  ];

  return keywords.some((k) => input.toLowerCase().includes(k));
};

export async function handleChat(
  body: ChatRequest
): Promise<{ reply?: string; error?: string }> {
  try {
    const { prompt, history } = body;
    if (!prompt) {
      return { error: "prompt required" };
    }

    if (!isKarinRelated(prompt)) {
      return {
        reply:
          "I can only answer questions about Karin and her professional background. Feel free to ask about her skills, experience, or projects.",
      };
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

    // Usage tracking
    const usage = response.usage;
    if (usage && 'prompt_tokens_details' in usage) {
      console.log(`Cached tokens: ${usage.prompt_tokens_details?.cached_tokens || 0}`);
      console.log(`Total prompt tokens: ${usage.prompt_tokens}`);
    }

    const reply = response.choices?.[0]?.message?.content ?? "";
    return { reply };
  } catch (err) {
    console.error("Chat error:", err);
    return { error: "server error" };
  }
}
