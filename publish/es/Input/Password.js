import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

var Password =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Password, _PureComponent);

  function Password(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Password.prototype;

  _proto.handleChange = function handleChange(val) {
    var _this$props = this.props,
        value = _this$props.value,
        point = _this$props.point;
    var newValue = [];
    val.split('').forEach(function (v, i) {
      newValue.push(v === point ? value[i] : v);
    });
    this.props.onChange(newValue.join(''));
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        point = _this$props2.point,
        others = _objectWithoutPropertiesLoose(_this$props2, ["point"]);

    var value = Array.from({
      length: this.props.value.length
    }, function () {
      return point;
    }).join('');
    return React.createElement(Input, _extends({}, others, {
      type: "text",
      value: value,
      onChange: this.handleChange
    }));
  };

  return Password;
}(PureComponent);

Password.propTypes = {
  onChange: PropTypes.func,
  point: PropTypes.string,
  value: PropTypes.string
};
Password.defaultProps = {
  value: '',
  point: '•'
};
export default Password;