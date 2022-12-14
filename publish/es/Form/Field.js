import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import { cloneElement, isValidElement, Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from '../utils/shallowEqual';

var Field =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Field, _Component);

  function Field(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.cacheChildren = undefined;
    _this.cacheElement = null;
    return _this;
  }

  var _proto = Field.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var options = this.props.cache ? {
      skip: ['children']
    } : {};
    return !shallowEqual(this.props, nextProps, options);
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

    if (isValidElement(children)) {
      return cloneElement(children, {
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
}(Component);

Field.propTypes = {
  cache: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
  error: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  disabled: PropTypes.bool
};
Field.defaultProps = {
  cache: false
};
export default Field;