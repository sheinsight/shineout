import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import { PureComponent } from '../component';
import Input from './Input';
import { getProps, defaultProps } from '../utils/proptypes';
import Spin from '../Spin';
import icons from '../icons';
import { wrapSpan } from '../utils/dom/element';
import { isPromise, isFunc, isString, isEmpty } from '../utils/is';
import { isDark } from '../utils/color';
import { tagClass } from './styles';
import { isRTL } from '../config';
import getDataset from '../utils/dom/getDataset';
var hideInput = 0;
var showInput = 1;

var Tag =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Tag, _PureComponent);

  function Tag(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      dismiss: 0,
      inputVisible: hideInput,
      // tag input status
      value: null
    };
    _this.dismiss = _this.dismiss.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleClose = _this.handleClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderClose = _this.renderClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.closeTag = _this.closeTag.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.toggleInputVisible = _this.toggleInputVisible.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.inputBlur = _this.inputBlur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.inputChange = _this.inputChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Tag.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props = this.props,
        children = _this$props.children,
        onCompleted = _this$props.onCompleted;

    if (onCompleted && isString(children) && !isEmpty(children)) {
      this.setState({
        value: children
      });
    }
  };

  _proto.closeTag = function closeTag(dismiss) {
    if (dismiss === void 0) {
      dismiss = 2;
    }

    this.setState({
      dismiss: dismiss
    });
  };

  _proto.dismiss = function dismiss(e) {
    var _this2 = this;

    var onClose = this.props.onClose;
    var callback;

    if (onClose === true) {
      this.closeTag();
      return;
    }

    if (typeof onClose === 'function') {
      callback = onClose(e);
    }

    if (isPromise(callback)) {
      this.setState({
        dismiss: 1
      });
      callback.then(function () {
        _this2.closeTag();
      }).catch(function () {
        _this2.closeTag(0);
      });
      return;
    }

    if (e.defaultPrevented) {
      return;
    }

    this.closeTag();
  };

  _proto.inputBlur = function inputBlur(value) {
    var onCompleted = this.props.onCompleted;
    if (isFunc(onCompleted)) onCompleted(value);
    this.setState({
      inputVisible: hideInput
    });
  };

  _proto.inputChange = function inputChange(value) {
    this.setState({
      value: value
    });
  };

  _proto.toggleInputVisible = function toggleInputVisible() {
    var _this$state = this.state,
        inputVisible = _this$state.inputVisible,
        value = _this$state.value;
    var onCompleted = this.props.onCompleted; // if onCompleted is not null

    if (onCompleted && !isEmpty(value)) {
      this.setState({
        inputVisible: inputVisible === hideInput ? showInput : hideInput
      });
    }
  };

  _proto.handleClick = function handleClick(e) {
    var _this$props2 = this.props,
        onClick = _this$props2.onClick,
        disabled = _this$props2.disabled;
    if (disabled) return; // toggle input visible

    this.toggleInputVisible();

    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  _proto.handleClose = function handleClose(e) {
    var disabled = this.props.disabled;
    if (this.state.dismiss > 0 || disabled) return;
    this.dismiss(e);
  };

  _proto.renderClose = function renderClose(dismiss) {
    var onClose = this.props.onClose;
    if (!onClose) return null;
    var closeClass = tagClass('close-icon');
    var loadingClass = tagClass('close-loading');

    if (dismiss === 0) {
      return React.createElement("div", {
        className: closeClass,
        onClick: this.handleClose
      }, icons.Close);
    }

    return React.createElement("div", {
      className: loadingClass
    }, React.createElement(Spin, {
      name: "ring",
      size: 10
    }));
  };

  _proto.render = function render() {
    var _this$state2 = this.state,
        dismiss = _this$state2.dismiss,
        inputVisible = _this$state2.inputVisible,
        value = _this$state2.value;
    if (dismiss === 2) return null;
    var _this$props3 = this.props,
        children = _this$props3.children,
        className = _this$props3.className,
        type = _this$props3.type,
        backgroundColor = _this$props3.backgroundColor,
        onClose = _this$props3.onClose,
        disabled = _this$props3.disabled,
        onCompleted = _this$props3.onCompleted,
        onEnterPress = _this$props3.onEnterPress,
        onKeyUp = _this$props3.onKeyUp;
    var rtl = isRTL(); // if editable and input visible

    if (onCompleted && inputVisible === showInput) return React.createElement(Input, {
      value: value,
      onBlur: this.inputBlur,
      onChange: this.inputChange,
      onEnterPress: onEnterPress,
      onKeyUp: onKeyUp
    });
    var childrenParsed = wrapSpan(children);
    var style = this.props.style;
    var tagClassName = tagClass('_', disabled && 'disabled', type, rtl && 'rtl');
    var inlineClassName = tagClass('inline');
    var click = !onClose ? {
      onClick: this.handleClick
    } : {};
    var tagStyle = style || {};
    if (className) tagClassName += " " + className;

    if (backgroundColor) {
      tagStyle = _objectSpread({
        color: isDark(backgroundColor) ? '#fff' : '#000',
        backgroundColor: backgroundColor,
        borderColor: 'transparent'
      }, style);
    }

    return React.createElement("div", _extends({
      className: tagClassName,
      style: tagStyle
    }, click, getDataset(this.props)), onClose ? React.createElement("div", {
      onClick: this.handleClick,
      className: inlineClassName
    }, childrenParsed) : childrenParsed, this.renderClose(dismiss));
  };

  return Tag;
}(PureComponent);

Tag.propTypes = _objectSpread({}, getProps(PropTypes, 'type'), {
  children: PropTypes.any,
  onClose: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  backgroundColor: PropTypes.string,
  onCompleted: PropTypes.func,
  onKeyUp: PropTypes.func,
  onEnterPress: PropTypes.func
});
Tag.defaultProps = _objectSpread({}, defaultProps, {
  type: 'default'
});
export default Tag;