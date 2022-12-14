import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import draggable from '../hoc/draggable';
import { sliderClass } from './styles';

var Indicator =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Indicator, _PureComponent);

  function Indicator() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Indicator.prototype;

  _proto.render = function render() {
    var event = this.props.disabled ? undefined : this.props.onDragStart;
    return React.createElement("div", {
      onMouseDown: event,
      className: sliderClass('indicator')
    });
  };

  return Indicator;
}(PureComponent);

Indicator.propTypes = {
  disabled: PropTypes.bool,
  onDragStart: PropTypes.func.isRequired
};
export default draggable(Indicator);