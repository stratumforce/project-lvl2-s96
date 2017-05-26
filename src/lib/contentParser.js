import yaml from 'js-yaml';
import ini from 'ini';

const argTypes = {
  json: arg => JSON.parse(arg),
  yml: arg => yaml.safeLoad(arg),
  ini: arg => ini.parse(arg),
};

const parseContent = (type, content) => argTypes[type](content);

export default parseContent;
