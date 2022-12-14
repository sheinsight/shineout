"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("./Button"));

var OnceButton =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(OnceButton, _PureComponent);

  function OnceButton(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      loading: props.loading
    };
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = OnceButton.prototype;

  _proto.handleClick = function handleClick(e) {
    var onClick = this.props.onClick;
    this.setState({
      loading: true
    });
    if (onClick) onClick(e);
  };

  _proto.render = function render() {
    return _react.default.createElement(_Button.default, (0, _extends2.default)({}, this.props, {
      loading: this.state.loading,
      onClick: this.handleClick
    }));
  };

  return OnceButton;
}(_react.PureComponent);

OnceButton.propTypes = {
  loading: _propTypes.default.bool,
  onClick: _propTypes.default.func
};
var _default = OnceButton;
exports.default = _default;