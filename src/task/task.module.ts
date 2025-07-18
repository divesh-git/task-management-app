import { Module } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { TaskResolver } from './resolvers/task.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  providers: [TaskService, TaskResolver],
})
export class TaskModule {}
