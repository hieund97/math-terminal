export interface Question {
  id: string;
  subject: string;
  topic: string;
  level: string;
  question: string;
  options: string[];
  hint: string;
  createdAt: string;
}

export interface AnswerResult {
  correct: boolean;
  correctAnswer: string;
  solution: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  level: number;
  avatar: string;
}

export type Subject = {
  id: string;
  name: string;
  icon: string;
};
