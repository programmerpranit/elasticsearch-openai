import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_API,
});
const openai = new OpenAIApi(configuration);

export const dalle = async (prompt) => {
  const response = await openai.createImage({ prompt, n: 4, size: "512x512" });

  console.log(response.data);
  return response.data.data[0].url;
};
