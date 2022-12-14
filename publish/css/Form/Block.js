"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shallowEqual = _interopRequireDefault(require("../utils/shallowEqual"));

var _Form = _interopRequireDefault(require("../Datum/Form"));

var _types = require("../Datum/types");

var _formContext = require("./formContext");

var Block =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Block, _PureComponent);

  function Block(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    var value = props.value,
        error = props.error,
        formDatum = props.formDatum;
    _this.datum = new _Form.default({
      onChange: _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))),
      error: error
    });
    if (value) _this.datum.setValue(value);
    _this.reset = _this.reset.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.validate = _this.validate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));

    if (formDatum) {
      formDatum.subscribe(_types.RESET_TOPIC, _this.reset);
      formDatum.subscribe(_types.VALIDATE_TOPIC, _this.validate);
    }

    console.warn('Form.Block is not recommend. Use Form.FieldSet instead.');
    return _this;
  }

  var _proto = Block.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props = this.props,
        value = _this$props.value,
        error = _this$props.error;

    if (!(0, _shallowEqual.default)(value, this.prevValues)) {
      this.datum.setValue(value, this.willReset ? _types.FORCE_PASS : undefined, this.willReset);
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
      formDatum.unsubscribe(_types.RESET_TOPIC, this.reset);
      formDatum.unsubscribe(_types.VALIDATE_TOPIC, this.validate);
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

    return _react.default.createElement(_formContext.Provider, {
      value: {
        formDatum: this.datum,
        labelWidth: labelWidth,
        labelAlign: labelAlign
      }
    }, children);
  };

  return Block;
}(_react.PureComponent);

Block.propTypes = {
  children: _propTypes.default.any,
  error: _propTypes.default.object,
  formDatum: _propTypes.default.object,
  labelAlign: _propTypes.default.string,
  labelWidth: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  onChange: _propTypes.default.func.isRequired,
  rules: _propTypes.default.array,
  value: _propTypes.default.any
};
var _default = Block;
exports.default = _default;