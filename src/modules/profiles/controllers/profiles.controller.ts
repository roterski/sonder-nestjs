import {
  Controller,
  Body,
  Get,
  Post,
  UseGuards,
  Req,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CurrentUser } from '../../auth';
import { Profile } from '../entities';
import { ProfilesService } from '../services';
import { serialize } from '../../common'
import * as _ from 'lodash';

@Controller('profiles')
@UseGuards(AuthGuard())
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Get()
  index(@Query('id') ids): Observable<any> {
    return this.profilesService
      .findByIds(ids)
      .pipe(
        serialize(['id', 'name'])
      );
  }

  @Get('my')
  my(@CurrentUser() currentUser): Observable<any> {
    return this.profilesService
      .findByUserId(currentUser.id)
      .pipe(
        serialize(['id', 'name'])
      );
  }
}
