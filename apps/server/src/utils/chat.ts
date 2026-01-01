import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MAX_TOKENS = parseInt(process.env.OPENAI_MAX_TOKENS || "500");

export interface ChatRequest {
  prompt: string;
}

export const chatWithAI = async (data: ChatRequest): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: data.prompt }],
      max_tokens: MAX_TOKENS,
    });

    return response.choices[0]?.message?.content || "";
  } catch (err: any) {
    if (err.code === "insufficient_quota" || err.status === 429) {
      throw new Error("OpenAI quota exceeded or billing required.");
    }

    throw new Error(
      "Error calling OpenAI: " + (err.message || "Unknown error")
    );
  }
};
