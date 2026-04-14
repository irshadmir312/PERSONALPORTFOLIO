'use client'

import { useEffect } from 'react'
import ParticleBackground from '@/components/portfolio/ParticleBackground'
import Navigation from '@/components/portfolio/Navigation'
import HeroSection from '@/components/portfolio/HeroSection'
import ModeSelector from '@/components/portfolio/ModeSelector'
import JourneyMap from '@/components/portfolio/JourneyMap'
import ProjectLab from '@/components/portfolio/ProjectLab'
import WhyHireMe from '@/components/portfolio/WhyHireMe'
import SkillsShowcase from '@/components/portfolio/SkillsShowcase'
import LiveDashboard from '@/components/portfolio/LiveDashboard'
import SkillTesting from '@/components/portfolio/SkillTesting'
import GamificationPanel from '@/components/portfolio/GamificationPanel'
import SmartContact from '@/components/portfolio/SmartContact'
import AIChatBot from '@/components/portfolio/AIChatBot'
import Footer from '@/components/portfolio/Footer'
import { usePortfolioStore } from '@/store/portfolio'

export default function Home() {
  const { visitSection } = usePortfolioStore()

  useEffect(() => {
    visitSection('home')
  }, [visitSection])

  return (
    <div className="min-h-screen flex flex-col relative">
      <ParticleBackground />
      <Navigation />

      <main className="flex-1 relative z-10">
        <HeroSection />

        <div className="divider-gradient" />

        <ModeSelector />

        <div className="divider-gradient" />

        <JourneyMap />

        <div className="divider-gradient" />

        <ProjectLab />

        <div className="divider-gradient" />

        <WhyHireMe />

        <div className="divider-gradient" />

        <SkillsShowcase />

        <div className="divider-gradient" />

        <LiveDashboard />

        <div className="divider-gradient" />

        <SkillTesting />

        <div className="divider-gradient" />

        <GamificationPanel />

        <div className="divider-gradient" />

        <SmartContact />
      </main>

      <AIChatBot />
      <Footer />
    </div>
  )
}
