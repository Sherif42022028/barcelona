"use client";

import React, { useState } from "react";
import Link from "next/link";
import { domainService } from "@/lib/domain/service";
import { SourceDocument } from "@/lib/domain/types";
import { FileText, Upload, CheckCircle2, Shield, Search, ExternalLink } from "lucide-react";

export default function AdminDocumentsPage() {
  const documents = domainService.getSourceDocuments();
  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0]?.id || "");
  const selectedDoc = documents.find((d) => d.id === selectedDocId) || documents[0];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#38BDF8]" />
            <span className="text-xs font-oswald text-[#EDBB00] font-bold uppercase tracking-widest px-3 py-1 bg-[#004D98]/30 rounded-full border border-[#EDBB00]/30">
              DOCUMENT MANAGEMENT & DOCLING INGESTION PIPELINE
            </span>
          </div>
          <Link href="/admin" className="text-xs font-cairo text-[#38BDF8] hover:underline">
            ← العودة للأدمن
          </Link>
        </div>
        <h1 className="font-oswald text-2xl sm:text-4xl font-bold text-white tracking-wide">
          إدارة الملفات المصدرية ومعالجة Docling
        </h1>
        <p className="text-sm font-cairo text-slate-300 max-w-3xl">
          رفع ومعاينة المستندات المنهجية الخام، مراجعة البنية المحولة، واستخراج كائنات المعرفة.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Document List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between font-oswald text-xs text-slate-300 uppercase tracking-wider">
            <span>METHODOLOGY SOURCE FILES ({documents.length})</span>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#004D98] hover:bg-[#004D98]/80 text-white font-bold cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>UPLOAD PDF</span>
            </button>
          </div>

          <div className="space-y-2">
            {documents.map((doc) => {
              const isSelected = doc.id === selectedDocId;

              return (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`w-full text-right p-4 rounded-xl border text-xs font-cairo transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#004D98]/40 border-[#38BDF8] text-white shadow-lg"
                      : "bg-slate-900/60 border-white/10 text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white truncate max-w-[220px]">
                      {doc.title}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono text-[10px] border border-emerald-500/30">
                      {doc.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span>{doc.filename}</span>
                    <span>{doc.pageCount} Pages</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Document Details */}
        <div className="lg:col-span-7 space-y-4">
          {selectedDoc && (
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4 text-xs font-cairo">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-[#38BDF8]">
                    ID: {selectedDoc.id}
                  </span>
                  <h2 className="font-oswald text-xl font-bold text-white">
                    {selectedDoc.title}
                  </h2>
                </div>
                <span className="px-3 py-1 rounded bg-[#004D98]/40 text-[#EDBB00] font-mono text-xs font-bold border border-[#EDBB00]/30">
                  {selectedDoc.fileType}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-slate-300">
                <div>
                  <span className="text-slate-400 block">Filename:</span>
                  <span className="font-mono text-white">{selectedDoc.filename}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Source:</span>
                  <span className="text-white">{selectedDoc.source}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Pages:</span>
                  <span className="font-mono text-white">{selectedDoc.pageCount} Pages</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Processing Status:</span>
                  <span className="text-emerald-400 font-bold">{selectedDoc.status}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <h3 className="font-oswald text-sm font-bold text-white uppercase tracking-wider">
                  DOCLING STRUCTURAL EXTRACTION SUMMARY
                </h3>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-[11px] text-slate-300 space-y-1">
                  <div>✓ PDF Structural Layout Converted</div>
                  <div>✓ Headings & Section Hierarchy Parsed</div>
                  <div>✓ Knowledge Candidates Extracted & Grounded</div>
                  <div>✓ Source Evidence Page Provenance Verified</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
