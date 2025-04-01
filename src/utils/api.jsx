const NEWS_API_KEY = "136141d5fa4b49ab8ee4dc060d4eef91";
const GEMINI_API_KEY = "AIzaSyDjjV4e0LnGFcxiznBdXIZX8vkrz-vpxwk";

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
    // Updated endpoint using gemini-2.0-flash model from your curl example
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Please provide a concise summary of the following news article in a small paragraph of 200 words, highlighting the key points, major events, and important details:\n\n${content}`,
                },
              ],
            },
          ],
          // Optional configuration parameters
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API error details:", errorData);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else if (data.promptFeedback && data.promptFeedback.blockReason) {
      throw new Error(`Content blocked: ${data.promptFeedback.blockReason}`);
    }

    throw new Error("Error generating summary");
  } catch (error) {
    console.error("Error summarizing article:", error);
    throw error;
  }
};
