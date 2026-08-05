"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { domainService } from "@/lib/domain/service";
import { BlockRenderer } from "@/components/domain/BlockRenderer";
import { EvidenceViewer } from "@/components/domain/EvidenceViewer";
import {
  Compass,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ShieldCheck,
  Award
} from "lucide-react";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = (params?.id as string) || "les-101-1";

  const lesson = domainService.getLessonById(lessonId) || domainService.getLessons()[0];
  const module = domainService.getModuleById(lesson.moduleId);
  const stage = module ? domainService.getStageById(module.stageId) : undefined;
  const [completed, setCompleted] = useState(false);

  // Fetch source evidences linked to knowledge objects taught in this lesson
  const knowledgeObjects = lesson.knowledgeIds
    .map((kId) => domainService.getKnowledgeById(kId))
    .filter(Boolean);

  const evidences = knowledgeObjects.flatMap((k) => k?.sourceEvidences || []);

  const handleCompleteLesson = () => {
    domainService.completeLesson(lesson.id);
    setCompleted(true);
  };

  const allLessons = domainService.getLessons();
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = allLessons[currentIndex + 1];

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumbs & Navigation Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-cairo text-slate-400 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <Link href="/learn/path" className="hover:text-white transition-colors">
            {stage?.title || "STAGE 01"}
          </Link>
          <span>/</span>
          {module && (
            <Link
              href={`/learn/module/${module.id}`}
              className="hover:text-white transition-colors text-slate-300 font-bold"
            >
              {module.title}
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[#38BDF8] font-mono">
            <Clock className="w-3.5 h-3.5" />
            {lesson.estimatedDurationMinutes} mins
          </span>
        </div>
      </div>

      {/* Lesson Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
        <div className="space-y-2">
          <span className="text-xs font-oswald text-[#EDBB00] font-bold uppercase tracking-widest px-3 py-1 bg-[#004D98]/30 rounded-full border border-[#EDBB00]/30">
            BARÇA LESSON ENGINE
          </span>
          <h1 className="font-oswald text-2xl sm:text-4xl font-bold text-white tracking-wide">
            {lesson.title}
          </h1>
          <p className="text-sm font-cairo text-slate-300">
            {lesson.subtitle} — {lesson.description}
          </p>
        </div>

        {/* Objectives List */}
        {module && module.learningObjectives.length > 0 && (
          <div className="pt-4 border-t border-white/10 space-y-2">
            <span className="text-[11px] font-oswald text-slate-400 uppercase tracking-wider">
              LEARNING OBJECTIVES (أهداف التعلم):
            </span>
            <div className="flex flex-wrap gap-2">
              {module.learningObjectives.map((obj) => (
                <div
                  key={obj.id}
                  className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-cairo text-slate-200 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{obj.statement}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-[#38BDF8]">
                    {obj.cognitiveLevel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Block-Based Content Stack */}
      <div className="space-y-6">
        {lesson.blocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </div>

      {/* Source Evidence Traceability Panel */}
      {evidences.length > 0 && (
        <div className="pt-4 border-t border-white/10">
          <EvidenceViewer evidences={evidences} />
        </div>
      )}

      {/* Completion & Next Lesson Action Footer */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={handleCompleteLesson}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-oswald text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
            completed
              ? "bg-emerald-950/80 border-emerald-500 text-emerald-300"
              : "bg-gradient-to-r from-[#004D98] to-[#A50044] hover:from-[#A50044] hover:to-[#004D98] text-white border-[#EDBB00]/40 shadow-xl"
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-[#EDBB00]" />
          <span>{completed ? "LESSON COMPLETED ✓" : "MARK LESSON COMPLETED"}</span>
        </button>

        {nextLesson ? (
          <Link
            href={`/lesson/${nextLesson.id}`}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-white font-oswald text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>NEXT LESSON</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        ) : (
          <Link
            href="/learn/path"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-oswald text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>RETURN TO ACADEMY PATH</span>
          </Link>
        )}
      </div>
    </main>
  );
}
