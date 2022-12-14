import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { treeClass } from './styles';
import { empty } from '../utils/func';
import Node from './Node';

var List =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(List, _PureComponent);

  function List(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.bindLines = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'lines');
    _this.bindElement = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'element');
    _this.renderNode = _this.renderNode.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
        other = _objectWithoutPropertiesLoose(_this$props2, ["data", "isRoot", "expanded", "keygen", "line", "className", "style"]);

    var id = this.getKey(child, index);
    return React.createElement(Node, _extends({}, other, {
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
    return React.createElement("div", {
      className: classnames(className, childrenClassName),
      ref: this.bindElement,
      onDrop: empty,
      onDragOver: empty,
      style: newStyle
    }, data.map(this.renderNode));
  };

  return List;
}(PureComponent);

List.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  expanded: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isRoot: PropTypes.bool,
  keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  line: PropTypes.bool,
  setLine: PropTypes.func,
  style: PropTypes.object,
  childrenClassName: PropTypes.string
};
List.defaultProps = {
  id: '',
  line: true,
  className: treeClass('children')
};
export default List;