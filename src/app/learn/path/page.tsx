"use client";

import React from "react";
import Link from "next/link";
import { domainService } from "@/lib/domain/service";
import { Compass, CheckCircle2, Lock, ArrowLeft, Shield, BookOpen, Activity, ChevronLeft } from "lucide-react";

export default function AcademyLearningPathPage() {
  const stages = domainService.getStages();
  const progress = domainService.getStudentProgress();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3">
        <span className="text-xs font-oswald text-[#EDBB00] font-bold uppercase tracking-widest px-3 py-1 bg-[#004D98]/30 rounded-full border border-[#EDBB00]/30">
          BARÇA ACADEMY CURRICULUM
        </span>
        <h1 className="font-oswald text-2xl sm:text-4xl font-bold text-white tracking-wide">
          مسار التعلم والتأهيل التكتيكي المنهجي
        </h1>
        <p className="text-sm font-cairo text-slate-300 max-w-3xl">
          أربعة مراحل تعليمية متكاملة مصممة من الوثائق الرسمية للعب الموضعي: من بناء اللعب حتى التكتيك والتحليل والتطبيق الميداني.
        </p>
      </div>

      {/* 4 Stages Tree */}
      <div className="space-y-8">
        {stages.map((stage) => {
          const modules = domainService.getModules(stage.id);
          const isCompleted = modules.every((m) => progress.completedModuleIds.includes(m.id));

          return (
            <div
              key={stage.id}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 relative overflow-hidden"
            >
              {/* Top Blaugrana Accent Line */}
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#004D98] via-[#EDBB00] to-[#A50044]"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#004D98]/40 text-[#38BDF8] border border-[#004D98]">
                      STAGE 0{stage.stageNumber}
                    </span>
                    <h2 className="font-oswald text-2xl font-bold text-white">
                      {stage.title}
                    </h2>
                  </div>
                  <p className="text-xs font-cairo text-slate-300">
                    {stage.subtitle} — {stage.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {isCompleted ? (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-cairo font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      مكتمل بالكامل
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-cairo">
                      {modules.length} الموديولات التكتيكية
                    </span>
                  )}
                </div>
              </div>

              {/* Modules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modules.map((module) => {
                  const modCompleted = progress.completedModuleIds.includes(module.id);
                  const firstLesson = domainService.getLessons(module.id)[0];

                  return (
                    <div
                      key={module.id}
                      className={`p-5 rounded-2xl border text-right space-y-3 transition-all flex flex-col justify-between ${
                        modCompleted
                          ? "bg-emerald-950/20 border-emerald-500/40"
                          : "bg-slate-900/60 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-slate-300">
                          MOD {module.numberStr}
                        </span>
                        <span className="text-xs font-cairo text-[#38BDF8] font-bold">
                          {module.positionRole}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-oswald text-lg font-bold text-white">
                          {module.title}
                        </h3>
                        <p className="text-xs font-cairo text-slate-300 line-clamp-2">
                          {module.subtitle}
                        </p>
                      </div>

                      {/* Objectives Pills */}
                      <div className="space-y-1 pt-2 border-t border-white/5">
                        {module.learningObjectives.map((obj) => (
                          <div key={obj.id} className="text-[11px] font-cairo text-slate-400 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span className="truncate">{obj.statement}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div className="pt-2 flex items-center justify-between gap-2">
                        {firstLesson ? (
                          <Link
                            href={`/lesson/${firstLesson.id}`}
                            className="w-full text-center py-2 rounded-xl bg-gradient-to-r from-[#004D98] to-[#A50044] hover:from-[#A50044] hover:to-[#004D98] text-white font-oswald text-xs font-bold uppercase tracking-wider transition-all border border-[#EDBB00]/30 shadow-lg"
                          >
                            ابدأ الموديول الان
                          </Link>
                        ) : (
                          <span className="text-xs font-cairo text-slate-400">قيد الإعداد</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
