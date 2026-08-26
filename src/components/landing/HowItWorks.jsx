import React from 'react';
import { Link } from 'react-router-dom';
import { Sliders, Mic, Award, ArrowRight, Sparkles } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';

const HowItWorks = () => {
  const steps = [
    {
      stepNumber: '01',
      title: 'Choose Your Interview',
      description: 'Select your role, difficulty, and interview type. Upload your resume for custom adaptive question generation.',
      icon: Sliders,
      badgeColor: 'indigo'
    },
    {
      stepNumber: '02',
      title: 'Start Interview',
      description: 'Interact with the AI interviewer. Answer live technical, system design, or behavioral questions in real-time.',
      icon: Mic,
      badgeColor: 'purple'
    },
    {
      stepNumber: '03',
      title: 'Get AI Feedback',
      description: 'Receive detailed performance analysis. Review STAR rubric match, technical score, and 10/10 answer refactoring.',
      icon: Award,
      badgeColor: 'cyan'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/20 text-xs font-semibold text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>SIMPLE 3-STEP WORKFLOW</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How InteractAI Prepares You <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">
              For Your Next Offer
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            From setup to post-interview analysis in under 15 minutes.
          </p>
        </div>

        {/* 3 Steps Cards Grid with Animated Connection Line */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Background Connecting Glow Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-indigo-500/30 via-purple-500/50 to-cyan-500/30 -translate-y-6 z-0 pointer-events-none" />

          {steps.map((s, index) => {
            const Icon = s.icon;
            return (
              <GlassCard 
                key={s.stepNumber} 
                className="relative p-8 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300 z-10 border-slate-800"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 p-0.5 shadow-xl shadow-purple-500/20">
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <span className="text-4xl font-extrabold font-mono text-slate-800 group-hover:text-purple-400/40 transition-colors select-none">
                    {s.stepNumber}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-400">
                  <span>Step {s.stepNumber} Action</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Action button */}
        <div className="mt-16 text-center">
          <Link to="/setup">
            <Button variant="primary" size="lg" icon={Sparkles} className="shadow-2xl shadow-purple-600/30">
              Start Your First Mock Interview Now
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
