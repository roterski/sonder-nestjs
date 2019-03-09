import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as _ from 'lodash';
import * as anonymize from 'anonymize';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    const now = Date.now();
    const req = _.get(context, 'args[0]');

    return call$.pipe(tap(() => {
      const elapsed = `+${Date.now() - now} ms`;
      const timestamp = `[${new Date().toISOString()}]`;

      if (req && req.method && req.path) {
        console.log(timestamp, `[${req.method}] ${req.path}`, req.params, req.query, anonymize()(req.body), elapsed);
      }
    }))
  }
}
