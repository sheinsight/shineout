import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PureComponent } from '../component';
import { cardClass } from './styles';
import { isRTL } from '../config';

var getChildId = function getChildId(child, i) {
  if (child && child.props && child.props.id !== undefined) return child.props.id;
  return i;
};

var Accordion =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Accordion, _PureComponent);

  function Accordion(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      active: props.active || props.defaultActive
    };
    return _this;
  }

  var _proto = Accordion.prototype;

  _proto.getActive = function getActive() {
    if (this.props.active !== undefined) return this.props.active;
    return this.state.active;
  };

  _proto.handleActive = function handleActive(active) {
    if (active === this.state.active) active = null;
    this.setState({
      active: active
    });
    if (this.props.onChange) this.props.onChange(active);
  };

  _proto.render = function render() {
    var _this2 = this;

    var active = this.getActive();
    return Children.toArray(this.props.children).map(function (child, i) {
      var childId = getChildId(child, i);
      var props = {
        collapsed: active !== childId,
        collapsible: true,
        className: classnames(typeof child === 'object' && child.className, cardClass('accordion', isRTL && 'accordion-rtl')),
        onCollapse: _this2.handleActive.bind(_this2, childId)
      };
      return cloneElement(child, props);
    });
  };

  return Accordion;
}(PureComponent);

Accordion.propTypes = {
  active: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  defaultActive: PropTypes.any,
  onChange: PropTypes.func
};
Accordion.defaultProps = {
  defaultActive: 0
};
export default Accordion;