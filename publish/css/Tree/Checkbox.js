"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _component = require("../component");

var _Checkbox = _interopRequireDefault(require("../Checkbox/Checkbox"));

var _styles = require("./styles");

var _classname = require("../utils/classname");

var TreeCheckbox =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(TreeCheckbox, _PureComponent);

  function TreeCheckbox(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    props.datum.bind(props.id, _this.forceUpdate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))));
    return _this;
  }

  var _proto = TreeCheckbox.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this); // When dragging a node,
    // it will first trigger the constructor of the new node,
    // then trigger the willUnmount of the old node,
    // and finally trigger the didMount of the new node,
    // the old node will unload the update event, so bind it here again


    this.props.datum.bind(this.props.id, this.forceUpdate.bind(this));
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    this.props.datum.unbind(this.props.id);
  };

  _proto.checkDisabled = function checkDisabled() {
    var _this$props = this.props,
        datum = _this$props.datum,
        id = _this$props.id,
        disabled = _this$props.disabled;
    if (disabled) return true;
    return datum.isDisabled(id);
  };

  _proto.handleChange = function handleChange(v, checked) {
    var _this$props2 = this.props,
        datum = _this$props2.datum,
        id = _this$props2.id,
        onChange = _this$props2.onChange;
    datum.set(id, checked ? 1 : 0);
    onChange(datum.getValue(), id);
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        datum = _this$props3.datum,
        id = _this$props3.id;
    var checked = datum.getChecked(id);
    return _react.default.createElement(_Checkbox.default, {
      checked: checked,
      disabled: this.checkDisabled(),
      onChange: this.handleChange,
      className: (0, _styles.treeClass)((0, _classname.getDirectionClass)('checkbox'))
    });
  };

  return TreeCheckbox;
}(_component.PureComponent);

exports.default = TreeCheckbox;
(0, _defineProperty2.default)(TreeCheckbox, "propTypes", {
  datum: _propTypes.default.object.isRequired,
  disabled: _propTypes.default.bool,
  id: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  onChange: _propTypes.default.func.isRequired
});