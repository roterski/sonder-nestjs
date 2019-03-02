import { Module, HttpModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { UsersService, AuthService  } from './services';
import { JwtStrategy } from './jwt-strategy';
import { AuthController } from './controllers';
import { PassportModule } from '@nestjs/passport';
import * as env from 'env-var';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secretOrPrivateKey: env.get('APP_SECRET').required().asString(),
      signOptions: {
        expiresIn: 3600,
      },
    }),
    HttpModule
  ],
  providers: [UsersService, AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
