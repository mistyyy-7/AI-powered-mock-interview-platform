import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Mic, Award, ArrowRight, CheckCircle2, Sparkles, UserCheck, Play } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';

const HowItWorks = () => {
  const steps = [
    {
      stepNumber: '01',
      title: 'Configure Role & Upload Resume',
      description: 'Choose your desired job role (Frontend, System Design, Behavioral) or paste a job description. The AI tailors the questions to match exact company requirements.',
      icon: Upload,
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      stepNumber: '02',
      title: 'Conduct Live Voice AI Session',
      description: 'Speak directly with your AI Recruiter. Experience realistic pressure with follow-up probing questions, dynamic timer controls, and live voice synthesis.',
      icon: Mic,
      gradient: 'from-purple-500 to-cyan-500'
    },
    {
      stepNumber: '03',
      title: 'Review Scorecard & Key Insights',
      description: 'Receive a comprehensive performance report with STAR framework scoring, filler word counts, answer rewrites, and actionable tips for improvement.',
      icon: Award,
      gradient: 'from-cyan-500 to-emerald-500'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-xs font-semibold text-indigo-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SIMPLE 3-STEP WORKFLOW</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How InteractAI Prepares You For <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              Your Dream Job Offer
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            From setup to post-interview analysis in under 15 minutes.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, index) => {
            const Icon = s.icon;
            return (
              <GlassCard 
                key={s.stepNumber} 
                className="relative flex flex-col justify-between p-8 group hover:-translate-y-2 transition-all duration-300"
              >
                {/* Large Background Step Number */}
                <span className="absolute top-4 right-6 text-6xl font-black text-slate-800/40 select-none group-hover:text-indigo-900/40 transition-colors">
                  {s.stepNumber}
                </span>

                <div className="space-y-6 relative z-10">
                  {/* Icon Circle */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} p-0.5 shadow-lg shadow-indigo-500/20`}>
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center text-xs font-semibold text-indigo-400">
                  <span>Step {s.stepNumber} Preview</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Bottom Call to Action inside HowItWorks */}
        <div className="mt-16 text-center">
          <Link to="/setup">
            <Button variant="primary" size="lg" icon={Sparkles}>
              Start Your First Mock Interview Now
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
