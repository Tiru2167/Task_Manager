import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

export class CreateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus, { message: 'Status must be one of: pending, in-progress, completed' })
  @IsOptional()
  status?: TaskStatus;
}