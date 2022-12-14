"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var inputStyle = {
  display: 'none'
};

var FileInput =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(FileInput, _PureComponent);

  function FileInput(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.locked = false;
    _this.bindElement = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
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
    return _react.default.createElement("input", {
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
}(_react.PureComponent);

FileInput.propTypes = {
  accept: _propTypes.default.string,
  multiple: _propTypes.default.bool,
  onChange: _propTypes.default.func.isRequired,
  webkitdirectory: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string])
};
var _default = FileInput;
exports.default = _default;