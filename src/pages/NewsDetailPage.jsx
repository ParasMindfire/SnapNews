import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchNews, fetchSummary } from "../utils/api";

const NewsDetailPage = () => {
  const { id } = useParams();
  const [news, setNews] = useState([]);
  const [article, setArticle] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      const articles = await fetchNews("general"); // Fetch news articles
      setNews(articles);
      setArticle(articles[id]); // Get the specific article
    };
    loadNews();
  }, [id]);

  const handleQuickRead = async () => {
    if (!article) return;
    setLoading(true);
    const summarizedText = await fetchSummary(article.content);
    setSummary(summarizedText);
    setLoading(false);
  };

  if (!article) return <p className="loading">Loading news...</p>;

  return (
    <div className="news-detail">
      <img
        src={article.urlToImage}
        alt={article.title}
        className="detail-image"
      />
      <h1>{article.title}</h1>
      <p className="author-date">
        {article.author && <span>By {article.author}</span>} •{" "}
        {article.publishedAt?.split("T")[0]}
      </p>
      <p className="news-content">{summary || article.content}</p>
      <button onClick={handleQuickRead} className="quick-read">
        {loading ? "Summarizing..." : "Quick Read"}
      </button>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="full-article"
      >
        Read Full Article
      </a>
    </div>
  );
};

export default NewsDetailPage;
