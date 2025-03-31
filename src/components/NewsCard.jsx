import { Link } from "react-router-dom";

const NewsCard = ({ article, index }) => {
  console.log("index ", index);
  return (
    <div className="card">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="news-image"
        />
      )}
      <h3>{article.title}</h3>
      <p>{article.description?.slice(0, 100)}...</p>
      <Link to={`/news/${index}`} className="read-more">
        Read More
      </Link>
    </div>
  );
};

export default NewsCard;
