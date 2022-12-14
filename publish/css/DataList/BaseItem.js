"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("./styles");

var _Meta = _interopRequireDefault(require("./Meta"));

var _Extra = _interopRequireDefault(require("./Extra"));

var BaseItem =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(BaseItem, _PureComponent);

  function BaseItem() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = BaseItem.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        extra = _this$props.extra,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "extra"]);
    if (!extra) return _react.default.createElement(_Meta.default, (0, _extends2.default)({}, props, {
      className: className
    }));
    return _react.default.createElement("div", {
      className: (0, _classnames.default)((0, _styles.listClass)('base'), className)
    }, _react.default.createElement(_Meta.default, this.props), _react.default.createElement(_Extra.default, {
      extra: extra
    }));
  };

  return BaseItem;
}(_react.PureComponent);

BaseItem.propTypes = {
  avatar: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node, _propTypes.default.func]),
  title: _propTypes.default.string,
  desc: _propTypes.default.string,
  content: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node, _propTypes.default.func]),
  className: _propTypes.default.string,
  extra: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.array])
};
var _default = BaseItem;
exports.default = _default;