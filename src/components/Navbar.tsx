"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FCBLogo } from "@/components/FCBLogo";
import {
  Compass,
  Activity,
  ChevronDown,
  Grid,
  User,
  Brain,
  Award
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [learnOpen, setLearnOpen] = useState(false);
  const [analyzeOpen, setAnalyzeOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-full sticky top-0 z-50 glass-panel border-b border-white/10 shadow-2xl transition-all">
      {/* Top Ambient Thin Blaugrana Stripe */}
      <div className="w-full h-1 bg-gradient-to-r from-[#004D98] via-[#EDBB00] to-[#A50044]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-6">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <FCBLogo size={44} className="group-hover:scale-105 transition-transform rounded-lg overflow-hidden border border-[#EDBB00]/40 shadow-lg" />
          <div>
            <h1 className="font-oswald text-xl sm:text-2xl font-bold tracking-wider text-white uppercase flex items-center gap-2">
              BARÇA ACADEMY
              <span className="text-[10px] bg-gradient-to-r from-[#A50044] to-[#70002E] text-[#EDBB00] font-sans px-2 py-0.5 font-bold border border-[#EDBB00]/30 rounded-md">
                METHODOLOGY
              </span>
            </h1>
            <p className="text-[11px] text-[#94A3B8] font-cairo hidden sm:block">
              منصة التعلم والتحليل التكتيكي التفاعلية المتقدمة
            </p>
          </div>
        </Link>

        {/* Main Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 font-oswald text-xs uppercase tracking-wider">
          {/* Dashboard */}
          <Link
            href="/"
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              isActive("/")
                ? "bg-[#004D98]/40 text-[#EDBB00] border border-[#004D98] shadow-lg shadow-[#004D98]/20"
                : "text-[#94A3B8] hover:text-white hover:bg-white/5"
            }`}
          >
            Dashboard
          </Link>

          {/* Learn Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setLearnOpen(true)}
            onMouseLeave={() => setLearnOpen(false)}
          >
            <button
              className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                pathname.startsWith("/learn")
                  ? "bg-[#004D98]/40 text-[#EDBB00] border border-[#004D98]"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/5"
              }`}
            >
              Learn
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {learnOpen && (
              <div className="absolute top-full right-0 w-64 glass-panel border border-white/10 shadow-2xl rounded-xl py-2 text-xs font-cairo z-50 backdrop-blur-2xl">
                <Link
                  href="/learn/path"
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-[#004D98]/30 hover:text-[#EDBB00] transition-colors rounded-lg mx-1"
                >
                  <Compass className="w-4 h-4 text-[#EDBB00]" />
                  <span>Learning Path (مسار التعلم)</span>
                </Link>
                <Link
                  href="/learn/pitch"
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-[#004D98]/30 hover:text-emerald-400 transition-colors rounded-lg mx-1 border-t border-white/5 mt-1 pt-2.5"
                >
                  <Grid className="w-4 h-4 text-emerald-400" />
                  <span>Interactive Pitch (الملعب التفاعلي)</span>
                </Link>
              </div>
            )}
          </div>

          {/* Analyze Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAnalyzeOpen(true)}
            onMouseLeave={() => setAnalyzeOpen(false)}
          >
            <button
              className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                pathname.startsWith("/analyze")
                  ? "bg-[#004D98]/40 text-[#EDBB00] border border-[#004D98]"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/5"
              }`}
            >
              Analyze
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {analyzeOpen && (
              <div className="absolute top-full right-0 w-64 glass-panel border border-white/10 shadow-2xl rounded-xl py-2 text-xs font-cairo z-50 backdrop-blur-2xl">
                <Link
                  href="/analyze/lab"
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-[#A50044]/30 hover:text-red-400 transition-colors rounded-lg mx-1"
                >
                  <Activity className="w-4 h-4 text-[#A50044]" />
                  <span>Match Analysis Lab (مختبر التحليل)</span>
                </Link>
              </div>
            )}
          </div>

          {/* Frameworks */}
          <Link
            href="/frameworks"
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              isActive("/frameworks")
                ? "bg-[#004D98]/40 text-[#EDBB00] border border-[#004D98]"
                : "text-[#94A3B8] hover:text-white hover:bg-white/5"
            }`}
          >
            Frameworks
          </Link>

          {/* Progress */}
          <Link
            href="/progress"
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              isActive("/progress")
                ? "bg-[#004D98]/40 text-[#EDBB00] border border-[#004D98]"
                : "text-[#94A3B8] hover:text-white hover:bg-white/5"
            }`}
          >
            Progress
          </Link>
        </nav>

        {/* Profile Action */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/progress"
            className="flex items-center gap-2 bg-gradient-to-r from-[#A50044] to-[#70002E] hover:from-[#70002E] hover:to-[#A50044] text-white px-4 py-2 rounded-lg border border-[#EDBB00]/40 text-xs font-oswald font-bold tracking-wider transition-all shadow-lg hover:shadow-red-500/20"
          >
            <User className="w-4 h-4 text-[#EDBB00]" />
            <span className="hidden sm:inline">MY PROFILE</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
