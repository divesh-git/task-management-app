import { AuthService } from '../services/auth.service';
import { SignupInput } from '../dto/signup.input';
import { LoginInput } from '../dto/login.input';
import { AuthResponse } from '../dto/login.response';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupInput: SignupInput): Promise<any>;
    login(loginInput: LoginInput): Promise<AuthResponse>;
}
