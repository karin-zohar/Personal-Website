import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sendContactEmail } from "../src/utils/email.js";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // CORS headers
  const origin = request.headers.origin;
  if (origin && origin.endsWith(".vercel.app")) {
    response.setHeader("Access-Control-Allow-Origin", origin);
  }
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle OPTIONS
  if (request.method === "OPTIONS") {
    return response.status(200).end();
  }

  // Handle POST
  if (request.method === "POST") {
    console.log("POST request body:", request.body);

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
