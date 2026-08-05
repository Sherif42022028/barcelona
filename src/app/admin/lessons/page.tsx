"use client";

import React, { useState } from "react";
import Link from "next/link";
import { domainService } from "@/lib/domain/service";
import { Lesson, LessonBlock } from "@/lib/domain/types";
import { BlockRenderer } from "@/components/domain/BlockRenderer";
import { BookOpen, Plus, Eye, CheckCircle2, Shield } from "lucide-react";

export default function AdminLessonsPage() {
  const lessons = domainService.getLessons();
  const [selectedLessonId, setSelectedLessonId] = useState<string>(lessons[0]?.id || "");
  const [previewStudent, setPreviewStudent] = useState(false);

  const selectedLesson = lessons.find((l) => l.id === selectedLessonId) || lessons[0];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#38BDF8]" />
            <span className="text-xs font-oswald text-[#EDBB00] font-bold uppercase tracking-widest px-3 py-1 bg-[#004D98]/30 rounded-full border border-[#EDBB00]/30">
              BLOCK-BASED LESSON CMS & BUILDER
            </span>
          </div>
          <Link href="/admin" className="text-xs font-cairo text-[#38BDF8] hover:underline">
            ← العودة للأدمن
          </Link>
        </div>
        <h1 className="font-oswald text-2xl sm:text-4xl font-bold text-white tracking-wide">
          محرر الدروس المعتمد على الكتل (Block-Based Builder)
        </h1>
        <p className="text-sm font-cairo text-slate-300 max-w-3xl">
          تصميم الدروس التفاعلية بتجميع الكتل النصية، التكتيكية، والتوضيحية دون كتابة محتوى ثابت داخل الكود.
        </p>
      </div>

      <div className="flex items-center justify-between p-4 glass-panel rounded-2xl border border-white/10">
        <div className="text-xs font-cairo text-slate-300">
          Lesson Data $\rightarrow$ Lesson Service $\rightarrow$ BlockRenderer
        </div>

        <button
          onClick={() => setPreviewStudent(!previewStudent)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-oswald text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer border transition-all ${
            previewStudent
              ? "bg-emerald-950 border-emerald-500 text-emerald-300"
              : "bg-slate-900 border-white/10 text-white hover:bg-slate-800"
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>{previewStudent ? "EDITING MODE" : "PREVIEW AS STUDENT"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Lessons List Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <div className="font-oswald text-xs text-slate-300 uppercase tracking-wider">
            CONFIGURED LESSONS ({lessons.length})
          </div>

          <div className="space-y-2">
            {lessons.map((les) => {
              const isSelected = les.id === selectedLessonId;

              return (
                <button
                  key={les.id}
                  onClick={() => setSelectedLessonId(les.id)}
                  className={`w-full text-right p-4 rounded-xl border text-xs font-cairo transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#004D98]/40 border-[#38BDF8] text-white shadow-lg"
                      : "bg-slate-900/60 border-white/10 text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <div className="font-bold text-sm text-white font-oswald truncate">
                    {les.title}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {les.subtitle}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                    <span>{les.blocks.length} Blocks</span>
                    <span className="font-mono text-emerald-400">{les.status}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Lesson Blocks Canvas */}
        <div className="lg:col-span-8 space-y-4">
          {selectedLesson && (
            <div className="space-y-4">
              <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-[#38BDF8]">
                  LESSON ID: {selectedLesson.id}
                </span>
                <h2 className="font-oswald text-2xl font-bold text-white">
                  {selectedLesson.title}
                </h2>
                <p className="text-xs font-cairo text-slate-300">
                  {selectedLesson.subtitle} — {selectedLesson.description}
                </p>
              </div>

              {/* Render Blocks */}
              <div className="space-y-4">
                {selectedLesson.blocks.map((block) => (
                  <div key={block.id} className="relative group">
                    {!previewStudent && (
                      <div className="absolute top-2 left-2 text-[10px] font-mono bg-black/80 px-2 py-0.5 rounded text-slate-400 border border-white/10 z-10">
                        BLOCK {block.order}: {block.type}
                      </div>
                    )}
                    <BlockRenderer block={block} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
