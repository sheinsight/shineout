"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _icons = _interopRequireDefault(require("../icons"));

var _styles = require("./styles");

var Icon =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Icon, _PureComponent);

  function Icon() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Icon.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        name = _this$props.name,
        onClick = _this$props.onClick,
        tag = _this$props.tag,
        disabled = _this$props.disabled;
    var newProps = {
      className: (0, _styles.datepickerClass)(className, 'icon', disabled && 'disabled'),
      onClick: disabled ? undefined : onClick
    };
    return (0, _react.createElement)(tag, newProps, _icons.default[name]);
  };

  return Icon;
}(_react.PureComponent);

Icon.propTypes = {
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  name: _propTypes.default.string.isRequired,
  onClick: _propTypes.default.func,
  tag: _propTypes.default.string
};
Icon.defaultProps = {
  tag: 'span'
};
var _default = Icon;
exports.default = _default;