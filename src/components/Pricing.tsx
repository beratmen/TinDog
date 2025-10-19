import { Check } from 'lucide-react'
import './Pricing.css'

function Pricing() {
  const plans = [
    {
      name: 'Chihuahua',
      price: '0',
      features: [
        '5 Matches Per Day',
        '10 Messages Per Day',
        'Unlimited App Usage',
      ],
      color: '#ff6b6b',
    },
    {
      name: 'Labrador',
      price: '49',
      features: [
        'Unlimited Matches',
        'Unlimited Messages',
        'Priority Support',
      ],
      color: '#4ecdc4',
      popular: true,
    },
    {
      name: 'Mastiff',
      price: '99',
      features: [
        'Priority Listing',
        'Unlimited Everything',
        'Premium Badge',
      ],
      color: '#667eea',
    },
  ]

  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-container">
        <h2 className="section-title">Pricing</h2>
        <p className="section-subtitle">
          Choose the perfect plan for your dog
        </p>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && (
                <div className="popular-badge">Most Popular</div>
              )}
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">
                <span className="currency">$</span>
                <span className="amount">{plan.price}</span>
                <span className="period">/mo</span>
              </div>
              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <Check size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className="plan-button"
                style={{ background: plan.color }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
