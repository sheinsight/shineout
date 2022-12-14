"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _proptypes = require("../utils/proptypes");

var _styles = require("./styles");

// Use Component cause stateless Element can't use ref
// eslint-disable-next-line
var List =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(List, _Component);

  function List() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = List.prototype;

  _proto.render = function render() {
    var className = (0, _classnames.default)((0, _styles.listClass)('_'), this.props.className);
    var _this$props = this.props,
        show = _this$props.show,
        getRef = _this$props.getRef,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["show", "getRef"]);
    return _react.default.createElement("div", (0, _extends2.default)({
      ref: getRef
    }, props, {
      className: className,
      style: this.props.style
    }));
  };

  return List;
}(_react.Component);

List.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default), {
  show: _propTypes.default.bool
});
List.defaultProps = (0, _objectSpread2.default)({}, _proptypes.defaultProps, {
  show: false
});
List.displayName = 'List';
var _default = List;
exports.default = _default;