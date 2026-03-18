import type { Question, AnswerResult } from '@/types';

const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchQuestions(subject?: string): Promise<Question[]> {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  const res = await fetch(`${BASE}/questions?${params}`);
  if (!res.ok) throw new Error('Failed to fetch questions');
  return res.json();
}

export async function fetchQuestion(id: string): Promise<Question> {
  const res = await fetch(`${BASE}/questions/${id}`);
  if (!res.ok) throw new Error('Failed to fetch question');
  return res.json();
}

export async function submitAnswer(
  questionId: string,
  selectedAnswer: string,
): Promise<AnswerResult> {
  const res = await fetch(`${BASE}/answers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionId, selectedAnswer }),
  });
  if (!res.ok) throw new Error('Failed to submit answer');
  return res.json();
}
