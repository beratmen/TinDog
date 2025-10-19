import { useState } from 'react'
import Header from './components/Header'
import SwipeCards from './components/SwipeCards'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [matches, setMatches] = useState(0)

  const handleMatch = () => {
    setMatches(prev => prev + 1)
  }

  return (
    <div className="app">
      <Header matches={matches} />
      <SwipeCards onMatch={handleMatch} />
      <Features />
      <Pricing />
      <Footer />
    </div>
  )
}

export default App
