'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  MapPin,
  GraduationCap,
  Cpu,
  Building2,
  Sparkles,
  ArrowRight,
  Globe,
  Brain,
  ShieldCheck,
  Languages,
  ChevronDown,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const quickFacts = [
  {
    icon: MapPin,
    label: 'Location',
    value: 'Kupwara, Kashmir, India',
  },
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'B.Tech in Computer Science',
  },
  {
    icon: Cpu,
    label: 'Role',
    value: 'AI / ML Engineer & Data Scientist',
  },
  {
    icon: Building2,
    label: 'Company',
    value: 'RuleMatrix — AI Solutions',
  },
]

const focusAreas = [
  { icon: Brain, text: 'Artificial Intelligence' },
  { icon: ShieldCheck, text: 'Fraud Detection Systems' },
  { icon: Languages, text: 'Natural Language Processing' },
  { icon: Cpu, text: 'Machine Learning Pipelines' },
  { icon: Globe, text: 'Intelligent Web Applications' },
]

const journeySteps = [
  {
    year: 'Roots',
    title: 'Born in Kashmir',
    description:
      'Grew up in Kupwara — a place that taught resilience, curiosity, and the value of dreaming big against all odds.',
  },
  {
    year: 'Education',
    title: 'B.Tech Computer Science',
    description:
      'Discovered data science during university. Nights turned into model training sessions and deep research paper rabbit holes.',
  },
  {
    year: 'Growth',
    title: 'Self-Taught & Relentless',
    description:
      'Mastered deep learning, full-stack development, and system design through relentless self-study and hands-on project building.',
  },
  {
    year: 'Launch',
    title: 'Founded RuleMatrix',
    description:
      'Turned a vision into reality — an AI solutions company helping businesses harness intelligent, scalable technology.',
  },
  {
    year: 'Horizon',
    title: 'Global Expansion',
    description:
      'Expanding to the UK and beyond, bringing AI-driven transformation to businesses on the global stage.',
  },
]

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.06, ease: 'easeOut' },
  }),
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SectionLabel() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={0}
      className="flex items-center gap-3 mb-4"
    >
      <span className="block w-8 h-px bg-[#c2a4ff]/60" />
      <span className="text-xs font-medium tracking-[0.3em] uppercase text-[#c2a4ff]/80">
        About Me
      </span>
      <span className="block w-8 h-px bg-[#c2a4ff]/60" />
    </motion.div>
  )
}

function SectionHeading() {
  return (
    <motion.h2
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={1}
      className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight"
    >
      Crafting{' '}
      <span className="gradient-text-purple">Intelligent Systems</span>
      <br className="hidden sm:block" />
      {' '}That Make a Difference
    </motion.h2>
  )
}

function BioParagraphs() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={2}
      className="max-w-2xl space-y-5"
    >
      <p className="text-base sm:text-lg leading-[1.8] text-[#eae5ec]/80">
        I&apos;m <span className="text-[#c2a4ff] font-medium">Irshad Majeed Mir</span> — an
        AI/ML Engineer and Data Scientist from the breathtaking valleys of
        Kupwara, Kashmir. I build intelligent systems that solve real-world
        problems, turning raw data into actionable insights and scalable
        solutions.
      </p>

      <p className="text-base sm:text-lg leading-[1.8] text-[#8b8498]">
        My journey into technology began with curiosity and a borrowed laptop.
        During my B.Tech in Computer Science, I fell in love with machine
        learning — and what started as late-night experiments quickly became an
        obsession. I taught myself deep learning, natural language processing,
        fraud detection, and full-stack development because the problems I
        wanted to solve demanded more than just one skill set.
      </p>

      <p className="text-base sm:text-lg leading-[1.8] text-[#8b8498]">
        Today, I&apos;m the founder of{' '}
        <span className="text-[#c2a4ff] font-medium">RuleMatrix</span>, an AI
        solutions company dedicated to making artificial intelligence
        accessible, practical, and transformative. From fraud detection systems
        to NLP pipelines, I architect end-to-end solutions that empower
        businesses to operate smarter. I&apos;m currently expanding my horizons
        toward the UK and global markets, open to both freelance collaborations
        and full-time roles.
      </p>
    </motion.div>
  )
}

function QuickFacts() {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={0}
      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
    >
      {quickFacts.map((fact, i) => {
        const Icon = fact.icon
        return (
          <motion.div
            key={fact.label}
            variants={scaleIn}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl glass card-hover group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#c2a4ff]/10 flex items-center justify-center shrink-0 group-hover:bg-[#c2a4ff]/15 transition-colors">
              <Icon className="w-4 h-4 text-[#c2a4ff]" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wider text-[#8b8498]">
                {fact.label}
              </p>
              <p className="text-sm font-medium text-[#eae5ec] truncate">
                {fact.value}
              </p>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

function FocusAreas() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={0}
      className="flex flex-wrap gap-2"
    >
      {focusAreas.map((area, i) => {
        const Icon = area.icon
        return (
          <motion.span
            key={area.text}
            variants={fadeIn}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.04, y: -1 }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium
                       bg-[#c2a4ff]/8 text-[#c2a4ff]/90 border border-[#c2a4ff]/12
                       hover:bg-[#c2a4ff]/15 hover:border-[#c2a4ff]/25 transition-all cursor-default"
          >
            <Icon className="w-3.5 h-3.5" />
            {area.text}
          </motion.span>
        )
      })}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Journey timeline with animated progress bar                       */
/* ------------------------------------------------------------------ */

function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={0}
    >
      {/* Section heading */}
      <div className="text-center mb-12 sm:mb-16">
        <motion.p
          variants={fadeIn}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-xs font-medium tracking-[0.25em] uppercase text-[#c2a4ff]/70 mb-3"
        >
          The Journey
        </motion.p>
        <motion.h3
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold"
        >
          From Curiosity to{' '}
          <span className="gradient-text-purple">Creation</span>
        </motion.h3>
      </div>

      {/* Timeline */}
      <div ref={containerRef} className="relative max-w-3xl mx-auto">
        {/* Animated vertical line */}
        <div className="absolute left-[18px] sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-white/[0.06]">
          {isInView && (
            <motion.div
              className="w-full bg-gradient-to-b from-[#c2a4ff]/70 via-[#a855f7]/40 to-transparent"
              initial={{ height: '0%' }}
              animate={{ height: '100%' }}
              transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          )}
        </div>

        <div className="space-y-10 sm:space-y-14">
          {journeySteps.map((step, index) => {
            const isLeft = index % 2 === 0

            return (
              <TimelineItem
                key={step.year}
                step={step}
                index={index}
                isLeft={isLeft}
              />
            )
          })}
        </div>

        {/* Bottom chevron */}
        <motion.div
          variants={fadeIn}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <ChevronDown className="w-5 h-5 text-[#c2a4ff]/40 animate-bounce" />
        </motion.div>
      </div>
    </motion.div>
  )
}

function TimelineItem({
  step,
  index,
  isLeft,
}: {
  step: (typeof journeySteps)[number]
  index: number
  isLeft: boolean
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={`relative flex items-start gap-5 sm:gap-0 ${
        isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
      }`}
    >
      {/* Dot */}
      <div
        className={`absolute left-[14px] sm:left-1/2 -translate-x-1/2 w-[9px] h-[9px] rounded-full
                    bg-[#c2a4ff] border-2 border-[#0b080c] z-10 mt-5 shrink-0
                    shadow-[0_0_8px_rgba(194,164,255,0.5)]`}
      />

      {/* Content card */}
      <div
        className={`ml-10 sm:ml-0 sm:w-[calc(50%-1.5rem)] ${
          isLeft ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'
        }`}
      >
        <div
          className={`p-5 rounded-2xl glass corner-borders card-hover group
                      ${
                        isLeft
                          ? 'sm:rounded-tr-sm'
                          : 'sm:rounded-tl-sm'
                      }`}
        >
          {/* Year tag */}
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#c2a4ff] mb-2
                        ${isLeft ? 'sm:flex-row-reverse' : ''}`}
          >
            <ArrowRight
              className={`w-3 h-3 ${isLeft ? 'sm:rotate-180' : ''}`}
            />
            {step.year}
          </span>

          <h4 className="text-sm font-bold text-[#eae5ec] mb-1.5 leading-snug">
            {step.title}
          </h4>

          <p className="text-[13px] leading-relaxed text-[#8b8498]">
            {step.description}
          </p>
        </div>
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden sm:block sm:w-[calc(50%-1.5rem)]" />
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Availability CTA                                                   */
/* ------------------------------------------------------------------ */

function AvailabilityBanner() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={0}
    >
      <div className="max-w-2xl mx-auto rounded-2xl neon-border glass p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        {/* Pulse indicator */}
        <div className="relative shrink-0">
          <div className="w-11 h-11 rounded-xl bg-[#c2a4ff]/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-[#c2a4ff]" />
          </div>
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0b080c] animate-pulse" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#eae5ec] mb-1">
            Available for Opportunities
          </p>
          <p className="text-[13px] text-[#8b8498] leading-relaxed">
            Open to UK &amp; remote roles — freelance projects and full-time
            positions. Let&apos;s build something remarkable together.
          </p>
        </div>

        <Badge
          className="shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold
                     bg-[#c2a4ff]/12 text-[#c2a4ff] border-[#c2a4ff]/20
                     hover:bg-[#c2a4ff]/20 transition-colors cursor-default"
        >
          <Sparkles className="w-3 h-3 mr-1.5" />
          Open to Work
        </Badge>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function PersonalStory() {
  return (
    <section id="about" className="relative py-24 sm:py-32 lg:py-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ---- Top: heading + bio + quick facts ---- */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-12 lg:gap-16 mb-20 sm:mb-28">
          {/* Left column: label, heading, bio */}
          <div className="space-y-8">
            <SectionLabel />
            <SectionHeading />
            <BioParagraphs />

            {/* Focus areas pills */}
            <div>
              <motion.p
                variants={fadeIn}
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8b8498] mb-3"
              >
                Core Focus Areas
              </motion.p>
              <FocusAreas />
            </div>
          </div>

          {/* Right column: quick facts */}
          <div className="lg:pt-14">
            <motion.p
              variants={fadeIn}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8b8498] mb-3"
            >
              At a Glance
            </motion.p>
            <QuickFacts />
          </div>
        </div>

        {/* Divider */}
        <div className="divider-gradient mb-20 sm:mb-28" />

        {/* ---- Timeline ---- */}
        <div className="mb-20 sm:mb-28">
          <JourneyTimeline />
        </div>

        {/* Divider */}
        <div className="divider-gradient mb-16 sm:mb-20" />

        {/* ---- Availability CTA ---- */}
        <AvailabilityBanner />
      </div>
    </section>
  )
}
