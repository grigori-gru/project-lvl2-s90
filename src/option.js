import stringify from './options/stringify';
import plain from './options/plain';

const useFormat = {
  plain: item => plain(item),
  stringify: item => stringify(item),
};

export default (format, data) => useFormat[format](data);
