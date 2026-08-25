import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import RoleCategories from '../components/landing/RoleCategories';
import CTA from '../components/landing/CTA';
import Footer from '../components/layout/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white flex flex-col justify-between">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <RoleCategories />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
