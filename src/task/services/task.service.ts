import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../schemas/task.schema';
import { UpdateTaskInput } from '../dto/update-task.dto';
import { User } from '../../auth/schemas/auth.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const created = new this.taskModel({
      ...createTaskDto, // Include task data from the DTO
      userId: user._id, // Associate the task with the logged-in user
    });
  
    const result = await created.save();
    return result;
  }
  
  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  // async update(input: UpdateTaskInput): Promise<Task> {
  //   const updateFAQ = await this.taskModel
  //     .findByIdAndUpdate(input.id, input, { new: true })
  //     .exec();

  //   if (!updateFAQ) {
  //     throw new NotFoundException('FAQ not found');
  //   }

  //   return updateFAQ;
  // }

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


  async update(input: UpdateTaskInput, user: User): Promise<Task> {
    const task = await this.taskModel.findOneAndUpdate(
      { _id: input.id, userId: user._id },  
      { $set: input }, 
      { new: true }  
    ).exec();
  
    if (!task) {
      throw new NotFoundException('Task not found or not authorized');
    }
  
    return task;
  }

  async findByUserId(userId: Types.ObjectId | string): Promise<Task[]> {
    const id = typeof userId === 'string' ? userId : userId.toString();
    return this.taskModel.find({ userId: id }).exec();
  }

  
  
}
