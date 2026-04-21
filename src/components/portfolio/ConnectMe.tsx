'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Twitter,
  Instagram,
  ArrowUpRight,
} from 'lucide-react'

const socialLinks = [
  {
    label: 'Github',
    href: 'https://github.com/irshadmir312',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/irshadmir312',
    icon: Linkedin,
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com/irshadmir312',
    icon: Twitter,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/irshadmir312',
    icon: Instagram,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function ConnectMe() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="contact"
      ref={ref}
      className="relative w-full py-24 sm:py-32 lg:py-40"
      style={{ background: '#0e0b16' }}
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        {/* Section Title */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
          className="mb-16 text-sm font-medium uppercase tracking-[0.3em]"
          style={{ color: '#8b8498' }}
        >
          <span style={{ color: '#c2a4ff' }}>&#47;&#47; </span>CONTACT
        </motion.p>

        {/* Three-Column Layout */}
        <div className="grid grid-cols-1 gap-12 sm:gap-16 lg:grid-cols-3 lg:gap-8">
          {/* Left Column — Email & Phone */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
            className="space-y-8"
          >
            <div>
              <p
                className="mb-3 text-xs font-medium uppercase tracking-[0.2em]"
                style={{ color: '#8b8498' }}
              >
                Email
              </p>
              <a
                href="mailto:irshadmir312@gmail.com"
                className="group flex items-center gap-3 text-lg font-medium transition-colors duration-300 sm:text-xl"
                style={{ color: '#eae5ec' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#c2a4ff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#eae5ec')}
              >
                <Mail className="h-5 w-5 shrink-0 opacity-60" />
                <span className="break-all">irshadmir312@gmail.com</span>
              </a>
            </div>

            <div>
              <p
                className="mb-3 text-xs font-medium uppercase tracking-[0.2em]"
                style={{ color: '#8b8498' }}
              >
                Phone
              </p>
              <a
                href="tel:+919622334883"
                className="group flex items-center gap-3 text-lg font-medium transition-colors duration-300 sm:text-xl"
                style={{ color: '#eae5ec' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#c2a4ff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#eae5ec')}
              >
                <Phone className="h-5 w-5 shrink-0 opacity-60" />
                <span>+91 9622334883</span>
              </a>
            </div>
          </motion.div>

          {/* Center Column — Social Links */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
            className="space-y-0"
          >
            <p
              className="mb-8 text-xs font-medium uppercase tracking-[0.2em]"
              style={{ color: '#8b8498' }}
            >
              Socials
            </p>

            <nav className="flex flex-col" aria-label="Social links">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-4 transition-colors duration-300"
                    style={{
                      color: '#eae5ec',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#c2a4ff'
                      e.currentTarget.style.borderBottomColor = 'rgba(194, 164, 255, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#eae5ec'
                      e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    <span className="flex items-center gap-4">
                      <Icon className="h-[18px] w-[18px] shrink-0 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="text-base font-medium sm:text-lg">{social.label}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 opacity-0 transition-all duration-300 -translate-x-1 translate-y-1 group-hover:opacity-70 group-hover:translate-x-0 group-hover:translate-y-0" />
                  </a>
                )
              })}
            </nav>
          </motion.div>

          {/* Right Column — Credit */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={3}
            className="flex items-end"
          >
            <p
              className="text-base leading-relaxed sm:text-lg"
              style={{ color: '#8b8498' }}
            >
              Designed and Developed by
              <br />
              <span
                className="mt-1 inline-block text-xl font-semibold sm:text-2xl"
                style={{ color: '#c2a4ff' }}
              >
                Irshad Majeed Mir
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
