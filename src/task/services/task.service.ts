import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../schemas/task.schema';
import { UpdateTaskInput } from '../dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const created = new this.taskModel(createTaskDto);
    const result = await created.save();
    return result;
  }
  
  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async update(input: UpdateTaskInput): Promise<Task> {
    const updateFAQ = await this.taskModel
        .findByIdAndUpdate(input.id, input, { new: true })
        .exec();

    if (!updateFAQ) {
        throw new NotFoundException('FAQ not found');
    }

    return updateFAQ;
}
  

  async remove(id: string): Promise<Task | null> {
    const result = this.taskModel.findByIdAndDelete(id).exec();
    return result;
  }


  async findById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
        throw new NotFoundException('Task not found');
    }

    return task;
}
}
