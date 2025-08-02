import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { SignupInput } from '../dto/signup.input';
import { LoginInput } from '../dto/login.input';
import { AuthResponse } from '../dto/login.response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async signup(@Args('signupInput') signupInput: SignupInput) {
    const result = await this.authService.signup(signupInput);
    return result.accessToken;
  }

  @Mutation(() => AuthResponse)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<AuthResponse>  {
     return this.authService.login(loginInput);
  }
}
