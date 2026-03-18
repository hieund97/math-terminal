'use client';

import { DashboardShell } from '@/components/layout/DashboardShell';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import { AnswerButtons } from '@/components/quiz/AnswerButtons';
import { HintPanel } from '@/components/quiz/HintPanel';
import { SolutionPanel } from '@/components/quiz/SolutionPanel';
import { QuestionNav } from '@/components/quiz/QuestionNav';
import { Leaderboard } from '@/components/leaderboard/Leaderboard';
import { XPPopup } from '@/components/progress/XPPopup';
import { LevelUpBanner } from '@/components/progress/LevelUpBanner';
import { useQuizStore } from '@/stores/quizStore';

export default function Home() {
  const { questions, isAnswered } = useQuizStore();
  const hasQuestions = questions.length > 0;

  return (
    <>
      <DashboardShell rightPanel={<Leaderboard />}>
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          <QuestionCard />

          {hasQuestions && (
            <>
              <AnswerButtons />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <HintPanel />
                {isAnswered && <SolutionPanel />}
              </div>

              <QuestionNav />
            </>
          )}
        </div>
      </DashboardShell>

      <XPPopup />
      <LevelUpBanner />
    </>
  );
}
