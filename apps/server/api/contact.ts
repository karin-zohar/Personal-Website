// import type { VercelRequest, VercelResponse } from "@vercel/node";
// import { sendContactEmail } from "../src/utils/email.js";

// export default async function handler(
//   request: VercelRequest,
//   response: VercelResponse
// ) {
//   // Get the origin from the request
//   const origin = request.headers.origin;

//   // Define allowed origins
//   const allowedOrigins = [
//     "https://www.karin-zohar.com",
//     "https://karin-zohar.com",
//     "http://localhost:5173",
//     "http://localhost:3000",
//     /\.vercel\.app$/,
//   ];

//   // Check if origin is allowed
//   const isAllowed = allowedOrigins.some((pattern) => {
//     if (typeof pattern === "string") {
//       return origin === pattern;
//     } else if (pattern instanceof RegExp) {
//       return pattern.test(origin || "");
//     }
//     return false;
//   });

//   // ALWAYS set CORS headers, even for successful responses
//   if (origin && isAllowed) {
//     response.setHeader("Access-Control-Allow-Origin", origin);
//   }
//   response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
//   response.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   response.setHeader("Access-Control-Allow-Credentials", "true");

//   // Handle OPTIONS preflight
//   if (request.method === "OPTIONS") {
//     return response.status(200).end();
//   }

//   // Handle POST request
//   if (request.method === "POST") {
//     const { name, email, message, phone, company } = request.body;

//     if (!email || !message) {
//       return response.status(400).json({ error: "Missing required fields" });
//     }

//     try {
//       await sendContactEmail({ name, email, message, phone, company });
//       return response.json({ success: true });
//     } catch (err) {
//       console.error("Error sending email:", err);
//       // CORS headers are already set above - they'll be included in this response
//       return response.status(500).json({ error: "Failed to send email" });
//     }
//   }

//   return response.status(405).json({ error: "Method not allowed" });
// }

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { setVercelCorsHeaders } from "../src/middleware/cors.ts";
import { handleContact } from "../src/routes/contact.ts";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setVercelCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const result = await handleContact(req.body);

  if (result.error) {
    return res
      .status(result.error === "Missing required fields" ? 400 : 500)
      .json(result);
  }

  return res.json(result);
}
