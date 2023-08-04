import { chatGPT } from "@/lib/chatgpt";
import { elasticClient } from "@/lib/elasticsearch";

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const { query_text } = req.body;

      const query = {
        bool: {
          must: [
            {
              match: {
                title: {
                  query: query_text,
                  boost: 1,
                },
              },
            },
          ],
          filter: [
            {
              exists: {
                field: process.env.VECTOR_FIELD,
              },
            },
          ],
        },
      };

      const knn = {
        field: process.env.VECTOR_FIELD,
        k: 1,
        num_candidates: 20,
        query_vector_builder: {
          text_embedding: {
            model_id: "sentence-transformers__all-distilroberta-v1",
            model_text: query_text,
          },
        },
        boost: 24,
      };
      const fields = ["title", "body_content", "url"];

      const es_index = process.env.ES_INDEX;

      const response = await elasticClient.search({
        index: es_index,
        query: query,
        knn: knn,
        fields: fields,
        size: 1,
        _source: false,
      });

      const body = response.hits.hits[0].fields.body_content[0];
      const url = response.hits.hits[0].fields.url[0];

      const negResponse =
        "I'm unable to answer the question based on the information I have from Next js Docs.";

      const prompt = `Answer this question: ${query_text} Using only the information from this Next js Doc: ${body}\nIf the answer is not contained in the supplied doc reply '${negResponse}' and nothing else`;

      const answer = await chatGPT(prompt);

      return res.status(200).json({ answer, url });
    } catch (error) {
      return res.status(500).json({ error });
    }
  } else {
    return res.status(405).json({ mesage: "Method Not Allowed" });
  }
}
