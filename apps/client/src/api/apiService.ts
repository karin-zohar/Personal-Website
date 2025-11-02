export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function apiRequest<TResponse = unknown>(
  method: HttpMethod,
  path: string,
  body?: unknown
): Promise<TResponse> {
  const url = `${BASE_URL}${path}`;
  console.log("Making request to:", url, "with method:", method);
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body && ["POST", "PUT", "PATCH"].includes(method)) {
    options.body = JSON.stringify(body);
    console.log("Request body:", body);
  }

  const response = await fetch(`${BASE_URL}${path}`, options);
  console.log("Response status:", response.status);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API ${response.status}: ${text}`);
  }
  try {
    return (await response.json()) as TResponse;
  } catch (error) {
    // 204 No Content etc.
    console.error("API request failed:", error);
    return {} as TResponse;
  }
}
