"use client";

import React, { useState } from "react";
import Link from "next/link";
import { domainService } from "@/lib/domain/service";
import { Question } from "@/lib/domain/types";
import { EvidenceViewer } from "@/components/domain/EvidenceViewer";
import { HelpCircle, Sparkles, CheckCircle2, Shield, Plus, Search } from "lucide-react";

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState(domainService.getQuestions());
  const [generating, setGenerating] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(questions[0]?.id || "");

  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId) || questions[0];

  const handleGenerateQuestions = () => {
    setGenerating(true);
    setTimeout(() => {
      const newQuestion: Question = {
        id: `q-ai-${Date.now()}`,
        type: "MCQ",
        questionText: "كيف تؤثر حركة حارس المرمى كلاعب إضافي في منطقة الجزاء على زاوية ضغط مهاجم الخصم؟",
        knowledgeId: "kn-dec-eval",
        objectiveId: "obj-101-1",
        cognitiveLevel: "ANALYZE",
        difficulty: "MEDIUM",
        status: "DRAFT",
        options: [
          {
            id: "opt-new-1",
            text: "تجبر مهاجم الخصم على التردد بين إغلاق زاوية التمرير للحارس أو التراجع للخلف",
            isCorrect: true,
            explanation: "ممتاز! حارس المرمى كلاعب إضافي يفك ضغط خط الهجوم."
          },
          {
            id: "opt-new-2",
            text: "تمنع الظهير الأيمن من التقدم",
            isCorrect: false,
            explanation: "غير صحيح."
          }
        ],
        sourceEvidence: {
          id: "ev-gen-1",
          documentId: "doc-mod-1",
          documentTitle: "Module 1",
          pageNumber: 14,
          excerpt: "Goalkeeper positioning inside box creates 11v10 numeric superiority."
        }
      };

      setQuestions((prev) => [newQuestion, ...prev]);
      setSelectedQuestionId(newQuestion.id);
      setGenerating(false);
    }, 1000);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-oswald text-[#EDBB00] font-bold uppercase tracking-widest px-3 py-1 bg-[#004D98]/30 rounded-full border border-[#EDBB00]/30">
              QUESTION BANK & AI GENERATION PIPELINE
            </span>
          </div>
          <Link href="/admin" className="text-xs font-cairo text-[#38BDF8] hover:underline">
            ← العودة للأدمن
          </Link>
        </div>
        <h1 className="font-oswald text-2xl sm:text-4xl font-bold text-white tracking-wide">
          بنك الأسئلة وتوليد الأسئلة الموثوقة
        </h1>
        <p className="text-sm font-cairo text-slate-300 max-w-3xl">
          إدارة بنك الأسئلة المعرفية والتكتيكية، وتوليد أسئلة مسودة من المعرفة المعتمدة فقط دون نشر تلقائي.
        </p>
      </div>

      {/* Toolbar: AI Generation Button */}
      <div className="flex items-center justify-between p-4 glass-panel rounded-2xl border border-white/10">
        <div className="flex items-center gap-2 text-xs font-cairo text-slate-300">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Strict AI Generation Workflow: Approved Knowledge → Draft Question → Human Review</span>
        </div>

        <button
          onClick={handleGenerateQuestions}
          disabled={generating}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#004D98] hover:from-[#004D98] hover:to-amber-500 text-white font-oswald text-xs font-bold uppercase tracking-wider shadow-lg disabled:opacity-50 cursor-pointer transition-all"
        >
          <Sparkles className="w-4 h-4 text-[#EDBB00]" />
          <span>{generating ? "GENERATING DRAFT..." : "GENERATE AI QUESTION"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Questions List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="font-oswald text-xs text-slate-300 uppercase tracking-wider">
            QUESTION BANK ({questions.length})
          </div>

          <div className="space-y-2">
            {questions.map((q) => {
              const isSelected = q.id === selectedQuestionId;
              const isDraft = q.status === "DRAFT";

              return (
                <button
                  key={q.id}
                  onClick={() => setSelectedQuestionId(q.id)}
                  className={`w-full text-right p-4 rounded-xl border text-xs font-cairo transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#004D98]/40 border-[#38BDF8] text-white shadow-lg"
                      : "bg-slate-900/60 border-white/10 text-slate-300 hover:bg-white/5"
                  } ${isDraft ? "border-amber-500/40 bg-amber-950/20" : ""}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-xs text-white truncate max-w-[200px]">
                      {q.questionText}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                        q.status === "PUBLISHED"
                          ? "bg-emerald-950 text-emerald-400 border-emerald-500/30"
                          : "bg-amber-950 text-amber-300 border-amber-500/30"
                      }`}
                    >
                      {q.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                    <span className="font-mono text-[#38BDF8]">{q.cognitiveLevel}</span>
                    <span>Type: {q.type}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Question Details */}
        <div className="lg:col-span-7 space-y-4">
          {selectedQuestion && (
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-5 text-xs font-cairo">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-[#38BDF8]">
                    COGNITIVE: {selectedQuestion.cognitiveLevel} | DIFFICULTY: {selectedQuestion.difficulty}
                  </span>
                  <h2 className="font-bold text-white text-base mt-1 leading-relaxed">
                    {selectedQuestion.questionText}
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#004D98]/40 text-[#EDBB00] font-mono text-[10px] font-bold border border-[#EDBB00]/30">
                  {selectedQuestion.type}
                </span>
              </div>

              {/* Options Breakdown */}
              <div className="space-y-2">
                <h3 className="font-oswald text-xs font-bold text-slate-300 uppercase tracking-wider">
                  QUESTION OPTIONS & EXPLANATIONS
                </h3>

                <div className="space-y-2">
                  {selectedQuestion.options.map((opt) => (
                    <div
                      key={opt.id}
                      className={`p-3 rounded-xl border text-xs space-y-1 ${
                        opt.isCorrect
                          ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-200"
                          : "bg-slate-900/60 border-white/5 text-slate-300"
                      }`}
                    >
                      <div className="font-bold flex items-center justify-between">
                        <span>{opt.text}</span>
                        {opt.isCorrect && (
                          <span className="text-[10px] font-mono font-bold text-emerald-400">
                            CORRECT ANSWER ✓
                          </span>
                        )}
                      </div>
                      {opt.explanation && (
                        <p className="text-[11px] text-slate-400 italic">
                          Explanation: {opt.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Source Evidence */}
              {selectedQuestion.sourceEvidence && (
                <div className="pt-2">
                  <EvidenceViewer evidences={[selectedQuestion.sourceEvidence]} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
