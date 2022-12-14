"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _inputable = _interopRequireDefault(require("../Form/inputable"));

var _func = require("../utils/func");

var _Datum = _interopRequireDefault(require("../Datum"));

var _inputBorder = _interopRequireDefault(require("../hoc/inputBorder"));

var _styles = require("./styles");

var _tiled = _interopRequireWildcard(require("../TreeSelect/tiled"));

var _Select = _interopRequireDefault(require("./Select"));

var _filter = _interopRequireDefault(require("./filter"));

var _group = _interopRequireDefault(require("./group"));

var _context = _interopRequireDefault(require("../Table/context"));

var limitWrap = function limitWrap(Origin) {
  return function (props) {
    // eslint-disable-next-line
    var limit = props.multiple ? 0 : 1;
    return _react.default.createElement(Origin, (0, _extends2.default)({}, props, {
      limit: limit
    }));
  };
};

var exportSelect = (0, _func.compose)(_inputable.default, (0, _inputBorder.default)({
  className: (0, _styles.selectClass)('_'),
  tag: 'div'
}), limitWrap, _Datum.default.hoc({
  bindProps: ['disabled', 'limit', 'format', 'prediction', 'separator'],
  pure: false
}), _tiled.advancedFilterHOC, _filter.default, (0, _tiled.default)({
  dataKey: 'treeData'
}), _group.default, _context.default)(_Select.default);
exportSelect.displayName = 'ShineoutSelect';
var _default = exportSelect;
exports.default = _default;