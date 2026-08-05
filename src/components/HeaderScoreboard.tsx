"use client";

import React from "react";
import Link from "next/link";
import { Trophy, Compass, ShieldCheck, Flame, BookOpen } from "lucide-react";

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
    <header className="w-full bg-[#00366F] text-white border-b-4 border-[#A50044] shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#A50044] flex items-center justify-center font-oswald text-xl font-bold border border-white/20 text-white shadow-inner">
            FCB
          </div>
          <div>
            <h1 className="font-oswald text-xl tracking-wider uppercase font-bold text-white flex items-center gap-2">
              منهجية برشلونة التكتيكية
              <span className="text-xs bg-[#A50044] text-white font-sans px-2 py-0.5 font-normal tracking-normal">
                Pitch & Pedagogy
              </span>
            </h1>
            <p className="text-xs text-blue-200">
              أداة التعلم الذاتي والتحليل التكتيكي للعب الموضعي
            </p>
          </div>
        </Link>

        {/* Scoreboard Display Cards */}
        <div className="flex items-center gap-4 sm:gap-6 bg-[#002650] px-4 py-2 border border-white/10">
          {/* Unit Progress */}
          <div className="flex items-center gap-2 border-l border-white/15 pl-4">
            <BookOpen className="w-5 h-5 text-[#EDBB00]" />
            <div>
              <div className="text-[10px] text-blue-300 font-oswald uppercase tracking-wider">
                الوحدات المكتملة
              </div>
              <div className="scoreboard-num text-2xl text-white">
                {String(completedCount).padStart(2, "0")}{" "}
                <span className="text-sm font-sans font-normal text-blue-300">
                  / {String(totalModules).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Mastery Score */}
          <div className="flex items-center gap-2 border-l border-white/15 pl-4">
            <Trophy className="w-5 h-5 text-[#EDBB00]" />
            <div>
              <div className="text-[10px] text-blue-300 font-oswald uppercase tracking-wider">
                مستوى الإتقان
              </div>
              <div className="scoreboard-num text-2xl text-[#EDBB00]">
                {masteryPercentage}%
              </div>
            </div>
          </div>

          {/* Tactical Status Badge */}
          <div className="hidden md:flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-[10px] text-blue-300 font-oswald uppercase tracking-wider">
                الحالة التكتيكية
              </div>
              <div className="text-xs font-bold text-emerald-400 font-oswald tracking-wide">
                {masteryPercentage === 100
                  ? "مدرب تكتيكي محترف"
                  : masteryPercentage >= 50
                  ? "محلل تكتيكي متقدم"
                  : "محلل ناشئ"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
