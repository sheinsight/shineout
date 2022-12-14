"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = _interopRequireDefault(require("./utils"));

var _styles = require("./styles");

var _locale = require("../locale");

var Quick =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Quick, _React$Component);

  function Quick() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Quick.prototype;

  _proto.getOptions = function getOptions() {
    var timeZone = this.props.timeZone;
    return {
      timeZone: timeZone,
      startOfWeek: (0, _locale.getLocale)('startOfWeek')
    };
  };

  _proto.compareDate = function compareDate(a, b) {
    var type = this.props.type;
    return _utils.default.compareDateArray(a, b, type, this.getOptions());
  };

  _proto.handleQuick = function handleQuick(quick) {
    if (quick.invalid) {
      console.error("the date you provider for " + quick.name + " is invalid, please check the date in quickSelect!");
      return;
    }

    var onChange = this.props.onChange;
    if (onChange) onChange(quick);
  };

  _proto.render = function render() {
    var _this = this;

    var _this$props = this.props,
        quicks = _this$props.quicks,
        current = _this$props.current,
        children = _this$props.children;
    var currentArray = Array.isArray(current) ? current : [current];
    if (!quicks) return children || null;
    return _react.default.createElement("div", {
      className: (0, _styles.datepickerClass)('quick-select')
    }, quicks.map(function (q) {
      return _react.default.createElement("div", {
        onClick: _this.handleQuick.bind(_this, q),
        className: (0, _styles.datepickerClass)('quick-select-item', _this.compareDate(q.value, currentArray) && 'quick-select-item-active'),
        key: q.name
      }, q.name);
    }));
  };

  return Quick;
}(_react.default.Component);

exports.default = Quick;
Quick.propTypes = {
  type: _propTypes.default.string,
  onChange: _propTypes.default.func,
  quicks: _propTypes.default.array,
  current: _propTypes.default.any,
  children: _propTypes.default.node,
  timeZone: _propTypes.default.string
};