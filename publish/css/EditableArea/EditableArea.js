"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Textarea = _interopRequireDefault(require("../Textarea"));

var _Input = _interopRequireDefault(require("../Input"));

var _Popover = _interopRequireDefault(require("../Popover"));

var _styles = require("./styles");

var _icons = _interopRequireDefault(require("../icons"));

var _element = require("../utils/dom/element");

var _styles2 = require("../Input/styles");

var _InputTitle = _interopRequireDefault(require("../InputTitle"));

var _styles3 = require("../InputTitle/styles");

var noop = function noop() {};

function formatShowValue(value) {
  if (!value && value !== 0) return '';
  var arr = String(value).split('\n');
  var len = arr.length;
  if (len > 1) return arr[0] + "...";
  return String(value);
}

var Editable =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inheritsLoose2.default)(Editable, _React$PureComponent);

  function Editable(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;
    _this.state = {
      showTextarea: false
    };
    _this.bindContainer = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'container');
    _this.bindInput = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'input');
    _this.renderInput = _this.renderInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderPlace = _this.renderPlace.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderTextarea = _this.renderTextarea.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onBlur = _this.onBlur.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.autoFocus = _this.autoFocus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleFocus = _this.handleFocus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.showPop = _this.updateShowTextarea.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), true);
    _this.hidePop = _this.updateShowTextarea.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), false);
    _this.handleClear = _this.onChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), '');
    return _this;
  }

  var _proto = Editable.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var showTextarea = this.state.showTextarea;

    if (prevState.showTextarea !== showTextarea && showTextarea) {
      this.autoFocus();
    }
  };

  _proto.onChange = function onChange(value) {
    var onChange = this.props.onChange;
    if (typeof onChange === 'function') onChange(value);
  };

  _proto.onBlur = function onBlur(e) {
    var onBlur = this.props.onBlur;
    this.hidePop();
    if (typeof onBlur === 'function') onBlur(e);
  };

  _proto.getErrorProps = function getErrorProps() {
    var p = {};
    if ('error' in this.props) p.error = this.props.error;
    return p;
  };

  _proto.updateShowTextarea = function updateShowTextarea(flag) {
    if (flag && this.input) {
      this.width = (0, _element.getParent)(this.input, "." + (0, _styles.editableAreaClass)('input')).offsetWidth;
    }

    this.setState({
      showTextarea: flag
    });

    if (this.props.onShowTextareaChange) {
      this.props.onShowTextareaChange(flag);
    }
  };

  _proto.handleFocus = function handleFocus(e) {
    var onFocus = this.props.onFocus;
    if (typeof onFocus === 'function') onFocus(e);
  };

  _proto.bindElement = function bindElement(type, el) {
    this[type] = el;
  };

  _proto.autoFocus = function autoFocus() {
    if (!this.container) return;
    var target = this.container.querySelector("." + (0, _styles.editableAreaClass)('text-area') + " textarea.so-input-auto-size");
    if (target) _element.focusElement.end(target);
  };

  _proto.renderTextarea = function renderTextarea() {
    var showTextarea = this.state.showTextarea;
    var _this$props = this.props,
        placeholder = _this$props.placeholder,
        maxHeight = _this$props.maxHeight,
        value = _this$props.value,
        innerTitle = _this$props.innerTitle,
        placeTitle = _this$props.placeTitle,
        renderFooter = _this$props.renderFooter;
    if (!showTextarea) return null;
    return _react.default.createElement("div", {
      ref: this.bindContainer
    }, _react.default.createElement(_Textarea.default, (0, _extends2.default)({
      className: (0, _styles.editableAreaClass)('text-area'),
      autosize: true,
      innerTitle: innerTitle,
      placeTitle: placeTitle,
      value: value,
      rows: 1,
      delay: 0,
      onChange: this.onChange,
      onBlur: this.onBlur,
      onFocus: this.handleFocus,
      placeholder: placeholder,
      maxHeight: maxHeight,
      renderFooter: renderFooter
    }, this.getErrorProps())));
  };

  _proto.renderResult = function renderResult() {
    var _this$props2 = this.props,
        placeholder = _this$props2.placeholder,
        disabled = _this$props2.disabled,
        value = _this$props2.value,
        renderResult = _this$props2.renderResult,
        placeTitle = _this$props2.placeTitle,
        innerTitle = _this$props2.innerTitle,
        error = _this$props2.error;
    var result = renderResult(value);
    return _react.default.createElement("div", {
      tabIndex: disabled ? undefined : 0,
      className: (0, _classnames.default)((0, _styles.editableAreaClass)('input'), (0, _styles2.inputClass)('_', error && 'invalid', disabled && 'disabled')),
      onFocus: this.showPop
    }, _react.default.createElement(_InputTitle.default, {
      placeTitle: placeTitle,
      innerTitle: innerTitle,
      open: !!value
    }, _react.default.createElement("div", {
      className: (0, _classnames.default)((0, _styles2.inputClass)('spare'), innerTitle && (0, _styles3.inputTitleClass)('hidable', 'item')),
      ref: this.bindInput
    }, result || _react.default.createElement("div", {
      className: (0, _styles2.inputClass)('placeholder')
    }, placeholder || _react.default.createElement("br", null)))));
  };

  _proto.renderInput = function renderInput() {
    var _this$props3 = this.props,
        placeholder = _this$props3.placeholder,
        disabled = _this$props3.disabled,
        value = _this$props3.value,
        innerTitle = _this$props3.innerTitle,
        placeTitle = _this$props3.placeTitle;
    return _react.default.createElement(_Input.default, (0, _extends2.default)({
      innerTitle: innerTitle,
      placeTitle: placeTitle,
      forwardedRef: this.bindInput,
      placeholder: placeholder,
      value: formatShowValue(value),
      onChange: noop,
      className: (0, _styles.editableAreaClass)('input'),
      onFocus: this.showPop,
      disabled: disabled
    }, this.getErrorProps()));
  };

  _proto.renderPlace = function renderPlace() {
    var renderResult = this.props.renderResult;

    if (renderResult && typeof renderResult === 'function') {
      return this.renderResult();
    }

    return this.renderInput();
  };

  _proto.render = function render() {
    var showTextarea = this.state.showTextarea;
    var _this$props4 = this.props,
        width = _this$props4.width,
        style = _this$props4.style,
        className = _this$props4.className,
        bordered = _this$props4.bordered,
        clearable = _this$props4.clearable,
        getPopupContainer = _this$props4.getPopupContainer,
        value = _this$props4.value;
    var cls = (0, _classnames.default)(className, (0, _styles.editableAreaClass)('_', !bordered && 'none-bordered'));
    var ms = Object.assign({
      width: width
    }, style);
    var popStyle = {
      width: this.width
    };
    return _react.default.createElement("div", {
      className: cls,
      style: ms
    }, this.renderPlace(), _react.default.createElement(_Popover.default, {
      visible: showTextarea,
      showArrow: false,
      className: (0, _styles.editableAreaClass)('popover'),
      position: "cover",
      style: popStyle,
      getPopupContainer: getPopupContainer
    }, this.renderTextarea()), clearable && value ? _react.default.createElement("div", {
      className: (0, _styles.editableAreaClass)('clear'),
      onClick: this.handleClear
    }, _icons.default.CloseCircle) : null);
  };

  return Editable;
}(_react.default.PureComponent);

Editable.defaultProps = {
  bordered: false
};
Editable.propTypes = {
  onBlur: _propTypes.default.func,
  onChange: _propTypes.default.func,
  value: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  bordered: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  onFocus: _propTypes.default.func,
  disabled: _propTypes.default.bool,
  clearable: _propTypes.default.bool,
  getPopupContainer: _propTypes.default.func,
  maxHeight: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  innerTitle: _propTypes.default.node,
  placeTitle: _propTypes.default.node,
  renderFooter: _propTypes.default.func,
  renderResult: _propTypes.default.func,
  onShowTextareaChange: _propTypes.default.func,
  error: _propTypes.default.object
};
var _default = Editable;
exports.default = _default;