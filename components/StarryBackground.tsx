'use client';

import React, { useEffect, useRef } from 'react';

interface RocketTrail {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  color: string;
  opacity: number;
  width: number;
  sparks: Array<{
    x: number;
    y: number;
    size: number;
    opacity: number;
    vx: number;
    vy: number;
  }>;
}

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
}

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color Palettes for Rocket Light Trails
    const rocketColors = [
      { head: '#38bdf8', tail: '#06b6d4', glow: 'rgba(6, 182, 212, 0.8)' },   // Electric Cyan
      { head: '#34d399', tail: '#10b981', glow: 'rgba(16, 185, 129, 0.8)' },  // Emerald
      { head: '#c084fc', tail: '#a855f7', glow: 'rgba(168, 85, 247, 0.8)' },  // Violet
      { head: '#f472b6', tail: '#ec4899', glow: 'rgba(236, 72, 153, 0.8)' },  // Pink
      { head: '#fbbf24', tail: '#f59e0b', glow: 'rgba(245, 158, 11, 0.8)' },  // Amber/Gold
    ];

    const starColors = [
      '#ffffff',
      '#38bdf8',
      '#34d399',
      '#c084fc',
      '#93c5fd',
    ];

    // Generate 180 3D Depth Stars
    const stars: Star[] = Array.from({ length: 180 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 1000,
      size: Math.random() * 2 + 0.8,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      alpha: Math.random(),
      baseAlpha: Math.random() * 0.7 + 0.2,
      twinkleSpeed: Math.random() * 0.03 + 0.005,
    }));

    // Array of Rocket Light Streaks coming from ANY direction
    const rockets: RocketTrail[] = [];

    const createRocket = () => {
      // Spawn rockets from any side / angle of the screen
      const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
      let x = 0;
      let y = 0;

      if (side === 0) {
        x = Math.random() * width;
        y = -50;
      } else if (side === 1) {
        x = width + 50;
        y = Math.random() * height;
      } else if (side === 2) {
        x = Math.random() * width;
        y = height + 50;
      } else {
        x = -50;
        y = Math.random() * height;
      }

      // Random angle towards screen center with spread
      const targetX = width * (0.2 + Math.random() * 0.6);
      const targetY = height * (0.2 + Math.random() * 0.6);
      const angle = Math.atan2(targetY - y, targetX - x) + (Math.random() - 0.5) * 0.4;

      const palette = rocketColors[Math.floor(Math.random() * rocketColors.length)];

      rockets.push({
        x,
        y,
        length: Math.random() * 180 + 100, // tail length
        speed: Math.random() * 1.8 + 1.2,  // slow, majestic rocket movement (1.2 to 3.0 px/frame)
        angle,
        color: palette.head,
        opacity: 1,
        width: Math.random() * 2 + 1.8,
        sparks: [],
      });
    };

    // Maintain active rocket streaks
    for (let i = 0; i < 4; i++) {
      createRocket();
    }

    let spawnTimer = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & Animate Stars
      for (const star of stars) {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 1 || star.alpha < 0.1) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.fillStyle = star.color;

        if (star.size > 2) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = star.color;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Spawn rockets periodically
      spawnTimer++;
      if (spawnTimer > 45 && rockets.length < 8) {
        createRocket();
        spawnTimer = 0;
      }

      // Render & Animate 3D Rocket Light Streaks
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];

        // Move Rocket forward slowly
        const vx = Math.cos(r.angle) * r.speed;
        const vy = Math.sin(r.angle) * r.speed;

        r.x += vx;
        r.y += vy;

        // Tail End Position
        const tailX = r.x - Math.cos(r.angle) * r.length;
        const tailY = r.y - Math.sin(r.angle) * r.length;

        // Spawn Spark Particles behind rocket head
        if (Math.random() < 0.5) {
          r.sparks.push({
            x: r.x - Math.cos(r.angle) * 8,
            y: r.y - Math.sin(r.angle) * 8,
            size: Math.random() * 2 + 1,
            opacity: 1,
            vx: (Math.random() - 0.5) * 0.8 - Math.cos(r.angle) * 0.5,
            vy: (Math.random() - 0.5) * 0.8 - Math.sin(r.angle) * 0.5,
          });
        }

        // Draw Sparks
        for (let j = r.sparks.length - 1; j >= 0; j--) {
          const s = r.sparks[j];
          s.x += s.vx;
          s.y += s.vy;
          s.opacity -= 0.018;

          if (s.opacity <= 0) {
            r.sparks.splice(j, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = s.opacity;
          ctx.fillStyle = r.color;
          ctx.shadowBlur = 6;
          ctx.shadowColor = r.color;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Draw Rocket Light Trail Gradient
        ctx.save();
        ctx.globalAlpha = r.opacity;
        const gradient = ctx.createLinearGradient(r.x, r.y, tailX, tailY);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.2, r.color);
        gradient.addColorStop(1, 'transparent');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = r.width;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 16;
        ctx.shadowColor = r.color;

        ctx.beginPath();
        ctx.moveTo(r.x, r.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Draw Rocket Glowing Head Core
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 12;
        ctx.shadowColor = r.color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.width + 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Check bounds & fade out
        if (
          r.x < -200 ||
          r.x > width + 200 ||
          r.y < -200 ||
          r.y > height + 200
        ) {
          rockets.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 select-none"
    />
  );
}
