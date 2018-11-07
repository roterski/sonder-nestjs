import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(createUserDto);
  }

  async getOrCreate(data: any): Promise<User> {
    let user = await this.userRepository.findOne({ facebookId: data.id})

    if (user) { return user }

    return await this.userRepository.create({
      facebookId: data.id,
      firstName: data.first_name,
      email: data.email,
    });
  }

  async findOneByJwtPayload(payload: JwtPayload): Promise<User> {
    return await this.userRepository.findOne({ id: payload.id, email: payload.email });
  }
}
