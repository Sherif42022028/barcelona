"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { domainService } from "@/lib/domain/service";
import {
  Compass,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Brain,
  Shield,
  Activity,
  Award,
  Zap,
  ChevronLeft
} from "lucide-react";

export default function StudentDashboardPage() {
  const [progress, setProgress] = useState(domainService.getStudentProgress());
  const [mastery, setMastery] = useState(domainService.getKnowledgeMastery());
  const [recommendations, setRecommendations] = useState(domainService.getRecommendations());

  const stages = domainService.getStages();
  const currentStage = stages[0]; // Stage 01 - Building from the Back
  const currentModules = domainService.getModules(currentStage.id);
  const nextModule = currentModules.find((m) => !progress.completedModuleIds.includes(m.id)) || currentModules[0];
  const nextLesson = domainService.getLessons(nextModule.id)[0];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Academy Welcome Banner */}
      <div className="relative glass-card p-6 sm:p-8 rounded-3xl border border-white/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#004D98]/20 via-[#A50044]/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-oswald uppercase tracking-widest text-[#EDBB00] font-bold px-3 py-1 bg-[#004D98]/30 rounded-full border border-[#EDBB00]/30">
                BARÇA METHODOLOGY ACADEMY
              </span>
              <h1 className="font-oswald text-2xl sm:text-4xl font-bold text-white tracking-wide mt-2">
                مرحباً بك في أكاديمية التحليل والمنهجية التكتيكية
              </h1>
              <p className="text-sm font-cairo text-slate-300 max-w-2xl mt-1">
                نظام تعلّمي موجه لفهم وتطبيق أصول اللعب الموضعي (Positional Play) وبناء اللعب من الخلف عبر التحليل التكتيكي الميداني.
              </p>
            </div>

            {/* Admin Portal Toggle Link */}
            <Link
              href="/admin"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-xs font-oswald text-[#38BDF8] hover:text-white transition-all shadow-lg"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>ADMIN CMS PORTAL</span>
            </Link>
          </div>

          {/* Primary Action Banner: Continue Learning */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-black/30 p-5 rounded-2xl border border-white/5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-oswald text-[#38BDF8]">
                <Zap className="w-4 h-4 text-[#F59E0B]" />
                <span>RECOMMENDED NEXT STEP (الخطوة التالية الموصى بها)</span>
              </div>
              <h2 className="font-oswald text-lg font-bold text-white">
                {nextModule.title}
              </h2>
              <p className="text-xs font-cairo text-slate-300">
                {nextModule.subtitle} — {nextModule.description}
              </p>
            </div>

            <Link
              href={`/lesson/${nextLesson.id}`}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#004D98] to-[#A50044] hover:from-[#A50044] hover:to-[#004D98] text-white font-oswald font-bold text-xs uppercase tracking-wider border border-[#EDBB00]/40 shadow-xl transition-all shrink-0"
            >
              <span>CONTINUE LESSON</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Grid: Current Stage Progress + Evidence-Based Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Current Stage Overview */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-oswald text-[#38BDF8] font-bold">
                  STAGE 0{currentStage.stageNumber} OF 04
                </span>
                <h2 className="font-oswald text-xl font-bold text-white">
                  {currentStage.title}
                </h2>
              </div>
              <Link
                href="/learn/path"
                className="text-xs font-cairo text-[#EDBB00] hover:underline flex items-center gap-1"
              >
                <span>عرض مسار التعلم الكامل</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Stage Modules List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentModules.map((module) => {
                const isCompleted = progress.completedModuleIds.includes(module.id);
                const isNext = module.id === nextModule.id;

                return (
                  <Link
                    key={module.id}
                    href={`/learn/module/${module.id}`}
                    className={`glass-card p-4 rounded-xl border text-right transition-all flex flex-col justify-between gap-3 ${
                      isCompleted
                        ? "border-emerald-500/40 bg-emerald-950/20"
                        : isNext
                        ? "border-[#004D98] bg-[#004D98]/20 shadow-lg shadow-[#004D98]/20"
                        : "border-white/10 bg-slate-900/60 opacity-80"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-slate-300">
                        MOD {module.numberStr}
                      </span>
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <span className="text-[10px] font-cairo text-slate-400">
                          {module.positionRole}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-oswald text-sm font-bold text-white">
                        {module.title}
                      </h3>
                      <p className="text-xs font-cairo text-slate-300 line-clamp-2 mt-1">
                        {module.subtitle}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-cairo text-slate-400">
                      <span>{module.lessonIds.length} دروس تعليمية</span>
                      <span className="text-[#38BDF8]">عرض الموديول ←</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Analysis & Frameworks Quick Access */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/analyze/lab"
              className="glass-card p-5 rounded-xl border border-white/10 hover:border-[#A50044]/50 transition-all space-y-2 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#A50044]/30 text-[#A50044] border border-[#A50044]/40">
                  <Activity className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-oswald text-base font-bold text-white group-hover:text-red-400 transition-colors">
                    MATCH ANALYSIS LAB
                  </h3>
                  <p className="text-xs font-cairo text-slate-400">
                    مختبر التحليل التكتيكي لللقطات الميدانية
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/frameworks"
              className="glass-card p-5 rounded-xl border border-white/10 hover:border-[#004D98]/50 transition-all space-y-2 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#004D98]/30 text-[#004D98] border border-[#004D98]/40">
                  <Brain className="w-5 h-5 text-[#38BDF8]" />
                </div>
                <div>
                  <h3 className="font-oswald text-base font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                    METHODOLOGY FRAMEWORKS
                  </h3>
                  <p className="text-xs font-cairo text-slate-400">
                    مكتبة النماذج التكتيكية والأطر المنهجية
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Sidebar: Knowledge Mastery & Evidence-Based Recommendations */}
        <div className="lg:col-span-4 space-y-6">
          {/* Evidence-Based Recommendations */}
          <div className="glass-card p-5 rounded-2xl border border-[#F59E0B]/30 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
              <h2 className="font-oswald text-sm font-bold text-white uppercase tracking-wider">
                PERSONALIZED RECOMMENDATIONS
              </h2>
            </div>

            <div className="space-y-3">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 space-y-2 text-xs font-cairo"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#F59E0B] font-bold uppercase">
                    <span>{rec.type}</span>
                    <span>{rec.priority} PRIORITY</span>
                  </div>
                  <h3 className="font-bold text-white">{rec.title}</h3>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {rec.reason}
                  </p>
                  <Link
                    href={`/lesson/${rec.targetId}`}
                    className="block text-center py-1.5 rounded bg-white/10 hover:bg-white/20 text-white font-oswald text-[11px] font-bold uppercase transition-colors mt-1"
                  >
                    START REVIEW
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Knowledge Mastery Overview */}
          <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <h2 className="font-oswald text-sm font-bold text-white uppercase tracking-wider">
                  KNOWLEDGE MASTERY
                </h2>
              </div>
              <Link href="/progress" className="text-[11px] text-[#38BDF8] font-cairo hover:underline">
                التفاصيل ←
              </Link>
            </div>

            <div className="space-y-3 font-cairo text-xs">
              {mastery.map((item) => (
                <div key={item.knowledgeId} className="space-y-1">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="truncate max-w-[180px]">{item.knowledgeTitle}</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {item.scorePercentage}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                    <div
                      style={{ width: `${item.scorePercentage}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.scorePercentage >= 80
                          ? "bg-emerald-400"
                          : item.scorePercentage >= 60
                          ? "bg-amber-400"
                          : "bg-rose-500"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
