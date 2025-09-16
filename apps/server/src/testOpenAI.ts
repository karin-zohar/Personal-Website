import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const MAX_TOKENS = parseInt(process.env.OPENAI_MAX_TOKENS || "500");

async function test() {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "user", content: "Say hello in a friendly way." }
            ],
            max_tokens: MAX_TOKENS
        });

        console.log("Reply from OpenAI:", response.choices[0]?.message.content);
    } catch (err: any) {
        if (err.code === "insufficient_quota" || err.status === 429) {
            console.error("OpenAI quota exceeded or billing required. No tokens used.");
        } else {
            console.error("Error calling OpenAI:", err);
        }
    }
}

test();
