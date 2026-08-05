"use client";

import React, { useState } from "react";
import Link from "next/link";
import { domainService } from "@/lib/domain/service";
import { TacticalEngine } from "@/components/domain/TacticalEngine";
import { Activity, Plus, CheckCircle2, Shield } from "lucide-react";

export default function AdminScenariosPage() {
  const scenarios = domainService.getTacticalScenarios();
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    scenarios[0]?.id || ""
  );

  const selectedScenario =
    scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-oswald text-[#EDBB00] font-bold uppercase tracking-widest px-3 py-1 bg-[#004D98]/30 rounded-full border border-[#EDBB00]/30">
              TACTICAL SCENARIO BUILDER & EDITOR
            </span>
          </div>
          <Link href="/admin" className="text-xs font-cairo text-[#38BDF8] hover:underline">
            ← العودة للأدمن
          </Link>
        </div>
        <h1 className="font-oswald text-2xl sm:text-4xl font-bold text-white tracking-wide">
          منشئ ومحرر السيناريوهات التكتيكية
        </h1>
        <p className="text-sm font-cairo text-slate-300 max-w-3xl">
          تصميم السيناريوهات التكتيكية الميدانية، تحديد مواضع اللاعبين والكرة والخيارات، ومعاينتها مباشرة.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scenarios List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="font-oswald text-xs text-slate-300 uppercase tracking-wider">
            CONFIGURED SCENARIOS ({scenarios.length})
          </div>

          <div className="space-y-2">
            {scenarios.map((scen) => {
              const isSelected = scen.id === selectedScenarioId;

              return (
                <button
                  key={scen.id}
                  onClick={() => setSelectedScenarioId(scen.id)}
                  className={`w-full text-right p-4 rounded-xl border text-xs font-cairo transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#004D98]/40 border-[#38BDF8] text-white shadow-lg"
                      : "bg-slate-900/60 border-white/10 text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <div className="font-bold text-sm text-white font-oswald truncate">
                    {scen.title}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {scen.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Scenario Preview */}
        <div className="lg:col-span-8 space-y-4">
          {selectedScenario && (
            <TacticalEngine scenario={selectedScenario} mode="PRACTICE" />
          )}
        </div>
      </div>
    </main>
  );
}
