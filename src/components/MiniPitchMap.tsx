"use client";

import React from "react";
import { ModuleData } from "@/data/academyData";
import { FCBLogo } from "@/components/FCBLogo";
import { Check, Play } from "lucide-react";

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
    <div className="w-full bg-[#071910] border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden">
      {/* Top Bar */}
      <div className="bg-[#0B1426]/90 border-b border-white/10 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#A50044] rounded-full animate-ping"></span>
          <span className="font-oswald text-xs font-bold uppercase tracking-widest text-white">
            خريطة التمركُز التكتيكي (Mini Pitch Map)
          </span>
        </div>
        <span className="text-xs text-[#EDBB00] font-oswald font-semibold">
          تشكيلة 4-3-3 الموضعية
        </span>
      </div>

      {/* Football Pitch */}
      <div className="relative w-full aspect-[16/9] tactical-pitch-dark overflow-hidden select-none">
        {/* Background Watermark Crest */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <FCBLogo size={260} />
        </div>

        {/* Pitch Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          <rect x="20" y="20" width="960" height="560" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
          <line x1="500" y1="20" x2="500" y2="580" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="500" cy="300" r="80" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="500" cy="300" r="4" fill="#FFFFFF" />

          {/* Goal Boxes */}
          <rect x="360" y="450" width="280" height="130" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          <rect x="420" y="520" width="160" height="60" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
          <rect x="360" y="20" width="280" height="130" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          <rect x="420" y="20" width="160" height="60" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>

        {/* Player Markers */}
        {modules.map((m, idx) => {
          const isCompleted = completedModuleIds.includes(m.id);
          const isActive = m.id === currentModuleId;

          return (
            <button
              key={m.id}
              onClick={() => onSelectModule(m.id)}
              style={{
                left: `${(idx + 1) * 20}%`,
                top: `${50 + (idx % 2 === 0 ? 15 : -15)}%`,
                transform: "translate(-50%, -50%)",
              }}
              className="absolute flex flex-col items-center group transition-transform duration-200 hover:scale-110 focus:outline-none z-10 cursor-pointer"
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center font-oswald font-bold text-sm shadow-2xl transition-all ${
                  isCompleted
                    ? "bg-[#004D98] border-[#EDBB00] text-white glow-blue"
                    : isActive
                    ? "bg-[#A50044] border-white text-white ring-4 ring-[#A50044]/60 animate-pulse glow-[#A50044]"
                    : "bg-[#071910]/90 border-white/40 text-white/80 hover:border-white"
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

              <div
                className={`mt-1 px-2.5 py-0.5 text-[10px] font-oswald font-bold tracking-wide rounded-md border shadow-lg whitespace-nowrap ${
                  isActive
                    ? "bg-[#A50044] text-white border-[#EDBB00]"
                    : isCompleted
                    ? "bg-[#004D98] text-white border-blue-300"
                    : "bg-black/80 text-white/90 border-white/20"
                }`}
              >
                {m.title.split(" ")[0]}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
