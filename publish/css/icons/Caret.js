"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _index = _interopRequireDefault(require("./index"));

var _config = _interopRequireDefault(require("../config"));

var _config2 = _interopRequireDefault(require("../hoc/config"));

var _cssAccessors = _interopRequireDefault(require("../utils/css-accessors"));

var cachedCaret;
var caretMap = {
  line: _index.default.CaretLine,
  fill: _index.default.CaretFill
};

var _default = (0, _config2.default)(function () {
  if (_config.default.caret) return caretMap[_config.default.caret];
  if (cachedCaret) return cachedCaret;
  cachedCaret = caretMap[_cssAccessors.default.common.caret];
  return cachedCaret || _index.default.CaretFill;
}, 'caret');

exports.default = _default;