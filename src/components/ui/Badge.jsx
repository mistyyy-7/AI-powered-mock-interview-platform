import React from 'react';

const Badge = ({ children, variant = 'cyan', dot = false, className = '' }) => {
  const variants = {
    cyan:    'bg-cyan-500/10 border-cyan-500/25 text-cyan-400',
    blue:    'bg-blue-500/10 border-blue-500/25 text-blue-400',
    violet:  'bg-violet-500/10 border-violet-500/25 text-violet-400',
    purple:  'bg-violet-500/10 border-violet-500/25 text-violet-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400',
    rose:    'bg-rose-500/10 border-rose-500/25 text-rose-400',
    amber:   'bg-amber-500/10 border-amber-500/25 text-amber-400',
    indigo:  'bg-indigo-500/10 border-indigo-500/25 text-indigo-400',
    slate:   'bg-slate-700/50 border-slate-600/50 text-slate-300',
  };

  const dotColor = {
    cyan:    'bg-cyan-400',
    blue:    'bg-blue-400',
    violet:  'bg-violet-400',
    purple:  'bg-violet-400',
    emerald: 'bg-emerald-400',
    rose:    'bg-rose-400',
    amber:   'bg-amber-400',
    indigo:  'bg-indigo-400',
    slate:   'bg-slate-400',
  };

  return (
    <span className={`
      inline-flex items-center gap-1.5 px-2.5 py-1
      rounded-full border text-[10px] font-bold tracking-widest uppercase
      backdrop-blur-sm
      ${variants[variant] || variants.cyan}
      ${className}
    `}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotColor[variant] || dotColor.cyan}`} />
      )}
      {children}
    </span>
  );
};

export default Badge;
