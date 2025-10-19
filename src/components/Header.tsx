import { Heart, Menu, X } from 'lucide-react'
import { useState } from 'react'
import './Header.css'

interface HeaderProps {
  matches: number
}

function Header({ matches }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Heart className="logo-icon" fill="currentColor" />
          <span className="logo-text">TinDog</span>
        </div>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <a href="#features" className="nav-link">Features</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#download" className="nav-link">Download</a>
          <div className="matches-badge">
            <Heart size={16} />
            <span>{matches} Matches</span>
          </div>
        </nav>

        <button 
          className="menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}

export default Header
