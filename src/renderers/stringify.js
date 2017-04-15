const sign = {
  unchanged: () => ' ',
  added: () => '+',
  removed: () => '-',
  updated: age => (age === 'old' ? '+' : '-'),
};

const fromAst = item =>
  item.reduce((acc, { type, key, oldValue, newValue, children }) => {
    if (newValue) {
      return {
        ...acc,
        [`${sign[type]('old')} ${key}`]: oldValue,
        [`${sign[type]('new')} ${key}`]: newValue,
      };
    }
    return {
      ...acc,
      [`${sign[type]()} ${key}`]: children.length > 0 ? fromAst(children) : oldValue,
    };
  }, {});

export default data =>
  JSON.stringify(fromAst(data), null, 2).replace(/[",[\]]/g, '');
