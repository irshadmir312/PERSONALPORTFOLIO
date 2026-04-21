'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@irshad.dev' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (href: string) => {
    const id = href.slice(1)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative mt-auto">
      {/* Divider line */}
      <div
        className="w-full"
        style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
      />

      {/* Back to top button */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
          style={{
            background: '#c2a4ff',
            color: '#0b080c',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
        </motion.button>
      </div>

      {/* Footer content */}
      <div
        className="backdrop-blur-xl"
        style={{
          background: 'rgba(11, 8, 12, 0.96)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-14 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
            {/* Left Column — Brand */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #c2a4ff 0%, #9b7de8 100%)',
                    color: '#0b080c',
                  }}
                >
                  IM
                </div>
                <span
                  className="text-base font-semibold tracking-tight"
                  style={{ color: '#eae5ec' }}
                >
                  Irshad
                  <span style={{ color: '#c2a4ff' }}>.dev</span>
                </span>
              </div>
              <p
                className="text-sm leading-relaxed max-w-xs"
                style={{ color: '#8b8498' }}
              >
                Building thoughtful digital experiences with clean code and
                modern design.
              </p>
            </div>

            {/* Center Column — Quick Links */}
            <div className="sm:text-center">
              <h4
                className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: '#c2a4ff' }}
              >
                Navigation
              </h4>
              <nav className="flex flex-col gap-3">
                {quickLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-left sm:text-center w-fit sm:w-auto cursor-pointer transition-colors duration-200"
                    style={{ color: '#8b8498' }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = '#c2a4ff')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = '#8b8498')
                    }
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Right Column — Social & Credit */}
            <div className="sm:text-right">
              <h4
                className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: '#c2a4ff' }}
              >
                Connect
              </h4>
              <div className="flex sm:justify-end gap-3 mb-5">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
                    style={{
                      color: '#8b8498',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                    onHoverStart={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.color = '#c2a4ff'
                      el.style.background = 'rgba(194, 164, 255, 0.1)'
                      el.style.borderColor = 'rgba(194, 164, 255, 0.25)'
                    }}
                    onHoverEnd={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.color = '#8b8498'
                      el.style.background = 'rgba(255, 255, 255, 0.04)'
                      el.style.borderColor = 'rgba(255, 255, 255, 0.06)'
                    }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: '#8b8498' }}
              >
                Designed &amp; Developed by{' '}
                <span style={{ color: '#eae5ec' }}>
                  Irshad Majeed Mir
                </span>
              </p>
            </div>
          </div>

          {/* Divider */}
          <div
            className="w-full my-8"
            style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
          />

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p
              className="text-xs flex items-center gap-1.5"
              style={{ color: '#8b8498' }}
            >
              © {new Date().getFullYear()} Irshad Majeed Mir. All rights
              reserved.
            </p>
            <p
              className="text-xs flex items-center gap-1.5"
              style={{ color: '#8b8498' }}
            >
              Crafted with{' '}
              <Heart
                className="w-3 h-3 inline-block"
                style={{ color: '#c2a4ff', fill: '#c2a4ff' }}
              />{' '}
              and attention to detail
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
