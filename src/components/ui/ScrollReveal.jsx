import React, { useEffect, useRef } from 'react';

const ScrollReveal = ({
  children,
  variant = 'up',        // 'up' | 'left' | 'right' | 'scale' | 'fade'
  delay = 0,             // ms
  threshold = 0.12,
  className = '',
  as: Tag = 'div',
  ...props
}) => {
  const ref = useRef(null);

  const variantClass = {
    up: 'reveal',
    left: 'reveal-left',
    right: 'reveal-right',
    scale: 'reveal-scale',
    fade: 'reveal',
  }[variant] || 'reveal';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.classList.add('revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('revealed');
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <Tag ref={ref} className={`${variantClass} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export default ScrollReveal;
