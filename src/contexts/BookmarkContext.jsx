import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const BookmarkContext = createContext();

// Provider component
export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(storedBookmarks);
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (article) => setBookmarks((prev) => [...prev, article]);
  const removeBookmark = (article) =>
    setBookmarks((prev) => prev.filter((item) => item.title !== article.title));

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

// Custom hook for consuming context
export const useBookmarks = () => {
  return useContext(BookmarkContext);
};
