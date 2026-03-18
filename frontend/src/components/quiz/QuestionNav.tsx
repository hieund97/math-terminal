'use client';

import { cn } from '@/lib/utils';
import { useQuizStore } from '@/stores/quizStore';

export function QuestionNav() {
  const { questions, currentIndex, isAnswered, nextQuestion, prevQuestion } = useQuizStore();

  if (questions.length === 0) return null;

  const canPrev = currentIndex > 0;
  const canNext = currentIndex < questions.length - 1 && isAnswered;

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={prevQuestion}
        disabled={!canPrev}
        className={cn(
          'px-4 py-2 rounded-lg border text-sm font-mono transition-all duration-200',
          canPrev
            ? 'border-cyber-border text-foreground hover:border-neon-purple/50 hover:bg-neon-purple/5 active:scale-95'
            : 'border-cyber-border/50 text-muted-foreground/30 cursor-not-allowed',
        )}
      >
        ◂ PREV
      </button>

      <span className="text-xs text-muted-foreground font-mono tabular-nums">
        ◂ {String(currentIndex + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')} ▸
      </span>

      <button
        onClick={nextQuestion}
        disabled={!canNext}
        className={cn(
          'px-4 py-2 rounded-lg border text-sm font-mono transition-all duration-200',
          canNext
            ? 'border-neon-purple/50 text-neon-purple bg-neon-purple/5 hover:bg-neon-purple/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] active:scale-95'
            : 'border-cyber-border/50 text-muted-foreground/30 cursor-not-allowed',
        )}
      >
        NEXT ▸
      </button>
    </div>
  );
}
