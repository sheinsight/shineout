"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _events = _interopRequireDefault(require("./events"));

var _Image = require("./Image");

var _styles = require("./styles");

var Group =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Group, _PureComponent);

  function Group() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Group.prototype;

  _proto.handleClick = function handleClick(index) {
    var children = this.props.children;
    var images = [];
    var current = 0;

    _react.Children.toArray(children).forEach(function (child, i) {
      if (child && child.type && child.type.symbolType === _Image.IMAGE) {
        if (index === i) current = images.length;
        var _child$props = child.props,
            src = _child$props.src,
            href = _child$props.href;
        images.push({
          thumb: src,
          src: href || src,
          key: i
        });
      }
    });

    (0, _events.default)(images, current);
  };

  _proto.render = function render() {
    var _this = this;

    var _this$props = this.props,
        children = _this$props.children,
        pile = _this$props.pile,
        style = _this$props.style,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["children", "pile", "style"]);
    return _react.default.createElement("div", {
      className: (0, _styles.imageClass)('group', pile && 'pile'),
      style: style
    }, _react.Children.toArray(this.props.children).map(function (child, i) {
      return (0, _react.cloneElement)(child, (0, _objectSpread2.default)({}, props, {
        onClick: _this.handleClick.bind(_this, i)
      }));
    }));
  };

  return Group;
}(_react.PureComponent);

Group.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.array]),
  pile: _propTypes.default.bool,
  style: _propTypes.default.object
};
var _default = Group;
exports.default = _default;