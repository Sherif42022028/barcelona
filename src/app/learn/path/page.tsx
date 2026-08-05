"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { HeaderScoreboard } from "@/components/HeaderScoreboard";
import { STAGES_DATA } from "@/data/academyData";
import { Compass, Lock, CheckCircle, ArrowRight } from "lucide-react";

export default function LearningPathPage() {
  return (
    <div className="min-h-screen text-[#F8FAFC] pb-24 font-cairo">
      <Navbar />
      <HeaderScoreboard />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Title Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Compass className="w-5 h-5 text-[#E11D48]" />
              <span className="font-oswald text-xs font-bold text-[#E11D48] uppercase tracking-widest">
                ACADEMY CURRICULUM
              </span>
            </div>
            <h2 className="font-oswald text-3xl font-bold text-white uppercase">
              LEARNING PATH (مسار التعلم المرحلي)
            </h2>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#94A3B8] font-oswald block uppercase">Overall Progress</span>
            <span className="scoreboard-number text-3xl text-[#38BDF8]">24%</span>
          </div>
        </div>

        {/* Stages Timeline */}
        <div className="space-y-6">
          {STAGES_DATA.map((stage, idx) => (
            <div
              key={stage.id}
              className={`glass-card p-6 sm:p-8 transition-all shadow-xl ${
                stage.unlocked
                  ? "border-[#004D98]/60 glass-card-accent"
                  : "opacity-60 bg-slate-950/40 border-white/5"
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-3">
                    <span className="scoreboard-number text-4xl text-[#38BDF8]">
                      {stage.numberStr}
                    </span>
                    <div>
                      <span className="font-oswald text-xs font-bold text-[#E11D48] uppercase tracking-widest block">
                        STAGE {stage.numberStr}: {stage.codeName}
                      </span>
                      <h3 className="font-oswald text-2xl font-bold text-white">
                        {stage.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs font-oswald text-[#38BDF8] font-bold">
                    {stage.question}
                  </p>

                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {stage.description}
                  </p>

                  {/* Modules List */}
                  {stage.unlocked && stage.modules.length > 0 && (
                    <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      {stage.modules.map((m) => (
                        <div
                          key={m.id}
                          className="flex items-center gap-2 p-2.5 bg-slate-900/60 border border-white/10 rounded-lg text-gray-200"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="font-semibold">{m.title}</span>
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
                      className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#004D98] to-[#002D5E] hover:from-[#002D5E] hover:to-[#004D98] text-white px-8 py-3.5 rounded-xl text-sm font-oswald uppercase font-bold tracking-wider transition-all shadow-lg border border-blue-400/30"
                    >
                      Explore Stage ➔
                    </Link>
                  ) : (
                    <div className="w-full md:w-auto p-4 text-center text-xs font-oswald text-gray-500 font-bold border border-white/10 bg-slate-950/60 rounded-xl flex items-center justify-center gap-2">
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
