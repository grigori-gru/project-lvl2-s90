import _ from 'lodash';
import path from 'path';
import parse from './parsers';
import getData from './reader';

const getFormat = item => path.extname(item).slice(1);

const toAst = item =>
  _.reduce(item, (acc, value, key) =>
    [...acc, { key, value: (typeof value === 'object') ? toAst(value) : value }],
    []);

const hasKey = (ast, value) => _.findKey(ast, item => item.key === value.key);

const union = (ast1, ast2) =>
  ast1.reduce((acc, value) => {
    if (typeof value.value !== 'object') {
      return _.find(acc, value) ? acc : [...acc, value];
    }
    const key = hasKey(acc, value);
    const newAcc = acc;
    if (key) {
      newAcc[key].value = union(acc[key].value, value.value);
    }
    return key ? newAcc : [...newAcc, value];
  }, ast2);

const addSign = (ast, file1, file2) =>
  ast.map((item) => {
    const [key1, key2] = [file1, file2].map(arr =>
      (typeof item.value === 'object' ? hasKey(arr, item) : _.find(arr, item)));

    let sign;
    if (key1 && key2) sign = ' ';
    else sign = key1 ? '-' : '+';

    if (typeof item.value === 'object') {
      const newValue = (sign === ' ') ?
        addSign(item.value, file1[key1].value, file2[key2].value) :
        item.value.map(val => `  ${val.key}: ${val.value}`);
      return { [`${sign} ${item.key}`]: newValue };
    }
    return `${sign} ${item.key}: ${item.value}`;
  }, []);

export default (firstName, secondName) => {
  const [file1, file2] = [firstName, secondName].map(item =>
    toAst(parse(getFormat(item), getData(item))));

  const result = addSign(_.sortBy(union(file1, file2), 'key'),
    file1, toAst(parse(getFormat(secondName), getData(secondName))));
  return `{${JSON.stringify(result, null, 2).replace(/[",[\]]/g, '')}}`;
};
