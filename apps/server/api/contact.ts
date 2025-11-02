import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sendContactEmail } from "../src/utils/email.js";

dotenv.config();

const app = express();

// More permissive CORS for Vercel preview deployments
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow all Vercel preview deployments and production
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        /\.vercel\.app$/,
        /\.vercel\.app:\d+$/, // Include ports if any
      ];

      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.some((pattern) => {
          if (typeof pattern === "string") {
            return origin === pattern;
          } else if (pattern instanceof RegExp) {
            return pattern.test(origin);
          }
          return false;
        })
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json());

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

export default app;
