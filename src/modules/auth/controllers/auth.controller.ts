import { Controller, Post, Body } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services';
import { SignUpDto } from '../dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('authenticate/facebook')
  authenticate(@Body() body): Observable<any> {
    return this.authService
      .authenticateWithFacebook(body.access_token)
      .pipe(map((token: string) => ({ auth_token: token })));
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto): Observable<any> {
    return this.authService
      .signUp(signUpDto)
      .pipe(map((token: string) => ({ auth_token: token })));
  }

  @Post('sign-in')
  signIn(@Body() body): Observable<any> {
    return this.authService
      .signIn(body.email, body.password)
      .pipe(map((token: string) => ({ auth_token: token })));
  }
}
