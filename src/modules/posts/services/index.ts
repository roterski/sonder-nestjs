import { PostsService } from './posts.service';
import { CommentsService } from './comments.service';
import { TagsService } from './tags.service';

export const POSTS_SERVICES = [
  PostsService,
  CommentsService,
  TagsService,
];

export * from './posts.service';
export * from './comments.service';
export * from './tags.service';
