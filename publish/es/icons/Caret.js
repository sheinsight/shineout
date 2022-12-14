import icons from './index';
import config from '../config';
import configable from '../hoc/config';
import cssAccessor from '../utils/css-accessors';
var cachedCaret;
var caretMap = {
  line: icons.CaretLine,
  fill: icons.CaretFill
};
export default configable(function () {
  if (config.caret) return caretMap[config.caret];
  if (cachedCaret) return cachedCaret;
  cachedCaret = caretMap[cssAccessor.common.caret];
  return cachedCaret || icons.CaretFill;
}, 'caret');