export const geminiEmbedding = async (text:string):Promise<number[]> => {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key="+process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "models/text-embedding-004",
        content: {
          parts: [{ text: text }],
        },
      }),
    }
  );

  return (await response.json()).embedding.values;
}