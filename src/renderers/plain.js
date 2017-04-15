const getInfo = {
  unchanged: (key, oldValue, newValue, children, func) =>
    (children.length > 0 ? func(children, key) : ''),
  added: (key, oldValue, newValue, children) => {
    const addedVallue = children.length > 0 ? 'complex object' : `value: ${newValue}`;
    return `Property '${key}' was added with ${addedVallue}`;
  },
  updated: (key, oldValue, newValue) =>
    `Property '${key}' was updated. From '${newValue}' to '${oldValue}'`,
  removed: key => `Property '${key}' was removed`,
};

const iter = (item, parrent = null) =>
  item
    .reduce((acc, { type, key, oldValue, newValue, children }) => {
      const newKey = parrent ? `${parrent}.${key}` : key;
      const info = getInfo[type](newKey, oldValue, newValue, children, iter);
      return [...acc, info];
    }, [])
    .filter(String)
    .join('\n');

export default data => iter(data);
