import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { selectClass } from './styles';
import { isObject } from '../utils/is';
import shallowEqual from '../utils/shallowEqual';
import icons from '../icons';
import { getDirectionClass } from '../utils/classname';

var Option =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Option, _React$Component);

  function Option(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleEnter = _this.handleHover.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Option.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.props.filterText) return true;
    if (!shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state)) return true;
    return false;
  };

  _proto.handleClick = function handleClick() {
    var _this2 = this;

    var _this$props = this.props,
        data = _this$props.data,
        onClick = _this$props.onClick,
        isActive = _this$props.isActive,
        index = _this$props.index,
        disabled = _this$props.disabled,
        groupKey = _this$props.groupKey;
    if (this.locked || disabled || data && data[groupKey]) return;
    this.locked = true;
    onClick(!isActive, data, index);
    setTimeout(function () {
      _this2.locked = false;
    }, 200);
  };

  _proto.handleHover = function handleHover() {
    this.props.onHover(this.props.index);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        data = _this$props2.data,
        isActive = _this$props2.isActive,
        index = _this$props2.index,
        renderItem = _this$props2.renderItem,
        isHover = _this$props2.isHover,
        disabled = _this$props2.disabled,
        groupKey = _this$props2.groupKey;
    var isGroupTitle = data && data[groupKey];
    var className = classnames(selectClass(getDirectionClass('option'), isActive && 'active', isHover && 'hover', disabled && getDirectionClass('disabled'), isGroupTitle && 'group'), "option-" + index);
    var result = isGroupTitle ? data[groupKey] : renderItem(data, index);
    var title = typeof result === 'string' ? result : '';

    if (isObject(data) && result === data) {
      console.warn('renderItem is essential when data element is Object');
    }

    return React.createElement("a", {
      tabIndex: -1,
      onClick: this.handleClick,
      onMouseEnter: this.handleEnter,
      className: className,
      title: title
    }, result, isActive && icons.Check);
  };

  return Option;
}(React.Component);

Option.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]).isRequired,
  disabled: PropTypes.bool,
  index: PropTypes.number,
  isActive: PropTypes.bool,
  isHover: PropTypes.bool,
  onClick: PropTypes.func,
  onHover: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  groupKey: PropTypes.string,
  filterText: PropTypes.string
};
export default Option;