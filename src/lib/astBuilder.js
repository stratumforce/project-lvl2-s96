import _ from 'lodash';

const buildNode = (key, type, beforeValue, afterValue, children) => {
  const newNode = { key, type, beforeValue, afterValue, children };
  return newNode;
};

const genDiffAst = (firstConfigContent, secondConfigContent) => {
  const setOfKeys = _.union(Object.keys(firstConfigContent), Object.keys(secondConfigContent));

  return setOfKeys.reduce((acc, key) => {
    if (key in firstConfigContent && key in secondConfigContent) {
      if (firstConfigContent[key] instanceof Object || secondConfigContent[key] instanceof Object) {
        return [...acc, buildNode(key, 'same', '', '',
          genDiffAst(
            typeof firstConfigContent[key] === 'undefined' ? {} : firstConfigContent[key],
            typeof secondConfigContent[key] === 'undefined' ? {} : secondConfigContent[key]))];
      }
      if (firstConfigContent[key] === secondConfigContent[key]) {
        return [...acc, buildNode(key, 'same', firstConfigContent[key], secondConfigContent[key], [])];
      }
      return [...acc, buildNode(key, 'changed', firstConfigContent[key], secondConfigContent[key], [])];
    }

    // if key NOT in both configs
    if (firstConfigContent[key] instanceof Object || secondConfigContent[key] instanceof Object) {
      const type = key in firstConfigContent ? 'removed' : 'added';

      return [...acc, buildNode(key, type, '', '',
        genDiffAst(
          typeof firstConfigContent[key] === 'undefined' ? {} : firstConfigContent[key],
          typeof secondConfigContent[key] === 'undefined' ? {} : secondConfigContent[key]))];
    }

    if (!Object.keys(firstConfigContent).length || !Object.keys(secondConfigContent).length) {
      if (key in firstConfigContent) {
        return [...acc, buildNode(key, 'same', firstConfigContent[key], '', [])];
      }
      return [...acc, buildNode(key, 'same', secondConfigContent[key], '', [])];
    }

    const values = (key in firstConfigContent) ?
      ['removed', firstConfigContent[key], ''] :
      ['added', '', secondConfigContent[key]];
    return [...acc, buildNode(key, ...values, [])];
  }, []);
};

export default genDiffAst;
