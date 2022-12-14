import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import config from '../config';
import { curry } from '../utils/func';
export default curry(function (defaultDelay, Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_PureComponent) {
    _inheritsLoose(_class, _PureComponent);

    function _class(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this.state = {
        value: props.value
      };
      _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.forceChange = _this.forceChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.cancelChange = _this.cancelChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
      if (config.delay !== undefined) return config.delay;
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
          props = _objectWithoutPropertiesLoose(_this$props3, ["value", "onChange"]);

      return React.createElement(Origin, _extends({}, props, {
        value: this.getValue(),
        onChange: this.handleChange,
        forceChange: this.forceChange,
        cancelChange: this.cancelChange
      }));
    };

    return _class;
  }(PureComponent), _defineProperty(_class, "propTypes", {
    delay: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any
  }), _temp;
});