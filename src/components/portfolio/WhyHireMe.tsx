'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Zap, Rocket, Quote } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ValueCard {
  problem: string
  solution: string
  impact: string
  impactNumber: number
  impactSuffix: string
  icon: typeof TrendingUp
  color: string
  bgColor: string
  borderColor: string
  quote: string
}

const values: ValueCard[] = [
  {
    problem: 'Businesses drowning in data but starving for insights.',
    solution: 'ML-powered analytics pipelines that turn raw data into actionable intelligence.',
    impact: 'Better data-driven decisions',
    impactNumber: 40,
    impactSuffix: '%',
    icon: TrendingUp,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/5',
    borderColor: 'border-emerald-500/20',
    quote: 'Data is the new oil, but only if you can refine it. I build the refineries.',
  },
  {
    problem: 'Manual processes that waste time, money, and human potential.',
    solution: 'Automated AI systems that handle repetitive tasks at scale with precision.',
    impact: 'Increase in operational efficiency',
    impactNumber: 10,
    impactSuffix: 'x',
    icon: Zap,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/5',
    borderColor: 'border-cyan-500/20',
    quote: 'Automation isn\'t about replacing humans — it\'s about amplifying their capabilities.',
  },
  {
    problem: 'Fragmented teams building disconnected systems that never ship.',
    solution: 'End-to-end full stack + AI development from prototype to production deployment.',
    impact: 'Faster time-to-market',
    impactNumber: 60,
    impactSuffix: '%',
    icon: Rocket,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/5',
    borderColor: 'border-purple-500/20',
    quote: 'Great products aren\'t built in silos. They\'re crafted by engineers who see the full picture.',
  },
]

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current * 10) / 10)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold font-mono">
      {suffix === 'x' ? count.toFixed(1) : Math.round(count)}
      <span className={suffix === '%' ? 'text-emerald-400' : 'text-cyan-400'}>{suffix}</span>
    </span>
  )
}

export default function WhyHireMe() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why <span className="neon-text text-emerald-400">Hire Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real problems solved with real impact. Here&apos;s the value I bring.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {values.map((value, i) => {
            const Icon = value.icon

            return (
              <motion.div
                key={value.problem}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.15, duration: 0.6 }}
              >
                <Card className={`glass h-full overflow-hidden card-hover ${value.borderColor}`}>
                  {/* Impact Number */}
                  <div className={`p-6 sm:p-8 ${value.bgColor}`}>
                    <AnimatedCounter target={value.impactNumber} suffix={value.impactSuffix} />
                    <p className="text-sm text-muted-foreground mt-1">{value.impact}</p>
                  </div>

                  <div className="p-5 sm:p-6 space-y-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg ${value.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${value.color}`} />
                    </div>

                    {/* Problem */}
                    <div>
                      <Badge variant="outline" className="text-[10px] border-red-500/20 text-red-400 mb-2 bg-red-500/5">
                        Problem
                      </Badge>
                      <p className="text-sm text-muted-foreground">{value.problem}</p>
                    </div>

                    {/* Solution */}
                    <div>
                      <Badge variant="outline" className="text-[10px] border-emerald-500/20 text-emerald-400 mb-2 bg-emerald-500/5">
                        Solution
                      </Badge>
                      <p className="text-sm text-foreground">{value.solution}</p>
                    </div>

                    {/* Quote */}
                    <div className="pt-3 border-t border-white/5">
                      <div className="flex gap-2">
                        <Quote className={`w-4 h-4 ${value.color} shrink-0 mt-0.5`} />
                        <p className="text-xs text-muted-foreground italic leading-relaxed">
                          {value.quote}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
