import { PostsController } from './posts.controller';
import { CommentsController } from './comments.controller';
import { TagsController } from './tags.controller';

export const POSTS_CONTROLLERS = [
  PostsController,
  CommentsController,
  TagsController,
];

export * from './posts.controller';
export * from './comments.controller';
export * from './tags.controller';
