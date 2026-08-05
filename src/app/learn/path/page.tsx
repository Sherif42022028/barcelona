"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { HeaderScoreboard } from "@/components/HeaderScoreboard";
import { STAGES_DATA } from "@/data/academyData";
import { Compass, Lock, CheckCircle, ArrowRight, Play, Award } from "lucide-react";

export default function LearningPathPage() {
  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#121820] pb-24 font-cairo">
      <Navbar />
      <HeaderScoreboard />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Title Header */}
        <div className="flex items-center justify-between border-b-4 border-[#004D98] pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Compass className="w-5 h-5 text-[#A50044]" />
              <span className="font-oswald text-xs font-bold text-[#A50044] uppercase tracking-widest">
                ACADEMY CURRICULUM
              </span>
            </div>
            <h2 className="font-oswald text-3xl font-bold text-[#001E42] uppercase">
              LEARNING PATH (مسار التعلم المرحلي)
            </h2>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500 font-oswald block uppercase">Overall Progress</span>
            <span className="scoreboard-number text-3xl text-[#004D98]">24%</span>
          </div>
        </div>

        {/* Stages Timeline */}
        <div className="space-y-6">
          {STAGES_DATA.map((stage, idx) => (
            <div
              key={stage.id}
              className={`bg-white border-2 p-6 sm:p-8 transition-all shadow-md ${
                stage.unlocked
                  ? "border-[#004D98] blaugrana-card-accent"
                  : "border-gray-300 opacity-75 bg-gray-50"
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-3">
                    <span className="scoreboard-number text-4xl text-[#004D98]">
                      {stage.numberStr}
                    </span>
                    <div>
                      <span className="font-oswald text-xs font-bold text-[#A50044] uppercase tracking-widest block">
                        STAGE {stage.numberStr}: {stage.codeName}
                      </span>
                      <h3 className="font-oswald text-2xl font-bold text-[#001E42]">
                        {stage.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs font-oswald text-[#004D98] font-bold">
                    {stage.question}
                  </p>

                  <p className="text-sm text-gray-700 leading-relaxed">
                    {stage.description}
                  </p>

                  {/* Modules Progress List */}
                  {stage.unlocked && stage.modules.length > 0 && (
                    <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {stage.modules.map((m) => (
                        <div
                          key={m.id}
                          className="flex items-center gap-2 p-2 bg-[#F8F6F0] border border-gray-200"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-semibold text-gray-800">{m.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Action */}
                <div className="shrink-0 w-full md:w-auto">
                  {stage.unlocked ? (
                    <Link
                      href={`/learn/stage/${stage.id}`}
                      className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#004D98] hover:bg-[#002D5E] text-white px-8 py-3.5 text-sm font-oswald uppercase font-bold tracking-wider transition-colors shadow-md"
                    >
                      Explore Stage ➔
                    </Link>
                  ) : (
                    <div className="w-full md:w-auto p-4 text-center text-xs font-oswald text-gray-500 font-bold border border-gray-300 bg-gray-100 flex items-center justify-center gap-2">
                      <Lock className="w-4 h-4 text-gray-400" />
                      Complete Stage 0{idx} First
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
