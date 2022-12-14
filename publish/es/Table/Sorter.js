import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { tableClass } from './styles';

var Sorter =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Sorter, _PureComponent);

  function Sorter(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleAsc = _this.handleAsc.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleDesc = _this.handleDesc.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Sorter.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.defaultSorterOrder();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.defaultSorterOrder();
  };

  _proto.defaultSorterOrder = function defaultSorterOrder() {
    var _this$props = this.props,
        defaultOrder = _this$props.defaultOrder,
        current = _this$props.current,
        index = _this$props.index;
    if (current.length !== 1) return;
    var item = current[0];
    var changed = index === item.index && defaultOrder === item.order;
    if (defaultOrder && !changed && !item.manual) this.handleChange(defaultOrder, false);
  };

  _proto.handleChange = function handleChange(order, manual) {
    if (manual === void 0) {
      manual = true;
    }

    var _this$props2 = this.props,
        sorter = _this$props2.sorter,
        index = _this$props2.index,
        onChange = _this$props2.onChange,
        current = _this$props2.current;
    var item = current.find(function (v) {
      return v.index === index;
    });
    var isCancel = !!item && order === item.order;
    var finalOrder = isCancel ? undefined : order;
    onChange(finalOrder, sorter, index, order, manual);
  };

  _proto.handleAsc = function handleAsc() {
    this.handleChange('asc');
  };

  _proto.handleDesc = function handleDesc() {
    this.handleChange('desc');
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        current = _this$props3.current,
        index = _this$props3.index,
        renderSorter = _this$props3.renderSorter;
    var item = current.find(function (v) {
      return v.index === index;
    });
    var active = !!item;
    var isCustomRender = renderSorter && typeof renderSorter === 'function';
    return React.createElement("div", {
      className: tableClass('sorter-container')
    }, isCustomRender ? renderSorter({
      status: active && item.order,
      triggerAsc: this.handleAsc,
      triggerDesc: this.handleDesc
    }) : React.createElement(React.Fragment, null, React.createElement("a", {
      key: "asc",
      className: tableClass(active && item.order === 'asc' && 'sorter-active', 'sorter-asc'),
      onClick: this.handleAsc
    }, "\xA0"), React.createElement("a", {
      key: "desc",
      className: tableClass(active && item.order === 'desc' && 'sorter-active', 'sorter-desc'),
      onClick: this.handleDesc
    }, "\xA0")));
  };

  return Sorter;
}(PureComponent);

Sorter.propTypes = {
  current: PropTypes.array,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  sorter: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]).isRequired,
  defaultOrder: PropTypes.oneOf(['desc', 'asc']),
  renderSorter: PropTypes.func
};
export default Sorter;