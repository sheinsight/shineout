import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getParent, focusElement } from '../utils/dom/element';
import utils from './utils';
import { datepickerClass } from './styles';
import { getLocale } from '../locale';
var target = null;
document.addEventListener('mousedown', function (e) {
  // eslint-disable-next-line prefer-destructuring
  target = e.target;
}, true);

var Text =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Text, _PureComponent);

  function Text(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleInput = _this.handleInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleFocus = _this.handleFocus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindElement = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Text.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.focus !== this.props.focus && this.props.focus && this.element && (this.props.focusElement === this.element || !this.props.focusElement)) {
      focusElement.end(this.element);
    }
  };

  _proto.getOptions = function getOptions() {
    var timeZone = this.props.timeZone;
    return {
      timeZone: timeZone,
      weekStartsOn: getLocale('startOfWeek')
    };
  };

  _proto.bindElement = function bindElement(el) {
    var onTextSpanRef = this.props.onTextSpanRef;
    this.element = el;
    if (onTextSpanRef) onTextSpanRef(el);
  };

  _proto.handleBlur = function handleBlur(e) {
    var _this$props = this.props,
        format = _this$props.format,
        index = _this$props.index,
        onChange = _this$props.onChange,
        value = _this$props.value;
    var txt = e.target.innerText;
    if (getParent(target, "." + datepickerClass('picker'))) return;
    if (txt === value) return;

    if (txt.trim().length === 0) {
      onChange(undefined, index, e);
    } else {
      var newValue = utils.toDateWithFormat(txt, format, undefined, this.getOptions()); // if translate fail, clear

      if (!newValue) {
        this.element.innerText = null;
      }

      onChange(newValue, index, e);
    }
  };

  _proto.handleFocus = function handleFocus(e) {
    var onTextSpanRef = this.props.onTextSpanRef;
    if (onTextSpanRef) onTextSpanRef(e.target);
  };

  _proto.handleInput = function handleInput(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.element.blur();
      this.handleBlur(e); // must wait for handleBlur to finish executing

      Promise.resolve().then(function () {
        document.dispatchEvent(new Event('mousedown', {
          bubbles: true
        }));
      });
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        className = _this$props2.className,
        inputable = _this$props2.inputable,
        value = _this$props2.value,
        placeholder = _this$props2.placeholder,
        disabled = _this$props2.disabled,
        focus = _this$props2.focus;

    if (!inputable || disabled || !focus) {
      return React.createElement("span", {
        onClick: this.handleFocus,
        className: className
      }, value || placeholder);
    }

    return React.createElement("span", {
      ref: this.bindElement,
      contentEditable: inputable,
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      onKeyDown: this.handleInput,
      className: className,
      dangerouslySetInnerHTML: {
        __html: value
      }
    });
  };

  return Text;
}(PureComponent);

Text.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  format: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  index: PropTypes.number,
  inputable: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.any,
  value: PropTypes.string,
  onTextSpanRef: PropTypes.func,
  focus: PropTypes.bool,
  focusElement: PropTypes.instanceOf(Element),
  timeZone: PropTypes.string
};
Text.defaultProps = {
  value: ''
};
export default Text;