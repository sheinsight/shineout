import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropType from 'prop-types';
import classnames from 'classnames';
import { uploadClass } from './styles';
import { accept as fileAccept } from '../utils';

var Drop =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Drop, _React$Component);

  function Drop(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      drop: false
    };
    _this.handleDrag = _this.handleDrag.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleFileDrop = _this.handleFileDrop.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Drop.prototype;

  _proto.handleFileDrop = function handleFileDrop(e) {
    var files = e.dataTransfer.files;
    var _this$props = this.props,
        accept = _this$props.accept,
        multiple = _this$props.multiple,
        onDrop = _this$props.onDrop,
        dropData = _this$props.dropData;
    var filter = accept ? Array.prototype.filter.call(files, function (f) {
      return fileAccept(f, accept);
    }) : files;
    if (!filter || filter.length === 0) return;
    if (onDrop) onDrop(multiple ? filter : [filter[0]], dropData);
  };

  _proto.handleDrag = function handleDrag(e) {
    var disabled = this.props.disabled;
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      drop: e.type === 'dragover'
    });
    if (e.type === 'drop') this.handleFileDrop(e);
  };

  _proto.render = function render() {
    var drop = this.state.drop;
    var _this$props2 = this.props,
        children = _this$props2.children,
        className = _this$props2.className;
    if (!this.props.drop) return children;
    return React.createElement("span", {
      className: classnames(className, uploadClass(drop && 'drop')),
      onDragOver: this.handleDrag,
      onDragLeave: this.handleDrag,
      onDrop: this.handleDrag
    }, children);
  };

  return Drop;
}(React.Component);

_defineProperty(Drop, "propTypes", {
  disabled: PropType.bool,
  accept: PropType.string,
  multiple: PropType.bool,
  onDrop: PropType.func,
  dropData: PropType.any,
  children: PropType.any,
  drop: PropType.bool,
  className: PropType.string
});

_defineProperty(Drop, "defaultProps", {
  drop: false
});

export { Drop as default };