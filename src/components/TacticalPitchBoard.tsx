"use client";

import React from "react";

export interface PitchPlayer {
  id: string;
  role: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  team: "home" | "away";
  label: string;
  highlighted?: boolean;
}

export interface PitchPassLine {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  dashed?: boolean;
}

interface TacticalPitchBoardProps {
  players: PitchPlayer[];
  ballPosition?: { x: number; y: number };
  passLines?: PitchPassLine[];
  onPlayerClick?: (playerId: string) => void;
  selectedPlayerId?: string;
  interactive?: boolean;
}

export const TacticalPitchBoard: React.FC<TacticalPitchBoardProps> = ({
  players,
  ballPosition,
  passLines = [],
  onPlayerClick,
  selectedPlayerId,
  interactive = false,
}) => {
  return (
    <div className="w-full bg-[#0E3625] border-2 border-[#1A1A1A]/30 relative overflow-hidden shadow-lg select-none">
      {/* SVG Canvas for Pitch Lines, Pass Lines & Player Markers */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#0E3625]">
        {/* Pitch Field Lines SVG */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          {/* Outer Boundary */}
          <rect x="20" y="20" width="960" height="560" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.4" />
          
          {/* Halfway Line */}
          <line x1="500" y1="20" x2="500" y2="580" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.4" />
          
          {/* Center Circle */}
          <circle cx="500" cy="300" r="90" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.4" />
          <circle cx="500" cy="300" r="4" fill="#FFFFFF" fillOpacity="0.4" />

          {/* Goal Boxes */}
          <rect x="20" y="200" width="160" height="200" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.4" />
          <rect x="820" y="200" width="160" height="200" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.4" />

          {/* Tactical Channels / Vertical Guidelines */}
          <line x1="20" y1="180" x2="980" y2="180" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="5 5" opacity="0.2" />
          <line x1="20" y1="420" x2="980" y2="420" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="5 5" opacity="0.2" />

          {/* Pass Lines / Tactical Direction Lines */}
          {passLines.map((line, idx) => {
            // Map percentages 0-100 to SVG viewBox 0-1000 and 0-600
            const x1 = (line.fromX / 100) * 1000;
            const y1 = (line.fromY / 100) * 600;
            const x2 = (line.toX / 100) * 1000;
            const y2 = (line.toY / 100) * 600;

            return (
              <g key={idx}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#EDBB00"
                  strokeWidth="3"
                  strokeDasharray={line.dashed ? "6 6" : "none"}
                  className="animate-pulse"
                />
                {/* Arrowhead marker at end of pass line */}
                <circle cx={x2} cy={y2} r="6" fill="#EDBB00" />
              </g>
            );
          })}
        </svg>

        {/* Dynamic Ball Representation */}
        {ballPosition && (
          <div
            style={{
              left: `${ballPosition.x}%`,
              top: `${ballPosition.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            className="absolute z-20 w-4 h-4 sm:w-5 sm:h-5 bg-white border-2 border-black rounded-full shadow-md animate-bounce"
            title="موقع الكرة"
          />
        )}

        {/* Player Dots */}
        {players.map((p) => {
          const isHome = p.team === "home";
          const isSelected = selectedPlayerId === p.id;

          return (
            <div
              key={p.id}
              onClick={() => interactive && onPlayerClick && onPlayerClick(p.id)}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              className={`absolute z-10 flex flex-col items-center cursor-pointer transition-transform duration-150 ${
                interactive ? "hover:scale-115" : ""
              }`}
            >
              {/* Player Node Icon */}
              <div
                className={`w-7 h-7 sm:w-9 sm:h-9 border-2 flex items-center justify-center font-oswald text-xs sm:text-sm font-bold shadow-md transition-all ${
                  isHome
                    ? "bg-[#004D98] text-white border-white"
                    : "bg-[#A50044] text-white border-white/80"
                } ${
                  p.highlighted
                    ? "ring-4 ring-[#EDBB00] animate-pulse"
                    : ""
                } ${
                  isSelected
                    ? "ring-4 ring-emerald-400 scale-110"
                    : ""
                }`}
              >
                {p.role}
              </div>

              {/* Player Label Pill */}
              <span
                className={`mt-1 px-1.5 py-0.5 text-[9px] sm:text-[11px] font-sans font-semibold border shadow ${
                  isHome
                    ? "bg-[#00366F] text-white border-blue-300"
                    : "bg-[#7A0032] text-white border-red-300"
                }`}
              >
                {p.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
