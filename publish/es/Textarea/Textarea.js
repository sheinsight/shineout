import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isRTL } from '../config';
import { PureComponent } from '../component';
import { inputClass } from '../Input/styles';
import cleanProps from '../utils/cleanProps';
import InputTitle from '../InputTitle';
import { inputTitleClass } from '../InputTitle/styles';

var Textarea =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Textarea, _PureComponent);

  function Textarea(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "defaultInfo", function (value) {
      if (!value || value.length === 0) return null;
      var info = _this.props.info;
      var text = value.length + " / " + info;
      if (value.length <= info) return text;
      return new Error(text);
    });

    _this.state = {
      height: 0
    };
    _this.bindShadow = _this.bindShadow.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleKeyUp = _this.handleKeyUp.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.resize = _this.resize.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.defaultInfo = _this.defaultInfo.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
    return React.createElement("div", {
      key: "footer",
      className: inputClass('footer')
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
    return React.createElement("div", {
      key: "info",
      style: {
        minWidth: 'auto'
      },
      className: inputClass(isRTL() ? 'bottom-left' : 'bottom-right', isError ? 'error' : 'tip')
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
        props = _objectWithoutPropertiesLoose(_this$props3, ["autosize", "onChange", "maxHeight", "info", "onEnterPress", "resize", "renderFooter", "inputFocus", "innerTitle", "placeTitle"]);

    var value = props.value == null ? '' : props.value;
    var height = this.state.height || 'auto';
    var footerEl = this.renderFooter();
    var className = autosize ? inputClass('auto-size') : inputClass(resize && 'textarea-resize');
    var cs = classnames(className, innerTitle && inputTitleClass('hidable', 'item'));
    var ts = [React.createElement("textarea", _extends({}, cleanProps(props), {
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
    var cs2 = classnames(inputClass('shadow'), innerTitle && inputTitleClass('hidable', 'item'));

    if (autosize) {
      ts.push(React.createElement("textarea", {
        key: "s",
        ref: this.bindShadow,
        className: cs2,
        rows: props.rows,
        defaultValue: value
      }));
    }

    return React.createElement(InputTitle, {
      innerTitle: innerTitle,
      open: !!value || !!inputFocus,
      placeTitle: placeTitle
    }, ts);
  };

  return Textarea;
}(PureComponent);

Textarea.propTypes = {
  autosize: PropTypes.bool,
  forceChange: PropTypes.func,
  info: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  maxHeight: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onEnterPress: PropTypes.func,
  rows: PropTypes.number,
  value: PropTypes.string,
  resize: PropTypes.bool,
  renderFooter: PropTypes.func,
  innerTitle: PropTypes.node,
  inputFocus: PropTypes.bool,
  placeTitle: PropTypes.node
};
Textarea.defaultProps = {
  rows: 4,
  resize: false
};
export default Textarea;