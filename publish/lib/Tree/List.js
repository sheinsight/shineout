"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("./styles");

var _func = require("../utils/func");

var _Node = _interopRequireDefault(require("./Node"));

var List =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(List, _PureComponent);

  function List(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.bindLines = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'lines');
    _this.bindElement = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'element');
    _this.renderNode = _this.renderNode.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = List.prototype;

  _proto.getKey = function getKey(data, index) {
    var _this$props = this.props,
        id = _this$props.id,
        keygen = _this$props.keygen;
    if (typeof keygen === 'function') return keygen(data, id);
    if (keygen) return data[keygen];
    return id + (id ? ',' : '') + index;
  };

  _proto.bindElement = function bindElement(name, el) {
    this[name] = el;
  };

  _proto.renderNode = function renderNode(child, index) {
    var _this$props2 = this.props,
        data = _this$props2.data,
        isRoot = _this$props2.isRoot,
        expanded = _this$props2.expanded,
        keygen = _this$props2.keygen,
        line = _this$props2.line,
        className = _this$props2.className,
        style = _this$props2.style,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["data", "isRoot", "expanded", "keygen", "line", "className", "style"]);
    var id = this.getKey(child, index);
    return _react.default.createElement(_Node.default, (0, _extends2.default)({}, other, {
      data: child,
      id: id,
      index: index,
      key: id,
      line: line,
      keygen: keygen,
      listComponent: List
    }));
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        data = _this$props3.data,
        expanded = _this$props3.expanded,
        className = _this$props3.className,
        style = _this$props3.style,
        childrenClassName = _this$props3.childrenClassName;
    if (!expanded && !this.hasExpanded) return null;
    this.hasExpanded = true;
    var newStyle = Object.assign({}, style, {
      display: expanded ? 'block' : 'none'
    });
    return _react.default.createElement("div", {
      className: (0, _classnames.default)(className, childrenClassName),
      ref: this.bindElement,
      onDrop: _func.empty,
      onDragOver: _func.empty,
      style: newStyle
    }, data.map(this.renderNode));
  };

  return List;
}(_react.PureComponent);

List.propTypes = {
  className: _propTypes.default.string,
  data: _propTypes.default.array,
  expanded: _propTypes.default.bool,
  id: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  isRoot: _propTypes.default.bool,
  keygen: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]).isRequired,
  line: _propTypes.default.bool,
  setLine: _propTypes.default.func,
  style: _propTypes.default.object,
  childrenClassName: _propTypes.default.string
};
List.defaultProps = {
  id: '',
  line: true,
  className: (0, _styles.treeClass)('children')
};
var _default = List;
exports.default = _default;