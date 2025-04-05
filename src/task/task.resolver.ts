import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskInput } from './dto/update-task.dto';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  createTask(@Args('createTaskDto') createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Query(() => [Task])
  findAllTasks() {
    return this.taskService.findAll();
  }

  @Mutation(() => Task, {
    description: 'Update Task'
})
async updateTask(@Args('input') input: UpdateTaskInput): Promise<Task> {
    return this.taskService.update(input);
}

  @Mutation(() => Task)
  removeTask(@Args('id') id: string) {
    return this.taskService.remove(id);
  }

  @Query(() => Task, {
    description: 'Find Task by their id'
})
async Task(@Args('id') id: string): Promise<Task> {
    return this.taskService.findById(id);
}
}
