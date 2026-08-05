"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter, notFound } from "next/navigation";
import { HeaderScoreboard } from "@/components/HeaderScoreboard";
import { MODULES_DATA } from "@/data/curriculumData";
import { ArrowRight, Award, CheckCircle2, XCircle, ChevronLeft } from "lucide-react";

interface ExamPageProps {
  params: Promise<{
    moduleId: string;
  }>;
}

export default function ExamPage({ params }: ExamPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const moduleData = MODULES_DATA.find((m) => m.id === resolvedParams.moduleId);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, { optionId: string; isCorrect: boolean }>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  if (!moduleData) {
    notFound();
  }

  const questions = moduleData.examQuestions;
  const currentQuestion = questions[currentQuestionIdx];

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;

    const chosenOption = currentQuestion.options.find((o) => o.id === selectedOptionId);
    const isCorrect = !!chosenOption?.isCorrect;

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: { optionId: selectedOptionId, isCorrect },
    }));

    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    } else {
      // Calculate final score
      const total = questions.length;
      let correctCount = 0;
      Object.values(userAnswers).forEach((ans) => {
        if (ans.isCorrect) correctCount++;
      });
      // Add current question if correct
      const lastQuestion = questions[questions.length - 1];
      const lastChosen = lastQuestion.options.find((o) => o.id === selectedOptionId);
      if (lastChosen?.isCorrect) {
        correctCount++;
      }

      const percentage = Math.round((correctCount / total) * 100);
      router.push(`/result/${moduleData.id}?score=${percentage}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1A1A1A] pb-16">
      <HeaderScoreboard completedCount={0} totalModules={4} masteryPercentage={0} />

      <main className="max-w-4xl mx-auto px-4 pt-6 space-y-8">
        {/* Navigation */}
        <div className="flex items-center justify-between border-b border-gray-300 pb-3">
          <Link
            href={`/challenge/${moduleData.id}`}
            className="inline-flex items-center gap-2 text-xs font-oswald uppercase text-[#004D98] hover:text-[#00366F] font-bold"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للتحدي
          </Link>

          <span className="text-xs font-oswald font-bold text-[#004D98] uppercase tracking-wider flex items-center gap-1">
            <Award className="w-4 h-4 text-[#A50044]" />
            امتحان الوحدة {moduleData.numberStr}
          </span>
        </div>

        {/* Exam Card Container */}
        <section className="bg-white border border-[#1A1A1A]/10 p-6 md:p-8 blaugrana-stripe-top shadow-sm space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div>
              <span className="text-xs font-oswald uppercase text-[#A50044] font-bold">
                السؤال {currentQuestionIdx + 1} من {questions.length}
              </span>
              <h2 className="font-oswald text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                {currentQuestion.questionText}
              </h2>
            </div>
            <div className="scoreboard-num text-3xl text-[#004D98]">
              {String(currentQuestionIdx + 1).padStart(2, "0")}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let btnClass = "bg-white border-gray-300 text-gray-800 hover:border-[#004D98]";

              if (isAnswerSubmitted) {
                if (opt.isCorrect) {
                  btnClass = "bg-emerald-50 border-emerald-600 text-emerald-950 font-bold";
                } else if (isSelected && !opt.isCorrect) {
                  btnClass = "bg-red-50 border-[#A50044] text-red-950 font-bold";
                }
              } else if (isSelected) {
                btnClass = "bg-blue-50 border-[#004D98] text-[#004D98] ring-2 ring-[#004D98]";
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-right p-4 border text-sm transition-all flex items-center justify-between gap-3 ${btnClass}`}
                >
                  <span>{opt.text}</span>
                  {isAnswerSubmitted && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-[#A50044] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Explanation after Submit */}
          {isAnswerSubmitted && (
            <div className="p-4 bg-gray-50 border-r-4 border-[#004D98] text-sm text-gray-800 space-y-1">
              <span className="font-oswald text-xs font-bold uppercase text-[#004D98] block">
                التفسير التكتيكي للمنهجية:
              </span>
              <p>
                {currentQuestion.options.find((o) => o.id === selectedOptionId)?.explanation}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-gray-200 flex justify-end">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOptionId}
                className={`px-8 py-3 font-oswald text-sm uppercase font-bold tracking-widest transition-all ${
                  selectedOptionId
                    ? "bg-[#004D98] hover:bg-[#00366F] text-white shadow-md cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                تأكيد الإجابة
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-2 bg-[#A50044] hover:bg-[#7A0032] text-white px-8 py-3 text-sm font-oswald uppercase font-bold tracking-widest transition-all shadow-md"
              >
                {currentQuestionIdx < questions.length - 1 ? "السؤال التالي" : "عرض النتيجة النهائية"}
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
