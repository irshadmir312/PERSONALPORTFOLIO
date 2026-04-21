'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageSquare } from 'lucide-react'
import { usePortfolioStore } from '@/store/portfolio'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Quiz', href: '#quiz' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const { chatOpen, setChatOpen, setActiveSection } = usePortfolioStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = navLinks.map((l) => l.href.slice(1))
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

  const scrollToSection = useCallback(
    (href: string) => {
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        setMobileOpen(false)
        document.body.style.overflow = ''
      }
    },
    []
  )

  const toggleMobileMenu = useCallback(() => {
    const newState = !mobileOpen
    setMobileOpen(newState)
    document.body.style.overflow = newState ? 'hidden' : ''
  }, [mobileOpen])

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${window.scrollY}px`
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      document.body.style.overflow = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
    return () => {
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      {/* ─── Fixed Navbar ─── */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className={`transition-all duration-500 ease-out ${
            scrolled
              ? 'bg-[#0b080c]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-lg shadow-black/20'
              : 'bg-transparent'
          }`}
        >
          <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('#hero')}
              className="flex items-center gap-3 shrink-0 group"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-sm transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#c2a4ff]/20"
                style={{
                  background: 'linear-gradient(135deg, #c2a4ff, #9b7ae8)',
                  color: '#0b080c',
                }}
              >
                IM
              </div>
              <span className="text-sm font-semibold tracking-tight hidden sm:block text-[#eae5ec]">
                Irshad<span style={{ color: '#c2a4ff' }}>.dev</span>
              </span>
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeNav === link.href.slice(1)
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="relative px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300"
                    style={{
                      color: isActive ? '#c2a4ff' : '#8b8498',
                    }}
                  >
                    {link.label}
                    {/* Hover / Active underline */}
                    <motion.span
                      className="absolute bottom-0 left-1/2 h-[1.5px] rounded-full"
                      style={{
                        background: '#c2a4ff',
                        boxShadow: '0 0 8px #c2a4ff/40',
                      }}
                      initial={{ width: 0, x: '-50%' }}
                      animate={{
                        width: isActive ? '60%' : '0%',
                        x: '-50%',
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      whileHover={{ width: '60%' }}
                    />
                    {/* Hover underline (when not active) */}
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{
                        width: '60%',
                        background: '#c2a4ff',
                        boxShadow: '0 0 8px #c2a4ff/40',
                      }}
                    />
                  </button>
                )
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Chat Toggle */}
              <button
                onClick={() => setChatOpen(!chatOpen)}
                className="relative flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300"
                style={{
                  color: chatOpen ? '#c2a4ff' : '#8b8498',
                  background: chatOpen ? 'rgba(194, 164, 255, 0.1)' : 'transparent',
                }}
                aria-label="Toggle chat"
              >
                <MessageSquare className="w-[18px] h-[18px]" />
                <AnimatePresence>
                  {chatOpen && (
                    <motion.span
                      className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full"
                      style={{ background: '#c2a4ff' }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    />
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-300"
                style={{ color: mobileOpen ? '#c2a4ff' : '#8b8498' }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* ─── Mobile Menu Overlay ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[60] lg:hidden"
            style={{
              maxWidth: '100vw',
              overflowX: 'hidden',
              overflowY: 'hidden',
              touchAction: 'none',
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) toggleMobileMenu()
            }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'rgba(11, 8, 12, 0.97)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Centered Content Container */}
            <div
              className="relative z-10 flex flex-col items-center justify-center h-full"
              style={{
                maxWidth: '100vw',
                overflowX: 'hidden',
                overflowY: 'auto',
                touchAction: 'pan-y',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {/* Close Button - absolute positioned */}
              <button
                onClick={toggleMobileMenu}
                className="absolute top-5 right-5 flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-300 z-20"
                style={{
                  color: '#8b8498',
                  background: 'rgba(255, 255, 255, 0.05)',
                }}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-10"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center font-mono font-bold text-xl"
                  style={{
                    background: 'linear-gradient(135deg, #c2a4ff, #9b7ae8)',
                    color: '#0b080c',
                    boxShadow: '0 8px 32px rgba(194, 164, 255, 0.3)',
                  }}
                >
                  IM
                </div>
              </motion.div>

              {/* Nav Links */}
              <div
                className="flex flex-col items-center w-full"
                style={{
                  maxWidth: '300px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  paddingLeft: '0',
                  paddingRight: '0',
                  overflowX: 'hidden',
                  touchAction: 'pan-y',
                }}
              >
                {navLinks.map((link, i) => {
                  const isActive = activeNav === link.href.slice(1)
                  return (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.08 + i * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onClick={() => scrollToSection(link.href)}
                      className="w-full text-left transition-all duration-300"
                      style={{
                        color: isActive ? '#c2a4ff' : '#8b8498',
                        padding: '14px 20px',
                        fontSize: '18px',
                        fontWeight: isActive ? 600 : 400,
                        letterSpacing: '0.02em',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                        maxWidth: '100%',
                        boxSizing: 'border-box',
                      }}
                    >
                      <span className="block w-full truncate">
                        {link.label}
                      </span>
                      {/* Active indicator line */}
                      {isActive && (
                        <motion.span
                          className="block mt-0.5 rounded-full"
                          style={{
                            height: '2px',
                            width: '24px',
                            background: '#c2a4ff',
                            boxShadow: '0 0 12px rgba(194, 164, 255, 0.5)',
                          }}
                          layoutId="mobile-active-indicator"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>

              {/* Bottom Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-12 text-center w-full"
                style={{ maxWidth: '300px' }}
              >
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3"
                  style={{
                    background: 'rgba(194, 164, 255, 0.08)',
                    border: '1px solid rgba(194, 164, 255, 0.15)',
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: '#c2a4ff',
                      boxShadow: '0 0 8px rgba(194, 164, 255, 0.6)',
                    }}
                  />
                  <span className="text-xs font-medium" style={{ color: '#8b8498' }}>
                    Available for work
                  </span>
                </div>
                <p className="text-xs" style={{ color: 'rgba(139, 132, 152, 0.5)' }}>
                  &copy; {new Date().getFullYear()} Irshad.dev
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
