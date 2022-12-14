"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _func = require("../utils/func");

var _strings = require("../utils/strings");

var _types = require("./types");

var _List = _interopRequireDefault(require("./List"));

var _Form = _interopRequireDefault(require("./Form"));

var types = {
  form: _Form.default,
  list: _List.default
};

var _default = (0, _func.curry)(function (options, Origin) {
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
  var Component = pure ? _react.default.PureComponent : _react.default.Component;
  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inheritsLoose2.default)(_class, _Component);

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

        if ("default" + (0, _strings.capitalize)(key) in props) {
          ops["default" + (0, _strings.capitalize)(key)] = props["default" + (0, _strings.capitalize)(key)];
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
          props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["onDatumBind"]);
      if (onDatumBind) onDatumBind(this.datum);

      if (bindProps.includes('disabled')) {
        this.datum.setDisabled(props.disabled);
      }

      var values = this.props[key];

      if (type === 'form' && values !== this.prevValues) {
        this.setValue(this.props.initValidate ? undefined : _types.IGNORE_VALIDATE);
        this.datum.setLock(true);
        this.prevValues = values;
      }

      if (type === 'list') this.setValue(_types.WITH_OUT_DISPATCH); // delete props[key]

      return _react.default.createElement(Origin, (0, _extends2.default)({}, props, {
        datum: this.datum
      }));
    };

    return _class;
  }(Component), (0, _defineProperty2.default)(_class, "propTypes", {
    onChange: _propTypes.default.func,
    onDatumBind: _propTypes.default.func,
    datum: _propTypes.default.object,
    initValidate: _propTypes.default.bool,
    value: _propTypes.default.any
  }), (0, _defineProperty2.default)(_class, "defaultProps", {
    initValidate: false
  }), _temp;
});

exports.default = _default;