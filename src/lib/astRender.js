import _ from 'lodash';

const objTypesSymbol = {
  same: '  ',
  removed: '- ',
  added: '+ ',
};

const objTypesRender = {
  same: item => `${objTypesSymbol.same}${item.key}: ${item.beforeValue}`,
  changed: (item, spaces) => [`${spaces}${objTypesRender.added(item)}`, `${spaces}${objTypesRender.removed(item)}`],
  removed: item => `${objTypesSymbol.removed}${item.key}: ${item.beforeValue}`,
  added: item => `${objTypesSymbol.added}${item.key}: ${item.afterValue}`,
};

const renderAst = (ast, lvl = 1) =>
  ast.reduce((acc, item) => {
    const spaces = _.repeat(' ', 2 * lvl);

    if (item.children.length > 0) {
      return acc.concat(`${spaces}${objTypesSymbol[item.type]}${item.key}: {`,
        renderAst(item.children, lvl + 2), `${spaces}  }`);
    }

    if (item.type === 'changed') return acc.concat(...objTypesRender[item.type](item, spaces));
    return acc.concat(`${spaces}${objTypesRender[item.type](item)}`);
  }, []);

export default renderAst;
