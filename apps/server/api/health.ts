import type { VercelRequest, VercelResponse } from "@vercel/node";
import { setVercelCorsHeaders } from "../src/middleware/cors.js";
import { handleHealth } from "../src/routes/health.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  setVercelCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return res.json(handleHealth());
}
