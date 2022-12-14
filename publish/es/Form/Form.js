import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getUidStr } from '../utils/uid';
import { formClass } from './styles';
import { FormError } from '../utils/errors';
import { getProps, defaultProps } from '../utils/proptypes';
import { docScroll } from '../utils/dom/document';
import { IGNORE_BIND, SUBMIT_TOPIC } from '../Datum/types';
import { FieldSetProvider } from './FieldSet';
import { isRTL } from '../config';
var emptyValue = {
  path: ''
};

var Form =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Form, _Component);

  function Form(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.bindElement = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleReset = _this.handleReset.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.locked = false;
    _this.id = "form_" + getUidStr();
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
      var el = this.element.querySelector("." + formClass('invalid'));

      if (el) {
        el.scrollIntoView();
        if (el.focus) el.focus();
      }

      if (typeof scrollToError === 'number' && scrollToError !== 0) {
        docScroll.top -= scrollToError;
      }
    }

    if (onError) onError(err);
    if (!(err instanceof FormError)) throw err;
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
    datum.dispatch(SUBMIT_TOPIC);
    setTimeout(function () {
      datum.validate(IGNORE_BIND).then(function () {
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

    var className = classnames(formClass('_', layout, (disabled || pending) && 'disabled', inline && 'inline', isRTL() && 'rtl'), this.props.className);
    return React.createElement("form", {
      ref: this.bindElement,
      className: className,
      id: this.id,
      style: style,
      onReset: this.handleReset
    }, React.createElement(FieldSetProvider, {
      value: emptyValue
    }, this.props.children));
  };

  return Form;
}(Component);

Form.propTypes = _objectSpread({}, getProps(PropTypes, 'disabled'), {
  datum: PropTypes.object,
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  layout: PropTypes.string,
  pending: PropTypes.bool,
  onError: PropTypes.func,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func,
  rules: PropTypes.object,
  scrollToError: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  setFormStatus: PropTypes.func,
  throttle: PropTypes.number
});
Form.defaultProps = _objectSpread({}, defaultProps, {
  scrollToError: false,
  throttle: 1000
});
export default Form;