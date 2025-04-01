import React from "react";
import { useBookmarks } from "../contexts/BookmarkContext";

const BookmarksPage = () => {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <div className="bookmarks-page">
      <h1 className="page-title">📌 Bookmarked News</h1>
      {bookmarks.length === 0 ? (
        <p className="empty-message">No bookmarks yet!</p>
      ) : (
        <div className="bookmarks-grid">
          {bookmarks.map((article, index) => (
            <div key={index} className="bookmark-card">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="news-image"
                />
              )}
              <div className="bookmark-content">
                <h3 className="bookmark-title">{article.title}</h3>
                <p className="bookmark-description">
                  {article.description?.slice(0, 100)}...
                </p>
                <button
                  onClick={() => removeBookmark(article)}
                  className="remove-btn"
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
