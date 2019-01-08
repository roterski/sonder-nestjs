import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { } from './users/'

describe('Auth Controller', () => {
  let testModule: TestingModule;
  let authController: AuthController;
  let authService: AuthService;

  beforeAll(async () => {
    testModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService]
    }).compile();
  });
  it('should be defined', () => {
    const controller: AuthController = testModule.get<AuthController>(AuthController);
    expect(controller).toBeDefined();
  });
});
