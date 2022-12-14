"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("./utils");

var Grid =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Grid, _PureComponent);

  function Grid() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Grid.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        _this$props$width = _this$props.width,
        width = _this$props$width === void 0 ? 1 : _this$props$width,
        offset = _this$props.offset,
        responsive = _this$props.responsive,
        stretch = _this$props.stretch,
        children = _this$props.children,
        gutter = _this$props.gutter,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["width", "offset", "responsive", "stretch", "children", "gutter"]);
    var autoCount = 0;
    var settleWidth = 0;

    _react.Children.toArray(children).forEach(function (child) {
      if (child.type && child.type.isGrid) {
        if (child.props.width) settleWidth += child.props.width;else autoCount += 1;
      }
    });

    var autoWidth = autoCount > 0 ? (1 - settleWidth) / autoCount : 0;
    var className = (0, _classnames.default)(this.props.className, (0, _utils.getGrid)({
      width: width,
      offset: offset,
      responsive: responsive
    }));
    var style = Object.assign({}, this.props.style);

    if (gutter && gutter > 0) {
      style.width = 'auto';
      style.display = 'block';
      style.marginLeft = 0 - gutter / 2 + "px";
      style.marginRight = 0 - gutter / 2 + "px";
    }

    return _react.default.createElement("div", (0, _extends2.default)({}, other, {
      style: style,
      className: className
    }), _react.Children.toArray(children).map(function (child) {
      if (child.type && child.type.isGrid) {
        var pps = {
          style: Object.assign({}, child.props.style)
        };
        if (!child.props.width) pps.width = autoWidth;
        if (stretch) pps.style = (0, _objectSpread2.default)({}, pps.style, {
          minHeight: '100%',
          height: '100%'
        });

        if (gutter && gutter > 0) {
          pps.style = (0, _objectSpread2.default)({}, pps.style, {
            paddingLeft: gutter / 2,
            paddingRight: gutter / 2
          });
        }

        return (0, _react.cloneElement)(child, pps);
      }

      return child;
    }));
  };

  return Grid;
}(_react.PureComponent);

exports.default = Grid;
(0, _defineProperty2.default)(Grid, "isGrid", true);
(0, _defineProperty2.default)(Grid, "displayName", 'ShineoutGrid');
(0, _defineProperty2.default)(Grid, "propTypes", {
  children: _propTypes.default.any,
  className: _propTypes.default.string,
  gutter: _propTypes.default.number,
  offset: _propTypes.default.number,
  responsive: _propTypes.default.oneOf(['sm', 'md', 'lg', 'xl']),
  stretch: _propTypes.default.bool,
  style: _propTypes.default.object,
  width: _propTypes.default.number
});