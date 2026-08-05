"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { HeaderScoreboard } from "@/components/HeaderScoreboard";
import { STAGES_DATA, FRAMEWORKS, SKILL_METRICS, MATCH_CASES } from "@/data/academyData";
import {
  Play,
  Lock,
  CheckCircle2,
  Compass,
  Activity,
  Award,
  Layers,
  ArrowLeft,
  ChevronLeft,
  Target,
  Sparkles,
  RefreshCw,
  Brain
} from "lucide-react";

export default function DashboardPage() {
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [userSkills, setUserSkills] = useState(SKILL_METRICS);

  useEffect(() => {
    const saved = localStorage.getItem("fcb_completed_modules");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCompletedLessonIds(parsed);
        }
      } catch (e) {
        console.error("Parse error", e);
      }
    }
  }, []);

  const buildStage = STAGES_DATA[0];
  const activeLesson = buildStage.modules[0]?.lessons[0];

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#121820] pb-24 font-cairo">
      {/* Site Navbar */}
      <Navbar />

      {/* Sub Header Scoreboard */}
      <HeaderScoreboard
        currentStageCode="BUILD"
        stageProgress={68}
        overallProgress={24}
        topSkillName="Decision Making"
        topSkillLevel={72}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-10">
        {/* SECTION 1: CONTINUE YOUR JOURNEY */}
        <section className="bg-white border-2 border-[#001E42] p-6 sm:p-8 shadow-xl blaugrana-card-accent relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="bg-[#A50044] text-[#EDBB00] px-3 py-0.5 text-xs font-oswald font-bold tracking-widest uppercase border border-[#EDBB00]">
                  CONTINUE YOUR JOURNEY
                </span>
                <span className="text-xs font-oswald text-[#004D98] font-bold">
                  STAGE 01: BUILD
                </span>
              </div>

              <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-[#001E42] uppercase">
                {activeLesson ? activeLesson.title : "Building from the Back & Positional Play"}
              </h2>

              <p className="text-sm text-gray-700 leading-relaxed">
                {activeLesson ? activeLesson.summary : "تعلم كيفية إنشاء التفوق العددي وتحديد المساحات الحرة من خط البناء الأول."}
              </p>

              {/* Progress Bar */}
              <div className="space-y-1 pt-2">
                <div className="flex items-center justify-between text-xs font-oswald font-bold">
                  <span className="text-[#004D98]">Stage Progress:</span>
                  <span className="text-[#A50044]">68%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 border border-gray-300 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#004D98] to-[#A50044] w-[68%] transition-all"></div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="shrink-0 w-full lg:w-auto">
              <Link
                href={`/learn/lesson/${activeLesson?.id || "l-1-1"}`}
                className="w-full lg:w-auto inline-flex items-center justify-center gap-3 bg-[#004D98] hover:bg-[#002D5E] text-white px-8 py-4 text-sm font-oswald uppercase font-bold tracking-wider transition-colors shadow-lg text-center"
              >
                <Play className="w-4 h-4 fill-white" />
                Continue Lesson ➔
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 2: YOUR LEARNING PATH (4 STAGES) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b-4 border-[#004D98] pb-2">
            <h3 className="font-oswald text-2xl font-bold uppercase text-[#001E42] flex items-center gap-3">
              <Compass className="w-6 h-6 text-[#A50044]" />
              YOUR LEARNING PATH (المسار التعليمي المرحلي)
            </h3>
            <Link
              href="/learn/path"
              className="text-xs font-oswald font-bold text-[#004D98] hover:underline uppercase flex items-center gap-1"
            >
              View Full Path ➔
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STAGES_DATA.map((stage, idx) => (
              <div
                key={stage.id}
                className={`bg-white border-2 p-5 flex flex-col justify-between relative transition-all shadow-md ${
                  stage.unlocked
                    ? "border-[#004D98] blaugrana-card-accent"
                    : "border-gray-300 opacity-80 bg-gray-50"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-oswald text-2xl font-bold text-[#004D98]">
                      {stage.numberStr}
                    </span>
                    <span
                      className={`text-xs font-oswald font-bold px-2 py-0.5 border ${
                        stage.unlocked
                          ? "bg-emerald-50 text-emerald-800 border-emerald-400"
                          : "bg-gray-200 text-gray-600 border-gray-400"
                      }`}
                    >
                      {stage.unlocked ? `${stage.progress}%` : "🔒 Locked"}
                    </span>
                  </div>

                  <h4 className="font-oswald text-xl font-bold text-[#001E42]">
                    {stage.codeName}
                  </h4>
                  <p className="text-xs font-oswald font-semibold text-[#A50044]">
                    {stage.title}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 pt-1">
                    {stage.question}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200">
                  {stage.unlocked ? (
                    <Link
                      href={`/learn/stage/${stage.id}`}
                      className="block text-center py-2 text-xs font-oswald uppercase font-bold text-white bg-[#004D98] hover:bg-[#002D5E] transition-colors"
                    >
                      Enter Stage ➔
                    </Link>
                  ) : (
                    <div className="text-center py-2 text-xs font-oswald text-gray-500 font-semibold flex items-center justify-center gap-1 bg-gray-100">
                      <Lock className="w-3.5 h-3.5" />
                      Complete Stage 0{idx}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: TODAY'S ANALYSIS & FRAMEWORKS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Analysis Card */}
          <div className="lg:col-span-2 bg-white border-2 border-[#001E42] p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#A50044]" />
                <h3 className="font-oswald text-xl font-bold uppercase text-[#001E42]">
                  TODAY'S TACTICAL ANALYSIS
                </h3>
              </div>
              <span className="text-xs font-oswald bg-red-50 text-[#A50044] px-2 py-0.5 border border-red-200 font-bold">
                Intermediate
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-oswald text-[#004D98] font-bold uppercase">
                {MATCH_CASES[0]?.matchTitle} — [{MATCH_CASES[0]?.minuteTimestamp}]
              </span>
              <h4 className="font-oswald text-lg font-bold text-[#121820]">
                {MATCH_CASES[0]?.title}
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {MATCH_CASES[0]?.questionText}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/analyze/lab"
                className="inline-flex items-center gap-2 bg-[#A50044] hover:bg-[#70002E] text-white px-6 py-2.5 text-xs font-oswald uppercase font-bold tracking-wider transition-colors shadow-md"
              >
                Open Analysis Lab ➔
              </Link>
            </div>
          </div>

          {/* Your Frameworks & Skill Radar Summary */}
          <div className="bg-white border-2 border-[#001E42] p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#004D98]" />
                <h3 className="font-oswald text-xl font-bold uppercase text-[#001E42]">
                  SKILL METRICS
                </h3>
              </div>
              <Link
                href="/progress"
                className="text-xs font-oswald text-[#004D98] hover:underline font-bold"
              >
                View Radar ➔
              </Link>
            </div>

            <div className="space-y-3">
              {SKILL_METRICS.slice(0, 4).map((skill) => (
                <div key={skill.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-cairo">
                    <span className="font-bold text-gray-800">{skill.nameAr}</span>
                    <span className="font-oswald font-bold text-[#004D98]">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 border border-gray-300">
                    <div
                      className="h-full bg-[#004D98]"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
