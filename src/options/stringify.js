const sign = {
  unchanged: () => ' ',
  added: () => '+',
  removed: () => '-',
  updated: age => (age === 'old' ? '+' : '-'),
};

const fromAst = item =>
  item.reduce((acc, { type, key, oldValue, newValue, children }) =>
    (newValue ? { ...acc,
      [`${sign[type]('old')} ${key}`]: oldValue,
      [`${sign[type]('new')} ${key}`]: newValue,
    } :
    {
      ...acc,
      [`${sign[type]()} ${key}`]: children.length > 0 ? fromAst(children) : oldValue,
    }), {});

export default item =>
  JSON.stringify(fromAst(item), null, 2).replace(/[",[\]]/g, '');
