import { useState, useEffect } from "react"
import { getPopularViewed } from "../helpers/nyt-api"

export default function Popular() {

  const [articles, setArticles] = useState([])
  const [openCategory, setOpenCategory] = useState(null)

  useEffect(() => {
    getPopularViewed()
      .then(data => setArticles(data?.results || []))
  }, [])
  console.log(articles)

  const visibleCategories = JSON.parse(localStorage.getItem("categories")) || {}

  const categories = {}
  articles.forEach((article) => {
    const section = article.section || "Other"
    if (!categories[section]) categories[section] = []
    categories[section].push(article)
  })

  const handleToggle = (category) => {
    setOpenCategory(openCategory === category ? null : category)
  }

  const renderArticleCard = (article) => {
    // Choose the best available image or fallback
    const imageUrl =
      article.media?.[0]?.["media-metadata"]?.[2]?.url ||
      article.media?.[0]?.["media-metadata"]?.[1]?.url ||
      "https://placehold.co/100x100?text=No+Image"

    return (
      <a key={article.id} className="article-item" href={article.url}>
        <div className="article-box">
          <img className="article-thumb" src={imageUrl}  />
          <div className="article-text">
            <h3>{article.title}</h3>
            <p>{article.abstract}</p>
          </div>
        </div>
      </a>
    )
  }

  const renderCategory = (category) => {
    const isOpen = openCategory === category
    const arrowIcon = isOpen ? "/img/arrow-down.png" : "/img/feather_chevron-right.png"

    
    let categoryContent = null


if (isOpen) {
  categoryContent = (
    <div className="foldbox-content open">
      {articles.slice(0, 5).map(renderArticleCard)}
    </div>
  )
} else {
  categoryContent = (
    <div className="foldbox-content">
      {/* empty when closed, keeps structure stable */}
    </div>
  )
}
    return (
      <div key={category} className="foldbox" >
        <div className="foldbox-header" onClick={() => handleToggle(category)}>
          <div className="logcate">
            <img className="foldbox-logo" src="/img/newsify_logo3.png" />
            <h2 className="category-name">{category}</h2>
          </div>
          <img className="arrow" src={arrowIcon} alt="Toggle category" />
        </div>

        {categoryContent}

      </div>
    )
  }

  return (
    <main className="news-container">
      {Object.keys(categories)
  .filter(cat => visibleCategories[cat] !== false)
  .map(category => renderCategory(category, categories[category]))
}

      {Object.keys(categories).length === 0 &&
       <p className="no-results">No Result</p>}

      <div className="api-logo">
        <a href="https://developer.nytimes.com" target="_blank" rel="noopener noreferrer">
          <img src="/img/poweredby_nytimes_30a.png" alt="Powered by NYT" />
        </a>
      </div>
    </main>
  )
}
