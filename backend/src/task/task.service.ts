import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';  // Import Task type
import { CreateTaskDto } from './task.dto';  // Import CreateTaskDto
import * as mongoose from 'mongoose'; // Import mongoose for ObjectId validation

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  // Create a new task
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new this.taskModel(createTaskDto);
    return task.save();
  }

  // Get all tasks
  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  // Get a task by ID
  async findOne(id: string): Promise<Task> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }

    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  // Get task count
  async getTaskCount(): Promise<number> {
    try {
      const count = await this.taskModel.countDocuments().exec();
      return count;  // Return the count of tasks
    } catch (error) {
      throw new BadRequestException('Failed to retrieve task count');
    }
  }

  // Update a task
  async update(id: string, updateTaskDto: Partial<CreateTaskDto>): Promise<Task> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }

    const task = await this.findOne(id); // Find the task by ID
    Object.assign(task, updateTaskDto); // Merge the new data with the existing task
    return task.save(); // Save the updated task
  }

  // Delete a task
  async remove(id: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }

    const result = await this.taskModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
