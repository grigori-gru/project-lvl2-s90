import _ from 'lodash';
import path from 'path';
import parse from './parsers';
import getData from './reader';

const getFormat = item => path.extname(item).slice(1);

export default (firstName, secondName) => {
  const [file1, file2] = [firstName, secondName].map(item =>
    parse(getFormat(item), getData(item)));

  const result = _.unionWith(file1, file2, _.isEqual)
    .sort((a, b) => (a.key === b.key ? a.value < b.value : a.key > b.key))
    .reduce((acc, item) => {
      let sign;
      if (_.find(file1, item) && _.find(file2, item)) sign = ' ';
      else sign = _.find(file1, item) ? '-' : '+';
      return [...acc, `  ${sign} ${item.key}: ${item.value}`];
    }, [])
    .join('\n');

  return `{\n${result}\n}`;
};
