"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _component = require("../component");

var _types = require("../Datum/types");

var _Checkbox = _interopRequireDefault(require("../Checkbox/Checkbox"));

var _Radio = _interopRequireDefault(require("../Radio/Radio"));

var TableCheckbox =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(TableCheckbox, _PureComponent);

  function TableCheckbox(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleUpdate = _this.forceUpdate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = TableCheckbox.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    this.props.datum.subscribe(_types.CHANGE_TOPIC, this.handleUpdate);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    this.props.datum.unsubscribe(_types.CHANGE_TOPIC, this.handleUpdate);
  };

  _proto.handleChange = function handleChange(_, checked, index) {
    var _this$props = this.props,
        data = _this$props.data,
        datum = _this$props.datum,
        treeColumnsName = _this$props.treeColumnsName;

    if (checked) {
      datum.add(data, index, treeColumnsName);
    } else {
      datum.remove(data, index, treeColumnsName);
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        data = _this$props2.data,
        datum = _this$props2.datum;
    var disabled = datum.disabled(data);
    var checked = datum.check(data);
    var CheckItem = datum.limit === 1 ? _Radio.default : _Checkbox.default;
    return _react.default.createElement(CheckItem, (0, _extends2.default)({}, this.props, {
      checked: checked,
      disabled: disabled,
      onChange: this.handleChange
    }));
  };

  return TableCheckbox;
}(_component.PureComponent);

exports.default = TableCheckbox;
(0, _defineProperty2.default)(TableCheckbox, "propTypes", {
  data: _propTypes.default.object.isRequired,
  datum: _propTypes.default.object.isRequired,
  treeColumnsName: _propTypes.default.string,
  checked: _propTypes.default.bool
});