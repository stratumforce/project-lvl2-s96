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

      const type =
        JSON.stringify(firstConfigContent[key]) === JSON.stringify(secondConfigContent[key]) ?
        'same' : 'changed';
      return [...acc, buildNode(key, type, firstConfigContent[key],
          type === 'same' ? '' : secondConfigContent[key])];
    }

    const [content, type] = key in firstConfigContent ?
      [firstConfigContent, 'removed'] :
      [secondConfigContent, 'added'];

    if (content[key] instanceof Object) {
      return [...acc, buildNode(key, type, '', '', genDiffAst(content[key], content[key]))];
    }

    const values = (type === 'removed') ?
      [content[key], ''] :
      ['', content[key]];

    return [...acc, buildNode(key, type, ...values)];
  }, []);
};

export default genDiffAst;
