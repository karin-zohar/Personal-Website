// import app from "../dist/index.js";

// export default app;

import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";
import serverless from "serverless-http";
import { sendContactEmail } from "../src/utils/email.js"; // note the .js extension for ESM

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173", // local dev
  "http://localhost:3000",
  process.env.CLIENT_URL || "", // deployed frontend
  /\.vercel\.app$/, // Regex for all vercel preview URLs
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const hostname = new URL(origin).hostname;
      if (allowedOrigins.includes(origin) || hostname.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --- Chatbot ---
app.post("/api/agent", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "prompt required" });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = response.choices?.[0]?.message?.content ?? "";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

// --- Contact ---
app.post("/api/contact", async (req, res) => {
  const { name, email, message, phone, company } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await sendContactEmail({ name, email, message, phone, company });
    res.json({ success: true });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// export default app;
export default serverless(app);

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT ?? 4000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}
