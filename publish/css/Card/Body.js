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

var _AnimationList = _interopRequireDefault(require("../AnimationList"));

var _styles = require("./styles");

var _config = require("../config");

var CollapseList = (0, _AnimationList.default)(['collapse'], 'fast');

var Body =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Body, _PureComponent);

  function Body() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Body.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        collapsed = _this$props.collapsed,
        collapsible = _this$props.collapsible,
        onCollapse = _this$props.onCollapse,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "collapsed", "collapsible", "onCollapse"]);
    var newClassName = (0, _classnames.default)((0, _styles.cardClass)('body', (0, _config.isRTL)() && 'body-rtl'), className);
    if (!collapsible) return _react.default.createElement("div", (0, _extends2.default)({}, other, {
      className: newClassName
    }));
    var onClick = typeof collapsed === 'boolean' ? onCollapse : undefined;
    return _react.default.createElement(CollapseList, {
      show: !collapsed
    }, _react.default.createElement("div", (0, _extends2.default)({}, other, {
      className: newClassName
    }), other.children, collapsible === 'bottom' && _react.default.createElement("div", {
      className: (0, _styles.cardClass)('foldup'),
      onClick: onClick
    }, _react.default.createElement("span", null))));
  };

  return Body;
}(_react.PureComponent);

(0, _defineProperty2.default)(Body, "propTypes", {
  children: _propTypes.default.any,
  className: _propTypes.default.string,
  collapsed: _propTypes.default.bool,
  collapsible: _propTypes.default.bool,
  style: _propTypes.default.object,
  onCollapse: _propTypes.default.func
});
Body.propTypes = {};
var _default = Body;
exports.default = _default;