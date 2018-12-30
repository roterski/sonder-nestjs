import { join } from 'path';
import { schemaDirectives } from './schema-directives';
import { GqlModuleOptions } from '@nestjs/graphql';
import * as env from 'env-var';

export const graphqlConfig: GqlModuleOptions = {
  typePaths: ['./**/*.graphql'],
  definitions: {
    path: join(process.cwd(), 'src/common/graphql/graphql.schema.ts'),
    outputAs: 'class',
  },
  debug: env.get('NODE_ENV').required().asString() === 'production' ? false : true,
  playground: env.get('NODE_ENV').required().asString() === 'production' ? false : true,
  directiveResolvers: {},
  schemaDirectives: schemaDirectives,
  context: ({ req }) => ({ req })
};
