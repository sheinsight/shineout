"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = _interopRequireDefault(require("./index"));

var _Button = _interopRequireDefault(require("../Button"));

var _Alert = _interopRequireDefault(require("../Alert"));

var _component = require("../component");

var _styles = require("./styles");

var _proptypes = require("../utils/proptypes");

var _locale = require("../locale");

var Confirm =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Confirm, _Component);

  function Confirm(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      ok: false,
      cancel: false
    };
    _this.handleCancel = _this.handleClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'cancel');
    _this.handleOk = _this.handleClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'ok');
    return _this;
  }

  var _proto = Confirm.prototype;

  _proto.handleClick = function handleClick(type, close) {
    var _this2 = this;

    var _this$props = this.props,
        onOk = _this$props.onOk,
        onCancel = _this$props.onCancel;
    var fn = type === 'ok' ? onOk : onCancel;
    var callback;
    if (fn) callback = fn();

    if (callback && typeof callback.then === 'function') {
      var _this$setState;

      this.setState((_this$setState = {}, _this$setState[type] = true, _this$setState), function () {
        callback.then(function () {
          var _this2$setState;

          close();

          _this2.setState((_this2$setState = {}, _this2$setState[type] = false, _this2$setState));
        });
      });
    } else {
      close();
    }
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props2 = this.props,
        children = _this$props2.children,
        type = _this$props2.type,
        text = _this$props2.text,
        onOk = _this$props2.onOk,
        okType = _this$props2.okType,
        onCancel = _this$props2.onCancel,
        icon = _this$props2.icon,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["children", "type", "text", "onOk", "okType", "onCancel", "icon"]);
    var _this$state = this.state,
        ok = _this$state.ok,
        cancel = _this$state.cancel;
    return _react.default.createElement(_index.default, (0, _extends2.default)({}, other, {
      trigger: "click"
    }), function (close) {
      return _react.default.createElement("div", {
        className: (0, _styles.popoverClass)('confirm')
      }, _react.default.createElement("div", {
        className: (0, _styles.popoverClass)('mention')
      }, _react.default.createElement(_Alert.default, {
        type: type,
        icon: icon,
        className: (0, _styles.popoverClass)('alert')
      }, children)), _react.default.createElement("div", {
        className: (0, _styles.popoverClass)('footer')
      }, _react.default.createElement(_Button.default, {
        loading: cancel,
        size: "small",
        onClick: function onClick() {
          return _this3.handleCancel(close);
        }
      }, (0, _locale.getLocale)('cancel', text)), _react.default.createElement(_Button.default, {
        loading: ok,
        size: "small",
        type: okType,
        onClick: function onClick() {
          return _this3.handleOk(close);
        }
      }, (0, _locale.getLocale)('ok', text))));
    });
  };

  return Confirm;
}(_component.Component);

exports.default = Confirm;
Confirm.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'type'), {
  children: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.string]),
  text: _propTypes.default.object,
  onOk: _propTypes.default.func,
  onCancel: _propTypes.default.func,
  okType: _propTypes.default.string,
  icon: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.node])
});
Confirm.defaultProps = {
  type: 'confirmwarning',
  icon: true,
  okType: 'danger'
};