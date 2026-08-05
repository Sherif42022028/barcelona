"use client";

import React, { useState } from "react";
import Link from "next/link";
import { domainService } from "@/lib/domain/service";
import { Assessment } from "@/lib/domain/types";
import { Award, ShieldCheck, CheckCircle2, AlertCircle, Plus } from "lucide-react";

export default function AdminAssessmentsPage() {
  const assessments = domainService.getAssessments();
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string>(
    assessments[0]?.id || ""
  );

  const selectedAssessment =
    assessments.find((a) => a.id === selectedAssessmentId) || assessments[0];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-oswald text-[#EDBB00] font-bold uppercase tracking-widest px-3 py-1 bg-[#004D98]/30 rounded-full border border-[#EDBB00]/30">
              ASSESSMENT & BLUEPRINT BUILDER
            </span>
          </div>
          <Link href="/admin" className="text-xs font-cairo text-[#38BDF8] hover:underline">
            ← العودة للأدمن
          </Link>
        </div>
        <h1 className="font-oswald text-2xl sm:text-4xl font-bold text-white tracking-wide">
          بناء الامتحانات ومخططات القياس (Blueprints)
        </h1>
        <p className="text-sm font-cairo text-slate-300 max-w-3xl">
          إدارة امتحانات الموديولات والمراحل المكتملة، وتحديد ميزان توزيع المستويات المعرفية (Cognitive Taxonomy).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Assessment List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="font-oswald text-xs text-slate-300 uppercase tracking-wider">
            CONFIGURED ASSESSMENTS ({assessments.length})
          </div>

          <div className="space-y-2">
            {assessments.map((ass) => {
              const isSelected = ass.id === selectedAssessmentId;

              return (
                <button
                  key={ass.id}
                  onClick={() => setSelectedAssessmentId(ass.id)}
                  className={`w-full text-right p-4 rounded-xl border text-xs font-cairo transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#004D98]/40 border-[#38BDF8] text-white shadow-lg"
                      : "bg-slate-900/60 border-white/10 text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white truncate max-w-[200px]">
                      {ass.title}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono text-[10px] border border-emerald-500/30">
                      {ass.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span>Duration: {ass.durationMinutes} mins</span>
                    <span>Passing: {ass.passingScorePercentage}%</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Assessment Details & Blueprint Validation */}
        <div className="lg:col-span-7 space-y-4">
          {selectedAssessment && (
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-5 text-xs font-cairo">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-[#38BDF8]">
                    TYPE: {selectedAssessment.type}
                  </span>
                  <h2 className="font-oswald text-xl font-bold text-white">
                    {selectedAssessment.title}
                  </h2>
                </div>
                <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                  {selectedAssessment.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Duration:</span>
                  <span className="font-bold text-white font-mono">{selectedAssessment.durationMinutes} minutes</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Passing Score:</span>
                  <span className="font-bold text-emerald-400 font-mono">{selectedAssessment.passingScorePercentage}%</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Max Attempts:</span>
                  <span className="font-bold text-white font-mono">{selectedAssessment.maxAttempts} attempts</span>
                </div>
              </div>

              {/* Assessment Blueprint Distribution */}
              {selectedAssessment.blueprint && (
                <div className="pt-3 border-t border-white/10 space-y-3">
                  <h3 className="font-oswald text-xs font-bold text-slate-300 uppercase tracking-wider">
                    COGNITIVE BLUEPRINT TAXONOMY DISTRIBUTION
                  </h3>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex justify-between">
                      <span className="text-slate-400">RECALL:</span>
                      <span className="font-bold text-white">{selectedAssessment.blueprint.cognitiveDistribution.RECALL}%</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex justify-between">
                      <span className="text-slate-400">UNDERSTAND:</span>
                      <span className="font-bold text-white">{selectedAssessment.blueprint.cognitiveDistribution.UNDERSTAND}%</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex justify-between">
                      <span className="text-slate-400">APPLY:</span>
                      <span className="font-bold text-white">{selectedAssessment.blueprint.cognitiveDistribution.APPLY}%</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex justify-between">
                      <span className="text-slate-400">ANALYZE:</span>
                      <span className="font-bold text-white">{selectedAssessment.blueprint.cognitiveDistribution.ANALYZE}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
