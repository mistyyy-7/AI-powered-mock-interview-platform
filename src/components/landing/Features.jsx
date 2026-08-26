import React from 'react';
import { Bot, Zap, BarChart3, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';

const Features = () => {
  const featureList = [
    {
      icon: Bot,
      color: 'purple',
      badge: 'Neural Voice Engine',
      title: 'AI-Powered Interviews',
      description: 'Practice realistic interviews powered by AI. Experience natural, adaptive follow-up questions tailored to your exact industry role.',
      highlights: ['Real-Time Adaptive Qs', '< 400ms Voice Latency']
    },
    {
      icon: Zap,
      color: 'indigo',
      badge: 'Instant Scorecard',
      title: 'Instant Feedback',
      description: 'Understand your strengths and weaknesses immediately. Receive instant STAR framework analysis, keyword matching, and communication rubrics.',
      highlights: ['STAR Framework Rubric', 'Technical Keyword Check']
    },
    {
      icon: BarChart3,
      color: 'cyan',
      badge: 'Performance Tracking',
      title: 'Performance Analytics',
      description: 'Track your interview performance over time. View clear historical trend metrics, filler word counts, pacing, and readiness scores.',
      highlights: ['Historical Score Trends', 'Confidence Index']
    },
    {
      icon: Sparkles,
      color: 'emerald',
      badge: 'Smart Refactoring',
      title: 'Personalized Improvement',
      description: 'Get AI-generated recommendations based on your performance. Learn how top 1% candidates structure 10/10 responses.',
      highlights: ['Ideal Answer Rewrites', 'Targeted Coaching Hints']
    }
  ];

  return (
    <section id="features" className="py-24 relative z-10 overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/20 text-xs font-semibold text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>FUTURISTIC AI PLATFORM CAPABILITIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Everything You Need to <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
              Interview Better
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Eliminate interview anxiety. Train under realistic high-stakes scenarios with AI feedback calibrated to top tech company standards.
          </p>
        </div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featureList.map((feat) => {
            const Icon = feat.icon;
            return (
              <GlassCard 
                key={feat.title} 
                glow={true}
                glowColor={feat.color}
                className="p-8 flex flex-col justify-between group hover:border-purple-500/40"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:text-purple-300 transition-all duration-300 shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant={feat.color} dot={false}>
                      {feat.badge}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white group-hover:text-purple-200 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-3">
                    {feat.highlights.map((h) => (
                      <span key={h} className="text-slate-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {h}
                      </span>
                    ))}
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
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
