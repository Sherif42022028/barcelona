"use client";

import React from "react";
import { ModuleData } from "@/data/curriculumData";
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
    <div className="w-full bg-[#0A291C] border-2 border-[#001E42] shadow-2xl relative overflow-hidden">
      {/* Top Tactical Bar */}
      <div className="bg-[#001E42] text-white px-4 py-2.5 flex items-center justify-between border-b border-[#EDBB00]/40">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#A50044] inline-block animate-ping rounded-full"></span>
          <span className="font-oswald text-xs uppercase tracking-widest text-white font-bold">
            خريطة التمركُز التكتيكي (Mini Pitch Map)
          </span>
        </div>
        <span className="text-xs text-[#EDBB00] font-oswald font-semibold">
          تشكيلة 4-3-3 الموضعية
        </span>
      </div>

      {/* Football Pitch Area */}
      <div className="relative w-full aspect-[16/9] tactical-pitch-bg overflow-hidden select-none border-b border-[#001E42]">
        {/* Background Watermark Crest */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <FCBLogo size={280} />
        </div>

        {/* Pitch Lines SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          <rect x="20" y="20" width="960" height="560" fill="none" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="500" y1="20" x2="500" y2="580" stroke="#FFFFFF" strokeWidth="3" />
          <circle cx="500" cy="300" r="90" fill="none" stroke="#FFFFFF" strokeWidth="3" />
          <circle cx="500" cy="300" r="5" fill="#FFFFFF" />

          {/* Goal Boxes */}
          <rect x="350" y="440" width="300" height="140" fill="none" stroke="#FFFFFF" strokeWidth="3" />
          <rect x="420" y="520" width="160" height="60" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          <rect x="350" y="20" width="300" height="140" fill="none" stroke="#FFFFFF" strokeWidth="3" />
          <rect x="420" y="20" width="160" height="60" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          
          {/* Positional Channels */}
          <line x1="220" y1="20" x2="220" y2="580" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.3" />
          <line x1="780" y1="20" x2="780" y2="580" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.3" />
        </svg>

        {/* Interactive Player Position Markers */}
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
              className="absolute flex flex-col items-center group transition-transform duration-200 hover:scale-110 focus:outline-none z-10 cursor-pointer"
            >
              {/* Player Node Circle */}
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 border-2 flex items-center justify-center font-oswald font-bold text-sm sm:text-base shadow-xl transition-all ${
                  isCompleted
                    ? "bg-[#004D98] border-[#EDBB00] text-white"
                    : isActive
                    ? "bg-[#A50044] border-white text-white ring-4 ring-[#A50044]/60 animate-pulse"
                    : "bg-[#0A291C]/90 border-white/40 text-white/80 hover:border-white"
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

              {/* Position Label Pill */}
              <div
                className={`mt-1 px-2.5 py-0.5 text-[10px] sm:text-xs font-oswald font-bold tracking-wide border shadow-lg whitespace-nowrap ${
                  isActive
                    ? "bg-[#A50044] text-white border-[#EDBB00]"
                    : isCompleted
                    ? "bg-[#004D98] text-white border-blue-300"
                    : "bg-black/80 text-white/90 border-white/20"
                }`}
              >
                {m.positionRole.split("-")[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend Bar */}
      <div className="bg-[#001530] text-white/90 px-4 py-2 flex flex-wrap items-center justify-center gap-6 text-xs border-t border-white/10 font-cairo">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 bg-[#A50044] border border-white inline-block"></span>
          <span>الوحدة الحالية (نابضة)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 bg-[#004D98] border border-[#EDBB00] inline-block"></span>
          <span>وحدة مكتملة (أزرق وأحمر)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 bg-[#0A291C] border border-white/40 inline-block"></span>
          <span>وحدة قادمة</span>
        </div>
      </div>
    </div>
  );
};
