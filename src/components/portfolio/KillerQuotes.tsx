'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Flame, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Quote {
  text: string
  emoji: string
  category: 'Rude' | 'Savage' | 'Flirty' | 'Dark Humor'
}

const quotes: Quote[] = [
  { text: "Your eyes didn't kill me... your smile finished the job.", emoji: '💀', category: 'Flirty' },
  { text: "I'm not rude, I'm just honest. You can't handle both.", emoji: '😏', category: 'Rude' },
  { text: "My silence is not weakness. It's the beginning of my revenge.", emoji: '🖤', category: 'Dark Humor' },
  { text: "I don't have an attitude problem. You have a perception problem.", emoji: '🔥', category: 'Savage' },
  { text: "You're the reason I believe in love at first sight... then I look again and change my mind.", emoji: '😂', category: 'Dark Humor' },
  { text: "If looks could kill, you'd be a weapon of mass destruction.", emoji: '💣', category: 'Flirty' },
  { text: "I'm not ignoring you. I'm just giving you time to realize your mistake.", emoji: '🦅', category: 'Savage' },
  { text: "Your smile is the reason I believe in magic.", emoji: '✨', category: 'Flirty' },
  { text: "I'm not a player, I just crush a lot... of code.", emoji: '💻', category: 'Dark Humor' },
  { text: "You looked at me and my heart went on strike. Unfair dismissal.", emoji: '⚖️', category: 'Flirty' },
  { text: "If being hot was a crime, you'd get a life sentence.", emoji: '🔥', category: 'Flirty' },
  { text: "I don't need your approval. My mirror tells me I'm fine.", emoji: '🪞', category: 'Savage' },
  { text: "You're like a software update — every time I see you, something gets better.", emoji: '🔄', category: 'Flirty' },
  { text: "I'd agree with you but then we'd both be wrong.", emoji: '💀', category: 'Savage' },
  { text: "You're the WiFi to my heart — always connected, never dropping signals.", emoji: '📶', category: 'Flirty' },
]

const categoryColors: Record<Quote['category'], { bg: string; border: string; text: string; badge: string }> = {
  Rude: { bg: 'bg-red-500/5', border: 'border-red-500/20', text: 'text-red-400', badge: 'border-red-500/30 text-red-400 bg-red-500/10' },
  Savage: { bg: 'bg-orange-500/5', border: 'border-orange-500/20', text: 'text-orange-400', badge: 'border-orange-500/30 text-orange-400 bg-orange-500/10' },
  Flirty: { bg: 'bg-pink-500/5', border: 'border-pink-500/20', text: 'text-pink-400', badge: 'border-pink-500/30 text-pink-400 bg-pink-500/10' },
  'Dark Humor': { bg: 'bg-purple-500/5', border: 'border-purple-500/20', text: 'text-purple-400', badge: 'border-purple-500/30 text-purple-400 bg-purple-500/10' },
}

function getQuoteOfTheDay(): Quote {
  const today = new Date()
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  return quotes[seed % quotes.length]
}

export default function KillerQuotes() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const quoteOfTheDay = getQuoteOfTheDay()
  const currentQuote = quotes[currentIndex]

  const goNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % quotes.length)
  }, [])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length)
  }, [])

  useEffect(() => {
    if (!isInView) return
    intervalRef.current = setInterval(goNext, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isInView, goNext])

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  }

  return (
    <section id="quotes" ref={ref} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 dot-pattern opacity-10" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="neon-text text-orange-400">🔥 Killer Quotes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Quotes that hit different. Savage, flirty, and brutally honest — take what resonates.
          </p>
        </motion.div>

        {/* Quote of the Day */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4 justify-center">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
              Quote of the Day
            </h3>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <Card
            className="relative overflow-hidden max-w-2xl mx-auto p-8 sm:p-10 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(236,72,153,0.06) 50%, rgba(168,85,247,0.08) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(249,115,22,0.2)',
              boxShadow: '0 0 30px rgba(249,115,22,0.1), 0 0 60px rgba(236,72,153,0.05)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-pink-500/5" />
            <div className="relative z-10">
              <span className="text-4xl mb-4 block">{quoteOfTheDay.emoji}</span>
              <p className="text-lg sm:text-xl font-semibold text-foreground leading-relaxed mb-4 italic">
                &ldquo;{quoteOfTheDay.text}&rdquo;
              </p>
              <Badge
                variant="outline"
                className={categoryColors[quoteOfTheDay.category].badge}
              >
                {quoteOfTheDay.category}
              </Badge>
            </div>
          </Card>
        </motion.div>

        {/* Auto-rotating Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-400" />
              <h3 className="text-lg font-semibold">Now Playing</h3>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={goPrev}
                className="h-8 w-8 text-muted-foreground hover:text-orange-400"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-xs font-mono text-muted-foreground">
                {currentIndex + 1} / {quotes.length}
              </span>
              <Button
                size="icon"
                variant="ghost"
                onClick={goNext}
                className="h-8 w-8 text-muted-foreground hover:text-orange-400"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <Card
                  className={`p-6 sm:p-8 ${categoryColors[currentQuote.category].bg} ${categoryColors[currentQuote.category].border}`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl sm:text-4xl shrink-0">{currentQuote.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-base sm:text-lg font-semibold text-foreground leading-relaxed mb-3">
                        &ldquo;{currentQuote.text}&rdquo;
                      </p>
                      <Badge
                        variant="outline"
                        className={categoryColors[currentQuote.category].badge}
                      >
                        {currentQuote.category}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Grid of All Quotes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-6 text-center">All Quotes</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quotes.map((quote, i) => {
              const colors = categoryColors[quote.category]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.04, duration: 0.4 }}
                >
                  <Card
                    className={`p-4 card-hover ${colors.bg} ${colors.border} cursor-default`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl shrink-0">{quote.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground leading-relaxed mb-2">
                          &ldquo;{quote.text}&rdquo;
                        </p>
                        <Badge variant="outline" className={`text-[10px] ${colors.badge}`}>
                          {quote.category}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
