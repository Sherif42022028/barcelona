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
  XCircle,
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

  // Search across all stages and modules for target lesson
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
    // Fallback to first lesson
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
      case "LEARN": return <Brain className="w-5 h-5 text-[#004D98]" />;
      case "SEE": return <Eye className="w-5 h-5 text-emerald-600" />;
      case "DECONSTRUCT": return <Layers className="w-5 h-5 text-[#A50044]" />;
      case "THINK": return <HelpCircle className="w-5 h-5 text-[#EDBB00]" />;
      case "DECIDE": return <Play className="w-5 h-5 text-[#004D98]" />;
      case "FEEDBACK": return <Sparkles className="w-5 h-5 text-[#A50044]" />;
      case "APPLY": return <Layers className="w-5 h-5 text-emerald-600" />;
      case "ASSESS": return <Award className="w-5 h-5 text-[#EDBB00]" />;
      default: return <Brain className="w-5 h-5 text-[#004D98]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#121820] pb-24 font-cairo">
      <Navbar />
      <HeaderScoreboard />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between border-b border-gray-300 pb-3">
          <Link
            href={`/learn/stage/${lesson.stageId}`}
            className="inline-flex items-center gap-2 text-xs font-oswald text-[#004D98] hover:text-[#002D5E] font-bold uppercase"
          >
            <ArrowRight className="w-4 h-4" />
            Back to Stage Overview
          </Link>

          <span className="text-xs font-oswald font-bold text-[#A50044] uppercase tracking-widest">
            {lesson.type} Lesson · 8-Step Learning Loop
          </span>
        </div>

        {/* 8-Step Progress Indicator Bar */}
        <section className="bg-white border-2 border-[#001E42] p-4 shadow-md space-y-3">
          <div className="flex items-center justify-between text-xs font-oswald font-bold">
            <span className="text-[#001E42] uppercase">
              Step 0{currentStep.stepNumber}: {currentStep.stepKey}
            </span>
            <span className="text-[#A50044]">
              {Math.round(((currentStepIdx + 1) / steps.length) * 100)}% Completed
            </span>
          </div>

          <div className="grid grid-cols-8 gap-1.5">
            {steps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStepIdx(idx)}
                className={`py-1.5 text-center text-[10px] font-oswald font-bold border transition-all cursor-pointer ${
                  idx === currentStepIdx
                    ? "bg-[#004D98] text-[#EDBB00] border-[#EDBB00] ring-2 ring-[#004D98]"
                    : idx < currentStepIdx
                    ? "bg-emerald-100 text-emerald-800 border-emerald-400"
                    : "bg-gray-100 text-gray-500 border-gray-300"
                }`}
              >
                0{s.stepNumber}
              </button>
            ))}
          </div>
        </section>

        {/* Step Main Experience Box */}
        <section className="bg-white border-2 border-[#001E42] p-6 sm:p-8 blaugrana-card-accent shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
            <div className="p-3 bg-[#F8F6F0] border border-gray-300">
              {getStepIcon(currentStep.stepKey)}
            </div>
            <div>
              <span className="font-oswald text-xs font-bold text-[#A50044] uppercase tracking-widest block">
                STEP 0{currentStep.stepNumber} — {currentStep.stepKey}
              </span>
              <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-[#001E42]">
                {currentStep.title}
              </h2>
            </div>
          </div>

          {/* Tactical Pitch Visual (if available on lesson) */}
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
          <div className="text-base text-gray-800 leading-relaxed space-y-3 font-cairo">
            <p>{currentStep.content}</p>
          </div>

          {/* Interactive Decision Options (Step 5: DECIDE) */}
          {currentStep.options && currentStep.options.length > 0 && (
            <div className="space-y-4 pt-2">
              <h3 className="font-oswald text-lg font-bold text-[#004D98] uppercase">
                اختر القرار التكتيكي الأمثل:
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {currentStep.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionSelect(opt.id)}
                      className={`p-4 text-right border-2 font-semibold text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? "bg-blue-50 border-[#004D98] text-[#004D98] ring-2 ring-[#004D98]"
                          : "bg-white border-gray-300 hover:border-[#004D98]"
                      }`}
                    >
                      <span>{opt.text}</span>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-[#004D98] shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {!hasDecided ? (
                <button
                  onClick={handleConfirmDecision}
                  disabled={!selectedOptionId}
                  className={`w-full py-3 text-sm font-oswald font-bold uppercase tracking-widest transition-colors ${
                    selectedOptionId
                      ? "bg-[#004D98] hover:bg-[#002D5E] text-white shadow-md cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Confirm Tactical Decision ➔
                </button>
              ) : (
                <div
                  className={`p-4 border-r-4 text-sm font-cairo ${
                    currentStep.options.find((o) => o.id === selectedOptionId)?.isCorrect
                      ? "bg-emerald-50 border-emerald-600 text-emerald-950"
                      : "bg-red-50 border-[#A50044] text-red-950"
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
          <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIdx === 0}
              className={`inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-oswald font-bold uppercase transition-colors ${
                currentStepIdx === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
              Previous Step
            </button>

            <button
              onClick={handleNextStep}
              disabled={currentStepIdx === steps.length - 1}
              className={`inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-oswald font-bold uppercase transition-colors ${
                currentStepIdx === steps.length - 1
                  ? "bg-emerald-700 text-white cursor-not-allowed"
                  : "bg-[#004D98] hover:bg-[#002D5E] text-white cursor-pointer shadow-md"
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
