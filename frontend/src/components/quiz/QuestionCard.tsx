'use client';

import { useQuizStore } from '@/stores/quizStore';
import { useUIStore } from '@/stores/uiStore';
import { GlowCard } from '@/components/shared/GlowCard';
import { MathText } from '@/components/shared/MathText';

export function QuestionCard() {
  const { questions, currentIndex, loading } = useQuizStore();
  const { toggleSidebar } = useUIStore();
  const question = questions[currentIndex];

  if (loading) {
    return (
      <GlowCard className="min-h-37.5 sm:min-h-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-neon-purple animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" style={{ animationDelay: '0.4s' }} />
          <span className="text-muted-foreground text-sm ml-2">LOADING DATA...</span>
        </div>
      </GlowCard>
    );
  }

  if (!question) {
    return (
      <GlowCard className="min-h-37.5 sm:min-h-50 flex items-center justify-center">
        <div className="text-center space-y-3 px-4">
          <div className="text-4xl">⟐</div>
          <p className="text-muted-foreground text-sm">
            Chọn module để bắt đầu
          </p>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-xs text-neon-purple border border-neon-purple/30 rounded px-3 py-1.5 hover:bg-neon-purple/10 transition-colors"
          >
            ☰ MỞ MENU
          </button>
          <p className="text-muted-foreground/50 text-[10px] sm:text-xs">
            SELECT A MODULE TO INITIALIZE
          </p>
        </div>
      </GlowCard>
    );
  }

  return (
    <GlowCard className="animate-slide-in-right">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[10px] sm:text-xs text-neon-purple font-bold tabular-nums">
            [{String(currentIndex + 1).padStart(2, '0')}/{String(questions.length).padStart(2, '0')}]
          </span>
          <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded border border-neon-blue/30 text-neon-blue bg-neon-blue/10">
            {question.topic}
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded border border-cyber-border text-muted-foreground">
            {question.level}
          </span>
          <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded border border-neon-purple/30 text-neon-purple bg-neon-purple/10 hidden sm:inline">
            {question.subject}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="text-sm sm:text-base leading-relaxed overflow-x-auto">
        <MathText text={question.question} />
      </div>
    </GlowCard>
  );
}
