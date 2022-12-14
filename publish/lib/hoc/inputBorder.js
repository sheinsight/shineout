"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _component = require("../component");

var _func = require("../utils/func");

var _styles = require("../Popover/styles");

var _styles2 = require("../Button/styles");

var _styles3 = require("../Input/styles");

var _styles4 = require("../Form/styles");

var _Popover = _interopRequireDefault(require("../Popover"));

var _config = require("../config");

var _getDataset = _interopRequireDefault(require("../utils/dom/getDataset"));

var _default = (0, _func.curry)(function (options, Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inheritsLoose2.default)(_class, _Component);

    function _class(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.el = null;
      _this.state = {
        focus: props.autoFocus
      };
      _this.bindRef = _this.bindRef.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.handleBlur = _this.handleBlur.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.handleFocus = _this.handleFocus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))); // this.enterPress = this.enterPress.bind(this)

      return _this;
    }

    var _proto = _class.prototype;

    _proto.bindRef = function bindRef(el) {
      this.el = el;
    };

    _proto.handleBlur = function handleBlur(event) {
      this.setState({
        focus: false
      });
      var onBlur = this.props.onBlur;
      if (onBlur) onBlur(event);
    };

    _proto.handleFocus = function handleFocus(event) {
      this.setState({
        focus: true
      });
      var onFocus = this.props.onFocus;
      if (onFocus) onFocus(event);
    };

    _proto.renderHelp = function renderHelp(focus) {
      var _this2 = this;

      var _this$props = this.props,
          error = _this$props.error,
          tip = _this$props.tip,
          popover = _this$props.popover,
          popoverProps = _this$props.popoverProps;
      var classList = ['input-tip'];
      var position = popover || ((0, _config.isRTL)() ? 'bottom-right' : 'bottom-left');
      var styles = popoverProps.style && popoverProps.style.width ? popoverProps.style : Object.assign({
        minWidth: 200,
        maxWidth: 400
      }, popoverProps.style || {}); // 只有有错需要popover，或者tip被focus才显示

      if (error && popover || tip && focus) {
        if (error) classList.push('input-error');
        return _react.default.createElement(_Popover.default, (0, _extends2.default)({
          getPopupContainer: function getPopupContainer() {
            return _this2.el;
          }
        }, popoverProps, {
          visible: true,
          style: styles,
          className: _styles.popoverClass.apply(void 0, classList),
          position: position
        }), error ? error.message : tip);
      }

      return null;
    };

    _proto.render = function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          border = _this$props2.border,
          size = _this$props2.size,
          tip = _this$props2.tip,
          popover = _this$props2.popover,
          width = _this$props2.width,
          style = _this$props2.style,
          error = _this$props2.error,
          popoverProps = _this$props2.popoverProps,
          underline = _this$props2.underline,
          other = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["className", "border", "size", "tip", "popover", "width", "style", "error", "popoverProps", "underline"]);
      var focus = this.state.focus;
      var rtl = (0, _config.isRTL)();
      var Tag = options.tag || 'label';
      var newStyle = Object.assign({
        width: width
      }, style);
      var isDisabled = typeof other.disabled === 'function' ? false : !!other.disabled;
      var newClassName = (0, _classnames.default)((0, _styles4.inputBorderClass)(rtl && 'rtl'), (0, _styles3.inputClass)('_', rtl && 'rtl', focus && !isDisabled && 'focus', isDisabled && 'disabled', options.isGroup && 'group', size, newStyle.width && 'inline', !border && 'no-border', options.overflow && "overflow-" + options.overflow, error && 'invalid', popover && error && 'focus', underline && 'underline'), (0, _styles2.buttonClass)(options.isGroup && 'group', options.from === 'input' && options.isGroup && 'from-input-group'), typeof options.className === 'function' ? options.className(this.props) : options.className, this.props.className);
      return _react.default.createElement(Tag, (0, _extends2.default)({
        ref: this.bindRef,
        className: newClassName,
        style: newStyle,
        tabIndex: options.enterPress ? '0' : undefined
      }, (0, _getDataset.default)(other)), _react.default.createElement(Origin, (0, _extends2.default)({}, other, {
        size: size,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        inputFocus: focus
      })), this.renderHelp(focus));
    };

    return _class;
  }(_component.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    autoFocus: _propTypes.default.bool,
    border: _propTypes.default.bool,
    className: _propTypes.default.string,
    disabled: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
    error: _propTypes.default.object,
    onBlur: _propTypes.default.func,
    onFocus: _propTypes.default.func,
    size: _propTypes.default.string,
    style: _propTypes.default.object,
    tip: _propTypes.default.any,
    width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    popover: _propTypes.default.oneOf(['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right']),
    popoverProps: _propTypes.default.object,
    underline: _propTypes.default.bool
  }), (0, _defineProperty2.default)(_class, "defaultProps", {
    border: true,
    style: {},
    popoverProps: {}
  }), _temp;
});

exports.default = _default;