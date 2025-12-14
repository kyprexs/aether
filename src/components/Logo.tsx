'use client';

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 48, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer glow */}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E0FF" />
          <stop offset="100%" stopColor="#00B4CC" />
        </linearGradient>
      </defs>

      {/* A + D monogram */}
      <g filter="url(#glow)">
        {/* Letter A - stylized */}
        <path
          d="M12 48L28 12L36 28"
          stroke="url(#cyanGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M18 36H34"
          stroke="url(#cyanGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Letter D - stylized, overlapping */}
        <path
          d="M32 12V48"
          stroke="url(#cyanGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M32 12H42C50 12 54 20 54 30C54 40 50 48 42 48H32"
          stroke="url(#cyanGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Accent dot */}
        <circle cx="54" cy="12" r="3" fill="#00E0FF" />
      </g>
    </svg>
  );
}
