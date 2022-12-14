"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _component = require("../component");

var _styles = require("./styles");

var _Drop = _interopRequireDefault(require("./Drop"));

var _utils = require("../utils");

// obsolete code
var Dragger =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Dragger, _PureComponent);

  function Dragger(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleDrop = _this.handleDrop.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Dragger.prototype;

  _proto.getMatchedFile = function getMatchedFile(files) {
    if (files === void 0) {
      files = [];
    }

    var accept = this.props.accept;
    return Array.prototype.slice.call(files).filter(function (file) {
      return (0, _utils.accept)(file, accept);
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
    return _react.default.createElement(_Drop.default, {
      className: (0, _styles.uploadClass)('dragger-wrapper'),
      drop: true,
      disabled: disabled,
      multiple: multiple || limit > 1,
      accept: accept,
      onDrop: this.handleDrop
    }, _react.default.createElement("div", {
      className: (0, _styles.uploadClass)('dragger-area', disabled && 'disabled')
    }, children));
  };

  return Dragger;
}(_component.PureComponent);

Dragger.propTypes = {
  children: _propTypes.default.any,
  multiple: _propTypes.default.bool,
  addFile: _propTypes.default.func,
  accept: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  limit: _propTypes.default.number
};
var _default = Dragger;
exports.default = _default;