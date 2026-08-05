"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeaderScoreboard } from "@/components/HeaderScoreboard";
import { TacticalPitchBoard } from "@/components/TacticalPitchBoard";
import { MODULES_DATA, ChallengeOption } from "@/data/curriculumData";
import { ArrowRight, HelpCircle, CheckCircle2, XCircle, Award, Play } from "lucide-react";

interface ChallengePageProps {
  params: Promise<{
    moduleId: string;
  }>;
}

export default function ChallengePage({ params }: ChallengePageProps) {
  const resolvedParams = use(params);
  const moduleData = MODULES_DATA.find((m) => m.id === resolvedParams.moduleId);

  const [selectedOption, setSelectedOption] = useState<ChallengeOption | null>(null);

  if (!moduleData) {
    notFound();
  }

  const challenge = moduleData.challenge;

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1A1A1A] pb-16">
      <HeaderScoreboard completedCount={0} totalModules={4} masteryPercentage={0} />

      <main className="max-w-5xl mx-auto px-4 pt-6 space-y-8">
        {/* Navigation */}
        <div className="flex items-center justify-between border-b border-gray-300 pb-3">
          <Link
            href={`/lesson/${moduleData.id}`}
            className="inline-flex items-center gap-2 text-xs font-oswald uppercase text-[#004D98] hover:text-[#00366F] font-bold"
          >
            <ArrowRight className="w-4 h-4" />
            العودة لشرح الدرس
          </Link>

          <span className="text-xs font-oswald font-bold text-[#A50044] uppercase tracking-wider">
            التحدي الفوري المباشر
          </span>
        </div>

        {/* Challenge Header Card */}
        <section className="bg-white border border-[#1A1A1A]/10 p-6 blaugrana-stripe-top shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-oswald text-[#004D98] font-bold uppercase tracking-widest">
            <HelpCircle className="w-4 h-4 text-[#A50044]" />
            سيناريو الموقف التكتيكي
          </div>
          <h2 className="font-oswald text-2xl font-bold text-[#1A1A1A]">
            {challenge.title}
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed pt-2 border-t border-gray-100">
            {challenge.scenarioDescription}
          </p>
        </section>

        {/* Interactive Tactical Pitch Board */}
        <section className="space-y-3">
          <TacticalPitchBoard
            players={challenge.pitchState.players}
            ballPosition={challenge.pitchState.ballPosition}
            passLines={
              selectedOption?.isCorrect && selectedOption.targetPlayerId
                ? challenge.pitchState.passLines
                : []
            }
          />
        </section>

        {/* Decision Choices */}
        <section className="space-y-4">
          <h3 className="font-oswald text-lg font-bold text-[#00366F] uppercase tracking-wider">
            اختر القرار التكتيكي الأمثل:
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {challenge.options.map((opt) => {
              const isSelected = selectedOption?.id === opt.id;

              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedOption(opt)}
                  className={`w-full text-right p-5 border text-sm font-semibold transition-all flex items-start justify-between gap-4 ${
                    isSelected
                      ? opt.isCorrect
                        ? "bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-600"
                        : "bg-red-50 border-[#A50044] text-red-950 ring-2 ring-[#A50044]"
                      : "bg-white border-gray-300 text-gray-800 hover:border-[#004D98] hover:bg-blue-50/50"
                  }`}
                >
                  <span>{opt.text}</span>
                  {isSelected && (
                    <span className="shrink-0">
                      {opt.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-[#A50044]" />
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Instant Feedback Explanation Box */}
        {selectedOption && (
          <section
            className={`p-6 border-r-4 shadow-md space-y-2 ${
              selectedOption.isCorrect
                ? "bg-emerald-50 border-emerald-600 text-emerald-900"
                : "bg-red-50 border-[#A50044] text-red-900"
            }`}
          >
            <div className="flex items-center gap-2 font-oswald text-base font-bold uppercase tracking-wider">
              {selectedOption.isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  قرار تكتيكي سليم 100%!
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-[#A50044]" />
                  قرار غير دقيق تكتيكياً
                </>
              )}
            </div>

            <p className="text-sm leading-relaxed">{selectedOption.tacticalExplanation}</p>

            {/* If correct, show next button to Exam */}
            {selectedOption.isCorrect && (
              <div className="pt-4 flex justify-end">
                <Link
                  href={`/exam/${moduleData.id}`}
                  className="inline-flex items-center justify-center gap-2 bg-[#A50044] hover:bg-[#7A0032] text-white px-6 py-3 text-sm font-oswald uppercase font-bold tracking-widest transition-all shadow-md"
                >
                  <Award className="w-4 h-4" />
                  الانتقال للامتحان الشامل للوحدة ➔
                </Link>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
