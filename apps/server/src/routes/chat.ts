import OpenAI from "openai";

interface ChatRequest {
  prompt: string;
}

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
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = response.choices?.[0]?.message?.content ?? "";
    return { reply };
  } catch (err) {
    console.error("Chat error:", err);
    return { error: "server error" };
  }
}
