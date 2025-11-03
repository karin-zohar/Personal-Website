export default function handler(req, res) {
  res.json({
    status: "healthy",
    message: "API route is working!",
    timestamp: new Date().toISOString(),
  });
}
