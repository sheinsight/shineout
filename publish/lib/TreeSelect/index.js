"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inputable = _interopRequireDefault(require("../Form/inputable"));

var _func = require("../utils/func");

var _inputBorder = _interopRequireDefault(require("../hoc/inputBorder"));

var _styles = require("./styles");

var _TreeSelect = _interopRequireDefault(require("./TreeSelect"));

var _filter = _interopRequireDefault(require("./filter"));

var _datum = _interopRequireDefault(require("./datum"));

var _tiled = _interopRequireWildcard(require("./tiled"));

var _context = _interopRequireDefault(require("../Table/context"));

var exportTreeSelect = (0, _func.compose)(_inputable.default, (0, _inputBorder.default)({
  className: (0, _styles.treeSelectClass)('_'),
  tag: 'div'
}), _datum.default, _tiled.advancedFilterHOC, _filter.default, (0, _tiled.default)({}), _context.default)(_TreeSelect.default);
exportTreeSelect.displayName = 'ShineoutTreeSelect';
var _default = exportTreeSelect;
exports.default = _default;