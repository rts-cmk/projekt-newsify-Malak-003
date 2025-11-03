// ============================================================
// 📰 NYT API HELPER
// ============================================================

// 1️⃣ Import the API key from your environment file (.env.local)
const apiKey = import.meta.env.VITE_NYT_API_KEY

// 2️⃣ Define base URLs for the APIs
const SEARCH_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json"
const POPULAR_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`

// ============================================================
// 🔧 GENERIC FETCH FUNCTION
// ============================================================
async function fetchData(url) {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`)
    }

    // Parse and return JSON data
    return await response.json()

  } catch (error) {
    console.error("❌ Fetch error:", error)
    return null
  }
}

// ============================================================
// 🔍 SEARCH API — get articles based on user query
// ============================================================
export async function getSearchResults(query = "news") {
  const url = `${SEARCH_URL}?q=${encodeURIComponent(query)}&api-key=${apiKey}`
  return fetchData(url)
}

// ============================================================
// ⭐ POPULAR API — get most viewed articles
// ============================================================
export async function getPopularViewed() {
  return fetchData(POPULAR_URL)
}

// ============================================================
// 🧩 EXPORT DEFAULT (optional, for flexibility)
// ============================================================
export default {
  getSearchResults,
  getPopularViewed,
}
