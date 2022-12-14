import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import { PureComponent } from '../component';
import Indicator from './Indicator';
import { sliderClass } from './styles';
import { per2value, value2per } from './utils';
import { isRTL } from '../config';

var Slider =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Slider, _PureComponent);

  function Slider(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      dragging: false,
      length: value2per(props.value, props.scale)
    };
    _this.bindElement = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleDrag = _this.handleDrag.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleDragEnd = _this.handleDragEnd.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
        length: value2per(value, scale)
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
    return per2value(length, scale, step);
  };

  _proto.handleDrag = function handleDrag(mx, my) {
    var _this$props3 = this.props,
        scale = _this$props3.scale,
        onDrag = _this$props3.onDrag,
        value = _this$props3.value,
        vertical = _this$props3.vertical,
        onIncrease = _this$props3.onIncrease;
    var m = vertical ? my / this.parentElement.clientHeight : mx / this.parentElement.clientWidth * (isRTL() ? -1 : 1);
    var length = this.state.length;
    var min = this.props.min ? value2per(this.props.min, scale) : 0;
    var max = this.props.max ? value2per(this.props.max, scale) : 1;
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
      length: value2per(value, scale),
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
    var className = sliderClass('result', (!autoHide || dragging) && 'show');
    var value = formatValue(this.length2value(this.state.length));
    return React.createElement("div", {
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
    var className = sliderClass('bar', vertical && (index === 1 ? 'top' : 'bottom'), !vertical && index === 1 && 'right');
    return React.createElement("div", {
      ref: this.bindElement,
      style: style,
      className: className
    }, this.renderResult(), React.createElement("div", {
      className: sliderClass('bar-bg')
    }), React.createElement(Indicator, {
      disabled: disabled,
      onDrag: this.handleDrag,
      onDragEnd: this.handleDragEnd
    }));
  };

  return Slider;
}(PureComponent);

Slider.propTypes = {
  autoHide: PropTypes.bool,
  disabled: PropTypes.bool,
  formatValue: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  index: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onDrag: PropTypes.func,
  scale: PropTypes.array.isRequired,
  step: PropTypes.number,
  value: PropTypes.number.isRequired,
  vertical: PropTypes.bool.isRequired,
  onIncrease: PropTypes.func
};
Slider.defaultProps = {
  formatValue: function formatValue(v) {
    return v;
  }
};
export default Slider;