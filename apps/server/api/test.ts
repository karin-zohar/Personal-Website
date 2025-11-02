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

  response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
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

  if (request.method === "GET") {
    console.log("GET request received:", request.body);
  }

  return response.status(405).json({ error: "Method not allowed" });
}
