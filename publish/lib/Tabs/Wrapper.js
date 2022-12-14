"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _context = require("../Sticky/context");

var Wrapper =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Wrapper, _PureComponent);

  function Wrapper() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Wrapper.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        active = _this$props.active,
        id = _this$props.id,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["active", "id"]);
    return _react.default.createElement(_context.Provider, {
      value: {
        needResetPostion: id === active
      }
    }, _react.default.createElement(_Panel.default, (0, _extends2.default)({}, other, {
      isActive: id === active
    })));
  };

  return Wrapper;
}(_react.PureComponent);

Wrapper.propTypes = {
  active: _propTypes.default.any,
  children: _propTypes.default.any,
  id: _propTypes.default.any
};
var _default = Wrapper;
exports.default = _default;