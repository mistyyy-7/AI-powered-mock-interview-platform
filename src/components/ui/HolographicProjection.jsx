import React, { useEffect, useRef, useState } from 'react';
import brainImage from '../../assets/brain.jfif';

/**
 * HolographicProjection — brain.jfif rendered with aggressive ellipse masking
 * to eliminate the rectangular blue background. The brain appears as a
 * floating holographic AI visualization emerging from darkness.
 */
const HolographicProjection = () => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId;
    let mouseX = 0, mouseY = 0;
    let currX = 0, currY = 0;

    const onMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 14;
      mouseY = (e.clientY / innerHeight - 0.5) * 10;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const animate = () => {
      currX += (mouseX - currX) * 0.06;
      currY += (mouseY - currY) * 0.06;
      el.style.transform = `translate3d(${currX}px, ${currY}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
      <div ref={wrapperRef} className="relative w-full h-full flex items-center justify-center">

        {/* 1. Deep volumetric atmospheric glow — sits behind everything */}
        <div
          className="absolute rounded-full animate-breathe pointer-events-none"
          style={{
            width: '75%',
            height: '75%',
            background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.18) 0%, rgba(59,130,246,0.10) 40%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        {/* 2. Tighter inner glow — follows brain center */}
        <div
          className="absolute rounded-full animate-pulse-slow pointer-events-none"
          style={{
            width: '45%',
            height: '45%',
            top: '18%',
            background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.22) 0%, transparent 70%)',
            filter: 'blur(28px)',
          }}
        />

        {/* 3. Main brain image — aggressively masked with ellipse to kill rectangular bg */}
        <div
          className="absolute animate-float"
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={brainImage}
            alt="InteractAI holographic neural brain visualization"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '55% 45%',
              mixBlendMode: 'screen',
              /* 
               * OPTION A — Aggressive ellipse mask.
               * Inner 38% = full opacity (brain organ itself)
               * 38%→62% = soft fade gradient (removes the blue panel edges)
               * 62%+ = fully transparent (page background shows through)
               */
              WebkitMaskImage: `
                radial-gradient(
                  ellipse 58% 60% at 55% 45%,
                  black 0%,
                  black 35%,
                  rgba(0,0,0,0.88) 48%,
                  rgba(0,0,0,0.55) 58%,
                  rgba(0,0,0,0.15) 68%,
                  transparent 80%
                )
              `,
              maskImage: `
                radial-gradient(
                  ellipse 58% 60% at 55% 45%,
                  black 0%,
                  black 35%,
                  rgba(0,0,0,0.88) 48%,
                  rgba(0,0,0,0.55) 58%,
                  rgba(0,0,0,0.15) 68%,
                  transparent 80%
                )
              `,
              filter: `
                saturate(1.3)
                brightness(1.2)
                drop-shadow(0 0 28px rgba(6,182,212,0.45))
                drop-shadow(0 0 60px rgba(59,130,246,0.22))
              `,
              transform: 'scale(1.55)',
              transformOrigin: '55% 45%',
            }}
          />
        </div>

        {/* 4. Platform projection base glow at bottom */}
        <div
          className="absolute bottom-8 pointer-events-none"
          style={{
            width: '55%',
            height: '40px',
            background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.35) 0%, rgba(59,130,246,0.15) 50%, transparent 80%)',
            filter: 'blur(16px)',
          }}
        />

        {/* 5. Holographic scan line (sweeps vertically) */}
        <div
          className="absolute pointer-events-none overflow-hidden"
          style={{ width: '58%', height: '58%', top: '16%' }}
        >
          <div
            className="w-full animate-scan-y"
            style={{
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.5), transparent)',
              filter: 'blur(1px)',
            }}
          />
        </div>

        {/* 6. Subtle HUD data tags */}
        <div
          className="absolute font-mono select-none"
          style={{ top: '12%', left: '6%', fontSize: '9px', color: 'rgba(6,182,212,0.65)', letterSpacing: '0.1em' }}
        >
          [NEURAL_BRAIN: ONLINE]
        </div>
        <div
          className="absolute font-mono select-none"
          style={{ bottom: '14%', right: '6%', fontSize: '9px', color: 'rgba(59,130,246,0.65)', letterSpacing: '0.1em' }}
        >
          [HOLOGRAM_OPS: 100%]
        </div>
      </div>
    </div>
  );
};

export default HolographicProjection;