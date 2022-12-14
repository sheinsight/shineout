"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("./styles");

var _icons = _interopRequireDefault(require("../icons"));

var _RemoveConfirm = _interopRequireDefault(require("./RemoveConfirm"));

var _classname = require("../utils/classname");

var Result =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Result, _PureComponent);

  function Result(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      confirm: false
    };
    _this.handleRemove = _this.handleRemove.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleRecover = _this.handleRecover.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleConfirmChange = _this.handleConfirmChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Result.prototype;

  _proto.handleRemove = function handleRemove() {
    this.props.onRemove(this.props.index);
  };

  _proto.handleRecover = function handleRecover() {
    var _this$props = this.props,
        onRecover = _this$props.onRecover,
        value = _this$props.value,
        index = _this$props.index;
    onRecover(index, value);
  };

  _proto.handleConfirmChange = function handleConfirmChange(confirm) {
    this.setState({
      confirm: confirm
    });
  };

  _proto.render = function render() {
    var confirm = this.state.confirm;
    var _this$props2 = this.props,
        renderResult = _this$props2.renderResult,
        value = _this$props2.value,
        recoverAble = _this$props2.recoverAble,
        showRecover = _this$props2.showRecover,
        removeConfirm = _this$props2.removeConfirm;
    var className = (0, _styles.uploadClass)('view-value', recoverAble && 'to-be-delete', confirm && 'view-active');
    return _react.default.createElement("div", {
      className: className
    }, _react.default.createElement("div", {
      className: (0, _styles.uploadClass)((0, _classname.getDirectionClass)('text'))
    }, renderResult(value)), this.props.onRemove && _react.default.createElement("a", {
      className: (0, _styles.uploadClass)('delete'),
      onClick: removeConfirm ? undefined : this.handleRemove
    }, _icons.default.Close, _react.default.createElement(_RemoveConfirm.default, {
      onVisibleChange: this.handleConfirmChange,
      confirm: removeConfirm,
      onRemove: this.handleRemove
    })), showRecover && _react.default.createElement("a", {
      className: (0, _styles.uploadClass)('recover'),
      onClick: this.handleRecover
    }, _icons.default.Recovery));
  };

  return Result;
}(_react.PureComponent);

Result.propTypes = {
  index: _propTypes.default.number,
  onRemove: _propTypes.default.func,
  onRecover: _propTypes.default.func,
  recoverAble: _propTypes.default.bool,
  renderResult: _propTypes.default.func,
  showRecover: _propTypes.default.bool,
  value: _propTypes.default.any,
  removeConfirm: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object])
};
Result.defaultProps = {
  renderResult: function renderResult(a) {
    return a;
  },
  recoverAble: false
};
var _default = Result;
exports.default = _default;