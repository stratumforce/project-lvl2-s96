import fs from 'fs';
import path from 'path';
import parseContent from './contentParser';
import genDiffAst from './astBuilder';
import renderAst from './astRender';

const getFileContent = (config) => {
  const fileContent = fs.readFileSync(config, 'utf-8');
  const fileExt = path.extname(config).slice(1);
  return parseContent(fileExt, fileContent);
};

export default(firstConfig, secondConfig) => {
  const firstConfigContent = getFileContent(firstConfig);
  const secondConfigContent = getFileContent(secondConfig);

  const result = genDiffAst(firstConfigContent, secondConfigContent);
  return `{\n${renderAst(result).join('\n')}\n}`;
};
