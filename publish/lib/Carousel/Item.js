"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("./styles");

var Item =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Item, _PureComponent);

  function Item() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Item.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        current = _this$props.current,
        pre = _this$props.pre;
    var className = (0, _classnames.default)((0, _styles.carouselClass)('item', current && 'item-current', pre && 'item-pre'), this.props.className);
    return _react.default.createElement("div", {
      className: className
    }, children);
  };

  return Item;
}(_react.PureComponent);

Item.propTypes = {
  children: _propTypes.default.element,
  className: _propTypes.default.string,
  current: _propTypes.default.bool,
  pre: _propTypes.default.bool
};
var _default = Item;
exports.default = _default;