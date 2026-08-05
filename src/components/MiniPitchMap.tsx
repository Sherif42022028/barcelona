"use client";

import React from "react";
import { ModuleData } from "@/data/curriculumData";
import { Check, Star, Lock, Play } from "lucide-react";

interface MiniPitchMapProps {
  modules: ModuleData[];
  completedModuleIds: string[];
  currentModuleId: string;
  onSelectModule: (moduleId: string) => void;
}

export const MiniPitchMap: React.FC<MiniPitchMapProps> = ({
  modules,
  completedModuleIds,
  currentModuleId,
  onSelectModule,
}) => {
  return (
    <div className="w-full bg-[#0E3625] border-2 border-[#1A1A1A]/20 p-4 relative overflow-hidden shadow-xl">
      {/* Tactical Header Label */}
      <div className="flex items-center justify-between mb-3 border-b border-white/20 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#A50044] inline-block animate-ping"></span>
          <span className="font-oswald text-xs uppercase tracking-widest text-white/90">
            خريطة التمركُز التكتيكي (Mini Pitch Tactical Map)
          </span>
        </div>
        <span className="text-[11px] text-emerald-300 font-sans">
          تشكيلة 4-3-3 الموضعية
        </span>
      </div>

      {/* Football Pitch Canvas (SVG + HTML Interactive Overlay) */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#0E3625] border border-white/30 rounded-none overflow-hidden select-none">
        {/* Pitch Lines SVG Background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          {/* Outer Boundary */}
          <rect x="20" y="20" width="960" height="560" fill="none" stroke="#FFFFFF" strokeWidth="3" />
          
          {/* Halfway Line */}
          <line x1="500" y1="20" x2="500" y2="580" stroke="#FFFFFF" strokeWidth="3" />
          
          {/* Center Circle */}
          <circle cx="500" cy="300" r="90" fill="none" stroke="#FFFFFF" strokeWidth="3" />
          <circle cx="500" cy="300" r="4" fill="#FFFFFF" />

          {/* Home Goal Box (Bottom) */}
          <rect x="350" y="440" width="300" height="140" fill="none" stroke="#FFFFFF" strokeWidth="3" />
          <rect x="420" y="520" width="160" height="60" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          
          {/* Away Goal Box (Top) */}
          <rect x="350" y="20" width="300" height="140" fill="none" stroke="#FFFFFF" strokeWidth="3" />
          <rect x="420" y="20" width="160" height="60" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          
          {/* Tactical Positional Channels (Subtle Vertical Lines) */}
          <line x1="220" y1="20" x2="220" y2="580" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />
          <line x1="780" y1="20" x2="780" y2="580" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />
        </svg>

        {/* Player Tactical Marker Buttons */}
        {modules.map((m) => {
          const isCompleted = completedModuleIds.includes(m.id);
          const isActive = m.id === currentModuleId;

          return (
            <button
              key={m.id}
              onClick={() => onSelectModule(m.id)}
              style={{
                left: `${m.pitchPosition.x}%`,
                top: `${m.pitchPosition.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              className={`absolute flex flex-col items-center group transition-transform duration-200 hover:scale-110 focus:outline-none z-10`}
            >
              {/* Tactical Marker Circle */}
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 border-2 flex items-center justify-center font-oswald font-bold text-sm sm:text-base shadow-lg transition-all ${
                  isCompleted
                    ? "bg-[#004D98] border-white text-white"
                    : isActive
                    ? "bg-[#A50044] border-[#EDBB00] text-white player-dot-active ring-4 ring-[#A50044]/40"
                    : "bg-[#0E3625]/90 border-white/40 text-white/70 hover:border-white"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-[#EDBB00]" />
                ) : isActive ? (
                  <Play className="w-4 h-4 fill-white text-white mr-0.5" />
                ) : (
                  <span>{m.numberStr}</span>
                )}
              </div>

              {/* Player Label Tag */}
              <div
                className={`mt-1 px-2 py-0.5 text-[10px] sm:text-xs font-oswald tracking-wide font-semibold border shadow-md whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-[#A50044] text-white border-[#EDBB00]"
                    : isCompleted
                    ? "bg-[#004D98] text-white border-blue-300"
                    : "bg-black/70 text-white/80 border-white/20"
                }`}
              >
                {m.positionRole.split("-")[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Tactical Legend Bar */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-white/80 bg-black/30 p-2 border border-white/10">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-[#A50044] border border-[#EDBB00] inline-block"></span>
          <span>الوحدة الحالية (نابضة)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-[#004D98] border border-white inline-block"></span>
          <span>وحدة مكتملة</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-[#0E3625] border border-white/40 inline-block"></span>
          <span>وحدة قادمة</span>
        </div>
      </div>
    </div>
  );
};
