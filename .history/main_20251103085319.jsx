import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"

import Root from "./root"
import Home from "./pages/home"
import Onboarding from "./pages/onboarding"
import Archive from "./pages/archive"
import Popular from "./pages/popular"
import Settings from "./pages/settings"
import SplashScreen from "./pages/splashScreen.jsx"

import "./style/main.sass"

// Set initial theme from localStorage
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme")
} else {
  document.body.classList.remove("dark-theme")
}

// Check if onboarding was completed
const onboardingDone = localStorage.getItem("onboardingDone")

const appRoutes = {
  path: "/app",
  element: <Root />,
  children: [
    { path: "", element: <Home /> },
    { path: "archive", element: <Archive /> },
    { path: "popular", element: <Popular /> },
    { path: "settings", element: <Settings /> },
  ],
}

let router
if (onboardingDone === "true") {
  router = createBrowserRouter([
    { path: "/", element: <Navigate to="/app" replace /> },
    appRoutes,
  ])
} else {
  router = createBrowserRouter([
    { path: "/", element: <Onboarding /> },
    appRoutes,
  ])
}

function App() {
  const [showSplash, setShowSplash] = useState(true)

  // Show splash screen for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Show splash screen first, then the router
  return showSplash ? <SplashScreen />
   : <RouterProvider router={router} />
}

// Render the app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
