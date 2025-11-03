import { useState, useEffect } from "react"
import { GetSearchResults } from "../helpers/nyt-api"

export default function Home() {
  const [articles, setArticles] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [openCategory, setOpenCategory] = useState(null)
  const [startX, setStartX] = useState(0)
  const [swipedId, setSwipedId] = useState(null)

  // LOAD USER CATEGORY SETTINGS
  // Load category visibility from localStorage (user preferences)
  const visibleCategories =
    JSON.parse(localStorage.getItem("categories")) || {}

  // FETCH ARTICLES (Search API)
  // + an effect waits 800ms after typing before fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      GetSearchResults(searchTerm)
        .then(data => {
          console.log(data)
          setArticles(data?.response?.docs || [])
        })
        .catch(error => console.error(error))
    }, 800)

    return () => clearTimeout(timer)
  }, [searchTerm])


  // GROUP ARTICLES BY SECTION
  const categories = {}
  articles.forEach(article => {
    const section = article.section_name || "Other"
    if (!categories[section]) categories[section] = []
    categories[section].push(article)
  })

  // TOGGLE CATEGORY OPEN/CLOSE
  const handleToggle = category => {
    setOpenCategory(openCategory === category ? null : category)
  }

  // SAVE ARTICLE TO LOCAL STORAGE
  const saveArticle = article => {
    let saved = JSON.parse(localStorage.getItem("savedArticles")) || []
    const exists = saved.some(a => a._id === article._id)
    if (!exists) {
      saved.push(article)
      localStorage.setItem("savedArticles", JSON.stringify(saved))
      alert("Article saved to archive")
    }
    setSwipedId(null)
  }

  // TOUCH SWIPE HANDLERS
  const handleTouchStart = event => setStartX(event.touches[0].clientX)

  const handleTouchEnd = (event, articleId) => {
    const endX = event.changedTouches[0].clientX
    if (startX - endX > 60) setSwipedId(articleId)
    else setSwipedId(null)
  }

  // RENDER INDIVIDUAL ARTICLE

  const renderArticleCard = article => {
    let imageUrl = "https://placehold.co/100x100?text=No+Image"
    if (article.multimedia?.length > 0) {
      imageUrl = "https://www.nytimes.com/" + article.multimedia[0].url
    } else if (article.legacy?.thumbnail) {
      imageUrl = "https://www.nytimes.com/" + article.legacy.thumbnail
    }

    const isSwiped = swipedId === article._id

    return (
      <div key={article._id}
        className={`article-item ${isSwiped ? "swiped" : ""}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={event => handleTouchEnd(event, article._id)}
      >
        {/* link to article */}
        <a href={article.web_url} >
          <div className="article-box">
            <img className="article-thumb" src={imageUrl}/>
            <div className="article-text">
              <h3>{article.headline.main}</h3>
              <p>{article.abstract}</p>
            </div>
          </div>
        </a>

        {/* Swipe-reveal save button */}
        <div
          className="save-btn"
          onClick={() => saveArticle({ ...article, imageUrl })} >
          <img src="/img/feather_bookmark.png" alt="Save" />
        </div>
      </div>
    )
  }

  // CATEGORY (FOLDBOX)
  const renderCategory = (category, articles) => {
    const isOpen = openCategory === category
    const arrowIcon = isOpen
      ? "/img/arrow-down.png"
      : "/img/feather_chevron-right.png"


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
      <div key={category} className="foldbox">
        {/* Category header */}
        <div className="foldbox-header" onClick={() => handleToggle(category)}>
          <div className="logcate">
            <img className="foldbox-logo" src="/img/newsify_logo3.png" />
            <h2 className="category-name">{category}</h2>
          </div>
          <img className="arrow" src={arrowIcon} />
        </div>

        {categoryContent}
          
      </div>
    )
  }

  // PAGE RENDER
  return (
    <>
      {/* Search box */}
      <div className="search-box">
        <input className="search-input" type="search" placeholder="Search news" value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
      </div>

      {/* News categories */}
      <main className="news-container">
        {/* Render All Visible Categories */}
        {Object.keys(categories)
          .filter(cat => visibleCategories[cat] !== false)
          .map(category => renderCategory(category, categories[category]))}

        {/* Fallback if nothing found */}
        {Object.keys(categories).length === 0 && 
          <p className="no-results">No Result</p>
        }


      {/* NYT API logo */}
        <div className="api-logo">
          <a href="https://developer.nytimes.com">
            <img src="/img/poweredby_nytimes_30a.png" />
          </a>
        </div>
      </main>
    </>
  )
}
