import plainFormat from './plainFormat';
import stringFormat from './stringFormat';

const objFormats = {
  plain: plainFormat,
  string: stringFormat,
};

const genFormat = format => objFormats[format];

export default genFormat;
