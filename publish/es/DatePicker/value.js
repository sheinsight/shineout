import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from '../utils/shallowEqual';
import utils from './utils';
import { getLocale } from '../locale';
export default (function (Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(_class, _Component);

    function _class(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        value: props.value
      };
      _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.rangeWithSingle = _this.rangeWithSingle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = _class.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this.convertValue(this.props.value);
    };

    _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
      var options = {
        deep: ['defaultValue', 'name', 'value']
      };
      return !(shallowEqual(nextProps, this.props, options) && shallowEqual(nextState, this.state, options));
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      var value = this.props.value;

      if (!shallowEqual(prevProps.value, value) && !shallowEqual(value, this.state.value)) {
        this.convertValue(value);
      }
    };

    _proto.getOptions = function getOptions() {
      var timeZone = this.props.timeZone;
      return {
        timeZone: timeZone,
        weekStartsOn: getLocale('startOfWeek')
      };
    };

    _proto.getFormat = function getFormat() {
      var _this$props = this.props,
          format = _this$props.format,
          type = _this$props.type;
      if (format) return format;

      switch (type) {
        case 'datetime':
          return 'yyyy-MM-dd HH:mm:ss';

        case 'month':
          return 'yyyy-MM';

        case 'time':
          return 'HH:mm:ss';

        case 'week':
          return 'RRRR II';

        default:
          return 'yyyy-MM-dd';
      }
    };

    _proto.rangeWithSingle = function rangeWithSingle() {
      if (!this.state.value) return false;
      return this.props.range && !this.props.allowSingle && this.state.value.filter(function (v) {
        return v;
      }).length === 1;
    };

    _proto.convertValue = function convertValue(value) {
      var _this2 = this;

      var range = this.props.range;

      if (!value) {
        this.setState({
          value: value
        });
        return undefined;
      }

      var format = this.getFormat();

      if (!range) {
        var _newValue = utils.format(utils.toDateWithFormat(value, format, undefined, this.getOptions()), format, this.getOptions());

        if (_newValue !== value) this.props.onChange(_newValue);else if (_newValue !== this.state.value) this.setState({
          value: _newValue
        });
        return _newValue;
      } // expand


      var quickSelect = this.state.quickSelect;
      var newValue = value.map(function (v) {
        if (!v) return undefined;
        return utils.format(utils.toDateWithFormat(v, format, undefined, _this2.getOptions()), format, _this2.getOptions());
      });

      if (!shallowEqual(newValue, value)) {
        this.props.onChange(newValue, quickSelect);
      } else if (!shallowEqual(newValue, this.state.value)) {
        // reset quickSelect if newValue !== this.state.value
        this.setState({
          value: newValue,
          quickSelect: null
        });
        return newValue;
      }

      if (shallowEqual(newValue, [undefined, undefined])) {
        this.setState({
          value: newValue,
          quickSelect: null
        });
      } else {
        this.state.value = newValue;
      }

      return newValue;
    };

    _proto.handleChange = function handleChange(value, callback, quickSelect) {
      var range = this.props.range;
      var newState = {
        value: value
      };

      if (range) {
        newState.quickSelect = quickSelect;
      }

      this.setState(newState, callback);
    };

    _proto.handleBlur = function handleBlur() {
      if (this.rangeWithSingle()) {
        this.setState({
          value: this.props.value
        });
      } else if (this.state.value !== this.props.value) this.props.onChange(this.state.value, this.state.quickSelect);
    };

    _proto.render = function render() {
      var value = this.state.value;
      return React.createElement(Origin, _extends({}, this.props, {
        onChange: this.handleChange,
        onValueBlur: this.handleBlur,
        onBlur: this.props.onBlur,
        value: value
      }));
    };

    return _class;
  }(Component), _defineProperty(_class, "propTypes", {
    format: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    range: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    type: PropTypes.string,
    value: PropTypes.any,
    allowSingle: PropTypes.bool,
    timeZone: PropTypes.string
  }), _temp;
});