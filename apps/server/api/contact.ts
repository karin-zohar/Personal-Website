import express from "express";
import cors from "cors";
import { sendContactEmail } from "../src/utils/email.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL || "",
  /\.vercel\.app$/,
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.post("/", async (req, res) => {
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
