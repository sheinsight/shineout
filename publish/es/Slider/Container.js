import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isRTL } from '../config';
import { getProps } from '../utils/proptypes';
import { sliderClass } from './styles';
import Slider from './Slider';
import { per2value } from './utils';
import getDataset from '../utils/dom/getDataset';
import { getDirectionClass } from '../utils/classname';

var Container =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Container, _PureComponent);

  function Container(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {};
    _this.bindElement = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this))); // this.handleFirstDrag = this.handleDrag.bind(this, 0)
    // this.handleSecondDrag = this.handleDrag.bind(this, 1)

    return _this;
  }

  var _proto = Container.prototype;

  _proto.getValue = function getValue() {
    var _this$props = this.props,
        range = _this$props.range,
        value = _this$props.value,
        scale = _this$props.scale;
    var from = scale[0];
    if (!range) return value || from;
    var val = value;
    if (range && !Array.isArray(value)) val = [from, from];
    if (val[0] > val[1]) val = [val[1], val[0]];
    return val;
  };

  _proto.bindElement = function bindElement(el) {
    this.innerElement = el;
  };

  _proto.handleClick = function handleClick(e) {
    if (e.target.className.indexOf(sliderClass('indicator')) >= 0) return;
    if (this.props.disabled) return;
    var _this$props2 = this.props,
        scale = _this$props2.scale,
        step = _this$props2.step,
        vertical = _this$props2.vertical,
        range = _this$props2.range;
    var rect = this.innerElement.getBoundingClientRect();
    var per = vertical ? 1 - (e.clientY - rect.top) / rect.height : (e.clientX - rect.left) / rect.width;

    if (isRTL() && !vertical) {
      per = 1 - per;
    }

    var val = per2value(per, scale, step);

    if (!range) {
      this.props.onChange(val);
      return;
    }

    var value = [].concat(this.getValue());
    if (val < value[0]) value[0] = val;else value[1] = val;
    this.props.onChange(value);
  };

  _proto.handleChange = function handleChange(index, val) {
    var range = this.props.range;

    if (!range) {
      this.props.onChange(val);
      return;
    }

    var value = [].concat(this.getValue());
    value[index] = val;
    this.props.onChange(value);
  } // handleDrag(index, value) {
  //   const { range } = this.props
  //   if (!range) this.props.onDrag(value)
  // }
  ;

  _proto.renderScale = function renderScale() {
    var _this$props3 = this.props,
        autoHide = _this$props3.autoHide,
        formatScale = _this$props3.formatScale,
        scale = _this$props3.scale;
    if (!formatScale) return null;
    return React.createElement("div", {
      className: sliderClass(getDirectionClass('scale'), !autoHide && 'show')
    }, scale.map(function (s, i) {
      return React.createElement("div", {
        key: s
      }, React.createElement("span", null, formatScale(s, i)));
    }));
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        range = _this$props4.range,
        height = _this$props4.height,
        style = _this$props4.style,
        vertical = _this$props4.vertical,
        other = _objectWithoutPropertiesLoose(_this$props4, ["range", "height", "style", "vertical"]);

    var className = classnames(sliderClass('_', vertical && 'vertical', this.props.disabled && 'disabled', isRTL() && 'rtl'), this.props.className);
    var value = this.getValue();
    if (!Array.isArray(value)) value = [0, value];
    var newStyle = style;
    if (vertical) newStyle = Object.assign({
      height: height
    }, style);
    return React.createElement("div", _extends({
      style: newStyle,
      className: className
    }, getDataset(other)), React.createElement("div", {
      className: sliderClass('background')
    }), React.createElement("div", {
      ref: this.bindElement,
      onClick: this.handleClick,
      className: sliderClass('inner')
    }, range && React.createElement(Slider, _extends({}, other, {
      index: 0,
      max: value[1],
      onChange: this.handleChange,
      value: value[0],
      vertical: vertical
    })), React.createElement(Slider, _extends({}, other, {
      index: 1,
      min: value[0],
      onChange: this.handleChange,
      value: value[1],
      vertical: vertical
    }))), this.renderScale());
  };

  return Container;
}(PureComponent);

Container.propTypes = _objectSpread({}, getProps(PropTypes, 'disabled', 'type'), {
  autoHide: PropTypes.bool,
  formatScale: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  onDrag: PropTypes.func,
  scale: PropTypes.arrayOf(PropTypes.number),
  step: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  vertical: PropTypes.bool
});
Container.defaultProps = {
  height: 200,
  scale: [0, 100],
  step: 1,
  vertical: false,
  formatScale: function formatScale(v) {
    return v;
  }
};
export default Container;