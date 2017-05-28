import jsonFormat from './jsonFormat';
import plainFormat from './plainFormat';
import stringFormat from './stringFormat';

const objFormats = {
  json: jsonFormat,
  plain: plainFormat,
  string: stringFormat,
};

const genFormat = format => objFormats[format];

export default genFormat;
