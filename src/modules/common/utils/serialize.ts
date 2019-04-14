import { Observable, of, OperatorFunction, iif } from 'rxjs';
import { map, switchMap, reduce, tap, delay } from 'rxjs/operators'
import * as _ from 'lodash';

// const serializeOne = (data, attrs) => (
//   attrs.reduce((acc, attr) => {
//     (_.isObject(attr) || _.isArray(attr)) ? (acc[attrs] = serializeNode(data, attr)): (acc[attr] = data[attr])
//     return acc;
//   }, {})
// )
const serializeOne = (data, attrs) => _.pick(data, attrs)
const serializeMany = (data: any[], attrs) => data.map(el => serializeOne(el, attrs))
const serializeNode = (data, attrs) => (Array.isArray(data) ? serializeMany : serializeOne)(data, attrs)
export const serialize = (attrs): OperatorFunction<{}, { data: any }> =>
  (source: Observable<any>) =>
    source.pipe(
      map((data: any) => serializeNode(data, attrs)),
      map(data => ({ data }))
    );
