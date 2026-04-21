'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageSquare, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePortfolioStore, type ViewMode } from '@/store/portfolio'

const navLinks = [
  { label: 'Home', href: '#hero', icon: '🏠' },
  { label: 'About', href: '#about', icon: '👤' },
  { label: 'Projects', href: '#projects', icon: '🚀' },
  { label: 'Skills', href: '#skills', icon: '💡' },
  { label: 'Services', href: '#services', icon: '⚙️' },
  { label: 'Blog', href: '#blog', icon: '📝' },
  { label: 'Contact', href: '#contact', icon: '📬' },
]

export default function Navigation() {
  const { chatOpen, setChatOpen, setActiveSection } = usePortfolioStore()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = navLinks.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveNav(sections[i])
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setActiveSection])

  const scrollToSection = (href: string) => {
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
      document.body.style.overflow = ''
    }
  }

  const toggleMobileMenu = () => {
    const newState = !mobileOpen
    setMobileOpen(newState)
    document.body.style.overflow = newState ? 'hidden' : ''
  }

  useEffect(() => {
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0a14]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/30'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('#hero')}
            className="flex items-center gap-2.5 shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center font-mono font-bold text-sm text-black shadow-lg shadow-emerald-500/20">
              IM
            </div>
            <span className="text-sm font-semibold tracking-tight hidden sm:block">
              Irshad<span className="text-emerald-400">.dev</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                  activeNav === link.href.slice(1)
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setChatOpen(!chatOpen)}
              className={`relative text-white/60 hover:text-emerald-400 hover:bg-white/5 ${
                chatOpen ? 'text-emerald-400' : ''
              }`}
            >
              <MessageSquare className="w-4.5 h-4.5" />
            </Button>

            {/* Hamburger - visible on ALL mobile/tablet */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu - FULLSCREEN overlay, centered links */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[#0a0a14]/98 backdrop-blur-2xl"
              onClick={toggleMobileMenu}
            />

            {/* Close button top-right */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={toggleMobileMenu}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Centered Navigation Links */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
              {/* Logo at top */}
              <div className="flex items-center gap-2 mb-12">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center font-mono font-bold text-lg text-black">
                  IM
                </div>
              </div>

              {/* Nav Links */}
              <div className="flex flex-col gap-2 w-full max-w-xs">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    onClick={() => scrollToSection(link.href)}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-lg font-medium transition-all ${
                      activeNav === link.href.slice(1)
                        ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-xl w-8 text-center">{link.icon}</span>
                    {link.label}
                  </motion.button>
                ))}
              </div>

              {/* Bottom section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12 flex flex-col items-center gap-3"
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono text-white/50">AI-Powered Portfolio</span>
                </div>
                <p className="text-xs text-white/30">Built with ❤️ by Irshad</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
