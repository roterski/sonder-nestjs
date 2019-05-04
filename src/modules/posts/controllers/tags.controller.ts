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
import { TagsService } from '../services';
import { ProfilesService } from '../../profiles';
import { CurrentUser } from '../../auth';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

@Controller('tags')
@UseGuards(AuthGuard())
export class TagsController {
  constructor(
    private readonly tagService: TagsService,
    private readonly profilesService: ProfilesService,
  ) {}

  @Get()
  index(@Req() request): Observable<any> {
    return this.tagService.findAll().pipe(
      map(data => ({ data })),
    );
  }
}
