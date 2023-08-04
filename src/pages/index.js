import { BASE_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [answer, setAnswer] = useState("");
  const [url, setUrl] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [isClient, setIsClient] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnswer("");
    setUrl("");
    try {
      const res = await axios.post(`${BASE_URL}/api/search`, {
        query_text: query,
      });

      setAnswer(res.data.answer);
      setUrl(res.data.url);
      console.log(res.data.answer);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient)
    return (
      <>
        <div className="">
          <h1 className="text-4xl font-semibold my-10 text-center">
            {process.env.NEXT_PUBLIC_CHAT_TITLE}
          </h1>
          <form
            className="w-1/2 mx-auto flex justify-center"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none border-2 border-blue-200 w-3/5 p-2 rounded-md mr-3"
            />
            <button
              className="text-white bg-blue-500 px-4 py-2 rounded-lg"
              type="submit"
            >
              Search
            </button>
          </form>

          {loading && (
            <div className="animate-spin p-5 border-2 w-5 mx-auto mt-5 rounded-full border-t-black"></div>
          )}
          <p className="max-w-4xl p-5 mx-auto mt-10">
            <pre className="whitespace-pre-wrap">{answer}</pre>
          </p>
          <div className="max-w-4xl px-5 mx-auto">
            <a className=" text-blue-500" href={url}>
              {url}
            </a>
          </div>
        </div>
      </>
    );
}
