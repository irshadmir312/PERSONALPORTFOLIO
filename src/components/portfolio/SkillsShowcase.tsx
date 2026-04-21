'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Code2, Database, ChevronDown, Sparkles } from 'lucide-react'

/* ────────────────────────── data ────────────────────────── */

interface SkillGroup {
  label: string
  skills: string[]
}

interface ServiceCard {
  id: string
  title: string
  subtitle: string
  description: string
  icon: typeof Code2
  groups: SkillGroup[]
}

const serviceCards: ServiceCard[] = [
  {
    id: 'develop',
    title: 'DEVELOP',
    subtitle: 'AI/ML Engineering & Full Stack Development',
    description:
      'Building intelligent systems and scalable web applications from concept to production. I engineer end-to-end ML pipelines and robust full-stack solutions that deliver real business value.',
    icon: Code2,
    groups: [
      {
        label: 'AI/ML Models',
        skills: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost'],
      },
      {
        label: 'Full Stack',
        skills: ['React', 'Next.js', 'FastAPI', 'Flask', 'Django'],
      },
      {
        label: 'Data',
        skills: ['Pandas', 'NumPy', 'SQL', 'Apache Airflow', 'ETL'],
      },
      {
        label: 'Cloud',
        skills: ['AWS', 'GCP', 'Docker', 'Kubernetes'],
      },
      {
        label: 'Databases',
        skills: ['PostgreSQL', 'MongoDB', 'Redis', 'BigQuery'],
      },
    ],
  },
  {
    id: 'data-science',
    title: 'DATA SCIENCE',
    subtitle: 'Advanced Analytics & AI Strategy',
    description:
      'Transforming raw data into actionable intelligence through cutting-edge analytics, deep learning architectures, and strategic AI consulting that drives measurable outcomes.',
    icon: Database,
    groups: [
      {
        label: 'NLP',
        skills: ['spaCy', 'NLTK', 'Hugging Face', 'LLMs', 'RAG', 'LangChain'],
      },
      {
        label: 'Computer Vision',
        skills: ['OpenCV', 'Image Classification', 'Object Detection'],
      },
      {
        label: 'Deep Learning',
        skills: ['CNNs', 'RNNs', 'LSTMs', 'Transformers'],
      },
      {
        label: 'Analytics',
        skills: ['Data Visualization', 'Statistical Analysis', 'A/B Testing'],
      },
      {
        label: 'MLOps',
        skills: ['ML Pipelines', 'Model Deployment', 'CI/CD', 'Monitoring'],
      },
    ],
  },
]

/* ────────────────────── sub-components ────────────────────── */

function SkillTag({ name, index }: { name: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className="skill-tag inline-block"
    >
      {name}
    </motion.span>
  )
}

function SkillGroupRow({ group, groupIndex }: { group: SkillGroup; groupIndex: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: groupIndex * 0.08 }}
      className="space-y-2"
    >
      <p className="text-[11px] font-semibold uppercase tracking-widest text-[#c2a4ff]">
        {group.label}
      </p>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill, i) => (
          <SkillTag
            key={skill}
            name={skill}
            index={groupIndex * 5 + i}
          />
        ))}
      </div>
    </motion.div>
  )
}

function ServiceCardComponent({ card, index }: { card: ServiceCard; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = card.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onClick={() => setExpanded((prev) => !prev)}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setExpanded((prev) => !prev)
        }
      }}
    >
      {/* ── Card body ── */}
      <div
        className="corner-borders relative rounded-xl border border-white/[0.06] bg-white/[0.03]
                   backdrop-blur-sm cursor-pointer select-none overflow-hidden
                   transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                   hover:bg-white/[0.05] hover:border-[rgba(194,164,255,0.2)]
                   hover:shadow-[0_0_40px_rgba(194,164,255,0.06)]
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2a4ff]/40"
      >
        {/* ── Dashed accent – left ── */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px border-l border-dashed"
          style={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}
        />
        {/* ── Dashed accent – right ── */}
        <div
          className="absolute right-0 top-0 bottom-0 w-px border-r border-dashed"
          style={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}
        />

        {/* ── Header (always visible) ── */}
        <div className="relative p-6 sm:p-8">
          {/* Icon badge */}
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#c2a4ff]/10 border border-[#c2a4ff]/20">
            <Icon className="h-6 w-6 text-[#c2a4ff]" />
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#eae5ec] mb-1">
            {card.title}
          </h3>
          <p className="text-sm text-[#c2a4ff]/80 font-medium mb-4">{card.subtitle}</p>

          {/* Description */}
          <p className="text-sm leading-relaxed text-[#8b8498] mb-5">{card.description}</p>

          {/* Expand indicator */}
          <div className="flex items-center gap-2 text-[#c2a4ff]/60">
            <span className="text-xs font-medium uppercase tracking-wider">
              {expanded ? 'Show less' : 'View skills'}
            </span>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </div>
        </div>

        {/* ── Expandable skills section ── */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key={`${card.id}-skills`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div
                className="border-t border-dashed mx-6"
                style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
              />
              <div className="p-6 sm:p-8 pt-5 space-y-5">
                {card.groups.map((group, gi) => (
                  <SkillGroupRow key={group.label} group={group} groupIndex={gi} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ────────────────────── main export ────────────────────── */

export default function SkillsShowcase() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={ref} className="relative py-24 sm:py-32">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section heading ── */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Stacked WHAT / I DO typography */}
            <div className="inline-flex flex-col items-center leading-none select-none">
              <span className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-[0.25em] text-[#8b8498]">
                WHAT
              </span>
              <span className="flex items-center gap-3 -mt-1">
                {/* decorative sparkles */}
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#c2a4ff]/50" />
                <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[0.08em] text-[#c2a4ff]">
                  I DO
                </span>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#c2a4ff]/50" />
              </span>
            </div>

            {/* Decorative divider */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#c2a4ff]/40" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#c2a4ff]/60" />
              <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#c2a4ff]/40" />
            </div>

            <p className="mt-5 text-sm sm:text-base text-[#8b8498] max-w-lg mx-auto leading-relaxed">
              Specializing in two core pillars — engineering intelligent systems
              and unlocking the power of data.
            </p>
          </motion.div>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {serviceCards.map((card, i) => (
            <ServiceCardComponent key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>

      {/* ── Global styles for this component ── */}
      <style jsx global>{`
        /* Corner border decorations */
        .corner-borders {
          position: relative;
        }
        .corner-borders::before,
        .corner-borders::after {
          content: '';
          position: absolute;
          width: 28px;
          height: 28px;
          pointer-events: none;
          z-index: 2;
        }
        .corner-borders::before {
          top: -1px;
          left: -1px;
          border-top: 2px solid rgba(194, 164, 255, 0.6);
          border-left: 2px solid rgba(194, 164, 255, 0.6);
          border-radius: 4px 0 0 0;
        }
        .corner-borders::after {
          top: -1px;
          right: -1px;
          border-top: 2px solid rgba(194, 164, 255, 0.6);
          border-right: 2px solid rgba(194, 164, 255, 0.6);
          border-radius: 0 4px 0 0;
        }

        /* Bottom corners via an inner wrapper – using box-shadow trick */
        .corner-borders > .relative::before,
        .corner-borders > .relative::after {
          content: '';
          position: absolute;
          width: 28px;
          height: 28px;
          pointer-events: none;
          z-index: 2;
        }
        .corner-borders > .relative::before {
          bottom: -1px;
          left: -1px;
          border-bottom: 2px solid rgba(194, 164, 255, 0.6);
          border-left: 2px solid rgba(194, 164, 255, 0.6);
          border-radius: 0 0 0 4px;
        }
        .corner-borders > .relative::after {
          bottom: -1px;
          right: -1px;
          border-bottom: 2px solid rgba(194, 164, 255, 0.6);
          border-right: 2px solid rgba(194, 164, 255, 0.6);
          border-radius: 0 0 4px 0;
        }

        /* Skill tag / pill */
        .skill-tag {
          padding: 4px 12px;
          font-size: 12px;
          font-weight: 500;
          line-height: 1.4;
          letter-spacing: 0.02em;
          color: rgba(234, 229, 236, 0.8);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .skill-tag:hover {
          background: rgba(194, 164, 255, 0.12);
          border-color: rgba(194, 164, 255, 0.3);
          color: #eae5ec;
        }
      `}</style>
    </section>
  )
}
