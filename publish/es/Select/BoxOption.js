import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox/Checkbox';
import Radio from '../Radio/Radio';
import { selectClass } from './styles';
import { getDirectionClass } from '../utils/classname';

var BoxOption =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(BoxOption, _PureComponent);

  function BoxOption(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = BoxOption.prototype;

  _proto.handleClick = function handleClick() {
    var _this2 = this;

    var _this$props = this.props,
        data = _this$props.data,
        onClick = _this$props.onClick,
        isActive = _this$props.isActive,
        index = _this$props.index,
        disabled = _this$props.disabled;
    if (this.locked || disabled) return;
    this.locked = true;
    onClick(!isActive, data, index);
    setTimeout(function () {
      _this2.locked = false;
    }, 200);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        data = _this$props2.data,
        index = _this$props2.index,
        isActive = _this$props2.isActive,
        renderItem = _this$props2.renderItem,
        columns = _this$props2.columns,
        multiple = _this$props2.multiple,
        disabled = _this$props2.disabled;
    var className = selectClass(getDirectionClass('option'));
    var width = columns < 0 ? undefined : 1 / columns * 100 + "%";
    var Input = multiple ? Checkbox : Radio;
    var result = renderItem(data, index);
    var title = typeof result === 'string' ? result : undefined;
    return React.createElement(Input, {
      disabled: disabled,
      style: {
        width: width
      },
      checked: isActive,
      className: className,
      onChange: this.handleClick
    }, React.createElement("span", {
      title: title
    }, result));
  };

  return BoxOption;
}(PureComponent);

BoxOption.propTypes = {
  columns: PropTypes.number,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]).isRequired,
  disabled: PropTypes.bool,
  index: PropTypes.number,
  isActive: PropTypes.bool,
  multiple: PropTypes.bool,
  onClick: PropTypes.func,
  renderItem: PropTypes.func.isRequired
};
export default BoxOption;