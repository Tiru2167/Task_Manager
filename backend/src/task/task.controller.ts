import { PartialType } from '@nestjs/mapped-types';
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './task.dto';  // Import CreateTaskDto
import { Task } from './task.schema';


@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Create a new task
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    console.log('Raw Payload:', createTaskDto); // Raw request body
    console.log('Is DTO Instance:', createTaskDto instanceof CreateTaskDto); // Check transformation
    return this.taskService.create(createTaskDto);
  }


  // Get all tasks
  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get('/count')
  async getTaskCount() {
    const count = await this.taskService.getTaskCount();
    return { count };  // Return the count as a response
  }
  // Get a task by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne(id);

  }

  // Update a task by ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.update(id, updateTaskDto);
  }

  // Delete a task by ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.taskService.remove(id);
  }
}
