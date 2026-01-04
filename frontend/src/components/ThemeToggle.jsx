import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <button
      className="theme-toggle-btn"
      onClick={() => setDarkMode((prev) => !prev)}
    >
      {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
