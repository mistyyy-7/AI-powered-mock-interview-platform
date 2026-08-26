import React from 'react';

const GlassCard = ({
  children,
  className = '',
  hoverEffect = true,
  glow = false,
  glowColor = 'cyan',
  reveal = false,
  revealDelay = 0,
  onClick,
  as: Tag = 'div',
  ...props
}) => {
  const glowMap = {
    cyan:    'shadow-[0_0_40px_-12px_rgba(6,182,212,0.25)] border-cyan-500/25',
    blue:    'shadow-[0_0_40px_-12px_rgba(59,130,246,0.25)] border-blue-500/25',
    violet:  'shadow-[0_0_40px_-12px_rgba(129,140,248,0.20)] border-violet-500/25',
    emerald: 'shadow-[0_0_40px_-12px_rgba(16,185,129,0.25)] border-emerald-500/25',
    rose:    'shadow-[0_0_40px_-12px_rgba(244,63,94,0.20)] border-rose-500/25',
  };

  return (
    <Tag
      onClick={onClick}
      className={`
        glass-card p-6
        ${hoverEffect ? 'glass-hover cursor-default' : ''}
        ${glow ? glowMap[glowColor] || glowMap.cyan : ''}
        ${onClick ? '!cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default GlassCard;
