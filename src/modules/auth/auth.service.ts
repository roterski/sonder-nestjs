import { Injectable, HttpService, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { UsersService, User, CreateUserDto } from './users';
import { Observable, of, from, throwError, noop } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) { }

  authenticateWithFacebook(fbAccessToken: string): Observable<string> {
    const params = {
      access_token: fbAccessToken,
      fields: ['id', 'first_name', 'age_range', 'cover', 'email', 'picture'].join(',')
    };

    return this.httpService
      .get('https://graph.facebook.com/v2.9/me', { params })
      .pipe(
        map((response: AxiosRequestConfig) => response.data),
        map((data) => ({
          facebookId: data.id,
          firstName: data.first_name,
          email: data.email
        })),
        switchMap((dto: CreateUserDto) => this.usersService.getOrCreate(dto, ['facebookId'])),
        map((user: User) => this.signJwt(user))
      )
  }

  signUp(email: string, password: string): Observable<string> {
    const saltRounds = 10;

    return this.usersService.findOne({ email }).pipe(
      switchMap((user) => user ? throwError(new ConflictException('User already exists')) : of(null)),
      switchMap(() => from(bcrypt.hash(password, saltRounds))),
      switchMap((passwordHash: string) => this.usersService.create({ email, passwordHash })),
      map((user: User) => this.signJwt(user))
    )
  }

  signIn(email: string, password: string): Observable<string> {
    let user: User;
    const failureMessage = 'User not found or password is incorrect';

    return this.usersService.findOne({ email }).pipe(
        switchMap((foundUser: User) => foundUser ? of(foundUser) : throwError(new ConflictException(failureMessage))),
        tap((foundUser: User) => (user = foundUser)),
        switchMap(() => from(bcrypt.compare(password, user.passwordHash))),
        switchMap((correct: boolean) => correct ? of(user) : throwError(new ConflictException(failureMessage))),
        map(() => this.signJwt(user))
      );
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOneByJwtPayload(payload);
  }

  private signJwt(user: User): string {
    const { id, email } = user;
    return this.jwtService.sign({ id, email });
  }
}
