const NEWS_API_KEY = "136141d5fa4b49ab8ee4dc060d4eef91";
const OPENAI_API_KEY =
  "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";

export const fetchNews = async (category = "general") => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${NEWS_API_KEY}`
    );
    const data = await response.json();

    if (data.status !== "ok") {
      throw new Error("Error fetching news");
    }

    return data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

export const fetchSummary = async (content) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Changed from "gpt-4" to a more widely available model
        messages: [
          { role: "system", content: "You summarize news articles." },
          {
            role: "user",
            content: `Summarize this article in 3 sentences:\n\n${content}`,
          },
        ],
        max_tokens: 100,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      throw new Error(`API Error: ${errorData.error.message}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error summarizing article:", error);
    return "Failed to generate summary.";
  }
};
