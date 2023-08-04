export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://elasticsearch-openai.vercel.app"
    : "http://localhost:3000";
