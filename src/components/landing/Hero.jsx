import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Activity, Brain } from 'lucide-react';
import Button from '../ui/Button';
import ThreeVisualizer from '../ui/ThreeVisualizer';
import HolographicProjection from '../ui/HolographicProjection';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden z-10">
      
      {/* Subtle Cyan & Blue Atmospheric Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE: Copy & CTAs (7 Cols - ~55% width) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-20">
            
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/70 border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-950/40 hover:border-cyan-400/50 transition-all cursor-pointer">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-wide text-cyan-200 uppercase">
                NEXT-GEN NEURAL AI COACHING PLATFORM
              </span>
              <span className="text-xs font-medium text-slate-400 border-l border-slate-700 pl-2 flex items-center gap-1">
                <span>95% Success Rate</span>
                <ArrowRight className="w-3 h-3 text-cyan-400" />
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Ace Your Next <br className="hidden sm:inline" />
              Interview <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                with AI
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Practice realistic interviews, receive instant AI-powered feedback, and build the confidence to land your dream job.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link to="/setup" className="w-full sm:w-auto">
                <Button 
                  variant="cyan" 
                  size="lg" 
                  icon={Sparkles}
                  className="w-full sm:w-auto text-base shadow-2xl shadow-cyan-600/35 border-cyan-400/30 px-8"
                >
                  Start Mock Interview
                </Button>
              </Link>

              <a href="#features" className="w-full sm:w-auto">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full sm:w-auto text-base border-slate-800"
                >
                  Explore Platform
                </Button>
              </a>
            </div>

            {/* Key Value Micro Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Setup Needed</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-cyan-400" />
                <span>Adaptive Neural Evaluation</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <span>STAR Rubric Scoring</span>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Large Holographic AI Brain (5 Cols - ~45% width) */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[420px] sm:min-h-[500px]">
            
            {/* Background Layer: Subtle Neural Sphere Network */}
            <ThreeVisualizer />

            {/* Foreground Layer: Main Holographic AI Brain Visual (brain.jfif) */}
            <HolographicProjection />

          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
