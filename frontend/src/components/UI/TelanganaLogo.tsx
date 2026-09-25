import React from 'react';

interface TelanganaLogoProps {
  className?: string;
  size?: number;
}

export const TelanganaLogo: React.FC<TelanganaLogoProps> = ({ className = "h-16 w-16", size = 64 }) => {
  return (
    <div className={`relative flex items-center justify-center flex-shrink-0 drop-shadow-md ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer Gold Border Ring */}
        <circle cx="100" cy="100" r="96" fill="#006837" stroke="#DAA520" strokeWidth="6" />

        {/* Inner Gold Concentric Ring */}
        <circle cx="100" cy="100" r="82" fill="#00582F" stroke="#FFD700" strokeWidth="3" />
        <circle cx="100" cy="100" r="68" fill="#FFFFFF" stroke="#006837" strokeWidth="2.5" />

        {/* Circular Outer Text: Government of Telangana */}
        <path id="textPathUpper" d="M 25,100 A 75,75 0 1,1 175,100" fill="none" />
        <path id="textPathLowerTe" d="M 25,105 A 75,75 0 0,0 100,175" fill="none" />
        <path id="textPathLowerUr" d="M 100,175 A 75,75 0 0,0 175,105" fill="none" />

        <text fill="#FFD700" fontSize="10.5" fontWeight="bold" letterSpacing="1.2">
          <textPath href="#textPathUpper" startOffset="50%" textAnchor="middle">
            GOVERNMENT OF TELANGANA
          </textPath>
        </text>

        <text fill="#FFD700" fontSize="11" fontWeight="bold">
          <textPath href="#textPathLowerTe" startOffset="50%" textAnchor="middle">
            తెలంగాణ ప్రభుత్వము
          </textPath>
        </text>

        <text fill="#FFD700" fontSize="11" fontWeight="bold">
          <textPath href="#textPathLowerUr" startOffset="50%" textAnchor="middle">
            تلنگانہ سرکار
          </textPath>
        </text>

        {/* Ashoka Pillar Lion Capital Emblem at Top Center */}
        <g transform="translate(100, 48) scale(0.65)">
          <rect x="-18" y="10" width="36" height="5" fill="#DAA520" />
          <path
            d="M -12 10 C -15 0, -10 -15, 0 -20 C 10 -15, 15 0, 12 10 Z"
            fill="#DAA520"
          />
          <path
            d="M -6 -5 C -12 -8, -12 -16, 0 -22 C 12 -16, 12 -8, 6 -5 Z"
            fill="#FFD700"
          />
        </g>

        {/* Kakatiya Kala Thoranam Arch Structure */}
        <g transform="translate(100, 105) scale(0.85)">
          {/* Left & Right Pillars */}
          <rect x="-42" y="-15" width="8" height="50" rx="1.5" fill="#006837" />
          <rect x="34" y="-15" width="8" height="50" rx="1.5" fill="#006837" />

          {/* Pillars Decorative Bands */}
          <rect x="-44" y="-5" width="12" height="3" fill="#DAA520" />
          <rect x="32" y="-5" width="12" height="3" fill="#DAA520" />
          <rect x="-44" y="15" width="12" height="3" fill="#DAA520" />
          <rect x="32" y="15" width="12" height="3" fill="#DAA520" />

          {/* Curved Thoranam Arch Top */}
          <path
            d="M -44 -15 Q 0 -55 44 -15 Q 0 -42 -44 -15 Z"
            fill="#006837"
            stroke="#DAA520"
            strokeWidth="2"
          />

          {/* Inner Loop Arch Curves */}
          <path
            d="M -35 -15 Q 0 -38 35 -15"
            fill="none"
            stroke="#DAA520"
            strokeWidth="3"
          />
        </g>

        {/* Charminar Structure inside center background */}
        <g transform="translate(100, 118) scale(0.68)">
          <rect x="-25" y="-20" width="50" height="38" fill="#00582F" />
          <path d="M -12 18 Q 0 -5 12 18 Z" fill="#FFFFFF" />

          {/* 4 Minarets */}
          <rect x="-28" y="-45" width="6" height="63" fill="#006837" />
          <circle cx="-25" cy="-47" r="4.5" fill="#DAA520" />
          <rect x="-14" y="-35" width="4" height="53" fill="#006837" />
          <circle cx="-12" cy="-37" r="3" fill="#DAA520" />
          <rect x="10" y="-35" width="4" height="53" fill="#006837" />
          <circle cx="12" cy="-37" r="3" fill="#DAA520" />
          <rect x="22" y="-45" width="6" height="63" fill="#006837" />
          <circle cx="25" cy="-47" r="4.5" fill="#DAA520" />
        </g>
      </svg>
    </div>
  );
};
