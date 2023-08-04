import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_API,
});
const openai = new OpenAIApi(configuration);

export const chatGPT = async (prompt, model = "gpt-3.5-turbo") => {
  const response = await openai.createChatCompletion({
    model: model,
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
  });

  return response.data.choices[0].message.content;
};
