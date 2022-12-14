import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Progress from '../Progress';
import { uploadClass } from './styles';
import Image from '../Image';
import { ERROR } from './request';

var ImageFile =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(ImageFile, _PureComponent);

  function ImageFile(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleRemove = _this.handleRemove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = ImageFile.prototype;

  _proto.handleRemove = function handleRemove() {
    this.props.onRemove(this.props.id);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        process = _this$props.process,
        status = _this$props.status,
        style = _this$props.style,
        data = _this$props.data,
        message = _this$props.message;
    var className = uploadClass('image-item', status === ERROR && 'error');
    return React.createElement("div", {
      style: style,
      className: className
    }, data && React.createElement(Image, {
      src: data,
      fit: "center",
      width: "auto",
      height: 0,
      className: uploadClass('image-bg')
    }), message && React.createElement("div", {
      className: uploadClass('message')
    }, message), React.createElement("span", {
      className: uploadClass('delete'),
      onClick: this.handleRemove
    }), React.createElement("div", {
      className: uploadClass('progress-bg')
    }, React.createElement(Progress, {
      className: uploadClass('progress'),
      color: "#f2f2f2",
      background: "rgba(0,0,0,0.5)",
      value: process,
      strokeWidth: 2
    })));
  };

  return ImageFile;
}(PureComponent);

ImageFile.propTypes = {
  id: PropTypes.string,
  message: PropTypes.string,
  onRemove: PropTypes.func,
  process: PropTypes.number,
  status: PropTypes.number,
  style: PropTypes.object,
  data: PropTypes.string
};
export default ImageFile;