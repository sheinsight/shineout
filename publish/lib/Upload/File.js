"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("./styles");

var _Progress = _interopRequireDefault(require("../Progress"));

var _Spin = _interopRequireDefault(require("../Spin"));

var _icons = _interopRequireDefault(require("../icons"));

var _request = require("./request");

var _classname = require("../utils/classname");

var SPIN = _react.default.createElement("span", {
  style: {
    display: 'inline-block',
    marginRight: 8
  }
}, _react.default.createElement(_Spin.default, {
  size: 10,
  name: "ring"
}));

var File =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(File, _PureComponent);

  function File(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleRemove = _this.handleRemove.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = File.prototype;

  _proto.handleRemove = function handleRemove() {
    this.props.onRemove(this.props.id);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        message = _this$props.message,
        name = _this$props.name,
        status = _this$props.status,
        process = _this$props.process;
    var className = (0, _styles.uploadClass)('view-file', status === _request.ERROR && 'error');
    return _react.default.createElement("div", {
      className: className
    }, _react.default.createElement("div", {
      className: (0, _styles.uploadClass)((0, _classname.getDirectionClass)('text'))
    }, status === _request.UPLOADING && SPIN, " ", name, " ", message && _react.default.createElement("span", null, "(", message, ") ")), _react.default.createElement("a", {
      className: (0, _styles.uploadClass)('delete'),
      onClick: this.handleRemove
    }, _icons.default.Close), status !== _request.ERROR && _react.default.createElement(_Progress.default, {
      className: (0, _styles.uploadClass)('progress'),
      background: process >= 0 ? '#e9ecef' : 'transparent',
      value: process,
      strokeWidth: 2
    }));
  };

  return File;
}(_react.PureComponent);

File.propTypes = {
  id: _propTypes.default.string,
  message: _propTypes.default.string,
  name: _propTypes.default.string,
  onRemove: _propTypes.default.func,
  process: _propTypes.default.number,
  status: _propTypes.default.number
};
var _default = File;
exports.default = _default;