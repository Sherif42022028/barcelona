"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { HeaderScoreboard } from "@/components/HeaderScoreboard";
import { TacticalPitchBoard } from "@/components/TacticalPitchBoard";
import { MATCH_CASES, MatchAnalysisCase } from "@/data/academyData";
import { Activity, CheckCircle2, Play, Award, Sparkles, Brain } from "lucide-react";

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
    <div className="min-h-screen bg-[#F8F6F0] text-[#121820] pb-24 font-cairo">
      <Navbar />
      <HeaderScoreboard />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Title Header */}
        <div className="flex items-center justify-between border-b-4 border-[#A50044] pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-5 h-5 text-[#A50044]" />
              <span className="font-oswald text-xs font-bold text-[#A50044] uppercase tracking-widest">
                ANALYST WORKSPACE
              </span>
            </div>
            <h2 className="font-oswald text-3xl font-bold text-[#001E42] uppercase">
              MATCH ANALYSIS LAB (مختبر تحليل المباريات)
            </h2>
          </div>
          <span className="text-xs text-gray-500 font-sans hidden sm:block">
            تحول من متلقي إلى المحلل التكتيكي واستخرج القرار المناسب للحالة
          </span>
        </div>

        {/* Match Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tactical Pitch Video Simulator */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#001E42] text-white p-4 flex items-center justify-between border-b-2 border-[#EDBB00]">
              <div>
                <span className="text-xs font-oswald text-[#EDBB00] uppercase font-bold block">
                  {selectedCase.phase}
                </span>
                <h3 className="font-oswald text-xl font-bold">
                  {selectedCase.matchTitle} — [{selectedCase.minuteTimestamp}]
                </h3>
              </div>
              <span className="text-xs font-oswald bg-[#A50044] px-2 py-0.5 font-bold">
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
          <div className="bg-white border-2 border-[#001E42] p-6 blaugrana-card-accent shadow-xl space-y-5">
            <div className="border-b border-gray-200 pb-3">
              <span className="font-oswald text-xs font-bold text-[#A50044] uppercase tracking-widest block">
                ANALYSIS TASK
              </span>
              <h4 className="font-oswald text-lg font-bold text-[#001E42] mt-1">
                {selectedCase.title}
              </h4>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed font-cairo">
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
                    className={`w-full p-4 text-right border-2 font-semibold text-xs transition-all flex items-start justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? "bg-blue-50 border-[#004D98] text-[#004D98] ring-2 ring-[#004D98]"
                        : "bg-white border-gray-300 hover:border-[#004D98]"
                    }`}
                  >
                    <span>{opt.text}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#004D98] shrink-0" />}
                  </button>
                );
              })}
            </div>

            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedOptionId}
                className={`w-full py-3 text-xs font-oswald font-bold uppercase tracking-widest transition-colors ${
                  selectedOptionId
                    ? "bg-[#A50044] hover:bg-[#70002E] text-white shadow-md cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Submit Tactical Analysis ➔
              </button>
            ) : (
              <div className="space-y-3 pt-2 border-t border-gray-200">
                <div
                  className={`p-4 border-r-4 text-xs font-cairo ${
                    activeOption?.isCorrect
                      ? "bg-emerald-50 border-emerald-600 text-emerald-950"
                      : "bg-red-50 border-[#A50044] text-red-950"
                  }`}
                >
                  <strong className="block mb-1 text-sm">
                    {activeOption?.isCorrect ? "✓ تحليل تكتيكي دقيق 100%!" : "✕ تحليل يتطلب التعمق الهيكلي"}
                  </strong>
                  <p>{activeOption?.explanation}</p>
                </div>

                {activeOption && (
                  <div className="p-3 bg-gray-50 border border-gray-200 text-xs space-y-1">
                    <span className="font-oswald font-bold text-[#004D98] uppercase block">
                      Competency Metrics Awarded:
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-center font-oswald font-bold">
                      <div className="bg-white p-1 border">Structure: +{activeOption.scoreMetrics.structure}%</div>
                      <div className="bg-white p-1 border">Decision: +{activeOption.scoreMetrics.decision}%</div>
                      <div className="bg-white p-1 border">Comp: +{activeOption.scoreMetrics.comprehension}%</div>
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
