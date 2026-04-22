'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Bot,
  BrainCircuit,
  Code2,
  Database,
  BarChart3,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string
  icon: LucideIcon
  price: string
}

const services: Service[] = [
  {
    id: 'ai-chatbot-development',
    title: 'AI Chatbot Development',
    description: 'Custom AI chatbots with NLP capabilities, built to understand and engage your users naturally.',
    icon: Bot,
    price: '₹50K – ₹3L',
  },
  {
    id: 'ml-model-development',
    title: 'ML Model Development',
    description: 'Production-ready machine learning models tailored to your business data and objectives.',
    icon: BrainCircuit,
    price: '₹1L – ₹5L',
  },
  {
    id: 'full-stack-ai-apps',
    title: 'Full-Stack AI Apps',
    description: 'End-to-end AI-powered applications from responsive frontends to scalable backends.',
    icon: Code2,
    price: '₹2L – ₹10L+',
  },
  {
    id: 'data-engineering',
    title: 'Data Engineering',
    description: 'ETL pipelines, data warehousing, and infrastructure built for reliability at scale.',
    icon: Database,
    price: '₹50K – ₹2L',
  },
  {
    id: 'ai-consulting',
    title: 'AI Consulting',
    description: 'Strategic guidance on AI adoption, architecture decisions, and implementation roadmaps.',
    icon: BarChart3,
    price: 'Hourly / Project',
  },
  {
    id: 'nlp-solutions',
    title: 'NLP Solutions',
    description: 'Text analysis, sentiment detection, document processing, and conversational AI systems.',
    icon: MessageSquare,
    price: '₹75K – ₹4L',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.1,
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      className="group relative rounded-lg p-[1px] transition-all duration-300
        bg-[rgba(255,255,255,0.04)]
        hover:bg-gradient-to-br hover:from-[#c2a4ff]/30 hover:to-[#a855f7]/10
        hover:shadow-[0_0_30px_rgba(194,164,255,0.12)]"
    >
      <div
        className="corner-borders relative rounded-lg h-full flex flex-col"
        style={{ background: 'rgba(17, 14, 20, 0.85)' }}
      >
        {/* Extra corner accents (bottom-left, top-right) via inner wrapper */}
        <div className="relative p-6 flex flex-col flex-1 rounded-lg overflow-hidden">
          {/* Subtle gradient sheen on hover */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 30% 20%, rgba(194,164,255,0.06) 0%, transparent 60%)',
            }}
          />

          {/* Icon */}
          <div
            className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300
              bg-[rgba(194,164,255,0.08)]
              group-hover:bg-[rgba(194,164,255,0.15)]
              group-hover:shadow-[0_0_20px_rgba(194,164,255,0.1)]"
          >
            <Icon
              className="w-6 h-6 transition-colors duration-300"
              style={{ color: '#c2a4ff' }}
            />
          </div>

          {/* Title */}
          <h3
            className="relative z-10 text-base font-bold mb-2 transition-colors duration-300"
            style={{ color: '#eae5ec' }}
          >
            {service.title}
          </h3>

          {/* Description */}
          <p
            className="relative z-10 text-sm leading-relaxed flex-1 mb-5"
            style={{ color: '#8b8498' }}
          >
            {service.description}
          </p>

          {/* Price Tag */}
          <div className="relative z-10 self-start">
            <span
              className="inline-block text-xs font-medium px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(194, 164, 255, 0.1)',
                color: '#c2a4ff',
              }}
            >
              {service.price}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" ref={ref} className="relative py-24 sm:py-32">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <p
            className="text-xs font-semibold tracking-[0.35em] uppercase mb-3"
            style={{ color: '#c2a4ff' }}
          >
            SERVICES
          </p>
          <div className="divider-gradient mb-5" />
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: '#eae5ec' }}
          >
            What I <span className="gradient-text-purple">Build</span>
          </h2>
          <p
            className="max-w-xl mx-auto text-base leading-relaxed"
            style={{ color: '#8b8498' }}
          >
            From intelligent chatbots to production ML systems — tailored solutions
            that transform the way you work.
          </p>
        </motion.div>

        {/* ── Service Cards Grid ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
