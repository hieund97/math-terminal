'use client';

import { useQuizStore } from '@/stores/quizStore';
import { MathText } from '@/components/shared/MathText';

export function SolutionPanel() {
  const { isAnswered, answerResult, showSolution, toggleSolution } = useQuizStore();

  if (!isAnswered || !answerResult) return null;

  return (
    <div className="space-y-2">
      <button
        onClick={toggleSolution}
        className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neon-green hover:text-neon-green/80 transition-colors"
      >
        <span>[★]</span>
        <span>{showSolution ? 'HIDE SOLUTION' : 'SHOW SOLUTION'}</span>
      </button>

      {showSolution && (
        <div className="p-4 rounded-lg border border-neon-green/20 bg-neon-green/5 text-sm animate-slide-in-right">
          <div className="text-xs text-neon-green/60 uppercase tracking-wider mb-2">
            // Solution
          </div>
          <MathText text={answerResult.solution} className="text-foreground/90 leading-relaxed" />
        </div>
      )}
    </div>
  );
}
