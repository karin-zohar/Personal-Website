import type { VercelRequest, VercelResponse } from "@vercel/node";
import { setVercelCorsHeaders } from "../src/middleware/cors.ts";
import { handleChat } from "../src/routes/chat.ts";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setVercelCorsHeaders(req, res);
  console.log("req.method: ", req.method);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const result = await handleChat(req.body);

  if (result.error) {
    return res
      .status(result.error === "prompt required" ? 400 : 500)
      .json(result);
  }

  return res.json(result);
}
