"use client";

import React from "react";
import Link from "next/link";
import { Trophy, Compass, Brain } from "lucide-react";

interface HeaderScoreboardProps {
  currentStageCode?: string;
  stageProgress?: number;
  overallProgress?: number;
  topSkillName?: string;
  topSkillLevel?: number;
  completedCount?: number;
  totalModules?: number;
  masteryPercentage?: number;
}

export const HeaderScoreboard: React.FC<HeaderScoreboardProps> = ({
  currentStageCode = "BUILD",
  stageProgress = 68,
  overallProgress = 24,
  topSkillName = "Decision Making",
  topSkillLevel = 72,
  masteryPercentage,
}) => {
  const displayProgress = masteryPercentage !== undefined ? masteryPercentage : overallProgress;

  return (
    <div className="w-full bg-[#070D18]/80 backdrop-blur-md border-b border-white/5 py-2.5 px-4 font-cairo">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* Stage Status Pill */}
        <div className="flex items-center gap-3">
          <span className="bg-gradient-to-r from-[#A50044] to-[#70002E] text-[#EDBB00] font-oswald font-bold px-2.5 py-0.5 rounded-md tracking-wider uppercase border border-[#EDBB00]/30 shadow-md">
            STAGE 01: {currentStageCode}
          </span>
          <span className="text-[#94A3B8] font-sans">
            إنجاز المرحلة: <strong className="text-[#EDBB00] font-oswald text-sm mr-1">{stageProgress}%</strong>
          </span>
        </div>

        {/* Middle Stats */}
        <div className="flex items-center gap-6 text-[#94A3B8]">
          <div className="flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#004D98]" />
            <span>التقدم الإجمالي:</span>
            <strong className="text-white font-oswald text-sm">{displayProgress}%</strong>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 pl-4 border-r border-white/10">
            <Brain className="w-4 h-4 text-emerald-400" />
            <span>أعلى مهارة:</span>
            <strong className="text-emerald-400 font-oswald text-sm">{topSkillName} ({topSkillLevel}%)</strong>
          </div>
        </div>

        {/* Link to Progress */}
        <Link
          href="/progress"
          className="text-[#EDBB00] hover:text-white font-oswald font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors"
        >
          <Trophy className="w-3.5 h-3.5" />
          Skill Radar ➔
        </Link>
      </div>
    </div>
  );
};
