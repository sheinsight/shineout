"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("./styles");

var _config = require("../config");

var ROTATE_MAX_ANGLE = 15;
var PROGRESS_CENTER = 60;

var Popup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Popup, _React$Component);

  function Popup() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Popup.prototype;

  _proto.getStyle = function getStyle() {
    var _ref;

    var value = this.props.value;
    var rotate = 0;
    if (value <= PROGRESS_CENTER) rotate = ROTATE_MAX_ANGLE * (value / PROGRESS_CENTER);else rotate = (1 - value / 100) * ROTATE_MAX_ANGLE;
    return _ref = {}, _ref[(0, _config.isRTL)() ? 'right' : 'left'] = value + "%", _ref.transform = "translateX(" + ((0, _config.isRTL)() ? '50%' : '-50%') + ") rotate(" + rotate + "deg)", _ref;
  };

  _proto.render = function render() {
    var children = this.props.children;
    return _react.default.createElement("div", {
      className: (0, _styles.progressClass)('popup'),
      style: this.getStyle()
    }, _react.default.createElement("span", {
      className: (0, _styles.progressClass)('value')
    }, children), _react.default.createElement("span", {
      className: (0, _styles.progressClass)('arrow')
    }));
  };

  return Popup;
}(_react.default.Component);

exports.default = Popup;
Popup.propTypes = {
  value: _propTypes.default.number,
  children: _propTypes.default.any
};