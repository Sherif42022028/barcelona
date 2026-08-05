"use client";

import React from "react";

interface FCBLogoProps {
  className?: string;
  size?: number;
}

export const FCBLogo: React.FC<FCBLogoProps> = ({ className = "", size = 48 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md ${className}`}
    >
      {/* Outer Shield Outline */}
      <path
        d="M 50 5 C 75 5, 95 18, 95 30 C 95 65, 75 88, 50 95 C 25 88, 5 65, 5 30 C 5 18, 25 5, 50 5 Z"
        fill="#EDBB00"
        stroke="#1A1A1A"
        strokeWidth="3"
      />
      <path
        d="M 50 8 C 72 8, 91 20, 91 31 C 91 63, 72 85, 50 91 C 28 85, 9 63, 9 31 C 9 20, 28 8, 50 8 Z"
        fill="#FFFFFF"
      />

      {/* Top Left: St. George's Cross */}
      <g clipPath="url(#topLeftClip)">
        <rect x="10" y="10" width="38" height="35" fill="#FFFFFF" />
        <rect x="25" y="10" width="8" height="35" fill="#A50044" />
        <rect x="10" y="23.5" width="38" height="8" fill="#A50044" />
      </g>

      {/* Top Right: Senyera Stripes (Catalan Flag) */}
      <g clipPath="url(#topRightClip)">
        <rect x="52" y="10" width="38" height="35" fill="#EDBB00" />
        <rect x="58" y="10" width="5" height="35" fill="#A50044" />
        <rect x="68" y="10" width="5" height="35" fill="#A50044" />
        <rect x="78" y="10" width="5" height="35" fill="#A50044" />
      </g>

      {/* Center Yellow Ribbon Band with FCB Text */}
      <rect x="8" y="42" width="84" height="15" fill="#EDBB00" stroke="#1A1A1A" strokeWidth="1.5" />
      <text
        x="50"
        y="53.5"
        fontFamily="Oswald, sans-serif"
        fontWeight="700"
        fontSize="11"
        fill="#001E42"
        textAnchor="middle"
        letterSpacing="2"
      >
        F. C. B.
      </text>

      {/* Bottom Half: Blaugrana Stripes */}
      <g clipPath="url(#bottomClip)">
        <rect x="10" y="58" width="80" height="34" fill="#004D98" />
        <rect x="24" y="58" width="12" height="34" fill="#A50044" />
        <rect x="48" y="58" width="12" height="34" fill="#A50044" />
        <rect x="72" y="58" width="12" height="34" fill="#A50044" />

        {/* Vintage Golden Football */}
        <circle cx="50" cy="74" r="10" fill="#EDBB00" stroke="#001E42" strokeWidth="1.5" />
        <path d="M 44 74 L 56 74 M 50 68 L 50 80" stroke="#001E42" strokeWidth="1" />
        <circle cx="50" cy="74" r="4" fill="none" stroke="#001E42" strokeWidth="1" />
      </g>

      {/* Clip Paths for Top/Bottom Split */}
      <defs>
        <clipPath id="topLeftClip">
          <rect x="10" y="10" width="38" height="32" />
        </clipPath>
        <clipPath id="topRightClip">
          <rect x="52" y="10" width="38" height="32" />
        </clipPath>
        <clipPath id="bottomClip">
          <path d="M 10 58 L 90 58 L 90 65 C 90 78, 72 88, 50 91 C 28 88, 10 78, 10 65 Z" />
        </clipPath>
      </defs>
    </svg>
  );
};
