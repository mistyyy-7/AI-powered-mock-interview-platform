import React from 'react';
import GlassCard from '../ui/GlassCard';

const StatsSection = () => {
  const stats = [
    { value: '10K+', label: 'Mock Interviews Completed', highlight: 'Global candidates' },
    { value: '50K+', label: 'Questions Practiced', highlight: 'FAANG & Unicorn rubrics' },
    { value: '95%', label: 'User Satisfaction', highlight: 'Offer success rate' },
    { value: '24/7', label: 'AI Availability', highlight: 'Instant feedback loop' },
  ];

  return (
    <section className="py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassCard className="p-8 sm:p-10 border-indigo-500/20 bg-slate-950/70 backdrop-blur-2xl rounded-3xl shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
            {stats.map((st, idx) => (
              <div key={st.label} className={`space-y-1.5 ${idx !== 0 ? 'pt-6 sm:pt-0' : ''}`}>
                <div className="text-3xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 tracking-tight">
                  {st.value}
                </div>
                <div className="text-sm font-bold text-white tracking-wide">
                  {st.label}
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  {st.highlight}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default StatsSection;
