import { useMemo } from 'react'

const rand = (min, max) => Math.random() * (max - min) + min

export default function Stars() {
  const stars = useMemo(() =>
    Array.from({ length: 110 }, (_, i) => ({
      id: i,
      x: rand(0, 100),
      y: rand(0, 100),
      size: rand(0.5, 1.8),
      delay: rand(0, 6),
      duration: rand(2.5, 5),
    })), []
  )

  const shooters = useMemo(() => [
    { id: 0, x: 8,  y: 6,  delay: 0  },
    { id: 1, x: 22, y: 18, delay: 3  },
    { id: 2, x: 55, y: 3,  delay: 6.5 },
    { id: 3, x: 72, y: 22, delay: 10 },
  ], [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map(s => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
          }}
        />
      ))}
      {shooters.map(s => (
        <div
          key={s.id}
          className="shooting-star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
