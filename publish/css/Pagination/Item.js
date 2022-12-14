"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classname = require("../utils/classname");

var _styles = require("./styles");

var Item =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Item, _PureComponent);

  function Item(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Item.prototype;

  _proto.handleClick = function handleClick() {
    var _this$props = this.props,
        page = _this$props.page,
        onClick = _this$props.onClick;
    onClick(page);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        isCurrent = _this$props2.isCurrent,
        disabled = _this$props2.disabled;
    var className = (0, _styles.paginationClass)((0, _classname.getDirectionClass)('item'), this.props.className, isCurrent && 'current');
    return _react.default.createElement("a", {
      className: className,
      disabled: disabled || isCurrent,
      onClick: this.handleClick
    }, children);
  };

  return Item;
}(_react.PureComponent);

Item.propTypes = {
  children: _propTypes.default.any,
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  isCurrent: _propTypes.default.bool,
  onClick: _propTypes.default.func.isRequired,
  page: _propTypes.default.number.isRequired
};
Item.defaultProps = {
  disabled: false,
  isCurrent: false
};
var _default = Item;
exports.default = _default;