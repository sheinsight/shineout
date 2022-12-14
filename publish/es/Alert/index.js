import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import { PureComponent } from '../component';
import { capitalize } from '../utils/strings';
import { getProps, defaultProps } from '../utils/proptypes';
import { alertClass } from './styles';
import icons from '../icons';
import { isRTL } from '../config';

var Alert =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Alert, _PureComponent);

  function Alert(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      dismiss: 0
    };
    _this.bindRef = _this.bindRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.dismiss = _this.dismiss.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleClose = _this.handleClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderClose = _this.renderClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
      icon = icons[capitalize(type)];
    }

    if (!icon) return null;
    var style = {
      width: iconSize,
      height: iconSize,
      marginRight: iconSize / 2
    };

    if (isRTL()) {
      style.marginLeft = style.marginRight;
      delete style.marginRight;
    }

    return React.createElement("div", {
      className: alertClass('icon'),
      style: style
    }, icon);
  };

  _proto.renderClose = function renderClose() {
    var closeItem = this.props.closeItem;
    if (React.isValidElement(closeItem)) return React.cloneElement(closeItem, {
      onClick: this.handleClose
    });
    return React.createElement("a", {
      className: alertClass('close'),
      onClick: this.handleClose
    }, closeItem || icons.Close);
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
    var wrapClassName = alertClass('_', type, !outAnimation && dismiss === 1 && 'dismissed', showClose && 'with-close', icon && 'with-icon', isRTL() && 'rtl');
    if (className) wrapClassName += " " + className;
    return React.createElement("div", {
      ref: this.bindRef,
      className: wrapClassName,
      style: style
    }, showClose && this.renderClose(), icon, React.createElement("div", {
      className: alertClass('content')
    }, children));
  };

  return Alert;
}(PureComponent);

Alert.propTypes = _objectSpread({}, getProps(PropTypes, 'type'), {
  children: PropTypes.any,
  dismiss: PropTypes.bool,
  duration: PropTypes.number,
  icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  iconSize: PropTypes.number,
  onClose: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  hideClose: PropTypes.bool
});
Alert.defaultProps = _objectSpread({}, defaultProps, {
  duration: 200,
  iconSize: 16,
  type: 'warning'
});
Alert.displayName = 'ShineoutAlert';
export default Alert;