export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://next-gpt.vercel.app"
    : "http://localhost:3000";
