import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI;
const projectId = "mini-project-1644337227279";

const maxTokens = 100; // Optional: Maximum number of tokens to generate
const temperature = 0.7; // Optional: Adjusts creativity/safety (0.0 = cautious, 1.0 = adventurous)

export async function generateText(prompt) {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    console.log("Model", model);
    console.log(prompt);

    const response = (await model.generateContent(prompt)).response;
    console.log(response);

    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error generating text:", error);
    return error;
  }
}
