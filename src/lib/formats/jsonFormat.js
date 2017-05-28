const filterInt = (value) => {
  if (/^(-|\+)?([0-9]+|Infinity)$/.test(value)) {
    return Number(value);
  }
  return value;
};

const renderAst = ast =>
  ast.reduce((acc, item) => ({
    ...acc,
    [item.type]: {
      key: item.key,
      beforeValue: filterInt(item.beforeValue),
      afterValue: filterInt(item.afterValue),
      children: item.children.length > 0 ? [renderAst(item.children)] : [],
    },
  }), {});

const jsonFormat = ast => JSON.stringify(renderAst(ast), null, 2);

export default jsonFormat;
