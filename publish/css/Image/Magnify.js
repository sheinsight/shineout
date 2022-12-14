"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immer = _interopRequireDefault(require("immer"));

var _Spin = _interopRequireDefault(require("../Spin"));

var _styles = require("./styles");

var _component = require("../component");

var Magnify =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Magnify, _PureComponent);

  function Magnify(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      loading: true,
      status: 0,
      style: {
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth
      }
    };
    _this.handleMove = _this.handleMove.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleResize = _this.handleResize.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleLoaded = _this.handleLoaded.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Magnify.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src && this.state.status === 1) {
      // eslint-disable-next-line
      this.setState({
        loading: true,
        status: 0,
        style: {
          maxHeight: this.props.maxHeight,
          maxWidth: this.props.maxWidth
        }
      });
      this.props.lockScroll(false);
    }
  };

  _proto.move = function move(clientX, clientY) {
    var rect = this.element.getBoundingClientRect();
    var image = this.element.querySelector('img');
    var width = rect.width - 100;
    var height = rect.height - 100;
    var x = (clientX - rect.left - 50) / width;
    var y = (clientY - rect.top - 50) / height;
    this.element.scrollTop = (image.offsetHeight - height) * y;
    this.element.scrollLeft = (image.offsetWidth - width) * x;
  };

  _proto.handleLoaded = function handleLoaded() {
    this.setState({
      loading: false
    });
  };

  _proto.handleMove = function handleMove(e) {
    this.move(e.clientX, e.clientY);
  };

  _proto.handleResize = function handleResize(e) {
    var _this2 = this;

    var _this$props = this.props,
        maxHeight = _this$props.maxHeight,
        maxWidth = _this$props.maxWidth,
        position = _this$props.position;
    if (position !== 'center') return;
    var status = this.state.status === 1 ? 0 : 1;
    var clientX = e.clientX,
        clientY = e.clientY;
    this.setState((0, _immer.default)(function (state) {
      state.status = status;
      state.style = status === 0 ? {
        maxHeight: maxHeight,
        maxWidth: maxWidth
      } : undefined;
    }), function () {
      if (status === 0) return;

      _this2.move(clientX, clientY);
    });
    this.props.lockScroll(status === 1);
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props2 = this.props,
        maxHeight = _this$props2.maxHeight,
        maxWidth = _this$props2.maxWidth,
        src = _this$props2.src;
    var _this$state = this.state,
        status = _this$state.status,
        loading = _this$state.loading; // eslint-disable-next-line

    var cursor = this.props.position === 'center' ? status === 1 ? 'zoom-out' : 'zoom-in' : 'pointer';
    var style = {
      maxHeight: maxHeight,
      maxWidth: maxWidth,
      cursor: cursor
    };

    if (status === 1) {
      style.overflow = 'scroll';
      style.borderRightWidth = 0;
      style.borderBottomWidth = 0;
    }

    var onMouseMove = status === 1 ? this.handleMove : undefined;
    return _react.default.createElement("div", {
      onClick: this.handleResize,
      onMouseMove: onMouseMove,
      ref: function ref(el) {
        _this3.element = el;
      },
      style: style,
      className: (0, _styles.imageClass)('magnify')
    }, _react.default.createElement("img", {
      onLoad: this.handleLoaded,
      src: src,
      alt: "",
      style: this.state.style
    }), loading && _react.default.createElement("div", {
      className: (0, _styles.imageClass)('magnify-loading')
    }, _react.default.createElement(_Spin.default, {
      size: 30
    })));
  };

  return Magnify;
}(_component.PureComponent);

Magnify.propTypes = {
  lockScroll: _propTypes.default.func,
  maxHeight: _propTypes.default.number,
  maxWidth: _propTypes.default.number,
  position: _propTypes.default.string,
  src: _propTypes.default.string
};
var _default = Magnify;
exports.default = _default;