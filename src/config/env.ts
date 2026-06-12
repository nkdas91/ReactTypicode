const fallbackUrl = "https://jsonplaceholder.typicode.com";

export const API_BASE_URL = import.meta.env.VITE_API_URL ?? fallbackUrl;

if (!import.meta.env.VITE_API_URL) {
  console.warn("VITE_API_URL not set. Using fallback API.");
}
