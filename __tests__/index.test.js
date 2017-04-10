import path from 'path';
import getDifferense from '../src/';

const result =
`{
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

// const resultAst =
// `{
//     common: {
//         setting1: Value 1
//       - setting2: 200
//         setting3: true
//       - setting6: {
//             key: value
//         }
//       + setting4: blah blah
//       + setting5: {
//             key5: value5
//         }
//     }
//     group1: {
//       + baz: bars
//       - baz: bas
//         foo: bar
//     }
//   - group2: {
//         abc: 12345
//     }
//   + group3: {
//         fee: 100500
//     }
// }`;

test('JSON equal expected data', () => {
  expect(getDifferense(path.resolve(__dirname, '__fixtures__', 'before.json'),
                       path.resolve(__dirname, '__fixtures__', 'after.json')))
    .toEqual(result);
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
//
// test('AST JSON equal expected data', () => {
//   expect(getDifferense(path.resolve(__dirname, '__fixtures__', 'before_ast.json'),
//                        path.resolve(__dirname, '__fixtures__', 'after_ast.json')))
//     .toEqual(resultAst);
// });
