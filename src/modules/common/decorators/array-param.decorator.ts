import { createParamDecorator } from '@nestjs/common';
import * as _ from 'lodash';

export const IntArrayParam = createParamDecorator((data, req) => {
  return _.map(
    _.compact(
      _.flatten([
        (req.query[data] || [])
      ])
    ),
    param => parseInt(param, 10)
  );
});
