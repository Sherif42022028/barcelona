"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { HeaderScoreboard } from "@/components/HeaderScoreboard";
import { TacticalPitchBoard } from "@/components/TacticalPitchBoard";
import { STAGES_DATA, LessonData } from "@/data/academyData";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Play,
  Brain,
  Eye,
  Layers,
  HelpCircle,
  Award,
  Sparkles
} from "lucide-react";

interface LessonPageProps {
  params: Promise<{
    lessonId: string;
  }>;
}

export default function LessonPage({ params }: LessonPageProps) {
  const resolvedParams = use(params);

  let lesson: LessonData | undefined;
  for (const stage of STAGES_DATA) {
    for (const module of stage.modules) {
      const found = module.lessons.find((l) => l.id === resolvedParams.lessonId);
      if (found) {
        lesson = found;
        break;
      }
    }
  }

  if (!lesson) {
    lesson = STAGES_DATA[0].modules[0].lessons[0];
  }

  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasDecided, setHasDecided] = useState(false);

  const steps = lesson.steps;
  const currentStep = steps[currentStepIdx] || steps[0];

  const handleNextStep = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const handleOptionSelect = (optionId: string) => {
    if (hasDecided) return;
    setSelectedOptionId(optionId);
  };

  const handleConfirmDecision = () => {
    if (!selectedOptionId) return;
    setHasDecided(true);
  };

  const getStepIcon = (key: string) => {
    switch (key) {
      case "LEARN": return <Brain className="w-5 h-5 text-[#38BDF8]" />;
      case "SEE": return <Eye className="w-5 h-5 text-emerald-400" />;
      case "DECONSTRUCT": return <Layers className="w-5 h-5 text-[#E11D48]" />;
      case "THINK": return <HelpCircle className="w-5 h-5 text-[#EDBB00]" />;
      case "DECIDE": return <Play className="w-5 h-5 text-[#38BDF8]" />;
      case "FEEDBACK": return <Sparkles className="w-5 h-5 text-[#E11D48]" />;
      case "APPLY": return <Layers className="w-5 h-5 text-emerald-400" />;
      case "ASSESS": return <Award className="w-5 h-5 text-[#EDBB00]" />;
      default: return <Brain className="w-5 h-5 text-[#38BDF8]" />;
    }
  };

  return (
    <div className="min-h-screen text-[#F8FAFC] pb-24 font-cairo">
      <Navbar />
      <HeaderScoreboard />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <Link
            href={`/learn/stage/${lesson.stageId}`}
            className="inline-flex items-center gap-2 text-xs font-oswald text-[#38BDF8] hover:text-white font-bold uppercase transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            Back to Stage Overview
          </Link>

          <span className="text-xs font-oswald font-bold text-[#E11D48] uppercase tracking-widest">
            {lesson.type} Lesson · 8-Step Learning Loop
          </span>
        </div>

        {/* 8-Step Progress Indicator Bar */}
        <section className="glass-card p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-xs font-oswald font-bold">
            <span className="text-white uppercase">
              Step 0{currentStep.stepNumber}: {currentStep.stepKey}
            </span>
            <span className="text-[#E11D48]">
              {Math.round(((currentStepIdx + 1) / steps.length) * 100)}% Completed
            </span>
          </div>

          <div className="grid grid-cols-8 gap-1.5">
            {steps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStepIdx(idx)}
                className={`py-2 rounded-md text-center text-[10px] font-oswald font-bold border transition-all cursor-pointer ${
                  idx === currentStepIdx
                    ? "bg-[#004D98] text-[#EDBB00] border-[#EDBB00] shadow-lg glow-blue"
                    : idx < currentStepIdx
                    ? "bg-emerald-950/60 text-emerald-400 border-emerald-500/40"
                    : "bg-slate-950/60 text-gray-500 border-white/5"
                }`}
              >
                0{s.stepNumber}
              </button>
            ))}
          </div>
        </section>

        {/* Step Main Experience Box */}
        <section className="glass-card p-6 sm:p-8 glass-card-accent shadow-2xl space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="p-3 bg-slate-900 border border-white/10 rounded-xl">
              {getStepIcon(currentStep.stepKey)}
            </div>
            <div>
              <span className="font-oswald text-xs font-bold text-[#E11D48] uppercase tracking-widest block">
                STEP 0{currentStep.stepNumber} — {currentStep.stepKey}
              </span>
              <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-white">
                {currentStep.title}
              </h2>
            </div>
          </div>

          {/* Tactical Pitch Visual */}
          {lesson.pitchScenario && (
            <div className="space-y-2">
              <TacticalPitchBoard
                players={lesson.pitchScenario.players}
                ballPosition={lesson.pitchScenario.ballPosition}
                passLines={lesson.pitchScenario.passLines}
              />
            </div>
          )}

          {/* Step Content */}
          <div className="text-base text-gray-200 leading-relaxed space-y-3 font-cairo">
            <p>{currentStep.content}</p>
          </div>

          {/* Interactive Decision Options */}
          {currentStep.options && currentStep.options.length > 0 && (
            <div className="space-y-4 pt-2">
              <h3 className="font-oswald text-lg font-bold text-[#38BDF8] uppercase">
                اختر القرار التكتيكي الأمثل:
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {currentStep.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionSelect(opt.id)}
                      className={`p-4 text-right border-2 rounded-xl font-semibold text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? "bg-[#004D98]/40 border-[#38BDF8] text-white ring-2 ring-[#38BDF8]/40 glow-blue"
                          : "bg-slate-900/60 border-white/10 hover:border-white/30 text-gray-200"
                      }`}
                    >
                      <span>{opt.text}</span>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-[#38BDF8] shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {!hasDecided ? (
                <button
                  onClick={handleConfirmDecision}
                  disabled={!selectedOptionId}
                  className={`w-full py-3.5 rounded-xl text-sm font-oswald font-bold uppercase tracking-widest transition-all ${
                    selectedOptionId
                      ? "bg-gradient-to-r from-[#004D98] to-[#002D5E] hover:from-[#002D5E] hover:to-[#004D98] text-white shadow-lg cursor-pointer border border-blue-400/30"
                      : "bg-slate-900 text-gray-600 border border-white/5 cursor-not-allowed"
                  }`}
                >
                  Confirm Tactical Decision ➔
                </button>
              ) : (
                <div
                  className={`p-4 rounded-xl border-r-4 text-sm font-cairo ${
                    currentStep.options.find((o) => o.id === selectedOptionId)?.isCorrect
                      ? "bg-emerald-950/60 border-emerald-500 text-emerald-200"
                      : "bg-red-950/60 border-[#E11D48] text-red-200"
                  }`}
                >
                  <p className="font-bold mb-1">
                    {currentStep.options.find((o) => o.id === selectedOptionId)?.isCorrect
                      ? "✓ قرار تكتيكي ممتاز 100%!"
                      : "✕ قرار يتطلب التعديل الهيكلي"}
                  </p>
                  <p>{currentStep.options.find((o) => o.id === selectedOptionId)?.feedback}</p>
                </div>
              )}
            </div>
          )}

          {/* Stepper Footer Controls */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIdx === 0}
              className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-oswald font-bold uppercase transition-colors ${
                currentStepIdx === 0
                  ? "bg-slate-900 text-gray-600 border border-white/5 cursor-not-allowed"
                  : "bg-slate-900 border border-white/10 text-gray-200 hover:bg-slate-800 cursor-pointer"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
              Previous Step
            </button>

            <button
              onClick={handleNextStep}
              disabled={currentStepIdx === steps.length - 1}
              className={`inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-xs font-oswald font-bold uppercase transition-all ${
                currentStepIdx === steps.length - 1
                  ? "bg-emerald-800 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-[#004D98] to-[#002D5E] hover:from-[#002D5E] hover:to-[#004D98] text-white cursor-pointer shadow-lg border border-blue-400/30"
              }`}
            >
              Next Step
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
