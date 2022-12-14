"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("./styles");

var _config = require("../config");

var Footer =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Footer, _PureComponent);

  function Footer() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Footer.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        align = _this$props.align,
        className = _this$props.className,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["align", "className"]);
    var newClassName = (0, _classnames.default)((0, _styles.cardClass)('footer', align, (0, _config.isRTL)() && 'footer-rtl'), className);
    return _react.default.createElement("div", (0, _extends2.default)({}, props, {
      className: newClassName
    }));
  };

  return Footer;
}(_react.PureComponent);

exports.default = Footer;
(0, _defineProperty2.default)(Footer, "propTypes", {
  align: _propTypes.default.string,
  className: _propTypes.default.string
});