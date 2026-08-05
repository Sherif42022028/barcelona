"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeaderScoreboard } from "@/components/HeaderScoreboard";
import { TacticalPitchBoard } from "@/components/TacticalPitchBoard";
import { MODULES_DATA } from "@/data/curriculumData";
import {
  ArrowRight,
  Zap,
  Shield,
  Target,
  GitMerge,
  Maximize2,
  Triangle,
  Eye,
  Flame,
  Gauge,
  ShieldAlert,
  Clock,
  Compass,
  CheckCircle2,
  Play
} from "lucide-react";

interface LessonPageProps {
  params: Promise<{
    moduleId: string;
  }>;
}

// Icon mapper helper
const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Shield": return <Shield className="w-6 h-6 text-[#004D98]" />;
    case "GitMerge": return <GitMerge className="w-6 h-6 text-[#A50044]" />;
    case "Target": return <Target className="w-6 h-6 text-[#004D98]" />;
    case "Maximize2": return <Maximize2 className="w-6 h-6 text-[#004D98]" />;
    case "Triangle": return <Triangle className="w-6 h-6 text-[#A50044]" />;
    case "Zap": return <Zap className="w-6 h-6 text-[#EDBB00]" />;
    case "Eye": return <Eye className="w-6 h-6 text-[#004D98]" />;
    case "Flame": return <Flame className="w-6 h-6 text-[#A50044]" />;
    case "Gauge": return <Gauge className="w-6 h-6 text-[#004D98]" />;
    case "ShieldAlert": return <ShieldAlert className="w-6 h-6 text-[#A50044]" />;
    case "Clock": return <Clock className="w-6 h-6 text-[#004D98]" />;
    case "Compass": return <Compass className="w-6 h-6 text-[#004D98]" />;
    default: return <Zap className="w-6 h-6 text-[#004D98]" />;
  }
};

export default function LessonPage({ params }: LessonPageProps) {
  const resolvedParams = use(params);
  const moduleData = MODULES_DATA.find((m) => m.id === resolvedParams.moduleId);

  if (!moduleData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1A1A1A] pb-16">
      {/* Top Header */}
      <HeaderScoreboard completedCount={0} totalModules={4} masteryPercentage={0} />

      <main className="max-w-5xl mx-auto px-4 pt-6 space-y-8">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-gray-300 pb-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-oswald uppercase text-[#004D98] hover:text-[#00366F] font-bold"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للوحة التحكم
          </Link>

          <span className="text-xs text-gray-500 font-sans">
            الوحدة {moduleData.numberStr} من 04
          </span>
        </div>

        {/* Title Briefing Header */}
        <section className="bg-white border border-[#1A1A1A]/10 p-6 blaugrana-stripe-top shadow-sm space-y-2">
          <div className="flex items-center gap-3">
            <span className="scoreboard-num text-4xl text-[#004D98]">
              {moduleData.numberStr}
            </span>
            <div>
              <span className="text-xs text-[#A50044] font-oswald uppercase tracking-widest font-bold">
                {moduleData.positionRole}
              </span>
              <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                {moduleData.title}
              </h2>
            </div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed pt-2 border-t border-gray-100">
            {moduleData.summary}
          </p>
        </section>

        {/* Bento Cards Layout Section */}
        <section className="space-y-4">
          <h3 className="font-oswald text-xl font-bold text-[#00366F] uppercase tracking-wider flex items-center gap-2">
            <span className="w-3 h-3 bg-[#A50044] inline-block"></span>
            المفاهيم التكتيكية الأساسية (Bento Cards)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {moduleData.bentoItems.map((item, idx) => (
              <div
                key={idx}
                className="blaugrana-card p-6 flex flex-col justify-between space-y-4 bg-white"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-[#F7F5F0] border border-gray-200">
                      {getIcon(item.iconName)}
                    </div>
                    {item.highlightText && (
                      <span className="text-[10px] font-oswald font-bold px-2 py-0.5 bg-[#004D98] text-white tracking-wider">
                        {item.highlightText}
                      </span>
                    )}
                  </div>

                  <h4 className="font-oswald text-lg font-bold text-[#1A1A1A]">
                    {item.title}
                  </h4>
                  <p className="text-xs font-oswald text-[#A50044] uppercase font-semibold">
                    {item.subtitle}
                  </p>

                  <p className="text-sm text-gray-700 leading-relaxed pt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Visual Tactical Scenario Preview */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-oswald text-xl font-bold text-[#00366F] uppercase tracking-wider flex items-center gap-2">
              <span className="w-3 h-3 bg-[#004D98] inline-block"></span>
              المخطط التكتيكي البصري (Tactical Board Scenario)
            </h3>
            <span className="text-xs text-gray-500 font-sans">
              معاينة حركة مسارات الكرة والمواقع
            </span>
          </div>

          <TacticalPitchBoard
            players={moduleData.challenge.pitchState.players}
            ballPosition={moduleData.challenge.pitchState.ballPosition}
            passLines={moduleData.challenge.pitchState.passLines}
          />
        </section>

        {/* Five Tactical Rules */}
        <section className="bg-white border border-gray-200 p-6 space-y-4 shadow-sm">
          <h3 className="font-oswald text-xl font-bold text-[#A50044] uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#A50044]" />
            القواعد التكتيكية الخمس (5 Core Tactical Rules)
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {moduleData.fiveTacticalRules.map((rule, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 bg-[#F7F5F0] border-r-4 border-[#004D98] border-t border-b border-l border-gray-200"
              >
                <span className="font-oswald font-bold text-lg text-[#004D98] leading-none min-w-[24px]">
                  0{idx + 1}
                </span>
                <p className="text-sm text-gray-800 font-semibold">{rule}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Action Button to Instant Challenge */}
        <div className="pt-4 flex justify-end">
          <Link
            href={`/challenge/${moduleData.id}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#A50044] hover:bg-[#7A0032] text-white px-8 py-4 text-base font-oswald uppercase font-bold tracking-widest transition-all shadow-lg text-center"
          >
            <Play className="w-5 h-5 fill-white" />
            الانتقال للتحدي الفوري ➔
          </Link>
        </div>
      </main>
    </div>
  );
}
