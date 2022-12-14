"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("./styles");

var _component = require("../component");

var _context = require("./context");

var CardGroup =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(CardGroup, _PureComponent);

  function CardGroup(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      scroller: undefined
    };
    _this.bindScroller = _this.bindScroller.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = CardGroup.prototype;

  _proto.getGap = function getGap() {
    var _this$props = this.props,
        gap = _this$props.gap,
        gutter = _this$props.gutter;
    if (gutter !== undefined) return gutter;
    return gap;
  };

  _proto.bindScroller = function bindScroller(ref) {
    var scroller = this.state.scroller;
    if (scroller || !ref) return;
    this.setState({
      scroller: ref
    });
  };

  _proto.renderBody = function renderBody() {
    var _this$props2 = this.props,
        cardWidth = _this$props2.cardWidth,
        columns = _this$props2.columns,
        children = _this$props2.children,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["cardWidth", "columns", "children"]);
    var scroller = this.state.scroller;
    if (!children) return children;
    var gap = this.getGap();
    var context = {
      container: scroller
    };
    var gridStyle = (0, _objectSpread2.default)({
      gridRowGap: gap,
      gridColumnGap: gap
    }, other.gridStyle, {
      gridTemplateColumns: cardWidth !== undefined ? "repeat(auto-fill, minmax(" + cardWidth + "px, 1fr))" : "repeat(" + columns + ", 1fr)"
    });
    return _react.default.createElement(_context.Provider, {
      value: context
    }, _react.default.createElement("div", {
      className: (0, _styles.cardGroupClass)('scroller'),
      ref: this.bindScroller
    }, _react.default.createElement("div", {
      style: gridStyle,
      className: (0, _styles.cardGroupClass)('grid')
    }, scroller && children)));
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        height = _this$props3.height,
        style = _this$props3.style,
        className = _this$props3.className;
    var cls = (0, _classnames.default)((0, _styles.cardGroupClass)('_'), className);
    var groupStyle = (0, _objectSpread2.default)({
      height: height
    }, style);
    return _react.default.createElement("div", {
      style: groupStyle,
      className: cls
    }, this.renderBody());
  };

  return CardGroup;
}(_component.PureComponent);

CardGroup.defaultProps = {
  columns: 3,
  gap: 16
};
CardGroup.propTypes = {
  style: _propTypes.default.object,
  children: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.node]),
  className: _propTypes.default.string,
  height: _propTypes.default.number,
  cardWidth: _propTypes.default.number,
  columns: _propTypes.default.number,
  gridStyle: _propTypes.default.object,
  gap: _propTypes.default.number,
  gutter: _propTypes.default.number
};
var _default = CardGroup;
exports.default = _default;