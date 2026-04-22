'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  stars: number
  image: string
}

const testimonials: Testimonial[] = [
  {
    quote: 'Irshad delivered an exceptional fraud detection system that saved us significant costs. His deep understanding of ML algorithms and real-world financial fraud patterns made the entire project a success.',
    name: 'Fatima Mir',
    role: 'CTO',
    company: 'FinTech Solutions',
    stars: 5,
    image: '/testimonials/fatima.png',
  },
  {
    quote: 'The AI chatbot transformed our customer service operations completely. Response times dropped by 80% and customer satisfaction scores reached an all-time high.',
    name: 'Zubair Ahmed',
    role: 'Head of Digital',
    company: 'RetailMax',
    stars: 5,
    image: '/testimonials/zubair.png',
  },
  {
    quote: 'Outstanding ML pipeline that processes millions of records daily without issues. The architecture is clean, scalable, and has been running flawlessly in production for over a year.',
    name: 'Sana Mir',
    role: 'Data Lead',
    company: 'DataFlow Analytics',
    stars: 5,
    image: '/testimonials/sana.png',
  },
  {
    quote: 'Highly professional, delivers on time, and the code quality is exceptional. Every project we have collaborated on has exceeded expectations and shipped ahead of schedule.',
    name: 'Faisal Bhat',
    role: 'Product Manager',
    company: 'TechVentures',
    stars: 5,
    image: '/testimonials/faisal.png',
  },
  {
    quote: 'The recommendation engine increased our conversion rates by over 50%. It integrates seamlessly with our existing stack and delivers personalized results in under 50ms.',
    name: 'Tabasum',
    role: 'VP Engineering',
    company: 'ShopSmart AI',
    stars: 5,
    image: '/testimonials/tabasum.png',
  },
  {
    quote: 'Brilliant problem solver with deep expertise in AI and machine learning. He consistently finds elegant solutions to complex problems that our internal team struggled with for months.',
    name: 'Salman Khan',
    role: 'Director',
    company: 'CloudScale Systems',
    stars: 5,
    image: '/testimonials/salman.png',
  },
  {
    quote: 'The sentiment analysis model he built for our social media monitoring platform was incredibly accurate. We use it daily to track brand perception across 15+ markets.',
    name: 'Irshad Lone',
    role: 'Marketing Head',
    company: 'BrandPulse Media',
    stars: 5,
    image: '/testimonials/irshad.png',
  },
  {
    quote: 'Irshad redesigned our entire data infrastructure from scratch. Processing times dropped by 60% and our team can now focus on analysis instead of fixing pipelines.',
    name: 'Sadaf Dar',
    role: 'Data Architect',
    company: 'InfoCore Labs',
    stars: 5,
    image: '/testimonials/sadaf.png',
  },
  {
    quote: 'His price prediction model consistently outperforms our legacy systems. The API integration was smooth and the documentation was thorough. A pleasure to work with.',
    name: 'Inayat',
    role: 'Tech Lead',
    company: 'QuantEdge Capital',
    stars: 5,
    image: '/testimonials/inayat.png',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 transition-colors ${
            i < count
              ? 'fill-[#c2a4ff] text-[#c2a4ff]'
              : 'text-[#8b8498]/30'
          }`}
        />
      ))}
    </div>
  )
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial
  index: number
}) {
  const [imgError, setImgError] = useState(false)
  const initials = testimonial.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="group"
    >
      <div className="glass corner-borders card-hover relative rounded-lg p-6 h-full flex flex-col">
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-[#c2a4ff]/[0.04] to-transparent" />

        <div className="mb-4 flex items-center justify-between">
          <Quote className="w-8 h-8" style={{ color: 'rgba(194, 164, 255, 0.2)' }} />
          <StarRating count={testimonial.stars} />
        </div>

        <p className="text-[#eae5ec] leading-relaxed mb-6 italic flex-1 text-[15px]" style={{ opacity: 0.9 }}>
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c2a4ff]/15 to-transparent mb-4" />

        <div className="flex items-center gap-3">
          {!imgError ? (
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c2a4ff]/20 shrink-0">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={40}
                height={40}
                className="object-cover w-full h-full"
                onError={() => setImgError(true)}
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#c2a4ff]/10 border border-[#c2a4ff]/20 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-[#c2a4ff]">{initials}</span>
            </div>
          )}
          <div>
            <p className="font-semibold text-[#eae5ec] text-sm">{testimonial.name}</p>
            <p className="text-[#8b8498] text-xs">
              {testimonial.role} <span className="text-[#8b8498]/60">at</span>{' '}
              <span className="text-[#c2a4ff]/70">{testimonial.company}</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-14 sm:mb-16"
        >
          <p className="text-xs sm:text-sm font-medium uppercase mb-4" style={{ color: '#c2a4ff', letterSpacing: '0.2em' }}>
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#eae5ec] mb-4">
            Trusted by{' '}
            <span className="gradient-text-purple">Industry Leaders</span>
          </h2>
          <p className="text-[#8b8498] max-w-lg mx-auto text-sm sm:text-base">
            Real feedback from clients who have experienced the impact of AI-driven solutions firsthand.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
