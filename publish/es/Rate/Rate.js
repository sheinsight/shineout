import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isRTL } from '../config';
import { PureComponent } from '../component';
import { range } from '../utils/numbers';
import { getProps, defaultProps } from '../utils/proptypes';
import { rateClass } from './styles';
import getDataset from '../utils/dom/getDataset';
var MIN_SIZE = 12;

var Rate =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Rate, _PureComponent);

  function Rate(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      hover: 0,
      highlight: -1
    };
    return _this;
  }

  var _proto = Rate.prototype;

  _proto.getValue = function getValue() {
    var hover = this.state.hover;
    return hover === 0 ? this.props.value : hover;
  };

  _proto.getStyle = function getStyle() {
    var size = this.props.size;
    if (!size) return undefined;
    var parsed = Math.max(MIN_SIZE, parseFloat(size));
    return {
      width: parsed,
      fontSize: parsed,
      position: 'relative'
    };
  };

  _proto.getScale = function getScale() {
    var size = this.props.size;
    if (size >= MIN_SIZE) return undefined;
    return {
      transform: "scale(" + size / MIN_SIZE + ")"
    };
  };

  _proto.getIcon = function getIcon(icons, i, isBg) {
    var _this$props = this.props,
        repeat = _this$props.repeat,
        allowHalf = _this$props.allowHalf;
    var value = this.getValue();
    var remain = value - i;
    var icon;

    if (!Array.isArray(icons)) {
      icon = icons;
    } else {
      icon = icons[repeat ? value - 1 : i];
      if (!icon) icon = icons[icons.length - 1];
    }

    if (remain <= 0 || remain >= 1 || isBg) return icon;
    var style = {
      width: remain * 100 + "%",
      display: 'block',
      overflow: 'hidden',
      fontSize: 'inherit'
    };
    return React.createElement("span", {
      style: style,
      className: allowHalf && rateClass('allow-half')
    }, icon);
  };

  _proto.handleClick = function handleClick() {
    var _this2 = this;

    var value = arguments.length <= 0 ? undefined : arguments[0];
    var e = arguments.length <= 1 ? undefined : arguments[1];
    var _this$props2 = this.props,
        clearable = _this$props2.clearable,
        allowHalf = _this$props2.allowHalf;

    if (allowHalf && e.target.parentElement.querySelector("." + rateClass('allow-half'))) {
      value -= 0.5;
    }

    if (clearable && this.props.value === value) {
      value = 0;
      this.setState({
        hover: 0
      });
    }

    this.props.onChange(value);
    this.setState({
      highlight: value
    });
    if (this.highlightTimer) clearTimeout(this.highlightTimer);
    this.highlightTimer = setTimeout(function () {
      _this2.setState({
        highlight: -1
      });
    }, 300);
  };

  _proto.handleHover = function handleHover(hover) {
    this.setState({
      hover: hover
    });
  };

  _proto.handleMove = function handleMove(hover, e) {
    var _e$target$getBounding = e.target.getBoundingClientRect(),
        x = _e$target$getBounding.x,
        width = _e$target$getBounding.width;

    var offset;

    if (isRTL()) {
      offset = x + width / 2 < e.clientX ? 0.5 : 0;
    } else {
      offset = x + width / 2 > e.clientX ? 0.5 : 0;
    }

    this.setState({
      hover: hover - offset
    });
  };

  _proto.renderBackground = function renderBackground() {
    var _this3 = this;

    var _this$props3 = this.props,
        background = _this$props3.background,
        max = _this$props3.max,
        disabled = _this$props3.disabled;
    var style = this.getStyle();
    var value = this.getValue();
    return React.createElement("div", {
      className: rateClass('background')
    }, range(max).map(function (v) {
      return React.createElement("span", {
        key: v // the allowHalf only for the front same as background
        ,
        style: Object.assign({
          visibility: !disabled && Math.floor(value) > v ? 'hidden' : 'visible'
        }, style)
      }, _this3.getIcon(background, v, true));
    }));
  };

  _proto.renderRate = function renderRate() {
    var _this4 = this;

    var _this$props4 = this.props,
        front = _this$props4.front,
        max = _this$props4.max,
        text = _this$props4.text,
        allowHalf = _this$props4.allowHalf;
    var highlight = this.state.highlight;
    var value = this.getValue();
    var style = this.getStyle();
    return React.createElement("div", {
      className: rateClass('front')
    }, range(max).map(function (v) {
      return React.createElement("span", {
        key: v,
        onClick: _this4.handleClick.bind(_this4, v + 1),
        onMouseMove: allowHalf ? _this4.handleMove.bind(_this4, v + 1) : undefined,
        onMouseEnter: !allowHalf ? _this4.handleHover.bind(_this4, v + 1) : undefined,
        style: style
      }, React.createElement("div", {
        style: {
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0
        },
        onMouseLeave: _this4.handleHover.bind(_this4, 0)
      }), value > v ? _this4.getIcon(front, v) : React.createElement("span", null, "\xA0"), highlight === v + 1 && React.createElement("i", {
        className: rateClass('highlight')
      }, _this4.getIcon(front, v)));
    }), React.createElement("span", {
      className: rateClass('text')
    }, text[Math.ceil(value) - 1]));
  };

  _proto.renderStatic = function renderStatic() {
    var _this5 = this;

    var _this$props5 = this.props,
        front = _this$props5.front,
        value = _this$props5.value,
        max = _this$props5.max,
        text = _this$props5.text;
    var style = this.getStyle();
    return React.createElement("div", {
      className: rateClass('static')
    }, range(max).map(function (v) {
      return React.createElement("span", {
        key: v,
        style: style
      }, value > v && _this5.getIcon(front, v));
    }), React.createElement("span", {
      className: rateClass('text')
    }, text[Math.ceil(value) - 1]));
  };

  _proto.render = function render() {
    var className = classnames(rateClass('_', isRTL() && 'rtl'), this.props.className);
    var ms = Object.assign({}, this.props.style, this.getScale());
    return React.createElement("div", _extends({
      className: className,
      style: ms
    }, getDataset(this.props)), this.renderBackground(), this.props.disabled ? this.renderStatic() : this.renderRate());
  };

  return Rate;
}(PureComponent);

Rate.propTypes = _objectSpread({}, getProps(PropTypes, 'disabled', 'type'), {
  background: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  clearable: PropTypes.bool,
  repeat: PropTypes.bool,
  front: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.array,
  value: PropTypes.number
});
Rate.defaultProps = _objectSpread({}, defaultProps, {
  repeat: true,
  max: 5,
  size: 20,
  text: [],
  value: 0
});
export default Rate;