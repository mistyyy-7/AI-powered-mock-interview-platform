import React, { useEffect, useRef } from 'react';

/**
 * ThreeVisualizer — subtle 3D neural sphere depth layer.
 * Renders as an absolutely positioned canvas behind the HolographicProjection.
 * Low opacity — purely for technical depth, not visual dominance.
 */
const ThreeVisualizer = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    const parent = canvas.parentElement;
    let W = (canvas.width = parent?.clientWidth || 520);
    let H = (canvas.height = parent?.clientHeight || 520);

    const handleResize = () => {
      W = canvas.width = parent?.clientWidth || 520;
      H = canvas.height = parent?.clientHeight || 520;
    };
    window.addEventListener('resize', handleResize);

    const R = Math.min(W, H) * 0.38;
    const PHI = Math.PI * (3 - Math.sqrt(5));
    const N = 70;
    const pts = [];

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = PHI * i;
      pts.push({
        x: Math.cos(theta) * r * R,
        y: y * R,
        z: Math.sin(theta) * r * R,
        c: i % 2 === 0 ? '6,182,212' : '59,130,246',
      });
    }

    let aX = 0.0015, aY = 0.003, mX = 0, mY = 0;
    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mX = (e.clientX - (rect.left + rect.width / 2)) * 0.00007;
      mY = (e.clientY - (rect.top + rect.height / 2)) * 0.00007;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      const cosY = Math.cos(aY + mX), sinY = Math.sin(aY + mX);
      const cosX = Math.cos(aX + mY), sinX = Math.sin(aX + mY);

      for (const p of pts) {
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;
        p.x = x1; p.y = y1; p.z = z2;
      }

      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        const s1 = 300 / (300 - a.z * 0.5);
        const px1 = cx + a.x * s1, py1 = cy + a.y * s1;

        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < R * 0.6) {
            const s2 = 300 / (300 - b.z * 0.5);
            const alpha = (1 - dist / (R * 0.6)) * 0.10 * (s1 / 1.5);
            ctx.beginPath();
            ctx.moveTo(px1, py1);
            ctx.lineTo(cx + b.x * s2, cy + b.y * s2);
            ctx.strokeStyle = `rgba(${a.c},${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        const nr = Math.max(0.6, (a.z + R) / (R * 2) * 2);
        const na = Math.max(0.08, (a.z + R) / (R * 2)) * 0.4;
        ctx.beginPath();
        ctx.arc(px1, py1, nr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${a.c},${na})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-35">
      <canvas ref={ref} className="w-full h-full" aria-hidden="true" />
    </div>
  );
};

export default ThreeVisualizer;
