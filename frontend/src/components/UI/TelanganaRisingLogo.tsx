import React from 'react';

interface TelanganaRisingLogoProps {
  className?: string;
  size?: number;
}

export const TelanganaRisingLogo: React.FC<TelanganaRisingLogoProps> = ({ className = "h-14 w-auto", size = 56 }) => {
  return (
    <div className={`flex items-center gap-1.5 flex-shrink-0 ${className}`}>
      <svg
        height={size}
        viewBox="0 0 240 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        {/* Globe Arc lines on the right */}
        <g stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
          <path d="M 140 15 C 180 15, 220 40, 230 80 C 240 120, 210 155, 170 165" strokeDasharray="6 4" />
          <path d="M 145 25 C 185 25, 215 50, 222 85 C 230 120, 205 145, 175 155" strokeDasharray="8 3" />
          <path d="M 150 35 C 190 35, 210 60, 215 90 C 220 120, 200 138, 178 145" />
          <path d="M 155 45 C 192 45, 205 70, 208 95 C 210 115, 195 130, 180 135" strokeDasharray="4 3" />
          <path d="M 160 55 C 195 55, 200 80, 202 100" />
        </g>

        {/* Shaded Large "1" Structure */}
        <g>
          {/* Main "1" Body with vertical stripes */}
          <path
            d="M 60 45 L 80 20 L 105 20 L 105 135 L 75 135 L 75 45 Z"
            fill="#1e3a8a"
          />
          {/* Vertical Stripe Details inside 1 */}
          <path d="M 83 25 L 83 130" stroke="#ffffff" strokeWidth="2.5" />
          <path d="M 90 25 L 90 130" stroke="#ffffff" strokeWidth="2.5" />
          <path d="M 97 25 L 97 130" stroke="#ffffff" strokeWidth="2.5" />

          {/* Circle Overlay on 1 containing Telangana Map */}
          <circle cx="85" cy="80" r="32" fill="#002244" stroke="#ffffff" strokeWidth="3" />
          
          {/* Telangana Map Gradient Inset */}
          <g transform="translate(68, 62) scale(0.32)">
            <path
              d="M 30 10 Q 50 0 70 15 Q 95 20 100 40 Q 95 65 75 80 Q 50 95 25 80 Q 5 60 10 35 Z"
              fill="url(#tsMapGrad)"
              stroke="#ffffff"
              strokeWidth="2"
            />
          </g>

          <defs>
            <linearGradient id="tsMapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
        </g>

        {/* Text Section Below */}
        {/* TELANGANA */}
        <text x="12" y="146" fill="#1e3a8a" fontSize="17" fontWeight="900" letterSpacing="0.5">
          TELANGANA
        </text>
        <line x1="12" y1="149" x2="125" y2="149" stroke="#ef4444" strokeWidth="2" />

        {/* RISING */}
        <text x="12" y="170" fill="#1e3a8a" fontSize="23" fontWeight="900" letterSpacing="1">
          RISING
        </text>

        {/* CURE - PURE - RARE */}
        <g fontFamily="monospace" fontSize="12" fontWeight="900">
          <text x="12" y="180" fill="#ea580c">CURE</text>
          <text x="52" y="180" fill="#64748b">-</text>
          <text x="62" y="180" fill="#0284c7">PURE</text>
          <text x="104" y="180" fill="#64748b">-</text>
          <text x="114" y="180" fill="#16a34a">RARE</text>
        </g>
      </svg>
    </div>
  );
};
