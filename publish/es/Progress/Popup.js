import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React from 'react';
import PropTypes from 'prop-types';
import { progressClass } from './styles';
import { isRTL } from '../config';
var ROTATE_MAX_ANGLE = 15;
var PROGRESS_CENTER = 60;

var Popup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Popup, _React$Component);

  function Popup() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Popup.prototype;

  _proto.getStyle = function getStyle() {
    var _ref;

    var value = this.props.value;
    var rotate = 0;
    if (value <= PROGRESS_CENTER) rotate = ROTATE_MAX_ANGLE * (value / PROGRESS_CENTER);else rotate = (1 - value / 100) * ROTATE_MAX_ANGLE;
    return _ref = {}, _ref[isRTL() ? 'right' : 'left'] = value + "%", _ref.transform = "translateX(" + (isRTL() ? '50%' : '-50%') + ") rotate(" + rotate + "deg)", _ref;
  };

  _proto.render = function render() {
    var children = this.props.children;
    return React.createElement("div", {
      className: progressClass('popup'),
      style: this.getStyle()
    }, React.createElement("span", {
      className: progressClass('value')
    }, children), React.createElement("span", {
      className: progressClass('arrow')
    }));
  };

  return Popup;
}(React.Component);

export { Popup as default };
Popup.propTypes = {
  value: PropTypes.number,
  children: PropTypes.any
};