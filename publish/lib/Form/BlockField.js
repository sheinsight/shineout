"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Block = _interopRequireDefault(require("./Block"));

var BlockField =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(BlockField, _PureComponent);

  function BlockField(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    console.warn('Form.BlockField is not recommend. Use Form.FieldSet instead.');
    return _this;
  }

  var _proto = BlockField.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["children"]);
    return _react.default.createElement(_Block.default, other, children);
  };

  return BlockField;
}(_react.PureComponent);

BlockField.propTypes = {
  children: _propTypes.default.any,
  onChange: _propTypes.default.func.isRequired,
  value: _propTypes.default.any
};
var _default = BlockField;
exports.default = _default;