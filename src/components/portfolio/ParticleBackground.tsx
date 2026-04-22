'use client'

import { useRef, useEffect, useCallback } from 'react'

// ── Layer definitions ──────────────────────────────────────────────
// 5 depth layers: 0 = farthest (smallest, dimmest, fastest scroll feel),
//                 4 = nearest  (largest, brightest, slowest)
const DEPTH_LAYERS = [
  { depth: 0, sizeRange: [0.4, 1.0] as const, opacityRange: [0.15, 0.3] as const, speedFactor: 0.02, count: 80 },
  { depth: 1, sizeRange: [0.6, 1.4] as const, opacityRange: [0.2, 0.4] as const, speedFactor: 0.04, count: 50 },
  { depth: 2, sizeRange: [1.0, 2.0] as const, opacityRange: [0.25, 0.5] as const, speedFactor: 0.07, count: 30 },
  { depth: 3, sizeRange: [1.5, 3.0] as const, opacityRange: [0.3, 0.6] as const, speedFactor: 0.12, count: 15 },
  { depth: 4, sizeRange: [2.5, 4.5] as const, opacityRange: [0.4, 0.7] as const, speedFactor: 0.20, count: 8 },
]

const STAR_COUNT = 60
const DOT_GRID_SPACING = 48

// Purple-tinted star / particle colors
const PURPLE_COLORS = [
  { r: 194, g: 164, b: 255 }, // #c2a4ff
  { r: 167, g: 139, b: 250 }, // #a78bfa
  { r: 168, g: 85, b: 247 },  // #a855f7
  { r: 236, g: 72, b: 153 },  // #ec4899
  { r: 251, g: 141, b: 255 }, // #fb8dff
]

// ── Types ──────────────────────────────────────────────────────────
interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  opacity: number
  color: { r: number; g: number; b: number }
  speedFactor: number
  driftPhase: number
  driftAmplitude: number
  twinklePhase: number
  twinkleSpeed: number
  pulsePhase: number
  pulseSpeed: number
  layer: number
}

interface Star {
  x: number
  y: number
  size: number
  baseOpacity: number
  twinkleSpeed: number
  twinklePhase: number
  color: { r: number; g: number; b: number }
}

// ── Helpers ────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function randomInRange(min: number, max: number) {
  return lerp(min, max, Math.random())
}

// ── Component ──────────────────────────────────────────────────────
export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const scrollRef = useRef(0)

  // Stable init helpers (never recreated)
  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = []
    for (const layer of DEPTH_LAYERS) {
      for (let i = 0; i < layer.count; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const color = PURPLE_COLORS[Math.floor(Math.random() * PURPLE_COLORS.length)]
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: randomInRange(layer.sizeRange[0], layer.sizeRange[1]),
          opacity: randomInRange(layer.opacityRange[0], layer.opacityRange[1]),
          color,
          speedFactor: layer.speedFactor,
          driftPhase: Math.random() * Math.PI * 2,
          driftAmplitude: randomInRange(15, 60) * (1 + layer.depth * 0.3),
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: randomInRange(0.008, 0.025),
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: randomInRange(0.01, 0.03),
          layer: layer.depth,
        })
      }
    }
    return particles
  }, [])

  const initStars = useCallback((width: number, height: number) => {
    const stars: Star[] = []
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: randomInRange(0.3, 1.2),
        baseOpacity: randomInRange(0.15, 0.55),
        twinkleSpeed: randomInRange(0.005, 0.02),
        twinklePhase: Math.random() * Math.PI * 2,
        color: PURPLE_COLORS[Math.floor(Math.random() * PURPLE_COLORS.length)],
      })
    }
    return stars
  }, [])

  // ── Main effect ──────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2) // cap for perf
      canvas.width = window.innerWidth * dpr
      canvas.height = document.documentElement.scrollHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${document.documentElement.scrollHeight}px`
      ctx.scale(dpr, dpr)

      particlesRef.current = initParticles(window.innerWidth, document.documentElement.scrollHeight)
      starsRef.current = initStars(window.innerWidth, document.documentElement.scrollHeight)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }

    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }

    // ── Draw loop ───────────────────────────────────────────────
    const draw = () => {
      timeRef.current += 1
      const t = timeRef.current
      const { x: mx, y: my } = mouseRef.current
      const logicalW = window.innerWidth
      const logicalH = document.documentElement.scrollHeight

      ctx.clearRect(0, 0, logicalW, logicalH)

      // Mouse parallax offset (subtle)
      const parallaxX = (mx - 0.5) * 30
      const parallaxY = (my - 0.5) * 20
      // Scroll-based parallax offset
      const scrollOffset = scrollRef.current

      // ── Draw stars ───────────────────────────────────────────
      const stars = starsRef.current
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        const twinkle = Math.sin(t * s.twinkleSpeed + s.twinklePhase)
        const opacity = s.baseOpacity * (0.4 + 0.6 * twinkle)
        const { r, g, b } = s.color

        ctx.beginPath()
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity.toFixed(3)})`
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // ── Draw particles (sorted by depth so far layers render first) ──
      const particles = particlesRef.current
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Organic drift
        const driftX = Math.sin(t * p.speedFactor + p.driftPhase) * p.driftAmplitude
        const driftY = Math.cos(t * p.speedFactor * 0.7 + p.driftPhase) * p.driftAmplitude * 0.6

        // Parallax: closer layers move more with mouse & less with scroll
        const layerParallaxScale = (p.layer + 1) / DEPTH_LAYERS.length
        const px = p.baseX + driftX + parallaxX * layerParallaxScale
        const py = p.baseY + driftY + parallaxY * layerParallaxScale - scrollOffset * p.speedFactor

        // Wrap vertically based on scroll
        const wrappedY = ((py % logicalH) + logicalH) % logicalH
        const wrappedX = ((px % logicalW) + logicalW) % logicalW

        // Twinkle & pulse
        const twinkle = Math.sin(t * p.twinkleSpeed + p.twinklePhase)
        const pulse = Math.sin(t * p.pulseSpeed + p.pulsePhase)
        const currentOpacity = p.opacity * (0.5 + 0.5 * twinkle) * (0.85 + 0.15 * pulse)
        const currentSize = p.size * (0.9 + 0.1 * pulse)

        const { r, g, b } = p.color

        // Glow layer for foreground particles
        if (p.layer >= 3) {
          const glowSize = currentSize * 3
          const gradient = ctx.createRadialGradient(wrappedX, wrappedY, 0, wrappedX, wrappedY, glowSize)
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${(currentOpacity * 0.25).toFixed(3)})`)
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
          ctx.beginPath()
          ctx.fillStyle = gradient
          ctx.arc(wrappedX, wrappedY, glowSize, 0, Math.PI * 2)
          ctx.fill()
        }

        // Core dot
        ctx.beginPath()
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity.toFixed(3)})`
        ctx.arc(wrappedX, wrappedY, currentSize, 0, Math.PI * 2)
        ctx.fill()

        // Bright center for mid-to-front particles
        if (p.layer >= 2) {
          ctx.beginPath()
          ctx.fillStyle = `rgba(255, 255, 255, ${(currentOpacity * 0.35).toFixed(3)})`
          ctx.arc(wrappedX, wrappedY, currentSize * 0.35, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // ── Draw dot grid ────────────────────────────────────────
      const gridOffsetX = parallaxX * 0.15
      const gridOffsetY = parallaxY * 0.15
      const gridScrollOffset = scrollOffset * 0.03
      ctx.fillStyle = 'rgba(168, 85, 247, 0.035)'
      for (let gx = 0; gx < logicalW + DOT_GRID_SPACING; gx += DOT_GRID_SPACING) {
        for (let gy = -DOT_GRID_SPACING; gy < logicalH + DOT_GRID_SPACING; gy += DOT_GRID_SPACING) {
          const dotX = ((gx + gridOffsetX) % DOT_GRID_SPACING + DOT_GRID_SPACING) % DOT_GRID_SPACING + (gx - (gx % DOT_GRID_SPACING))
          const dotY = ((gy + gridOffsetY + gridScrollOffset) % DOT_GRID_SPACING + DOT_GRID_SPACING) % DOT_GRID_SPACING + (gy - (gy % DOT_GRID_SPACING))
          if (dotX >= 0 && dotX <= logicalW && dotY >= 0 && dotY <= logicalH) {
            ctx.beginPath()
            ctx.arc(dotX, dotY, 0.6, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    // ── Bootstrap ──────────────────────────────────────────────
    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    const observer = new ResizeObserver(() => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.height = document.documentElement.scrollHeight * dpr
      canvas.style.height = `${document.documentElement.scrollHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    })
    observer.observe(document.documentElement)

    animationRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animationRef.current)
      observer.disconnect()
    }
  }, [initParticles, initStars])

  return (
    <>
      {/* Dark base background */}
      <div
        className="fixed inset-0 -z-10"
        style={{ background: '#0b080c' }}
        aria-hidden="true"
      />

      {/* Canvas: particles + stars + dot grid */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0, opacity: 0.75 }}
        aria-hidden="true"
      />

      {/* Dot-grid CSS overlay (very subtle, complementary to canvas grid) */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          opacity: 0.08,
          backgroundImage:
            'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0.5px, transparent 0.5px)',
          backgroundSize: `${DOT_GRID_SPACING}px ${DOT_GRID_SPACING}px`,
        }}
        aria-hidden="true"
      />

      {/* Gradient orbs (CSS-animated, defined in globals.css) */}
      <div className="orb-1" aria-hidden="true" />
      <div className="orb-2" aria-hidden="true" />
      <div className="orb-3" aria-hidden="true" />

      {/* Subtle top-to-bottom vignette for depth */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(11, 8, 12, 0.6) 100%)',
        }}
        aria-hidden="true"
      />
    </>
  )
}
