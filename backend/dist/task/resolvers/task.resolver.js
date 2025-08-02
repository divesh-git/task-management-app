"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const task_service_1 = require("../services/task.service");
const task_schema_1 = require("../schemas/task.schema");
const create_task_dto_1 = require("../dto/create-task.dto");
const update_task_dto_1 = require("../dto/update-task.dto");
const decorators_1 = require("@nestjs/common/decorators");
const auth_guard_1 = require("../../common/auth.guard");
const current_user_decorator_1 = require("../../common/current-user.decorator");
const auth_schema_1 = require("../../auth/schemas/auth.schema");
let TaskResolver = class TaskResolver {
    constructor(taskService) {
        this.taskService = taskService;
    }
    createTask(createTaskDto, user) {
        console.log('Logged in user:', user);
        return this.taskService.create(createTaskDto, user);
    }
    findAllTasks() {
        return this.taskService.findAll();
    }
    removeTask(id) {
        return this.taskService.remove(id);
    }
    Task(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.taskService.findById(id);
        });
    }
    updateTask(input, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.taskService.update(input, user);
        });
    }
    myTasks(user) {
        return this.taskService.findByUserId(user._id);
    }
};
exports.TaskResolver = TaskResolver;
__decorate([
    (0, decorators_1.UseGuards)(auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => task_schema_1.Task),
    __param(0, (0, graphql_1.Args)('createTaskDto')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto,
        auth_schema_1.User]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "createTask", null);
__decorate([
    (0, graphql_1.Query)(() => [task_schema_1.Task]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "findAllTasks", null);
__decorate([
    (0, graphql_1.Mutation)(() => task_schema_1.Task),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "removeTask", null);
__decorate([
    (0, graphql_1.Query)(() => task_schema_1.Task, {
        description: 'Find Task by their id',
    }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "Task", null);
__decorate([
    (0, decorators_1.UseGuards)(auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => task_schema_1.Task, {
        description: 'Update Task',
    }),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_task_dto_1.UpdateTaskInput,
        auth_schema_1.User]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "updateTask", null);
__decorate([
    (0, decorators_1.UseGuards)(auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Query)(() => [task_schema_1.Task], { description: 'Tasks created by logged in user' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_schema_1.User]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "myTasks", null);
exports.TaskResolver = TaskResolver = __decorate([
    (0, graphql_1.Resolver)(() => task_schema_1.Task),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskResolver);
//# sourceMappingURL=task.resolver.js.map