export interface HealthResponse {
  status: string;
  message: string;
  timestamp: string;
}

export function handleHealth(): HealthResponse {
  return {
    status: "healthy",
    message: "API route is working!",
    timestamp: new Date().toISOString(),
  };
}
