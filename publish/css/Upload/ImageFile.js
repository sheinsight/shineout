"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Progress = _interopRequireDefault(require("../Progress"));

var _styles = require("./styles");

var _Image = _interopRequireDefault(require("../Image"));

var _request = require("./request");

var ImageFile =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(ImageFile, _PureComponent);

  function ImageFile(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleRemove = _this.handleRemove.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
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
    var className = (0, _styles.uploadClass)('image-item', status === _request.ERROR && 'error');
    return _react.default.createElement("div", {
      style: style,
      className: className
    }, data && _react.default.createElement(_Image.default, {
      src: data,
      fit: "center",
      width: "auto",
      height: 0,
      className: (0, _styles.uploadClass)('image-bg')
    }), message && _react.default.createElement("div", {
      className: (0, _styles.uploadClass)('message')
    }, message), _react.default.createElement("span", {
      className: (0, _styles.uploadClass)('delete'),
      onClick: this.handleRemove
    }), _react.default.createElement("div", {
      className: (0, _styles.uploadClass)('progress-bg')
    }, _react.default.createElement(_Progress.default, {
      className: (0, _styles.uploadClass)('progress'),
      color: "#f2f2f2",
      background: "rgba(0,0,0,0.5)",
      value: process,
      strokeWidth: 2
    })));
  };

  return ImageFile;
}(_react.PureComponent);

ImageFile.propTypes = {
  id: _propTypes.default.string,
  message: _propTypes.default.string,
  onRemove: _propTypes.default.func,
  process: _propTypes.default.number,
  status: _propTypes.default.number,
  style: _propTypes.default.object,
  data: _propTypes.default.string
};
var _default = ImageFile;
exports.default = _default;