import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  // Slides content:
  const slides = [
    {
      img: "/img/Onboarding1-background.png",
      title: "Stay Connected, Everywhere, Anytime",
      text: "Welcome to Newsify, your ultimate destination for breaking news, exclusive stories, and tailored content.",
    },
    {
      img: "/img/Onboarding2-background.png",
      title: "Become a Savvy Global Citizen",
      text: "Discover tailored news that aligns with your interests and preferences. Your personalized news journey awaits!",
    },
    {
      img: "/img/Onboarding3-background.png",
      title: "Enhance your News Journey Now!",
      text: "Be part of our dynamic community and participate in enriching conversations.",
    },
  ]

  // Continue button 
  const handleContinue = () => {
    if (step < slides.length - 1) {
      setStep(step + 1) 
    } else {
      localStorage.setItem("onboardingDone", "true") // Mark onboarding as done
      navigate("/app") 
    }
  }

  // Skip button 
  const handleSkip = () => {
    localStorage.setItem("onboardingDone", "true")
    navigate("/app")
  }

  // Navigation dots
  const dots = slides.map((_, index) => {
    let dotClass = "dot"
    if (index === step) dotClass += " active"
    return <span key={index} className={dotClass}></span>
  })

  // Continue button text
  let continueText = "Continue"
  if (step === slides.length - 1) continueText = "Start"

  return (
    <main className="onboarding">
      <img className="onboarding__image" src={slides[step].img}  />

      {/* Slide Content */}
      <div className="onboarding__content">
        <h2>{slides[step].title}</h2>
        <p>{slides[step].text}</p>

        <div className="onboarding__dots">{dots}</div>

        <div className="onboarding__buttons">
          <button className="skip-btn" onClick={handleSkip}>
            Skip
          </button>
          <button className="continue-btn" onClick={handleContinue}>
            {continueText}
          </button>
        </div>
      </div>
    </main>
  )
}
