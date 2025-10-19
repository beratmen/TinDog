import { MapPin, Info } from 'lucide-react'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import './DogCard.css'

interface Dog {
  id: number
  name: string
  age: number
  breed: string
  location: string
  bio: string
  image: string
  distance: number
}

interface DogCardProps {
  dog: Dog
  onSwipeLeft: () => void
  onSwipeRight: () => void
}

function DogCard({ dog, onSwipeLeft, onSwipeRight }: DogCardProps) {
  const [{ x, rotate }, api] = useSpring(() => ({
    x: 0,
    rotate: 0,
  }))

  const bind = useDrag(
    ({ down, movement: [mx], direction: [xDir], velocity: [vx] }) => {
      const trigger = vx > 0.2
      const dir = xDir < 0 ? -1 : 1

      if (!down && trigger) {
        if (dir === -1) {
          onSwipeLeft()
        } else {
          onSwipeRight()
        }
      }

      api.start({
        x: down ? mx : 0,
        rotate: down ? mx / 10 : 0,
        immediate: down,
      })
    },
    {
      from: () => [x.get(), 0],
      bounds: { left: -200, right: 200, top: 0, bottom: 0 },
      rubberband: true,
    }
  )

  return (
    <animated.div
      {...bind()}
      className="dog-card"
      style={{
        x,
        rotate: rotate.to((r) => `${r}deg`),
        touchAction: 'none',
      }}
    >
      <div
        className="dog-image"
        style={{ backgroundImage: `url(${dog.image})` }}
      >
        <div className="distance-badge">
          <MapPin size={16} />
          {dog.distance} km
        </div>
      </div>

      <div className="dog-info">
        <div className="dog-header">
          <h2 className="dog-name">
            {dog.name}, {dog.age}
          </h2>
          <button className="info-button">
            <Info size={20} />
          </button>
        </div>

        <p className="dog-breed">{dog.breed}</p>

        <div className="dog-location">
          <MapPin size={16} />
          <span>{dog.location}</span>
        </div>

        <p className="dog-bio">{dog.bio}</p>
      </div>
    </animated.div>
  )
}

export default DogCard
