import _ from 'lodash';
import yaml from 'js-yaml';
// import ini from 'ini';

const parseData = {
  yml: item => yaml.safeLoad(item),
  json: item => JSON.parse(item),
  // ini: item => ini.parse(item),
};

const toAst = file => _.reduce(file, (acc, value, key) =>
  [...acc, { key,
    value: (typeof value === 'object') ? toAst(value) : value }],
    []);

export default (format, data) => toAst(parseData[format](data));
