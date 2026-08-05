"use client";

import React, { useEffect, use } from "react";
import Link from "next/link";
import { useSearchParams, notFound } from "next/navigation";
import { HeaderScoreboard } from "@/components/HeaderScoreboard";
import { MODULES_DATA } from "@/data/curriculumData";
import confetti from "canvas-confetti";
import { Trophy, RefreshCw, ShieldCheck, Database } from "lucide-react";

interface ResultPageProps {
  params: Promise<{
    moduleId: string;
  }>;
}

export default function ResultPage({ params }: ResultPageProps) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const scoreStr = searchParams.get("score") || "0";
  const score = parseInt(scoreStr, 10);

  const moduleData = MODULES_DATA.find((m) => m.id === resolvedParams.moduleId);

  if (!moduleData) {
    notFound();
  }

  const isPassed = score >= 50;

  useEffect(() => {
    // Record exam score in Neon Database
    fetch("/api/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        moduleId: moduleData.id,
        score,
        passed: isPassed,
      }),
    }).catch((e) => console.error("Failed to sync score to DB", e));

    if (isPassed) {
      // Trigger Gold Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#EDBB00", "#004D98", "#A50044"],
      });

      // Save progress to localStorage & Neon DB
      try {
        const saved = localStorage.getItem("fcb_completed_modules");
        let completed: string[] = [];
        if (saved) {
          completed = JSON.parse(saved);
        }
        if (!completed.includes(moduleData.id)) {
          completed.push(moduleData.id);
          localStorage.setItem("fcb_completed_modules", JSON.stringify(completed));

          // Sync to Neon Postgres
          fetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completedModules: completed }),
          }).catch((e) => console.error("Failed to sync progress to DB", e));
        }
      } catch (e) {
        console.error("Failed to update progress", e);
      }
    }
  }, [isPassed, moduleData.id, score]);

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1A1A1A] pb-16">
      <HeaderScoreboard completedCount={1} totalModules={16} masteryPercentage={score} />

      <main className="max-w-3xl mx-auto px-4 pt-10 space-y-8 text-center">
        {/* Scoreboard Result Banner */}
        <section className="bg-white border border-[#1A1A1A]/10 p-8 md:p-12 blaugrana-stripe-top shadow-md space-y-6">
          {/* Trophy Badge */}
          <div className="flex justify-center">
            {isPassed ? (
              <div className="w-20 h-20 bg-[#EDBB00]/15 border-2 border-[#EDBB00] flex items-center justify-center shadow-inner">
                <Trophy className="w-10 h-10 text-[#EDBB00]" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-gray-100 border-2 border-gray-300 flex items-center justify-center">
                <RefreshCw className="w-10 h-10 text-gray-400" />
              </div>
            )}
          </div>

          <div>
            <span className="text-xs font-oswald text-[#004D98] uppercase font-bold tracking-widest block">
              نتيجة امتحان الوحدة {moduleData.numberStr}
            </span>
            <h2 className="font-oswald text-3xl font-bold text-[#1A1A1A] mt-1">
              {moduleData.title}
            </h2>
          </div>

          {/* Large Oswald Scoreboard Number */}
          <div className="bg-[#002650] py-6 border border-white/10 text-white max-w-sm mx-auto shadow-inner">
            <div className="text-xs text-blue-300 font-oswald uppercase tracking-wider mb-1">
              النتيجة النهائية على اللوحة
            </div>
            <div className="scoreboard-num text-6xl text-[#EDBB00]">
              {score}%
            </div>
            <div className="text-xs text-white/70 font-sans mt-2 flex items-center justify-center gap-1">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              تم حفظ النتيجة ومزامنة التقدم عبر Neon Database
            </div>
          </div>

          {/* Status Note */}
          <div className="max-w-md mx-auto text-sm leading-relaxed text-gray-700">
            {isPassed ? (
              <p className="flex items-center justify-center gap-2 text-emerald-800 font-semibold bg-emerald-50 p-3 border border-emerald-300">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                مبارك! تم إتقان الوحدة وتحديث موقع اللاعب على خريطة الملعب التكتيكية.
              </p>
            ) : (
              <p className="text-red-800 bg-red-50 p-3 border border-red-300">
                يمكنك إعادة مراجعة مفاهيم الدرس وإعادة خوض الامتحان لتحقيق النتيجة الكاملة.
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#004D98] hover:bg-[#00366F] text-white px-8 py-3.5 text-sm font-oswald uppercase font-bold tracking-widest transition-all shadow-md"
            >
              العودة لخريطة الملعب والتكتيك ➔
            </Link>

            {!isPassed && (
              <Link
                href={`/exam/${moduleData.id}`}
                className="inline-flex items-center justify-center gap-2 bg-[#A50044] hover:bg-[#7A0032] text-white px-6 py-3.5 text-sm font-oswald uppercase font-bold tracking-widest transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                إعادة الامتحان
              </Link>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
