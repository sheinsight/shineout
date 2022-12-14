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

var _default = function _default(coinType) {
  return function (Origin) {
    var _class, _temp;

    return _temp = _class =
    /*#__PURE__*/
    function (_PureComponent) {
      (0, _inheritsLoose2.default)(_class, _PureComponent);

      function _class(props) {
        var _this;

        _this = _PureComponent.call(this, props) || this;
        _this.state = {
          showCoin: props.coin
        };
        _this.handleFocus = _this.handleFocus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.handleBlur = _this.handleBlur.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.handleMouseDown = _this.handleMouseDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.handleMouseUp = _this.handleMouseUp.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        return _this;
      }

      var _proto = _class.prototype;

      _proto.getValue = function getValue() {
        var showCoin = this.state.showCoin;
        var value = this.props.value;

        if (showCoin && (value || value === 0)) {
          return ("" + value).replace(/\d+/, function (n) {
            return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
              return $1 + ",";
            });
          });
        }

        if (value === 0) return 0;
        return ("" + (value || '')).replace(/,/g, '');
      };

      _proto.handleFocus = function handleFocus(e) {
        var onFocus = this.props.onFocus;
        this.isFocus = true;
        this.setState({
          showCoin: false
        });
        if (onFocus) onFocus(e);
      };

      _proto.handleBlur = function handleBlur(e) {
        var onBlur = this.props.onBlur;
        this.isFocus = false;
        this.setState({
          showCoin: true
        });
        if (onBlur) onBlur(e);
      };

      _proto.handleMouseDown = function handleMouseDown(e) {
        var onMouseDown = this.props.onMouseDown;
        this.mouseDown = true;
        this.setState({
          showCoin: false
        });
        if (onMouseDown) onMouseDown(e);
      };

      _proto.handleMouseUp = function handleMouseUp(e) {
        var onMouseUp = this.props.onMouseUp;

        if (this.mouseDown && !this.isFocus) {
          this.setState({
            showCoin: true
          });
        }

        this.mouseDown = false;
        if (onMouseUp) onMouseUp(e);
      };

      _proto.render = function render() {
        var _this$props = this.props,
            coin = _this$props.coin,
            value = _this$props.value,
            onFocus = _this$props.onFocus,
            onBlur = _this$props.onBlur,
            others = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["coin", "value", "onFocus", "onBlur"]);
        if (!coin) return _react.default.createElement(Origin, (0, _extends2.default)({}, this.props, {
          coin: undefined
        }));
        if (coinType === 'input' && this.props.type !== 'number') return _react.default.createElement(Origin, (0, _extends2.default)({}, this.props, {
          coin: undefined
        }));
        return _react.default.createElement(Origin, (0, _extends2.default)({}, others, {
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp,
          value: this.getValue(),
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          coin: true
        }));
      };

      return _class;
    }(_react.PureComponent), (0, _defineProperty2.default)(_class, "propTypes", {
      value: _propTypes.default.any,
      type: _propTypes.default.string,
      coin: _propTypes.default.bool,
      onFocus: _propTypes.default.func,
      onBlur: _propTypes.default.func,
      onMouseDown: _propTypes.default.func,
      onMouseUp: _propTypes.default.func,
      onChange: _propTypes.default.func.isRequired
    }), (0, _defineProperty2.default)(_class, "defaultProps", {
      coin: false
    }), _temp;
  };
};

exports.default = _default;