"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { HeaderScoreboard } from "@/components/HeaderScoreboard";
import { STAGES_DATA } from "@/data/academyData";
import { ArrowRight, BookOpen, CheckCircle, Play, Lock } from "lucide-react";

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
    <div className="min-h-screen bg-[#F8F6F0] text-[#121820] pb-24 font-cairo">
      <Navbar />
      <HeaderScoreboard currentStageCode={stage.codeName} stageProgress={stage.progress} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Back Link */}
        <Link
          href="/learn/path"
          className="inline-flex items-center gap-2 text-xs font-oswald text-[#004D98] hover:text-[#002D5E] font-bold uppercase"
        >
          <ArrowRight className="w-4 h-4" />
          Back to Learning Path
        </Link>

        {/* Stage Header Banner */}
        <section className="bg-white border-2 border-[#001E42] p-6 sm:p-8 blaugrana-card-accent shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <span className="scoreboard-number text-4xl text-[#004D98]">
              {stage.numberStr}
            </span>
            <div>
              <span className="font-oswald text-xs font-bold text-[#A50044] uppercase tracking-widest block">
                STAGE {stage.numberStr}: {stage.codeName}
              </span>
              <h2 className="font-oswald text-3xl font-bold text-[#001E42]">
                {stage.title}
              </h2>
            </div>
          </div>

          <p className="text-sm font-oswald text-[#004D98] font-bold">
            {stage.question}
          </p>

          <p className="text-sm text-gray-700 leading-relaxed pt-2 border-t border-gray-100">
            {stage.description}
          </p>

          {/* Progress Bar */}
          <div className="space-y-1 pt-2">
            <div className="flex items-center justify-between text-xs font-oswald font-bold">
              <span className="text-[#004D98]">Stage Completion:</span>
              <span className="text-[#A50044]">{stage.progress}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 border border-gray-300">
              <div
                className="h-full bg-gradient-to-r from-[#004D98] to-[#A50044]"
                style={{ width: `${stage.progress}%` }}
              ></div>
            </div>
          </div>
        </section>

        {/* Modules Breakdown */}
        <section className="space-y-4">
          <h3 className="font-oswald text-xl font-bold uppercase text-[#001E42] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#A50044]" />
            Stage Modules ({stage.modules.length})
          </h3>

          <div className="grid grid-cols-1 gap-6">
            {stage.modules.map((module) => (
              <div
                key={module.id}
                className="bg-white border-2 border-[#001E42] p-6 shadow-md space-y-4"
              >
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="scoreboard-number text-3xl text-[#004D98]">
                      {module.numberStr}
                    </span>
                    <div>
                      <h4 className="font-oswald text-xl font-bold text-[#001E42]">
                        MODULE {module.numberStr}: {module.title}
                      </h4>
                      <p className="text-xs text-gray-600 font-cairo">
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
                      className="flex items-center justify-between p-3 bg-[#F8F6F0] border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <span className="font-oswald text-xs font-bold text-[#004D98] uppercase block">
                            Lesson 0{idx + 1}: {lesson.title}
                          </span>
                          <span className="text-xs text-gray-600 font-cairo">
                            {lesson.summary}
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/learn/lesson/${lesson.id}`}
                        className="inline-flex items-center gap-1.5 bg-[#004D98] hover:bg-[#002D5E] text-white px-4 py-2 text-xs font-oswald font-bold uppercase transition-colors shrink-0"
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
