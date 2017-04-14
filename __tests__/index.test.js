import path from 'path';
import getDifferense from '../src/';

// const result =
// `{
//     host: hexlet.io
//   + timeout: 20
//   - timeout: 50
//   - proxy: 123.234.53.22
//   + verbose: true
// }`;

const resultAst =
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

const plainResult =
`Property 'timeout' was updated. From '50' to '20'
Property 'proxy' was removed
Property 'verbose' was added with value: true`;

// test('JSON equal expected data', () => {
//   expect(getDifferense(path.resolve(__dirname, '__fixtures__', 'before.json'),
//                        path.resolve(__dirname, '__fixtures__', 'after.json')))
//     .toEqual(result);
// });

test('JSON equal expected data', () => {
  expect(getDifferense(path.resolve(__dirname, '__fixtures__', 'before.json'),
                       path.resolve(__dirname, '__fixtures__', 'after.json'),
                       'plain'))
    .toEqual(plainResult);
});

// test('YAML equal expected data', () => {
//   expect(getDifferense(path.resolve(__dirname, '__fixtures__', 'before.yml'),
//                        path.resolve(__dirname, '__fixtures__', 'after.yml')))
//     .toEqual(result);
// });
//
// test('ini equal expected data', () => {
//   expect(getDifferense(path.resolve(__dirname, '__fixtures__', 'before.ini'),
//                        path.resolve(__dirname, '__fixtures__', 'after.ini')))
//     .toEqual(result);
// });

test('JSON AST equal expected data', () => {
  expect(getDifferense(path.resolve(__dirname, '__fixtures__', 'before_ast.json'),
                       path.resolve(__dirname, '__fixtures__', 'after_ast.json')))
    .toEqual(resultAst);
});


// test('YAML AST equal expected data', () => {
//   expect(getDifferense(path.resolve(__dirname, '__fixtures__', 'before_ast.yml'),
//                        path.resolve(__dirname, '__fixtures__', 'after_ast.yml')))
//     .toEqual(resultAst);
// });
//
// test('ini AST equal expected data', () => {
//   expect(getDifferense(path.resolve(__dirname, '__fixtures__', 'before_ast.ini'),
//                        path.resolve(__dirname, '__fixtures__', 'after_ast.ini')))
//     .toEqual(resultAst);
// });
