import { Module } from '@nestjs/common';
import { ProfilesController } from './controllers';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
