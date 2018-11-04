import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('authenticate')
  authenticate(@Body() body): Observable<any> {
    return this.authService.authenticateWithFacebook(body.access_token).pipe(
      map((token: string) => ({ auth_token: token }))
    );
  }
}
