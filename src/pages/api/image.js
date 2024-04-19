import { dalle } from "@/lib/dalle";

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const { prompt } = req.body;

      const ans = await dalle(prompt);

      return res.status(200).json({ ans });
    } catch (error) {
      return res.status(500).json({ error });
    }
  } else {
    return res.status(405).json({ mesage: "Method Not Allowed" });
  }
}
