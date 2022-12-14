"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("./styles");

var Extra =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Extra, _PureComponent);

  function Extra() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Extra.prototype;

  _proto.render = function render() {
    var _this = this;

    var render = this.props.extra.map(function (value, index) {
      return _react.default.createElement(_react.default.Fragment, {
        key: index
      }, value, index < _this.props.extra.length - 1 ? _react.default.createElement("div", {
        className: (0, _styles.listClass)('split')
      }) : null);
    });
    return _react.default.createElement("div", {
      className: (0, _styles.listClass)('extra')
    }, render);
  };

  return Extra;
}(_react.PureComponent);

Extra.propTypes = {
  extra: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.array])
};
var _default = Extra;
exports.default = _default;