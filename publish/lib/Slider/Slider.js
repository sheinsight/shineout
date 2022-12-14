"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _component = require("../component");

var _Indicator = _interopRequireDefault(require("./Indicator"));

var _styles = require("./styles");

var _utils = require("./utils");

var _config = require("../config");

var Slider =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Slider, _PureComponent);

  function Slider(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      dragging: false,
      length: (0, _utils.value2per)(props.value, props.scale)
    };
    _this.bindElement = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleDrag = _this.handleDrag.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleDragEnd = _this.handleDragEnd.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Slider.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props = this.props,
        value = _this$props.value,
        scale = _this$props.scale;
    var dragging = this.state.dragging;
    var len = scale.length;

    if (prevProps.value !== value || !dragging && prevProps.scale[len - 1] !== scale[len - 1]) {
      // eslint-disable-next-line
      this.setState({
        length: (0, _utils.value2per)(value, scale)
      });
    }
  };

  _proto.bindElement = function bindElement(el) {
    if (el) this.parentElement = el.parentElement;
  };

  _proto.length2value = function length2value(length) {
    var _this$props2 = this.props,
        scale = _this$props2.scale,
        step = _this$props2.step;
    return (0, _utils.per2value)(length, scale, step);
  };

  _proto.handleDrag = function handleDrag(mx, my) {
    var _this$props3 = this.props,
        scale = _this$props3.scale,
        onDrag = _this$props3.onDrag,
        value = _this$props3.value,
        vertical = _this$props3.vertical,
        onIncrease = _this$props3.onIncrease;
    var m = vertical ? my / this.parentElement.clientHeight : mx / this.parentElement.clientWidth * ((0, _config.isRTL)() ? -1 : 1);
    var length = this.state.length;
    var min = this.props.min ? (0, _utils.value2per)(this.props.min, scale) : 0;
    var max = this.props.max ? (0, _utils.value2per)(this.props.max, scale) : 1;
    var newLength = length + (vertical ? -m : m);
    var needIncrease = newLength > 1;
    if (newLength < min) newLength = min;
    if (newLength > max) newLength = max;
    if (needIncrease && onIncrease) onIncrease();
    this.setState({
      length: newLength,
      dragging: true
    });

    if (onDrag) {
      var newValue = this.length2value(newLength);
      if (newValue !== value) onDrag(newValue);
    }
  };

  _proto.handleDragEnd = function handleDragEnd() {
    var length = this.state.length;
    var scale = this.props.scale;
    var value = this.length2value(length);
    this.setState({
      length: (0, _utils.value2per)(value, scale),
      dragging: false
    });
    this.props.onChange(this.props.index, value);
  };

  _proto.renderResult = function renderResult() {
    var _this$props4 = this.props,
        autoHide = _this$props4.autoHide,
        formatValue = _this$props4.formatValue;
    if (!formatValue) return null;
    var dragging = this.state.dragging;
    var className = (0, _styles.sliderClass)('result', (!autoHide || dragging) && 'show');
    var value = formatValue(this.length2value(this.state.length));
    return _react.default.createElement("div", {
      className: className
    }, value);
  };

  _proto.render = function render() {
    var _style;

    var _this$props5 = this.props,
        index = _this$props5.index,
        disabled = _this$props5.disabled,
        vertical = _this$props5.vertical;
    var length = this.state.length;
    if (index === 1) length = 1 - length;
    var style = (_style = {}, _style[vertical ? 'height' : 'width'] = length * 100 + "%", _style);
    var className = (0, _styles.sliderClass)('bar', vertical && (index === 1 ? 'top' : 'bottom'), !vertical && index === 1 && 'right');
    return _react.default.createElement("div", {
      ref: this.bindElement,
      style: style,
      className: className
    }, this.renderResult(), _react.default.createElement("div", {
      className: (0, _styles.sliderClass)('bar-bg')
    }), _react.default.createElement(_Indicator.default, {
      disabled: disabled,
      onDrag: this.handleDrag,
      onDragEnd: this.handleDragEnd
    }));
  };

  return Slider;
}(_component.PureComponent);

Slider.propTypes = {
  autoHide: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  formatValue: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.bool]),
  index: _propTypes.default.number.isRequired,
  min: _propTypes.default.number,
  max: _propTypes.default.number,
  onChange: _propTypes.default.func.isRequired,
  onDrag: _propTypes.default.func,
  scale: _propTypes.default.array.isRequired,
  step: _propTypes.default.number,
  value: _propTypes.default.number.isRequired,
  vertical: _propTypes.default.bool.isRequired,
  onIncrease: _propTypes.default.func
};
Slider.defaultProps = {
  formatValue: function formatValue(v) {
    return v;
  }
};
var _default = Slider;
exports.default = _default;