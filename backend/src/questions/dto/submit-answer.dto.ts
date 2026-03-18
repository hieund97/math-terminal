import { IsString, IsUUID } from 'class-validator';

export class SubmitAnswerDto {
  @IsUUID()
  questionId!: string;

  @IsString()
  selectedAnswer!: string;
}
