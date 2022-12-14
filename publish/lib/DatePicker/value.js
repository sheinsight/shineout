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

var _shallowEqual = _interopRequireDefault(require("../utils/shallowEqual"));

var _utils = _interopRequireDefault(require("./utils"));

var _locale = require("../locale");

var _default = function _default(Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inheritsLoose2.default)(_class, _Component);

    function _class(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        value: props.value
      };
      _this.handleBlur = _this.handleBlur.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.rangeWithSingle = _this.rangeWithSingle.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
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
      return !((0, _shallowEqual.default)(nextProps, this.props, options) && (0, _shallowEqual.default)(nextState, this.state, options));
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      var value = this.props.value;

      if (!(0, _shallowEqual.default)(prevProps.value, value) && !(0, _shallowEqual.default)(value, this.state.value)) {
        this.convertValue(value);
      }
    };

    _proto.getOptions = function getOptions() {
      var timeZone = this.props.timeZone;
      return {
        timeZone: timeZone,
        weekStartsOn: (0, _locale.getLocale)('startOfWeek')
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
        var _newValue = _utils.default.format(_utils.default.toDateWithFormat(value, format, undefined, this.getOptions()), format, this.getOptions());

        if (_newValue !== value) this.props.onChange(_newValue);else if (_newValue !== this.state.value) this.setState({
          value: _newValue
        });
        return _newValue;
      } // expand


      var quickSelect = this.state.quickSelect;
      var newValue = value.map(function (v) {
        if (!v) return undefined;
        return _utils.default.format(_utils.default.toDateWithFormat(v, format, undefined, _this2.getOptions()), format, _this2.getOptions());
      });

      if (!(0, _shallowEqual.default)(newValue, value)) {
        this.props.onChange(newValue, quickSelect);
      } else if (!(0, _shallowEqual.default)(newValue, this.state.value)) {
        // reset quickSelect if newValue !== this.state.value
        this.setState({
          value: newValue,
          quickSelect: null
        });
        return newValue;
      }

      if ((0, _shallowEqual.default)(newValue, [undefined, undefined])) {
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
      return _react.default.createElement(Origin, (0, _extends2.default)({}, this.props, {
        onChange: this.handleChange,
        onValueBlur: this.handleBlur,
        onBlur: this.props.onBlur,
        value: value
      }));
    };

    return _class;
  }(_react.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    format: _propTypes.default.string,
    onBlur: _propTypes.default.func,
    onChange: _propTypes.default.func,
    range: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.number]),
    type: _propTypes.default.string,
    value: _propTypes.default.any,
    allowSingle: _propTypes.default.bool,
    timeZone: _propTypes.default.string
  }), _temp;
};

exports.default = _default;