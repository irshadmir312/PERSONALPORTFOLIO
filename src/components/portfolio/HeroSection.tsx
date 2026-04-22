'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Sparkles,
  ChevronDown,
  Terminal,
  Bot,
  Database,
  Code2,
  BrainCircuit,
  Globe2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePortfolioStore } from '@/store/portfolio'
import { Badge } from '@/components/ui/badge'

/* ──────────────── data ──────────────── */

const subtitleWords = ['AI/ML Engineer', '&', 'Data Scientist']

const stats = [
  { label: 'Years of Experience', value: 2, suffix: '+' },
  { label: 'Projects Completed', value: 15, suffix: '+' },
  { label: 'Happy Clients', value: 10, suffix: '+' },
]

const terminalLines = [
  { prefix: '$', text: 'python train_model.py --epochs 100', color: 'text-[#c2a4ff]' },
  { prefix: '>', text: 'Loading dataset... 50,000 records ✓', color: 'text-cyan-400' },
  { prefix: '>', text: 'Training Neural Network... [████████░░] 87%', color: 'text-purple-400' },
  { prefix: '>', text: 'Accuracy: 96.4% | F1: 0.95 | AUC: 0.98', color: 'text-pink-400' },
  { prefix: '$', text: 'git push origin main ✨', color: 'text-[#c2a4ff]' },
  { prefix: '>', text: 'Model deployed to production 🚀', color: 'text-amber-400' },
]

const techIcons = [
  { icon: BrainCircuit, label: 'AI/ML', color: 'text-[#c2a4ff]' },
  { icon: Database, label: 'Data', color: 'text-cyan-400' },
  { icon: Code2, label: 'Full Stack', color: 'text-purple-400' },
  { icon: Terminal, label: 'DevOps', color: 'text-pink-400' },
]

/* ──────────────── animation helpers ──────────────── */

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ──────────────── component ──────────────── */

export default function HeroSection() {
  const { setChatOpen } = usePortfolioStore()
  const [visibleLines, setVisibleLines] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [typingIndex, setTypingIndex] = useState(0)
  const [typingText, setTypingText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  /* — typing effect — */
  const typingTarget = subtitleWords[typingIndex % subtitleWords.length]

  useEffect(() => {
    const speed = isDeleting ? 40 : 70
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypingText(typingTarget.slice(0, typingText.length + 1))
        if (typingText.length === typingTarget.length) {
          setTimeout(() => setIsDeleting(true), 2200)
        }
      } else {
        setTypingText(typingTarget.slice(0, typingText.length - 1))
        if (typingText.length === 0) {
          setIsDeleting(false)
          setTypingIndex((i) => i + 1)
        }
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [typingText, isDeleting, typingTarget])

  /* — cursor blink — */
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(id)
  }, [])

  /* — terminal line reveal — */
  useEffect(() => {
    if (visibleLines < terminalLines.length) {
      const id = setTimeout(() => setVisibleLines((v) => v + 1), 1100)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => setVisibleLines(0), 3200)
    return () => clearTimeout(id)
  }, [visibleLines])

  /* — scroll helpers — */
  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── ambient glows ── */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full bg-[#c2a4ff]/[0.04] blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-purple-600/[0.04] blur-[140px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/[0.02] blur-[120px]" />

      {/* ── main grid ── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-20 pb-28 sm:px-6 lg:px-8"
      >
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ───── left: text content ───── */}
          <motion.div variants={fadeLeft} className="flex flex-col">
            {/* availability badge */}
            <motion.div variants={fadeUp} className="mb-8 flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c2a4ff] opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#c2a4ff]" />
              </span>
              <span className="text-sm font-medium text-[#8b8498]">
                <Sparkles className="mr-1 inline h-3.5 w-3.5 text-[#c2a4ff]" />
                Available for opportunities
              </span>
            </motion.div>

            {/* greeting line */}
            <motion.p
              variants={fadeUp}
              className="mb-1 text-sm font-light uppercase tracking-[3px] text-[#c2a4ff]"
              style={{ fontVariantCaps: 'small-caps' }}
            >
              Hello! I&apos;m
            </motion.p>

            {/* name — stacked / overlapping style */}
            <motion.div variants={fadeUp} className="mb-5">
              <h1 className="leading-[0.95] tracking-tight">
                {/* First name — bold gradient */}
                <span className="gradient-text-purple block text-5xl font-extrabold sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[6rem]">
                  IRSHAD
                </span>
                {/* Last name — slightly lighter weight, stacked below */}
                <span className="mt-1 block text-4xl font-semibold text-[#eae5ec]/90 sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.6rem]">
                  MAJEED MIR
                </span>
              </h1>
            </motion.div>

            {/* typing subtitle */}
            <motion.div variants={fadeUp} className="mb-6 flex items-center gap-1 text-lg sm:text-xl md:text-2xl">
              <span className="font-medium text-[#eae5ec]">{typingText}</span>
              <span
                className={`inline-block h-[1.15em] w-[3px] translate-y-[1px] bg-[#c2a4ff] ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
              />
            </motion.div>

            {/* location tag */}
            <motion.div variants={fadeUp} className="mb-6 flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-[#c2a4ff]/20 bg-[#c2a4ff]/[0.04] px-3 py-1 text-xs text-[#c2a4ff]"
              >
                <Globe2 className="mr-1 h-3 w-3" />
                Kupwara, Kashmir
              </Badge>
              <Badge
                variant="outline"
                className="border-cyan-500/20 bg-cyan-500/[0.04] px-3 py-1 text-xs text-cyan-400"
              >
                Available for UK &amp; Remote Roles
              </Badge>
            </motion.div>

            {/* description */}
            <motion.p
              variants={fadeUp}
              className="mb-8 max-w-lg text-[15px] leading-relaxed text-[#8b8498] sm:text-base"
            >
              Building intelligent AI systems, chatbots, and data-driven applications
              that create real business impact. Specializing in fraud detection, NLP
              pipelines, recommendation engines, and full-stack AI solutions.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="mb-10 flex flex-wrap gap-3">
              <Button
                onClick={scrollToProjects}
                size="lg"
                className="gap-2 rounded-xl border-0 bg-[#c2a4ff] font-semibold text-[#0b080c] shadow-lg shadow-[#c2a4ff]/20 transition-all duration-300 hover:bg-[#d4bfff] hover:shadow-xl hover:shadow-[#c2a4ff]/30"
              >
                Explore My Work
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                onClick={scrollToContact}
                size="lg"
                variant="outline"
                className="gap-2 rounded-xl border-[#c2a4ff]/30 text-[#c2a4ff] transition-all duration-300 hover:border-[#c2a4ff]/60 hover:bg-[#c2a4ff]/10"
              >
                Let&apos;s Connect
              </Button>
              <Button
                onClick={() => setChatOpen(true)}
                size="lg"
                variant="outline"
                className="gap-2 rounded-xl border-[#c2a4ff]/30 text-[#c2a4ff] transition-all duration-300 hover:border-[#c2a4ff]/60 hover:bg-[#c2a4ff]/10"
              >
                <Bot className="h-4 w-4" />
                Chat with AI Clone
              </Button>
            </motion.div>

            {/* stats row */}
            <motion.div variants={fadeUp} className="flex gap-8 sm:gap-12">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-[#eae5ec] sm:text-3xl">
                    <AnimatedCounter value={stat.value} />
                    <span className="text-[#c2a4ff]">{stat.suffix}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-[#8b8498] sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ───── right: terminal + icons (desktop) ───── */}
          <motion.div
            variants={fadeRight}
            className="hidden lg:block"
          >
            {/* terminal window */}
            <motion.div variants={scaleIn} className="glass overflow-hidden rounded-2xl neon-border">
              {/* title bar */}
              <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3.5">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-[#c2a4ff]/80" />
                <span className="ml-3 font-mono text-xs text-[#8b8498]">
                  irshad@ai-portfolio ~ %
                </span>
              </div>

              {/* terminal body */}
              <div className="min-h-[320px] space-y-2.5 p-5 font-mono text-[13px] leading-relaxed">
                {terminalLines.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={`${i}-${visibleLines}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    <span className="text-[#8b8498]/60">{line.prefix} </span>
                    <span className={line.color}>{line.text}</span>
                  </motion.div>
                ))}

                {/* blinking cursor at the end */}
                {visibleLines > 0 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-block h-4 w-2 translate-y-[2px] bg-[#c2a4ff] animate-pulse"
                  />
                )}
              </div>
            </motion.div>

            {/* tech icons row */}
            <div className="mt-7 flex justify-center gap-4">
              {techIcons.map((tech, i) => (
                <motion.div
                  key={tech.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.12, y: -6 }}
                  className="glass flex cursor-default flex-col items-center gap-2 rounded-xl px-5 py-3.5 transition-colors duration-300 hover:border-[#c2a4ff]/20"
                >
                  <tech.icon className={`h-6 w-6 ${tech.color}`} />
                  <span className="text-[10px] font-medium text-[#8b8498]">{tech.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[3px] text-[#8b8498]/50">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5 text-[#c2a4ff]/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ──────────────── animated counter ──────────────── */

function AnimatedCounter({ value, delay = 1200 }: { value: number; delay?: number }) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    const start = setTimeout(() => {
      let cur = 0
      const step = value / (2200 / 16)
      const id = setInterval(() => {
        cur += step
        if (cur >= value) {
          setCount(value)
          clearInterval(id)
        } else {
          setCount(Math.floor(cur))
        }
      }, 16)
      return () => clearInterval(id)
    }, delay)

    return () => clearTimeout(start)
  }, [value, delay])

  return <>{count}</>
}
