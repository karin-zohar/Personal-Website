import express from "express";
import dotenv from "dotenv";
import { corsMiddleware } from "./middleware/cors.js";
import { handleChat } from "./routes/chat.js";
import { handleContact } from "./routes/contact.js";
import { handleHealth } from "./routes/health.js";

dotenv.config();

const app = express();

app.use(corsMiddleware);
app.use(express.json());

// Health endpoint
app.get("/api/health", (req, res) => {
  return res.json(handleHealth());
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  const result = await handleChat(req.body);

  if (result.error) {
    return res
      .status(result.error === "prompt required" ? 400 : 500)
      .json(result);
  }

  return res.json(result);
});

// Contact endpoint
app.post("/api/contact", async (req, res) => {
  const result = await handleContact(req.body);

  if (result.error) {
    return res
      .status(result.error === "Missing required fields" ? 400 : 500)
      .json(result);
  }

  return res.json(result);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`   - Chat:    POST http://localhost:${PORT}/api/chat`);
  console.log(`   - Contact: POST http://localhost:${PORT}/api/contact`);
  console.log(`   - Health:  GET  http://localhost:${PORT}/api/health`);
});
