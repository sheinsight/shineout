import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getProps, defaultProps } from '../utils/proptypes';
import { dispatchEvent } from '../utils/dom/element';
import { cardClass } from './styles';
import { Provider } from './context';
import { compose } from '../utils/func';
import resizable from '../hoc/resizable';
import moveable from '../hoc/moveable';
import { modalClass } from '../Modal/styles';
import { isRTL } from '../config';

var Card =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Card, _PureComponent);

  function Card(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      collapsed: props.defaultCollapsed,
      formStatus: ''
    };
    _this.bindElement = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleCollapse = _this.handleCollapse.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setFormStatus = _this.setFormStatus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Card.prototype;

  _proto.getCollapsed = function getCollapsed() {
    var _this$props = this.props,
        collapsible = _this$props.collapsible,
        collapsed = _this$props.collapsed;
    if (!collapsible) return undefined;
    return collapsed !== undefined ? collapsed : this.state.collapsed;
  };

  _proto.setFormStatus = function setFormStatus(status) {
    if (status !== this.state.formStatus) {
      this.setState({
        formStatus: status
      });
    }
  };

  _proto.bindElement = function bindElement(el) {
    this.element = el;
    var forwardedRef = this.props.forwardedRef;
    if (forwardedRef) forwardedRef(el);
  };

  _proto.handleCollapse = function handleCollapse() {
    var collapsed = !this.getCollapsed();
    if (this.props.onCollapse) this.props.onCollapse(collapsed);else this.setState({
      collapsed: collapsed
    });
  };

  _proto.handleSubmit = function handleSubmit(target) {
    var form = this.element.querySelector('form');
    if (form) dispatchEvent(form, 'submit', target);else console.error(new Error('No form found.'));
  };

  _proto.render = function render() {
    var collapsible = this.props.collapsible;
    var collapsed = this.getCollapsed();
    var shadow = this.props.shadow === true ? 'shadow' : this.props.shadow;
    var className = classnames(cardClass('_', shadow, collapsible && 'collapsible', collapsed && 'collapsed', isRTL() && 'rtl'), this.props.className);
    var provierValue = {
      onCollapse: this.handleCollapse,
      collapsible: collapsible,
      collapsed: collapsed,
      formStatus: this.state.formStatus,
      onSubmit: this.handleSubmit,
      setFormStatus: this.setFormStatus
    };
    return React.createElement("div", {
      className: className,
      ref: this.bindElement,
      style: this.props.style
    }, React.createElement(Provider, {
      value: provierValue
    }, this.props.children));
  };

  return Card;
}(PureComponent);

Card.propTypes = _objectSpread({}, getProps(PropTypes), {
  shadow: PropTypes.oneOf([true, false, 'hover']),
  forwardedRef: PropTypes.func
});
Card.defaultProps = _objectSpread({}, defaultProps, {
  defaultCollapsed: true,
  collapsible: false
});
export default compose(moveable("." + cardClass('header') + ", ." + modalClass('method-title')), resizable)(Card);