import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Platform Logo for "How The Web Works"
 * Combines:
 * 1. World Wide Web Globe Grid (Web & Networking Protocols)
 * 2. Code Syntax Brackets </ > (Frontend/Backend JavaScript & Engineering)
 * 3. Central Glowing Pulse Node (Data Flow & First-Principles Architecture)
 */
export default function Logo({ className = 'w-10 h-10', size }: LogoProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Ambient Glow Aura */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500 via-emerald-400 to-purple-600 blur-md opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
      
      {/* Glass Container */}
      <div className="relative w-full h-full rounded-2xl bg-[#060914] border border-cyan-500/40 p-2 flex items-center justify-center shadow-2xl backdrop-blur-xl">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-cyan-400 transition-transform duration-500 group-hover:scale-105"
          width={size}
          height={size}
        >
          <defs>
            <linearGradient id="web-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="web-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <filter id="glow-node" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Web Globe Outer Orbit / Grid */}
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="url(#web-grad-1)"
            strokeWidth="3"
            opacity="0.85"
          />
          
          {/* Globe Latitude Lines */}
          <ellipse
            cx="50"
            cy="50"
            rx="42"
            ry="18"
            stroke="url(#web-grad-1)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.5"
          />

          {/* Left Code Bracket < */}
          <path
            d="M 33 34 L 20 50 L 33 66"
            stroke="url(#web-grad-2)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow-node)"
          />

          {/* Right Code Bracket > */}
          <path
            d="M 67 34 L 80 50 L 67 66"
            stroke="url(#web-grad-2)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow-node)"
          />

          {/* Slash / Data Packet Line */}
          <line
            x1="55"
            y1="30"
            x2="45"
            y2="70"
            stroke="url(#web-grad-1)"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Center Glowing Web Packet Node */}
          <circle cx="50" cy="50" r="5" fill="#38bdf8" filter="url(#glow-node)" />
          <circle cx="50" cy="50" r="2" fill="#ffffff" />
        </svg>
      </div>
    </div>
  );
}
