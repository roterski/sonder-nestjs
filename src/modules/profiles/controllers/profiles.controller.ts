import {
  Controller,
  Body,
  Get,
  Post,
  UseGuards,
  Req,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Controller('profiles')
@UseGuards(AuthGuard())
export class ProfilesController {
  constructor() {}
}
