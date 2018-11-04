import { Injectable, HttpService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { UsersService, User } from './users';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) { }

  authenticateWithFacebook(fbAccessToken: string): Observable<string> {
    return this.httpService.get('https://graph.facebook.com/v2.9/me', {
      params: {
        access_token: fbAccessToken,
        fields: this.requestedFields().join(',')
      }
    }).pipe(
      map((response: AxiosRequestConfig) => response.data),
      switchMap((data) => this.usersService.getOrCreate(data)),
      map((user: User) => {
        const { id, email } = user;
        return this.jwtService.sign({ id, email });
      })
    )
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOneByJwtPayload(payload);
  }

  private requestedFields(): string[] {
    return ['id', 'first_name', 'age_range', 'cover', 'email', 'picture'];
  }
}
