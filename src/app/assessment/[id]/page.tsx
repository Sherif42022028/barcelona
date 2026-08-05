"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { domainService } from "@/lib/domain/service";
import { AssessmentAttempt, StudentAnswer } from "@/lib/domain/types";
import { EvidenceViewer } from "@/components/domain/EvidenceViewer";
import { Award, Clock, CheckCircle2, XCircle, ShieldCheck, ChevronLeft } from "lucide-react";

export default function AssessmentRuntimePage() {
  const params = useParams();
  const router = useRouter();
  const assessmentId = (params?.id as string) || "ass-mod-101";

  const assessment = domainService.getAssessmentById(assessmentId) || domainService.getAssessments()[0];
  const questions = assessment.questionIds
    .map((qId) => domainService.getQuestionById(qId))
    .filter(Boolean);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [attemptResult, setAttemptResult] = useState<AssessmentAttempt | null>(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmitAssessment = () => {
    let totalScore = 0;
    const studentAnswers: StudentAnswer[] = questions.map((q) => {
      if (!q) return { questionId: "", scoreAwarded: 0 };
      const selectedOptId = userAnswers[q.id];
      const selectedOpt = q.options.find((o) => o.id === selectedOptId);
      const isCorrect = Boolean(selectedOpt?.isCorrect);

      if (isCorrect) {
        totalScore += 1;
      }

      return {
        questionId: q.id,
        selectedOptionId: selectedOptId,
        isCorrect,
        scoreAwarded: isCorrect ? 100 : 0,
        feedback: selectedOpt?.explanation
      };
    });

    const scorePercentage = Math.round((totalScore / Math.max(1, questions.length)) * 100);
    const passed = scorePercentage >= assessment.passingScorePercentage;

    const attempt: AssessmentAttempt = {
      id: `att-${Date.now()}`,
      assessmentId: assessment.id,
      studentId: "student-demo",
      version: 1,
      startedAt: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
      answers: studentAnswers,
      totalScorePercentage: scorePercentage,
      passed,
      status: "EVALUATED"
    };

    domainService.recordAssessmentAttempt(attempt);
    setAttemptResult(attempt);
    setSubmitted(true);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-oswald text-[#EDBB00] font-bold uppercase tracking-widest px-3 py-1 bg-[#004D98]/30 rounded-full border border-[#EDBB00]/30">
            BARÇA ASSESSMENT RUNTIME
          </span>
          <span className="flex items-center gap-1 text-xs font-mono text-[#38BDF8]">
            <Clock className="w-3.5 h-3.5" />
            {assessment.durationMinutes} mins
          </span>
        </div>
        <h1 className="font-oswald text-2xl sm:text-3xl font-bold text-white tracking-wide">
          {assessment.title}
        </h1>
        <p className="text-xs font-cairo text-slate-300">
          امتحان تقييم الموديول التكتيكي بالاعتماد على أسئلة توثيقية مقاسة بمعايير التمكن (Passing: {assessment.passingScorePercentage}%).
        </p>
      </div>

      {!submitted && currentQuestion && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between text-xs font-oswald border-b border-white/10 pb-3">
            <span className="text-slate-300">
              QUESTION {currentQuestionIndex + 1} OF {questions.length}
            </span>
            <span className="text-[#38BDF8] font-mono uppercase">
              {currentQuestion.cognitiveLevel} LEVEL
            </span>
          </div>

          <p className="font-cairo text-base font-bold text-white leading-relaxed">
            {currentQuestion.questionText}
          </p>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = userAnswers[currentQuestion.id] === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                  className={`w-full text-right p-4 rounded-xl border text-xs font-cairo transition-all leading-relaxed flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? "bg-[#004D98]/40 border-[#38BDF8] text-white shadow-lg"
                      : "bg-slate-900/60 border-white/10 text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center text-[10px] ${
                      isSelected
                        ? "border-[#38BDF8] bg-[#38BDF8] text-slate-950 font-bold"
                        : "border-slate-600"
                    }`}
                  >
                    {option.id.slice(-1).toUpperCase()}
                  </div>
                  <div className="flex-1">{option.text}</div>
                </button>
              );
            })}
          </div>

          {currentQuestion.sourceEvidence && (
            <div className="pt-2">
              <EvidenceViewer evidences={[currentQuestion.sourceEvidence]} />
            </div>
          )}

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={handleSubmitAssessment}
              disabled={!userAnswers[currentQuestion.id]}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#004D98] to-[#A50044] hover:from-[#A50044] hover:to-[#004D98] text-white font-oswald text-xs font-bold uppercase tracking-wider border border-[#EDBB00]/40 shadow-xl disabled:opacity-40 transition-all cursor-pointer"
            >
              SUBMIT ASSESSMENT ATTEMPT
            </button>
          </div>
        </div>
      )}

      {/* Submitted Attempt Results Summary */}
      {submitted && attemptResult && (
        <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6 text-center">
          <div className="flex justify-center">
            {attemptResult.passed ? (
              <div className="p-4 rounded-full bg-emerald-950 border-2 border-emerald-500 text-emerald-400">
                <CheckCircle2 className="w-12 h-12" />
              </div>
            ) : (
              <div className="p-4 rounded-full bg-rose-950 border-2 border-rose-500 text-rose-400">
                <XCircle className="w-12 h-12" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="font-oswald text-3xl font-bold text-white">
              {attemptResult.passed ? "ASSESSMENT PASSED!" : "RE-ATTEMPT RECOMMENDED"}
            </h2>
            <p className="font-mono text-2xl font-bold text-[#EDBB00]">
              Score: {attemptResult.totalScorePercentage}%
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-center gap-4">
            <Link
              href="/progress"
              className="px-6 py-3 rounded-xl bg-[#004D98] text-white font-oswald text-xs font-bold uppercase tracking-wider shadow-lg"
            >
              VIEW MASTERY REPORT
            </Link>
            <Link
              href="/learn/path"
              className="px-6 py-3 rounded-xl bg-slate-900 border border-white/10 text-slate-300 font-oswald text-xs font-bold uppercase tracking-wider"
            >
              RETURN TO ACADEMY
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
