"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { HeaderScoreboard } from "@/components/HeaderScoreboard";
import { SKILL_METRICS, STAGES_DATA } from "@/data/academyData";
import { Trophy, Brain, Compass, Lock, CheckCircle2, ShieldCheck, Award } from "lucide-react";

export default function SkillProgressPage() {
  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#121820] pb-24 font-cairo">
      <Navbar />
      <HeaderScoreboard />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Title Header */}
        <div className="flex items-center justify-between border-b-4 border-[#004D98] pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-5 h-5 text-[#EDBB00]" />
              <span className="font-oswald text-xs font-bold text-[#A50044] uppercase tracking-widest">
                ACADEMY SKILL RADAR & COMPETENCY
              </span>
            </div>
            <h2 className="font-oswald text-3xl font-bold text-[#001E42] uppercase">
              YOUR SKILL PROGRESS (قياس المهارات والترخيص)
            </h2>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500 font-oswald block uppercase">Overall Mastery</span>
            <span className="scoreboard-number text-4xl text-[#EDBB00]">24%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section 1: Stage Progress & Unlock Logic */}
          <div className="bg-white border-2 border-[#001E42] p-6 blaugrana-card-accent shadow-xl space-y-5">
            <div className="border-b border-gray-200 pb-3">
              <span className="font-oswald text-xs font-bold text-[#A50044] uppercase tracking-widest block">
                STAGE UNLOCK SYSTEM
              </span>
              <h3 className="font-oswald text-xl font-bold text-[#001E42] mt-1">
                مسار التدرج في المراحل
              </h3>
            </div>

            <div className="space-y-4">
              {STAGES_DATA.map((stage, idx) => (
                <div key={stage.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="scoreboard-number text-lg text-[#004D98]">
                        {stage.numberStr}
                      </span>
                      <span className="font-oswald font-bold text-[#001E42]">
                        {stage.codeName} — {stage.title}
                      </span>
                    </div>
                    {stage.unlocked ? (
                      <span className="font-oswald font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-300">
                        {stage.progress}%
                      </span>
                    ) : (
                      <span className="text-gray-400 font-oswald flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" /> Locked
                      </span>
                    )}
                  </div>

                  <div className="w-full h-3 bg-gray-200 border border-gray-300 overflow-hidden">
                    <div
                      className={`h-full ${
                        stage.unlocked ? "bg-gradient-to-r from-[#004D98] to-[#A50044]" : "bg-gray-300"
                      }`}
                      style={{ width: `${stage.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Detailed Skill Radar & Metrics */}
          <div className="bg-white border-2 border-[#001E42] p-6 shadow-xl space-y-5">
            <div className="border-b border-gray-200 pb-3">
              <span className="font-oswald text-xs font-bold text-[#004D98] uppercase tracking-widest block">
                SKILL COMPETENCY METRICS
              </span>
              <h3 className="font-oswald text-xl font-bold text-[#001E42] mt-1">
                رادار تقييم المهارات التكتيكية
              </h3>
            </div>

            <div className="space-y-4">
              {SKILL_METRICS.map((skill) => (
                <div key={skill.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-cairo">
                    <div>
                      <span className="font-bold text-[#001E42]">{skill.nameAr}</span>
                      <span className="text-[10px] text-gray-500 font-oswald ml-2">({skill.name})</span>
                    </div>
                    <span className="font-oswald font-bold text-[#004D98] text-sm">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="w-full h-3 bg-gray-200 border border-gray-300">
                    <div
                      className="h-full bg-[#004D98]"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final Certification Project Banner */}
        <section className="bg-[#001E42] text-white p-6 sm:p-8 border-2 border-[#EDBB00] shadow-2xl space-y-3">
          <div className="flex items-center gap-2 text-[#EDBB00] font-oswald font-bold text-xs uppercase tracking-widest">
            <Award className="w-5 h-5 text-[#EDBB00]" />
            FINAL ACADEMY CERTIFICATION
          </div>
          <h3 className="font-oswald text-2xl font-bold">
            مشروع الترخيص الفني والاعتماد النهائي (Final Project)
          </h3>
          <p className="text-sm text-gray-300 max-w-3xl leading-relaxed">
            عند إكمال المراحل الأربعة، سيتم فتح مشروع التحليل الفني الشامل لمباراة رسمية وحساب مؤشر الكفاءة التكتيكية (Football Analysis Competency Score) لإصدار الشهادة.
          </p>
        </section>
      </main>
    </div>
  );
}
