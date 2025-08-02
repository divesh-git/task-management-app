import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from '../schemas/auth.schema';
import { SignupInput } from '../dto/signup.input';
import { LoginInput } from '../dto/login.input';
import { AuthResponse } from '../dto/login.response';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    signup(signupInput: SignupInput): Promise<any>;
    login(loginInput: LoginInput): Promise<AuthResponse>;
    validateUser(userId: string): Promise<User | null>;
}
