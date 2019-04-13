import { Observable, of, OperatorFunction, iif } from 'rxjs';
import { map, switchMap, reduce, tap, delay } from 'rxjs/operators'
import * as _ from 'lodash';

export const serializeOne = (attrs): OperatorFunction<{}, { data: any }> =>
  map(data => ({ data: _.pick(data, attrs) }));

export const serializeMany = (attrs): OperatorFunction<{}, { data: any }> => (
  source: Observable<any>,
) =>
  source.pipe(
    map((many: any[]) => many.map(data => _.pick(data, attrs))),
    map(data => ({ data }))
  );

export const serialize = (attrs): OperatorFunction<{}, { data: any }> =>
  (source: Observable<any>) =>
    source.pipe(
      map((data: any) => Array.isArray(data) ? data.map(el => _.pick(el, attrs)) : _.pick(data, attrs)),
      map(data => ({ data }))
    );
