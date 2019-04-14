import { TestScheduler } from 'rxjs/testing';
import { of, range } from 'rxjs';
import { take, map, reduce } from 'rxjs/operators';
import { serialize } from './serialize';

describe('serialize', () => {
  const subject = (data, attrs) =>
    of(data).pipe(
      serialize(attrs),
      take(1),
    );

  it('serializes object', done => {
    const data = { id: 5, name: 'bob', default: true };
    subject(data, ['id', 'name']).subscribe(returned => {
      expect(returned).toEqual({ data: { id: 5, name: 'bob' } });
      done();
    });
  });

  it('serializes array of objects', done => {
    const data = [
      { id: 1, secret: true },
      { id: 2, secret: false },
      { id: 3 },
    ];
    subject(data, ['id']).subscribe(returned => {
      expect(returned).toEqual({ data: [{ id: 1 }, { id: 2 }, { id: 3 }] });
      done();
    });
  });

  it('serializes array of nested objects', done => {
    const data = [
      { id: 1, tags: [{ id: 2, secret: true }, { id: 3 }] },
      { id: 2, tags: [{ id: 3 }]}
    ];

    subject(data, ['id', 'tags']).subscribe(returned => {
      expect(returned).toEqual(
        {
          data: [
            { id: 1, tags: [{ id: 2, secret: true }, { id: 3}] },
            { id: 2, tags: [{ id: 3 }] }
          ]
        }
      );
      done();
    })
  });

  xit('serializes nested objects', done => {
    const data = [
      { id: 1, tags: [{ id: 2, secret: true }, { id: 3 }] },
      { id: 2, tags: [{ id: 3 }] }
    ];

    subject(data, ['id', { tags: ['id'] }]).subscribe(returned => {
      expect(returned).toEqual(
        {
          data: [
            { id: 1, tags: [{ id: 2, secret: true }, { id: 3 }] },
            { id: 2, tags: [{ id: 3 }] }
          ]
        }
      );
      done();
    })
  });
});
