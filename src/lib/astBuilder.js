import _ from 'lodash';

const buildNode = (key, type, beforeValue, afterValue, children = []) => {
  const newNode = { key, type, beforeValue, afterValue, children };
  return newNode;
};

const genDiffAst = (firstConfigContent, secondConfigContent) => {
  const setOfKeys = _.union(Object.keys(firstConfigContent), Object.keys(secondConfigContent));

  return setOfKeys.reduce((acc, key) => {
    if (key in firstConfigContent && key in secondConfigContent) {
      if (firstConfigContent[key] instanceof Object || secondConfigContent[key] instanceof Object) {
        return [...acc, buildNode(key, 'same', '', '',
          genDiffAst(firstConfigContent[key], secondConfigContent[key]))];
      }

      if (JSON.stringify(firstConfigContent[key]) === JSON.stringify(secondConfigContent[key])) {
        return [...acc, buildNode(key, 'same', firstConfigContent[key], secondConfigContent[key])];
      }

      return [...acc, buildNode(key, 'changed', firstConfigContent[key], secondConfigContent[key])];
    }

    const [content, type] = key in firstConfigContent ?
      [firstConfigContent, 'removed'] :
      [secondConfigContent, 'added'];
    const values = content[key] instanceof Object ?
      [type, '', '', genDiffAst(content[key], content[key])] :
      [type, ...(type === 'removed' ? [content[key], ''] : ['', content[key]])];
    return [...acc, buildNode(key, ...values)];
  }, []);
};

export default genDiffAst;
