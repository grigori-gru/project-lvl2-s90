const getInfo = {
  added: (key, oldValue, newValue, hasChildren) => {
    const addedVallue = hasChildren ? 'complex object' : `value: ${newValue}`;
    return `Property '${key}' was added with ${addedVallue}`;
  },
  updated: (key, oldValue, newValue) =>
    `Property '${key}' was updated. From '${newValue}' to '${oldValue}'`,
  removed: key => `Property '${key}' was removed`,
};

export default data =>
  data.reduce((acc, { type, key, oldValue, newValue, children }) => {
    if (type !== 'unchanged') {
      const info = getInfo[type](key, oldValue, newValue, children.length > 0);
      return [...acc, info];
    }
    return acc;
  }, []).join('\n');
