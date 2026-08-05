"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { HeaderScoreboard } from "@/components/HeaderScoreboard";
import { STAGES_DATA, SKILL_METRICS, MATCH_CASES } from "@/data/academyData";
import {
  Play,
  Lock,
  Compass,
  Activity,
  Brain,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function DashboardPage() {
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

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
    <div className="min-h-screen text-[#F8FAFC] pb-24 font-cairo">
      {/* Site Navbar */}
      <Navbar />

      {/* Header Scoreboard */}
      <HeaderScoreboard
        currentStageCode="BUILD"
        stageProgress={68}
        overallProgress={24}
        topSkillName="Decision Making"
        topSkillLevel={72}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-10">
        {/* SECTION 1: CONTINUE YOUR JOURNEY */}
        <section className="glass-card p-6 sm:p-8 glass-card-accent shadow-2xl relative overflow-hidden group">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-[#A50044] to-[#70002E] text-[#EDBB00] px-3 py-1 text-xs font-oswald font-bold tracking-widest uppercase rounded-md border border-[#EDBB00]/30 shadow-md">
                  CONTINUE YOUR JOURNEY
                </span>
                <span className="text-xs font-oswald text-[#38BDF8] font-bold">
                  STAGE 01: BUILD
                </span>
              </div>

              <h2 className="font-oswald text-2xl sm:text-4xl font-bold text-white uppercase leading-tight">
                {activeLesson ? activeLesson.title : "Building from the Back & Positional Play"}
              </h2>

              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {activeLesson ? activeLesson.summary : "تعلم كيفية إنشاء التفوق العددي وتحديد المساحات الحرة من خط البناء الأول."}
              </p>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-xs font-oswald font-bold">
                  <span className="text-[#38BDF8]">Stage Progress:</span>
                  <span className="text-[#E11D48]">68%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-900 rounded-full border border-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#004D98] via-[#38BDF8] to-[#E11D48] w-[68%] transition-all"></div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="shrink-0 w-full lg:w-auto">
              <Link
                href={`/learn/lesson/${activeLesson?.id || "l-1-1"}`}
                className="w-full lg:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#004D98] to-[#002D5E] hover:from-[#002D5E] hover:to-[#004D98] text-white px-8 py-4 rounded-xl text-sm font-oswald uppercase font-bold tracking-wider transition-all shadow-xl hover:shadow-blue-500/20 text-center border border-blue-400/30"
              >
                <Play className="w-4 h-4 fill-white" />
                Continue Lesson ➔
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 2: YOUR LEARNING PATH (4 STAGES) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-oswald text-2xl font-bold uppercase text-white flex items-center gap-3">
              <Compass className="w-6 h-6 text-[#E11D48]" />
              YOUR LEARNING PATH (المسار التعليمي المرحلي)
            </h3>
            <Link
              href="/learn/path"
              className="text-xs font-oswald font-bold text-[#38BDF8] hover:text-white uppercase flex items-center gap-1 transition-colors"
            >
              View Full Path ➔
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STAGES_DATA.map((stage, idx) => (
              <div
                key={stage.id}
                className={`glass-card p-6 flex flex-col justify-between relative transition-all ${
                  stage.unlocked
                    ? "border-[#004D98]/60 shadow-xl"
                    : "opacity-60 bg-slate-950/40 border-white/5"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="scoreboard-number text-3xl text-[#38BDF8]">
                      {stage.numberStr}
                    </span>
                    <span
                      className={`text-xs font-oswald font-bold px-2.5 py-0.5 rounded-md border ${
                        stage.unlocked
                          ? "bg-emerald-950/60 text-emerald-400 border-emerald-500/40"
                          : "bg-slate-900 text-gray-500 border-white/10"
                      }`}
                    >
                      {stage.unlocked ? `${stage.progress}%` : "🔒 Locked"}
                    </span>
                  </div>

                  <h4 className="font-oswald text-xl font-bold text-white">
                    {stage.codeName}
                  </h4>
                  <p className="text-xs font-oswald font-semibold text-[#E11D48]">
                    {stage.title}
                  </p>
                  <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2 pt-1">
                    {stage.question}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10">
                  {stage.unlocked ? (
                    <Link
                      href={`/learn/stage/${stage.id}`}
                      className="block text-center py-2 text-xs font-oswald uppercase font-bold text-white bg-[#004D98]/40 hover:bg-[#004D98] border border-[#004D98] rounded-lg transition-colors"
                    >
                      Enter Stage ➔
                    </Link>
                  ) : (
                    <div className="text-center py-2 text-xs font-oswald text-gray-500 font-semibold flex items-center justify-center gap-1.5 bg-slate-900/60 rounded-lg">
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
          <div className="lg:col-span-2 glass-card p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#E11D48]" />
                <h3 className="font-oswald text-xl font-bold uppercase text-white">
                  TODAY'S TACTICAL ANALYSIS
                </h3>
              </div>
              <span className="text-xs font-oswald bg-[#A50044]/30 text-[#E11D48] px-2.5 py-0.5 border border-[#A50044]/40 font-bold rounded-md">
                Intermediate
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-oswald text-[#38BDF8] font-bold uppercase">
                {MATCH_CASES[0]?.matchTitle} — [{MATCH_CASES[0]?.minuteTimestamp}]
              </span>
              <h4 className="font-oswald text-lg font-bold text-white">
                {MATCH_CASES[0]?.title}
              </h4>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {MATCH_CASES[0]?.questionText}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/analyze/lab"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#A50044] to-[#70002E] hover:from-[#70002E] hover:to-[#A50044] text-white px-6 py-2.5 rounded-xl text-xs font-oswald uppercase font-bold tracking-wider transition-all shadow-lg"
              >
                Open Analysis Lab ➔
              </Link>
            </div>
          </div>

          {/* Your Skill Metrics Summary */}
          <div className="glass-card p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#38BDF8]" />
                <h3 className="font-oswald text-xl font-bold uppercase text-white">
                  SKILL METRICS
                </h3>
              </div>
              <Link
                href="/progress"
                className="text-xs font-oswald text-[#38BDF8] hover:underline font-bold"
              >
                View Radar ➔
              </Link>
            </div>

            <div className="space-y-3.5">
              {SKILL_METRICS.slice(0, 4).map((skill) => (
                <div key={skill.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-cairo">
                    <span className="font-bold text-gray-200">{skill.nameAr}</span>
                    <span className="font-oswald font-bold text-[#38BDF8]">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-[#004D98] to-[#38BDF8]"
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
