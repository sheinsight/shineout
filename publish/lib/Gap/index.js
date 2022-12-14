"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _proptypes = require("../utils/proptypes");

var _styles = require("./styles");

var _support = _interopRequireDefault(require("./support"));

var flexGapSupport = (0, _support.default)();

var Gap =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Gap, _PureComponent);

  function Gap() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Gap.prototype;

  _proto.getStyle = function getStyle() {
    var _this$props = this.props,
        row = _this$props.row,
        column = _this$props.column,
        style = _this$props.style;
    var extendStyle = flexGapSupport ? {
      rowGap: row,
      columnGap: column
    } : {
      marginBottom: -row
    };
    return Object.assign({}, style, extendStyle);
  };

  _proto.getItemStyle = function getItemStyle(index) {
    var _this$props2 = this.props,
        row = _this$props2.row,
        column = _this$props2.column,
        itemStyle = _this$props2.itemStyle,
        children = _this$props2.children;
    if (flexGapSupport) return itemStyle;
    var isLast = _react.default.Children.count(children) - 1 === index;
    return Object.assign({}, itemStyle, {
      marginBottom: row
    }, !isLast && {
      marginRight: column
    });
  };

  _proto.render = function render() {
    var _this = this;

    var children = this.props.children;
    var className = (0, _classnames.default)((0, _styles.gapClass)('_'), this.props.className);
    return _react.default.createElement("div", {
      className: className,
      style: this.getStyle()
    }, _react.default.Children.map(children, function (child, index) {
      return child && _react.default.createElement("div", {
        className: (0, _styles.gapClass)('item'),
        style: _this.getItemStyle(index)
      }, child);
    }));
  };

  return Gap;
}(_react.PureComponent);

Gap.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default), {
  row: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  column: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  itemStyle: _propTypes.default.object
});
Gap.defaultProps = {
  row: 8,
  column: 8
};
var _default = Gap;
exports.default = _default;