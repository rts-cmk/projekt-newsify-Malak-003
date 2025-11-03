import { useState, useEffect } from "react"

export default function Archive() {
  const [savedArticles, setSavedArticles] = useState([])

  const [startX, setStartX] = useState(0)
  const [swipedId, setSwipedId] = useState(null)

  // Load saved articles from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedArticles")) || []
    setSavedArticles(stored)
  }, [])

  // Delete an article
  const handleDelete = (id) => {
    const updated = savedArticles.filter((article) => article._id !== id)
    setSavedArticles(updated)
    localStorage.setItem("savedArticles", JSON.stringify(updated))
  }

  // Swipe gesture handlers
  const handleTouchStart = (event) => setStartX(event.touches[0].clientX)
  const handleTouchEnd = (event, id) => {
    const endX = event.changedTouches[0].clientX
    if (startX - endX > 60) setSwipedId(id)
    else setSwipedId(null)
  }

  // Render single saved article card
  const renderArticleCard = (article) => (
    <div
      key={article._id}
      className={`article-item ${swipedId === article._id ? "swiped" : ""}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={(event) => handleTouchEnd(event, article._id)}
    >
      <a href={article.web_url} >
        <div className="article-box">
          <img className="article-thumb" src={article.imageUrl} />
          <div className="article-text">
            <h3>{article.headline.main}</h3>
            <p>{article.abstract}</p>
          </div>
        </div>
      </a>

      <div className="delete-btn" onClick={() => handleDelete(article._id)}>
        <img src="/img/feather_trash.png" />
      </div>
    </div>
  )

  return (
    <main className="news-container">
      {savedArticles.length === 0 ? (
        <p className="no-results">No saved articles yet.</p>
      ) : (
        savedArticles.map(renderArticleCard)
      )}

      <div className="api-logo">
        <a href="https://developer.nytimes.com">
          <img src="/img/poweredby_nytimes_30a.png" />
        </a>
      </div>
    </main>
  )
}
