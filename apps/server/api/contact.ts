import express from "express";
import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { sendContactEmail } from "../src/utils/email.js";

dotenv.config();

const app = express();

// Manual CORS middleware to handle Vercel preview deployments
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;

  // Allow all Vercel preview domains and local development
  const allowedOrigins: (string | RegExp)[] = [
    "http://localhost:5173",
    "http://localhost:3000",
    /\.vercel\.app$/,
    /\.vercel\.app:\d+$/,
    /-karins-projects-a8926f87\.vercel\.app$/,
  ];

  // Check if origin is allowed
  if (origin) {
    const isAllowed = allowedOrigins.some((pattern) => {
      if (typeof pattern === "string") {
        return origin === pattern;
      } else if (pattern instanceof RegExp) {
        return pattern.test(origin);
      }
      return false;
    });

    if (isAllowed) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept, Origin"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "86400");

  if (req.method === "OPTIONS") {
    console.log("OPTIONS preflight handled successfully");
    return res.status(200).end();
  }

  next();
});

app.use(express.json());

// Interface for contact request body
interface ContactRequestBody {
  name?: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
}

// Contact endpoint
app.post(
  "/",
  async (req: Request<{}, {}, ContactRequestBody>, res: Response) => {
    console.log("Contact endpoint hit with body:", req.body);

    const { name, email, message, phone, company } = req.body;

    if (!email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Handle optional properties by passing only what exists
      const emailData = {
        name: name || undefined,
        email,
        message,
        phone: phone || undefined,
        company: company || undefined,
      };

      await sendContactEmail(emailData);
      console.log("Email sent successfully");
      res.json({ success: true });
    } catch (err) {
      console.error("Error sending email:", err);
      res.status(500).json({ error: "Failed to send email" });
    }
  }
);

// Add a GET endpoint for testing
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Contact API is working",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// 404 handler for this specific endpoint
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
});

export default app;
