"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Input = _interopRequireDefault(require("./Input"));

var Password =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Password, _PureComponent);

  function Password(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
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
        others = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["point"]);
    var value = Array.from({
      length: this.props.value.length
    }, function () {
      return point;
    }).join('');
    return _react.default.createElement(_Input.default, (0, _extends2.default)({}, others, {
      type: "text",
      value: value,
      onChange: this.handleChange
    }));
  };

  return Password;
}(_react.PureComponent);

Password.propTypes = {
  onChange: _propTypes.default.func,
  point: _propTypes.default.string,
  value: _propTypes.default.string
};
Password.defaultProps = {
  value: '',
  point: '•'
};
var _default = Password;
exports.default = _default;