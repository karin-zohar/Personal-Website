import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sendContactEmail } from "../src/utils/email.js";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // Get the origin from the request
  const origin = request.headers.origin;

  // Allow all Vercel preview deployments and production
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://personal-website-client.vercel.app", // production
    /-karins-projects-a8926f87\.vercel\.app$/, // all your preview deployments
  ];

  // Check if the request origin is allowed
  const isAllowed = allowedOrigins.some((pattern) => {
    if (typeof pattern === "string") {
      return origin === pattern;
    } else if (pattern instanceof RegExp) {
      return pattern.test(origin || "");
    }
    return false;
  });

  // Set CORS headers only for allowed origins
  if (origin && isAllowed) {
    response.setHeader("Access-Control-Allow-Origin", origin);
  }

  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Access-Control-Max-Age", "86400");

  // Handle OPTIONS request
  if (request.method === "OPTIONS") {
    return response.status(200).end();
  }

  // Handle POST request
  if (request.method === "POST") {
    const { name, email, message, phone, company } = request.body;

    if (!email || !message) {
      return response.status(400).json({ error: "Missing required fields" });
    }

    try {
      await sendContactEmail({ name, email, message, phone, company });
      return response.json({ success: true });
    } catch (err) {
      console.error("Error sending email:", err);
      return response.status(500).json({ error: "Failed to send email" });
    }
  }

  // Handle other methods
  return response.status(405).json({ error: "Method not allowed" });
}
