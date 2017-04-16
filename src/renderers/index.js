import stringify from './stringify';
import plain from './plain';

const getRender = { plain, stringify };

export default (format, data) => getRender[format](data);
