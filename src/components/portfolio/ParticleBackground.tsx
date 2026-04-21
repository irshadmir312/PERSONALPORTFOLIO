'use client'

import { useRef, useEffect } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinklePhase: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const initStars = () => {
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 150)
      const stars: Star[] = []
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.5 + 0.1,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
        })
      }
      starsRef.current = stars
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
      initStars()
    }

    const animate = () => {
      if (!ctx) return
      timeRef.current += 1
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const stars = starsRef.current

      for (const star of stars) {
        const twinkle = Math.sin(timeRef.current * star.twinkleSpeed + star.twinklePhase)
        const currentOpacity = star.opacity * (0.5 + 0.5 * twinkle)

        ctx.beginPath()
        ctx.fillStyle = `rgba(200, 220, 255, ${currentOpacity})`
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    animationRef.current = requestAnimationFrame(animate)

    // Resize canvas on scroll to cover full page
    const observer = new ResizeObserver(() => {
      canvas.height = document.documentElement.scrollHeight
    })
    observer.observe(document.documentElement)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationRef.current)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  )
}
