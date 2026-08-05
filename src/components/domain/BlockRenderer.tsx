"use client";

import React from "react";
import { LessonBlock } from "@/lib/domain/types";
import { TacticalEngine } from "./TacticalEngine";
import { domainService } from "@/lib/domain/service";
import {
  BookOpen,
  Info,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Video,
  FileText,
  HelpCircle
} from "lucide-react";

interface BlockRendererProps {
  block: LessonBlock;
  onKnowledgeCheckAnswer?: (questionId: string, isCorrect: boolean) => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  onKnowledgeCheckAnswer
}) => {
  const { type, content } = block;

  switch (type) {
    case "TEXT":
      return (
        <div className="glass-card p-5 border border-white/10 rounded-2xl space-y-3 font-cairo text-slate-200 leading-relaxed">
          {content.title && (
            <h3 className="font-oswald text-lg font-bold text-white tracking-wide border-b border-white/10 pb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#38BDF8]" />
              {content.title}
            </h3>
          )}
          <p className="text-sm whitespace-pre-line">{content.text}</p>
        </div>
      );

    case "CALLOUT": {
      const calloutType = content.calloutType || "info";
      const calloutStyles = {
        info: "bg-[#004D98]/20 border-[#004D98] text-blue-200",
        tip: "bg-emerald-950/40 border-emerald-500 text-emerald-200",
        warning: "bg-rose-950/40 border-rose-500 text-rose-200",
        principle: "bg-amber-950/40 border-amber-500 text-amber-200"
      };

      const CalloutIcon = {
        info: Info,
        tip: Lightbulb,
        warning: AlertTriangle,
        principle: CheckCircle2
      }[calloutType];

      return (
        <div
          className={`p-4 rounded-xl border space-y-1.5 font-cairo text-xs leading-relaxed ${calloutStyles[calloutType]}`}
        >
          <div className="flex items-center gap-2 font-oswald text-sm font-bold uppercase tracking-wider">
            <CalloutIcon className="w-4 h-4 shrink-0" />
            <span>{content.title || "TACTICAL PRINCIPLE"}</span>
          </div>
          {content.highlightText && (
            <p className="font-bold text-sm text-white">{content.highlightText}</p>
          )}
          {content.text && <p className="text-slate-300">{content.text}</p>}
        </div>
      );
    }

    case "TACTICAL": {
      if (!content.tacticalScenarioId) {
        return (
          <div className="p-4 bg-slate-900 border border-white/10 rounded-xl text-xs font-cairo text-slate-400">
            [Tactical Scenario Not Configured]
          </div>
        );
      }
      const scenario = domainService.getTacticalScenarioById(content.tacticalScenarioId);
      if (!scenario) {
        return (
          <div className="p-4 bg-slate-900 border border-white/10 rounded-xl text-xs font-cairo text-slate-400">
            [Scenario {content.tacticalScenarioId} Not Found]
          </div>
        );
      }
      return (
        <div className="space-y-2">
          <TacticalEngine scenario={scenario} mode="PRACTICE" />
          {content.caption && (
            <p className="text-xs font-cairo text-slate-400 text-center italic">
              {content.caption}
            </p>
          )}
        </div>
      );
    }

    case "KNOWLEDGE_CHECK": {
      if (!content.knowledgeCheckQuestionId) return null;
      const question = domainService.getQuestionById(content.knowledgeCheckQuestionId);
      if (!question) return null;

      return (
        <div className="glass-card p-5 border border-[#F59E0B]/40 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-oswald text-[#F59E0B] uppercase tracking-wider font-bold">
            <HelpCircle className="w-4 h-4" />
            <span>QUICK KNOWLEDGE CHECK</span>
          </div>
          <p className="font-cairo text-sm text-white font-bold leading-relaxed">
            {question.questionText}
          </p>
          <div className="space-y-2">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  if (onKnowledgeCheckAnswer) {
                    onKnowledgeCheckAnswer(question.id, option.isCorrect);
                  }
                }}
                className="w-full text-right p-3 rounded-xl bg-slate-900/80 hover:bg-white/5 border border-white/10 hover:border-white/20 text-xs font-cairo text-slate-200 transition-all cursor-pointer"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      );
    }

    case "SUMMARY":
      return (
        <div className="glass-panel p-5 border border-emerald-500/30 rounded-2xl space-y-2 font-cairo">
          <div className="flex items-center gap-2 font-oswald text-sm text-emerald-400 font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>{content.title || "SUMMARY TAKEAWAY"}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{content.text}</p>
        </div>
      );

    default:
      return (
        <div className="p-4 bg-slate-900 border border-white/10 rounded-xl text-xs font-cairo text-slate-400">
          [Content Block: {type}]
        </div>
      );
  }
};
