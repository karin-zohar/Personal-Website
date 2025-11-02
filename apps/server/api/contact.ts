import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sendContactEmail } from "../src/utils/email.js";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // Set CORS headers FIRST - before any other logic
  const origin = request.headers.origin;
  if (origin && origin.endsWith(".vercel.app")) {
    response.setHeader("Access-Control-Allow-Origin", origin);
  }
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Access-Control-Allow-Credentials", "true");

  // If this is a preflight request, respond immediately
  if (request.method === "OPTIONS") {
    return response.status(200).end();
  }

  // For POST requests, Vercel might be blocking before reaching here
  if (request.method === "POST") {
    console.log("POST request reached the handler!");

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

  return response.status(405).json({ error: "Method not allowed" });
}
