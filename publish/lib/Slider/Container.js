"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _config = require("../config");

var _proptypes = require("../utils/proptypes");

var _styles = require("./styles");

var _Slider = _interopRequireDefault(require("./Slider"));

var _utils = require("./utils");

var _getDataset = _interopRequireDefault(require("../utils/dom/getDataset"));

var _classname = require("../utils/classname");

var Container =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Container, _PureComponent);

  function Container(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {};
    _this.bindElement = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))); // this.handleFirstDrag = this.handleDrag.bind(this, 0)
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
    if (e.target.className.indexOf((0, _styles.sliderClass)('indicator')) >= 0) return;
    if (this.props.disabled) return;
    var _this$props2 = this.props,
        scale = _this$props2.scale,
        step = _this$props2.step,
        vertical = _this$props2.vertical,
        range = _this$props2.range;
    var rect = this.innerElement.getBoundingClientRect();
    var per = vertical ? 1 - (e.clientY - rect.top) / rect.height : (e.clientX - rect.left) / rect.width;

    if ((0, _config.isRTL)() && !vertical) {
      per = 1 - per;
    }

    var val = (0, _utils.per2value)(per, scale, step);

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
    return _react.default.createElement("div", {
      className: (0, _styles.sliderClass)((0, _classname.getDirectionClass)('scale'), !autoHide && 'show')
    }, scale.map(function (s, i) {
      return _react.default.createElement("div", {
        key: s
      }, _react.default.createElement("span", null, formatScale(s, i)));
    }));
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        range = _this$props4.range,
        height = _this$props4.height,
        style = _this$props4.style,
        vertical = _this$props4.vertical,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props4, ["range", "height", "style", "vertical"]);
    var className = (0, _classnames.default)((0, _styles.sliderClass)('_', vertical && 'vertical', this.props.disabled && 'disabled', (0, _config.isRTL)() && 'rtl'), this.props.className);
    var value = this.getValue();
    if (!Array.isArray(value)) value = [0, value];
    var newStyle = style;
    if (vertical) newStyle = Object.assign({
      height: height
    }, style);
    return _react.default.createElement("div", (0, _extends2.default)({
      style: newStyle,
      className: className
    }, (0, _getDataset.default)(other)), _react.default.createElement("div", {
      className: (0, _styles.sliderClass)('background')
    }), _react.default.createElement("div", {
      ref: this.bindElement,
      onClick: this.handleClick,
      className: (0, _styles.sliderClass)('inner')
    }, range && _react.default.createElement(_Slider.default, (0, _extends2.default)({}, other, {
      index: 0,
      max: value[1],
      onChange: this.handleChange,
      value: value[0],
      vertical: vertical
    })), _react.default.createElement(_Slider.default, (0, _extends2.default)({}, other, {
      index: 1,
      min: value[0],
      onChange: this.handleChange,
      value: value[1],
      vertical: vertical
    }))), this.renderScale());
  };

  return Container;
}(_react.PureComponent);

Container.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'disabled', 'type'), {
  autoHide: _propTypes.default.bool,
  formatScale: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.bool]),
  height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  onChange: _propTypes.default.func,
  onDrag: _propTypes.default.func,
  scale: _propTypes.default.arrayOf(_propTypes.default.number),
  step: _propTypes.default.number,
  value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.arrayOf(_propTypes.default.number)]),
  vertical: _propTypes.default.bool
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
var _default = Container;
exports.default = _default;