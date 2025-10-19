import { Heart, Menu, X, RotateCcw } from 'lucide-react'
import { useState, useCallback, useEffect } from 'react'
import './Header.css'

interface HeaderProps {
  matches: number
  onResetMatches?: () => void
}

/**
 * Header Component
 * Navigation bar with logo, menu, and match counter
 */
function Header({ matches, onResetMatches }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Toggle mobile menu
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  // Close menu when clicking on a link
  const handleLinkClick = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  // Smooth scroll to section
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      handleLinkClick()
    }
  }, [handleLinkClick])

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <a 
          href="#" 
          className="logo"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          aria-label="TinDog Home"
        >
          <Heart className="logo-icon" fill="currentColor" />
          <span className="logo-text">TinDog</span>
        </a>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <a 
            href="#features" 
            className="nav-link"
            onClick={(e) => scrollToSection(e, '#features')}
          >
            Features
          </a>
          <a 
            href="#pricing" 
            className="nav-link"
            onClick={(e) => scrollToSection(e, '#pricing')}
          >
            Pricing
          </a>
          <a 
            href="#download" 
            className="nav-link"
            onClick={(e) => scrollToSection(e, '#download')}
          >
            Download
          </a>
          <div className="matches-badge" title={`You have ${matches} matches!`}>
            <Heart size={16} />
            <span>{matches} Match{matches !== 1 ? 'es' : ''}</span>
            {onResetMatches && matches > 0 && (
              <button
                className="reset-button"
                onClick={onResetMatches}
                aria-label="Reset matches"
                title="Reset matches"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>
        </nav>

        <button 
          className="menu-button"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}

export default Header
