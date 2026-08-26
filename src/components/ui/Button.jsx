import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const base = `btn-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] disabled:opacity-50 disabled:cursor-not-allowed select-none`;

  const variants = {
    primary: `
      btn-primary-shimmer
      bg-gradient-to-r from-cyan-500 to-blue-600
      hover:from-cyan-400 hover:to-blue-500
      text-white
      shadow-lg shadow-cyan-500/20
      hover:shadow-cyan-500/30 hover:shadow-xl
      border border-cyan-400/20
      hover:scale-[1.02] active:scale-[0.98]
    `,
    secondary: `
      bg-white/5 hover:bg-white/10
      text-slate-200 hover:text-white
      border border-white/10 hover:border-white/20
      backdrop-blur-sm
      hover:scale-[1.01] active:scale-[0.99]
    `,
    outline: `
      bg-transparent
      border border-cyan-500/40 hover:border-cyan-400/70
      text-cyan-400 hover:text-cyan-300
      hover:bg-cyan-500/5
      hover:scale-[1.01] active:scale-[0.99]
    `,
    ghost: `
      bg-transparent
      text-slate-300 hover:text-white
      hover:bg-white/5
      hover:scale-[1.01] active:scale-[0.99]
    `,
    cyan: `
      btn-primary-shimmer
      bg-gradient-to-r from-cyan-500 to-blue-600
      hover:from-cyan-400 hover:to-blue-500
      text-white
      shadow-lg shadow-cyan-500/20
      hover:shadow-cyan-500/35 hover:shadow-xl
      border border-cyan-400/25
      hover:scale-[1.02] active:scale-[0.98]
    `,
    danger: `
      bg-rose-600/90 hover:bg-rose-500
      text-white
      border border-rose-500/30
      shadow-md shadow-rose-600/20
      hover:scale-[1.02] active:scale-[0.98]
    `,
    success: `
      bg-emerald-600/90 hover:bg-emerald-500
      text-white
      border border-emerald-500/30
      shadow-md shadow-emerald-600/20
      hover:scale-[1.02] active:scale-[0.98]
    `,
  };

  const sizes = {
    xs: 'text-xs px-2.5 py-1.5 gap-1.5 rounded-lg',
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5',
    xl: 'text-lg px-9 py-4 gap-3',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <svg
          className="w-4 h-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
      )}
      {children && <span>{children}</span>}
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
      )}
    </button>
  );
};

export default Button;
