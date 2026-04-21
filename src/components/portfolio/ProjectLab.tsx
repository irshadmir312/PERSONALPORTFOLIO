'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  Play,
  X,
  Shield,
  Bot,
  TrendingUp,
  Database,
  BarChart3,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface Project {
  number: string
  name: string
  category: string
  description: string
  stats: string
  techStack: string[]
  hasDemo: boolean
  demoType: 'fraud' | 'chatbot' | 'recommendation' | 'pipeline'
}

const projects: Project[] = [
  {
    number: '01',
    name: 'Fraud Detection System',
    category: 'AI / ML',
    description: 'XGBoost + Neural Network ensemble achieving 96.4% accuracy, processing 1M+ transactions daily with real-time scoring.',
    stats: '96.4% accuracy · 1M+ txns/day',
    techStack: ['Python', 'XGBoost', 'PyTorch', 'SQL'],
    hasDemo: true,
    demoType: 'fraud',
  },
  {
    number: '02',
    name: 'AI Customer Chatbot',
    category: 'NLP',
    description: 'Intelligent conversational agent automating 70%+ of customer queries with 94% intent classification accuracy.',
    stats: '70%+ queries automated · 94% intent accuracy',
    techStack: ['Python', 'FastAPI', 'React', 'NLP'],
    hasDemo: true,
    demoType: 'chatbot',
  },
  {
    number: '03',
    name: 'Recommendation Engine',
    category: 'Data Science',
    description: 'Hybrid collaborative + content-based filtering system that boosted user conversion rates by 58%.',
    stats: '58% conversion boost · hybrid filtering',
    techStack: ['Python', 'Scikit-learn', 'Redis', 'SQL'],
    hasDemo: true,
    demoType: 'recommendation',
  },
  {
    number: '04',
    name: 'ML Data Pipeline',
    category: 'Data Engineering',
    description: 'Scalable ETL pipeline handling 1M+ records daily, reducing data processing time by 40% across the organization.',
    stats: '1M+ records/day · 40% faster processing',
    techStack: ['Apache Airflow', 'Python', 'Pandas', 'AWS'],
    hasDemo: true,
    demoType: 'pipeline',
  },
  {
    number: '05',
    name: 'Sentiment Analysis',
    category: 'NLP',
    description: 'Custom fine-tuned BERT model analyzing 50K+ social media posts daily with aspect-based sentiment scoring.',
    stats: '50K+ posts/day · custom BERT model',
    techStack: ['Python', 'Hugging Face', 'PyTorch', 'Docker'],
    hasDemo: false,
    demoType: 'fraud',
  },
  {
    number: '06',
    name: 'Price Prediction',
    category: 'ML',
    description: 'Real-time ML pricing model achieving 92% prediction accuracy with sub-100ms inference latency via optimized API.',
    stats: '92% accuracy · real-time predictions',
    techStack: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
    hasDemo: false,
    demoType: 'fraud',
  },
  {
    number: '07',
    name: 'RuleMatrix AI',
    category: 'Full Stack',
    description: 'International AI services company platform — end-to-end solution for deploying, managing, and scaling AI products.',
    stats: 'International AI services company',
    techStack: ['React', 'Next.js', 'Node.js', 'MongoDB'],
    hasDemo: false,
    demoType: 'fraud',
  },
  {
    number: '08',
    name: 'Portfolio Website',
    category: 'Full Stack',
    description: 'AI-powered interactive portfolio with personalized experience, gamification, and real-time AI assistant integration.',
    stats: 'AI-powered interactive portfolio',
    techStack: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    hasDemo: false,
    demoType: 'fraud',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

/* ─── Fraud Detection Demo Component ─── */
function FraudDetectionDemo({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [amount, setAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<'legit' | 'fraud' | null>(null)
  const [riskScore, setRiskScore] = useState(0)

  const transactions = [
    { id: 'TXN-001', amount: 45.99, merchant: 'Amazon', status: '✅ Legitimate', risk: 2 },
    { id: 'TXN-002', amount: 1250.00, merchant: 'Unknown Store', status: '✅ Legitimate', risk: 15 },
    { id: 'TXN-003', amount: 8999.99, merchant: 'Crypto Exchange', status: '⚠️ Suspicious', risk: 78 },
    { id: 'TXN-004', amount: 0.01, merchant: 'Test Merchant', status: '🚫 Fraudulent', risk: 96 },
    { id: 'TXN-005', amount: 3200.00, merchant: 'Wire Transfer Int', status: '⚠️ Suspicious', risk: 65 },
  ]

  const handleAnalyze = () => {
    if (!amount) return
    setIsProcessing(true)
    setStep(2)

    // Simulate processing
    const amt = parseFloat(amount)
    const score = amt > 5000 ? 60 + Math.floor(Math.random() * 35) : amt > 1000 ? 20 + Math.floor(Math.random() * 40) : 2 + Math.floor(Math.random() * 15)

    setTimeout(() => {
      setRiskScore(score)
      setResult(score > 70 ? 'fraud' : 'legit')
      setIsProcessing(false)
      setStep(3)
    }, 2500)
  }

  const resetDemo = () => {
    setStep(0)
    setAmount('')
    setResult(null)
    setRiskScore(0)
    setIsProcessing(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(11, 8, 12, 0.95)', backdropFilter: 'blur(20px)' }}
    >
      <Card className="glass neon-border w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#8b8498] hover:text-[#c2a4ff] transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#c2a4ff]/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#c2a4ff]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#eae5ec]">Fraud Detection System</h3>
            <p className="text-xs text-[#8b8498]">Interactive Demo • XGBoost + Neural Network</p>
          </div>
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <p className="text-[#8b8498] text-sm">This demo simulates how the fraud detection model analyzes transactions in real-time.</p>

            <h4 className="font-semibold text-[#eae5ec]">Recent Transactions</h4>
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div key={tx.id} className="glass p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#8b8498]">{tx.id}</span>
                    <p className="text-sm text-[#eae5ec]">{tx.merchant}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#eae5ec]">${tx.amount.toFixed(2)}</p>
                    <p className="text-xs">{tx.status}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button onClick={() => setStep(1)} className="w-full bg-[#c2a4ff] text-[#0b080c] hover:bg-[#d4bfff] gap-2">
              <Play className="w-4 h-4" />
              Try Transaction Analysis
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-[#eae5ec]">💰 Enter Transaction Amount</h4>
            <p className="text-sm text-[#8b8498]">Enter any amount and the model will analyze it for fraud risk.</p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 4500.00"
              className="w-full bg-[#0b080c]/50 border border-white/[0.08] rounded-lg p-4 text-[#eae5ec] text-lg font-mono focus:outline-none focus:border-[#c2a4ff]/40"
              autoFocus
            />
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(0)} className="border-white/[0.1] text-[#8b8498] flex-1">Back</Button>
              <Button onClick={handleAnalyze} disabled={!amount} className="flex-1 bg-[#c2a4ff] text-[#0b080c] hover:bg-[#d4bfff] gap-2">
                <Activity className="w-4 h-4" />
                Analyze Transaction
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 py-8">
            <div className="flex flex-col items-center">
              <Loader2 className="w-12 h-12 text-[#c2a4ff] animate-spin mb-4" />
              <h4 className="font-semibold text-[#eae5ec]">Analyzing Transaction...</h4>
              <p className="text-sm text-[#8b8498]">Running through XGBoost + Neural Network ensemble</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-[#eae5ec]">Transaction validated ✓</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-[#eae5ec]">Feature extraction complete ✓</span>
              </div>
              <div className="flex items-center gap-3">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                  <Loader2 className="w-4 h-4 text-[#c2a4ff]" />
                </motion.div>
                <span className="text-sm text-[#c2a4ff]">Model prediction in progress...</span>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className={`glass p-6 rounded-xl text-center ${result === 'fraud' ? 'border-red-500/30' : 'border-emerald-500/30'}`}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                {result === 'fraud' ? (
                  <AlertTriangle className="w-14 h-14 text-red-400 mx-auto mb-3" />
                ) : (
                  <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-3" />
                )}
              </motion.div>
              <h4 className={`text-xl font-bold ${result === 'fraud' ? 'text-red-400' : 'text-emerald-400'}`}>
                {result === 'fraud' ? '🚨 High Fraud Risk Detected!' : '✅ Transaction is Legitimate'}
              </h4>
              <p className="text-sm text-[#8b8498] mt-2">Amount: ${parseFloat(amount).toFixed(2)}</p>
            </div>

            <div className="glass p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-[#8b8498]">Risk Score</span>
                <span className={`text-sm font-bold ${riskScore > 70 ? 'text-red-400' : riskScore > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {riskScore}%
                </span>
              </div>
              <Progress
                value={riskScore}
                className="h-2"
              />
              <p className="text-xs text-[#8b8498] mt-2">
                {riskScore > 70 ? '🚫 Recommendation: Block transaction' : riskScore > 40 ? '⚠️ Recommendation: Manual review' : '✅ Recommendation: Approve'}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="glass p-3 rounded-lg text-center">
                <Database className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <p className="text-xs text-[#8b8498]">Features</p>
                <p className="text-sm font-bold text-[#eae5ec]">24</p>
              </div>
              <div className="glass p-3 rounded-lg text-center">
                <BarChart3 className="w-5 h-5 text-[#c2a4ff] mx-auto mb-1" />
                <p className="text-xs text-[#8b8498]">Models</p>
                <p className="text-sm font-bold text-[#eae5ec]">2</p>
              </div>
              <div className="glass p-3 rounded-lg text-center">
                <Activity className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <p className="text-xs text-[#8b8498]">Latency</p>
                <p className="text-sm font-bold text-[#eae5ec]">&lt;50ms</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={resetDemo} variant="outline" className="flex-1 border-white/[0.1] text-[#8b8498]">Try Different Amount</Button>
              <Button onClick={onClose} className="flex-1 bg-[#c2a4ff] text-[#0b080c] hover:bg-[#d4bfff]">Close Demo</Button>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  )
}

/* ─── Generic Demo Modal ─── */
function GenericDemo({ project, onClose }: { project: Project; onClose: () => void }) {
  const demoContent: Record<string, { icon: typeof Bot; title: string; description: string; features: string[] }> = {
    chatbot: {
      icon: Bot,
      title: 'AI Customer Chatbot Demo',
      description: 'Simulated AI chatbot handling customer queries with 94% intent classification accuracy.',
      features: ['Natural Language Understanding', 'Multi-turn Conversations', 'Intent Classification', 'Response Generation', 'Sentiment Detection', 'Multi-language Support'],
    },
    recommendation: {
      icon: TrendingUp,
      title: 'Recommendation Engine Demo',
      description: 'Hybrid collaborative + content-based filtering system that boosted conversion rates by 58%.',
      features: ['User Behavior Analysis', 'Item Similarity Matching', 'Collaborative Filtering', 'Content-Based Filtering', 'Real-time Updates', 'A/B Testing'],
    },
    pipeline: {
      icon: Database,
      title: 'ML Data Pipeline Demo',
      description: 'Scalable ETL pipeline handling 1M+ records daily with 40% faster processing.',
      features: ['Automated Data Ingestion', 'Data Validation', 'Feature Engineering', 'Model Training', 'Performance Monitoring', 'Auto-scaling'],
    },
  }

  const demo = demoContent[project.demoType]
  if (!demo) {
    onClose()
    return null
  }
  const Icon = demo.icon

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(11, 8, 12, 0.95)', backdropFilter: 'blur(20px)' }}
    >
      <Card className="glass neon-border w-full max-w-lg p-6 sm:p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#8b8498] hover:text-[#c2a4ff] transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#c2a4ff]/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#c2a4ff]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#eae5ec]">{demo.title}</h3>
            <p className="text-xs text-[#8b8498]">{project.category}</p>
          </div>
        </div>

        <p className="text-[#8b8498] text-sm mb-6">{demo.description}</p>

        <h4 className="font-semibold text-[#eae5ec] mb-3">Key Features</h4>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {demo.features.map((f) => (
            <div key={f} className="glass p-3 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs text-[#eae5ec]">{f}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span key={tech} className="skill-tag text-xs">{tech}</span>
          ))}
        </div>

        <Button onClick={onClose} className="w-full bg-[#c2a4ff] text-[#0b080c] hover:bg-[#d4bfff]">
          Close Demo
        </Button>
      </Card>
    </motion.div>
  )
}

/* ─── Project Card Component ─── */
function ProjectCard({ project, index, onDemo }: { project: Project; index: number; onDemo: (p: Project) => void }) {
  return (
    <motion.div variants={cardVariants} className="group relative">
      <div className="glass card-hover corner-borders relative flex flex-col h-full rounded-xl overflow-hidden" style={{ background: 'rgba(17, 14, 20, 0.85)' }}>
        <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(194, 164, 255, 0.5), transparent)' }}
        />

        <div className="flex flex-col flex-1 p-6 sm:p-7">
          <div className="flex items-start justify-between mb-5">
            <span className="text-5xl sm:text-6xl font-bold leading-none tracking-tighter select-none" style={{ color: 'rgba(255, 255, 255, 0.06)' }}>
              {project.number}
            </span>
            <span className="skill-tag text-xs shrink-0" style={{ background: 'rgba(194, 164, 255, 0.08)', borderColor: 'rgba(194, 164, 255, 0.2)', color: '#c2a4ff' }}>
              {project.category}
            </span>
          </div>

          <h3 className="text-lg font-semibold mb-3 leading-tight group-hover:text-[#c2a4ff] transition-colors duration-300">
            {project.name}
          </h3>

          <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: '#8b8498' }}>
            {project.description}
          </p>

          <p className="text-xs font-medium mb-5 tracking-wide" style={{ color: 'rgba(194, 164, 255, 0.7)' }}>
            {project.stats}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.techStack.map((tech) => (
              <span key={tech} className="skill-tag text-xs">{tech}</span>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-auto pt-2">
            {project.hasDemo && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onDemo(project)}
                className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300"
                style={{
                  background: 'rgba(194, 164, 255, 0.1)',
                  border: '1px solid rgba(194, 164, 255, 0.2)',
                  color: '#c2a4ff',
                }}
              >
                <Play className="w-3.5 h-3.5" />
                Try Demo
              </motion.button>
            )}
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0" style={{ color: '#c2a4ff' }}>
                View Project
              </span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 -translate-x-1 group-hover:translate-x-0" style={{ color: '#c2a4ff' }} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main Project Lab Component ─── */
export default function ProjectLab() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const [demoProject, setDemoProject] = useState<Project | null>(null)

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 sm:mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(194, 164, 255, 0.4))' }} />
            <span className="text-xs font-medium uppercase tracking-[0.2em]" style={{ color: '#8b8498' }}>
              Portfolio
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            MY{' '}
            <span className="gradient-text-purple" style={{ textShadow: '0 0 40px rgba(194, 164, 255, 0.3)' }}>
              WORK
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg max-w-xl leading-relaxed" style={{ color: '#8b8498' }}>
            A selection of projects where I&apos;ve applied machine learning, data engineering, and full-stack development to solve real-world problems. Click &quot;Try Demo&quot; to interact! 🚀
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.number} project={project} index={index} onDemo={setDemoProject} />
          ))}
        </motion.div>
      </div>

      {/* Demo Modals */}
      <AnimatePresence>
        {demoProject && demoProject.demoType === 'fraud' && (
          <FraudDetectionDemo onClose={() => setDemoProject(null)} />
        )}
        {demoProject && demoProject.demoType !== 'fraud' && (
          <GenericDemo project={demoProject} onClose={() => setDemoProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
