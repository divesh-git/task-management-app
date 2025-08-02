import { TaskService } from '../services/task.service';
import { Task } from '../schemas/task.schema';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskInput } from '../dto/update-task.dto';
import { User } from '../../auth/schemas/auth.schema';
export declare class TaskResolver {
    private readonly taskService;
    constructor(taskService: TaskService);
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    findAllTasks(): Promise<Task[]>;
    removeTask(id: string): Promise<Task | null>;
    Task(id: string): Promise<Task>;
    updateTask(input: UpdateTaskInput, user: User): Promise<Task>;
    myTasks(user: User): Promise<Task[]>;
}
