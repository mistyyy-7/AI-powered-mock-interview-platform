import React, { useEffect, useRef } from 'react';

const ThreeVisualizer = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = containerRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 520);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 520);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // ==========================================
    // 1. EXISTING NEURAL SPHERE GEOMETRY (SUBTLE BACKGROUND DEPTH)
    // ==========================================
    const numSpherePoints = 75;
    const sphereRadius = Math.min(width, height) * 0.38;
    const spherePoints = [];

    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < numSpherePoints; i++) {
      const y = 1 - (i / (numSpherePoints - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;

      spherePoints.push({
        x: Math.cos(theta) * r * sphereRadius,
        y: y * sphereRadius,
        z: Math.sin(theta) * r * sphereRadius,
        color: i % 2 === 0 ? '6, 182, 212' : '59, 130, 246'
      });
    }

    // ==========================================
    // 2. 3D BRAIN CORTEX NODES (SUBTLE BACKGROUND DEPTH)
    // ==========================================
    const numBrainNodes = 90;
    const brainNodes = [];
    const brainRadiusX = sphereRadius * 0.72;
    const brainRadiusY = sphereRadius * 0.62;
    const brainRadiusZ = sphereRadius * 0.68;

    for (let i = 0; i < numBrainNodes; i++) {
      const hemisphere = i % 2 === 0 ? -1 : 1;
      const u = Math.random() * Math.PI * 2;
      const v = (Math.random() - 0.5) * Math.PI;

      const sideOffset = hemisphere * (0.18 + Math.random() * 0.12);
      const bx = (Math.cos(v) * Math.cos(u) * 0.6 + sideOffset) * brainRadiusX;
      const by = (Math.sin(v) * 0.85 + Math.sin(u * 3) * 0.08) * brainRadiusY;
      const bz = (Math.cos(v) * Math.sin(u) * 0.7) * brainRadiusZ;

      brainNodes.push({
        x: bx,
        y: by,
        z: bz,
        hemisphere,
        pulseEnergy: Math.random(),
        baseColor: hemisphere === -1 ? '6, 182, 212' : '59, 130, 246',
        neighbors: []
      });
    }

    for (let i = 0; i < brainNodes.length; i++) {
      for (let j = i + 1; j < brainNodes.length; j++) {
        const dx = brainNodes[i].x - brainNodes[j].x;
        const dy = brainNodes[i].y - brainNodes[j].y;
        const dz = brainNodes[i].z - brainNodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < brainRadiusX * 0.52) {
          brainNodes[i].neighbors.push(j);
          brainNodes[j].neighbors.push(i);
        }
      }
    }

    const activePulses = [];
    for (let p = 0; p < 12; p++) {
      const startIdx = Math.floor(Math.random() * brainNodes.length);
      const neighbors = brainNodes[startIdx].neighbors;
      if (neighbors.length > 0) {
        const endIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
        activePulses.push({
          from: startIdx,
          to: endIdx,
          progress: Math.random(),
          speed: 0.012 + Math.random() * 0.015,
          color: p % 2 === 0 ? '6, 182, 212' : '59, 130, 246'
        });
      }
    }

    let angleX = 0.0015;
    let angleY = 0.003;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX = (e.clientX - cx) * 0.00006;
      mouseY = (e.clientY - cy) * 0.00006;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      const rotY = angleY + mouseX;
      const rotX = angleX + mouseY;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Rotate sphere points
      for (let i = 0; i < spherePoints.length; i++) {
        const p = spherePoints[i];
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;
        let y1 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;
        p.x = x1; p.y = y1; p.z = z2;
      }

      // Rotate brain nodes
      for (let i = 0; i < brainNodes.length; i++) {
        const bn = brainNodes[i];
        let x1 = bn.x * cosY - bn.z * sinY;
        let z1 = bn.z * cosY + bn.x * sinY;
        let y1 = bn.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + bn.y * sinX;
        bn.x = x1; bn.y = y1; bn.z = z2;
        bn.pulseEnergy = (bn.pulseEnergy + 0.015) % (Math.PI * 2);
      }

      // Draw subtle background neural sphere lines (lower opacity)
      for (let i = 0; i < spherePoints.length; i++) {
        const p1 = spherePoints[i];
        const scale1 = 300 / (300 - p1.z * 0.5);
        const px1 = cx + p1.x * scale1;
        const py1 = cy + p1.y * scale1;

        for (let j = i + 1; j < spherePoints.length; j++) {
          const p2 = spherePoints[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < sphereRadius * 0.65) {
            const scale2 = 300 / (300 - p2.z * 0.5);
            const px2 = cx + p2.x * scale2;
            const py2 = cy + p2.y * scale2;
            const alpha = (1 - dist / (sphereRadius * 0.65)) * 0.12 * (scale1 / 1.5);

            ctx.beginPath();
            ctx.moveTo(px1, py1);
            ctx.lineTo(px2, py2);
            ctx.strokeStyle = `rgba(${p1.color}, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        const nodeRadius = Math.max(0.8, (p1.z + sphereRadius) / (sphereRadius * 2) * 2.0 + 0.5);
        const nodeAlpha = Math.max(0.1, (p1.z + sphereRadius) / (sphereRadius * 2)) * 0.5;

        ctx.beginPath();
        ctx.arc(px1, py1, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p1.color}, ${nodeAlpha})`;
        ctx.fill();
      }

      // Draw subtle brain nodes and synapses
      for (let i = 0; i < brainNodes.length; i++) {
        const bn1 = brainNodes[i];
        const scale1 = 300 / (300 - bn1.z * 0.5);
        const bx1 = cx + bn1.x * scale1;
        const by1 = cy + bn1.y * scale1;

        for (let n = 0; n < bn1.neighbors.length; n++) {
          const j = bn1.neighbors[n];
          if (j > i) {
            const bn2 = brainNodes[j];
            const scale2 = 300 / (300 - bn2.z * 0.5);
            const bx2 = cx + bn2.x * scale2;
            const by2 = cy + bn2.y * scale2;

            const pulseGlow = Math.sin(bn1.pulseEnergy) * 0.1 + 0.15;
            ctx.beginPath();
            ctx.moveTo(bx1, by1);
            ctx.lineTo(bx2, by2);
            ctx.strokeStyle = `rgba(${bn1.baseColor}, ${pulseGlow * (scale1 / 1.6)})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        const bNodeRadius = Math.max(1, (bn1.z + brainRadiusZ) / (brainRadiusZ * 2) * 2.5 + 0.8);
        const bAlpha = Math.max(0.2, (bn1.z + brainRadiusZ) / (brainRadiusZ * 2)) * 0.6;

        ctx.beginPath();
        ctx.arc(bx1, by1, bNodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${bn1.baseColor}, ${bAlpha})`;
        ctx.fill();
      }

      // Signal Pulses
      for (let p = 0; p < activePulses.length; p++) {
        const pulse = activePulses[p];
        const n1 = brainNodes[pulse.from];
        const n2 = brainNodes[pulse.to];

        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.from = pulse.to;
          const nextNeighbors = brainNodes[pulse.from].neighbors;
          if (nextNeighbors.length > 0) {
            pulse.to = nextNeighbors[Math.floor(Math.random() * nextNeighbors.length)];
          }
        }

        const scale1 = 300 / (300 - n1.z * 0.5);
        const scale2 = 300 / (300 - n2.z * 0.5);
        const bx1 = cx + n1.x * scale1;
        const by1 = cy + n1.y * scale1;
        const bx2 = cx + n2.x * scale2;
        const by2 = cy + n2.y * scale2;

        const currX = bx1 + (bx2 - bx1) * pulse.progress;
        const currY = by1 + (by2 - by1) * pulse.progress;

        ctx.beginPath();
        ctx.arc(currX, currY, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pulse.color}, 0.75)`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-45 pointer-events-none z-0">
      <canvas ref={containerRef} className="w-full h-full block" />
    </div>
  );
};

export default ThreeVisualizer;
