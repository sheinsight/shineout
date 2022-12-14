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

var _document = require("../utils/dom/document");

var _styles = require("./styles");

var _uid = require("../utils/uid");

var _func = require("../utils/func");

var DIS_LIMIT = 50;

var _default = (0, _func.curry)(function (handler, Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inheritsLoose2.default)(Moveable, _React$Component);

    function Moveable(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.state = {
        x: 0,
        y: 0,
        draging: false
      };
      _this.moveabledId = (0, _uid.getUidStr)();
      _this.handleMouseDown = _this.handleMouseDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.handleMouseMove = _this.handleMouseMove.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.handleMouseUp = _this.handleMouseUp.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      return _this;
    }

    var _proto = Moveable.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this.bindEvent();
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      if (this.el) {
        this.el.removeEventListener('mousedown', this.handleMouseDown);
      }
    };

    _proto.getStyle = function getStyle() {
      var _this$state = this.state,
          x = _this$state.x,
          y = _this$state.y;
      if (!this.hasDragged) return undefined;
      return {
        transform: "translate(" + x + "px, " + y + "px)"
      };
    };

    _proto.bindEvent = function bindEvent() {
      this.el = document.querySelector("." + (0, _styles.moveableClass)(this.moveabledId));
      if (!this.el) return;
      this.el.addEventListener('mousedown', this.handleMouseDown);
      this.handlerEl = handler ? this.el.querySelector(handler) || this.el : this.el;
    };

    _proto.handleMouseDown = function handleMouseDown(e) {
      if (e.button !== 0 || !this.el) return;
      if (handler && !e.target.matches(handler)) return;
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
      document.addEventListener('mouseleave', this.handleMouseUp);

      if (!this.handlerPos) {
        this.handlerPos = this.handlerEl.getBoundingClientRect();
      }

      this.hasDragged = true;
      this.setState({
        draging: true
      });
    };

    _proto.handleMouseMove = function handleMouseMove(e) {
      var _this2 = this;

      this.setState(function (prev) {
        var x = prev.x + e.movementX;
        var y = prev.y + e.movementY;

        if (_this2.handlerPos.right + x < DIS_LIMIT || _this2.handlerPos.left + x > _document.docSize.width - DIS_LIMIT) {
          // eslint-disable-next-line prefer-destructuring
          x = prev.x;
        }

        if (_this2.handlerPos.bottom + y < DIS_LIMIT || _this2.handlerPos.top + y > _document.docSize.height - DIS_LIMIT) {
          // eslint-disable-next-line prefer-destructuring
          y = prev.y;
        }

        return {
          x: x,
          y: y
        };
      });
    };

    _proto.handleMouseUp = function handleMouseUp() {
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
      document.removeEventListener('mouseleave', this.handleMouseUp);
      this.setState({
        draging: false
      });
    };

    _proto.render = function render() {
      var _this$props = this.props,
          moveable = _this$props.moveable,
          others = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["moveable"]);
      if (!moveable) return _react.default.createElement(Origin, others);
      var ms = Object.assign({}, this.props.style, this.getStyle());
      var mc = (0, _classnames.default)(this.props.className, (0, _styles.moveableClass)('_', this.moveabledId, this.state.draging && 'draging'));
      return _react.default.createElement(Origin, (0, _extends2.default)({}, others, {
        style: ms,
        className: mc
      }));
    };

    return Moveable;
  }(_react.default.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    style: _propTypes.default.object,
    className: _propTypes.default.string,
    moveable: _propTypes.default.bool
  }), _temp;
});

exports.default = _default;