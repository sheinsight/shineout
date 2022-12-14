"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("./styles");

var _uid = require("../utils/uid");

var _getDataset = _interopRequireDefault(require("../utils/dom/getDataset"));

var _classname = require("../utils/classname");

var Tab =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Tab, _PureComponent);

  function Tab(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.getActiveStyle = _this.getActiveStyle.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.uid = "tab_unique_" + (0, _uid.getUidStr)();
    return _this;
  }

  var _proto = Tab.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    (0, _uid.defer)(function () {
      if (_this2.props.isActive) _this2.handleClick(true);
    });
  };

  _proto.getActiveStyle = function getActiveStyle() {
    var _this$props = this.props,
        shape = _this$props.shape,
        align = _this$props.align,
        background = _this$props.background,
        color = _this$props.color,
        border = _this$props.border,
        isActive = _this$props.isActive,
        isVertical = _this$props.isVertical;
    if (shape === 'line' || shape === 'dash') return {};
    var style = {
      background: background,
      color: color
    };
    if (shape === 'bordered') return {
      background: background
    };
    if (shape !== 'line' && !isVertical) style.borderColor = border + " " + border + " " + (isActive ? background : border) + " " + border;
    if (shape !== 'line' && align === 'vertical-left') style.borderColor = border + " " + (isActive ? background : border) + "  " + border + " " + border;
    if (shape !== 'line' && align === 'vertical-right') style.borderColor = border + " " + border + " " + border + " " + (isActive ? background : border);
    return style;
  };

  _proto.handleClick = function handleClick(init) {
    var _this$props2 = this.props,
        onClick = _this$props2.onClick,
        id = _this$props2.id,
        isActive = _this$props2.isActive,
        disabled = _this$props2.disabled,
        last = _this$props2.last;
    if (disabled) return;
    if (init !== true) onClick(id, isActive);

    if (!this.element) {
      this.element = document.querySelector("." + this.uid);
    }

    if (this.element && this.element.getBoundingClientRect) {
      this.props.moveToCenter(this.element.getBoundingClientRect(), last, id === 0);
    }
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        isActive = _this$props3.isActive,
        disabled = _this$props3.disabled,
        children = _this$props3.children,
        shape = _this$props3.shape,
        otherProps = (0, _objectWithoutPropertiesLoose2.default)(_this$props3, ["isActive", "disabled", "children", "shape"]);
    var style = this.getActiveStyle();
    var isBordered = shape === 'bordered';
    var props = (0, _objectSpread2.default)({
      className: (0, _classnames.default)((0, _styles.tabsClass)('tab', isActive && (isBordered ? 'tab-bordered-active' : 'active'), disabled && 'disabled', isBordered && (0, _classname.getDirectionClass)('tab-bordered')), this.uid),
      onClick: this.handleClick,
      style: style
    }, (0, _getDataset.default)(otherProps));

    if (children.type && children.type.isTabLink) {
      return _react.default.cloneElement(children, (0, _objectSpread2.default)({}, props));
    }

    return _react.default.createElement("div", props, children);
  };

  return Tab;
}(_react.PureComponent);

Tab.propTypes = {
  background: _propTypes.default.string,
  border: _propTypes.default.string,
  children: _propTypes.default.any,
  color: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  isVertical: _propTypes.default.bool,
  id: _propTypes.default.any.isRequired,
  isActive: _propTypes.default.bool.isRequired,
  moveToCenter: _propTypes.default.func.isRequired,
  onClick: _propTypes.default.func.isRequired,
  shape: _propTypes.default.string,
  align: _propTypes.default.oneOf(['left', 'right', 'vertical-left', 'vertical-right']),
  last: _propTypes.default.bool
};
Tab.defaultProps = {// border: 'transparent',
};
var _default = Tab;
exports.default = _default;