import { IsOptional, IsString } from 'class-validator';

export class QueryQuestionsDto {
  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  topic?: string;

  @IsOptional()
  @IsString()
  level?: string;
}
