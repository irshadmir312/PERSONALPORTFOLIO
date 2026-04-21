'use client'

import { useEffect } from 'react'
import ParticleBackground from '@/components/portfolio/ParticleBackground'
import Navigation from '@/components/portfolio/Navigation'
import HeroSection from '@/components/portfolio/HeroSection'
import PersonalStory from '@/components/portfolio/PersonalStory'
import ModeSelector from '@/components/portfolio/ModeSelector'
import JourneyMap from '@/components/portfolio/JourneyMap'
import ProjectLab from '@/components/portfolio/ProjectLab'
import CaseStudies from '@/components/portfolio/CaseStudies'
import Services from '@/components/portfolio/Services'
import WhyHireMe from '@/components/portfolio/WhyHireMe'
import KillerQuotes from '@/components/portfolio/KillerQuotes'
import IslamicQuotes from '@/components/portfolio/IslamicQuotes'
import SkillsShowcase from '@/components/portfolio/SkillsShowcase'
import Certifications from '@/components/portfolio/Certifications'
import LiveDashboard from '@/components/portfolio/LiveDashboard'
import SkillTesting from '@/components/portfolio/SkillTesting'
import Testimonials from '@/components/portfolio/Testimonials'
import BlogInsights from '@/components/portfolio/BlogInsights'
import GamificationPanel from '@/components/portfolio/GamificationPanel'
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
    <div className="min-h-screen flex flex-col relative gradient-bg">
      <ParticleBackground />
      <Navigation />

      <main className="flex-1 relative z-10">
        <HeroSection />

        <PersonalStory />

        <ModeSelector />

        <ProjectLab />

        <CaseStudies />

        <Services />

        <WhyHireMe />

        <KillerQuotes />

        <IslamicQuotes />

        <SkillsShowcase />

        <Certifications />

        <LiveDashboard />

        <SkillTesting />

        <Testimonials />

        <BlogInsights />

        <GamificationPanel />

        <ConnectMe />
      </main>

      <WhatsAppButton />
      <AIChatBot />
      <Footer />
    </div>
  )
}
