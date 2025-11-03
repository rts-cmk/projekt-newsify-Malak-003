import { useState, useEffect } from "react"

export default function Settings() {
  const defaultCategories = {
    Europe: true,
    Health: true,
    Sport: true,
    Business: true,
    Travel: true,
  }

  // Load saved categories from localStorage or use default
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("categories")) || defaultCategories
  )

  // Load dark mode  from localStorage
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  )

  // Apply saved theme on load
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme")
    } else {
      document.body.classList.remove("dark-theme")
    }
  }, [darkMode])

  // Toggle a category on/off and save to localStorage
  const handleCategoryToggle = (category) => {
    const updated = { ...categories, [category]: !categories[category] }
    setCategories(updated)
    localStorage.setItem("categories", JSON.stringify(updated))
  }

  // Toggle dark mode and save to localStorage
  const handleDarkModeToggle = () => {
    const newTheme = darkMode ? "light" : "dark"
    setDarkMode(!darkMode)
    localStorage.setItem("theme", newTheme)
    document.body.classList.toggle("dark-theme", newTheme === "dark")
  }

  return (
    <main className="settings-container">

      {/* Settings Header */}
      <div className="settings-header">
        <h2 className="settings-title">Settings</h2>
      </div>

      {/* Categories Section */}
      <p className="settings-subtitle">Categories</p>
      <div className="category-list">
        {Object.keys(categories).map((cat) => (
          <div key={cat} className="category-item">
            <div className="category-info">
              <img className="cat-logo" src="/img/newsify_logo3.png" />
              <span className="cat-name">{cat}</span>
            </div>

            {/* Toggle Switch */}
            <label className="switch">
              <input type="checkbox"
                checked={categories[cat]}
                onChange={() => handleCategoryToggle(cat)}
              />
              <span className="slider"></span>
            </label>
          </div>
        ))}
      </div>

      {/* Dark Mode Toggle */}
      <div className="darkmode">
        <button className="darkmode__btn" onClick={handleDarkModeToggle}>
          Toggle dark mode
        </button>
      </div>

      {/* App Version */}
      <p className="version-text">Version 4.8.15.16.23.42</p>
    </main>
  )
}
