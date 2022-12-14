"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _config = _interopRequireDefault(require("../config"));

var _default = function _default(Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_PureComponent) {
    (0, _inheritsLoose2.default)(_class, _PureComponent);

    function _class(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this.handleBlur = _this.handleBlur.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      return _this;
    }

    var _proto = _class.prototype;

    _proto.getTrim = function getTrim() {
      var trim = this.props.trim;
      if (trim !== undefined) return trim;
      if (_config.default.trim !== undefined) return _config.default.trim;
      return false;
    };

    _proto.handleBlur = function handleBlur(e) {
      var _this$props = this.props,
          value = _this$props.value,
          onBlur = _this$props.onBlur,
          onChange = _this$props.onChange;
      var trim = this.getTrim();

      if (trim) {
        var tv = e.target.value.trim();
        if (value !== tv) onChange(tv);
      }

      if (onBlur) onBlur(e);
    };

    _proto.render = function render() {
      return _react.default.createElement(Origin, (0, _extends2.default)({}, this.props, {
        onBlur: this.handleBlur
      }));
    };

    return _class;
  }(_react.PureComponent), (0, _defineProperty2.default)(_class, "propTypes", {
    onBlur: _propTypes.default.func,
    onChange: _propTypes.default.func,
    trim: _propTypes.default.bool,
    value: _propTypes.default.any
  }), _temp;
};

exports.default = _default;