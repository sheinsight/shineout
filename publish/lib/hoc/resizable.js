"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _immer = _interopRequireDefault(require("immer"));

var _styles = require("./styles");

var _uid = require("../utils/uid");

var _func = require("../utils/func");

var _default = (0, _func.curry)(function (Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inheritsLoose2.default)(Resizable, _React$Component);

    function Resizable(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.state = {
        x: 0,
        y: 0
      };
      _this.resizableId = (0, _uid.getUidStr)();
      _this.handleMouseUp = _this.handleMouseUp.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.handleMouseMove = _this.handleMouseMove.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      return _this;
    }

    var _proto = Resizable.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this.appendHandler();
    };

    _proto.componentDidUpdate = function componentDidUpdate() {
      if (this.props.resizable) {
        this.appendHandler();
      }
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      if (this.handlers) {
        this.handlers.forEach(function (action, handler) {
          return handler.removeEventListener('mousedown', action);
        });
      }
    };

    _proto.getStyle = function getStyle() {
      var _this$state = this.state,
          x = _this$state.x,
          y = _this$state.y;
      if (!this.size) return undefined;
      return {
        width: this.size.width + x,
        height: this.size.height + y
      };
    };

    _proto.handleMouseMove = function handleMouseMove(e) {
      var _this2 = this;

      var x = e.movementX;
      var y = e.movementY;
      if (!this.active) return;
      this.setState((0, _immer.default)(function (draft) {
        x += draft.x;
        y += draft.y;
        if (_this2.active.indexOf('x') >= 0) draft.x = x;
        if (_this2.active.indexOf('y') >= 0) draft.y = y;
      }));
    };

    _proto.handleMouseDown = function handleMouseDown(dir) {
      this.active = dir;
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
      document.addEventListener('mouseleave', this.handleMouseUp);
    };

    _proto.handleMouseUp = function handleMouseUp() {
      this.active = undefined;
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
      document.removeEventListener('mouseleave', this.handleMouseUp);
    };

    _proto.appendHandler = function appendHandler() {
      var _this3 = this;

      var resizable = this.props.resizable;
      if (!resizable || this.appended) return;
      this.appended = true;
      this.el = document.querySelector("." + (0, _styles.resizableClass)(this.resizableId));
      if (!this.el) return;
      this.size = {
        width: this.el.clientWidth,
        height: this.el.clientHeight
      };
      this.handlers = new Map();
      ['x', 'y', 'xy'].forEach(function (dir) {
        if (typeof resizable === 'string' && resizable !== dir) return;
        var handler = document.createElement('div');

        var action = _this3.handleMouseDown.bind(_this3, dir);

        handler.className = (0, _styles.resizableClass)('handler', "handler-" + dir);
        handler.addEventListener('mousedown', action);

        _this3.el.appendChild(handler);

        _this3.handlers.set(handler, action);
      });
    };

    _proto.render = function render() {
      var _this$props = this.props,
          resizable = _this$props.resizable,
          className = _this$props.className,
          style = _this$props.style,
          others = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["resizable", "className", "style"]);
      if (!resizable) return _react.default.createElement(Origin, this.props);
      var ms = Object.assign({}, style, this.getStyle());
      var mc = (0, _classnames.default)(className, (0, _styles.resizableClass)('_', this.resizableId));
      return _react.default.createElement(Origin, (0, _extends2.default)({}, others, {
        style: ms,
        className: mc
      }));
    };

    return Resizable;
  }(_react.default.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    style: _propTypes.default.object,
    className: _propTypes.default.string,
    resizable: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string])
  }), _temp;
});

exports.default = _default;