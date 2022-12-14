"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("./styles");

var _utils = require("../utils");

var Drop =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Drop, _React$Component);

  function Drop(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      drop: false
    };
    _this.handleDrag = _this.handleDrag.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleFileDrop = _this.handleFileDrop.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
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
      return (0, _utils.accept)(f, accept);
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
    return _react.default.createElement("span", {
      className: (0, _classnames.default)(className, (0, _styles.uploadClass)(drop && 'drop')),
      onDragOver: this.handleDrag,
      onDragLeave: this.handleDrag,
      onDrop: this.handleDrag
    }, children);
  };

  return Drop;
}(_react.default.Component);

exports.default = Drop;
(0, _defineProperty2.default)(Drop, "propTypes", {
  disabled: _propTypes.default.bool,
  accept: _propTypes.default.string,
  multiple: _propTypes.default.bool,
  onDrop: _propTypes.default.func,
  dropData: _propTypes.default.any,
  children: _propTypes.default.any,
  drop: _propTypes.default.bool,
  className: _propTypes.default.string
});
(0, _defineProperty2.default)(Drop, "defaultProps", {
  drop: false
});