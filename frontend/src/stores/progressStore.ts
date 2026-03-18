'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { XP_PER_LEVEL } from '@/lib/constants';

interface ProgressState {
  xp: number;
  level: number;
  streak: number;
  totalAnswered: number;
  totalCorrect: number;
  addXP: (amount: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  recordAnswer: (correct: boolean) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      xp: 0,
      level: 1,
      streak: 0,
      totalAnswered: 0,
      totalCorrect: 0,

      addXP: (amount) =>
        set((state) => {
          const newXP = state.xp + amount;
          const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;
          return { xp: newXP, level: newLevel };
        }),

      incrementStreak: () =>
        set((state) => ({ streak: state.streak + 1 })),

      resetStreak: () => set({ streak: 0 }),

      recordAnswer: (correct) =>
        set((state) => ({
          totalAnswered: state.totalAnswered + 1,
          totalCorrect: state.totalCorrect + (correct ? 1 : 0),
        })),
    }),
    { name: 'math-terminal-progress' },
  ),
);
