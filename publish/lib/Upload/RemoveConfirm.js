"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _component = require("../component");

var _Popover = _interopRequireDefault(require("../Popover"));

var RemoveConfirm =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(RemoveConfirm, _Component);

  function RemoveConfirm(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      visible: false
    };
    _this.handleRemoveConfirm = _this.handleRemoveConfirm.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleRemoveLater = _this.handleRemoveLater.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = RemoveConfirm.prototype;

  _proto.handleRemoveConfirm = function handleRemoveConfirm(visible) {
    var onVisibleChange = this.props.onVisibleChange;
    if (onVisibleChange) onVisibleChange(visible);
    this.setState({
      visible: visible
    });
  };

  _proto.handleRemoveLater = function handleRemoveLater() {
    var onRemove = this.props.onRemove;
    return new Promise(function (resolve) {
      if (onRemove) onRemove();
      resolve();
    });
  };

  _proto.render = function render() {
    var visible = this.state.visible;
    var confirm = this.props.confirm;
    if (!confirm) return null;
    var confirmProps = typeof confirm === 'object' ? confirm : {
      children: confirm
    };
    return _react.default.createElement(_Popover.default.Confirm, (0, _extends2.default)({}, confirmProps, {
      onOk: this.handleRemoveLater,
      visible: visible,
      onVisibleChange: this.handleRemoveConfirm
    }));
  };

  return RemoveConfirm;
}(_component.Component);

exports.default = RemoveConfirm;
RemoveConfirm.propTypes = {
  confirm: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  onRemove: _propTypes.default.func,
  onVisibleChange: _propTypes.default.func
};