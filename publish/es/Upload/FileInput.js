import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
var inputStyle = {
  display: 'none'
};

var FileInput =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(FileInput, _PureComponent);

  function FileInput(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.locked = false;
    _this.bindElement = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = FileInput.prototype;

  _proto.bindElement = function bindElement(el) {
    this.input = el;
  };

  _proto.click = function click() {
    var _this2 = this;

    if (this.locked) return;
    this.locked = true;
    this.input.value = '';
    this.input.click();
    setTimeout(function () {
      _this2.locked = false;
    }, 1000);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        accept = _this$props.accept,
        onChange = _this$props.onChange,
        multiple = _this$props.multiple,
        webkitdirectory = _this$props.webkitdirectory;
    return React.createElement("input", {
      ref: this.bindElement,
      accept: accept,
      multiple: multiple,
      onChange: onChange,
      style: inputStyle,
      webkitdirectory: webkitdirectory,
      type: "file"
    });
  };

  return FileInput;
}(PureComponent);

FileInput.propTypes = {
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  webkitdirectory: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};
export default FileInput;