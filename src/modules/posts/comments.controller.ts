import { Controller, Body, Get, Post, UseGuards, Req, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/create-post.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('comments')
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(
  ) { }
}
