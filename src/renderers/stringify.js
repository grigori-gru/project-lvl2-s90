const sign = {
  unchanged: () => ' ',
  added: () => '+',
  removed: () => '-',
  updated: age => (age === 'old' ? '-' : '+'),
};

const fromAst = item =>
  item.reduce((acc, { type, key, oldValue, newValue, children }) => {
    if (oldValue) {
      return {
        ...acc,
        [`${sign[type]('new')} ${key}`]: newValue,
        [`${sign[type]('old')} ${key}`]: oldValue,
      };
    }
    return {
      ...acc,
      [`${sign[type]()} ${key}`]: children.length > 0 ? fromAst(children) : newValue,
    };
  }, {});

export default data =>
  JSON.stringify(fromAst(data), null, 2).replace(/[",[\]]/g, '');
