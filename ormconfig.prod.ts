import * as env from 'env-var';

const isProduction =
  env
    .get('NODE_ENV')
    .required()
    .asString() === 'production';

module.exports = {
  type: 'postgres',
  url: env.get('DATABASE_URL').asString(),
  synchronize: isProduction ? false : true,
  logging: isProduction ? false : true,
  entities: ['dist/src/**/**.entity{.ts,.js}'],
  migrations: ['dist/src/migration/**/*.ts'],
  subscribers: ['dist/src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
