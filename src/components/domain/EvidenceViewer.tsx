"use client";

import React from "react";
import { SourceEvidence } from "@/lib/domain/types";
import { FileText, ExternalLink, ShieldCheck, Bookmark } from "lucide-react";

interface EvidenceViewerProps {
  evidences: SourceEvidence[];
  className?: string;
}

export const EvidenceViewer: React.FC<EvidenceViewerProps> = ({
  evidences,
  className = ""
}) => {
  if (!evidences || evidences.length === 0) {
    return (
      <div className="p-4 bg-slate-900/60 border border-white/10 rounded-xl text-xs font-cairo text-slate-400">
        لا توجد أدلة توثيقية مباشرة مرابطة (No Source Evidence Linked).
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-2 text-xs font-oswald text-[#38BDF8] uppercase tracking-wider font-bold">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>SOURCE EVIDENCE & TRACEABILITY (أدلة التوثيق المنهجية)</span>
      </div>

      <div className="space-y-2">
        {evidences.map((ev) => (
          <div
            key={ev.id}
            className="glass-card p-3.5 border border-white/10 rounded-xl space-y-2 font-cairo text-xs leading-relaxed hover:border-white/20 transition-all"
          >
            <div className="flex items-center justify-between gap-2 text-slate-300 font-bold border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-[#EDBB00]" />
                <span>{ev.documentTitle}</span>
              </div>
              {ev.pageNumber && (
                <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-slate-200">
                  Page {ev.pageNumber}
                </span>
              )}
            </div>

            <p className="text-slate-300 italic bg-black/40 p-2.5 rounded-lg border border-white/5 font-serif text-[11px] leading-relaxed">
              "{ev.excerpt}"
            </p>

            {ev.sectionTitle && (
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                <Bookmark className="w-3 h-3 text-[#38BDF8]" />
                <span>Section: {ev.sectionTitle}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
