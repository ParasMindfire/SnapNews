import React, { useEffect, useState } from "react";
import { fetchNews } from "../utils/api";
import NewsCard from "../components/NewsCard";
import CategoryBar from "../components/CategoryBar";

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("general");

  useEffect(() => {
    const loadNews = async () => {
      const articles = await fetchNews(category);
      setNews(articles);
    };
    loadNews();
  }, [category]);

  return (
    <div className="homepage">
      <CategoryBar setCategory={setCategory} />
      <div className="news-container">
        {news.map((article, index) => (
          <NewsCard key={index} article={article} index={index} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
