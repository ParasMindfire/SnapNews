import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NewsDetailPage from "../pages/NewsDetailPage";
import BookmarksPage from "../pages/BookmarksPage";
import Navbar from "../components/Navbar";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
