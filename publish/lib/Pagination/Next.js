"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _icons = _interopRequireDefault(require("../icons"));

var _Item = _interopRequireDefault(require("./Item"));

var _config = require("../config");

var Next =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inheritsLoose2.default)(Next, _React$PureComponent);

  function Next() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = Next.prototype;

  _proto.renderNext = function renderNext() {
    var text = this.props.text;
    var rtl = (0, _config.isRTL)();

    if (rtl) {
      return text.prev || _icons.default.AngleLeft;
    }

    return text.next || _icons.default.AngleRight;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        onChange = _this$props.onChange,
        current = _this$props.current,
        text = _this$props.text,
        total = _this$props.total,
        pageSize = _this$props.pageSize,
        disabled = _this$props.disabled,
        isSimple = _this$props.isSimple;
    var max = Math.ceil(total / pageSize);
    var next = current + 1;
    var className = text.next || isSimple ? "no-border arrow" : 'arrow';
    return _react.default.createElement(_Item.default, {
      className: className,
      page: next,
      disabled: disabled || next > max,
      onClick: onChange
    }, this.renderNext());
  };

  return Next;
}(_react.default.PureComponent);

Next.propTypes = {
  current: _propTypes.default.number.isRequired,
  disabled: _propTypes.default.bool,
  onChange: _propTypes.default.func.isRequired,
  pageSize: _propTypes.default.number.isRequired,
  text: _propTypes.default.object,
  total: _propTypes.default.number.isRequired,
  isSimple: _propTypes.default.bool
};
Next.displayName = 'ShineoutPaginationNext';
var _default = Next;
exports.default = _default;