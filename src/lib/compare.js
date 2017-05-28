import fs from 'fs';
import path from 'path';
import parseContent from './contentParser';
import genDiffAst from './astBuilder';
import genFormat from './formats';

const getFileContent = (config) => {
  const fileContent = fs.readFileSync(config, 'utf-8');
  const fileExt = path.extname(config).slice(1);
  return parseContent(fileExt, fileContent);
};

export default(firstConfig, secondConfig, format = 'string') => {
  const firstConfigContent = getFileContent(firstConfig);
  const secondConfigContent = getFileContent(secondConfig);

  const resultAst = genDiffAst(firstConfigContent, secondConfigContent);
  return genFormat(format)(resultAst);
};
