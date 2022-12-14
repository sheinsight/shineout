import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from '../utils/shallowEqual';
import DatumForm from '../Datum/Form';
import { VALIDATE_TOPIC, RESET_TOPIC, FORCE_PASS } from '../Datum/types';
import { Provider } from './formContext';

var Block =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Block, _PureComponent);

  function Block(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    var value = props.value,
        error = props.error,
        formDatum = props.formDatum;
    _this.datum = new DatumForm({
      onChange: _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this))),
      error: error
    });
    if (value) _this.datum.setValue(value);
    _this.reset = _this.reset.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.validate = _this.validate.bind(_assertThisInitialized(_assertThisInitialized(_this)));

    if (formDatum) {
      formDatum.subscribe(RESET_TOPIC, _this.reset);
      formDatum.subscribe(VALIDATE_TOPIC, _this.validate);
    }

    console.warn('Form.Block is not recommend. Use Form.FieldSet instead.');
    return _this;
  }

  var _proto = Block.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props = this.props,
        value = _this$props.value,
        error = _this$props.error;

    if (!shallowEqual(value, this.prevValues)) {
      this.datum.setValue(value, this.willReset ? FORCE_PASS : undefined, this.willReset);
      this.willReset = false;
      this.prevValues = value;
    }

    if (error !== prevProps.error) {
      this.datum.validateClear();
      this.datum.setError('', error);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var formDatum = this.props.formDatum;

    if (formDatum) {
      formDatum.unsubscribe(RESET_TOPIC, this.reset);
      formDatum.unsubscribe(VALIDATE_TOPIC, this.validate);
    }
  };

  _proto.handleChange = function handleChange(value) {
    this.props.onChange(value);
  };

  _proto.reset = function reset() {
    this.datum.reset();
    this.willReset = true;
  };

  _proto.validate = function validate() {
    return this.datum.validate();
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        labelAlign = _this$props2.labelAlign,
        labelWidth = _this$props2.labelWidth,
        rules = _this$props2.rules;

    if (rules && this.datum.rules !== rules) {
      this.datum.rules = Array.isArray(rules) ? {} : rules;
    }

    return React.createElement(Provider, {
      value: {
        formDatum: this.datum,
        labelWidth: labelWidth,
        labelAlign: labelAlign
      }
    }, children);
  };

  return Block;
}(PureComponent);

Block.propTypes = {
  children: PropTypes.any,
  error: PropTypes.object,
  formDatum: PropTypes.object,
  labelAlign: PropTypes.string,
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  rules: PropTypes.array,
  value: PropTypes.any
};
export default Block;