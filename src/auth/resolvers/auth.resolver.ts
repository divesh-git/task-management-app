import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { SignupInput } from '../dto/signup.input';
import { LoginInput } from '../dto/login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async signup(@Args('signupInput') signupInput: SignupInput) {
    const result = await this.authService.signup(signupInput);
    return result.accessToken;
  }

  @Mutation(() => String)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const result = await this.authService.login(loginInput);
    return result.accessToken;
  }
}
