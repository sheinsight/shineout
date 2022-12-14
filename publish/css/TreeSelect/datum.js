"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = datum;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Tree = _interopRequireDefault(require("../Datum/Tree"));

var _shallowEqual = _interopRequireDefault(require("../utils/shallowEqual"));

function toArray(value) {
  if (!value) return [];
  if (!Array.isArray(value)) return [value];
  return value;
}

function datum(Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inheritsLoose2.default)(TreeDatum, _React$Component);

    function TreeDatum(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.datum = new _Tree.default({
        data: props.data,
        loader: props.loader,
        keygen: props.keygen,
        mode: props.mode,
        value: toArray(props.value),
        onChange: props.onChange,
        disabled: typeof props.disabled === 'function' ? props.disabled : undefined,
        childrenKey: props.childrenKey,
        unmatch: props.unmatch
      });
      return _this;
    }

    var _proto = TreeDatum.prototype;

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      if (!(0, _shallowEqual.default)(prevProps.data, this.props.data)) {
        var disabled = this.props.disabled;
        this.datum.updateDisabled(typeof disabled === 'function' ? disabled : undefined);
        this.datum.setData(this.props.data, true);
        this.forceUpdate();
      }
    };

    _proto.render = function render() {
      var value = this.props.value;
      var props = (0, _objectSpread2.default)({}, this.props, {
        datum: this.datum
      });

      if (!(0, _shallowEqual.default)(toArray(value), this.datum.getValue())) {
        this.datum.setValue(toArray(value));
      }

      return _react.default.createElement(Origin, props);
    };

    return TreeDatum;
  }(_react.default.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    loader: _propTypes.default.func,
    data: _propTypes.default.array,
    disabled: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
    mode: _propTypes.default.oneOf([0, 1, 2, 3, 4]),
    onChange: _propTypes.default.func,
    value: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.any]),
    keygen: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]).isRequired,
    multiple: _propTypes.default.bool,
    childrenKey: _propTypes.default.string,
    unmatch: _propTypes.default.bool
  }), (0, _defineProperty2.default)(_class, "defaultProps", {
    mode: 1,
    childrenKey: 'children'
  }), _temp;
}