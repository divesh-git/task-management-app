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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const task_schema_1 = require("../schemas/task.schema");
let TaskService = class TaskService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    create(createTaskDto, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = new this.taskModel(Object.assign(Object.assign({}, createTaskDto), { userId: user._id }));
            const result = yield created.save();
            return result;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.taskModel.find().exec();
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this.taskModel.findByIdAndDelete(id).exec();
            return result;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskModel.findById(id).exec();
            if (!task) {
                throw new common_1.NotFoundException('Task not found');
            }
            return task;
        });
    }
    update(input, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskModel.findOneAndUpdate({ _id: input.id, userId: user._id }, { $set: input }, { new: true }).exec();
            if (!task) {
                throw new common_1.NotFoundException('Task not found or not authorized');
            }
            return task;
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = typeof userId === 'string' ? userId : userId.toString();
            return this.taskModel.find({ userId: id }).exec();
        });
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TaskService);
//# sourceMappingURL=task.service.js.map