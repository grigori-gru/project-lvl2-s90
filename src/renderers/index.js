import stringify from './stringify';
import plain from './plain';

const getRender = {
  plain: item => plain(item),
  stringify: item => stringify(item),
};

export default (format, data) => getRender[format](data);
