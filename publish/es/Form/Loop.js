import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import createReactContext from '../context';
import { PureComponent } from '../component';
import { ERROR_TYPE, FORCE_PASS, IGNORE_VALIDATE } from '../Datum/types';
import validate from '../utils/validate';
import { getUidStr } from '../utils/uid';
import { range } from '../utils/numbers';
import { promiseAll, wrapFormError } from '../utils/errors';
import FieldError from './FieldError';

var _createReactContext = createReactContext(),
    Provider = _createReactContext.Provider,
    Consumer = _createReactContext.Consumer;

var Tag = React.Fragment ? React.Fragment : 'span';

var Loop =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Loop, _PureComponent);

  function Loop(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.contextValue = {
      bind: _this.bindValidate.bind(_assertThisInitialized(_assertThisInitialized(_this))),
      unbind: _this.unbindValidate.bind(_assertThisInitialized(_assertThisInitialized(_this)))
    };
    _this.validate = _this.validate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.selfValidate = _this.selfValidate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.update = _this.forceUpdate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.validations = [_this.selfValidate];
    _this.keys = [];
    console.warn('Form.Loop is not recommend. Use Form.FieldSet instead.');
    return _this;
  }

  var _proto = Loop.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    var _this$props = this.props,
        formDatum = _this$props.formDatum,
        name = _this$props.name,
        defaultValue = _this$props.defaultValue;
    formDatum.bind(name, this.handleUpdate.bind(this), defaultValue, this.validate);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    var _this$props2 = this.props,
        formDatum = _this$props2.formDatum,
        name = _this$props2.name;

    if (formDatum && name) {
      formDatum.unbind(name, this.handleUpdate);
    }
  };

  _proto.bindValidate = function bindValidate(val) {
    if (this.validations.indexOf(val) < 0) {
      this.validations.unshift(val);
    }
  };

  _proto.unbindValidate = function unbindValidate(val) {
    this.validations = this.validations.filter(function (v) {
      return v !== val;
    });
  };

  _proto.selfValidate = function selfValidate() {
    var _this$props3 = this.props,
        formDatum = _this$props3.formDatum,
        name = _this$props3.name;
    var value = formDatum.get(name);
    var data = formDatum.getValue();
    var rules = [].concat(this.props.rules);
    rules = rules.concat(formDatum.getRule(name));
    return validate(value, data, rules, 'array').then(function () {
      formDatum.setError(name, []);
      return true;
    }, function (e) {
      formDatum.setError(name, e);
      return wrapFormError(e);
    });
  };

  _proto.updateWithValidate = function updateWithValidate() {
    this.selfValidate().then(this.update);
  };

  _proto.validate = function validate(type) {
    // old api
    var value = type === FORCE_PASS ? FORCE_PASS : undefined;
    return promiseAll(this.validations.map(function (v) {
      return v(value, undefined);
    }));
  };

  _proto.handleUpdate = function handleUpdate(_, sn, type) {
    if (type === ERROR_TYPE || type === IGNORE_VALIDATE) {
      this.update();
    } else if (type === FORCE_PASS) {
      this.validate(FORCE_PASS);
    } else {
      this.selfValidate().then(this.update).catch(function () {});
    }
  };

  _proto.handleChange = function handleChange(index, value, fullSet) {
    var _this$props4 = this.props,
        formDatum = _this$props4.formDatum,
        name = _this$props4.name;

    if (fullSet) {
      formDatum.set(name, value);
      return;
    }

    var values = formDatum.get(name);
    if (!values) return;
    values[index] = value;
    formDatum.set(name, [].concat(values));
  };

  _proto.handleInsert = function handleInsert(index, value) {
    this.keys.splice(index, 0, getUidStr());
    var _this$props5 = this.props,
        formDatum = _this$props5.formDatum,
        name = _this$props5.name;
    formDatum.insert(name, index, value);
    this.updateWithValidate();
  };

  _proto.handleRemove = function handleRemove(index) {
    this.keys.splice(index, 1);
    var _this$props6 = this.props,
        formDatum = _this$props6.formDatum,
        name = _this$props6.name;
    formDatum.splice(name, index);
    this.updateWithValidate();
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props7 = this.props,
        children = _this$props7.children,
        empty = _this$props7.empty,
        formDatum = _this$props7.formDatum,
        name = _this$props7.name,
        defaultValue = _this$props7.defaultValue;
    var values = formDatum.get(name) || defaultValue;
    var error = formDatum.getError(name);

    if (values.length === 0 && empty) {
      return empty(this.handleInsert.bind(this, 0));
    }

    range(values.length, 0).forEach(function (i) {
      if (!_this2.keys[i]) _this2.keys[i] = getUidStr();
    });
    var errorList = Array.isArray(error) ? error : [];
    var results = values.map(function (value, index) {
      return React.createElement(Tag, {
        key: _this2.keys[index]
      }, children({
        list: values,
        value: value,
        index: index,
        error: errorList[index],
        onChange: _this2.handleChange.bind(_this2, index),
        onInsert: _this2.handleInsert.bind(_this2, index),
        onAppend: _this2.handleInsert.bind(_this2, index + 1),
        onRemove: _this2.handleRemove.bind(_this2, index)
      }));
    });

    if (error instanceof Error) {
      results.push(React.createElement(FieldError, {
        key: "error",
        error: error
      }));
    }

    return React.createElement(Provider, {
      value: this.contextValue
    }, results);
  };

  return Loop;
}(PureComponent);

export { Loop as default };
Loop.propTypes = {
  children: PropTypes.func.isRequired,
  defaultValue: PropTypes.array,
  empty: PropTypes.func,
  formDatum: PropTypes.object.isRequired,
  name: PropTypes.string,
  rules: PropTypes.array
};
Loop.defaultProps = {
  defaultValue: [],
  rules: [] // eslint-disable-next-line

};
export var loopConsumer = function loopConsumer(Origin) {
  return (
    /*#__PURE__*/
    function (_PureComponent2) {
      _inheritsLoose(_class, _PureComponent2);

      function _class() {
        return _PureComponent2.apply(this, arguments) || this;
      }

      var _proto2 = _class.prototype;

      _proto2.render = function render() {
        var _this3 = this;

        return React.createElement(Consumer, null, function (value) {
          return React.createElement(Origin, _extends({}, _this3.props, {
            loopContext: value
          }));
        });
      };

      return _class;
    }(PureComponent)
  );
};