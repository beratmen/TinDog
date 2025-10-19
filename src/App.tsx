import { useState, useCallback, useEffect } from 'react'
import Header from './components/Header'
import SwipeCards from './components/SwipeCards'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import './App.css'

/**
 * Main App Component
 * Manages the overall state and layout of TinDog application
 */
function App() {
  const [matches, setMatches] = useState<number>(() => {
    // Load matches from localStorage on mount
    const savedMatches = localStorage.getItem('tindog-matches')
    return savedMatches ? parseInt(savedMatches, 10) : 0
  })

  // Save matches to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tindog-matches', matches.toString())
  }, [matches])

  /**
   * Handle successful match
   * Increments the match counter
   */
  const handleMatch = useCallback(() => {
    setMatches((prev) => prev + 1)
  }, [])

  /**
   * Reset matches (useful for demo/testing)
   */
  const handleResetMatches = useCallback(() => {
    setMatches(0)
    localStorage.removeItem('tindog-matches')
  }, [])

  return (
    <div className="app">
      <Header matches={matches} onResetMatches={handleResetMatches} />
      <main>
        <SwipeCards onMatch={handleMatch} />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}

export default App
