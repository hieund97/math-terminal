'use client';

import { useQuizStore } from '@/stores/quizStore';
import { useProgressStore } from '@/stores/progressStore';
import { XP_HINT_COST } from '@/lib/constants';
import { MathText } from '@/components/shared/MathText';
import { cn } from '@/lib/utils';

export function HintPanel() {
  const { questions, currentIndex, showHint, toggleHint } = useQuizStore();
  const { addXP } = useProgressStore();
  const question = questions[currentIndex];

  if (!question) return null;

  const handleToggleHint = () => {
    if (!showHint) {
      addXP(-XP_HINT_COST);
    }
    toggleHint();
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleToggleHint}
        className={cn(
          'flex items-center gap-2 text-xs font-mono uppercase tracking-wider transition-all duration-200',
          showHint
            ? 'text-neon-yellow'
            : 'text-muted-foreground hover:text-neon-yellow',
        )}
      >
        <span>[?]</span>
        <span>HINT</span>
        {!showHint && (
          <span className="text-neon-red/60 text-[10px]">(-{XP_HINT_COST} XP)</span>
        )}
      </button>

      {showHint && (
        <div className="p-3 rounded-lg border border-neon-yellow/20 bg-neon-yellow/5 text-sm animate-slide-in-right">
          <MathText text={question.hint} className="text-neon-yellow/90" />
        </div>
      )}
    </div>
  );
}
