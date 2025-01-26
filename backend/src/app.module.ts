import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module'; // Adjust the path if necessary

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Tirumala:Tirumala02@cluster0.lnx32.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), // Use your MongoDB URI
    TaskModule, // Add your TaskModule
  ],
})
export class AppModule {}
