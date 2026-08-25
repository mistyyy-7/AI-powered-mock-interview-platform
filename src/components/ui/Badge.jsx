import React from 'react';

const Badge = ({
  children,
  variant = 'indigo',
  size = 'md',
  dot = true,
  className = ''
}) => {
  const variants = {
    indigo: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30 dot-bg-indigo-400",
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30 dot-bg-cyan-400",
    emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 dot-bg-emerald-400",
    amber: "bg-amber-500/10 text-amber-300 border-amber-500/30 dot-bg-amber-400",
    purple: "bg-purple-500/10 text-purple-300 border-purple-500/30 dot-bg-purple-400",
    rose: "bg-rose-500/10 text-rose-300 border-rose-500/30 dot-bg-rose-400"
  };

  const dotColors = {
    indigo: "bg-indigo-400",
    cyan: "bg-cyan-400",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    purple: "bg-purple-400",
    rose: "bg-rose-400"
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5 gap-1.5",
    md: "text-xs font-medium px-2.5 py-1 gap-2",
    lg: "text-sm font-medium px-3.5 py-1.5 gap-2"
  };

  return (
    <span className={`inline-flex items-center rounded-full border backdrop-blur-md ${variants[variant]} ${sizes[size]} ${className}`}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  );
};

export default Badge;
