"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { HeaderScoreboard } from "@/components/HeaderScoreboard";
import { FRAMEWORKS, AnalyticalFramework } from "@/data/academyData";
import { Brain } from "lucide-react";

export default function FrameworksPage() {
  const [selectedFw, setSelectedFw] = useState<AnalyticalFramework>(FRAMEWORKS[0]);

  return (
    <div className="min-h-screen text-[#F8FAFC] pb-24 font-cairo">
      <Navbar />
      <HeaderScoreboard />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Title Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Brain className="w-5 h-5 text-[#E11D48]" />
              <span className="font-oswald text-xs font-bold text-[#E11D48] uppercase tracking-widest">
                ANALYTICAL TOOLS & FRAMEWORKS
              </span>
            </div>
            <h2 className="font-oswald text-3xl font-bold text-white uppercase">
              ANALYTICAL FRAMEWORKS (أطر التحليل والتفكير التكتيكي)
            </h2>
          </div>
          <span className="text-xs text-[#94A3B8] font-sans hidden sm:block">
            أدوات عقلية عابرة للمراحل (Cross-Cutting Tools) لتفكيك وقراءة المباريات
          </span>
        </div>

        {/* Framework Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FRAMEWORKS.map((fw) => {
            const isSelected = selectedFw.id === fw.id;

            return (
              <button
                key={fw.id}
                onClick={() => setSelectedFw(fw)}
                className={`glass-card p-5 text-right border-2 transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 border-[#004D98] shadow-2xl glass-card-accent ring-2 ring-[#38BDF8]/40"
                    : "bg-slate-950/40 border-white/5 hover:border-white/20"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="scoreboard-number text-2xl text-[#38BDF8]">
                      {fw.numberStr}
                    </span>
                    <span className="text-[10px] font-oswald font-bold px-2 py-0.5 rounded-md bg-[#A50044]/30 text-[#E11D48] border border-[#A50044]/40">
                      {fw.difficulty}
                    </span>
                  </div>

                  <h4 className="font-oswald text-base font-bold text-white">
                    {fw.title}
                  </h4>
                  <p className="text-xs text-[#94A3B8] font-cairo">
                    {fw.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-white/10 text-xs font-oswald text-[#38BDF8] font-bold text-center">
                  {isSelected ? "Selected ➔" : "Explore Framework"}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Framework Detail Workspace */}
        <section className="glass-card p-6 sm:p-8 glass-card-accent shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="font-oswald text-xs font-bold text-[#E11D48] uppercase tracking-widest block">
                FRAMEWORK {selectedFw.numberStr} DETAIL
              </span>
              <h3 className="font-oswald text-2xl sm:text-3xl font-bold text-white">
                {selectedFw.title}
              </h3>
              <p className="text-xs font-bold text-[#38BDF8] font-cairo mt-0.5">
                {selectedFw.subtitle}
              </p>
            </div>
            <span className="scoreboard-number text-4xl text-[#38BDF8]">
              {selectedFw.numberStr}
            </span>
          </div>

          <p className="text-sm text-[#94A3B8] leading-relaxed">
            {selectedFw.description}
          </p>

          {/* Key Elements to Look For */}
          <div className="space-y-3 pt-2">
            <h4 className="font-oswald text-base font-bold text-white uppercase">
              WHAT TO LOOK FOR (نقاط التحليل المستهدفة):
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedFw.keyPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/60 border-r-4 border-[#38BDF8] border-t border-b border-l border-white/10 space-y-1.5"
                >
                  <span className="scoreboard-number text-lg text-[#38BDF8]">
                    0{idx + 1}
                  </span>
                  <p className="text-xs font-semibold text-gray-200 leading-relaxed font-cairo">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Lessons Action */}
          <div className="pt-4 border-t border-white/10 flex justify-end">
            <Link
              href="/analyze/lab"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#A50044] to-[#70002E] hover:from-[#70002E] hover:to-[#A50044] text-white px-8 py-3 rounded-xl text-sm font-oswald uppercase font-bold tracking-widest transition-all shadow-lg"
            >
              Apply Framework in Match Analysis Lab ➔
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
