import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('authenticate/facebook')
  authenticate(@Body() body): Observable<any> {
    return this.authService.authenticateWithFacebook(body.access_token).pipe(
      map((token: string) => ({ auth_token: token }))
    );
  }

  @Post('sign-up')
  signUp(@Body() body): Observable<any> {
    return this.authService.signUp(body.email, body.password).pipe(
      map((token: string) => ({ auth_token: token }))
    )
  }

  @Post('sign-in')
  signIn(@Body() body): Observable<any> {
    return this.authService.signIn(body.email, body.password).pipe(
      map((token: string) => ({ auth_token: token }))
    )
  }
}
