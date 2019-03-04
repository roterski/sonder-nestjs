import { Module } from '@nestjs/common';
import { ProfilesController } from './controllers';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
