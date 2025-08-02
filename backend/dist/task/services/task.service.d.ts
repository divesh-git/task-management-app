import { Model, Types } from 'mongoose';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../schemas/task.schema';
import { UpdateTaskInput } from '../dto/update-task.dto';
import { User } from '../../auth/schemas/auth.schema';
export declare class TaskService {
    private taskModel;
    constructor(taskModel: Model<Task>);
    create(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    findAll(): Promise<Task[]>;
    remove(id: string): Promise<Task | null>;
    findById(id: string): Promise<Task>;
    update(input: UpdateTaskInput, user: User): Promise<Task>;
    findByUserId(userId: Types.ObjectId | string): Promise<Task[]>;
}
