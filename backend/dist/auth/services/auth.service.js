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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const auth_schema_1 = require("../schemas/auth.schema");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    signup(signupInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashed = yield bcrypt.hash(signupInput.password, 10);
            const user = new this.userModel(Object.assign(Object.assign({}, signupInput), { password: hashed }));
            yield user.save();
            console.log("------------>user.email");
            return this.login({ email: user.email, password: signupInput.password });
        });
    }
    login(loginInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ email: loginInput.email });
            if (!user)
                throw new common_1.UnauthorizedException('Invalid credentials');
            const isMatch = yield bcrypt.compare(loginInput.password, user.password);
            if (!isMatch)
                throw new common_1.UnauthorizedException('Invalid credentials');
            const userResponse = { id: user.id, email: user.email, name: "test" };
            const payload = { userId: user._id, email: user.email };
            return {
                user: userResponse,
                accessToken: this.jwtService.sign(payload),
            };
        });
    }
    validateUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findById(userId);
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(auth_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map