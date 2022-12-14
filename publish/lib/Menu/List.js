"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _uid = require("../utils/uid");

var _styles = require("./styles");

var _Item = _interopRequireDefault(require("./Item"));

var List =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(List, _PureComponent);

  function List() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = List.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        data = _this$props.data,
        level = _this$props.level,
        keygen = _this$props.keygen,
        mode = _this$props.mode,
        renderItem = _this$props.renderItem,
        style = _this$props.style,
        bottomLine = _this$props.bottomLine,
        topLine = _this$props.topLine,
        onClick = _this$props.onClick,
        path = _this$props.path,
        inlineIndent = _this$props.inlineIndent,
        disabled = _this$props.disabled,
        toggleOpenKeys = _this$props.toggleOpenKeys,
        linkKey = _this$props.linkKey,
        toggleDuration = _this$props.toggleDuration,
        frontCaret = _this$props.frontCaret,
        looseChildren = _this$props.looseChildren,
        parentSelectable = _this$props.parentSelectable,
        frontCaretType = _this$props.frontCaretType,
        caretColor = _this$props.caretColor;
    var isVertical = mode.indexOf('vertical') === 0;
    var className = (0, _classnames.default)((0, _styles.menuClass)('list', isVertical ? 'vertical' : mode), this.props.className);
    return _react.default.createElement("ul", {
      className: className,
      style: style
    }, data.map(function (d, i) {
      return _react.default.createElement(_Item.default, {
        bottomLine: bottomLine,
        topLine: topLine,
        disabled: disabled,
        key: (0, _uid.getKey)(d, keygen, i),
        index: i,
        keygen: keygen,
        data: d,
        renderItem: renderItem,
        inlineIndent: inlineIndent,
        level: level,
        mode: mode,
        onClick: onClick,
        path: path,
        toggleOpenKeys: toggleOpenKeys,
        linkKey: linkKey,
        toggleDuration: toggleDuration,
        frontCaret: frontCaret,
        frontCaretType: frontCaretType,
        caretColor: caretColor,
        looseChildren: looseChildren,
        parentSelectable: parentSelectable
      });
    }));
  };

  return List;
}(_react.PureComponent);

List.propTypes = {
  bottomLine: _propTypes.default.number,
  topLine: _propTypes.default.number,
  className: _propTypes.default.string,
  disabled: _propTypes.default.func,
  inlineIndent: _propTypes.default.number,
  keygen: _propTypes.default.any,
  level: _propTypes.default.number,
  data: _propTypes.default.array,
  mode: _propTypes.default.string,
  onClick: _propTypes.default.func,
  path: _propTypes.default.string,
  renderItem: _propTypes.default.func,
  style: _propTypes.default.object,
  toggleOpenKeys: _propTypes.default.func,
  linkKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  toggleDuration: _propTypes.default.number,
  frontCaret: _propTypes.default.bool,
  looseChildren: _propTypes.default.bool,
  parentSelectable: _propTypes.default.bool,
  frontCaretType: _propTypes.default.oneOf(['hollow', 'solid']),
  caretColor: _propTypes.default.string
};
var _default = List;
exports.default = _default;