"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("./styles");

var Sorter =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Sorter, _PureComponent);

  function Sorter(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleAsc = _this.handleAsc.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleDesc = _this.handleDesc.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
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
    return _react.default.createElement("div", {
      className: (0, _styles.tableClass)('sorter-container')
    }, isCustomRender ? renderSorter({
      status: active && item.order,
      triggerAsc: this.handleAsc,
      triggerDesc: this.handleDesc
    }) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("a", {
      key: "asc",
      className: (0, _styles.tableClass)(active && item.order === 'asc' && 'sorter-active', 'sorter-asc'),
      onClick: this.handleAsc
    }, "\xA0"), _react.default.createElement("a", {
      key: "desc",
      className: (0, _styles.tableClass)(active && item.order === 'desc' && 'sorter-active', 'sorter-desc'),
      onClick: this.handleDesc
    }, "\xA0")));
  };

  return Sorter;
}(_react.PureComponent);

Sorter.propTypes = {
  current: _propTypes.default.array,
  index: _propTypes.default.number.isRequired,
  onChange: _propTypes.default.func.isRequired,
  sorter: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string, _propTypes.default.object]).isRequired,
  defaultOrder: _propTypes.default.oneOf(['desc', 'asc']),
  renderSorter: _propTypes.default.func
};
var _default = Sorter;
exports.default = _default;