import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import { PureComponent } from '../component';
import { getProps, defaultProps } from '../utils/proptypes';
import { getParent } from '../utils/dom/element';
import Button from '../Button';
import { dropdownClass } from './styles';
import List from '../AnimationList';
import Item from './Item';
import { docSize } from '../utils/dom/document';
import absoluteList from '../AnimationList/AbsoluteList';
import { getUidStr } from '../utils/uid';
import absoluteComsumer from '../Table/context';
import Caret from '../icons/Caret';
import { isRTL } from '../config';
import { getDirectionClass } from '../utils/classname';
import getDataset from '../utils/dom/getDataset';
var positionMap = {
  'left-top': 'left-top',
  'left-bottom': 'left-bottom',
  'right-top': 'right-top',
  'right-bottom': 'right-bottom',
  'top-right': 'left-bottom',
  'top-left': 'right-bottom',
  'bottom-right': 'left-top',
  'bottom-left': 'right-top',
  auto: ''
};

var Dropdown =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Dropdown, _PureComponent);

  function Dropdown(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      show: false
    };

    if (props.hover !== undefined) {
      console.warn('The "hover" property is not recommend, use trigger="hover" instead.');
    }

    _this.dropdownId = "dropdown_" + getUidStr();
    _this.bindElement = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.clickAway = _this.clickAway.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleFocus = _this.handleFocus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleHide = _this.handleHide.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleMouseEnter = _this.handleToggle.bind(_assertThisInitialized(_assertThisInitialized(_this)), true);
    _this.handleMouseLeave = _this.handleToggle.bind(_assertThisInitialized(_assertThisInitialized(_this)), false);
    _this.renderList = _this.renderList.bind(_assertThisInitialized(_assertThisInitialized(_this)));

    _this.bindList();

    return _this;
  }

  var _proto = Dropdown.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    this.toggleDocumentEvent(false);
  };

  _proto.getTrigger = function getTrigger() {
    if (this.props.hover === true) return 'hover';
    return this.props.trigger;
  };

  _proto.getPosition = function getPosition() {
    var position = this.props.position;
    if (position !== 'auto') return position;
    if (!this.element) return 'bottom-left';
    var windowHeight = docSize.height;
    var windowWidth = docSize.width;
    var rect = this.element.getBoundingClientRect();
    position = rect.bottom > windowHeight / 2 ? 'top-' : 'bottom-';
    position += rect.right > windowWidth / 2 ? 'right' : 'left';
    return position;
  };

  _proto.bindElement = function bindElement(el) {
    this.element = el;
  };

  _proto.bindList = function bindList() {
    var animation = this.props.animation;
    var FadeList = List('fade', animation ? 'fast' : 0);
    this.DropdownList = absoluteList(function (_ref) {
      var focus = _ref.focus,
          other = _objectWithoutPropertiesLoose(_ref, ["focus"]);

      return React.createElement(FadeList, _extends({
        show: focus
      }, other));
    });
  };

  _proto.toggleDocumentEvent = function toggleDocumentEvent(bind) {
    var method = bind ? 'addEventListener' : 'removeEventListener';
    document[method]('click', this.clickAway, true);
  };

  _proto.clickAway = function clickAway(e) {
    var absolute = this.props.absolute;
    var el = getParent(e.target, 'a');
    var onSelf = absolute ? getParent(e.target, "[data-id=" + this.dropdownId + "]") : el === this.element || this.element.contains(el);
    if (el && onSelf && el.getAttribute('data-role') === 'item') return;
    this.handleHide(0);
  };

  _proto.handleFocus = function handleFocus() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
    }

    if (this.state.show) return;
    this.setState({
      show: true
    });
    this.toggleDocumentEvent(true);
  };

  _proto.handleHide = function handleHide(delay) {
    var _this2 = this;

    if (delay === void 0) {
      delay = 200;
    }

    this.closeTimer = setTimeout(function () {
      _this2.setState({
        show: false
      });

      _this2.toggleDocumentEvent(false);
    }, delay);
  };

  _proto.handleToggle = function handleToggle(show) {
    if (this.getTrigger() === 'click') return;
    if (show) this.handleFocus();else this.handleHide();
  };

  _proto.renderRTLButton = function renderRTLButton(placeholder, spanClassName, caret, buttonClassName) {
    var _this$props = this.props,
        isSub = _this$props.isSub,
        type = _this$props.type,
        outline = _this$props.outline,
        size = _this$props.size,
        disabled = _this$props.disabled;

    if (isSub) {
      return React.createElement("a", {
        key: "button",
        className: dropdownClass('button', 'item', this.state.show && 'active'),
        "data-role": "item",
        onClick: this.handleFocus
      }, React.createElement("span", {
        className: spanClassName
      }, placeholder), caret);
    }

    return React.createElement(Button, {
      disabled: disabled,
      onClick: this.handleFocus,
      outline: outline,
      className: buttonClassName,
      type: type,
      size: size,
      key: "button"
    }, React.createElement("span", {
      className: spanClassName
    }, placeholder), caret);
  };

  _proto.renderButton = function renderButton(placeholder) {
    var _this$props2 = this.props,
        type = _this$props2.type,
        outline = _this$props2.outline,
        size = _this$props2.size,
        disabled = _this$props2.disabled,
        isSub = _this$props2.isSub,
        position = _this$props2.position;
    var rtl = isRTL();
    var buttonClassName = dropdownClass('button', !placeholder && 'split-button', rtl && 'rtl');
    var spanClassName = dropdownClass('button-content');
    var caret = React.createElement("span", {
      key: "caret",
      className: dropdownClass('caret', rtl && 'rtl')
    }, React.createElement(Caret, null));
    var childs = [React.createElement("span", {
      key: "text",
      className: spanClassName
    }, placeholder), caret];

    if (['left-bottom', 'left-top'].includes(position)) {
      childs.reverse();
    }

    if (isSub) {
      return React.createElement("a", {
        key: "button",
        className: dropdownClass('button', 'item', this.state.show && 'active'),
        "data-role": "item",
        onClick: this.handleFocus
      }, childs);
    }

    return React.createElement(Button, {
      disabled: disabled,
      onClick: this.handleFocus,
      outline: outline,
      className: buttonClassName,
      type: type,
      size: size,
      key: "button"
    }, childs);
  };

  _proto.renderList = function renderList(data, placeholder, position) {
    var _this3 = this;

    var _this$props3 = this.props,
        width = _this$props3.width,
        onClick = _this$props3.onClick,
        columns = _this$props3.columns,
        renderItem = _this$props3.renderItem,
        absolute = _this$props3.absolute;
    if (!Array.isArray(data) || data.length === 0) return null;
    var DropdownList = this.DropdownList;
    return [React.createElement(DropdownList, {
      absolute: absolute,
      parentElement: this.element,
      position: position,
      className: dropdownClass(getDirectionClass('menu'), columns > 1 && 'box-list', isRTL() && 'rtl'),
      style: {
        width: width
      },
      key: "list",
      focus: this.state.show,
      "data-id": this.dropdownId,
      fixed: "min"
    }, data.map(function (d, index) {
      var childPosition = positionMap[position];
      var itemClassName = dropdownClass('item', !width && 'no-width', childPosition.indexOf('left') === 0 && 'item-left');
      return d.children ? React.createElement(Dropdown, {
        style: {
          width: '100%'
        },
        data: d.children,
        disabled: d.disabled,
        placeholder: d.content,
        type: "link",
        key: index,
        position: childPosition,
        btnColor: true,
        onClick: onClick,
        renderItem: renderItem,
        trigger: _this3.getTrigger(),
        isSub: true
      }) : React.createElement(Item, {
        data: d,
        key: index,
        onClick: d.onClick || onClick,
        itemClassName: itemClassName,
        renderItem: renderItem,
        columns: columns,
        width: width
      });
    })), this.renderButton(placeholder)];
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        data = _this$props4.data,
        className = _this$props4.className,
        style = _this$props4.style,
        placeholder = _this$props4.placeholder;
    var show = this.state.show;
    var position = this.getPosition();
    var wrapClassName = dropdownClass('_', position, show && 'show', {
      'split-dropdown': !placeholder,
      rtl: isRTL()
    });
    if (className) wrapClassName += " " + className;
    return React.createElement("div", _extends({
      ref: this.bindElement,
      className: wrapClassName,
      style: style,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave
    }, getDataset(this.props)), this.renderList(data, placeholder, position));
  };

  return Dropdown;
}(PureComponent);

Dropdown.propTypes = _objectSpread({}, getProps(PropTypes, 'placeholder', 'type'), {
  data: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  hover: PropTypes.bool,
  isSub: PropTypes.bool,
  position: PropTypes.oneOf(['left-top', 'left-bottom', 'right-top', 'right-bottom', 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'auto']),
  trigger: PropTypes.oneOf(['click', 'hover']),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  animation: PropTypes.bool
});
Dropdown.defaultProps = _objectSpread({}, defaultProps, {
  disabled: false,
  data: [],
  position: 'bottom-left',
  trigger: 'click',
  animation: true
});
Dropdown.displayName = 'ShineoutDropdown';
export default absoluteComsumer(Dropdown);