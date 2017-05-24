import fs from 'fs';
import _ from 'lodash';

const readConfig = config => JSON.parse(fs.readFileSync(config, 'utf-8'));

export default(firstConfig, secondConfig) => {
  const firstConfigContent = readConfig(firstConfig);
  const secondConfigContent = readConfig(secondConfig);

  const setOfKeys = _.union(Object.keys(firstConfigContent), Object.keys(secondConfigContent));

  const output = setOfKeys.reduce((acc, item) => {
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

  return `{\n${output.join('\n')}\n}`;
};
