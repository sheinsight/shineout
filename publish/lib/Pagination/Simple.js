"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _classname = require("../utils/classname");

var _Jumper = _interopRequireDefault(require("./Jumper"));

var _Prev = _interopRequireDefault(require("./Prev"));

var _Next = _interopRequireDefault(require("./Next"));

var _styles = require("./styles");

var Simple =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Simple, _PureComponent);

  function Simple() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Simple.prototype;

  _proto.render = function render() {
    return _react.default.createElement("div", {
      className: (0, _styles.paginationClass)('links', (0, _classname.getDirectionClass)('section'))
    }, _react.default.createElement(_Prev.default, (0, _extends2.default)({}, this.props, {
      isSimple: true
    })), _react.default.createElement(_Jumper.default, (0, _extends2.default)({}, this.props, {
      isSimple: true,
      size: "small"
    })), _react.default.createElement(_Next.default, (0, _extends2.default)({}, this.props, {
      isSimple: true
    })));
  };

  return Simple;
}(_react.PureComponent);

Simple.propTypes = {};
var _default = Simple;
exports.default = _default;