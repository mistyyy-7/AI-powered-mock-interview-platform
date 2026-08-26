import React, { useEffect, useState } from 'react';
import brainImage from '../../assets/brain.jfif';

const HolographicProjection = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = (e.clientX - innerWidth / 2) * 0.015;
      const offsetY = (e.clientY - innerHeight / 2) * 0.015;
      setMouseOffset({ x: offsetX, y: offsetY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="relative w-full max-w-[620px] aspect-square flex items-center justify-center pointer-events-none select-none z-10 transition-transform duration-300 ease-out"
      style={{
        transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`
      }}
    >
      {/* 1. Atmospheric Ambient Radial Glow behind Brain */}
      <div 
        className="absolute w-[520px] h-[520px] rounded-full blur-[110px] animate-pulse-slow pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.22) 0%, rgba(59, 130, 246, 0.10) 50%, transparent 70%)'
        }}
      />

      {/* 2. Floating Brain & Hologram Container */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        
        {/* Blended Brain Image - Scaled up 1.6x and tightly masked around central brain & platform */}
        <img
          src={brainImage}
          alt="InteractAI Holographic Neural Brain"
          className="w-full h-full object-cover mix-blend-screen scale-150 transform transition-transform duration-700 animate-float"
          style={{
            transformOrigin: '60% 48%',
            maskImage: 'radial-gradient(ellipse 52% 52% at 60% 48%, black 35%, rgba(0,0,0,0.75) 58%, transparent 82%)',
            WebkitMaskImage: 'radial-gradient(ellipse 52% 52% at 60% 48%, black 35%, rgba(0,0,0,0.75) 58%, transparent 82%)',
            filter: 'saturate(1.3) brightness(1.22) drop-shadow(0 0 35px rgba(6, 182, 212, 0.45)) drop-shadow(0 0 70px rgba(59, 130, 246, 0.25))'
          }}
        />

        {/* 3. Subtle Holographic Scan Beam Line */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent pointer-events-none animate-pulse-slow" />

        {/* 4. Integrated Sleek HUD Data Tags */}
        <div className="absolute top-6 left-6 text-[10px] font-mono tracking-wider text-cyan-400/80 bg-slate-950/80 px-2.5 py-1 rounded-md border border-cyan-500/25 shadow-lg backdrop-blur-md">
          [NEURAL_BRAIN: ONLINE]
        </div>

        <div className="absolute bottom-8 right-6 text-[10px] font-mono tracking-wider text-cyan-400/80 bg-slate-950/80 px-2.5 py-1 rounded-md border border-cyan-500/25 shadow-lg backdrop-blur-md">
          [HOLOGRAM_OPS: 100%]
        </div>

      </div>
    </div>
  );
};

export default HolographicProjection;
