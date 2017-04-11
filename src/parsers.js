import yaml from 'js-yaml';
import ini from 'ini';

const parseData = {
  yml: item => yaml.safeLoad(item),
  json: item => JSON.parse(item),
  ini: item => ini.parse(item),
};

export default (format, data) => parseData[format](data);
