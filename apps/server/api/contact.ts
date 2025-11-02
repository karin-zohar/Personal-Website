import express from "express";
import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { sendContactEmail } from "../src/utils/email.js";

dotenv.config();

const app = express();

// Manual CORS middleware to handle Vercel preview deployments
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;

  const allowedOrigins: (string | RegExp)[] = [
    "http://localhost:5173",
    "http://localhost:3000",
    /\.vercel\.app$/,
    /\.vercel\.app:\d+$/,
    /-karins-projects-a8926f87\.vercel\.app$/,
  ];

  if (origin) {
    const isAllowed = allowedOrigins.some((pattern) => {
      if (typeof pattern === "string") return origin === pattern;
      if (pattern instanceof RegExp) return pattern.test(origin);
      return false;
    });

    if (isAllowed) res.setHeader("Access-Control-Allow-Origin", origin);
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

interface ContactRequestBody {
  name?: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
}

// Contact endpoint with strict type handling
app.post(
  "/",
  async (req: Request<{}, {}, ContactRequestBody>, res: Response) => {
    console.log("Contact endpoint hit with body:", req.body);

    const { name, email, message, phone, company } = req.body;

    if (!email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Create a new object with only defined values
      const emailData: Record<string, string> = {
        email,
        message,
      };

      // Only add optional fields if they exist and are not empty
      if (name && name.trim()) emailData.name = name;
      if (phone && phone.trim()) emailData.phone = phone;
      if (company && company.trim()) emailData.company = company;

      // Use type assertion if sendContactEmail expects ContactFormData
      await sendContactEmail(emailData as any);

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

export default app;
