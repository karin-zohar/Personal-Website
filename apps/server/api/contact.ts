import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sendContactEmail } from "../src/utils/email.js";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // Get the origin from the request
  const origin = request.headers.origin;

  // Allow ALL Vercel preview domains
  if (origin && origin.endsWith(".vercel.app")) {
    response.setHeader("Access-Control-Allow-Origin", origin);
  }

  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  response.setHeader("Access-Control-Max-Age", "86400");
  response.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle OPTIONS request
  if (request.method === "OPTIONS") {
    return response.status(200).end();
  }

  // Handle POST request
  if (request.method === "POST") {
    console.log("POST request received:", request.body);

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
