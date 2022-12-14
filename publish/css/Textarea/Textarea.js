"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _config = require("../config");

var _component = require("../component");

var _styles = require("../Input/styles");

var _cleanProps = _interopRequireDefault(require("../utils/cleanProps"));

var _InputTitle = _interopRequireDefault(require("../InputTitle"));

var _styles2 = require("../InputTitle/styles");

var Textarea =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Textarea, _PureComponent);

  function Textarea(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "defaultInfo", function (value) {
      if (!value || value.length === 0) return null;
      var info = _this.props.info;
      var text = value.length + " / " + info;
      if (value.length <= info) return text;
      return new Error(text);
    });
    _this.state = {
      height: 0
    };
    _this.bindShadow = _this.bindShadow.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleBlur = _this.handleBlur.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleKeyUp = _this.handleKeyUp.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.resize = _this.resize.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.defaultInfo = _this.defaultInfo.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Textarea.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    if (this.props.autosize) this.resize();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.autosize && prevProps.value !== this.props.value) this.resize(this.props.value);
  };

  _proto.bindShadow = function bindShadow(el) {
    this.shadow = el;
  };

  _proto.resize = function resize(value) {
    if (value || value === '') this.shadow.value = value;
    var height = this.shadow ? this.shadow.scrollHeight : 0;
    this.setState({
      height: height
    });
  };

  _proto.handleChange = function handleChange(e) {
    this.props.onChange(e.target.value);

    if (this.props.autosize) {
      this.resize(e.target.value);
    }
  };

  _proto.handleKeyUp = function handleKeyUp(e) {
    var onEnterPress = this.props.onEnterPress;

    if (e.keyCode === 13 && onEnterPress) {
      onEnterPress(e.target.value, e);
    }
  };

  _proto.handleBlur = function handleBlur(e) {
    var value = e.target.value;
    var _this$props = this.props,
        forceChange = _this$props.forceChange,
        onBlur = _this$props.onBlur;
    if (onBlur) onBlur(e);
    forceChange(value);
  };

  _proto.renderFooter = function renderFooter() {
    var _this$props2 = this.props,
        renderFooter = _this$props2.renderFooter,
        value = _this$props2.value;
    if (!(renderFooter && typeof renderFooter === 'function')) return null;
    return _react.default.createElement("div", {
      key: "footer",
      className: (0, _styles.inputClass)('footer')
    }, renderFooter(value));
  };

  _proto.renderInfo = function renderInfo() {
    var info = this.props.info;
    var notNumber = typeof info !== 'number';
    if (typeof info !== 'function' && notNumber) return null;
    var textInfo = notNumber ? info : this.defaultInfo;
    var res = textInfo(this.props.value); // empty

    if (!res) return null;
    var isError = res instanceof Error;
    var text = isError ? res.message : res;
    return _react.default.createElement("div", {
      key: "info",
      style: {
        minWidth: 'auto'
      },
      className: (0, _styles.inputClass)((0, _config.isRTL)() ? 'bottom-left' : 'bottom-right', isError ? 'error' : 'tip')
    }, text);
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        autosize = _this$props3.autosize,
        onChange = _this$props3.onChange,
        maxHeight = _this$props3.maxHeight,
        info = _this$props3.info,
        onEnterPress = _this$props3.onEnterPress,
        resize = _this$props3.resize,
        renderFooter = _this$props3.renderFooter,
        inputFocus = _this$props3.inputFocus,
        innerTitle = _this$props3.innerTitle,
        placeTitle = _this$props3.placeTitle,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props3, ["autosize", "onChange", "maxHeight", "info", "onEnterPress", "resize", "renderFooter", "inputFocus", "innerTitle", "placeTitle"]);
    var value = props.value == null ? '' : props.value;
    var height = this.state.height || 'auto';
    var footerEl = this.renderFooter();
    var className = autosize ? (0, _styles.inputClass)('auto-size') : (0, _styles.inputClass)(resize && 'textarea-resize');
    var cs = (0, _classnames.default)(className, innerTitle && (0, _styles2.inputTitleClass)('hidable', 'item'));
    var ts = [_react.default.createElement("textarea", (0, _extends2.default)({}, (0, _cleanProps.default)(props), {
      key: "t",
      value: value,
      className: cs,
      style: {
        height: height,
        maxHeight: maxHeight,
        overflow: 'auto'
      },
      onChange: this.handleChange,
      onKeyUp: this.handleKeyUp,
      onBlur: this.handleBlur
    })), footerEl, this.renderInfo()];
    var cs2 = (0, _classnames.default)((0, _styles.inputClass)('shadow'), innerTitle && (0, _styles2.inputTitleClass)('hidable', 'item'));

    if (autosize) {
      ts.push(_react.default.createElement("textarea", {
        key: "s",
        ref: this.bindShadow,
        className: cs2,
        rows: props.rows,
        defaultValue: value
      }));
    }

    return _react.default.createElement(_InputTitle.default, {
      innerTitle: innerTitle,
      open: !!value || !!inputFocus,
      placeTitle: placeTitle
    }, ts);
  };

  return Textarea;
}(_component.PureComponent);

Textarea.propTypes = {
  autosize: _propTypes.default.bool,
  forceChange: _propTypes.default.func,
  info: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.number]),
  maxHeight: _propTypes.default.number,
  onBlur: _propTypes.default.func,
  onChange: _propTypes.default.func.isRequired,
  onEnterPress: _propTypes.default.func,
  rows: _propTypes.default.number,
  value: _propTypes.default.string,
  resize: _propTypes.default.bool,
  renderFooter: _propTypes.default.func,
  innerTitle: _propTypes.default.node,
  inputFocus: _propTypes.default.bool,
  placeTitle: _propTypes.default.node
};
Textarea.defaultProps = {
  rows: 4,
  resize: false
};
var _default = Textarea;
exports.default = _default;