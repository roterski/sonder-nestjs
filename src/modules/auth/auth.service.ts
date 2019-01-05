import { Injectable, HttpService } from '@nestjs/common';
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
    debugger
    return this.usersService.findOne({ email }).pipe(
      tap((user) => {
        debugger
      }),
      switchMap((user) => user ? throwError('User already exists') : of(null)),
      tap((user) => {
        debugger
      }),
      // switchMap(() => from(bcrypt.hash(password, saltRounds))),
      // switchMap((passwordHash: string) => this.usersService.create({ email, passwordHash })),
      map((user: User) => this.signJwt(user))
    )
  }

  // signUp(email: string, password: string): Observable<string> {
  //   const saltRounds = 10;
  //   const createUser$ = from(bcrypt.hash(password, saltRounds)).pipe(
  //     switchMap((passwordHash: string) => this.usersService.create({ email, passwordHash })),
  //     map((user: User) => this.signJwt(user))
  //   )

  //   return this.usersService.findOne({ email }).pipe(
  //     switchMap((user) => user ? of(null) : createUser$)
  //   )
  // }

  signIn(email: string, password: string): Observable<string> {
    const authenticateUser$ = (user: User) => (
      from(bcrypt.compare(password, user.passwordHash)),
      switchMap((authenticated) => authenticated ? this.signJwt(user) : of(null))
    );

    return this.usersService.findOne({ email }).pipe(
      switchMap((user) => user ? of(null) : authenticateUser$(user))
    )
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOneByJwtPayload(payload);
  }

  private signJwt(user: User): string {
    const { id, email } = user;
    return this.jwtService.sign({ id, email });
  } 
}
