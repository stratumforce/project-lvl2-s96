import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseContent from './contentParser';

const getFileContent = (config) => {
  const fileContent = fs.readFileSync(config, 'utf-8');
  const fileExt = path.extname(config).slice(1);
  return parseContent[fileExt](fileContent);
};

export default(firstConfig, secondConfig) => {
  const firstConfigContent = getFileContent(firstConfig);
  const secondConfigContent = getFileContent(secondConfig);

  const setOfKeys = _.union(Object.keys(firstConfigContent), Object.keys(secondConfigContent));

  const diffResult = setOfKeys.reduce((acc, item) => {
    if (item in firstConfigContent && item in secondConfigContent) {
      if (firstConfigContent[item] === secondConfigContent[item]) {
        return acc.concat(`    ${item}: ${firstConfigContent[item]}`);
      }
      return acc.concat(`  + ${item}: ${secondConfigContent[item]}`,
                          `  - ${item}: ${firstConfigContent[item]}`);
    } else if (item in firstConfigContent) {
      return acc.concat(`  - ${item}: ${firstConfigContent[item]}`);
    }
    return acc.concat(`  + ${item}: ${secondConfigContent[item]}`);
  }, []);

  return `{\n${diffResult.join('\n')}\n}`;
};
