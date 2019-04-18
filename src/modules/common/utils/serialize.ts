import { Observable, of, OperatorFunction, iif } from 'rxjs';
import { map, switchMap, reduce, tap, delay } from 'rxjs/operators'
import * as _ from 'lodash';

const serializeOne = (data, attrs) => (
  attrs.reduce((acc, attr) => {
    if (_.isObject(attr)) {
      const key = Object.keys(attr)[0];
      acc[key] = serializeNode(data[key], attr[key]);
    } else {
      acc[attr] = data[attr];
    }
    return acc;
  }, {})
);

const serializeMany = (data: any[], attrs) => data.map(el => serializeOne(el, attrs));

const serializeNode = (data, attrs) => (Array.isArray(data) ? serializeMany : serializeOne)(data, attrs);

export const serialize = (attrs): OperatorFunction<{}, { data: any }> =>
  (source: Observable<any>) =>
    source.pipe(
      map((data: any) => serializeNode(data, attrs)),
      map(data => ({ data }))
    );
