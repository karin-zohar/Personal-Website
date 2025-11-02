import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sendContactEmail } from "../src/utils/email.js";

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://personal-website-client.vercel.app",
      /\.vercel\.app$/,
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Handle OPTIONS preflight explicitly
app.options("*", cors());

app.use(express.json());

// Handle POST requests
app.post("/", async (req, res) => {
  console.log("Contact endpoint hit");
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

// Also handle OPTIONS specifically for this endpoint
app.options("/", cors());

// Export the app
module.exports = app;
