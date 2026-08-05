"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HeaderScoreboard } from "@/components/HeaderScoreboard";
import { MiniPitchMap } from "@/components/MiniPitchMap";
import { FCBLogo } from "@/components/FCBLogo";
import { MODULES_DATA, MONTHS_DATA } from "@/data/curriculumData";
import {
  BookOpen,
  Play,
  Award,
  RefreshCw,
  Compass,
  Search,
  Activity,
  Cpu,
  Database,
  Sparkles
} from "lucide-react";

export default function HomePage() {
  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>([]);
  const [currentModuleId, setCurrentModuleId] = useState<string>("m1-mod-1");
  const [activeMonthId, setActiveMonthId] = useState<number>(1);
  const [isDbSynced, setIsDbSynced] = useState<boolean>(false);

  useEffect(() => {
    // 1. Load local progress
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
        console.error("Local storage parse error", e);
      }
    }

    // 2. Load Neon DB progress
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
    <div className="min-h-screen bg-[#F8F6F0] text-[#121820] pb-20 font-cairo">
      {/* Header Scoreboard */}
      <HeaderScoreboard
        completedCount={completedCount}
        totalModules={totalModules}
        masteryPercentage={masteryPercentage}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-10">
        {/* Main Hero Banner */}
        <section className="bg-white border-2 border-[#001E42] p-6 sm:p-8 shadow-xl blaugrana-card-accent relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="bg-[#A50044] text-[#EDBB00] px-3 py-1 text-xs font-oswald font-bold tracking-widest uppercase border border-[#EDBB00]">
                  الأكاديمية التكتيكية الرسمية
                </span>
                <span className="text-xs font-oswald text-[#004D98] font-bold">
                  Juego de Posición Masterclass
                </span>
              </div>
              <h2 className="font-oswald text-3xl sm:text-4xl font-bold text-[#001E42] uppercase leading-tight">
                منهجية برشلونة للعب الموضعي والتحليل التكتيكي
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                برنامج تعليمي متكامل يمتد لـ 4 أشهر دراسية: من أساسيات بناء الهجمة من الخلف وخلق التفوق العددي، وصولاً لتحليل الخصوم والتحليل المباشر واستخدام التكنولوجيا التدريبية.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 shrink-0">
              <FCBLogo size={90} className="hover:rotate-3 transition-transform" />
              <button
                onClick={resetProgress}
                className="flex items-center gap-2 px-4 py-2 text-xs font-oswald font-bold text-gray-700 bg-gray-100 border border-gray-300 hover:bg-[#A50044] hover:text-white transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                إعادة ضبط التقدم
              </button>
            </div>
          </div>
        </section>

        {/* 4-Month Academy Tabs */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b-4 border-[#004D98] pb-2">
            <h3 className="font-oswald text-2xl font-bold uppercase text-[#001E42] flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-[#A50044]" />
              أشهر البرنامج الدراسي (4 Months Academy)
            </h3>
            {isDbSynced && (
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-3 py-1 border border-emerald-300">
                <Database className="w-4 h-4 text-emerald-600" />
                متصل بالسحابة (Neon Postgres)
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MONTHS_DATA.map((month) => {
              const isActive = month.id === activeMonthId;
              const monthModules = MODULES_DATA.filter((m) => m.monthId === month.id);
              const completedInMonth = monthModules.filter((m) => completedModuleIds.includes(m.id)).length;

              return (
                <button
                  key={month.id}
                  onClick={() => setActiveMonthId(month.id)}
                  className={`p-5 text-right border-2 transition-all flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? "bg-white border-[#004D98] shadow-lg blaugrana-card-accent ring-2 ring-[#004D98]"
                      : "bg-white/80 border-gray-300 hover:border-[#004D98] hover:bg-white"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-[#F8F6F0] border border-gray-200">
                        {getMonthIcon(month.iconName)}
                      </div>
                      <span className="font-oswald text-xs font-bold text-[#A50044] px-2 py-0.5 bg-red-50 border border-red-200">
                        الشهر 0{month.id}
                      </span>
                    </div>

                    <h4 className="font-oswald text-lg font-bold text-[#001E42]">
                      {month.title.split(":")[1] || month.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                      {month.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-xs font-oswald font-bold">
                    <span className="text-gray-500">إتمام الشهر:</span>
                    <span className="text-[#004D98] font-bold">
                      {completedInMonth} / {monthModules.length} وحدة
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Mini Pitch Progress Map for Active Month */}
        <section className="space-y-3">
          <MiniPitchMap
            modules={activeMonthModules}
            completedModuleIds={completedModuleIds}
            currentModuleId={currentModuleId}
            onSelectModule={(id) => setCurrentModuleId(id)}
          />
        </section>

        {/* Modules Grid for Active Month */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b-2 border-[#A50044] pb-2">
            <h3 className="font-oswald text-xl font-bold uppercase text-[#001E42]">
              دروس ومواضيع الشهر 0{activeMonthId} ({activeMonthModules.length} وحدات)
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeMonthModules.map((module) => {
              const isCompleted = completedModuleIds.includes(module.id);
              const isActive = module.id === currentModuleId;

              return (
                <div
                  key={module.id}
                  className={`bg-white border-2 p-6 flex flex-col justify-between relative shadow-md transition-all ${
                    isActive
                      ? "blaugrana-card-accent border-[#004D98] ring-2 ring-[#004D98]"
                      : "border-gray-300 hover:border-[#004D98]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="scoreboard-number text-4xl text-[#004D98]">
                        {module.numberStr}
                      </span>
                      <span
                        className={`text-xs font-oswald font-bold px-3 py-1 border ${
                          isCompleted
                            ? "bg-emerald-50 text-emerald-800 border-emerald-400"
                            : isActive
                            ? "bg-[#A50044] text-white border-[#A50044]"
                            : "bg-gray-100 text-gray-700 border-gray-300"
                        }`}
                      >
                        {isCompleted ? "مكتملة ✓" : isActive ? "الوحدة الحالية" : "قادمة"}
                      </span>
                    </div>

                    <h4 className="font-oswald text-2xl font-bold text-[#121820] mb-1">
                      {module.title}
                    </h4>
                    <p className="text-xs text-[#A50044] font-oswald uppercase font-bold tracking-wider mb-3">
                      {module.subtitle} — [{module.positionRole}]
                    </p>

                    <p className="text-sm text-gray-700 leading-relaxed mb-6">
                      {module.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
                    <Link
                      href={`/lesson/${module.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[#004D98] hover:bg-[#002D5E] text-white px-5 py-3 text-sm font-oswald uppercase font-bold tracking-wider transition-colors text-center shadow-md"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      بدء الدراسة
                    </Link>

                    <Link
                      href={`/exam/${module.id}`}
                      className="inline-flex items-center justify-center gap-2 bg-[#A50044] hover:bg-[#70002E] text-white px-5 py-3 text-sm font-oswald uppercase font-bold tracking-wider transition-colors shadow-md"
                    >
                      <Award className="w-4 h-4" />
                      الامتحان
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-10 border-t-2 border-gray-300 text-center text-xs text-gray-600 space-y-2">
          <div className="flex justify-center mb-2">
            <FCBLogo size={40} />
          </div>
          <p className="font-oswald tracking-widest uppercase font-bold text-[#001E42]">
            FC BARCELONA METHODOLOGY ACADEMY — PITCH & PEDAGOGY SYSTEM
          </p>
          <p>
            تطبيق تعليمي متكامل للتعلم الذاتي والتحليل التكتيكي للعب الموضعي بأسلوب FC Barcelona.
          </p>
        </footer>
      </main>
    </div>
  );
}
