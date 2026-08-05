"use client";

import React, { useState } from "react";
import {
  TacticalScenario,
  TacticalState,
  PlayerState,
  TacticalOption
} from "@/lib/domain/types";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Maximize2,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

export type TacticalEngineMode =
  | "VISUALIZATION"
  | "EXPLORATION"
  | "PRACTICE"
  | "ASSESSMENT"
  | "ANALYSIS";

interface TacticalEngineProps {
  scenario: TacticalScenario;
  mode?: TacticalEngineMode;
  onOptionSelected?: (option: TacticalOption) => void;
  onStateSubmitted?: (finalState: TacticalState) => void;
  className?: string;
}

export const TacticalEngine: React.FC<TacticalEngineProps> = ({
  scenario,
  mode = "PRACTICE",
  onOptionSelected,
  onStateSubmitted,
  className = ""
}) => {
  const [currentState, setCurrentState] = useState<TacticalState>(
    scenario.initialState
  );
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const selectedOption = scenario.options.find((o) => o.id === selectedOptionId);

  // Tactical Pitch Dimensions (Percentage scale: 0-100)
  const pitchWidth = 100;
  const pitchHeight = 100;

  const handleOptionSelect = (option: TacticalOption) => {
    if (submitted && mode === "ASSESSMENT") return;
    setSelectedOptionId(option.id);
    if (option.targetPlayerId) {
      setSelectedPlayerId(option.targetPlayerId);
    }
    if (onOptionSelected) {
      onOptionSelected(option);
    }
  };

  const handleOptionSubmit = () => {
    if (!selectedOptionId) return;
    setSubmitted(true);
    if (selectedOption?.resultingState) {
      setCurrentState(selectedOption.resultingState);
    }
    if (onStateSubmitted) {
      onStateSubmitted(currentState);
    }
  };

  const handleReset = () => {
    setCurrentState(scenario.initialState);
    setSelectedOptionId(null);
    setSelectedPlayerId(null);
    setSubmitted(false);
    setCurrentFrameIndex(0);
    setIsPlaying(false);
  };

  // Timeline Navigation for Sequence/Analysis
  const frames = scenario.sequence?.states || [scenario.initialState];
  const handleFrameChange = (index: number) => {
    setCurrentFrameIndex(index);
    setCurrentState(frames[index]);
  };

  return (
    <div className={`glass-card p-4 sm:p-6 border border-white/10 rounded-2xl ${className}`}>
      {/* Scenario Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 border-b border-white/10 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#004D98]/40 text-[#38BDF8] border border-[#004D98]">
              {mode} MODE
            </span>
            <h3 className="font-oswald text-lg font-bold text-white tracking-wide">
              {scenario.title}
            </h3>
          </div>
          <p className="text-xs text-slate-300 font-cairo mt-1">
            {scenario.description}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-oswald transition-colors border border-white/10 self-end sm:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET PITCH</span>
        </button>
      </div>

      {/* Main Grid: Pitch + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Tactical Pitch Canvas (SVG) */}
        <div className="lg:col-span-8 relative w-full aspect-[4/3] tactical-pitch-dark rounded-xl overflow-hidden border border-emerald-500/30 shadow-2xl">
          {/* SVG Field Lines */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full absolute inset-0 pointer-events-none"
            preserveAspectRatio="none"
          >
            {/* Outer Boundary */}
            <rect x="2" y="2" width="96" height="96" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
            {/* Halfway Line */}
            <line x1="2" y1="50" x2="98" y2="50" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
            {/* Center Circle */}
            <circle cx="50" cy="50" r="12" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="1" fill="rgba(255, 255, 255, 0.5)" />

            {/* Home Penalty Box (Bottom) */}
            <rect x="22" y="76" width="56" height="22" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
            <rect x="36" y="88" width="28" height="10" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.6" />

            {/* Away Penalty Box (Top) */}
            <rect x="22" y="2" width="56" height="22" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
            <rect x="36" y="2" width="28" height="10" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.6" />

            {/* Pass Trajectory Lines */}
            {currentState.passLines?.map((line, idx) => (
              <g key={idx}>
                <line
                  x1={line.fromX}
                  y1={line.fromY}
                  x2={line.toX}
                  y2={line.toY}
                  stroke="#F59E0B"
                  strokeWidth="1.2"
                  strokeDasharray={line.dashed ? "2 2" : "none"}
                  markerEnd="url(#arrow)"
                />
              </g>
            ))}

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#F59E0B" />
              </marker>
            </defs>
          </svg>

          {/* Zones Overlay */}
          {currentState.zones?.map((zone) => (
            <div
              key={zone.id}
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                width: `${zone.width}%`,
                height: `${zone.height}%`,
                backgroundColor: zone.color || "rgba(56, 189, 248, 0.15)"
              }}
              className="absolute border border-dashed border-[#38BDF8] rounded flex items-center justify-center pointer-events-none"
            >
              <span className="text-[10px] text-[#38BDF8] font-mono bg-black/60 px-1 py-0.5 rounded">
                {zone.label}
              </span>
            </div>
          ))}

          {/* Ball Marker */}
          <div
            style={{
              left: `${currentState.ballPosition.x}%`,
              top: `${currentState.ballPosition.y}%`
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-slate-900 shadow-xl z-20 flex items-center justify-center animate-pulse"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
          </div>

          {/* Players */}
          {currentState.players.map((player) => {
            const isSelected = selectedPlayerId === player.id;
            const isHome = player.team === "home";

            return (
              <div
                key={player.id}
                style={{ left: `${player.x}%`, top: `${player.y}%` }}
                onClick={() => setSelectedPlayerId(player.id)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-all duration-300 group`}
              >
                {/* Selection Ring */}
                {(isSelected || player.highlighted) && (
                  <div className="absolute -inset-2 rounded-full border-2 border-[#F59E0B] animate-ping opacity-75 pointer-events-none"></div>
                )}

                {/* Player Pin */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg border-2 transition-transform group-hover:scale-110 ${
                    isHome
                      ? "bg-gradient-to-br from-[#004D98] to-[#0B132B] text-white stroke-black border-[#38BDF8]"
                      : "bg-gradient-to-br from-[#A50044] to-[#70002E] text-white border-red-400"
                  } ${isSelected ? "ring-4 ring-[#F59E0B]" : ""}`}
                >
                  {player.role}
                </div>

                {/* Player Label Hover Tooltip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 bg-slate-900/90 backdrop-blur text-white text-[10px] font-cairo rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 border border-white/10 shadow-xl">
                  {player.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tactical Controls & Decision Panel */}
        <div className="lg:col-span-4 space-y-4">
          {/* Frame Sequence Controller (If playback sequence available) */}
          {frames.length > 1 && (
            <div className="p-3 glass-panel rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-oswald">
                <span className="text-slate-300">SEQUENCE TIMELINE</span>
                <span className="text-[#38BDF8]">
                  FRAME {currentFrameIndex + 1} / {frames.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleFrameChange(Math.max(0, currentFrameIndex - 1))}
                  disabled={currentFrameIndex === 0}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex-1 flex gap-1">
                  {frames.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleFrameChange(idx)}
                      className={`h-2 flex-1 rounded transition-colors ${
                        idx === currentFrameIndex
                          ? "bg-[#38BDF8]"
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => handleFrameChange(Math.min(frames.length - 1, currentFrameIndex + 1))}
                  disabled={currentFrameIndex === frames.length - 1}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white disabled:opacity-30"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Practice/Assessment Options */}
          {scenario.options.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-oswald text-slate-300 uppercase tracking-wider">
                SELECT TACTICAL DECISION
              </h4>

              <div className="space-y-2">
                {scenario.options.map((option) => {
                  const isSelected = selectedOptionId === option.id;
                  const showResult = submitted;

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option)}
                      disabled={submitted && mode === "ASSESSMENT"}
                      className={`w-full text-right p-3.5 rounded-xl border text-xs font-cairo transition-all leading-relaxed flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? "bg-[#004D98]/30 border-[#38BDF8] text-white shadow-lg shadow-[#004D98]/20"
                          : "bg-slate-900/60 border-white/10 text-slate-300 hover:bg-white/5 hover:border-white/20"
                      } ${
                        showResult && option.isCorrect
                          ? "bg-emerald-950/60 border-emerald-500 text-emerald-200"
                          : ""
                      } ${
                        showResult && isSelected && !option.isCorrect
                          ? "bg-rose-950/60 border-rose-500 text-rose-200"
                          : ""
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {showResult && option.isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                        {showResult && isSelected && !option.isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400" />
                        )}
                        {!showResult && (
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                              isSelected
                                ? "border-[#38BDF8] bg-[#38BDF8] text-slate-950 font-bold"
                                : "border-slate-600"
                            }`}
                          >
                            {option.id.slice(-1).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">{option.text}</div>
                    </button>
                  );
                })}
              </div>

              {!submitted && (
                <button
                  onClick={handleOptionSubmit}
                  disabled={!selectedOptionId}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#004D98] to-[#A50044] hover:from-[#A50044] hover:to-[#004D98] text-white font-oswald text-xs font-bold uppercase tracking-wider border border-[#F59E0B]/40 shadow-lg disabled:opacity-40 transition-all cursor-pointer"
                >
                  SUBMIT TACTICAL DECISION
                </button>
              )}
            </div>
          )}

          {/* Feedback & Tactical Explanation Box */}
          {submitted && selectedOption && (
            <div
              className={`p-4 rounded-xl border text-xs font-cairo space-y-2 transition-all ${
                selectedOption.isCorrect
                  ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-200"
                  : "bg-rose-950/40 border-rose-500/50 text-rose-200"
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {selectedOption.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>قرار تكتيكي ممتاز! (Optimal Decision)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-400" />
                    <span>قرار يحتاج مراجعة (Needs Adjustment)</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed text-slate-200">
                {selectedOption.tacticalExplanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
