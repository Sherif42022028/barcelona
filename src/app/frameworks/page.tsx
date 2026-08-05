"use client";

import React from "react";
import Link from "next/link";
import { domainService } from "@/lib/domain/service";
import { EvidenceViewer } from "@/components/domain/EvidenceViewer";
import { Brain, FileText, CheckCircle2, Bookmark, ExternalLink } from "lucide-react";

export default function FrameworksPage() {
  const knowledgeList = domainService.getKnowledgeList();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-[#38BDF8]" />
          <span className="text-xs font-oswald text-[#EDBB00] font-bold uppercase tracking-widest px-3 py-1 bg-[#004D98]/30 rounded-full border border-[#EDBB00]/30">
            CROSS-CUTTING METHODOLOGY KNOWLEDGE
          </span>
        </div>
        <h1 className="font-oswald text-2xl sm:text-4xl font-bold text-white tracking-wide">
          الأطر المنهجية والنماذج التكتيكية لبرشلونة
        </h1>
        <p className="text-sm font-cairo text-slate-300 max-w-3xl">
          مكتبة المفاهيم والنماذج الموثوقة المستخرجة مباشرة من الوثائق والمطبوعات المنهجية الرسمية.
        </p>
      </div>

      {/* Framework Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {knowledgeList.map((kn) => {
          const usages = domainService.getKnowledgeUsages(kn.id);
          const isUnresolved = kn.type === "UNRESOLVED_MODEL";

          return (
            <div
              key={kn.id}
              className={`glass-card p-6 rounded-2xl border space-y-4 text-right transition-all ${
                isUnresolved
                  ? "border-amber-500/40 bg-amber-950/20"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                <span
                  className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border uppercase ${
                    isUnresolved
                      ? "bg-amber-950/80 border-amber-500 text-amber-300"
                      : "bg-[#004D98]/40 border-[#004D98] text-[#38BDF8]"
                  }`}
                >
                  {kn.type}
                </span>

                <span className="text-[10px] font-cairo text-slate-400">
                  Confidence: {Math.round(kn.confidence * 100)}%
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="font-oswald text-xl font-bold text-white">
                  {kn.title}
                </h2>
                <p className="text-xs font-cairo text-slate-300 leading-relaxed">
                  {kn.definition}
                </p>
              </div>

              {/* Usage Breakdown */}
              <div className="pt-3 border-t border-white/5 space-y-1.5 font-cairo text-xs text-slate-400">
                <div className="font-bold text-slate-300">مواضع الاستخدام في المنظومة:</div>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                    {usages.modules.length} Modules
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                    {usages.lessons.length} Lessons
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                    {usages.scenarios.length} Scenarios
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                    {usages.questions.length} Questions
                  </span>
                </div>
              </div>

              {/* Source Evidence */}
              {kn.sourceEvidences.length > 0 && (
                <div className="pt-2">
                  <EvidenceViewer evidences={kn.sourceEvidences} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
