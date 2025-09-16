import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/agent", async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) return res.status(400).json({ error: "prompt required" });

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // choose a model available to you
            messages: [{ role: "user", content: prompt }]
        });

        const reply = response.choices?.[0]?.message?.content ?? "";
        res.json({ reply });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "server error" });
    }
});

const port = process.env.PORT ?? 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
