const getFullKey = (key, parent) => {
  const newkey = (parent !== '') ? `${parent}.${key}` : `${key}`;
  return newkey;
};

const objTypesActions = {
  removed: () => 'was removed',
  added: (item, complex = false) =>
    ['was added with ', complex ? 'complex value' : `value: ${item.afterValue}`].join(''),
  changed: item => `was updated. From '${item.beforeValue}' to '${item.afterValue}'`,
  complex: item => (item.type === 'removed' ?
    objTypesActions.removed(item) :
    objTypesActions.added(item, true)),
};

const renderAst = (ast, parent = '') =>
  ast.reduce((acc, item) => {
    if (item.children.length > 0) {
      if (item.type === 'changed') {
        return acc.concat(objTypesActions.complex(item));
      }
      const childRender = renderAst(item.children, getFullKey(item.key, parent));
      if (item.type === 'same') {
        return acc.concat(childRender);
      }
      return acc.concat(`Property '${getFullKey(item.key, parent)}' ${objTypesActions[item.type](item, true)}`,
                        childRender);
    }

    return (item.type === 'same') ?
      acc :
      acc.concat(`Property '${getFullKey(item.key, parent)}' ${objTypesActions[item.type](item)}`);
  }, []);

const plainFormat = content => renderAst(content).join('\n');

export default plainFormat;
