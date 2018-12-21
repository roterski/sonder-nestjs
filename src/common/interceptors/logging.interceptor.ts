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
    const graphqlReq =  _.get(context, 'args[2].req');

    return call$.pipe(tap(() => {
      const elapsed = `+${Date.now() - now} ms`;
      const timestamp = `[${new Date().toISOString()}]`;

      if (req) {
        console.log(timestamp, `[${req.method}] ${req.path}`, req.params, req.query, anonymize()(req.body), elapsed);
      } else if (graphqlReq) {
        console.log(timestamp, `[${graphqlReq.method}] ${graphqlReq.originalUrl}`, graphqlReq['body']['variables']);
        console.log(graphqlReq['body']['query'], elapsed);
      }
    }))
  }
}
