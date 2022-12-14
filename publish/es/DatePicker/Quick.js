import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React from 'react';
import PropTypes from 'prop-types';
import utils from './utils';
import { datepickerClass } from './styles';
import { getLocale } from '../locale';

var Quick =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Quick, _React$Component);

  function Quick() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Quick.prototype;

  _proto.getOptions = function getOptions() {
    var timeZone = this.props.timeZone;
    return {
      timeZone: timeZone,
      startOfWeek: getLocale('startOfWeek')
    };
  };

  _proto.compareDate = function compareDate(a, b) {
    var type = this.props.type;
    return utils.compareDateArray(a, b, type, this.getOptions());
  };

  _proto.handleQuick = function handleQuick(quick) {
    if (quick.invalid) {
      console.error("the date you provider for " + quick.name + " is invalid, please check the date in quickSelect!");
      return;
    }

    var onChange = this.props.onChange;
    if (onChange) onChange(quick);
  };

  _proto.render = function render() {
    var _this = this;

    var _this$props = this.props,
        quicks = _this$props.quicks,
        current = _this$props.current,
        children = _this$props.children;
    var currentArray = Array.isArray(current) ? current : [current];
    if (!quicks) return children || null;
    return React.createElement("div", {
      className: datepickerClass('quick-select')
    }, quicks.map(function (q) {
      return React.createElement("div", {
        onClick: _this.handleQuick.bind(_this, q),
        className: datepickerClass('quick-select-item', _this.compareDate(q.value, currentArray) && 'quick-select-item-active'),
        key: q.name
      }, q.name);
    }));
  };

  return Quick;
}(React.Component);

export { Quick as default };
Quick.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  quicks: PropTypes.array,
  current: PropTypes.any,
  children: PropTypes.node,
  timeZone: PropTypes.string
};