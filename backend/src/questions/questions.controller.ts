import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { QuestionsService } from './questions.service.js';
import { QueryQuestionsDto } from './dto/query-questions.dto.js';
import { SubmitAnswerDto } from './dto/submit-answer.dto.js';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  findAll(@Query() query: QueryQuestionsDto) {
    return this.questionsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }
}

@Controller('answers')
export class AnswersController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  submit(@Body() dto: SubmitAnswerDto) {
    return this.questionsService.checkAnswer(dto.questionId, dto.selectedAnswer);
  }
}
