import { Observable, of, OperatorFunction, iif } from 'rxjs';
import { map, switchMap, reduce, tap, delay } from 'rxjs/operators'
import * as _ from 'lodash';
import { setTimeout, clearTimeout } from 'timers';

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
      switchMap((data) => 
        iif(() => Array.isArray(data),
          source.pipe(serializeMany(attrs)),
          source.pipe(serializeOne(attrs))
        )
      )
    );
