import express from "express";
import { sendContactEmail } from "../src/utils/email.js";

const app = express();

// SUPER simple CORS - handle OPTIONS first
app.use((req, res, next) => {
  // Allow your specific frontend origin
  res.header(
    "Access-Control-Allow-Origin",
    "https://personal-website-client-1fse5g8vi-karins-projects-a8926f87.vercel.app"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Origin", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());

app.post("/", async (req, res) => {
  // Your existing contact logic here
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
