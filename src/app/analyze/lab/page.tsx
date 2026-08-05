"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { HeaderScoreboard } from "@/components/HeaderScoreboard";
import { TacticalPitchBoard } from "@/components/TacticalPitchBoard";
import { MATCH_CASES, MatchAnalysisCase } from "@/data/academyData";
import { Activity, CheckCircle2 } from "lucide-react";

export default function MatchAnalysisLabPage() {
  const [selectedCase, setSelectedCase] = useState<MatchAnalysisCase>(MATCH_CASES[0]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeOption = selectedCase.options.find((o) => o.id === selectedOptionId);

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen text-[#F8FAFC] pb-24 font-cairo">
      <Navbar />
      <HeaderScoreboard />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Title Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-5 h-5 text-[#E11D48]" />
              <span className="font-oswald text-xs font-bold text-[#E11D48] uppercase tracking-widest">
                ANALYST WORKSPACE
              </span>
            </div>
            <h2 className="font-oswald text-3xl font-bold text-white uppercase">
              MATCH ANALYSIS LAB (مختبر تحليل المباريات)
            </h2>
          </div>
          <span className="text-xs text-[#94A3B8] font-sans hidden sm:block">
            تحول من متلقي إلى المحلل التكتيكي واستخرج القرار المناسب للحالة
          </span>
        </div>

        {/* Match Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tactical Pitch Video Simulator */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-panel p-4 flex items-center justify-between rounded-xl border border-white/10">
              <div>
                <span className="text-xs font-oswald text-[#EDBB00] uppercase font-bold block">
                  {selectedCase.phase}
                </span>
                <h3 className="font-oswald text-xl font-bold text-white">
                  {selectedCase.matchTitle} — [{selectedCase.minuteTimestamp}]
                </h3>
              </div>
              <span className="text-xs font-oswald bg-[#A50044]/30 text-[#E11D48] border border-[#A50044]/40 px-2.5 py-0.5 font-bold rounded-md">
                {selectedCase.difficulty}
              </span>
            </div>

            <TacticalPitchBoard
              players={[
                { id: "cb", role: "CB", x: 35, y: 70, team: "home", label: "CB" },
                { id: "cm", role: "CM", x: 45, y: 45, team: "home", label: "Interior (نزول)", highlighted: true },
                { id: "opp1", role: "ST", x: 40, y: 60, team: "away", label: "ضغط الخصم 1" },
                { id: "opp2", role: "ST", x: 55, y: 60, team: "away", label: "ضغط الخصم 2" }
              ]}
              ballPosition={{ x: 35, y: 70 }}
              passLines={[{ fromX: 35, fromY: 70, toX: 45, toY: 45 }]}
            />
          </div>

          {/* Analysis Task Panel */}
          <div className="glass-card p-6 glass-card-accent shadow-2xl space-y-5">
            <div className="border-b border-white/10 pb-3">
              <span className="font-oswald text-xs font-bold text-[#E11D48] uppercase tracking-widest block">
                ANALYSIS TASK
              </span>
              <h4 className="font-oswald text-lg font-bold text-white mt-1">
                {selectedCase.title}
              </h4>
            </div>

            <p className="text-sm text-[#94A3B8] leading-relaxed font-cairo">
              {selectedCase.questionText}
            </p>

            {/* Decision Options */}
            <div className="space-y-3 pt-2">
              {selectedCase.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => !isSubmitted && setSelectedOptionId(opt.id)}
                    disabled={isSubmitted}
                    className={`w-full p-4 text-right border-2 rounded-xl font-semibold text-xs transition-all flex items-start justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? "bg-[#004D98]/40 border-[#38BDF8] text-white ring-2 ring-[#38BDF8]/40 glow-blue"
                        : "bg-slate-900/60 border-white/10 hover:border-white/30 text-gray-200"
                    }`}
                  >
                    <span>{opt.text}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />}
                  </button>
                );
              })}
            </div>

            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedOptionId}
                className={`w-full py-3.5 rounded-xl text-xs font-oswald font-bold uppercase tracking-widest transition-all ${
                  selectedOptionId
                    ? "bg-gradient-to-r from-[#A50044] to-[#70002E] hover:from-[#70002E] hover:to-[#A50044] text-white shadow-lg cursor-pointer"
                    : "bg-slate-900 text-gray-600 border border-white/5 cursor-not-allowed"
                }`}
              >
                Submit Tactical Analysis ➔
              </button>
            ) : (
              <div className="space-y-3 pt-2 border-t border-white/10">
                <div
                  className={`p-4 rounded-xl border-r-4 text-xs font-cairo ${
                    activeOption?.isCorrect
                      ? "bg-emerald-950/60 border-emerald-500 text-emerald-200"
                      : "bg-red-950/60 border-[#E11D48] text-red-200"
                  }`}
                >
                  <strong className="block mb-1 text-sm">
                    {activeOption?.isCorrect ? "✓ تحليل تكتيكي دقيق 100%!" : "✕ تحليل يتطلب التعمق الهيكلي"}
                  </strong>
                  <p>{activeOption?.explanation}</p>
                </div>

                {activeOption && (
                  <div className="p-3.5 bg-slate-900/80 rounded-xl border border-white/10 text-xs space-y-1.5">
                    <span className="font-oswald font-bold text-[#38BDF8] uppercase block">
                      Competency Metrics Awarded:
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-center font-oswald font-bold text-gray-200">
                      <div className="bg-slate-950 p-1.5 rounded-lg border border-white/5">Structure: +{activeOption.scoreMetrics.structure}%</div>
                      <div className="bg-slate-950 p-1.5 rounded-lg border border-white/5">Decision: +{activeOption.scoreMetrics.decision}%</div>
                      <div className="bg-slate-950 p-1.5 rounded-lg border border-white/5">Comp: +{activeOption.scoreMetrics.comprehension}%</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
