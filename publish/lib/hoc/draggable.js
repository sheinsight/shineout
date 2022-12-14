"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _func = require("../utils/func");

var _default = (0, _func.curry)(function (OriginComponent) {
  var Drag =
  /*#__PURE__*/
  function (_PureComponent) {
    (0, _inheritsLoose2.default)(Drag, _PureComponent);

    function Drag(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this.handleDragStart = _this.handleDragStart.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.handleDrag = _this.handleDrag.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.handleDragEnd = _this.handleDragEnd.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      return _this;
    }

    var _proto = Drag.prototype;

    _proto.componentDidMount = function componentDidMount() {
      var client = this.props.client;

      if (client) {
        this.clientX = client.x;
        this.clientY = client.y;
        this.dragging = true;
        this.addEvents();
        this.props.onDragStart(true);
      }
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.removeEvents();
    };

    _proto.addEvents = function addEvents() {
      document.addEventListener('mousemove', this.handleDrag);
      document.addEventListener('mouseup', this.handleDragEnd);
      document.addEventListener('mouseleave', this.handleDragEnd);
    };

    _proto.removeEvents = function removeEvents() {
      document.removeEventListener('mousemove', this.handleDrag);
      document.removeEventListener('mouseup', this.handleDragEnd);
      document.removeEventListener('mouseleave', this.handleDragEnd);
    };

    _proto.handleDragStart = function handleDragStart(e) {
      if (e.button !== 0) return;
      this.clientX = e.clientX;
      this.clientY = e.clientY;
      this.dragging = true;
      this.addEvents();
      this.props.onDragStart(true);
    };

    _proto.handleDrag = function handleDrag(e) {
      if (!this.dragging) return;
      if (e.clientX === 0 && e.clientY === 0) return;
      var mx = e.clientX - this.clientX;
      var my = e.clientY - this.clientY;
      if (mx === 0 && my === 0) return;
      this.clientX = e.clientX;
      this.clientY = e.clientY;
      this.props.onDrag(mx, my, e.clientX, e.clientY);
    };

    _proto.handleDragEnd = function handleDragEnd() {
      if (!this.dragging) return;
      this.dragging = false;
      this.removeEvents();
      this.props.onDragEnd(false);
    };

    _proto.render = function render() {
      return _react.default.createElement(OriginComponent, (0, _extends2.default)({}, this.props, {
        onDragStart: this.handleDragStart
      }));
    };

    return Drag;
  }(_react.PureComponent);

  Drag.propTypes = {
    client: _propTypes.default.object,
    onDragStart: _propTypes.default.func,
    onDrag: _propTypes.default.func,
    onDragEnd: _propTypes.default.func
  };
  Drag.defaultProps = {
    client: undefined,
    onDragStart: function onDragStart() {},
    onDrag: function onDrag() {},
    onDragEnd: function onDragEnd() {}
  };
  return Drag;
});

exports.default = _default;