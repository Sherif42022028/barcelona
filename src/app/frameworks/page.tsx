"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { HeaderScoreboard } from "@/components/HeaderScoreboard";
import { FRAMEWORKS, AnalyticalFramework } from "@/data/academyData";
import { Brain, Layers, CheckCircle2, ArrowRight, Activity, Eye, Compass } from "lucide-react";

export default function FrameworksPage() {
  const [selectedFw, setSelectedFw] = useState<AnalyticalFramework>(FRAMEWORKS[0]);

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#121820] pb-24 font-cairo">
      <Navbar />
      <HeaderScoreboard />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Title Header */}
        <div className="flex items-center justify-between border-b-4 border-[#004D98] pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Brain className="w-5 h-5 text-[#A50044]" />
              <span className="font-oswald text-xs font-bold text-[#A50044] uppercase tracking-widest">
                ANALYTICAL TOOLS & FRAMEWORKS
              </span>
            </div>
            <h2 className="font-oswald text-3xl font-bold text-[#001E42] uppercase">
              ANALYTICAL FRAMEWORKS (أطر التحليل والتفكير التكتيكي)
            </h2>
          </div>
          <span className="text-xs text-gray-500 font-sans hidden sm:block">
            أدوات عقلية عابرة للمراحل (Cross-Cutting Tools) لتفكيك وقراءة المباريات
          </span>
        </div>

        {/* Framework Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FRAMEWORKS.map((fw) => {
            const isSelected = selectedFw.id === fw.id;

            return (
              <button
                key={fw.id}
                onClick={() => setSelectedFw(fw)}
                className={`p-5 text-right border-2 transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? "bg-white border-[#004D98] shadow-lg blaugrana-card-accent ring-2 ring-[#004D98]"
                    : "bg-white/80 border-gray-300 hover:border-[#004D98] hover:bg-white"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="scoreboard-number text-2xl text-[#004D98]">
                      {fw.numberStr}
                    </span>
                    <span className="text-[10px] font-oswald font-bold px-2 py-0.5 bg-red-50 text-[#A50044] border border-red-200">
                      {fw.difficulty}
                    </span>
                  </div>

                  <h4 className="font-oswald text-base font-bold text-[#001E42]">
                    {fw.title}
                  </h4>
                  <p className="text-xs text-gray-600 font-cairo">
                    {fw.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-gray-200 text-xs font-oswald text-[#004D98] font-bold text-center">
                  {isSelected ? "Selected ➔" : "Explore Framework"}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Framework Detail Workspace */}
        <section className="bg-white border-2 border-[#001E42] p-6 sm:p-8 blaugrana-card-accent shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div>
              <span className="font-oswald text-xs font-bold text-[#A50044] uppercase tracking-widest block">
                FRAMEWORK {selectedFw.numberStr} DETAIL
              </span>
              <h3 className="font-oswald text-2xl sm:text-3xl font-bold text-[#001E42]">
                {selectedFw.title}
              </h3>
              <p className="text-xs font-bold text-[#004D98] font-cairo mt-0.5">
                {selectedFw.subtitle}
              </p>
            </div>
            <span className="scoreboard-number text-4xl text-[#004D98]">
              {selectedFw.numberStr}
            </span>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            {selectedFw.description}
          </p>

          {/* Key Elements to Look For */}
          <div className="space-y-3 pt-2">
            <h4 className="font-oswald text-base font-bold text-[#001E42] uppercase">
              WHAT TO LOOK FOR (نقاط التحليل المستهدفة):
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {selectedFw.keyPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#F8F6F0] border-r-4 border-[#004D98] border-t border-b border-l border-gray-200 space-y-1"
                >
                  <span className="scoreboard-number text-lg text-[#004D98]">
                    0{idx + 1}
                  </span>
                  <p className="text-xs font-semibold text-gray-800 leading-relaxed font-cairo">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Lessons Action */}
          <div className="pt-4 border-t border-gray-200 flex justify-end">
            <Link
              href="/analyze/lab"
              className="inline-flex items-center gap-2 bg-[#A50044] hover:bg-[#70002E] text-white px-8 py-3 text-sm font-oswald uppercase font-bold tracking-widest transition-colors shadow-md"
            >
              Apply Framework in Match Analysis Lab ➔
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
