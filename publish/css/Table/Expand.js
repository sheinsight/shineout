"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lazyload = require("../utils/lazyload");

var iframeStyle = {
  position: 'absolute',
  left: 0,
  width: 0,
  height: '100%',
  border: 0
};

var Expand =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Expand, _PureComponent);

  function Expand(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.bindElement = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindIframe = _this.bindIframe.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setHeight = _this.setHeight.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Expand.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.setHeight();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.props.setExpandHeight(0);
  };

  _proto.setHeight = function setHeight() {
    if (this.element) {
      this.props.setExpandHeight(this.element.clientHeight);
    }
  };

  _proto.bindElement = function bindElement(el) {
    this.element = el;
  };

  _proto.bindIframe = function bindIframe(el) {
    if (el && el.contentWindow) {
      el.contentWindow.onresize = (0, _lazyload.throttleWrapper)(this.setHeight);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        colSpan = _this$props.colSpan,
        children = _this$props.children;
    return _react.default.createElement("tr", {
      ref: this.bindElement
    }, _react.default.createElement("td", {
      style: {
        padding: 0
      },
      colSpan: colSpan
    }, _react.default.createElement("iframe", {
      title: "scroll",
      ref: this.bindIframe,
      style: iframeStyle
    }), children));
  };

  return Expand;
}(_react.PureComponent);

Expand.propTypes = {
  children: _propTypes.default.any,
  colSpan: _propTypes.default.number,
  setExpandHeight: _propTypes.default.func
};
var _default = Expand;
exports.default = _default;