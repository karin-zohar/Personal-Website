import type { VercelRequest, VercelResponse } from "@vercel/node";
import { setVercelCorsHeaders } from "../src/middleware/cors";
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
