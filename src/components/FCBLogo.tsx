"use client";

import React from "react";
import Image from "next/image";

interface FCBLogoProps {
  className?: string;
  size?: number;
}

export const FCBLogo: React.FC<FCBLogoProps> = ({ className = "", size = 52 }) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-block shrink-0 overflow-hidden shadow-lg border-2 border-[#EDBB00] ${className}`}
    >
      {/* User provided logo image */}
      <img
        src="/logo.jpg"
        alt="FC Barcelona Crest"
        className="w-full h-full object-cover"
      />
    </div>
  );
};
