export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function apiRequest<TResponse = unknown>(
  method: HttpMethod,
  path: string,
  body?: unknown
): Promise<TResponse> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body && ["POST", "PUT", "PATCH"].includes(method)) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${path}`, options);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API ${response.status}: ${text}`);
  }
  try {
    return (await response.json()) as TResponse;
  } catch (error) {
    console.error("API request failed:", error);
    return {} as TResponse;
  }
}
