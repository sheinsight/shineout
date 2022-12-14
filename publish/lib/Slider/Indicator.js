"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _draggable = _interopRequireDefault(require("../hoc/draggable"));

var _styles = require("./styles");

var Indicator =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Indicator, _PureComponent);

  function Indicator() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Indicator.prototype;

  _proto.render = function render() {
    var event = this.props.disabled ? undefined : this.props.onDragStart;
    return _react.default.createElement("div", {
      onMouseDown: event,
      className: (0, _styles.sliderClass)('indicator')
    });
  };

  return Indicator;
}(_react.PureComponent);

Indicator.propTypes = {
  disabled: _propTypes.default.bool,
  onDragStart: _propTypes.default.func.isRequired
};

var _default = (0, _draggable.default)(Indicator);

exports.default = _default;