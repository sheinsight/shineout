"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _proptypes = require("../utils/proptypes");

var _styles = require("./styles");

var Divider =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Divider, _PureComponent);

  function Divider() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Divider.prototype;

  _proto.showText = function showText() {
    var _this$props = this.props,
        children = _this$props.children,
        mode = _this$props.mode;
    return children && mode === 'horizontal';
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        className = _this$props2.className,
        children = _this$props2.children,
        mode = _this$props2.mode,
        orientation = _this$props2.orientation,
        restProps = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["className", "children", "mode", "orientation"]);
    var mc = (0, _classnames.default)((0, _styles.dividerClass)('_', mode, children && 'with-text', orientation && "with-text-" + orientation), className);
    return _react.default.createElement("div", (0, _extends2.default)({}, restProps, {
      className: mc
    }), this.showText() && _react.default.createElement("span", {
      className: (0, _styles.dividerClass)('inner-text')
    }, children));
  };

  return Divider;
}(_react.PureComponent);

Divider.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default), {
  mode: _propTypes.default.oneOf(['horizontal', 'vertical']),
  orientation: _propTypes.default.oneOf(['left', 'center', 'right'])
});
Divider.defaultProps = {
  mode: 'horizontal'
};
var _default = Divider;
exports.default = _default;