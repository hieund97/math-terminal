import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { QueryQuestionsDto } from './dto/query-questions.dto.js';

const publicSelect = {
  id: true,
  subject: true,
  topic: true,
  level: true,
  question: true,
  options: true,
  hint: true,
  createdAt: true,
} as const;

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: QueryQuestionsDto) {
    const where: Record<string, string> = {};
    if (query.subject) where.subject = query.subject;
    if (query.topic) where.topic = query.topic;
    if (query.level) where.level = query.level;

    return this.prisma.question.findMany({
      where,
      select: publicSelect,
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
      select: publicSelect,
    });
    if (!question) throw new NotFoundException('Question not found');
    return question;
  }

  async checkAnswer(questionId: string, selectedAnswer: string) {
    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
    });
    if (!question) throw new NotFoundException('Question not found');

    return {
      correct: question.correctAnswer === selectedAnswer,
      correctAnswer: question.correctAnswer,
      solution: question.solution,
    };
  }
}
