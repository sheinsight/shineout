"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("./styles");

var _is = require("../utils/is");

var _shallowEqual = _interopRequireDefault(require("../utils/shallowEqual"));

var _icons = _interopRequireDefault(require("../icons"));

var _classname = require("../utils/classname");

var Option =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Option, _React$Component);

  function Option(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleEnter = _this.handleHover.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Option.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.props.filterText) return true;
    if (!(0, _shallowEqual.default)(nextProps, this.props) || !(0, _shallowEqual.default)(nextState, this.state)) return true;
    return false;
  };

  _proto.handleClick = function handleClick() {
    var _this2 = this;

    var _this$props = this.props,
        data = _this$props.data,
        onClick = _this$props.onClick,
        isActive = _this$props.isActive,
        index = _this$props.index,
        disabled = _this$props.disabled,
        groupKey = _this$props.groupKey;
    if (this.locked || disabled || data && data[groupKey]) return;
    this.locked = true;
    onClick(!isActive, data, index);
    setTimeout(function () {
      _this2.locked = false;
    }, 200);
  };

  _proto.handleHover = function handleHover() {
    this.props.onHover(this.props.index);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        data = _this$props2.data,
        isActive = _this$props2.isActive,
        index = _this$props2.index,
        renderItem = _this$props2.renderItem,
        isHover = _this$props2.isHover,
        disabled = _this$props2.disabled,
        groupKey = _this$props2.groupKey;
    var isGroupTitle = data && data[groupKey];
    var className = (0, _classnames.default)((0, _styles.selectClass)((0, _classname.getDirectionClass)('option'), isActive && 'active', isHover && 'hover', disabled && (0, _classname.getDirectionClass)('disabled'), isGroupTitle && 'group'), "option-" + index);
    var result = isGroupTitle ? data[groupKey] : renderItem(data, index);
    var title = typeof result === 'string' ? result : '';

    if ((0, _is.isObject)(data) && result === data) {
      console.warn('renderItem is essential when data element is Object');
    }

    return _react.default.createElement("a", {
      tabIndex: -1,
      onClick: this.handleClick,
      onMouseEnter: this.handleEnter,
      className: className,
      title: title
    }, result, isActive && _icons.default.Check);
  };

  return Option;
}(_react.default.Component);

Option.propTypes = {
  data: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string, _propTypes.default.number]).isRequired,
  disabled: _propTypes.default.bool,
  index: _propTypes.default.number,
  isActive: _propTypes.default.bool,
  isHover: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  onHover: _propTypes.default.func.isRequired,
  renderItem: _propTypes.default.func.isRequired,
  groupKey: _propTypes.default.string,
  filterText: _propTypes.default.string
};
var _default = Option;
exports.default = _default;