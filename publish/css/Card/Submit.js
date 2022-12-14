"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("../Button"));

var Submit =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Submit, _PureComponent);

  function Submit(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Submit.prototype;

  _proto.handleClick = function handleClick(e) {
    var _this2 = this;

    e.persist();
    setTimeout(function () {
      _this2.props.onSubmit(e.target);
    }, 50);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        onSubmit = _this$props.onSubmit,
        loading = _this$props.loading,
        children = _this$props.children,
        formStatus = _this$props.formStatus,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["onSubmit", "loading", "children", "formStatus"]);
    return _react.default.createElement(_Button.default, (0, _extends2.default)({
      type: "primary"
    }, other, {
      disabled: other.disabled || formStatus === 'disabled',
      loading: formStatus === 'pending' || loading,
      onClick: this.handleClick
    }), children);
  };

  return Submit;
}(_react.PureComponent);

Submit.propTypes = {
  children: _propTypes.default.any,
  formStatus: _propTypes.default.string,
  loading: _propTypes.default.bool,
  onCollapse: _propTypes.default.func,
  onSubmit: _propTypes.default.func
};
var _default = Submit;
exports.default = _default;