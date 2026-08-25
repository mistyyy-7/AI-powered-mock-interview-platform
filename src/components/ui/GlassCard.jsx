import React from 'react';

const GlassCard = ({
  children,
  className = '',
  hoverEffect = true,
  glow = false,
  glowColor = 'indigo',
  onClick,
  ...props
}) => {
  const glowStyles = {
    indigo: "shadow-[0_0_40px_-10px_rgba(99,102,241,0.25)] border-indigo-500/30",
    cyan: "shadow-[0_0_40px_-10px_rgba(6,182,212,0.25)] border-cyan-500/30",
    purple: "shadow-[0_0_40px_-10px_rgba(168,85,247,0.25)] border-purple-500/30",
    emerald: "shadow-[0_0_40px_-10px_rgba(16,185,129,0.25)] border-emerald-500/30"
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 
        transition-all duration-300 overflow-hidden
        ${hoverEffect ? 'hover:border-indigo-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10' : ''}
        ${glow ? glowStyles[glowColor] : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Subtle top glare line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};

export default GlassCard;
