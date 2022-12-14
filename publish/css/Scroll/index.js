"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _component = require("../component");

var _Scroll = _interopRequireDefault(require("./Scroll"));

var _default =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(_default, _PureComponent);

  function _default(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      left: props.scrollLeft || 0,
      top: props.scrollTop || 0
    };
    _this.handleScroll = _this.handleScroll.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = _default.prototype;

  _proto.getRect = function getRect() {
    var left = this.props.scrollLeft === undefined ? this.state.left : this.props.scrollLeft;
    var top = this.props.scrollTop === undefined ? this.state.top : this.props.scrollTop;
    return {
      left: left,
      top: top
    };
  };

  _proto.handleScroll = function handleScroll(x, y) {
    var left = this.scrollX ? x : 0;
    var top = this.scrollY ? y : 0;
    this.setState({
      left: left,
      top: top
    });

    if (this.props.onScroll) {
      var _this$props;

      for (var _len = arguments.length, others = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        others[_key - 2] = arguments[_key];
      }

      (_this$props = this.props).onScroll.apply(_this$props, [left, top].concat(others));
    }
  };

  _proto.render = function render() {
    var _this$getRect = this.getRect(),
        left = _this$getRect.left,
        top = _this$getRect.top;

    return _react.default.createElement(_Scroll.default, (0, _extends2.default)({}, this.props, {
      left: left,
      top: top,
      scrollX: this.scrollX,
      scrollY: this.scrollY,
      onScroll: this.handleScroll
    }));
  };

  (0, _createClass2.default)(_default, [{
    key: "scrollX",
    get: function get() {
      var scroll = this.props.scroll;
      return scroll === 'x' || scroll === 'both';
    }
  }, {
    key: "scrollY",
    get: function get() {
      var scroll = this.props.scroll;
      return scroll === 'y' || scroll === 'both';
    }
  }]);
  return _default;
}(_component.PureComponent);

exports.default = _default;
(0, _defineProperty2.default)(_default, "displayName", 'ShineoutScroll');
(0, _defineProperty2.default)(_default, "propTypes", {
  onScroll: _propTypes.default.func,
  scroll: _propTypes.default.oneOf(['x', 'y', 'both', '']),
  scrollLeft: _propTypes.default.number,
  scrollTop: _propTypes.default.number
});
(0, _defineProperty2.default)(_default, "defaultProps", {
  scroll: 'both'
});