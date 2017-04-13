import _ from 'lodash';
import path from 'path';
import parse from './parsers';
import getData from './reader';

const getFormat = item => path.extname(item).slice(1);

const toAst = item =>
  _.reduce(item, (acc, value, key) =>
    [...acc, { key, value: (typeof value === 'object') ? toAst(value) : value }],
    []);

const fromAst = item =>
  item.reduce((acc, { sign, key, value }) => {
    const newKey = `${sign} ${key}`;
    return {
      ...acc,
      [newKey]: (typeof value === 'object') ? fromAst(value) : value,
    };
  }, {});

const hasKey = (ast, elem) =>
  (typeof elem.value === 'object' ?
    _.findKey(ast, item => item.key === elem.key) : _.find(ast, elem));

const union = (ast1, ast2) =>
  ast1.reduce((acc, value) => {
    const key = hasKey(acc, value);
    if (typeof value.value === 'object' && key) {
      acc[key].value = union(acc[key].value, value.value);
    }
    return _.sortBy(key ? acc : [...acc, value], 'key');
  }, ast2);

const addSign = (ast, file1, file2) =>
  ast.map(({ key, value }) => {
    const [key1, key2] = [file1, file2].map(arr => hasKey(arr, { key, value }));

    let sign;
    if (key1 && key2) sign = ' ';
    else sign = key1 ? '-' : '+';

    if (typeof value !== 'object') {
      return { sign: `${sign}`, key, value };
    }

    const newValue = (sign === ' ') ?
      addSign(value, file1[key1].value, file2[key2].value) :
        addSign(value, value, value);
    return { sign: `${sign}`, key, value: newValue };
  });

export default (firstName, secondName) => {
  const [file1, file2] = [firstName, secondName].map(item =>
    toAst(parse(getFormat(item), getData(item))));

  const newFile2 = toAst(parse(getFormat(secondName), getData(secondName)));

  const result = addSign(union(file1, file2), file1, newFile2);

  // console.log(JSON.stringify(fromAst(result), null, 2).replace(/[",]/g, ''));

  return JSON.stringify(fromAst(result), null, 2).replace(/[",[\]]/g, '');
};
