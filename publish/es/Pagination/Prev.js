import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React from 'react';
import PropTypes from 'prop-types';
import icons from '../icons';
import Item from './Item';
import { isRTL } from '../config';

var Prev =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(Prev, _React$PureComponent);

  function Prev() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = Prev.prototype;

  _proto.renderPrev = function renderPrev() {
    var text = this.props.text;
    var rtl = isRTL();

    if (rtl) {
      return text.next || icons.AngleRight;
    }

    return text.prev || icons.AngleLeft;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        onChange = _this$props.onChange,
        current = _this$props.current,
        text = _this$props.text,
        disabled = _this$props.disabled,
        isSimple = _this$props.isSimple;
    var prev = current - 1;
    var className = text.prev || isSimple ? "no-border arrow" : 'arrow';
    return React.createElement(Item, {
      className: className,
      page: prev,
      disabled: disabled || prev < 1,
      onClick: onChange
    }, this.renderPrev());
  };

  return Prev;
}(React.PureComponent);

Prev.propTypes = {
  current: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.object,
  isSimple: PropTypes.bool
};
Prev.displayName = 'ShineoutPaginationPrev';
export default Prev;