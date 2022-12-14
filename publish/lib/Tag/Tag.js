"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _component = require("../component");

var _Input = _interopRequireDefault(require("./Input"));

var _proptypes = require("../utils/proptypes");

var _Spin = _interopRequireDefault(require("../Spin"));

var _icons = _interopRequireDefault(require("../icons"));

var _element = require("../utils/dom/element");

var _is = require("../utils/is");

var _color = require("../utils/color");

var _styles = require("./styles");

var _config = require("../config");

var _getDataset = _interopRequireDefault(require("../utils/dom/getDataset"));

var hideInput = 0;
var showInput = 1;

var Tag =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Tag, _PureComponent);

  function Tag(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      dismiss: 0,
      inputVisible: hideInput,
      // tag input status
      value: null
    };
    _this.dismiss = _this.dismiss.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleClose = _this.handleClose.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderClose = _this.renderClose.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.closeTag = _this.closeTag.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.toggleInputVisible = _this.toggleInputVisible.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.inputBlur = _this.inputBlur.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.inputChange = _this.inputChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Tag.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props = this.props,
        children = _this$props.children,
        onCompleted = _this$props.onCompleted;

    if (onCompleted && (0, _is.isString)(children) && !(0, _is.isEmpty)(children)) {
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

    if ((0, _is.isPromise)(callback)) {
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
    if ((0, _is.isFunc)(onCompleted)) onCompleted(value);
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

    if (onCompleted && !(0, _is.isEmpty)(value)) {
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
    var closeClass = (0, _styles.tagClass)('close-icon');
    var loadingClass = (0, _styles.tagClass)('close-loading');

    if (dismiss === 0) {
      return _react.default.createElement("div", {
        className: closeClass,
        onClick: this.handleClose
      }, _icons.default.Close);
    }

    return _react.default.createElement("div", {
      className: loadingClass
    }, _react.default.createElement(_Spin.default, {
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
    var rtl = (0, _config.isRTL)(); // if editable and input visible

    if (onCompleted && inputVisible === showInput) return _react.default.createElement(_Input.default, {
      value: value,
      onBlur: this.inputBlur,
      onChange: this.inputChange,
      onEnterPress: onEnterPress,
      onKeyUp: onKeyUp
    });
    var childrenParsed = (0, _element.wrapSpan)(children);
    var style = this.props.style;
    var tagClassName = (0, _styles.tagClass)('_', disabled && 'disabled', type, rtl && 'rtl');
    var inlineClassName = (0, _styles.tagClass)('inline');
    var click = !onClose ? {
      onClick: this.handleClick
    } : {};
    var tagStyle = style || {};
    if (className) tagClassName += " " + className;

    if (backgroundColor) {
      tagStyle = (0, _objectSpread2.default)({
        color: (0, _color.isDark)(backgroundColor) ? '#fff' : '#000',
        backgroundColor: backgroundColor,
        borderColor: 'transparent'
      }, style);
    }

    return _react.default.createElement("div", (0, _extends2.default)({
      className: tagClassName,
      style: tagStyle
    }, click, (0, _getDataset.default)(this.props)), onClose ? _react.default.createElement("div", {
      onClick: this.handleClick,
      className: inlineClassName
    }, childrenParsed) : childrenParsed, this.renderClose(dismiss));
  };

  return Tag;
}(_component.PureComponent);

Tag.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'type'), {
  children: _propTypes.default.any,
  onClose: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.bool]),
  backgroundColor: _propTypes.default.string,
  onCompleted: _propTypes.default.func,
  onKeyUp: _propTypes.default.func,
  onEnterPress: _propTypes.default.func
});
Tag.defaultProps = (0, _objectSpread2.default)({}, _proptypes.defaultProps, {
  type: 'default'
});
var _default = Tag;
exports.default = _default;