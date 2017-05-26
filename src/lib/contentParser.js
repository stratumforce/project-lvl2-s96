import yaml from 'js-yaml';
import ini from 'ini';

const parseContent = {
  json: arg => JSON.parse(arg),
  yml: arg => yaml.safeLoad(arg),
  ini: arg => ini.parse(arg),
};

export default parseContent;
