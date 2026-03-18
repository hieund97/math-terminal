'use client';

import { cn } from '@/lib/utils';
import { useQuizStore } from '@/stores/quizStore';
import { useProgressStore } from '@/stores/progressStore';
import { useUIStore } from '@/stores/uiStore';
import { ANSWER_LABELS, XP_PER_CORRECT, XP_PER_ATTEMPT } from '@/lib/constants';
import { MathText } from '@/components/shared/MathText';

export function AnswerButtons() {
  const {
    questions,
    currentIndex,
    selectedAnswer,
    isAnswered,
    answerResult,
    selectAnswer,
    submitCurrentAnswer,
  } = useQuizStore();
  const { addXP, incrementStreak, resetStreak, recordAnswer } = useProgressStore();
  const { showXP } = useUIStore();

  const question = questions[currentIndex];
  if (!question) return null;

  const handleSubmit = async () => {
    if (!selectedAnswer || isAnswered) return;
    await submitCurrentAnswer();

    const result = useQuizStore.getState().answerResult;
    if (result) {
      recordAnswer(result.correct);
      if (result.correct) {
        const prevLevel = useProgressStore.getState().level;
        addXP(XP_PER_CORRECT);
        incrementStreak();
        showXP(XP_PER_CORRECT);
        const newLevel = useProgressStore.getState().level;
        if (newLevel > prevLevel) {
          useUIStore.getState().triggerLevelUp();
        }
      } else {
        addXP(XP_PER_ATTEMPT);
        resetStreak();
        showXP(XP_PER_ATTEMPT);
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {question.options.map((option, i) => {
          const label = ANSWER_LABELS[i];
          const isSelected = selectedAnswer === label;
          const isCorrect = isAnswered && answerResult?.correctAnswer === label;
          const isWrong = isAnswered && isSelected && !answerResult?.correct;

          return (
            <button
              key={i}
              onClick={() => selectAnswer(label)}
              disabled={isAnswered}
              className={cn(
                'flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border text-left transition-all duration-200 font-mono text-xs sm:text-sm',
                !isAnswered && !isSelected && 'border-cyber-border bg-cyber-surface hover:border-neon-purple/50 hover:bg-neon-purple/5 active:scale-[0.98]',
                !isAnswered && isSelected && 'border-neon-blue/50 bg-neon-blue/10 glow-border-blue',
                isCorrect && 'border-neon-green/50 bg-neon-green/10 glow-border-green animate-glow-pulse',
                isWrong && 'border-neon-red/50 bg-neon-red/10 glow-border-red animate-shake',
                isAnswered && !isCorrect && !isWrong && 'opacity-40 cursor-default',
              )}
            >
              <span
                className={cn(
                  'shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded flex items-center justify-center text-[10px] sm:text-xs font-bold border',
                  !isAnswered && !isSelected && 'border-cyber-border text-muted-foreground',
                  !isAnswered && isSelected && 'border-neon-blue bg-neon-blue/20 text-neon-blue',
                  isCorrect && 'border-neon-green bg-neon-green/20 text-neon-green',
                  isWrong && 'border-neon-red bg-neon-red/20 text-neon-red',
                )}
              >
                {label}
              </span>
              <span className="flex-1 pt-0.5 overflow-x-auto">
                <MathText text={option} />
              </span>
            </button>
          );
        })}
      </div>

      {/* Submit button */}
      {!isAnswered && selectedAnswer && (
        <button
          onClick={handleSubmit}
          className="w-full py-2.5 sm:py-3 rounded-lg border border-neon-purple/50 bg-neon-purple/10 text-neon-purple font-bold uppercase tracking-wider text-xs sm:text-sm
                     hover:bg-neon-purple/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-200
                     active:scale-[0.98]"
        >
          ⟩ SUBMIT ANSWER
        </button>
      )}
    </div>
  );
}
