// import express from "express";
// import cors from "cors";
// import OpenAI from "openai";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "http://localhost:3000",
//       "https://personal-website-client.vercel.app",
//       /\.vercel\.app$/,
//     ],
//     methods: ["GET", "POST", "OPTIONS"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// app.options("*", cors());
// app.use(express.json());

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// app.post("/", async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     if (!prompt) return res.status(400).json({ error: "prompt required" });

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }],
//     });

//     const reply = response.choices?.[0]?.message?.content ?? "";
//     res.json({ reply });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "server error" });
//   }
// });

// app.options("/", cors());

// module.exports = app;

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { setVercelCorsHeaders } from "../src/middleware/cors.ts";
import { handleChat } from "../src/routes/chat.ts";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setVercelCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const result = await handleChat(req.body);

  if (result.error) {
    return res
      .status(result.error === "prompt required" ? 400 : 500)
      .json(result);
  }

  return res.json(result);
}
