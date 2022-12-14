"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _proptypes = require("../utils/proptypes");

var _styles = require("./styles");

var _List = _interopRequireDefault(require("./List"));

var _config = require("../config");

function Root(props) {
  var className = (0, _classnames.default)((0, _styles.treeClass)('_', props.line ? 'with-line' : 'no-line', (0, _config.isRTL)() && 'rtl'), props.className);
  return _react.default.createElement(_List.default, (0, _extends2.default)({}, props, {
    className: className,
    expanded: true,
    path: "",
    isRoot: true,
    deepIndex: 0
  }));
}

Root.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default), {
  keygen: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]).isRequired,
  data: _propTypes.default.array,
  line: _propTypes.default.bool
});
Root.defaultProps = {
  data: [],
  line: true
};
var _default = Root;
exports.default = _default;