import * as env from 'env-var';

const environment =
  env
    .get('NODE_ENV')
    .required()
    .asString();

const development = {
  type: 'postgres',
  port: env.get('DB_PORT', '5432').asIntPositive(),
  username: env.get('DB_USERNAME').asString(),
  password: env.get('DB_PASSWORD').asString(),
  database: `${env.get('DB_NAME', 'sonder_api_nest').asString()}_dev`,
  synchronize: true,
  logging: true,
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};

const test = {
  ...development,
  synchronize: true,
  dropSchema: true,
  logging: false,
  database: `${env.get('DB_NAME', 'sonder_api_nest').asString()}_test`,
};

const production = {
  type: 'postgres',
  url: env.get('DATABASE_URL').asString(),
  synchronize: false,
  logging: false,
  entities: ['dist/src/**/**.entity.js'],
  migrations: ['dist/src/migration/*.js'],
  subscribers: ['dist/src/subscriber/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};

const config = {
  development,
  test,
  production,
}

module.exports = config[environment];
