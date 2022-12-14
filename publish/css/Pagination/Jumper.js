"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uid = require("../utils/uid");

var _styles = require("./styles");

var _Input = _interopRequireDefault(require("../Input"));

var _classname = require("../utils/classname");

var inputStyle = {
  width: 60,
  display: 'inline-block'
};

var nofunc = function nofunc() {};

var Jumper =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Jumper, _PureComponent);

  function Jumper(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleKeyDown = _this.handleKeyDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderRequire = (0, _uid.getUidStr)();
    return _this;
  }

  var _proto = Jumper.prototype;

  _proto.getMax = function getMax() {
    var _this$props = this.props,
        total = _this$props.total,
        pageSize = _this$props.pageSize;
    return Math.ceil(total / pageSize) || 1;
  };

  _proto.handleKeyDown = function handleKeyDown(e) {
    if (e.keyCode === 13) {
      var current = parseInt(e.target.value, 10);
      this.autoFocus = true;
      if (!Number.isFinite(current)) return;
      if (current < 1) current = 1;
      this.renderRequire = (0, _uid.getUidStr)();
      var max = this.getMax();
      if (current > max) current = max;

      if (current === this.props.current) {
        this.forceUpdate();
      }

      this.props.onChange(current);
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        current = _this$props2.current,
        text = _this$props2.text,
        size = _this$props2.size,
        isSimple = _this$props2.isSimple;
    var txt = text.jumper ? text.jumper.split('{input}') : [];

    if (isSimple) {
      var spanClass = (0, _styles.paginationClass)('simple-span');
      txt = [[], [_react.default.createElement("span", {
        key: "separator",
        className: spanClass
      }, "/"), _react.default.createElement("span", {
        key: "pageMax",
        className: spanClass
      }, this.getMax())]];
    }

    return _react.default.createElement("div", {
      className: (0, _styles.paginationClass)((0, _classname.getDirectionClass)('section'))
    }, txt[0] ? _react.default.createElement("span", null, txt[0]) : undefined, _react.default.createElement(_Input.default, {
      key: this.renderRequire,
      value: current,
      onChange: nofunc,
      autoFocus: this.autoFocus,
      onKeyDown: this.handleKeyDown,
      digits: 0,
      type: "number",
      style: inputStyle,
      size: size,
      className: (0, _styles.paginationClass)(isSimple && 'simple-input'),
      delay: 400
    }), txt[1] ? _react.default.createElement("span", null, txt[1]) : undefined);
  };

  return Jumper;
}(_react.PureComponent);

Jumper.propTypes = {
  current: _propTypes.default.number.isRequired,
  onChange: _propTypes.default.func.isRequired,
  pageSize: _propTypes.default.number.isRequired,
  text: _propTypes.default.object,
  total: _propTypes.default.number.isRequired,
  size: _propTypes.default.string,
  isSimple: _propTypes.default.bool
};
var _default = Jumper;
exports.default = _default;