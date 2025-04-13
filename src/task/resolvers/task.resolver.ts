import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskService } from '../services/task.service';
import { Task } from '../schemas/task.schema';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskInput } from '../dto/update-task.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { GqlAuthGuard } from '../../common/auth.guard';
import { CurrentUser } from '../../common/current-user.decorator';
import { User } from '../../auth/schemas/auth.schema';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Task)
  createTask(
    @Args('createTaskDto') createTaskDto: CreateTaskDto,
    @CurrentUser() user: User, // 👈 inject current user
  ) {
    console.log('Logged in user:', user);
    return this.taskService.create(createTaskDto, user);
  }

  @Query(() => [Task])
  findAllTasks() {
    return this.taskService.findAll();
  }

  // @Mutation(() => Task, {
  //   description: 'Update Task',
  // })
  // async updateTask(@Args('input') input: UpdateTaskInput): Promise<Task> {
  //   return this.taskService.update(input);
  // }

  @Mutation(() => Task)
  removeTask(@Args('id') id: string) {
    return this.taskService.remove(id);
  }

  @Query(() => Task, {
    description: 'Find Task by their id',
  })
  async Task(@Args('id') id: string): Promise<Task> {
    return this.taskService.findById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Task, {
    description: 'Update Task',
  })
  async updateTask(
    @Args('input') input: UpdateTaskInput,
    @CurrentUser() user: User,  // Pass the logged-in user to the service
  ): Promise<Task> {
    return this.taskService.update(input, user);  // Pass user to the update method
  }
}
