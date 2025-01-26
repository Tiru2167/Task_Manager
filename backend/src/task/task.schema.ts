import { Schema, Document } from 'mongoose';

// Task interface definition, inheriting from mongoose's Document
export interface Task extends Document {
  id?: string;
  title?: string; // Optional
  description?: string; // Optional
  status?: 'pending' | 'in-progress' | 'completed'; // Optional
}

// TaskSchema definition
export const TaskSchema = new Schema<Task>({
  title: { type: String, required: true }, // Optional field
  description: { type: String, required: true }, // Optional field
  status: { type: String, required: true }, // Optional field
});
