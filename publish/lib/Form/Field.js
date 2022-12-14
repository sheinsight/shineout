"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shallowEqual = _interopRequireDefault(require("../utils/shallowEqual"));

var Field =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Field, _Component);

  function Field(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.cacheChildren = undefined;
    _this.cacheElement = null;
    return _this;
  }

  var _proto = Field.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var options = this.props.cache ? {
      skip: ['children']
    } : {};
    return !(0, _shallowEqual.default)(this.props, nextProps, options);
  };

  _proto.handleChange = function handleChange(value) {
    if (value && value.nativeEvent) {
      // eslint-disable-next-line
      value = value.target.value;
    }

    this.props.onChange(value);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        value = _this$props.value,
        error = _this$props.error,
        disabled = _this$props.disabled;

    if (typeof children === 'function') {
      return children({
        value: value,
        error: error,
        onChange: this.handleChange,
        disabled: disabled
      });
    }

    if ((0, _react.isValidElement)(children)) {
      return (0, _react.cloneElement)(children, {
        value: value,
        error: error,
        onChange: this.handleChange,
        disabled: disabled || children.props && children.props.disabled
      });
    }

    console.error(new Error('Form.Field expect a single ReactElement or a function.'));
    return null;
  };

  return Field;
}(_react.Component);

Field.propTypes = {
  cache: _propTypes.default.bool,
  children: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.element]).isRequired,
  error: _propTypes.default.object,
  onChange: _propTypes.default.func.isRequired,
  value: _propTypes.default.any,
  disabled: _propTypes.default.bool
};
Field.defaultProps = {
  cache: false
};
var _default = Field;
exports.default = _default;