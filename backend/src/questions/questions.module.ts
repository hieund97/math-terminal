import { Module } from '@nestjs/common';
import { QuestionsController, AnswersController } from './questions.controller.js';
import { QuestionsService } from './questions.service.js';

@Module({
  controllers: [QuestionsController, AnswersController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
