'use client'

import { useEffect } from 'react'
import ParticleBackground from '@/components/portfolio/ParticleBackground'
import Navigation from '@/components/portfolio/Navigation'
import HeroSection from '@/components/portfolio/HeroSection'
import PersonalStory from '@/components/portfolio/PersonalStory'
import SkillsShowcase from '@/components/portfolio/SkillsShowcase'
import ProjectLab from '@/components/portfolio/ProjectLab'
import QuizSection from '@/components/portfolio/QuizSection'
import QuoteGenerator from '@/components/portfolio/QuoteGenerator'
import Services from '@/components/portfolio/Services'
import Testimonials from '@/components/portfolio/Testimonials'
import ContactForm from '@/components/portfolio/ContactForm'
import ConnectMe from '@/components/portfolio/ConnectMe'
import AIChatBot from '@/components/portfolio/AIChatBot'
import WhatsAppButton from '@/components/portfolio/WhatsAppButton'
import Footer from '@/components/portfolio/Footer'
import { usePortfolioStore } from '@/store/portfolio'

export default function Home() {
  const { visitSection } = usePortfolioStore()

  useEffect(() => {
    visitSection('home')
  }, [visitSection])

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* 3D Floating Orbs */}
      <div className="orb-1" />
      <div className="orb-2" />
      <div className="orb-3" />

      {/* Nav fade gradient */}
      <div className="nav-fade" />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <HeroSection />

        <div className="divider-gradient" />

        <PersonalStory />

        <div className="divider-gradient" />

        <SkillsShowcase />

        <div className="divider-gradient" />

        <ProjectLab />

        <div className="divider-gradient" />

        <QuizSection />

        <div className="divider-gradient" />

        <QuoteGenerator />

        <div className="divider-gradient" />

        <Services />

        <div className="divider-gradient" />

        <Testimonials />

        <div className="divider-gradient" />

        <ContactForm />

        <div className="divider-gradient" />

        <ConnectMe />
      </main>

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Chatbot */}
      <AIChatBot />

      {/* Footer */}
      <Footer />
    </div>
  )
}
