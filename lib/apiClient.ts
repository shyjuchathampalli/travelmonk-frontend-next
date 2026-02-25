import { API_BASE_URL } from "./api";

/**
 * Central API fetch helper
 * Automatically attaches Sanctum Bearer token
 */
export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    credentials: "include",
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",

      // ✅ Attach token automatically
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),

      ...(options.headers || {}),
    },
  });

  // ✅ Handle unauthorized globally
  if (response.status === 401) {
    console.warn("Unauthorized — token expired");

    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }

  return response;
}
