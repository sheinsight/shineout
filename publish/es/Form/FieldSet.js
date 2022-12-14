import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import createReactContext from '../context';
import { Component } from '../component';
import { filterProps } from '../utils/objects';
import _validate from '../utils/validate';
import { FormError, isSameError } from '../utils/errors';
import { ERROR_TYPE, FORCE_PASS, IGNORE_VALIDATE } from '../Datum/types';
import FieldError from './FieldError';

var _createReactContext = createReactContext(),
    Provider = _createReactContext.Provider,
    Consumer = _createReactContext.Consumer;

var extendName = function extendName(path, name) {
  if (path === void 0) {
    path = '';
  }

  if (name === undefined) return undefined;
  if (name === '') return path;
  if (Array.isArray(name)) return name.map(function (n) {
    return extendName(path, n);
  });
  return "" + path + (path.length > 0 ? '.' : '') + name;
};

var FieldSet =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(FieldSet, _Component);

  function FieldSet(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.validate = _this.validate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleUpdate = _this.handleUpdate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = FieldSet.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _Component.prototype.componentDidMount.call(this);

    var _this$props = this.props,
        formDatum = _this$props.formDatum,
        name = _this$props.name,
        defaultValue = _this$props.defaultValue;
    formDatum.bind(name, this.handleUpdate, defaultValue, this.validate);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _Component.prototype.componentWillUnmount.call(this);

    var _this$props2 = this.props,
        formDatum = _this$props2.formDatum,
        name = _this$props2.name;
    formDatum.unbind(name, this.handleUpdate);
  };

  _proto.validate = function validate() {
    var _this2 = this;

    var _this$props3 = this.props,
        formDatum = _this$props3.formDatum,
        name = _this$props3.name;
    var value = formDatum.get(name);
    var data = formDatum.getValue();
    var validateProps = filterProps(this.props, function (v) {
      return typeof v === 'string' || typeof v === 'number';
    });
    validateProps.type = 'array';
    var rules = [].concat(this.props.rules);
    rules = rules.concat(formDatum.getRule(name));
    if (rules.length === 0) return Promise.resolve(true);
    return _validate(value, data, rules, validateProps).then(function () {
      _this2.handleError();

      return true;
    }, function (e) {
      _this2.handleError(e);

      return new FormError(e);
    });
  };

  _proto.updateWithValidate = function updateWithValidate() {
    var _this3 = this;

    this.validate().then(function () {
      _this3.forceUpdate();
    });
  };

  _proto.handleError = function handleError(error) {
    var _this$props4 = this.props,
        formDatum = _this$props4.formDatum,
        name = _this$props4.name,
        onError = _this$props4.onError;
    if (isSameError(error, formDatum.getError(name, true))) return;
    formDatum.setError(name, error, true);
    if (onError) onError(error);
  };

  _proto.handleUpdate = function handleUpdate(v, n, type) {
    var _this4 = this;

    if (this.updateTimer) clearTimeout(this.updateTimer);
    this.updateTimer = setTimeout(function () {
      if (type === ERROR_TYPE || type === FORCE_PASS || type === IGNORE_VALIDATE) {
        _this4.forceUpdate();
      } else {
        _this4.updateWithValidate();
      }
    });
  };

  _proto.handleInsert = function handleInsert(index, value) {
    var _this$props5 = this.props,
        formDatum = _this$props5.formDatum,
        name = _this$props5.name;
    formDatum.insert(name, index, value);
    this.updateWithValidate();
  };

  _proto.handleRemove = function handleRemove(index) {
    var _this$props6 = this.props,
        formDatum = _this$props6.formDatum,
        name = _this$props6.name;
    formDatum.splice(name, index);
    this.updateWithValidate();
  };

  _proto.handleChange = function handleChange(index, value, update) {
    var _this$props7 = this.props,
        formDatum = _this$props7.formDatum,
        name = _this$props7.name;
    formDatum.set(name + "[" + index + "]", value);
    if (update) this.updateWithValidate();
  };

  _proto.render = function render() {
    var _this5 = this;

    var _this$props8 = this.props,
        children = _this$props8.children,
        formDatum = _this$props8.formDatum,
        name = _this$props8.name,
        empty = _this$props8.empty,
        defaultValue = _this$props8.defaultValue;
    var errors = formDatum.getError(name);
    var result = [];

    if (typeof children !== 'function') {
      return React.createElement(Provider, {
        value: {
          path: name,
          val: this.validate
        }
      }, children, errors instanceof Error && React.createElement(FieldError, {
        key: "error",
        error: errors
      }));
    }

    var values = formDatum.get(name) || defaultValue || [];
    if (values && !Array.isArray(values)) values = [values];

    if (values.length === 0 && empty) {
      result.push(empty(this.handleInsert.bind(this, 0)));
    } else {
      var errorList = (Array.isArray(errors) ? errors : [errors]).filter(Boolean);
      values.forEach(function (v, i) {
        result.push(React.createElement(Provider, {
          key: i,
          value: {
            path: name + "[" + i + "]",
            val: _this5.validate
          }
        }, children({
          list: values,
          value: v,
          index: i,
          error: errorList,
          datum: formDatum,
          onChange: _this5.handleChange.bind(_this5, i),
          onInsert: _this5.handleInsert.bind(_this5, i),
          onAppend: _this5.handleInsert.bind(_this5, i + 1),
          onRemove: _this5.handleRemove.bind(_this5, i)
        })));
      });
    }

    if (errors instanceof Error) {
      result.push(React.createElement(FieldError, {
        key: "error",
        error: errors
      }));
    }

    return result;
  };

  return FieldSet;
}(Component);

FieldSet.propTypes = {
  children: PropTypes.any,
  defaultValue: PropTypes.array,
  empty: PropTypes.func,
  formDatum: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onError: PropTypes.func,
  rules: PropTypes.array
};
FieldSet.defaultProps = {
  rules: []
};
export var fieldSetConsumer = function fieldSetConsumer(Origin) {
  return function (props) {
    return React.createElement(Consumer, null, function (_temp) {
      var _ref = _temp === void 0 ? {} : _temp,
          path = _ref.path,
          val = _ref.val;

      return React.createElement(Origin, _extends({}, props, {
        // eslint-disable-next-line
        name: extendName(path, props.name),
        innerFormNamePath: path,
        fieldSetValidate: val
      }));
    });
  };
};
export var FieldSetProvider = Provider;
export default fieldSetConsumer(FieldSet);