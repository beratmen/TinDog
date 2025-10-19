import { useState, useCallback, useEffect } from 'react'
import { Heart, X, RotateCcw } from 'lucide-react'
import DogCard from './DogCard.tsx'
import './SwipeCards.css'

export interface Dog {
  id: number
  name: string
  age: number
  breed: string
  location: string
  bio: string
  image: string
  distance: number
}

interface SwipeCardsProps {
  onMatch: () => void
}

type SwipeDirection = 'left' | 'right'
type AnimationType = 'like' | 'nope' | null

const DOGS: Dog[] = [
  {
    id: 1,
    name: 'Buddy',
    age: 3,
    breed: 'Golden Retriever',
    location: 'New York, USA',
    bio: 'Energetic and playful! Love running in the park and making new friends 🎾',
    image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600',
    distance: 2,
  },
  {
    id: 2,
    name: 'Luna',
    age: 2,
    breed: 'Husky',
    location: 'Seattle, USA',
    bio: 'Adventurous spirit, snow lover! I absolutely love hiking ❄️',
    image: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=600',
    distance: 3,
  },
  {
    id: 3,
    name: 'Max',
    age: 4,
    breed: 'German Shepherd',
    location: 'Los Angeles, USA',
    bio: 'Loyal and protective. My family means everything to me! 🦴',
    image: 'https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=600',
    distance: 5,
  },
  {
    id: 4,
    name: 'Bella',
    age: 1,
    breed: 'French Bulldog',
    location: 'Miami, USA',
    bio: 'Small but mighty! Love napping and being pampered 💕',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600',
    distance: 1,
  },
  {
    id: 5,
    name: 'Rocky',
    age: 5,
    breed: 'Rottweiler',
    location: 'Chicago, USA',
    bio: 'Strong yet gentle giant! Love playing with kids 🏋️',
    image: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?w=600',
    distance: 7,
  },
  {
    id: 6,
    name: 'Daisy',
    age: 2,
    breed: 'Labrador',
    location: 'San Diego, USA',
    bio: 'Water enthusiast! Love swimming and playing at the beach 🌊',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600',
    distance: 4,
  },
  {
    id: 7,
    name: 'Charlie',
    age: 3,
    breed: 'Beagle',
    location: 'Boston, USA',
    bio: 'Curious and fun! Love following every scent trail 🐾',
    image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=600',
    distance: 3,
  },
  {
    id: 8,
    name: 'Molly',
    age: 4,
    breed: 'Poodle',
    location: 'San Francisco, USA',
    bio: 'Stylish and elegant! Love grooming sessions and being social ✨',
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600',
    distance: 2,
  },
]

/**
 * SwipeCards Component
 * Main swipe interface for dog profiles
 */
function SwipeCards({ onMatch }: SwipeCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnimation, setShowAnimation] = useState<AnimationType>(null)
  const [swipeHistory, setSwipeHistory] = useState<number[]>([])

  const currentDog = DOGS[currentIndex]

  /**
   * Handle swipe action
   * @param direction - 'left' for pass, 'right' for like
   */
  const handleSwipe = useCallback((direction: SwipeDirection) => {
    setShowAnimation(direction === 'right' ? 'like' : 'nope')
    
    setTimeout(() => {
      if (direction === 'right') {
        onMatch()
      }
      
      // Add to history
      setSwipeHistory((prev) => [...prev, currentIndex])
      
      // Move to next dog
      if (currentIndex < DOGS.length - 1) {
        setCurrentIndex((prev) => prev + 1)
      } else {
        setCurrentIndex(0) // Reset to first dog
      }
      setShowAnimation(null)
    }, 300)
  }, [currentIndex, onMatch])

  /**
   * Undo last swipe
   */
  const handleUndo = useCallback(() => {
    if (swipeHistory.length > 0) {
      const lastIndex = swipeHistory[swipeHistory.length - 1]
      if (lastIndex !== undefined) {
        setCurrentIndex(lastIndex)
        setSwipeHistory((prev) => prev.slice(0, -1))
      }
    }
  }, [swipeHistory])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handleSwipe('left')
      } else if (e.key === 'ArrowRight') {
        handleSwipe('right')
      } else if (e.key === 'z' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        handleUndo()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleSwipe, handleUndo])

  if (!currentDog) {
    return (
      <section className="swipe-section">
        <div className="no-more-dogs">
          <h2>You've seen all the dogs! 🐕</h2>
          <p>Check back later for new dogs or start over!</p>
        </div>
      </section>
    )
  }

  return (
    <section className="swipe-section" id="swipe">
      <div className="swipe-container">
        <div className="hero-text">
          <h1 className="hero-title">
            Find The<br />
            <span className="highlight">Perfect Match</span> For Your Dog
          </h1>
          <p className="hero-subtitle">
            Meet, match, and connect with dogs nearby! 🐾
          </p>
        </div>

        <div className="card-stack">
          {showAnimation && (
            <div className={`swipe-overlay ${showAnimation}`}>
              {showAnimation === 'like' ? (
                <div className="like-badge">
                  <Heart size={60} fill="currentColor" />
                </div>
              ) : (
                <div className="nope-badge">
                  <X size={60} />
                </div>
              )}
            </div>
          )}

          <DogCard
            dog={currentDog}
            onSwipeLeft={() => handleSwipe('left')}
            onSwipeRight={() => handleSwipe('right')}
          />
        </div>

        <div className="swipe-buttons">
          <button
            className="swipe-button nope"
            onClick={() => handleSwipe('left')}
            aria-label="Pass (Arrow Left)"
            title="Pass (Arrow Left)"
          >
            <X size={32} />
          </button>
          {swipeHistory.length > 0 && (
            <button
              className="swipe-button undo"
              onClick={handleUndo}
              aria-label="Undo (Cmd/Ctrl + Z)"
              title="Undo last swipe (Cmd/Ctrl + Z)"
            >
              <RotateCcw size={28} />
            </button>
          )}
          <button
            className="swipe-button like"
            onClick={() => handleSwipe('right')}
            aria-label="Like (Arrow Right)"
            title="Like (Arrow Right)"
          >
            <Heart size={32} fill="currentColor" />
          </button>
        </div>

        <div className="progress">
          <span>{currentIndex + 1} / {DOGS.length}</span>
          {swipeHistory.length > 0 && (
            <span className="hint">Press Cmd/Ctrl+Z to undo</span>
          )}
        </div>
      </div>
    </section>
  )
}

export default SwipeCards
