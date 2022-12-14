"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _component = require("../component");

var _strings = require("../utils/strings");

var _proptypes = require("../utils/proptypes");

var _styles = require("./styles");

var _icons = _interopRequireDefault(require("../icons"));

var _config = require("../config");

var Alert =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Alert, _PureComponent);

  function Alert(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      dismiss: 0
    };
    _this.bindRef = _this.bindRef.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.dismiss = _this.dismiss.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleClose = _this.handleClose.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderClose = _this.renderClose.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Alert.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.dismiss !== prevProps.dismiss && this.props.dismiss) {
      this.handleClose();
    }
  };

  _proto.bindRef = function bindRef(el) {
    this.element = el;
  };

  _proto.dismiss = function dismiss() {
    var onClose = this.props.onClose;
    this.setState({
      dismiss: 2
    });

    if (typeof onClose === 'function') {
      onClose();
    }
  };

  _proto.handleClose = function handleClose() {
    var _this2 = this;

    if (this.state.dismiss > 0) return;
    var _this$props = this.props,
        duration = _this$props.duration,
        outAnimation = _this$props.outAnimation,
        onClose = _this$props.onClose; // outer animation

    if (outAnimation) {
      if (typeof onClose === 'function') {
        onClose(duration, this.element.offsetHeight);
      }

      return;
    }

    if (duration > 0) {
      this.setState({
        dismiss: 1
      }, function () {
        setTimeout(_this2.dismiss, duration);
      });
    } else {
      this.dismiss();
    }
  };

  _proto.renderIcon = function renderIcon() {
    var icon = this.props.icon;
    var _this$props2 = this.props,
        type = _this$props2.type,
        iconSize = _this$props2.iconSize;

    if (typeof icon === 'boolean' && icon) {
      icon = _icons.default[(0, _strings.capitalize)(type)];
    }

    if (!icon) return null;
    var style = {
      width: iconSize,
      height: iconSize,
      marginRight: iconSize / 2
    };

    if ((0, _config.isRTL)()) {
      style.marginLeft = style.marginRight;
      delete style.marginRight;
    }

    return _react.default.createElement("div", {
      className: (0, _styles.alertClass)('icon'),
      style: style
    }, icon);
  };

  _proto.renderClose = function renderClose() {
    var closeItem = this.props.closeItem;
    if (_react.default.isValidElement(closeItem)) return _react.default.cloneElement(closeItem, {
      onClick: this.handleClose
    });
    return _react.default.createElement("a", {
      className: (0, _styles.alertClass)('close'),
      onClick: this.handleClose
    }, closeItem || _icons.default.Close);
  };

  _proto.render = function render() {
    var dismiss = this.state.dismiss;
    if (dismiss === 2) return null;
    var _this$props3 = this.props,
        children = _this$props3.children,
        className = _this$props3.className,
        type = _this$props3.type,
        onClose = _this$props3.onClose,
        outAnimation = _this$props3.outAnimation,
        hideClose = _this$props3.hideClose;
    var icon = this.renderIcon();
    var style = this.props.style;
    var showClose = onClose && !hideClose;
    var wrapClassName = (0, _styles.alertClass)('_', type, !outAnimation && dismiss === 1 && 'dismissed', showClose && 'with-close', icon && 'with-icon', (0, _config.isRTL)() && 'rtl');
    if (className) wrapClassName += " " + className;
    return _react.default.createElement("div", {
      ref: this.bindRef,
      className: wrapClassName,
      style: style
    }, showClose && this.renderClose(), icon, _react.default.createElement("div", {
      className: (0, _styles.alertClass)('content')
    }, children));
  };

  return Alert;
}(_component.PureComponent);

Alert.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'type'), {
  children: _propTypes.default.any,
  dismiss: _propTypes.default.bool,
  duration: _propTypes.default.number,
  icon: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.element]),
  iconSize: _propTypes.default.number,
  onClose: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.bool]),
  hideClose: _propTypes.default.bool
});
Alert.defaultProps = (0, _objectSpread2.default)({}, _proptypes.defaultProps, {
  duration: 200,
  iconSize: 16,
  type: 'warning'
});
Alert.displayName = 'ShineoutAlert';
var _default = Alert;
exports.default = _default;