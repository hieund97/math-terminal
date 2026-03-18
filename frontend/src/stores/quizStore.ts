'use client';

import { create } from 'zustand';
import type { Question, AnswerResult } from '@/types';
import { fetchQuestions, submitAnswer } from '@/lib/api';

interface QuizState {
  questions: Question[];
  currentIndex: number;
  selectedAnswer: string | null;
  isAnswered: boolean;
  answerResult: AnswerResult | null;
  showHint: boolean;
  showSolution: boolean;
  loading: boolean;
  activeSubject: string | null;

  loadQuestions: (subject: string) => Promise<void>;
  selectAnswer: (answer: string) => void;
  submitCurrentAnswer: () => Promise<void>;
  nextQuestion: () => void;
  prevQuestion: () => void;
  toggleHint: () => void;
  toggleSolution: () => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>()((set, get) => ({
  questions: [],
  currentIndex: 0,
  selectedAnswer: null,
  isAnswered: false,
  answerResult: null,
  showHint: false,
  showSolution: false,
  loading: false,
  activeSubject: null,

  loadQuestions: async (subject: string) => {
    set({ loading: true, activeSubject: subject });
    try {
      const questions = await fetchQuestions(subject);
      set({
        questions,
        currentIndex: 0,
        selectedAnswer: null,
        isAnswered: false,
        answerResult: null,
        showHint: false,
        showSolution: false,
        loading: false,
      });
    } catch {
      set({ loading: false });
    }
  },

  selectAnswer: (answer: string) => {
    if (get().isAnswered) return;
    set({ selectedAnswer: answer });
  },

  submitCurrentAnswer: async () => {
    const { questions, currentIndex, selectedAnswer } = get();
    if (!selectedAnswer || !questions[currentIndex]) return;

    try {
      const result = await submitAnswer(questions[currentIndex].id, selectedAnswer);
      set({ isAnswered: true, answerResult: result });
    } catch {
      // handle error silently
    }
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex < questions.length - 1) {
      set({
        currentIndex: currentIndex + 1,
        selectedAnswer: null,
        isAnswered: false,
        answerResult: null,
        showHint: false,
        showSolution: false,
      });
    }
  },

  prevQuestion: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      set({
        currentIndex: currentIndex - 1,
        selectedAnswer: null,
        isAnswered: false,
        answerResult: null,
        showHint: false,
        showSolution: false,
      });
    }
  },

  toggleHint: () => set((s) => ({ showHint: !s.showHint })),
  toggleSolution: () => set((s) => ({ showSolution: !s.showSolution })),

  reset: () =>
    set({
      questions: [],
      currentIndex: 0,
      selectedAnswer: null,
      isAnswered: false,
      answerResult: null,
      showHint: false,
      showSolution: false,
      loading: false,
      activeSubject: null,
    }),
}));
