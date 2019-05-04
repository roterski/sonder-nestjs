import { Controller, Body, Get, Post, UseGuards, Req, Query, Param, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable, of, throwError, from } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { ProfilesService } from '../../profiles';
import { CurrentUser } from '../../auth';
import { serialize, IntArrayParam } from '../../common';
import { PostsService } from '../services';
import { CreatePostDto, CreateTagDto } from '../dto';
import * as _ from 'lodash';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  private postAttrs = [
    'id',
    'title',
    'body',
    'profileId',
    'createdAt',
    'updatedAt',
    { tags: ['id', 'name'] },
  ];

  constructor(
    private readonly postService: PostsService,
    private readonly profilesService: ProfilesService,
  ) {}

  @Get()
  index(@IntArrayParam('tags') tagIds): Observable<any> {
    return from(this.postService.findAll(tagIds)).pipe(
      serialize(this.postAttrs),
      map(({ data }) => ({
        data,
        page: 1,
        perPage: data.length,
        totalEntries: data.length,
        totalPages: 1,
      })),
    );
  }

  @Get(':id')
  show(@Param() params): Observable<any> {
    return this.postService
      .findOneById(params.id)
      .pipe(serialize(this.postAttrs));
  }

  @Post()
  create(
    @Body('post') postParam: CreatePostDto,
    @Body('tags') tagsParam: CreateTagDto[],
    @CurrentUser() currentUser,
  ): Observable<any> {
    return this.profilesService
      .getProfile(currentUser.id, postParam.profileId)
      .pipe(
        switchMap(profile =>
          profile
            ? of(profile)
            : throwError(
                new UnauthorizedException(
                  'profileId does not belong to the user',
                ),
              ),
        ),
        switchMap(profile =>
          this.postService.createWithTags(
            { ...postParam, profileId: profile.id },
            tagsParam,
          ),
        ),
        serialize(this.postAttrs),
      );
  }
}
