import { Link } from "react-router-dom";
import { useBookmarks } from "../contexts/BookmarkContext";

const NewsCard = ({ article, index }) => {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const isBookmarked = bookmarks.some((item) => item.title === article.title);

  return (
    <div className="news-card">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="news-image"
        />
      )}
      <div className="news-content">
        <h3 className="news-title">{article.title}</h3>
        <p className="news-description">
          {article.description?.slice(0, 120)}...
        </p>
        <div className="news-footer">
          <Link to={`/news/${index}`} className="read-more">
            Read More →
          </Link>
          <button
            onClick={() =>
              isBookmarked ? removeBookmark(article) : addBookmark(article)
            }
            className={`bookmark-btn ${isBookmarked ? "bookmarked" : ""}`}
          >
            {isBookmarked ? "❌ Remove" : "📌 Bookmark"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
