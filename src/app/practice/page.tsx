"use client";

import React, { useState } from "react";
import { domainService } from "@/lib/domain/service";
import { TacticalEngine } from "@/components/domain/TacticalEngine";
import { Activity, CheckCircle2, ChevronRight } from "lucide-react";

export default function PracticeWorkspacePage() {
  const scenarios = domainService.getTacticalScenarios();
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    scenarios[0]?.id || "scen-101-1"
  );

  const scenario = domainService.getTacticalScenarioById(selectedScenarioId) || scenarios[0];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-oswald text-[#EDBB00] font-bold uppercase tracking-widest px-3 py-1 bg-[#004D98]/30 rounded-full border border-[#EDBB00]/30">
            BARÇA TACTICAL PRACTICE WORKSPACE
          </span>
        </div>
        <h1 className="font-oswald text-2xl sm:text-4xl font-bold text-white tracking-wide">
          مركز التدريب الميداني التفاعلي
        </h1>
        <p className="text-sm font-cairo text-slate-300 max-w-3xl">
          تدريب عملي تفاعلي على المواقف التكتيكية الأساسية لبناء اللعب، الساليادا لافولبيانا، والرجل الثالث.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scenario List Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <div className="font-oswald text-xs text-slate-300 uppercase tracking-wider">
            AVAILABLE PRACTICE SCENARIOS ({scenarios.length})
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
                  <div className="font-bold text-sm text-white font-oswald">
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

        {/* Tactical Canvas Workspace */}
        <div className="lg:col-span-8">
          <TacticalEngine scenario={scenario} mode="PRACTICE" />
        </div>
      </div>
    </main>
  );
}
