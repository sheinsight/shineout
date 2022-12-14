import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
// obsolete code
import React from 'react';
import PropTypes from 'prop-types';
import { PureComponent } from '../component';
import { uploadClass } from './styles';
import Drop from './Drop';
import { accept as attrAccept } from '../utils';

var Dragger =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Dragger, _PureComponent);

  function Dragger(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleDrop = _this.handleDrop.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Dragger.prototype;

  _proto.getMatchedFile = function getMatchedFile(files) {
    if (files === void 0) {
      files = [];
    }

    var accept = this.props.accept;
    return Array.prototype.slice.call(files).filter(function (file) {
      return attrAccept(file, accept);
    });
  };

  _proto.handleDrop = function handleDrop(files) {
    var addFile = this.props.addFile;
    addFile({
      files: files,
      fromDragger: true
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        disabled = _this$props.disabled,
        multiple = _this$props.multiple,
        limit = _this$props.limit,
        accept = _this$props.accept;
    return React.createElement(Drop, {
      className: uploadClass('dragger-wrapper'),
      drop: true,
      disabled: disabled,
      multiple: multiple || limit > 1,
      accept: accept,
      onDrop: this.handleDrop
    }, React.createElement("div", {
      className: uploadClass('dragger-area', disabled && 'disabled')
    }, children));
  };

  return Dragger;
}(PureComponent);

Dragger.propTypes = {
  children: PropTypes.any,
  multiple: PropTypes.bool,
  addFile: PropTypes.func,
  accept: PropTypes.string,
  disabled: PropTypes.bool,
  limit: PropTypes.number
};
export default Dragger;