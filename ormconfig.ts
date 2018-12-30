import * as env from 'env-var';

module.exports = {
   'type': 'postgres',
   'port': env.get('DB_PORT', '5432').asIntPositive(),
   'username': env.get('DB_USERNAME').required().asString(),
   'password': env.get('DB_PASSWORD').required().asString(),
   'database': env.get('DB_NAME', 'sonder_api_nest_dev').asString(),
   'synchronize': env.get('NODE_ENV').required().asString() === 'production' ? false : true,
   'logging': env.get('NODE_ENV').required().asString() === 'production' ? false : true,
   'entities': [
      'src/**/**.entity{.ts,.js}'
   ],
   'migrations': [
      'src/migration/**/*.ts'
   ],
   'subscribers': [
      'src/subscriber/**/*.ts'
   ],
   'cli': {
      'entitiesDir': 'src/entity',
      'migrationsDir': 'src/migration',
      'subscribersDir': 'src/subscriber'
   }
}
