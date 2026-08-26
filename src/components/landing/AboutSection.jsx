import React from 'react';
import { ShieldCheck, Cpu, Target, Award, Sparkles } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const AboutSection = () => {
  const highlights = [
    {
      icon: Cpu,
      title: 'Neural Language Models',
      desc: 'Trained on tens of thousands of real hiring rubrics from top tech and corporate leaders.'
    },
    {
      icon: Target,
      title: 'Adaptive Questioning',
      desc: 'The AI dynamic engine adjusts follow-up questions in real-time based on candidate speech.'
    },
    {
      icon: ShieldCheck,
      title: 'Privacy & Security',
      desc: 'Your interview practice data, resume files, and speech audio are encrypted and confidential.'
    },
    {
      icon: Award,
      title: 'STAR Method Benchmarking',
      desc: 'Evaluates Situation, Task, Action, and Result framing to deliver actionable improvement tips.'
    }
  ];

  return (
    <section id="about" className="py-24 relative z-10 overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/20 text-xs font-semibold text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>ABOUT INTERACT AI</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Building the Future of <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">
                Career Preparation
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              InteractAI was built to level the playing field for job seekers worldwide. By pairing cutting-edge neural audio intelligence with real hiring rubrics, candidates can practice without pressure and receive immediate, actionable coaching.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-2xl font-extrabold text-purple-400">100%</div>
                <div className="text-xs text-slate-400 font-medium">Objective Feedback</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-2xl font-extrabold text-cyan-400">&lt; 15 mins</div>
                <div className="text-xs text-slate-400 font-medium">Average Prep Session</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <GlassCard key={item.title} className="p-6 space-y-3 hover:border-purple-500/30">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-indigo-500/20 flex items-center justify-center text-purple-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </GlassCard>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
