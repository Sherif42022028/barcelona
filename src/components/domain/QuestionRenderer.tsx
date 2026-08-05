"use client";

import React, { useState } from "react";
import { Question, QuestionOption } from "@/lib/domain/types";
import { EvidenceViewer } from "./EvidenceViewer";
import { HelpCircle, CheckCircle2, XCircle } from "lucide-react";

interface QuestionRendererProps {
  question: Question;
  showEvidence?: boolean;
  onAnswerSubmitted?: (option: QuestionOption, isCorrect: boolean) => void;
  className?: string;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  showEvidence = true,
  onAnswerSubmitted,
  className = ""
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const selectedOption = question.options.find((o) => o.id === selectedOptionId);

  const handleOptionClick = (option: QuestionOption) => {
    if (submitted) return;
    setSelectedOptionId(option.id);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setSubmitted(true);
    if (onAnswerSubmitted) {
      onAnswerSubmitted(selectedOption, selectedOption.isCorrect);
    }
  };

  return (
    <div className={`glass-card p-6 border border-white/10 rounded-2xl space-y-4 ${className}`}>
      {/* Header Badges */}
      <div className="flex items-center justify-between text-xs font-oswald border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 text-[#F59E0B]">
          <HelpCircle className="w-4 h-4" />
          <span>QUESTION ({question.type})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-white/10 text-slate-300 font-mono text-[10px]">
            {question.cognitiveLevel}
          </span>
          <span className="px-2 py-0.5 rounded bg-[#004D98]/40 text-[#38BDF8] font-mono text-[10px] border border-[#004D98]">
            {question.difficulty}
          </span>
        </div>
      </div>

      {/* Question Text */}
      <p className="font-cairo text-sm font-bold text-white leading-relaxed">
        {question.questionText}
      </p>

      {/* Options Stack */}
      <div className="space-y-2.5">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const showResult = submitted;

          return (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option)}
              disabled={submitted}
              className={`w-full text-right p-4 rounded-xl border text-xs font-cairo transition-all leading-relaxed flex items-start gap-3 cursor-pointer ${
                isSelected
                  ? "bg-[#004D98]/40 border-[#38BDF8] text-white shadow-lg shadow-[#004D98]/20"
                  : "bg-slate-900/60 border-white/10 text-slate-300 hover:bg-white/5"
              } ${
                showResult && option.isCorrect
                  ? "bg-emerald-950/60 border-emerald-500 text-emerald-200"
                  : ""
              } ${
                showResult && isSelected && !option.isCorrect
                  ? "bg-rose-950/60 border-rose-500 text-rose-200"
                  : ""
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {showResult && option.isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
                {showResult && isSelected && !option.isCorrect && (
                  <XCircle className="w-4 h-4 text-rose-400" />
                )}
                {!showResult && (
                  <div
                    className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center text-[10px] ${
                      isSelected
                        ? "border-[#38BDF8] bg-[#38BDF8] text-slate-950 font-bold"
                        : "border-slate-600 text-slate-400"
                    }`}
                  >
                    {option.id.slice(-1).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="flex-1">{option.text}</div>
            </button>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!selectedOptionId}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#004D98] to-[#A50044] hover:from-[#A50044] hover:to-[#004D98] text-white font-oswald text-xs font-bold uppercase tracking-wider border border-[#EDBB00]/40 shadow-lg disabled:opacity-40 transition-all cursor-pointer"
        >
          SUBMIT ANSWER
        </button>
      )}

      {/* Feedback Explanation */}
      {submitted && selectedOption && (
        <div
          className={`p-4 rounded-xl border text-xs font-cairo space-y-2 ${
            selectedOption.isCorrect
              ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-200"
              : "bg-rose-950/40 border-rose-500/50 text-rose-200"
          }`}
        >
          <div className="font-bold flex items-center gap-1.5 text-sm">
            {selectedOption.isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>إجابة صحيحة (Correct Answer)</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>إجابة غير دقيقة (Incorrect Answer)</span>
              </>
            )}
          </div>
          <p className="leading-relaxed text-slate-200">{selectedOption.explanation}</p>
        </div>
      )}

      {/* Source Evidence */}
      {showEvidence && question.sourceEvidence && (
        <div className="pt-3 border-t border-white/10">
          <EvidenceViewer evidences={[question.sourceEvidence]} />
        </div>
      )}
    </div>
  );
};
