"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { HeaderScoreboard } from "@/components/HeaderScoreboard";
import { TacticalPitchBoard, PitchPlayer } from "@/components/TacticalPitchBoard";
import { Grid, CheckCircle2, ArrowRight } from "lucide-react";

interface PositionDetail {
  id: string;
  roleName: string;
  roleAr: string;
  roleDescription: string;
  keyPrinciples: string[];
  relationships: string;
  movements: string;
}

const POSITIONS_DATA: Record<string, PositionDetail> = {
  gk: {
    id: "gk",
    roleName: "GK - Goalkeeper",
    roleAr: "حارس المرمى المنشئ للبناء",
    roleDescription: "اللاعب رقم 11 الذي يخلق التفوق العددي الأول في البناء، ويمنح قلبي الدفاع خيار التراجع الآمن.",
    keyPrinciples: [
      "التمركز داخل منطقة الجزاء لتوسيع مساحة ضغط المهاجمين.",
      "التريث وتحديد التمريرة القطرية أو العمودية السليمة.",
      "التواصل مع الارتكاز لإتاحة خيار الرجل الثالث."
    ],
    relationships: "مرتبط مباشرة بقلبي الدفاع (CBs) والارتكاز (Pivote).",
    movements: "تحرك عرضي داخل منطقة الجزاء لمتابعة مسار الكرة والتفوق."
  },
  cb1: {
    id: "cb1",
    roleName: "CB - Left Centre Back",
    roleAr: "قلب الدفاع الأيسر",
    roleDescription: "مسؤول عن توجيه البناء نحو التماس الأيسر أو ضرب خط الضغط عبر كسر الخط ببطاقة عمودية.",
    keyPrinciples: [
      "التوسع نحو خط التماس في البناء الثلاثي.",
      "تثبيت المهاجم (Fixing) قبل التمرير.",
      "التغطية الوقائية Rest Defense عند هجوم الفريق."
    ],
    relationships: "مرتبط بالظهير الأيسر (LB) والارتكاز (Pivote) والحارس (GK).",
    movements: "توسع أفقياً نحو التماس وصعود طفيف للـ Zone B."
  },
  cdm: {
    id: "cdm",
    roleName: "Pivote - Central Defensive Midfielder",
    roleAr: "ارتكاز المحور التكتيكي",
    roleDescription: "بوصلة الفريق والـ Brain في ربط خط الدفاع بخط الوسط، وتطبيق النزول في الـ Salida Lavolpiana.",
    keyPrinciples: [
      "الاستلام بوضعية الجسد المفتوحة 45 درجة.",
      "النزول بين قلبي الدفاع (Lavolpiana) في حالة الضغط بمهاجمين.",
      "تطبيق La Pausa للتريث وتوليد المساحة بين الخطوط."
    ],
    relationships: "مرتبط بقلبي الدفاع (CBs) ولاعبي الوسط الداخليين (Interiors).",
    movements: "نزول رأسي وصعود قطري بحسب زاوية حامل الكرة."
  }
};

export default function InteractivePitchPage() {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>("cdm");

  const pitchPlayers: PitchPlayer[] = [
    { id: "gk", role: "GK", x: 50, y: 88, team: "home", label: "GK", highlighted: selectedPlayerId === "gk" },
    { id: "cb1", role: "CB", x: 32, y: 72, team: "home", label: "CB الأيسر", highlighted: selectedPlayerId === "cb1" },
    { id: "cb2", role: "CB", x: 68, y: 72, team: "home", label: "CB الأيمن" },
    { id: "cdm", role: "DM", x: 50, y: 55, team: "home", label: "Pivote", highlighted: selectedPlayerId === "cdm" },
    { id: "lb", role: "LB", x: 12, y: 48, team: "home", label: "LB" },
    { id: "rb", role: "RB", x: 88, y: 48, team: "home", label: "RB" }
  ];

  const currentDetail = POSITIONS_DATA[selectedPlayerId] || POSITIONS_DATA["cdm"];

  return (
    <div className="min-h-screen text-[#F8FAFC] pb-24 font-cairo">
      <Navbar />
      <HeaderScoreboard />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Title Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Grid className="w-5 h-5 text-[#E11D48]" />
              <span className="font-oswald text-xs font-bold text-[#E11D48] uppercase tracking-widest">
                INTERACTIVE EXPERIENTIAL TOOL
              </span>
            </div>
            <h2 className="font-oswald text-3xl font-bold text-white uppercase">
              INTERACTIVE PITCH (أداة الملعب التفاعلي المخصصة)
            </h2>
          </div>
          <span className="text-xs text-[#94A3B8] font-sans hidden sm:block">
            اضغط على أي مركز أو لاعب للاطلاع على الأدوار والعلاقات التموقعية
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pitch Board */}
          <div className="lg:col-span-2 space-y-2">
            <TacticalPitchBoard
              players={pitchPlayers}
              ballPosition={{ x: 50, y: 55 }}
              interactive={true}
              selectedPlayerId={selectedPlayerId}
              onPlayerClick={(id) => setSelectedPlayerId(id)}
            />
            <p className="text-xs text-center text-[#94A3B8] font-cairo">
              انقر على أي لاعب على الملعب لتغيير التحليل والمستند المباشر
            </p>
          </div>

          {/* Selected Position Details */}
          <div className="glass-card p-6 glass-card-accent shadow-2xl space-y-5">
            <div className="border-b border-white/10 pb-3">
              <span className="font-oswald text-xs font-bold text-[#E11D48] uppercase tracking-widest block">
                SELECTED POSITION
              </span>
              <h3 className="font-oswald text-2xl font-bold text-white">
                {currentDetail.roleName}
              </h3>
              <p className="text-xs font-bold text-[#38BDF8]">
                {currentDetail.roleAr}
              </p>
            </div>

            <p className="text-sm text-[#94A3B8] leading-relaxed">
              {currentDetail.roleDescription}
            </p>

            {/* Principles */}
            <div className="space-y-2">
              <span className="font-oswald text-xs font-bold text-white uppercase block">
                Key Principles (القواعد الرئيسية):
              </span>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {currentDetail.keyPrinciples.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Relationships & Movements */}
            <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
              <div>
                <strong className="text-[#38BDF8] block">العلاقات التموقعية (Relationships):</strong>
                <p className="text-[#94A3B8]">{currentDetail.relationships}</p>
              </div>
              <div>
                <strong className="text-[#E11D48] block">الحركة التكتيكية (Movements):</strong>
                <p className="text-[#94A3B8]">{currentDetail.movements}</p>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/learn/path"
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#004D98] to-[#002D5E] hover:from-[#002D5E] hover:to-[#004D98] text-white py-3 rounded-xl text-xs font-oswald uppercase font-bold tracking-wider transition-all shadow-lg border border-blue-400/30"
              >
                Explore Related Lessons ➔
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
