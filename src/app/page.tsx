"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HeaderScoreboard } from "@/components/HeaderScoreboard";
import { MiniPitchMap } from "@/components/MiniPitchMap";
import { MODULES_DATA, MONTHS_DATA } from "@/data/curriculumData";
import {
  BookOpen,
  Trophy,
  ArrowLeft,
  Play,
  ShieldAlert,
  Award,
  RefreshCw,
  Compass,
  Search,
  Activity,
  Cpu,
  Database
} from "lucide-react";

export default function HomePage() {
  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>([]);
  const [currentModuleId, setCurrentModuleId] = useState<string>("m1-mod-1");
  const [activeMonthId, setActiveMonthId] = useState<number>(1);
  const [isDbSynced, setIsDbSynced] = useState<boolean>(false);

  // Load progress from Neon DB & localStorage on client side
  useEffect(() => {
    // 1. Load from localStorage immediately for fast display
    const savedProgress = localStorage.getItem("fcb_completed_modules");
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        if (Array.isArray(parsed)) {
          setCompletedModuleIds(parsed);
          const firstUncompleted = MODULES_DATA.find((m) => !parsed.includes(m.id));
          if (firstUncompleted) {
            setCurrentModuleId(firstUncompleted.id);
            setActiveMonthId(firstUncompleted.monthId);
          }
        }
      } catch (e) {
        console.error("Failed to parse local progress", e);
      }
    }

    // 2. Fetch from Neon Postgres Cloud DB
    fetch("/api/progress")
      .then((res) => res.json())
      .then((data) => {
        if (data.completedModules && Array.isArray(data.completedModules)) {
          setCompletedModuleIds(data.completedModules);
          localStorage.setItem("fcb_completed_modules", JSON.stringify(data.completedModules));
          setIsDbSynced(true);
          const firstUncompleted = MODULES_DATA.find((m) => !data.completedModules.includes(m.id));
          if (firstUncompleted) {
            setCurrentModuleId(firstUncompleted.id);
            setActiveMonthId(firstUncompleted.monthId);
          }
        }
      })
      .catch((err) => console.error("Neon DB Sync Error:", err));
  }, []);

  const totalModules = MODULES_DATA.length;
  const completedCount = completedModuleIds.length;
  const masteryPercentage = Math.round((completedCount / totalModules) * 100);

  const resetProgress = () => {
    if (confirm("هل تريد إعادة ضبط تقدم الدراسة والبدء من جديد؟")) {
      localStorage.removeItem("fcb_completed_modules");
      setCompletedModuleIds([]);
      setCurrentModuleId("m1-mod-1");
      setActiveMonthId(1);
      // Reset in DB
      fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completedModules: [] }),
      }).catch((e) => console.error("DB reset error", e));
    }
  };

  const activeMonthModules = MODULES_DATA.filter((m) => m.monthId === activeMonthId);

  const getMonthIcon = (iconName: string) => {
    switch (iconName) {
      case "Compass": return <Compass className="w-5 h-5 text-[#004D98]" />;
      case "Search": return <Search className="w-5 h-5 text-[#A50044]" />;
      case "Activity": return <Activity className="w-5 h-5 text-emerald-600" />;
      case "Cpu": return <Cpu className="w-5 h-5 text-[#EDBB00]" />;
      default: return <Compass className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1A1A1A] pb-16">
      {/* Header Scoreboard */}
      <HeaderScoreboard
        completedCount={completedCount}
        totalModules={totalModules}
        masteryPercentage={masteryPercentage}
      />

      <main className="max-w-6xl mx-auto px-4 pt-6 space-y-8">
        {/* Banner Section */}
        <section className="bg-white border border-[#1A1A1A]/10 p-6 shadow-sm blaugrana-stripe-top relative">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#A50044] text-white px-2 py-0.5 text-xs font-oswald tracking-widest uppercase flex items-center gap-1">
                  <Database className="w-3 h-3 text-[#EDBB00]" />
                  مربوط بـ Neon PostgreSQL
                </span>
                <span className="text-xs text-[#004D98] font-bold font-oswald">
                  FC Barcelona Tactical Master Program
                </span>
              </div>
              <h2 className="font-oswald text-2xl sm:text-3xl font-bold text-[#00366F]">
                برنامج المنهجية والتحليل التكتيكي الكامل
              </h2>
              <p className="text-sm text-gray-700 mt-1 max-w-3xl leading-relaxed">
                منهج متكامل يغطي 4 أشهر دراسية شاملة. تم دمج قاعدة بيانات **Neon PostgreSQL** للحفظ والتتبع السحابي المباشر لنتائج الامتحانات والتقدم الدراسي.
              </p>
            </div>

            <button
              onClick={resetProgress}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-oswald text-gray-600 border border-gray-300 hover:bg-gray-100 hover:text-red-700 transition-colors shrink-0"
              title="إعادة ضبط الحفظ"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              إعادة ضبط التقدم
            </button>
          </div>
        </section>

        {/* Month Selector Tabs */}
        <section className="space-y-3">
          <div className="flex items-center justify-between border-b-2 border-[#004D98] pb-2">
            <h3 className="font-oswald text-xl font-bold uppercase text-[#00366F] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#A50044]" />
              أشهر البرنامج الدراسي (4 Months)
            </h3>
            <span className="text-xs text-gray-500 font-sans flex items-center gap-1">
              {isDbSynced ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <Database className="w-3.5 h-3.5 text-emerald-600" />
                  متصل بقاعدة البيانات
                </span>
              ) : (
                "اختر الشهر لاستعراض الوحدات"
              )}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {MONTHS_DATA.map((month) => {
              const isActive = month.id === activeMonthId;
              const monthModules = MODULES_DATA.filter((m) => m.monthId === month.id);
              const completedInMonth = monthModules.filter((m) => completedModuleIds.includes(m.id)).length;

              return (
                <button
                  key={month.id}
                  onClick={() => setActiveMonthId(month.id)}
                  className={`p-4 text-right border transition-all flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? "bg-white border-[#004D98] ring-2 ring-[#004D98] shadow-md blaugrana-stripe-top"
                      : "bg-white/70 border-gray-300 hover:bg-white hover:border-gray-400"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-1.5 bg-[#F7F5F0]">
                        {getMonthIcon(month.iconName)}
                      </div>
                      <span className="font-oswald text-xs font-bold text-[#A50044]">
                        الشهر 0{month.id}
                      </span>
                    </div>

                    <h4 className="font-oswald text-base font-bold text-[#1A1A1A] mb-1">
                      {month.title.split(":")[1] || month.title}
                    </h4>
                    <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                      {month.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-gray-200 flex items-center justify-between text-[11px] font-oswald">
                    <span className="text-gray-500">التقدم:</span>
                    <span className="font-bold text-[#004D98]">
                      {completedInMonth} / {monthModules.length} مكتمل
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Signature Element: Mini Pitch Progress Map for Active Month */}
        <section className="space-y-2">
          <MiniPitchMap
            modules={activeMonthModules}
            completedModuleIds={completedModuleIds}
            currentModuleId={currentModuleId}
            onSelectModule={(id) => setCurrentModuleId(id)}
          />
        </section>

        {/* Curriculum Modules Cards List for Active Month */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-300 pb-2">
            <h3 className="font-oswald text-lg font-bold uppercase text-[#00366F] flex items-center gap-2">
              وحدات ومقالات الشهر 0{activeMonthId} ({activeMonthModules.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeMonthModules.map((module) => {
              const isCompleted = completedModuleIds.includes(module.id);
              const isActive = module.id === currentModuleId;

              return (
                <div
                  key={module.id}
                  className={`blaugrana-card p-6 flex flex-col justify-between relative transition-all ${
                    isActive ? "blaugrana-stripe-top border-[#004D98] ring-1 ring-[#004D98]" : ""
                  }`}
                >
                  {/* Module Header Info */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="scoreboard-num text-3xl text-[#004D98]">
                        {module.numberStr}
                      </span>
                      <span
                        className={`text-xs font-oswald font-bold px-2 py-0.5 border ${
                          isCompleted
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                            : isActive
                            ? "bg-[#A50044] text-white border-[#A50044]"
                            : "bg-gray-100 text-gray-600 border-gray-300"
                        }`}
                      >
                        {isCompleted ? "مكتملة ✓" : isActive ? "الوحدة الحالية" : "قادمة"}
                      </span>
                    </div>

                    <h4 className="font-oswald text-xl font-bold text-[#1A1A1A] mb-1">
                      {module.title}
                    </h4>
                    <p className="text-xs text-[#A50044] font-oswald uppercase tracking-wider mb-3">
                      {module.subtitle} — [{module.positionRole}]
                    </p>

                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      {module.summary}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
                    <Link
                      href={`/lesson/${module.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[#004D98] hover:bg-[#00366F] text-white px-4 py-2.5 text-xs font-oswald uppercase font-bold tracking-wider transition-colors text-center"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      بدء الدراسة
                    </Link>

                    <Link
                      href={`/exam/${module.id}`}
                      className="inline-flex items-center justify-center gap-1.5 bg-[#A50044] hover:bg-[#7A0032] text-white px-4 py-2.5 text-xs font-oswald uppercase font-bold tracking-wider transition-colors"
                    >
                      <Award className="w-3.5 h-3.5" />
                      الامتحان
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer Concept Note */}
        <footer className="pt-8 border-t border-gray-300 text-center text-xs text-gray-500 space-y-1">
          <p className="font-oswald tracking-wider uppercase text-gray-700">
            أداة تعلم منهجية برشلونة الشخصية — Pitch & Pedagogy Master Program
          </p>
          <p>
            تطبيق تعليمي متصل بقاعدة بيانات Neon PostgreSQL السحابية.
          </p>
        </footer>
      </main>
    </div>
  );
}
