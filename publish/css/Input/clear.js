"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("./styles");

var Clear =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Clear, _Component);

  function Clear(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Clear.prototype;

  _proto.handleClick = function handleClick(e) {
    // do not blur
    e.preventDefault();
    var _this$props = this.props,
        onClick = _this$props.onClick,
        clearResult = _this$props.clearResult;
    if (onClick) onClick({
      target: {
        value: clearResult
      }
    }, true);
  };

  _proto.render = function render() {
    return _react.default.createElement("div", {
      onMouseDown: this.handleClick,
      className: (0, _styles.inputClass)('clear-wrapper')
    }, _react.default.createElement("div", {
      className: (0, _styles.inputClass)('clear')
    }));
  };

  return Clear;
}(_react.Component);

Clear.propTypes = {
  onClick: _propTypes.default.func,
  clearResult: _propTypes.default.any
};
var _default = Clear;
exports.default = _default;