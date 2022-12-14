import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
export default (function (coinType) {
  return function (Origin) {
    var _class, _temp;

    return _temp = _class =
    /*#__PURE__*/
    function (_PureComponent) {
      _inheritsLoose(_class, _PureComponent);

      function _class(props) {
        var _this;

        _this = _PureComponent.call(this, props) || this;
        _this.state = {
          showCoin: props.coin
        };
        _this.handleFocus = _this.handleFocus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.handleMouseDown = _this.handleMouseDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.handleMouseUp = _this.handleMouseUp.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
            others = _objectWithoutPropertiesLoose(_this$props, ["coin", "value", "onFocus", "onBlur"]);

        if (!coin) return React.createElement(Origin, _extends({}, this.props, {
          coin: undefined
        }));
        if (coinType === 'input' && this.props.type !== 'number') return React.createElement(Origin, _extends({}, this.props, {
          coin: undefined
        }));
        return React.createElement(Origin, _extends({}, others, {
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp,
          value: this.getValue(),
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          coin: true
        }));
      };

      return _class;
    }(PureComponent), _defineProperty(_class, "propTypes", {
      value: PropTypes.any,
      type: PropTypes.string,
      coin: PropTypes.bool,
      onFocus: PropTypes.func,
      onBlur: PropTypes.func,
      onMouseDown: PropTypes.func,
      onMouseUp: PropTypes.func,
      onChange: PropTypes.func.isRequired
    }), _defineProperty(_class, "defaultProps", {
      coin: false
    }), _temp;
  };
});