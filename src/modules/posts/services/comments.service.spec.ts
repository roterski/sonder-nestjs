import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { Comment } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CommentsService', () => {
  // let service: CommentsService;
  // beforeAll(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       CommentsService
  //     ],
  //   }).compile();
  //   service = module.get<CommentsService>(CommentsService);
  // });
  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
