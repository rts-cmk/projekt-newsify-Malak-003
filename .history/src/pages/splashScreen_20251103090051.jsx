import { useEffect, useState } from "react"

function SplashScreen() {
  const [fadeOut, setFadeOut] = useState(false)

  // Set timer to start fade-out after 2 seconds
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 2000)

    return () => clearTimeout(fadeTimer)
  }, [])

  // set a class for splash container
  let splashClassName = "splash-container"
  if (fadeOut) {
    splashClassName = "splash-container fade-out"
  }

  return (
    <div className={splashClassName}>
      {/* Logo and App Name */}
      <div className="logo-box">
        <img className="splash-logo" src="/img/splash_logo.png" alt="Newsify logo" />
        <h1 className="splash-text">Newsify</h1>
      </div>
    </div>
  )
}

export default SplashScreen
