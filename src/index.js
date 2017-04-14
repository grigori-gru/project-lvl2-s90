import _ from 'lodash';
import path from 'path';
import parse from './parsers';
import getData from './reader';
import useFormat from './option';

const getFormat = item => path.extname(item).slice(1);

const createNode = (type, key, oldValue, newValue, children) =>
  ({ type, key, oldValue, newValue, children });

const makeAst = (f1, f2) =>
  _.union(_.keys(f1), _.keys(f2)).map((key) => {
    if (_.has(f1, key) && _.has(f2, key)) {
      if (typeof f1[key] === 'object') {
        return createNode('unchanged', key, '', '', makeAst(f1[key], f2[key]));
      }
      return (f1[key] === f2[key]) ?
        createNode('unchanged', key, f1[key], '', []) :
        createNode('updated', key, f2[key], f1[key], []);
    }
    if (_.has(f1, key)) {
      return (typeof f1[key] === 'object') ?
        createNode('removed', key, '', '', makeAst(f1[key], f1[key])) :
        createNode('removed', key, '', f1[key], []);
    }
    return (typeof f2[key] === 'object') ?
      createNode('added', key, '', '', makeAst(f2[key], f2[key])) :
      createNode('added', key, '', f2[key], []);
  });

export default (firstName, secondName, option = 'stringify') => {
  const [f1, f2] = [firstName, secondName].map(item =>
    parse(getFormat(item), getData(item)));

  const result = makeAst(f1, f2);

  return useFormat(option, result);
};
