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
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
