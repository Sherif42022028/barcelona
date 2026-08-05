"use client";

import React, { useState } from "react";
import { domainService } from "@/lib/domain/service";
import { TacticalEngine } from "@/components/domain/TacticalEngine";
import { TacticalScenario } from "@/lib/domain/types";
import { Activity, Brain, Eye, CheckCircle2, ChevronRight } from "lucide-react";

export default function AnalysisLabPage() {
  const scenarios = domainService.getTacticalScenarios();
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    scenarios[0]?.id || "scen-101-1"
  );

  const scenario = domainService.getTacticalScenarioById(selectedScenarioId) || scenarios[0];
  const knowledgeObjects = scenario.knowledgeIds
    .map((kId) => domainService.getKnowledgeById(kId))
    .filter(Boolean);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#A50044]" />
          <span className="text-xs font-oswald text-[#38BDF8] font-bold uppercase tracking-widest px-3 py-1 bg-[#004D98]/30 rounded-full border border-[#004D98]">
            BARÇA TACTICAL ANALYSIS LAB
          </span>
        </div>
        <h1 className="font-oswald text-2xl sm:text-4xl font-bold text-white tracking-wide">
          مختبر التحليل التكتيكي وتتبع المواقف الميدانية
        </h1>
        <p className="text-sm font-cairo text-slate-300 max-w-3xl">
          مساحة عملية لربط المعرفة النظرية بالمواقف الميدانية، قياس القرارات التكتيكية، وتحليل خيارات البناء والتغطية.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Scenario Picker */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-card p-4 rounded-2xl border border-white/10 space-y-3">
            <h2 className="font-oswald text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              SELECT ANALYSIS SCENARIO
            </h2>

            <div className="space-y-2">
              {scenarios.map((scen) => {
                const isSelected = scen.id === selectedScenarioId;

                return (
                  <button
                    key={scen.id}
                    onClick={() => setSelectedScenarioId(scen.id)}
                    className={`w-full text-right p-3 rounded-xl border text-xs font-cairo transition-all cursor-pointer ${
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

          {/* Connected Knowledge Objects */}
          <div className="glass-card p-4 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-oswald text-[#EDBB00] font-bold">
              <Brain className="w-4 h-4 text-[#EDBB00]" />
              <span>LINKED KNOWLEDGE OBJECTS</span>
            </div>

            <div className="space-y-2">
              {knowledgeObjects.map((k) => (
                <div
                  key={k?.id}
                  className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs font-cairo space-y-1"
                >
                  <div className="font-bold text-white">{k?.title}</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {k?.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Analysis Workspace */}
        <div className="lg:col-span-8 space-y-6">
          <TacticalEngine scenario={scenario} mode="ANALYSIS" />
        </div>
      </div>
    </main>
  );
}
