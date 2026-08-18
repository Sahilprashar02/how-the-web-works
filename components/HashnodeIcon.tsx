import React from 'react';

interface HashnodeIconProps {
  className?: string;
  size?: number;
}

export default function HashnodeIcon({ className = 'w-4 h-4', size }: HashnodeIconProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path d="M256 0C114.615 0 0 114.615 0 256s114.615 256 256 256 256-114.615 256-256S397.385 0 256 0zm106.667 362.667c-17.684 17.684-46.349 17.684-64.033 0L256 319.967l-42.634 42.7c-17.684 17.684-46.349 17.684-64.033 0-17.684-17.684-17.684-46.349 0-64.033L192.033 256l-42.7-42.634c-17.684-17.684-17.684-46.349 0-64.033 17.684-17.684 46.349-17.684 64.033 0L256 192.033l42.634-42.7c17.684-17.684 46.349-17.684 64.033 0 17.684 17.684 17.684 46.349 0 64.033L319.967 256l42.7 42.634c17.684 17.684 17.684 46.349 0 64.033z" />
    </svg>
  );
}

export function HashnodeLogoMark({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="200" height="200" rx="44" fill="url(#hashnode-grad)" />
      <path
        d="M100 45C69.6243 45 45 69.6243 45 100C45 130.376 69.6243 155 100 155C130.376 155 155 130.376 155 100C155 69.6243 130.376 45 100 45ZM140 100L115 125L100 110L85 125L60 100L85 75L100 90L115 75L140 100Z"
        fill="white"
      />
      <defs>
        <linearGradient id="hashnode-grad" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
