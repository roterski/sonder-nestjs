import * as env from 'env-var';

const isProduction =
  env
    .get('NODE_ENV')
    .required()
    .asString() === 'production';

const devConfig = {
  type: 'postgres',
  port: env.get('DB_PORT', '5432').asIntPositive(),
  username: env.get('DB_USERNAME').asString(),
  password: env.get('DB_PASSWORD').asString(),
  database: env.get('DB_NAME', 'sonder_api_nest_dev').asString(),
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

const prodConfig = {
  type: 'postgres',
  url: env.get('DATABASE_URL').asString(),
  synchronize: isProduction ? false : true,
  logging: isProduction ? false : true,
  entities: ['dist/src/**/**.entity{.ts,.js}'],
  migrations: ['dist/src/migration/*.js'],
  subscribers: ['dist/src/subscriber/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};

module.exports = isProduction ? prodConfig : devConfig;
