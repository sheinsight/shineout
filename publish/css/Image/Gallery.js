"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immer = _interopRequireDefault(require("immer"));

var _component = require("../component");

var _normalizeWheel = _interopRequireDefault(require("../utils/dom/normalizeWheel"));

var _styles = require("./styles");

var _icons = _interopRequireDefault(require("../icons"));

var _Magnify = _interopRequireDefault(require("./Magnify"));

var _document = require("../utils/dom/document");

var Gallery =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Gallery, _PureComponent);

  function Gallery(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      current: props.current,
      direction: 'init'
    };
    _this.handleScroll = _this.handleScroll.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.lockScroll = _this.lockScroll.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.scrollX = 0;
    _this.rawScroll = false;
    return _this;
  }

  var _proto = Gallery.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    document.addEventListener('wheel', this.handleScroll, {
      passive: false
    });
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    document.removeEventListener('wheel', this.handleScroll, {
      passive: false
    });
  };

  _proto.lockScroll = function lockScroll(status) {
    this.rawScroll = status;
  };

  _proto.handleClick = function handleClick(direction) {
    var _this2 = this;

    var length = this.props.images.length;
    this.setState((0, _immer.default)(function (draft) {
      draft.current += direction;
      if (draft.current < 0) draft.current = 0;else if (draft.current >= length) draft.current = length - 1;else draft.direction = direction === 1 ? 'forward' : 'backward';
    }), function () {
      setTimeout(function () {
        _this2.setState({
          direction: 'init'
        });
      }, 400);
    });
  };

  _proto.handleScroll = function handleScroll(e) {
    var _this3 = this;

    if (this.rawScroll) return;
    e.preventDefault();
    if (this.scrollX !== 0) return;
    var wheel = (0, _normalizeWheel.default)(e);
    this.scrollX += wheel.spinX;
    if (this.scrollX < 0) this.handleClick(-1);
    if (this.scrollX > 0) this.handleClick(1);
    this.scrollTimer = setTimeout(function () {
      _this3.scrollX = 0;
    }, 1000);
  };

  _proto.renderImage = function renderImage(image, pos) {
    var windowHeight = _document.docSize.height;
    var windowWidth = _document.docSize.width;
    var onClick;

    if (pos !== 'center') {
      onClick = this.handleClick.bind(this, pos === 'left' ? -1 : 1);
    }

    return _react.default.createElement("div", {
      key: image.key,
      className: (0, _styles.imageClass)(pos, this.state.direction),
      onClick: onClick
    }, _react.default.createElement("a", {
      onClick: this.props.onClose,
      className: (0, _styles.imageClass)('close')
    }, _icons.default.Close), _react.default.createElement(_Magnify.default, {
      maxWidth: windowWidth - 400,
      maxHeight: windowHeight - 160,
      position: pos,
      src: image.src,
      lockScroll: this.lockScroll
    }));
  };

  _proto.render = function render() {
    var current = this.state.current;
    var _this$props = this.props,
        images = _this$props.images,
        onClose = _this$props.onClose;
    var currentImage = images[current];
    var result = [];
    result.push(_react.default.createElement("div", {
      key: "overlay",
      className: (0, _styles.imageClass)('overlay'),
      onClick: onClose
    }));
    result.push(this.renderImage(currentImage, 'center'));
    if (images[current - 1]) result.push(this.renderImage(images[current - 1], 'left'));
    if (images[current + 1]) result.push(this.renderImage(images[current + 1], 'right'));
    return result;
  };

  return Gallery;
}(_component.PureComponent);

Gallery.propTypes = {
  current: _propTypes.default.number,
  images: _propTypes.default.array.isRequired,
  onClose: _propTypes.default.func.isRequired
};
Gallery.defaultProps = {
  current: 0
};
var _default = Gallery;
exports.default = _default;