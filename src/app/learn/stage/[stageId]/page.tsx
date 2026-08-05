"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { HeaderScoreboard } from "@/components/HeaderScoreboard";
import { STAGES_DATA } from "@/data/academyData";
import { ArrowRight, BookOpen, CheckCircle, Play } from "lucide-react";

interface StagePageProps {
  params: Promise<{
    stageId: string;
  }>;
}

export default function StageOverviewPage({ params }: StagePageProps) {
  const resolvedParams = use(params);
  const stage = STAGES_DATA.find((s) => s.id === resolvedParams.stageId);

  if (!stage) {
    notFound();
  }

  return (
    <div className="min-h-screen text-[#F8FAFC] pb-24 font-cairo">
      <Navbar />
      <HeaderScoreboard currentStageCode={stage.codeName} stageProgress={stage.progress} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Back Link */}
        <Link
          href="/learn/path"
          className="inline-flex items-center gap-2 text-xs font-oswald text-[#38BDF8] hover:text-white font-bold uppercase transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          Back to Learning Path
        </Link>

        {/* Stage Header Banner */}
        <section className="glass-card p-6 sm:p-8 glass-card-accent shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <span className="scoreboard-number text-4xl text-[#38BDF8]">
              {stage.numberStr}
            </span>
            <div>
              <span className="font-oswald text-xs font-bold text-[#E11D48] uppercase tracking-widest block">
                STAGE {stage.numberStr}: {stage.codeName}
              </span>
              <h2 className="font-oswald text-3xl font-bold text-white">
                {stage.title}
              </h2>
            </div>
          </div>

          <p className="text-sm font-oswald text-[#38BDF8] font-bold">
            {stage.question}
          </p>

          <p className="text-sm text-[#94A3B8] leading-relaxed pt-2 border-t border-white/10">
            {stage.description}
          </p>

          {/* Progress Bar */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs font-oswald font-bold">
              <span className="text-[#38BDF8]">Stage Completion:</span>
              <span className="text-[#E11D48]">{stage.progress}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-900 rounded-full border border-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#004D98] via-[#38BDF8] to-[#E11D48]"
                style={{ width: `${stage.progress}%` }}
              ></div>
            </div>
          </div>
        </section>

        {/* Modules Breakdown */}
        <section className="space-y-4">
          <h3 className="font-oswald text-xl font-bold uppercase text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#E11D48]" />
            Stage Modules ({stage.modules.length})
          </h3>

          <div className="grid grid-cols-1 gap-6">
            {stage.modules.map((module) => (
              <div
                key={module.id}
                className="glass-card p-6 shadow-xl space-y-4"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="scoreboard-number text-3xl text-[#38BDF8]">
                      {module.numberStr}
                    </span>
                    <div>
                      <h4 className="font-oswald text-xl font-bold text-white">
                        MODULE {module.numberStr}: {module.title}
                      </h4>
                      <p className="text-xs text-[#94A3B8] font-cairo">
                        {module.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Lessons in Module */}
                <div className="space-y-2">
                  {module.lessons.map((lesson, idx) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-3.5 bg-slate-900/60 border border-white/10 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <span className="font-oswald text-xs font-bold text-[#38BDF8] uppercase block">
                            Lesson 0{idx + 1}: {lesson.title}
                          </span>
                          <span className="text-xs text-[#94A3B8] font-cairo">
                            {lesson.summary}
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/learn/lesson/${lesson.id}`}
                        className="inline-flex items-center gap-1.5 bg-[#004D98]/40 hover:bg-[#004D98] text-white border border-[#004D98] px-4 py-2 rounded-lg text-xs font-oswald font-bold uppercase transition-colors shrink-0"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        Start Lesson ➔
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
