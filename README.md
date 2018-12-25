## PREPARE before production

- `ormconfig.json` -> `"synchronize": false`,
- `src/app.module.ts` -> GraphQLModule options -> `debug: false, playground: false`
- replace hardcoded `secretKey` with env variable ( https://github.com/nestjs-community/nestjs-config )
- make typeorm config use env variables

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
