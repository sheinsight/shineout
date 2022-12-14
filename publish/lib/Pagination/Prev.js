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

var Prev =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inheritsLoose2.default)(Prev, _React$PureComponent);

  function Prev() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = Prev.prototype;

  _proto.renderPrev = function renderPrev() {
    var text = this.props.text;
    var rtl = (0, _config.isRTL)();

    if (rtl) {
      return text.next || _icons.default.AngleRight;
    }

    return text.prev || _icons.default.AngleLeft;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        onChange = _this$props.onChange,
        current = _this$props.current,
        text = _this$props.text,
        disabled = _this$props.disabled,
        isSimple = _this$props.isSimple;
    var prev = current - 1;
    var className = text.prev || isSimple ? "no-border arrow" : 'arrow';
    return _react.default.createElement(_Item.default, {
      className: className,
      page: prev,
      disabled: disabled || prev < 1,
      onClick: onChange
    }, this.renderPrev());
  };

  return Prev;
}(_react.default.PureComponent);

Prev.propTypes = {
  current: _propTypes.default.number.isRequired,
  disabled: _propTypes.default.bool,
  onChange: _propTypes.default.func.isRequired,
  text: _propTypes.default.object,
  isSimple: _propTypes.default.bool
};
Prev.displayName = 'ShineoutPaginationPrev';
var _default = Prev;
exports.default = _default;