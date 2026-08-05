"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FCBLogo } from "@/components/FCBLogo";
import {
  BookOpen,
  Compass,
  Activity,
  Cpu,
  Trophy,
  ChevronDown,
  Layers,
  Search,
  User,
  Grid,
  FileText,
  PlaySquare
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [learnOpen, setLearnOpen] = useState(false);
  const [analyzeOpen, setAnalyzeOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-full bg-[#001E42] text-white border-b-4 border-[#EDBB00] shadow-2xl sticky top-0 z-50">
      {/* Top Thin Blaugrana Stripe */}
      <div className="w-full h-1.5 blaugrana-header-stripe"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-6">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <FCBLogo size={46} className="group-hover:scale-105 transition-transform" />
          <div>
            <h1 className="font-oswald text-xl sm:text-2xl font-bold tracking-wider text-white uppercase flex items-center gap-2">
              BARÇA ACADEMY
              <span className="text-[10px] bg-[#A50044] text-[#EDBB00] font-sans px-2 py-0.5 font-bold border border-[#EDBB00]/40">
                METHODOLOGY
              </span>
            </h1>
            <p className="text-[11px] text-blue-200 font-cairo hidden sm:block">
              منصة التعليم والتحليل التكتيكي التفاعلية
            </p>
          </div>
        </Link>

        {/* Main Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 font-oswald text-sm tracking-wide">
          {/* Dashboard */}
          <Link
            href="/"
            className={`px-4 py-2 uppercase font-bold transition-colors ${
              isActive("/") ? "bg-[#004D98] text-[#EDBB00] border-b-2 border-[#EDBB00]" : "text-white/90 hover:bg-white/10"
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
              className={`px-4 py-2 uppercase font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                pathname.startsWith("/learn") ? "bg-[#004D98] text-[#EDBB00]" : "text-white/90 hover:bg-white/10"
              }`}
            >
              Learn
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {learnOpen && (
              <div className="absolute top-full right-0 w-60 bg-[#001530] border-2 border-[#004D98] shadow-2xl py-2 text-xs font-cairo z-50">
                <Link
                  href="/learn/path"
                  className="flex items-center gap-2.5 px-4 py-2.5 text-white hover:bg-[#004D98] hover:text-[#EDBB00] transition-colors"
                >
                  <Compass className="w-4 h-4 text-[#EDBB00]" />
                  <span>Learning Path (مسار التعلم)</span>
                </Link>
                <Link
                  href="/learn/pitch"
                  className="flex items-center gap-2.5 px-4 py-2.5 text-white hover:bg-[#004D98] hover:text-[#EDBB00] transition-colors border-t border-white/10"
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
              className={`px-4 py-2 uppercase font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                pathname.startsWith("/analyze") ? "bg-[#004D98] text-[#EDBB00]" : "text-white/90 hover:bg-white/10"
              }`}
            >
              Analyze
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {analyzeOpen && (
              <div className="absolute top-full right-0 w-60 bg-[#001530] border-2 border-[#004D98] shadow-2xl py-2 text-xs font-cairo z-50">
                <Link
                  href="/analyze/lab"
                  className="flex items-center gap-2.5 px-4 py-2.5 text-white hover:bg-[#004D98] hover:text-[#EDBB00] transition-colors"
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
            className={`px-4 py-2 uppercase font-bold transition-colors ${
              isActive("/frameworks") ? "bg-[#004D98] text-[#EDBB00]" : "text-white/90 hover:bg-white/10"
            }`}
          >
            Frameworks
          </Link>

          {/* Progress */}
          <Link
            href="/progress"
            className={`px-4 py-2 uppercase font-bold transition-colors ${
              isActive("/progress") ? "bg-[#004D98] text-[#EDBB00]" : "text-white/90 hover:bg-white/10"
            }`}
          >
            Progress
          </Link>
        </nav>

        {/* Profile Action */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/progress"
            className="flex items-center gap-2 bg-[#A50044] hover:bg-[#70002E] text-white px-3.5 py-1.5 border border-[#EDBB00]/40 text-xs font-oswald font-bold tracking-wider transition-colors shadow-md"
          >
            <User className="w-4 h-4 text-[#EDBB00]" />
            <span className="hidden sm:inline">MY PROFILE</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
