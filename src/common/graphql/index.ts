import { join } from 'path';
import { schemaDirectives } from './schema-directives';
import { GqlModuleOptions } from '@nestjs/graphql';

export const graphqlConfig: GqlModuleOptions = {
  typePaths: ['./**/*.graphql'],
  definitions: {
    path: join(process.cwd(), 'src/common/graphql/graphql.schema.ts'),
    outputAs: 'class',
  },
  directiveResolvers: {},
  schemaDirectives: schemaDirectives,
  context: ({ req }) => ({ req })
};
