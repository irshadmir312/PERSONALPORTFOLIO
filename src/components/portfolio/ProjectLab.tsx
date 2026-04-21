'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface Project {
  number: string
  name: string
  category: string
  description: string
  stats: string
  techStack: string[]
}

const projects: Project[] = [
  {
    number: '01',
    name: 'Fraud Detection System',
    category: 'AI / ML',
    description:
      'XGBoost + Neural Network ensemble achieving 96.4% accuracy, processing 1M+ transactions daily with real-time scoring.',
    stats: '96.4% accuracy · 1M+ txns/day',
    techStack: ['Python', 'XGBoost', 'PyTorch', 'SQL'],
  },
  {
    number: '02',
    name: 'AI Customer Chatbot',
    category: 'NLP',
    description:
      'Intelligent conversational agent automating 70%+ of customer queries with 94% intent classification accuracy.',
    stats: '70%+ queries automated · 94% intent accuracy',
    techStack: ['Python', 'FastAPI', 'React', 'NLP'],
  },
  {
    number: '03',
    name: 'Recommendation Engine',
    category: 'Data Science',
    description:
      'Hybrid collaborative + content-based filtering system that boosted user conversion rates by 58%.',
    stats: '58% conversion boost · hybrid filtering',
    techStack: ['Python', 'Scikit-learn', 'Redis', 'SQL'],
  },
  {
    number: '04',
    name: 'ML Data Pipeline',
    category: 'Data Engineering',
    description:
      'Scalable ETL pipeline handling 1M+ records daily, reducing data processing time by 40% across the organization.',
    stats: '1M+ records/day · 40% faster processing',
    techStack: ['Apache Airflow', 'Python', 'Pandas', 'AWS'],
  },
  {
    number: '05',
    name: 'Sentiment Analysis',
    category: 'NLP',
    description:
      'Custom fine-tuned BERT model analyzing 50K+ social media posts daily with aspect-based sentiment scoring.',
    stats: '50K+ posts/day · custom BERT model',
    techStack: ['Python', 'Hugging Face', 'PyTorch', 'Docker'],
  },
  {
    number: '06',
    name: 'Price Prediction',
    category: 'ML',
    description:
      'Real-time ML pricing model achieving 92% prediction accuracy with sub-100ms inference latency via optimized API.',
    stats: '92% accuracy · real-time predictions',
    techStack: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
  },
  {
    number: '07',
    name: 'RuleMatrix AI',
    category: 'Full Stack',
    description:
      'International AI services company platform — end-to-end solution for deploying, managing, and scaling AI products.',
    stats: 'International AI services company',
    techStack: ['React', 'Next.js', 'Node.js', 'MongoDB'],
  },
  {
    number: '08',
    name: 'Portfolio Website',
    category: 'Full Stack',
    description:
      'AI-powered interactive portfolio with personalized experience, gamification, and real-time AI assistant integration.',
    stats: 'AI-powered interactive portfolio',
    techStack: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div variants={cardVariants} className="group relative">
      {/* Card */}
      <div
        className="glass card-hover corner-borders relative flex flex-col h-full rounded-xl overflow-hidden"
        style={{
          background: 'rgba(17, 14, 20, 0.85)',
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(194, 164, 255, 0.5), transparent)',
          }}
        />

        {/* Content */}
        <div className="flex flex-col flex-1 p-6 sm:p-7">
          {/* Header: number + category */}
          <div className="flex items-start justify-between mb-5">
            <span
              className="text-5xl sm:text-6xl font-bold leading-none tracking-tighter select-none"
              style={{ color: 'rgba(255, 255, 255, 0.06)' }}
            >
              {project.number}
            </span>
            <span
              className="skill-tag text-xs shrink-0"
              style={{
                background: 'rgba(194, 164, 255, 0.08)',
                borderColor: 'rgba(194, 164, 255, 0.2)',
                color: '#c2a4ff',
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Project name */}
          <h3 className="text-lg font-semibold mb-3 leading-tight group-hover:text-[#c2a4ff] transition-colors duration-300">
            {project.name}
          </h3>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-4 flex-1"
            style={{ color: '#8b8498' }}
          >
            {project.description}
          </p>

          {/* Stats */}
          <p
            className="text-xs font-medium mb-5 tracking-wide"
            style={{ color: 'rgba(194, 164, 255, 0.7)' }}
          >
            {project.stats}
          </p>

          {/* Tech stack tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.techStack.map((tech) => (
              <span key={tech} className="skill-tag text-xs">
                {tech}
              </span>
            ))}
          </div>

          {/* View project link */}
          <div className="flex items-center gap-1.5 text-sm font-medium mt-auto pt-2">
            <span
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
              style={{ color: '#c2a4ff' }}
            >
              View Project
            </span>
            <ArrowUpRight
              className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 -translate-x-1 group-hover:translate-x-0"
              style={{ color: '#c2a4ff' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectLab() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 sm:mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className="h-px flex-1 max-w-[60px]"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(194, 164, 255, 0.4))',
              }}
            />
            <span
              className="text-xs font-medium uppercase tracking-[0.2em]"
              style={{ color: '#8b8498' }}
            >
              Portfolio
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            MY{' '}
            <span
              className="gradient-text-purple"
              style={{
                textShadow:
                  '0 0 40px rgba(194, 164, 255, 0.3)',
              }}
            >
              WORK
            </span>
          </h2>

          <p
            className="mt-4 text-base sm:text-lg max-w-xl leading-relaxed"
            style={{ color: '#8b8498' }}
          >
            A selection of projects where I&apos;ve applied machine learning,
            data engineering, and full-stack development to solve real-world
            problems.
          </p>
        </motion.div>

        {/* Project grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.number} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
