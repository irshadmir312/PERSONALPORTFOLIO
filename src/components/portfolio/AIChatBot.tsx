'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Trash2, Bot, User, Minimize2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { usePortfolioStore, type ChatMessage } from '@/store/portfolio'

const quickActions = [
  { label: 'Mock Interview', prompt: 'Start a mock interview for an AI/ML Engineer position' },
  { label: 'Explain Project', prompt: 'Explain the Fraud Detection System project in detail' },
  { label: 'Career Advice', prompt: 'What career advice would you give for becoming an AI Engineer?' },
  { label: 'Skills Assessment', prompt: 'Assess my current skills and suggest areas for improvement' },
]

// Fallback responses when API is unavailable
const fallbackResponses: Record<string, string> = {
  interview: `Great! Let's start a mock interview. Here's my first question:

**Tell me about a time you had to handle imbalanced data in a machine learning project. What techniques did you use?**

Take your time — I'll evaluate your response based on technical depth and practical experience.`,
  fraud: `## Fraud Detection System 🔍

This is one of my flagship projects! Here's a deep dive:

**Architecture:**
- Feature engineering pipeline processing 1M+ transactions/day
- XGBoost ensemble with neural network fallback
- Real-time scoring via FastAPI + Redis (<50ms latency)

**Key Results:**
- 96.4% accuracy, 0.92 F1-score
- Reduced false positives by 35%
- Saved $2.4M in prevented fraud losses

**Tech Stack:** Python, XGBoost, TensorFlow, FastAPI, Redis, Docker, AWS

Would you like to try the interactive demo?`,
  career: `## Career Advice for AI Engineers 🚀

Based on my journey from B.Tech to AI/ML Engineer:

1. **Build a Strong Foundation** — Master Python, SQL, and statistics first
2. **Learn by Building** — Don't just follow tutorials; create original projects
3. **Specialize, Then Generalize** — Start deep (e.g., NLP), then expand
4. **Deploy Everything** — A model in a notebook isn't a product. Learn MLOps.
5. **Stay Current** — Follow papers, attend meetups, contribute to open source

The field moves fast — focus on fundamentals, and you'll adapt to any new technology.`,
  skills: `## Skills Assessment 💡

Here's my current skill profile:

**Strong (Expert):** Python, Machine Learning, Deep Learning, SQL, Data Visualization
**Proficient:** NLP, Cloud (AWS/GCP), Docker, FastAPI, React/Next.js
**Learning:** Rust, Kubernetes, Advanced MLOps

**Areas I'm focusing on:**
- Scaling AI systems for production
- Advanced RAG & Agent architectures
- Real-time ML inference optimization

Want me to dive deeper into any specific skill area?`,
}

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes('interview') || lower.includes('mock')) return fallbackResponses.interview
  if (lower.includes('fraud') || lower.includes('project')) return fallbackResponses.fraud
  if (lower.includes('career') || lower.includes('advice')) return fallbackResponses.career
  if (lower.includes('skill') || lower.includes('assess')) return fallbackResponses.skills
  if (lower.includes('hello') || lower.includes('hi')) return "Hello! 👋 I'm Irshad's AI clone. I can tell you about his projects, skills, experience, or even do a mock interview. What would you like to know?"
  if (lower.includes('contact') || lower.includes('hire') || lower.includes('email')) return "Great to hear you're interested! You can use the contact form at the bottom of the page, or reach out directly via:\n\n- **LinkedIn:** Irshad Majeed Mir\n- **GitHub:** @irshad-dev\n- **Email:** hello@irshad.dev\n\nI'd love to discuss potential collaborations! 🤝"
  if (lower.includes('tech stack') || lower.includes('technologies')) return "My core tech stack includes:\n\n**AI/ML:** Python, PyTorch, TensorFlow, Scikit-learn, Hugging Face\n**Backend:** FastAPI, Flask, Node.js\n**Frontend:** React, Next.js, Tailwind CSS\n**Data:** PostgreSQL, MongoDB, Redis, Elasticsearch\n**Cloud/DevOps:** AWS, GCP, Docker, GitHub Actions\n\nAlways expanding! What tech are you most interested in?"
  if (lower.includes('thank')) return "You're welcome! 😊 Feel free to come back anytime. Good luck with whatever you're working on!"

  return "That's an interesting question! While I'm a simplified AI clone of Irshad, I can share that he's passionate about building AI systems that create real impact. Would you like to know about his projects, skills, or experience? You can also try the quick actions below for specific topics. 🚀"
}

export default function AIChatBot() {
  const {
    chatOpen, setChatOpen,
    chatMessages, addChatMessage, clearChatMessages,
    currentMode, guestUserId,
  } = usePortfolioStore()

  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chatMessages, isTyping])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    }
    addChatMessage(userMsg)
    setInput('')
    setIsTyping(true)

    try {
      // Try to call the real AI API
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: guestUserId || `guest-${Date.now()}`,
          message: text,
          mode: currentMode,
          history: chatMessages.slice(-10).map(m => ({ role: m.role, content: m.content })),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.message || data.error || 'Sorry, I could not process that.',
          timestamp: Date.now(),
        }
        addChatMessage(aiMsg)
      } else {
        // Fallback to local responses on API error
        throw new Error('API error')
      }
    } catch {
      // Use fallback response with simulated delay
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200))
      const response = getFallbackResponse(text)
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      }
      addChatMessage(aiMsg)
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <AnimatePresence>
      {chatOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setChatOpen(false)}
          />

          {/* Chat Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : 'min(600px, calc(100vh - 120px))',
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 rounded-xl overflow-hidden glass-strong neon-border flex flex-col ${
              isMinimized ? '' : 'h-[min(600px,calc(100vh-120px))]'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">AI Clone</h3>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="w-7 h-7 text-muted-foreground hover:text-foreground"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="w-7 h-7 text-muted-foreground hover:text-red-400"
                  onClick={clearChatMessages}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="w-7 h-7 text-muted-foreground hover:text-foreground"
                  onClick={() => setChatOpen(false)}
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="flex flex-col overflow-hidden"
                >
                  {/* Messages */}
                  <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                    {chatMessages.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-6"
                      >
                        <Sparkles className="w-8 h-8 text-emerald-400/50 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground mb-4">
                          I&apos;m Irshad&apos;s AI assistant. Ask me anything!
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {quickActions.map((action) => (
                            <button
                              key={action.label}
                              onClick={() => sendMessage(action.prompt)}
                              className="text-xs p-2.5 rounded-lg glass card-hover text-muted-foreground hover:text-foreground text-left"
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {chatMessages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                          msg.role === 'user'
                            ? 'bg-purple-500/20'
                            : 'bg-emerald-500/20'
                        }`}>
                          {msg.role === 'user'
                            ? <User className="w-3.5 h-3.5 text-purple-400" />
                            : <Bot className="w-3.5 h-3.5 text-emerald-400" />
                          }
                        </div>
                        <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-purple-500/10 text-purple-100 border border-purple-500/10'
                            : 'bg-white/5 text-muted-foreground border border-white/5'
                        }`}>
                          <div className="whitespace-pre-wrap">{msg.content}</div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-2"
                      >
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <Bot className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <div className="bg-white/5 rounded-lg px-4 py-3 border border-white/5">
                          <div className="flex gap-1">
                            <motion.div
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                              className="w-1.5 h-1.5 rounded-full bg-emerald-400/50"
                            />
                            <motion.div
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                              className="w-1.5 h-1.5 rounded-full bg-emerald-400/50"
                            />
                            <motion.div
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                              className="w-1.5 h-1.5 rounded-full bg-emerald-400/50"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Quick Actions (when messages exist) */}
                  {chatMessages.length > 0 && chatMessages.length < 3 && (
                    <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto no-scrollbar">
                      {quickActions.map((action) => (
                        <button
                          key={action.label}
                          onClick={() => sendMessage(action.prompt)}
                          className="text-[10px] px-2.5 py-1.5 rounded-full glass text-muted-foreground hover:text-emerald-400 whitespace-nowrap transition-colors"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-3 border-t border-white/5">
                    <form
                      onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
                      className="flex gap-2"
                    >
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        className="bg-white/5 border-white/10 text-sm flex-1"
                        disabled={isTyping}
                      />
                      <Button
                        type="submit"
                        size="icon"
                        disabled={!input.trim() || isTyping}
                        className="bg-emerald-500 hover:bg-emerald-400 text-black shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}

      {/* Floating Button */}
      {!chatOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 neon-glow"
        >
          <MessageSquare className="w-6 h-6 text-black" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[8px] font-bold text-white flex items-center justify-center">
            1
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
