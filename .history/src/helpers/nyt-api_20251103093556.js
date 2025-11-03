const apiKey = import.meta.env.VITE_NYT_API_KEY

const searchBaseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json"
const popUrl = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`

async function fetchData(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error("Fetch error:", error)
    return null
  }
}

export async function GetSearchResults(query = "news") {
  const url = `${searchBaseUrl}?q=${query}&api-key=${apiKey}`
  return fetchData(url)
}

export async function getPopularViewed() {
  return fetchData(popUrl)
}
