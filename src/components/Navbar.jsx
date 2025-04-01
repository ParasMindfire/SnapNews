import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">
          📰 Snap News
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-item">
            Home
          </Link>
          <Link to="/bookmarks" className="nav-item">
            Bookmarks
          </Link>
          <button onClick={toggleTheme} className="theme-button">
            <span className="theme-icon">
              {theme === "light" ? "🌙" : "☀️"}
            </span>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
