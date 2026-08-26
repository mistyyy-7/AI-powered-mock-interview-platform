import React from 'react';
import CanvasBackground from '../components/ui/CanvasBackground';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/landing/Hero';
import StatsSection from '../components/landing/StatsSection';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import PreviewSection from '../components/landing/PreviewSection';
import AboutSection from '../components/landing/AboutSection';
import CTA from '../components/landing/CTA';
import Footer from '../components/layout/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white flex flex-col justify-between relative overflow-x-hidden">
      {/* GPU Optimized Animated Background Particles & Neural Lines */}
      <CanvasBackground />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <StatsSection />
        <Features />
        <HowItWorks />
        <PreviewSection />
        <AboutSection />
        <CTA />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
