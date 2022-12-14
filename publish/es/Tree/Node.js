import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PureComponent } from '../component';
import { getProps } from '../utils/proptypes';
import { isFunc, isString } from '../utils/is';
import { treeClass } from './styles';
import Content from './Content';
import { getDirectionClass } from '../utils/classname';
var placeElement = document.createElement('div');
placeElement.className = treeClass('drag-place');
var innerPlaceElement = document.createElement('div');
placeElement.appendChild(innerPlaceElement);
var placeInfo = {};
var isDragging = false;

var Node =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Node, _PureComponent);

  function Node(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    var _props$bindNode = props.bindNode(props.id, _this.update.bind(_assertThisInitialized(_assertThisInitialized(_this)))),
        active = _props$bindNode.active,
        expanded = _props$bindNode.expanded;

    _this.state = {
      active: active,
      expanded: expanded,
      fetching: false
    };
    _this.bindElement = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleDragStart = _this.handleDragStart.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleDragOver = _this.handleDragOver.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleDragEnd = _this.handleDragEnd.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setFetching = _this.setFetching.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.isLeaf = _this.isLeaf.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Node.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    this.props.unbindNode(this.props.id);
  };

  _proto.setFetching = function setFetching(fetching) {
    this.setState({
      fetching: fetching
    });
  };

  _proto.update = function update(key, value) {
    var _this$setState;

    if (this.state[key] !== value) this.setState((_this$setState = {}, _this$setState[key] = value, _this$setState));
  };

  _proto.bindElement = function bindElement(el) {
    this.element = el;
  };

  _proto.isLeaf = function isLeaf() {
    var _this$props = this.props,
        childrenKey = _this$props.childrenKey,
        data = _this$props.data,
        loader = _this$props.loader;
    var fetching = this.state.fetching;
    var children = data[childrenKey];
    if (children && children.length > 0) return false;
    if (Array.isArray(children) || children === null) return true;
    if (fetching && !children) return false;
    if (loader && !fetching) return false;
    return true;
  };

  _proto.handleToggle = function handleToggle() {
    var _this$props2 = this.props,
        id = _this$props2.id,
        onToggle = _this$props2.onToggle; // eslint-disable-next-line

    var expanded = !this.state.expanded;
    this.setState({
      expanded: expanded
    });
    if (onToggle) onToggle(id, expanded);
  };

  _proto.handleDragStart = function handleDragStart(event) {
    var _this2 = this;

    var _this$props3 = this.props,
        dragImageSelector = _this$props3.dragImageSelector,
        dragImageStyle = _this$props3.dragImageStyle,
        data = _this$props3.data,
        index = _this$props3.index;
    if (isDragging) return;
    isDragging = true;
    event.dataTransfer.effectAllowed = 'copyMove';
    event.dataTransfer.setData('text/plain', this.props.id);
    placeInfo.start = this.props.id;
    placeElement.setAttribute('data-start-index', index);
    var element = document.querySelector(dragImageSelector(data));
    var dragImage = element || this.element.querySelector("." + treeClass('content'));
    var rect = dragImage.getBoundingClientRect();
    this.dragImage = dragImage.cloneNode(true);
    document.body.appendChild(this.dragImage);
    this.dragImage.style.position = 'absolute';
    this.dragImage.style.top = '-1000px';
    this.dragImage.style.left = '-1000px';
    this.dragImage.style.width = rect.width + "px";
    this.dragImage.style.background = '#fff';
    this.dragImage.style.boxShadow = '0 0 5px 0 rgba(0, 0, 0, 0.1)';

    if (dragImageStyle) {
      Object.keys(dragImageStyle).forEach(function (k) {
        _this2.dragImage.style[k] = dragImageStyle[k];
      });
    }

    event.dataTransfer.setDragImage(this.dragImage, event.clientX - rect.left, event.clientY - rect.top);
    setTimeout(function () {
      _this2.element.style.display = 'none';
    }, 0);
  };

  _proto.handleDragOver = function handleDragOver(e) {
    if (!isDragging) return;
    var _this$props4 = this.props,
        dragHoverExpand = _this$props4.dragHoverExpand,
        datum = _this$props4.datum,
        dragSibling = _this$props4.dragSibling;
    var startId = placeInfo.start; // const startIndex = parseInt(placeElement.getAttribute('data-start-index'), 10)

    var current = datum.getPath(startId);
    var target = datum.getPath(this.props.id);
    var currentPathStr = current.path.join('/');
    var targetPathStr = target.path.join('/');
    if (dragSibling && targetPathStr !== currentPathStr) return;
    if (dragHoverExpand && !this.state.expanded) this.handleToggle();
    var hover = this.element;
    var rect = hover.getBoundingClientRect();
    var clientHeight = e.target.getBoundingClientRect().height || 20;
    var hoverMiddleY = (rect.bottom - rect.top) / 2;
    var hoverClientY = e.clientY - rect.top;
    var position = this.props.index;
    innerPlaceElement.style.height = '0px';

    if (hoverClientY < hoverMiddleY + clientHeight * 0.2) {
      hover.parentNode.insertBefore(placeElement, hover);

      if (hoverClientY > clientHeight * 0.3) {
        if (!dragSibling) {
          position = -1;
          innerPlaceElement.style.height = rect.height + "px";
        } else {
          position += 1;
          hover.parentNode.insertBefore(placeElement, hover.nextElementSibling);
        }
      }
    } else {
      position += 1;
      hover.parentNode.insertBefore(placeElement, hover.nextElementSibling);
    } // if (position !== -1 && currentPathStr === targetPathStr && startIndex <= index) {
    //   position -= 1
    // }


    placeInfo.target = this.props.id;
    placeElement.setAttribute('data-position', position);
  };

  _proto.handleDragEnd = function handleDragEnd() {
    this.element.style.display = '';
    if (!isDragging) return;
    isDragging = false;
    if (!placeElement.parentNode) return;
    document.body.removeChild(this.dragImage);
    var _this$props5 = this.props,
        id = _this$props5.id,
        index = _this$props5.index,
        onDrop = _this$props5.onDrop;
    var position = parseInt(placeElement.getAttribute('data-position'), 10);
    var target = placeInfo.target;
    placeElement.parentNode.removeChild(placeElement);

    if (target !== id || index !== position) {
      onDrop(id, target, position);
    }
  };

  _proto.render = function render() {
    var _this$props6 = this.props,
        data = _this$props6.data,
        expandedMap = _this$props6.expandedMap,
        listComponent = _this$props6.listComponent,
        onDrop = _this$props6.onDrop,
        childrenClass = _this$props6.childrenClass,
        leafClass = _this$props6.leafClass,
        nodeClass = _this$props6.nodeClass,
        other = _objectWithoutPropertiesLoose(_this$props6, ["data", "expandedMap", "listComponent", "onDrop", "childrenClass", "leafClass", "nodeClass"]);

    var children = data[other.childrenKey];
    var hasChildren = children && children.length > 0;
    var _this$state = this.state,
        expanded = _this$state.expanded,
        fetching = _this$state.fetching;

    var listProps = _objectSpread({}, other, {
      data: children,
      expanded: expanded,
      expandedMap: expandedMap,
      onDrop: onDrop,
      leafClass: leafClass,
      childrenClass: childrenClass,
      nodeClass: nodeClass,
      childrenClassName: childrenClass(data)
    });

    var wrapProps = {};

    if (onDrop) {
      Object.assign(wrapProps, {
        draggable: true,
        onDragStart: this.handleDragStart,
        onDragEnd: this.handleDragEnd
      });
    } // node className


    var nodeClassName = null;

    if (isString(nodeClass)) {
      nodeClassName = nodeClass;
    } else if (isFunc(nodeClass)) {
      nodeClassName = nodeClass(data);
    }

    return React.createElement("div", _extends({}, wrapProps, {
      ref: this.bindElement,
      className: classnames(treeClass(getDirectionClass('node')), this.isLeaf() && leafClass(data), nodeClassName)
    }), React.createElement(Content, _extends({}, other, {
      active: this.state.active,
      data: data,
      expanded: expanded,
      onToggle: this.handleToggle,
      onDragOver: this.handleDragOver,
      setFetching: this.setFetching,
      fetching: fetching
    })), hasChildren && createElement(listComponent, listProps));
  };

  return Node;
}(PureComponent);

Node.propTypes = _objectSpread({}, getProps(PropTypes), {
  bindNode: PropTypes.func.isRequired,
  unbindNode: PropTypes.func.isRequired,
  data: PropTypes.object,
  index: PropTypes.number,
  listComponent: PropTypes.func,
  keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  onDrop: PropTypes.func,
  nodeClass: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  handleDragoverAble: PropTypes.func,
  dragSibling: PropTypes.bool
});
export default Node;