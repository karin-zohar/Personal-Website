import "dotenv/config";
import {
  SYSTEM_PERSONA_MESSAGES,
  GUARDRAILS,
  RAG_INSTRUCTTIONS,
} from "../../data/chat.data.js";
import { openai } from "../../lib/openai.js";
import { setupRag } from "./rag/setupRag.js";

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
  body: ChatRequest,
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

    const vectorStore = await setupRag();

    // Wait for files to be processed
    if (vectorStore.file_counts.in_progress > 0) {
      console.warn("Warning: Vector store still processing files");
    }

    const historyForApi =
      history && history.length > 0 ? getHistoryForApi(history) : [];
    const systemInstructions = `${GUARDRAILS} 
    ${SYSTEM_PERSONA_MESSAGES} 
    ${RAG_INSTRUCTTIONS} 
    `;

    const response = await openai.responses.create({
      model: "gpt-4o",
      instructions: systemInstructions,
      input: [...historyForApi, { role: "user", content: prompt }],
      tools: [
        {
          type: "file_search",
          vector_store_ids: [vectorStore.id],
          max_num_results: 10,
        },
      ],
      include: ["file_search_call.results"],
      max_output_tokens: MAX_TOKENS,
    });

    // Log for debugging
    if (response.usage) {
      console.log(`Tokens used: ${response.usage.total_tokens}`);
    }

    // Check if file_search was actually called
    if (response.output && Array.isArray(response.output)) {
      const fileSearchCalls = response.output.filter(
        (item: any) => item.type === "file_search_call",
      );

      if (fileSearchCalls.length > 0) {
        console.log(`File search executed ${fileSearchCalls.length} time(s)`);
        fileSearchCalls.forEach((call: any, idx: number) => {
          console.log(
            `  Call ${idx + 1}: ${call.results?.length || 0} results`,
          );
        });
      } else {
        console.warn("WARNING: file_search tool was not called by the model");
      }
    }

    const reply = response.output_text ?? "";

    if (!reply) {
      console.error("No output text in response");
      return { error: "No response generated" };
    }

    return { reply };
  } catch (err) {
    console.error("Chat error:", err);
    return { error: "server error" };
  }
}
