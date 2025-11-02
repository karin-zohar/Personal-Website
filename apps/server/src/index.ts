import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";
import { sendContactEmail } from "./utils/email.js"; // note the .js extension for ESM

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173", // local dev
  "http://localhost:3000",
  process.env.CLIENT_URL || "", // deployed frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      } // Allow server-to-server or curl requests

      try {
        console.log("CORS request from:", origin);
        const hostname = new URL(origin).hostname;

        if (
          allowedOrigins.includes(origin) ||
          hostname.endsWith(".vercel.app")
        ) {
          callback(null, true);
        } else {
          console.warn("❌ Blocked by CORS:", origin);
          callback(new Error("Not allowed by CORS"));
        }
      } catch (err) {
        callback(new Error("Invalid origin"));
      }
    },
    methods: ["GET", "POST"],
  })
);

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(200);
});
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

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT ?? 4000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}
