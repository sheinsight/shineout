"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Checkbox = _interopRequireDefault(require("../Checkbox/Checkbox"));

var _Radio = _interopRequireDefault(require("../Radio/Radio"));

var _styles = require("./styles");

var _classname = require("../utils/classname");

var BoxOption =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(BoxOption, _PureComponent);

  function BoxOption(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = BoxOption.prototype;

  _proto.handleClick = function handleClick() {
    var _this2 = this;

    var _this$props = this.props,
        data = _this$props.data,
        onClick = _this$props.onClick,
        isActive = _this$props.isActive,
        index = _this$props.index,
        disabled = _this$props.disabled;
    if (this.locked || disabled) return;
    this.locked = true;
    onClick(!isActive, data, index);
    setTimeout(function () {
      _this2.locked = false;
    }, 200);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        data = _this$props2.data,
        index = _this$props2.index,
        isActive = _this$props2.isActive,
        renderItem = _this$props2.renderItem,
        columns = _this$props2.columns,
        multiple = _this$props2.multiple,
        disabled = _this$props2.disabled;
    var className = (0, _styles.selectClass)((0, _classname.getDirectionClass)('option'));
    var width = columns < 0 ? undefined : 1 / columns * 100 + "%";
    var Input = multiple ? _Checkbox.default : _Radio.default;
    var result = renderItem(data, index);
    var title = typeof result === 'string' ? result : undefined;
    return _react.default.createElement(Input, {
      disabled: disabled,
      style: {
        width: width
      },
      checked: isActive,
      className: className,
      onChange: this.handleClick
    }, _react.default.createElement("span", {
      title: title
    }, result));
  };

  return BoxOption;
}(_react.PureComponent);

BoxOption.propTypes = {
  columns: _propTypes.default.number,
  data: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string, _propTypes.default.number]).isRequired,
  disabled: _propTypes.default.bool,
  index: _propTypes.default.number,
  isActive: _propTypes.default.bool,
  multiple: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  renderItem: _propTypes.default.func.isRequired
};
var _default = BoxOption;
exports.default = _default;