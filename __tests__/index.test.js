import path from 'path';
import getDifferense from '../src/';

const simpleDif =
`{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

const nestDif =
`{
    common: {
      setting1: Value 1
    - setting2: 200
      setting3: true
    - setting6: {
        key: value
    }
    + setting4: blah blah
    + setting5: {
        key5: value5
    }
  }
    group1: {
    + baz: bars
    - baz: bas
      foo: bar
  }
  - group2: {
      abc: 12345
  }
  + group3: {
      fee: 100500
  }
}`;

const plainDif =
`Property 'timeout' was updated. From '50' to '20'
Property 'proxy' was removed
Property 'verbose' was added with value: true`;

const plainNestDif =
`Property 'common.setting2' was removed
Property 'common.setting6' was removed
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with complex object
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
Property 'group3' was added with complex object`;

const expected = (before, after, format) =>
  getDifferense(path.resolve(__dirname, '__fixtures__', before),
                path.resolve(__dirname, '__fixtures__', after),
                format);

test('JSON equal expected data', () => {
  expect(expected('before.json', 'after.json')).toEqual(simpleDif);
});

test('YAML equal expected data', () => {
  expect(expected('before.yml', 'after.yml')).toEqual(simpleDif);
});

test('ini equal expected data', () => {
  expect(expected('before.ini', 'after.ini')).toEqual(simpleDif);
});

test('nested JSON equal expected data', () => {
  expect(expected('before_nest.json', 'after_nest.json')).toEqual(nestDif);
});

test('nested YAML equal expected data', () => {
  expect(expected('before_nest.yml', 'after_nest.yml')).toEqual(nestDif);
});

test('nested ini equal expected data', () => {
  expect(expected('before_nest.ini', 'after_nest.ini')).toEqual(nestDif);
});

test('JSON equal expected data with option plain', () => {
  expect(expected('before.json', 'after.json', 'plain')).toEqual(plainDif);
});

test('JSON equal expected data with option plain', () => {
  expect(expected('before_nest.json', 'after_nest.json', 'plain')).toEqual(plainNestDif);
});
