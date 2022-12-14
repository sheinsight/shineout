"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _config = _interopRequireDefault(require("../config"));

var _func = require("../utils/func");

var _default = (0, _func.curry)(function (defaultDelay, Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_PureComponent) {
    (0, _inheritsLoose2.default)(_class, _PureComponent);

    function _class(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this.state = {
        value: props.value
      };
      _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.forceChange = _this.forceChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.cancelChange = _this.cancelChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      return _this;
    }

    var _proto = _class.prototype;

    _proto.getValue = function getValue() {
      if (this.changeLocked) return this.state.value;
      return this.props.value;
    };

    _proto.getDelay = function getDelay() {
      var delay = this.props.delay;
      if (delay !== undefined) return delay;
      if (_config.default.delay !== undefined) return _config.default.delay;
      return defaultDelay;
    };

    _proto.handleChange = function handleChange(value) {
      var _this2 = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var delay = this.getDelay();

      if (delay === 0) {
        var _this$props;

        (_this$props = this.props).onChange.apply(_this$props, [value].concat(args));

        return;
      }

      this.setState({
        value: value
      });
      this.changeLocked = true;
      this.forceUpdate();
      if (this.changeTimer) clearTimeout(this.changeTimer);
      this.changeTimer = setTimeout(function () {
        var _this2$props;

        _this2.changeLocked = false;

        (_this2$props = _this2.props).onChange.apply(_this2$props, [value].concat(args));
      }, delay);
    };

    _proto.cancelChange = function cancelChange() {
      if (this.changeTimer) clearTimeout(this.changeTimer);
    };

    _proto.forceChange = function forceChange(value) {
      var _this$props2;

      this.setState({
        value: value
      });

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      (_this$props2 = this.props).onChange.apply(_this$props2, [value].concat(args));

      this.changeLocked = false;
    };

    _proto.render = function render() {
      var _this$props3 = this.props,
          value = _this$props3.value,
          onChange = _this$props3.onChange,
          props = (0, _objectWithoutPropertiesLoose2.default)(_this$props3, ["value", "onChange"]);
      return _react.default.createElement(Origin, (0, _extends2.default)({}, props, {
        value: this.getValue(),
        onChange: this.handleChange,
        forceChange: this.forceChange,
        cancelChange: this.cancelChange
      }));
    };

    return _class;
  }(_react.PureComponent), (0, _defineProperty2.default)(_class, "propTypes", {
    delay: _propTypes.default.number,
    onChange: _propTypes.default.func.isRequired,
    value: _propTypes.default.any
  }), _temp;
});

exports.default = _default;