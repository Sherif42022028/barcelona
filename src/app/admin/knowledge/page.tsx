"use client";

import React, { useState } from "react";
import Link from "next/link";
import { domainService } from "@/lib/domain/service";
import { KnowledgeObject } from "@/lib/domain/types";
import { EvidenceViewer } from "@/components/domain/EvidenceViewer";
import { Brain, CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Search } from "lucide-react";

export default function AdminKnowledgePage() {
  const [knowledgeList, setKnowledgeList] = useState(domainService.getKnowledgeList());
  const [selectedKnId, setSelectedKnId] = useState<string>(knowledgeList[0]?.id || "");

  const selectedKn = knowledgeList.find((k) => k.id === selectedKnId) || knowledgeList[0];
  const usages = selectedKn ? domainService.getKnowledgeUsages(selectedKn.id) : null;

  const handleApprove = (id: string) => {
    setKnowledgeList((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: "APPROVED" as const } : k))
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-[#EDBB00]" />
            <span className="text-xs font-oswald text-[#EDBB00] font-bold uppercase tracking-widest px-3 py-1 bg-[#004D98]/30 rounded-full border border-[#EDBB00]/30">
              KNOWLEDGE BASE & REVIEW QUEUE
            </span>
          </div>
          <Link href="/admin" className="text-xs font-cairo text-[#38BDF8] hover:underline">
            ← العودة للأدمن
          </Link>
        </div>
        <h1 className="font-oswald text-2xl sm:text-4xl font-bold text-white tracking-wide">
          مكتبة المعرفة وتدقيق التوثيق
        </h1>
        <p className="text-sm font-cairo text-slate-300 max-w-3xl">
          اعتماد كائنات المعرفة، مراجعة الأدلة المنهجية، وحماية المنهج من الاعتمادات العشوائية.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Knowledge List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="font-oswald text-xs text-slate-300 uppercase tracking-wider">
            KNOWLEDGE OBJECTS ({knowledgeList.length})
          </div>

          <div className="space-y-2">
            {knowledgeList.map((kn) => {
              const isSelected = kn.id === selectedKnId;
              const isUnresolved = kn.type === "UNRESOLVED_MODEL";

              return (
                <button
                  key={kn.id}
                  onClick={() => setSelectedKnId(kn.id)}
                  className={`w-full text-right p-4 rounded-xl border text-xs font-cairo transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#004D98]/40 border-[#38BDF8] text-white shadow-lg"
                      : "bg-slate-900/60 border-white/10 text-slate-300 hover:bg-white/5"
                  } ${isUnresolved ? "border-amber-500/40" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white truncate max-w-[200px]">
                      {kn.title}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                        kn.status === "APPROVED"
                          ? "bg-emerald-950 text-emerald-400 border-emerald-500/30"
                          : "bg-amber-950 text-amber-300 border-amber-500/30"
                      }`}
                    >
                      {kn.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span className="font-mono text-[#38BDF8]">{kn.type}</span>
                    <span>Confidence: {Math.round(kn.confidence * 100)}%</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Knowledge Details & Usage Graph */}
        <div className="lg:col-span-7 space-y-4">
          {selectedKn && (
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-5 text-xs font-cairo">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#38BDF8]">
                    TYPE: {selectedKn.type}
                  </span>
                  <h2 className="font-oswald text-2xl font-bold text-white">
                    {selectedKn.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  {selectedKn.status !== "APPROVED" ? (
                    <button
                      onClick={() => handleApprove(selectedKn.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-oswald text-xs font-bold uppercase transition-all shadow-lg cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      APPROVE KNOWLEDGE
                    </button>
                  ) : (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-oswald font-bold uppercase">
                      <CheckCircle2 className="w-4 h-4" />
                      APPROVED
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-oswald text-xs font-bold text-slate-300 uppercase tracking-wider">
                  DEFINITION & SCOPE
                </h3>
                <p className="text-slate-200 leading-relaxed bg-black/40 p-4 rounded-xl border border-white/5">
                  {selectedKn.definition}
                </p>
              </div>

              {/* Source Evidence Traceability */}
              <div className="space-y-2">
                <EvidenceViewer evidences={selectedKn.sourceEvidences} />
              </div>

              {/* Reverse Usage Lookup Graph */}
              {usages && (
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <h3 className="font-oswald text-xs font-bold text-slate-300 uppercase tracking-wider">
                    REVERSE USAGE GRAPH (أين يُستخدم هذا العنصر؟)
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                      <span className="text-slate-400 block text-[10px]">Used in Modules:</span>
                      <span className="font-bold text-white text-sm">{usages.modules.length} Modules</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                      <span className="text-slate-400 block text-[10px]">Used in Lessons:</span>
                      <span className="font-bold text-white text-sm">{usages.lessons.length} Lessons</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                      <span className="text-slate-400 block text-[10px]">Used in Scenarios:</span>
                      <span className="font-bold text-white text-sm">{usages.scenarios.length} Scenarios</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                      <span className="text-slate-400 block text-[10px]">Used in Questions:</span>
                      <span className="font-bold text-white text-sm">{usages.questions.length} Questions</span>
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
