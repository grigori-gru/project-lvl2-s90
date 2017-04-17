const fromAst = ast =>
  ast.reduce((acc, item) => {
    const newAcc = ({ type, key, oldValue, newValue, children }) => {
      const value = (children.length > 0)
        ? {
          unchanged: { value: fromAst(children) },
          added: { newValue: fromAst(children) },
          removed: { oldvalue: fromAst(children) },
        }
      : {
        unchanged: { value: oldValue },
        added: { newValue },
        removed: { oldvalue: newValue },
        updated: { oldValue, newValue },
      };
      return { [key]: value[type] };
    };
    return { ...acc, ...newAcc(item) };
  }, {});

export default data =>
  JSON.stringify(fromAst(data), null, 2);
