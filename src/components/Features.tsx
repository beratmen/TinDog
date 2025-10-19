import { Check, Zap, Heart } from 'lucide-react'
import './Features.css'

function Features() {
  return (
    <section className="features-section" id="features">
      <div className="features-container">
        <h2 className="section-title">Why TinDog?</h2>
        <p className="section-subtitle">
          We provide the best matching experience for your dog
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Check size={40} />
            </div>
            <h3>Easy to Use</h3>
            <p>
              So simple, even your dog could use it! Just swipe right to
              match.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Zap size={40} />
            </div>
            <h3>Elite Clientele</h3>
            <p>
              We have the best dogs! Quality and healthy companions.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Heart size={40} />
            </div>
            <h3>Guaranteed Results</h3>
            <p>
              Find the love of your dog's life or your money back!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
