import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export default(config) => {
  const content = fs.readFileSync(config, 'utf-8');
  switch (path.extname(config)) {
    case '.json':
      return JSON.parse(content);
    case '.yml':
    case '.yaml':
      return yaml.safeLoad(content);
    case '.ini':
      return ini.parse(content);
    default:
      return {};
  }
};
