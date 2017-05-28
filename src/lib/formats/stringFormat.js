import _ from 'lodash';

const objTypesPrefix = {
  same: '  ',
  removed: '- ',
  added: '+ ',
};

const objTypesRender = {
  same: item => `${objTypesPrefix.same}${item.key}: ${item.beforeValue}`,
  changed: (item, spaces) => [`${spaces}${objTypesRender.added(item)}`, `${spaces}${objTypesRender.removed(item)}`],
  removed: item => `${objTypesPrefix.removed}${item.key}: ${item.beforeValue}`,
  added: item => `${objTypesPrefix.added}${item.key}: ${item.afterValue}`,
};

const renderAst = (ast, lvl = 1) =>
  ast.reduce((acc, item) => {
    const spaces = _.repeat(' ', 2 * lvl);

    if (item.children.length > 0) {
      return acc.concat(`${spaces}${objTypesPrefix[item.type]}${item.key}: {`,
        renderAst(item.children, lvl + 2), `${spaces}  }`);
    }

    if (item.type === 'changed') return acc.concat(...objTypesRender[item.type](item, spaces));
    return acc.concat(`${spaces}${objTypesRender[item.type](item)}`);
  }, []);

const stringFormat = ast => `{\n${renderAst(ast).join('\n')}\n}`;

export default stringFormat;
