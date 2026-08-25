import React from 'react';
import { 
  Bot, 
  BarChart3, 
  FileText, 
  BrainCircuit, 
  Volume2, 
  CheckCircle2, 
  Zap, 
  Layers, 
  ShieldCheck, 
  Award,
  Sparkles
} from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';

const Features = () => {
  const featureList = [
    {
      icon: Bot,
      color: 'indigo',
      badge: 'Real-Time Voice',
      title: 'Human-Like AI Voice Interviewer',
      description: 'Engage in natural, bidirectional voice conversations. The AI asks contextual follow-up questions based on your live responses, just like a hiring manager.',
      metrics: ['< 400ms Audio Latency', 'Adaptive Difficulty']
    },
    {
      icon: BarChart3,
      color: 'purple',
      badge: 'Instant Analytics',
      title: 'STAR Method Scorecard',
      description: 'Get an immediate breakdown on Situation, Task, Action, and Result. See exact scores for technical depth, communication clarity, and problem-solving logic.',
      metrics: ['Detailed Rubric Breakdown', 'Actionable Highlights']
    },
    {
      icon: FileText,
      color: 'cyan',
      badge: 'Resume Tailored',
      title: 'Dynamic Resume Question Engine',
      description: 'Upload your resume or job description (JD). The AI extracts your key projects and technical stack to formulate laser-targeted interview questions.',
      metrics: ['PDF / Docx Upload', 'Custom Job Alignment']
    },
    {
      icon: Volume2,
      color: 'emerald',
      badge: 'Speech Metrics',
      title: 'Filler Word & Pacing Analytics',
      description: 'Track filler words ("um", "like", "you know"), speech cadence, tone modulation, and pause duration so you speak with supreme confidence.',
      metrics: ['Filler Count Metric', 'Optimal WPM Pacing']
    },
    {
      icon: BrainCircuit,
      color: 'amber',
      badge: 'Answer Upgrade',
      title: 'AI Ideal Answer Refactoring',
      description: 'Compare your response against an idealized 10/10 answer. Learn how top 1% candidates structure complex architectural and behavioral answers.',
      metrics: ['Before/After Comparison', 'Key Keywords Checklist']
    },
    {
      icon: Layers,
      color: 'rose',
      badge: '500+ Question Bank',
      title: 'System Design & Coding Practice',
      description: 'From React hooks to microservice distributed locks, practice whiteboard explanations, system design tradeoffs, and behavioral situations.',
      metrics: ['FAANG Benchmarks', '10+ Industry Categories']
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-slate-950/60">
      
      {/* Subtle Divider Line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-indigo-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>EVERYTHING YOU NEED TO ACE THE INTERVIEW</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Supercharge Your Preparation with <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
            Intelligent AI Coaching Features
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
          Eliminate interview anxiety. Practice under realistic pressure with real-time feedback designed by senior hiring managers.
        </p>
      </div>

      {/* Grid of Feature Glass Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <GlassCard 
                key={feat.title} 
                glow={true} 
                glowColor={feat.color}
                className="flex flex-col justify-between h-full group"
              >
                <div className="space-y-4">
                  
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-indigo-400" />
                    </div>
                    <Badge variant={feat.color} dot={false}>
                      {feat.badge}
                    </Badge>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Bottom Metric Tags */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center gap-2">
                  {feat.metrics.map((m) => (
                    <span 
                      key={m} 
                      className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {m}
                    </span>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
