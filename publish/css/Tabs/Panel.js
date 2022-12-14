"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _AnimationList = _interopRequireDefault(require("../AnimationList"));

var _styles = require("./styles");

var CollapseList = (0, _AnimationList.default)(['collapse'], 'fast');

var Panel =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Panel, _PureComponent);

  function Panel(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.isPristine = true;
    return _this;
  }

  var _proto = Panel.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        background = _this$props.background,
        color = _this$props.color,
        isActive = _this$props.isActive,
        collapsible = _this$props.collapsible,
        collapsed = _this$props.collapsed,
        lazy = _this$props.lazy;
    if (!isActive && this.isPristine && lazy) return null;
    this.isPristine = false;
    var style = Object.assign({
      background: background || '#fff',
      color: color
    }, this.props.style);
    var className = (0, _classnames.default)((0, _styles.tabsClass)('panel', isActive && 'show'), this.props.className);

    var result = _react.default.createElement("div", {
      style: style,
      className: className
    }, children);

    if (!collapsible) return result;
    return _react.default.createElement(CollapseList, {
      show: !collapsed
    }, result);
  };

  return Panel;
}(_react.PureComponent);

Panel.isTabPanel = true;
Panel.propTypes = {
  background: _propTypes.default.string,
  className: _propTypes.default.string,
  collapsed: _propTypes.default.bool,
  collapsible: _propTypes.default.bool,
  color: _propTypes.default.string,
  children: _propTypes.default.any,
  isActive: _propTypes.default.bool,
  style: _propTypes.default.object,
  lazy: _propTypes.default.bool
};
var _default = Panel;
exports.default = _default;