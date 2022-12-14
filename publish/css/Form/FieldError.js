"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("./styles");

var FieldError =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(FieldError, _PureComponent);

  function FieldError() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = FieldError.prototype;

  _proto.render = function render() {
    var error = this.props.error; // eslint-disable-next-line

    if (Array.isArray(error)) error = error[0];
    if (!(error instanceof Error)) return null;
    return _react.default.createElement("div", {
      className: (0, _styles.formClass)('error')
    }, error.message);
  };

  return FieldError;
}(_react.PureComponent);

FieldError.propTypes = {
  error: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object])
};
var _default = FieldError;
exports.default = _default;