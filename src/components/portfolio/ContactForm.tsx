'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, User, Phone, MessageSquare, CheckCircle, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim() || !message.trim()) return

    setStatus('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), message: message.trim() }),
      })

      if (res.ok) {
        setStatus('success')
        setName('')
        setPhone('')
        setMessage('')
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact-form" ref={ref} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 dot-pattern opacity-10" />
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text-purple">📩 Get In Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Send me a message and I&apos;ll get back to you within 24 hours! ⚡
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="glass corner-borders p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-sm font-medium text-[#8b8498] flex items-center gap-2">
                  <User className="w-4 h-4 text-[#c2a4ff]" />
                  Your Name
                </label>
                <Input
                  id="contact-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-[#0b080c]/50 border-white/[0.08] text-[#eae5ec] placeholder:text-[#8b8498]/50 focus:border-[#c2a4ff]/40 focus:ring-[#c2a4ff]/20"
                  disabled={status === 'submitting'}
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label htmlFor="contact-phone" className="text-sm font-medium text-[#8b8498] flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#c2a4ff]" />
                  Phone Number
                </label>
                <Input
                  id="contact-phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="bg-[#0b080c]/50 border-white/[0.08] text-[#eae5ec] placeholder:text-[#8b8498]/50 focus:border-[#c2a4ff]/40 focus:ring-[#c2a4ff]/20"
                  disabled={status === 'submitting'}
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-sm font-medium text-[#8b8498] flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#c2a4ff]" />
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  placeholder="Tell me about your project, idea, or how I can help..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="bg-[#0b080c]/50 border-white/[0.08] text-[#eae5ec] placeholder:text-[#8b8498]/50 focus:border-[#c2a4ff]/40 focus:ring-[#c2a4ff]/20 resize-none"
                  disabled={status === 'submitting'}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={status === 'submitting' || !name.trim() || !phone.trim() || !message.trim()}
                className="w-full gap-2 bg-[#c2a4ff] text-[#0b080c] font-semibold hover:bg-[#d4bfff] transition-all duration-300 h-12 rounded-xl"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Message Sent Successfully!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </Button>

              {status === 'error' && (
                <p className="text-red-400 text-sm text-center">
                  ❌ Something went wrong. Please try again or contact directly via WhatsApp.
                </p>
              )}
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
