import stringify from './stringify';
import plain from './plain';
import toJSON from './toJSON';

const getRender = { plain, stringify, toJSON };

export default (format, data) => getRender[format](data);
