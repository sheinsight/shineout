import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import { curry } from '../utils/func';
import { capitalize } from '../utils/strings';
import { IGNORE_VALIDATE, WITH_OUT_DISPATCH } from './types';
import List from './List';
import Form from './Form';
var types = {
  form: Form,
  list: List
};
export default curry(function (options, Origin) {
  var _class, _temp;

  var _ref = options || {},
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'list' : _ref$type,
      _ref$key = _ref.key,
      key = _ref$key === void 0 ? 'value' : _ref$key,
      _ref$limit = _ref.limit,
      limit = _ref$limit === void 0 ? 0 : _ref$limit,
      _ref$bindProps = _ref.bindProps,
      bindProps = _ref$bindProps === void 0 ? [] : _ref$bindProps,
      ignoreUndefined = _ref.ignoreUndefined,
      _ref$pure = _ref.pure,
      pure = _ref$pure === void 0 ? true : _ref$pure;

  var Datum = types[type];
  var Component = pure ? React.PureComponent : React.Component;
  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(_class, _Component);

    function _class(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      var datum = props.datum,
          onChange = props.onChange,
          initValidate = props.initValidate;

      if (datum instanceof Datum) {
        _this.datum = datum;
      } else {
        var ops = bindProps.reduce(function (o, k) {
          o[k] = props[k];
          return o;
        }, {
          limit: limit,
          initValidate: initValidate
        });

        if (key in props) {
          ops[key] = props[key];
        }

        if ("default" + capitalize(key) in props) {
          ops["default" + capitalize(key)] = props["default" + capitalize(key)];
        }

        _this.datum = new Datum(Object.assign(ops, datum));
      }

      if (onChange) {
        _this.datum.onChange = onChange;
      }

      return _this;
    }

    var _proto = _class.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this.datum.setLock(false);
      this.prevValues = this.props[key];
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      // update datum.onchange
      this.datum.setLock(false);

      if (prevProps.onChange !== this.props.onChange) {
        this.datum.onChange = this.props.onChange;
      }
    };

    _proto.setValue = function setValue(t) {
      var values = this.props[key];
      if (ignoreUndefined && values === undefined) return;
      this.datum.setValue(values, t);
    };

    _proto.render = function render() {
      var _this$props = this.props,
          onDatumBind = _this$props.onDatumBind,
          props = _objectWithoutPropertiesLoose(_this$props, ["onDatumBind"]);

      if (onDatumBind) onDatumBind(this.datum);

      if (bindProps.includes('disabled')) {
        this.datum.setDisabled(props.disabled);
      }

      var values = this.props[key];

      if (type === 'form' && values !== this.prevValues) {
        this.setValue(this.props.initValidate ? undefined : IGNORE_VALIDATE);
        this.datum.setLock(true);
        this.prevValues = values;
      }

      if (type === 'list') this.setValue(WITH_OUT_DISPATCH); // delete props[key]

      return React.createElement(Origin, _extends({}, props, {
        datum: this.datum
      }));
    };

    return _class;
  }(Component), _defineProperty(_class, "propTypes", {
    onChange: PropTypes.func,
    onDatumBind: PropTypes.func,
    datum: PropTypes.object,
    initValidate: PropTypes.bool,
    value: PropTypes.any
  }), _defineProperty(_class, "defaultProps", {
    initValidate: false
  }), _temp;
});