"use client";

import React from "react";
import { FCBLogo } from "@/components/FCBLogo";

export interface PitchPlayer {
  id: string;
  role: string;
  x: number;
  y: number;
  team: "home" | "away";
  label: string;
  highlighted?: boolean;
}

interface TacticalPitchBoardProps {
  players?: PitchPlayer[];
  ballPosition?: { x: number; y: number };
  passLines?: Array<{ fromX: number; fromY: number; toX: number; toY: number; dashed?: boolean }>;
  interactive?: boolean;
  selectedPlayerId?: string;
  onPlayerClick?: (id: string) => void;
}

export const TacticalPitchBoard: React.FC<TacticalPitchBoardProps> = ({
  players = [],
  ballPosition,
  passLines = [],
  interactive = false,
  selectedPlayerId,
  onPlayerClick,
}) => {
  return (
    <div className="w-full bg-[#071910] border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative select-none">
      {/* Pitch Header Bar */}
      <div className="bg-[#0B1426]/90 border-b border-white/10 px-4 py-2 flex items-center justify-between text-xs font-oswald">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#A50044] animate-pulse"></span>
          <span className="text-white font-bold tracking-widest uppercase">
            TACTICAL BOARD VISUALIZER
          </span>
        </div>
        <span className="text-[#EDBB00] font-semibold">
          Juego de Posición Matrix
        </span>
      </div>

      {/* Main Pitch Field */}
      <div className="relative w-full aspect-[16/10] tactical-pitch-dark overflow-hidden">
        {/* Background Crest Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <FCBLogo size={240} />
        </div>

        {/* Pitch Tactical SVG Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          {/* Outer Boundary */}
          <rect x="20" y="20" width="960" height="560" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
          
          {/* Halfway Line */}
          <line x1="500" y1="20" x2="500" y2="580" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="500" cy="300" r="80" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="500" cy="300" r="4" fill="#FFFFFF" />

          {/* Goal Areas */}
          <rect x="360" y="450" width="280" height="130" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          <rect x="420" y="520" width="160" height="60" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
          
          <rect x="360" y="20" width="280" height="130" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          <rect x="420" y="20" width="160" height="60" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />

          {/* Tactical Positional Channels */}
          <line x1="220" y1="20" x2="220" y2="580" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.4" />
          <line x1="780" y1="20" x2="780" y2="580" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.4" />

          {/* Render Pass Lines */}
          {passLines.map((line, idx) => (
            <g key={idx}>
              <line
                x1={line.fromX * 10}
                y1={line.fromY * 6}
                x2={line.toX * 10}
                y2={line.toY * 6}
                stroke="#EDBB00"
                strokeWidth="3"
                strokeDasharray={line.dashed ? "8 6" : "none"}
                className="animate-pulse"
              />
            </g>
          ))}
        </svg>

        {/* Ball Marker */}
        {ballPosition && (
          <div
            style={{ left: `${ballPosition.x}%`, top: `${ballPosition.y}%`, transform: "translate(-50%, -50%)" }}
            className="absolute z-20 w-4 h-4 rounded-full bg-[#EDBB00] border-2 border-white shadow-lg glow-gold animate-bounce"
          />
        )}

        {/* Player Nodes */}
        {players.map((p) => {
          const isSelected = selectedPlayerId === p.id;
          const isHome = p.team === "home";

          return (
            <div
              key={p.id}
              onClick={() => interactive && onPlayerClick && onPlayerClick(p.id)}
              style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
              className={`absolute flex flex-col items-center z-10 transition-all ${
                interactive ? "cursor-pointer hover:scale-110" : ""
              }`}
            >
              {/* Player Jersey Circle */}
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-oswald font-bold text-xs sm:text-sm shadow-2xl border-2 transition-all ${
                  p.highlighted || isSelected
                    ? "bg-[#A50044] border-[#EDBB00] text-white ring-4 ring-[#A50044]/60 glow-[#A50044] scale-110"
                    : isHome
                    ? "bg-[#004D98] border-white/80 text-white shadow-blue-500/30"
                    : "bg-gray-800 border-red-500 text-white"
                }`}
              >
                {p.role}
              </div>

              {/* Player Label Pill */}
              <span className="mt-1 px-2 py-0.5 text-[10px] font-oswald font-bold rounded-md bg-black/80 text-white border border-white/20 whitespace-nowrap shadow-md">
                {p.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
