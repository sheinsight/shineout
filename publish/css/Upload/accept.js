"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _default = function _default(Component) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$PureComponent) {
    (0, _inheritsLoose2.default)(_class, _React$PureComponent);

    function _class() {
      return _React$PureComponent.apply(this, arguments) || this;
    }

    var _proto = _class.prototype;

    _proto.render = function render() {
      var _this$props = this.props,
          forceAccept = _this$props.forceAccept,
          accept = _this$props.accept;
      return _react.default.createElement(Component, (0, _extends2.default)({}, this.props, {
        accept: forceAccept || accept,
        forceAccept: !!forceAccept
      }));
    };

    return _class;
  }(_react.default.PureComponent), (0, _defineProperty2.default)(_class, "propTypes", {
    accept: _propTypes.default.string,
    forceAccept: _propTypes.default.string
  }), _temp;
};

exports.default = _default;