"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = _default;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _default(Bar) {
  var FixedLength =
  /*#__PURE__*/
  function (_PureComponent) {
    (0, _inheritsLoose2.default)(FixedLength, _PureComponent);

    function FixedLength() {
      return _PureComponent.apply(this, arguments) || this;
    }

    var _proto = FixedLength.prototype;

    _proto.render = function render() {
      var _this$props = this.props,
          length = _this$props.length,
          scrollLength = _this$props.scrollLength;
      var barLength = length / scrollLength * length;
      if (barLength < 20) barLength = 20;
      return _react.default.createElement(Bar, (0, _extends2.default)({}, this.props, {
        length: length,
        barLength: barLength
      }));
    };

    return FixedLength;
  }(_react.PureComponent);

  FixedLength.propTypes = {
    direction: _propTypes.default.string,
    length: _propTypes.default.number.isRequired,
    scrollLength: _propTypes.default.number.isRequired
  };
  FixedLength.defaultProps = {
    direction: 'y'
  };
  return FixedLength;
}