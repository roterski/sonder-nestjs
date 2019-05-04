import { Module, HttpModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { UsersService, AuthService  } from './services';
import { JwtStrategy } from './jwt-strategy';
import { AuthController } from './controllers';
import { PassportModule } from '@nestjs/passport';
import { ProfilesService, Profile } from '../profiles';
import * as env from 'env-var';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secretOrPrivateKey: env.get('APP_SECRET').required().asString(),
      signOptions: {
        expiresIn: '30 days',
      },
    }),
    HttpModule
  ],
  providers: [
    UsersService,
    AuthService,
    JwtStrategy,
    ProfilesService
  ],
  controllers: [AuthController]
})
export class AuthModule {}
