import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React from 'react';
import PropTypes from 'prop-types';
import icons from '../icons';
import Item from './Item';
import { isRTL } from '../config';

var Next =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(Next, _React$PureComponent);

  function Next() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = Next.prototype;

  _proto.renderNext = function renderNext() {
    var text = this.props.text;
    var rtl = isRTL();

    if (rtl) {
      return text.prev || icons.AngleLeft;
    }

    return text.next || icons.AngleRight;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        onChange = _this$props.onChange,
        current = _this$props.current,
        text = _this$props.text,
        total = _this$props.total,
        pageSize = _this$props.pageSize,
        disabled = _this$props.disabled,
        isSimple = _this$props.isSimple;
    var max = Math.ceil(total / pageSize);
    var next = current + 1;
    var className = text.next || isSimple ? "no-border arrow" : 'arrow';
    return React.createElement(Item, {
      className: className,
      page: next,
      disabled: disabled || next > max,
      onClick: onChange
    }, this.renderNext());
  };

  return Next;
}(React.PureComponent);

Next.propTypes = {
  current: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  text: PropTypes.object,
  total: PropTypes.number.isRequired,
  isSimple: PropTypes.bool
};
Next.displayName = 'ShineoutPaginationNext';
export default Next;