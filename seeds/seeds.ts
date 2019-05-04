import * as dotenv from 'dotenv';
dotenv.config();
import { getManager, BaseEntity } from 'typeorm';
import { of, Observable, from } from 'rxjs';
import {
  map,
  mergeMap,
  exhaustMap,
  filter,
  tap
} from 'rxjs/operators';
import { Tag } from '../src/modules/posts';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

export const data = {
  'tags': {
    entity: Tag,
    records: [
      { name: 'play'      },
      { name: 'games'     },
      { name: 'school'    },
      { name: 'family'    },
      { name: 'lifestyle' }
    ]
  }
};

export const seedData = (manager, only = []): Observable<any> => (
  of(...Object.keys(data)).pipe(
    map((key) => data[key]),
    filter(({ entity }) => only.length === 0 || only.includes(entity)),
    tap(({ entity, records}) => console.log(`... seeding ${records.length} ${entity.name}s ...`)),
    mergeMap(({ entity, records }) =>
      of(...records).pipe(
        tap((record) => console.log(record)),
        mergeMap((record) =>
          from(manager.findOne(entity, record)).pipe(
            exhaustMap(found => found ?
              of(found) :
              (manager.create(entity, record) as BaseEntity).save())
          ))
      ),
    ),
  )
);

(async () => {
  const context = await NestFactory.createApplicationContext(AppModule);
  const manager = getManager();
  console.log('SEEDING...');
  seedData(manager).subscribe({
    error: () => console.log('...SEEDING FAILED'),
    complete: () => console.log('...SEEDING DONE.'),
  });
})();
