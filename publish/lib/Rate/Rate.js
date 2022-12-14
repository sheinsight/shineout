"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _config = require("../config");

var _component = require("../component");

var _numbers = require("../utils/numbers");

var _proptypes = require("../utils/proptypes");

var _styles = require("./styles");

var _getDataset = _interopRequireDefault(require("../utils/dom/getDataset"));

var MIN_SIZE = 12;

var Rate =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Rate, _PureComponent);

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
    return _react.default.createElement("span", {
      style: style,
      className: allowHalf && (0, _styles.rateClass)('allow-half')
    }, icon);
  };

  _proto.handleClick = function handleClick() {
    var _this2 = this;

    var value = arguments.length <= 0 ? undefined : arguments[0];
    var e = arguments.length <= 1 ? undefined : arguments[1];
    var _this$props2 = this.props,
        clearable = _this$props2.clearable,
        allowHalf = _this$props2.allowHalf;

    if (allowHalf && e.target.parentElement.querySelector("." + (0, _styles.rateClass)('allow-half'))) {
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

    if ((0, _config.isRTL)()) {
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
    return _react.default.createElement("div", {
      className: (0, _styles.rateClass)('background')
    }, (0, _numbers.range)(max).map(function (v) {
      return _react.default.createElement("span", {
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
    return _react.default.createElement("div", {
      className: (0, _styles.rateClass)('front')
    }, (0, _numbers.range)(max).map(function (v) {
      return _react.default.createElement("span", {
        key: v,
        onClick: _this4.handleClick.bind(_this4, v + 1),
        onMouseMove: allowHalf ? _this4.handleMove.bind(_this4, v + 1) : undefined,
        onMouseEnter: !allowHalf ? _this4.handleHover.bind(_this4, v + 1) : undefined,
        style: style
      }, _react.default.createElement("div", {
        style: {
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0
        },
        onMouseLeave: _this4.handleHover.bind(_this4, 0)
      }), value > v ? _this4.getIcon(front, v) : _react.default.createElement("span", null, "\xA0"), highlight === v + 1 && _react.default.createElement("i", {
        className: (0, _styles.rateClass)('highlight')
      }, _this4.getIcon(front, v)));
    }), _react.default.createElement("span", {
      className: (0, _styles.rateClass)('text')
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
    return _react.default.createElement("div", {
      className: (0, _styles.rateClass)('static')
    }, (0, _numbers.range)(max).map(function (v) {
      return _react.default.createElement("span", {
        key: v,
        style: style
      }, value > v && _this5.getIcon(front, v));
    }), _react.default.createElement("span", {
      className: (0, _styles.rateClass)('text')
    }, text[Math.ceil(value) - 1]));
  };

  _proto.render = function render() {
    var className = (0, _classnames.default)((0, _styles.rateClass)('_', (0, _config.isRTL)() && 'rtl'), this.props.className);
    var ms = Object.assign({}, this.props.style, this.getScale());
    return _react.default.createElement("div", (0, _extends2.default)({
      className: className,
      style: ms
    }, (0, _getDataset.default)(this.props)), this.renderBackground(), this.props.disabled ? this.renderStatic() : this.renderRate());
  };

  return Rate;
}(_component.PureComponent);

Rate.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'disabled', 'type'), {
  background: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.array]),
  clearable: _propTypes.default.bool,
  repeat: _propTypes.default.bool,
  front: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.array]),
  max: _propTypes.default.number,
  onChange: _propTypes.default.func.isRequired,
  size: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  text: _propTypes.default.array,
  value: _propTypes.default.number
});
Rate.defaultProps = (0, _objectSpread2.default)({}, _proptypes.defaultProps, {
  repeat: true,
  max: 5,
  size: 20,
  text: [],
  value: 0
});
var _default = Rate;
exports.default = _default;