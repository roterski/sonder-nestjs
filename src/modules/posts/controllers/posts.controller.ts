import { Controller, Body, Get, Post, UseGuards, Req, Param, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { ProfilesService } from '../../profiles';
import { CurrentUser } from '../../auth';
import { serialize, serializeOne } from '../../common'
import { PostsService } from '../services';
import { CreatePostDto, CreateTagDto } from '../dto';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  private postAttrs = ['id', 'title', 'body', 'tags', 'profileId', 'createdAt', 'updatedAt'];

  constructor(
    private readonly postService: PostsService,
    private readonly profilesService: ProfilesService,
  ) {}

  @Get()
  index(@Req() request): Observable<any> {
    return this.postService.findAll().pipe(
      tap((posts) => {

      }),
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
      .pipe(
        serialize(this.postAttrs)
      );
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
        switchMap((profile) => profile ?
          of(profile) :
          throwError(new UnauthorizedException('profileId does not belong to the user'))
        ),
        switchMap(profile =>
          this.postService.createWithTags(
            { ...postParam, profileId: profile.id },
            tagsParam,
          ),
        ),
        serialize(this.postAttrs)
      );
  }
}
