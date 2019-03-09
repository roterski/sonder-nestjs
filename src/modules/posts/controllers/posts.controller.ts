import { Controller, Body, Get, Post, UseGuards, Req, Param, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from '../services';
import { ProfilesService } from '../../profiles';
import { CurrentUser } from '../../auth';
import { CreatePostDto } from '../dto';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private readonly postService: PostsService, private readonly profilesService: ProfilesService) {}

  @Get()
  index(@Req() request): Observable<any> {
    return this.postService.findAll().pipe(
      map(posts => ({
        data: posts,
        page: 1,
        perPage: posts.length,
        totalEntries: posts.length,
        totalPages: 1,
      })),
    );
  }

  @Get(':id')
  show(@Param() params): Observable<any> {
    return this.postService
      .findOneById(params.id)
      .pipe(map(post => ({ data: post })));
  }

  @Post()
  create(@Body('post') postParam: CreatePostDto, @CurrentUser() currentUser): Observable<any> {
    return this.profilesService
      .getProfile(currentUser.id, postParam.profileId)
      .pipe(
        switchMap((profile) => this.postService.create({...postParam, profileId: profile.id })),
        map(post => ({ data: post })),
      );
  }
}
