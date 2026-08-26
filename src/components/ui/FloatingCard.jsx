import React from 'react';

const FloatingCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  badgeColor = 'purple',
  className = '',
  animationClass = 'animate-float'
}) => {
  const borderColors = {
    purple: 'border-purple-500/30 hover:border-purple-400/60 shadow-purple-500/15',
    indigo: 'border-indigo-500/30 hover:border-indigo-400/60 shadow-indigo-500/15',
    cyan: 'border-cyan-500/30 hover:border-cyan-400/60 shadow-cyan-500/15',
    emerald: 'border-emerald-500/30 hover:border-emerald-400/60 shadow-emerald-500/15'
  };

  const textColors = {
    purple: 'text-purple-400',
    indigo: 'text-indigo-400',
    cyan: 'text-cyan-400',
    emerald: 'text-emerald-400'
  };

  return (
    <div className={`
      relative rounded-2xl bg-slate-950/80 backdrop-blur-2xl border ${borderColors[badgeColor]}
      px-4 py-3 shadow-xl transition-all duration-500 select-none ${animationClass} ${className}
    `}>
      {/* Top glare line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={`w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center ${textColors[badgeColor]} shrink-0 shadow-inner`}>
            <Icon className="w-4 h-4" />
          </div>
        )}

        <div className="space-y-0.5">
          <div className="text-[11px] font-semibold text-slate-400 tracking-wide uppercase">
            {title}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-white tracking-tight">
              {value}
            </span>
            {subtitle && (
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 ${textColors[badgeColor]}`}>
                {subtitle}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingCard;
