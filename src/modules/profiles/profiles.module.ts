import { Module } from '@nestjs/common';
import { ProfilesController } from './controllers';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities';
import { ProfilesService } from './services';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [ProfilesService],
  controllers: [ProfilesController],
  exports: [ProfilesService]
})
export class ProfilesModule {}
