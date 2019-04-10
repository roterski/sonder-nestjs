import { TestScheduler } from 'rxjs/testing';
import { of, range } from 'rxjs';
import { take, map, reduce } from 'rxjs/operators';
import { serialize, serializeOne, serializeMany } from './serialize';

const sampleSize = 10**4;

describe('serializeOne', () => {
  const subject = (data, attrs) =>
    of(data).pipe(
      serializeOne(attrs),
      take(1),
    );

  it('serializes object', (done) => {
    const data = { id: 5, name: 'bob', default: true };
    subject(data, ['id', 'name'])
      .subscribe((returned) =>{
        expect(returned).toEqual({ data: { id: 5, name: 'bob' }});
        done();
      });
  })

  it('serializes empty object', done => {
    const data = {};
    subject(data, ['id', 'name']).subscribe(returned => {
      expect(returned).toEqual({ data: {} });
      done();
    });
  });
});

describe('serializeMany', () => {
  const subject = (data, attrs) =>
    of(data).pipe(
      serializeMany(attrs),
      take(1)
    );

  it('serializes array of objects', done => {
    const data = [
      { id: 1, secret: true },
      { id: 2, secret: false },
      { id: 3 }
    ];
    subject(data, ['id']).subscribe(returned => {
      expect(returned).toEqual({ data: [
        { id: 1 }, { id: 2 }, { id: 3 }
      ]});
      done();
    });
  });

  it('serializes empty array', done => {
    const data = [];
    subject(data, ['id']).subscribe(returned => {
      expect(returned).toEqual({ data: []});
      done();
    });
  });
});

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
});
