import { ExceptionInterceptor } from './exception.interceptor';
import { LoggingInterceptor } from './logging.interceptor';

export const INTERCEPTORS = [
  ExceptionInterceptor,
  LoggingInterceptor,
];

export * from './exception.interceptor';
export * from './logging.interceptor';
