"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _uid = require("../utils/uid");

var _styles = require("./styles");

var _errors = require("../utils/errors");

var _proptypes = require("../utils/proptypes");

var _document3 = require("../utils/dom/document");

var _types = require("../Datum/types");

var _FieldSet = require("./FieldSet");

var _config = require("../config");

var emptyValue = {
  path: ''
};

var Form =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Form, _Component);

  function Form(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.bindElement = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleSubmit = _this.handleSubmit.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleReset = _this.handleReset.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.locked = false;
    _this.id = "form_" + (0, _uid.getUidStr)();
    _this.form = {
      getValue: function getValue() {
        return _this.props.datum.getValue();
      },
      validate: function validate() {
        return _this.props.datum.validate();
      },
      validateFields: function validateFields(fields) {
        return _this.props.datum.validateFields(fields).catch(function () {});
      },
      validateFieldsWithError: function validateFieldsWithError(fields) {
        return _this.props.datum.validateFields(fields);
      },
      clearValidate: function clearValidate() {
        _this.props.datum.validateClear();
      },
      submit: function submit(withValidate) {
        if (withValidate === void 0) {
          withValidate = true;
        }

        if (withValidate) _this.handleSubmit();else {
          var _document = document,
              activeElement = _document.activeElement;
          if (activeElement) activeElement.blur();
          if (_this.props.onSubmit) _this.props.onSubmit(_this.props.datum.getValue());
          if (activeElement) activeElement.focus();
        }
      },
      reset: function reset() {
        _this.handleReset();
      }
    };
    return _this;
  }

  var _proto = Form.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var formRef = this.props.formRef;

    if (formRef) {
      if (typeof formRef === 'function') {
        formRef(this.form);
      } else {
        formRef.current = this.form;
      }
    }

    this.setStatus();

    if (this.element) {
      this.element.addEventListener('submit', this.handleSubmit);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    this.setStatus();
    if (prevProps.error !== this.props.error) this.props.datum.resetFormError(this.props.error);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.props.datum.formUnmount = true;

    if (this.element) {
      this.element.removeEventListener('submit', this.handleSubmit);
    }
  };

  _proto.setStatus = function setStatus() {
    var _this$props = this.props,
        disabled = _this$props.disabled,
        pending = _this$props.pending,
        setFormStatus = _this$props.setFormStatus;
    if (!setFormStatus) return;
    var status = disabled === true ? 'disabled' : '';
    if (pending === true) status = 'pending';
    setFormStatus(status);
  };

  _proto.bindElement = function bindElement(el) {
    this.element = el;
  };

  _proto.scrollToError = function scrollToError(err) {
    var _this$props2 = this.props,
        scrollToError = _this$props2.scrollToError,
        onError = _this$props2.onError;

    if (scrollToError !== false) {
      var el = this.element.querySelector("." + (0, _styles.formClass)('invalid'));

      if (el) {
        el.scrollIntoView();
        if (el.focus) el.focus();
      }

      if (typeof scrollToError === 'number' && scrollToError !== 0) {
        _document3.docScroll.top -= scrollToError;
      }
    }

    if (onError) onError(err);
    if (!(err instanceof _errors.FormError)) throw err;
  };

  _proto.handleSubmit = function handleSubmit(e) {
    var _this2 = this;

    if (e) {
      e.preventDefault();
    }

    if (e && e.target.getAttribute('id') !== this.id) return;
    if (this.validating || this.locked) return;
    this.validating = true; // prevent duplicate submit

    this.locked = true;
    setTimeout(function () {
      _this2.locked = false;
    }, this.props.throttle);
    var _this$props3 = this.props,
        datum = _this$props3.datum,
        onSubmit = _this$props3.onSubmit;
    var _document2 = document,
        activeElement = _document2.activeElement;
    if (activeElement) activeElement.blur();
    datum.dispatch(_types.SUBMIT_TOPIC);
    setTimeout(function () {
      datum.validate(_types.IGNORE_BIND).then(function () {
        _this2.validating = false;
        if (onSubmit) onSubmit(datum.getValue(), e && e.nativeEvent && e.nativeEvent.detail, e);
        if (activeElement) activeElement.focus();
      }).catch(function (err) {
        _this2.validating = false; // wait for render complete

        setTimeout(_this2.scrollToError.bind(_this2, err));
      });
    }, 10);
  };

  _proto.handleReset = function handleReset() {
    var _this$props4 = this.props,
        datum = _this$props4.datum,
        onReset = _this$props4.onReset;
    datum.reset();
    if (onReset) onReset();
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        layout = _this$props5.layout,
        style = _this$props5.style,
        inline = _this$props5.inline,
        disabled = _this$props5.disabled,
        datum = _this$props5.datum,
        rules = _this$props5.rules,
        pending = _this$props5.pending;

    if (datum && rules && datum.rules !== rules) {
      datum.rules = rules;
    }

    var className = (0, _classnames.default)((0, _styles.formClass)('_', layout, (disabled || pending) && 'disabled', inline && 'inline', (0, _config.isRTL)() && 'rtl'), this.props.className);
    return _react.default.createElement("form", {
      ref: this.bindElement,
      className: className,
      id: this.id,
      style: style,
      onReset: this.handleReset
    }, _react.default.createElement(_FieldSet.FieldSetProvider, {
      value: emptyValue
    }, this.props.children));
  };

  return Form;
}(_react.Component);

Form.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'disabled'), {
  datum: _propTypes.default.object,
  disabled: _propTypes.default.bool,
  inline: _propTypes.default.bool,
  layout: _propTypes.default.string,
  pending: _propTypes.default.bool,
  onError: _propTypes.default.func,
  onReset: _propTypes.default.func,
  onSubmit: _propTypes.default.func,
  rules: _propTypes.default.object,
  scrollToError: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.number]),
  setFormStatus: _propTypes.default.func,
  throttle: _propTypes.default.number
});
Form.defaultProps = (0, _objectSpread2.default)({}, _proptypes.defaultProps, {
  scrollToError: false,
  throttle: 1000
});
var _default = Form;
exports.default = _default;