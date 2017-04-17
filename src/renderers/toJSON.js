const fromAst = ast =>
  ast.reduce((acc, item) => {
    const newAcc = ({ type, key, oldValue, newValue, children }) => {
      if (children.length > 0) {
        return ({ [key]: { type, value: fromAst(children) } });
      }
      const value = {
        unchanged: { [key]: { type, value: oldValue } },
        added: { [key]: { type, value: newValue } },
        removed: { [key]: { type, value: newValue } },
        updated: { [key]: { type, oldValue, newValue } },
      };
      return value[type];
    };
    return { ...acc, ...newAcc(item) };
  }, {});

export default data =>
  JSON.stringify(fromAst(data), null, 2);
