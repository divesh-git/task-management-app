import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/auth.schema';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { JwtStrategy } from './services/jwt-strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({ secret: 'topSecret51', signOptions: { expiresIn: '1d' } }),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
})
export class AuthModule {}
