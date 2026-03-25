import { useEffect, useRef } from 'react'

export default function CursorTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          r: Math.random() * 1.4 + 0.4,
          opacity: 0.45 + Math.random() * 0.2,
          dx: (Math.random() - 0.5) * 0.5,
          dy: (Math.random() - 0.5) * 0.5 - 0.25,
        })
      }
    }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles = particles.filter(p => p.opacity > 0.01)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
        ctx.fill()
        p.opacity *= 0.87
        p.x += p.dx
        p.y += p.dy
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    />
  )
}
