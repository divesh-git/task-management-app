import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/auth.schema';
import { SignupInput } from '../dto/signup.input';
import { LoginInput } from '../dto/login.input';
import { AuthResponse } from '../dto/login.response';
import { UserDto } from 'src/model/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupInput: SignupInput): Promise<any> {
    const hashed = await bcrypt.hash(signupInput.password, 10);
    const user = new this.userModel({ ...signupInput, password: hashed });
    await user.save();

    return this.login({ email: user.email, password: signupInput.password });
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const user = await this.userModel.findOne({ email: loginInput.email });

    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isMatch = await bcrypt.compare(loginInput.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const userResponse: UserDto = { id: user.id, email: user.email, name: user.name };
    const payload = { sub: user.id, email: user.email };
    return {
      user: userResponse,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(userId: string): Promise<User | null > {
    return this.userModel.findById(userId);
  }
}
