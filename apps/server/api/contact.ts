import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sendContactEmail } from "../src/utils/email.js";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // Set CORS headers
  response.setHeader(
    "Access-Control-Allow-Origin",
    "https://personal-website-client-5mx1b8x3u-karins-projects-a8926f87.vercel.app"
  );
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

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
