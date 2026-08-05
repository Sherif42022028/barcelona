"use client";

import React from "react";
import Link from "next/link";
import { domainService } from "@/lib/domain/service";
import {
  FileText,
  Brain,
  Compass,
  BookOpen,
  HelpCircle,
  Award,
  Shield,
  Activity,
  AlertTriangle,
  PlusCircle,
  CheckCircle2
} from "lucide-react";

export default function AdminOverviewPage() {
  const documents = domainService.getSourceDocuments();
  const knowledge = domainService.getKnowledgeList();
  const modules = domainService.getModules();
  const lessons = domainService.getLessons();
  const scenarios = domainService.getTacticalScenarios();
  const questions = domainService.getQuestions();
  const assessments = domainService.getAssessments();

  const unresolvedCount = knowledge.filter((k) => k.type === "UNRESOLVED_MODEL").length;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Admin Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-oswald text-[#EDBB00] font-bold uppercase tracking-widest px-3 py-1 bg-[#004D98]/30 rounded-full border border-[#EDBB00]/30">
              BARÇA METHODOLOGY ADMIN CMS
            </span>
          </div>
          <Link
            href="/"
            className="text-xs font-cairo text-[#38BDF8] hover:underline"
          >
            ← العودة لواجهة الطالب
          </Link>
        </div>

        <h1 className="font-oswald text-2xl sm:text-4xl font-bold text-white tracking-wide">
          مركز تحكم المحتوى والمنهجية التعليمية
        </h1>
        <p className="text-sm font-cairo text-slate-300 max-w-3xl">
          إدارة خط معالجة المستندات، المعرفة الموثوقة، المنهج، بنك الأسئلة، والتقييمات وفق قواعد التوثيق والمراجعة.
        </p>
      </div>

      {/* Admin Navigation Hub Bar */}
      <div className="flex flex-wrap items-center gap-2 p-2 glass-panel rounded-2xl border border-white/10 font-oswald text-xs uppercase tracking-wider">
        <Link
          href="/admin"
          className="px-4 py-2 rounded-xl bg-[#004D98] text-white font-bold border border-[#38BDF8]"
        >
          OVERVIEW
        </Link>
        <Link
          href="/admin/documents"
          className="px-4 py-2 rounded-xl bg-slate-900/60 text-slate-300 hover:text-white hover:bg-white/5 border border-white/10"
        >
          DOCUMENTS ({documents.length})
        </Link>
        <Link
          href="/admin/knowledge"
          className="px-4 py-2 rounded-xl bg-slate-900/60 text-slate-300 hover:text-white hover:bg-white/5 border border-white/10"
        >
          KNOWLEDGE ({knowledge.length})
        </Link>
        <Link
          href="/admin/curriculum"
          className="px-4 py-2 rounded-xl bg-slate-900/60 text-slate-300 hover:text-white hover:bg-white/5 border border-white/10"
        >
          CURRICULUM ({modules.length} MODS)
        </Link>
        <Link
          href="/admin/questions"
          className="px-4 py-2 rounded-xl bg-slate-900/60 text-slate-300 hover:text-white hover:bg-white/5 border border-white/10"
        >
          QUESTION BANK ({questions.length})
        </Link>
        <Link
          href="/admin/assessments"
          className="px-4 py-2 rounded-xl bg-slate-900/60 text-slate-300 hover:text-white hover:bg-white/5 border border-white/10"
        >
          ASSESSMENTS ({assessments.length})
        </Link>
      </div>

      {/* Content Pipeline Status Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="glass-card p-4 rounded-xl border border-white/10 text-right space-y-1">
          <div className="text-[11px] font-cairo text-slate-400">Documents</div>
          <div className="font-oswald text-2xl font-bold text-white">{documents.length}</div>
          <div className="text-[10px] text-emerald-400 font-cairo">Processed</div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-white/10 text-right space-y-1">
          <div className="text-[11px] font-cairo text-slate-400">Knowledge Base</div>
          <div className="font-oswald text-2xl font-bold text-[#38BDF8]">{knowledge.length}</div>
          <div className="text-[10px] text-slate-400 font-cairo">Objects</div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-white/10 text-right space-y-1">
          <div className="text-[11px] font-cairo text-slate-400">Curriculum Modules</div>
          <div className="font-oswald text-2xl font-bold text-[#EDBB00]">{modules.length}</div>
          <div className="text-[10px] text-slate-400 font-cairo">4 Stages</div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-white/10 text-right space-y-1">
          <div className="text-[11px] font-cairo text-slate-400">Tactical Scenarios</div>
          <div className="font-oswald text-2xl font-bold text-emerald-400">{scenarios.length}</div>
          <div className="text-[10px] text-slate-400 font-cairo">Scenarios</div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-white/10 text-right space-y-1">
          <div className="text-[11px] font-cairo text-slate-400">Question Bank</div>
          <div className="font-oswald text-2xl font-bold text-amber-400">{questions.length}</div>
          <div className="text-[10px] text-slate-400 font-cairo">Approved</div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-white/10 text-right space-y-1">
          <div className="text-[11px] font-cairo text-slate-400">Unresolved Models</div>
          <div className="font-oswald text-2xl font-bold text-rose-400">{unresolvedCount}</div>
          <div className="text-[10px] text-rose-400 font-cairo">Needs Review</div>
        </div>
      </div>

      {/* Action Required Panel */}
      {unresolvedCount > 0 && (
        <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/50 space-y-3 font-cairo text-xs text-amber-200">
          <div className="flex items-center gap-2 font-oswald text-sm font-bold text-amber-400 uppercase tracking-wider">
            <AlertTriangle className="w-5 h-5" />
            <span>ACTION REQUIRED: UNRESOLVED SOURCE MODEL DETECTED</span>
          </div>
          <p className="leading-relaxed">
            There is 1 unresolved model in Module 4 documentation requiring expert classification. Do not invent a name; mark as <strong>UNRESOLVED MODEL</strong> until source evidence is reviewed.
          </p>
          <Link
            href="/admin/knowledge"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-oswald font-bold text-xs uppercase"
          >
            REVIEW KNOWLEDGE CANDIDATES
          </Link>
        </div>
      )}
    </main>
  );
}
