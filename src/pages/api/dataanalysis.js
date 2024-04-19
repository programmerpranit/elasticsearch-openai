import fs from "fs";
import csvParser from "csv-parser";
import { sentimentAnalysis } from "@/lib/sementic";
import { generateText } from "@/lib/geminiPrompt";

async function parseCSV(csvFilePath) {
  const data = [];
  try {
    const file = fs.readFileSync(csvFilePath);
    const stream = fs.createReadStream(csvFilePath);
    stream.pipe(csvParser()).on("data", (row) => {
      // Process each row of data
      data.push(row);
    });

    await new Promise((resolve, reject) => {
      stream.on("end", () => {
        // CSV parsing is complete
        console.log("CSV parsing complete.");
        resolve();
      });
      stream.on("error", (error) => {
        // Handle errors
        console.error("Error parsing CSV:", error);
        reject(error);
      });
    });
  } catch (error) {
    console.error("Error:", error);
  }

  return data;
}

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const ans = await parseCSV("./public/google.csv");

      let positive = 0;
      let negative = 0;
      let neutral = 0;
      const prompt = [];
      for (let i = 0; i < 10; i++) {
        prompt.push(ans[i].review);
      }
      console.log(prompt);

      const finalPrompt = `I will provide you 10 reviews of welcome restaurent Do the Sentimental Analysis and tell me which words are used may times The Reviews are ${prompt.toString()}`;

      const answers = await generateText(finalPrompt);
      return res.status(200).json({ answers });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  } else {
    return res.status(405).json({ mesage: "Method Not Allowed" });
  }
}
