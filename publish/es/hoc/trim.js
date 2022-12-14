import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import config from '../config';
export default (function (Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_PureComponent) {
    _inheritsLoose(_class, _PureComponent);

    function _class(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = _class.prototype;

    _proto.getTrim = function getTrim() {
      var trim = this.props.trim;
      if (trim !== undefined) return trim;
      if (config.trim !== undefined) return config.trim;
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
      return React.createElement(Origin, _extends({}, this.props, {
        onBlur: this.handleBlur
      }));
    };

    return _class;
  }(PureComponent), _defineProperty(_class, "propTypes", {
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    trim: PropTypes.bool,
    value: PropTypes.any
  }), _temp;
});