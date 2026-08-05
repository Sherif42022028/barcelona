"use client";

import React, { useState } from "react";
import Link from "next/link";
import { domainService } from "@/lib/domain/service";
import {
  TrendingUp,
  Award,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Brain,
  ShieldCheck,
  ChevronLeft
} from "lucide-react";

export default function StudentProgressPage() {
  const progress = domainService.getStudentProgress();
  const mastery = domainService.getKnowledgeMastery();
  const recommendations = domainService.getRecommendations();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-oswald text-[#EDBB00] font-bold uppercase tracking-widest px-3 py-1 bg-[#004D98]/30 rounded-full border border-[#EDBB00]/30">
            EVIDENCE-BASED LEARNER PROGRESS & MASTERY
          </span>
        </div>
        <h1 className="font-oswald text-2xl sm:text-4xl font-bold text-white tracking-wide">
          تقرير التقدم الأكاديمي والتمكن التكتيكي
        </h1>
        <p className="text-sm font-cairo text-slate-300 max-w-3xl">
          فصل دقيق بين نسبة إتمام الدروس (Progress) ومستوى إتقان المعرفة والقرارات التكتيكية (Mastery).
        </p>
      </div>

      {/* Grid: Progress vs Mastery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Progress Overview */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <BookOpen className="w-4 h-4 text-[#38BDF8]" />
              <h2 className="font-oswald text-lg font-bold text-white">
                CONTENT COMPLETION (نسبة الإتمام)
              </h2>
            </div>

            <div className="space-y-4 font-cairo">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
                <span className="text-sm text-slate-300">دروس مكتملة</span>
                <span className="font-mono text-lg text-emerald-400 font-bold">
                  {progress.completedLessonIds.length} lessons
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
                <span className="text-sm text-slate-300">موديولات مكتملة</span>
                <span className="font-mono text-lg text-[#38BDF8] font-bold">
                  {progress.completedModuleIds.length} modules
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
                <span className="text-sm text-slate-300">ملاحظات التقييم</span>
                <span className="font-mono text-lg text-[#F59E0B] font-bold">
                  {progress.assessmentHistory.length} attempts
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mastery Breakdown */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Brain className="w-4 h-4 text-[#EDBB00]" />
              <h2 className="font-oswald text-lg font-bold text-white">
                KNOWLEDGE MASTERY (مستوى التمكن)
              </h2>
            </div>

            <div className="space-y-4 font-cairo">
              {mastery.map((item) => (
                <div
                  key={item.knowledgeId}
                  className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">
                      {item.knowledgeTitle}
                    </span>
                    <span
                      className={`font-mono text-sm font-bold ${
                        item.scorePercentage >= 80
                          ? "text-emerald-400"
                          : item.scorePercentage >= 60
                          ? "text-amber-400"
                          : "text-rose-400"
                      }`}
                    >
                      {item.scorePercentage}%
                    </span>
                  </div>

                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
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

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Evidence Count: {item.evidenceCount}</span>
                    <span>Confidence: {Math.round(item.confidence * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Box */}
      <div className="glass-card p-6 rounded-2xl border border-[#F59E0B]/30 space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
          <h2 className="font-oswald text-lg font-bold text-white">
            EVIDENCE-BASED PERSONALIZED RECOMMENDATIONS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-2 text-xs font-cairo"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#F59E0B] font-bold">
                <span>{rec.type}</span>
                <span>{rec.priority} PRIORITY</span>
              </div>
              <h3 className="font-bold text-sm text-white">{rec.title}</h3>
              <p className="text-slate-300 leading-relaxed">{rec.reason}</p>
              <Link
                href={`/lesson/${rec.targetId}`}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-oswald text-xs font-bold uppercase transition-colors mt-2"
              >
                <span>EXECUTE REVIEW</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
