"use client";

import React from "react";
import Link from "next/link";
import { FCBLogo } from "@/components/FCBLogo";
import { Trophy, BookOpen, ShieldCheck, Sparkles } from "lucide-react";

interface HeaderScoreboardProps {
  completedCount: number;
  totalModules: number;
  masteryPercentage: number;
}

export const HeaderScoreboard: React.FC<HeaderScoreboardProps> = ({
  completedCount,
  totalModules,
  masteryPercentage,
}) => {
  return (
    <header className="w-full bg-[#001E42] text-white border-b-4 border-[#EDBB00] shadow-2xl sticky top-0 z-50">
      {/* Top Thin Blaugrana Stripe */}
      <div className="w-full h-1.5 blaugrana-header-stripe"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Crest Header */}
        <Link href="/" className="flex items-center gap-4 group cursor-pointer">
          <FCBLogo size={52} className="group-hover:scale-105 transition-transform" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-oswald text-2xl font-bold tracking-wider text-white uppercase">
                FC BARCELONA
              </h1>
              <span className="bg-[#A50044] text-[#EDBB00] px-2 py-0.5 text-[11px] font-oswald font-bold tracking-widest border border-[#EDBB00]/40">
                METHODOLOGY ACADEMY
              </span>
            </div>
            <p className="text-xs text-blue-200 font-cairo">
              أداة التعلم المنهجي والتحليل التكتيكي للعب الموضعي (Juego de Posición)
            </p>
          </div>
        </Link>

        {/* Scoreboard Cards */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 bg-[#001530] px-5 py-2.5 border border-white/15 rounded-none shadow-inner">
          {/* Completed Units */}
          <div className="flex items-center gap-3 pl-4 border-l border-white/15">
            <div className="p-2 bg-[#004D98]/40 border border-[#004D98]">
              <BookOpen className="w-5 h-5 text-[#EDBB00]" />
            </div>
            <div>
              <div className="text-[10px] text-blue-300 font-oswald uppercase tracking-wider">
                الوحدات المكتملة
              </div>
              <div className="scoreboard-number text-2xl text-white">
                {String(completedCount).padStart(2, "0")}
                <span className="text-sm font-sans font-normal text-blue-300 mr-1">
                  / {String(totalModules).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Mastery Score */}
          <div className="flex items-center gap-3 pl-4 border-l border-white/15">
            <div className="p-2 bg-[#A50044]/40 border border-[#A50044]">
              <Trophy className="w-5 h-5 text-[#EDBB00]" />
            </div>
            <div>
              <div className="text-[10px] text-blue-300 font-oswald uppercase tracking-wider">
                نسبة الإتقان
              </div>
              <div className="scoreboard-number text-2xl text-[#EDBB00]">
                {masteryPercentage}%
              </div>
            </div>
          </div>

          {/* Tactical Status Badge */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-950/60 border border-emerald-500">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-[10px] text-blue-300 font-oswald uppercase tracking-wider">
                الحالة التكتيكية
              </div>
              <div className="text-xs font-bold text-emerald-400 font-oswald tracking-wider">
                {masteryPercentage === 100
                  ? "محلل تكتيكي محترف"
                  : masteryPercentage >= 50
                  ? "محلل متقدم"
                  : "محلل مستجد"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
