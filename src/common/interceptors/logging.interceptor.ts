import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    const now = Date.now();
    const req = context['args'][0];

    return call$.pipe(tap(() => {
      const elapsed = `${Date.now() - now} ms`;
      console.log(`[${req.method}] ${req.path}`, req.params, `...${elapsed}`);
    }))
  }
}
