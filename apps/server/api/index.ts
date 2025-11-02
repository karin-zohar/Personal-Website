// import app from "../dist/index.js";

// export default app;

import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL || "",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
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
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Email function
async function sendContactEmail({ name, email, message, phone, company }: any) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nCompany: ${
      company || "N/A"
    }\n\nMessage:\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Phone:</strong> ${phone || "N/A"}</p>
           <p><strong>Company:</strong> ${company || "N/A"}</p>
           <p><strong>Message:</strong></p>
           <p>${message}</p>`,
  });
}

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

export default app;
