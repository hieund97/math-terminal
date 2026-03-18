import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { QuestionsModule } from './questions/questions.module.js';

@Module({
  imports: [PrismaModule, QuestionsModule],
  controllers: [AppController],
})
export class AppModule {}
