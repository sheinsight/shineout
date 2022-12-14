"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _proptypes = require("../utils/proptypes");

var Item =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inheritsLoose2.default)(Item, _React$PureComponent);

  function Item(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Item.prototype;

  _proto.handleClick = function handleClick() {
    if (!this.props.onClick) return;
    this.props.onClick(this.props.data);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        data = _this$props.data,
        itemClassName = _this$props.itemClassName,
        renderItem = _this$props.renderItem,
        width = _this$props.width,
        columns = _this$props.columns;
    var aWidth = width && columns ? (width - 2) / columns : undefined;
    var props = {
      disabled: data.disabled,
      onClick: this.handleClick,
      className: itemClassName,
      target: data.target,
      style: aWidth ? {
        display: 'inline-block',
        width: aWidth
      } : null
    };
    if (data.url) props.href = data.url;
    var content;

    if ((0, _react.isValidElement)(data)) {
      content = data;
    } else {
      content = typeof renderItem === 'string' ? data[renderItem] : renderItem(data);
    }

    if ((0, _react.isValidElement)(content)) {
      return (0, _react.cloneElement)(content, Object.assign(props, content.props));
    }

    return _react.default.createElement("a", props, content);
  };

  return Item;
}(_react.default.PureComponent);

Item.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default), {
  data: _propTypes.default.object,
  onClick: _propTypes.default.func,
  renderItem: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  columns: _propTypes.default.number
});
Item.defaultProps = (0, _objectSpread2.default)({}, _proptypes.defaultProps, {
  data: {},
  renderItem: 'content'
});
var _default = Item;
exports.default = _default;