"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { domainService } from "@/lib/domain/service";
import {
  Compass,
  CheckCircle2,
  BookOpen,
  Activity,
  Award,
  ChevronLeft,
  ArrowRight
} from "lucide-react";

export default function ModuleDetailPage() {
  const params = useParams();
  const moduleId = (params?.moduleId as string) || "mod-101";

  const module = domainService.getModuleById(moduleId) || domainService.getModules()[0];
  const stage = domainService.getStageById(module.stageId);
  const lessons = domainService.getLessons(module.id);
  const scenarios = module.practiceScenarioIds
    .map((sId) => domainService.getTacticalScenarioById(sId))
    .filter(Boolean);
  const assessment = module.assessmentId
    ? domainService.getAssessmentById(module.assessmentId)
    : undefined;

  const progress = domainService.getStudentProgress();
  const isCompleted = progress.completedModuleIds.includes(module.id);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-cairo text-slate-400 border-b border-white/10 pb-4">
        <Link href="/" className="hover:text-white transition-colors">
          الرئيسية
        </Link>
        <span>/</span>
        <Link href="/learn/path" className="hover:text-white transition-colors">
          {stage?.title || "STAGE 01"}
        </Link>
        <span>/</span>
        <span className="text-white font-bold">{module.title}</span>
      </div>

      {/* Module Banner Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-[#004D98]/40 text-[#38BDF8] border border-[#004D98]">
            MODULE {module.numberStr}
          </span>
          <span className="text-xs font-cairo text-[#EDBB00] font-bold">
            {module.positionRole}
          </span>
        </div>

        <h1 className="font-oswald text-2xl sm:text-4xl font-bold text-white tracking-wide">
          {module.title}
        </h1>
        <p className="text-sm font-cairo text-slate-300 max-w-3xl">
          {module.subtitle} — {module.description}
        </p>

        {/* Learning Objectives */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <span className="text-[11px] font-oswald text-slate-400 uppercase tracking-wider">
            LEARNING OBJECTIVES (أهداف الموديول):
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {module.learningObjectives.map((obj) => (
              <div
                key={obj.id}
                className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs font-cairo text-slate-200 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{obj.statement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Module Content Grid: Lessons, Practice, Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Lessons List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-2 font-oswald text-sm font-bold text-white uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-[#38BDF8]" />
            <span>MODULE LESSONS ({lessons.length})</span>
          </div>

          <div className="space-y-3">
            {lessons.map((lesson) => {
              const lessonDone = progress.completedLessonIds.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-white/20"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {lessonDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      <h3 className="font-oswald text-base font-bold text-white">
                        {lesson.title}
                      </h3>
                    </div>
                    <p className="text-xs font-cairo text-slate-300">
                      {lesson.subtitle} ({lesson.estimatedDurationMinutes} mins)
                    </p>
                  </div>

                  <Link
                    href={`/lesson/${lesson.id}`}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#004D98] to-[#A50044] hover:from-[#A50044] hover:to-[#004D98] text-white font-oswald text-xs font-bold uppercase tracking-wider transition-all shadow-lg shrink-0"
                  >
                    <span>{lessonDone ? "REVIEW LESSON" : "START LESSON"}</span>
                    <ChevronLeft className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Practice & Assessment Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Tactical Practice */}
          <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center gap-2 font-oswald text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Activity className="w-4 h-4" />
              <span>PRACTICE SCENARIOS</span>
            </div>

            {scenarios.map((scen) => (
              <div key={scen?.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 space-y-2 text-xs font-cairo">
                <h4 className="font-bold text-white">{scen?.title}</h4>
                <p className="text-slate-300 text-[11px]">{scen?.description}</p>
                <Link
                  href="/analyze/lab"
                  className="block text-center py-1.5 rounded bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 font-oswald text-[11px] font-bold uppercase transition-colors"
                >
                  PRACTICE SCENARIO
                </Link>
              </div>
            ))}
          </div>

          {/* Module Assessment */}
          {assessment && (
            <div className="glass-card p-5 rounded-2xl border border-[#EDBB00]/30 space-y-3">
              <div className="flex items-center gap-2 font-oswald text-xs font-bold text-[#EDBB00] uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>MODULE ASSESSMENT</span>
              </div>

              <div className="space-y-2 text-xs font-cairo">
                <h4 className="font-bold text-white">{assessment.title}</h4>
                <p className="text-slate-300 text-[11px]">
                  Duration: {assessment.durationMinutes} mins | Passing Score: {assessment.passingScorePercentage}%
                </p>

                <Link
                  href={`/assessment/${assessment.id}`}
                  className="block text-center py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#004D98] text-white font-oswald text-xs font-bold uppercase tracking-wider shadow-lg transition-all"
                >
                  TAKE MODULE ASSESSMENT
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
