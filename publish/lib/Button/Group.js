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

var _config = require("../config");

var ButtonGroup =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(ButtonGroup, _PureComponent);

  function ButtonGroup() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = ButtonGroup.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        outline = _this$props.outline,
        size = _this$props.size,
        type = _this$props.type;
    var typeSetted = type !== 'default';
    var className = (0, _classnames.default)((0, _styles.buttonClass)('group', (outline || !typeSetted) && 'outline', (0, _config.isRTL)() && 'group-rtl'), this.props.className);
    return _react.default.createElement("div", {
      className: className
    }, _react.Children.toArray(children).map(function (child) {
      return (0, _react.cloneElement)(child, {
        size: size,
        outline: outline,
        type: typeSetted ? type : child.props.type
      });
    }));
  };

  return ButtonGroup;
}(_react.PureComponent);

ButtonGroup.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'size'), {
  children: _propTypes.default.any.isRequired,
  outline: _propTypes.default.bool,
  type: _propTypes.default.string
});
ButtonGroup.defaultProps = {
  outline: false,
  type: 'default'
};
var _default = ButtonGroup;
exports.default = _default;