"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.IMAGE = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _component = require("../component");

var _lazyload = require("../utils/lazyload");

var _styles = require("./styles");

var _events = _interopRequireDefault(require("./events"));

var _locale = require("../locale");

var _config = _interopRequireDefault(require("../config"));

var _strings = require("../utils/strings");

var _getDataset = _interopRequireDefault(require("../utils/dom/getDataset"));

var PLACEHOLDER = 0;
var SRC = 1;
var ALT = 2;
var ERROR = 3;

var Image =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Image, _PureComponent);

  function Image(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      status: PLACEHOLDER
    };
    _this.bindElement = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.markToRender = _this.markToRender.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleAlt = _this.handleAlt.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Image.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    this.fetchImage();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props = this.props,
        src = _this$props.src,
        alt = _this$props.alt;

    if (prevProps.src !== src || prevProps.alt !== alt) {
      this.fetchImage();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    (0, _lazyload.removeStack)(this.lazyId);
    delete this.image;
  };

  _proto.getUrl = function getUrl(url) {
    var autoSSL = 'autoSSL' in this.props ? this.props.autoSSL : _config.default.autoSSL;
    if (autoSSL) return (0, _strings.removeProtocol)(url);
    return url;
  };

  _proto.preview = function preview() {
    var _this$props2 = this.props,
        src = _this$props2.src,
        href = _this$props2.href;
    (0, _events.default)({
      thumb: src,
      src: href || src,
      key: 'key'
    });
  };

  _proto.bindElement = function bindElement(el) {
    this.element = el;
  };

  _proto.fetchImage = function fetchImage() {
    if (this.lazyId) (0, _lazyload.removeStack)(this.lazyId);

    if (!this.props.lazy) {
      this.markToRender();
    } else {
      var container = this.props.container;
      this.lazyId = (0, _lazyload.addStack)({
        offset: typeof this.props.lazy === 'number' ? this.props.lazy : 0,
        element: this.element,
        render: this.markToRender,
        container: typeof container === 'string' ? document.querySelector(container) : container
      });
    }
  };

  _proto.markToRender = function markToRender() {
    var _this2 = this;

    var src = this.props.src;

    if (!src) {
      this.handleAlt();
      return;
    }

    delete this.image;
    var image = new window.Image();

    image.onload = function () {
      return _this2.setState({
        status: SRC
      });
    };

    image.onerror = this.handleError.bind(this, SRC);
    image.src = this.getUrl(src);
    this.image = image;
  };

  _proto.handleError = function handleError(type, e) {
    var onError = this.props.onError;
    if (onError) onError(e, type);
    if (type === SRC) this.handleAlt();else if (type === ALT) this.setState({
      status: ERROR
    });
  };

  _proto.handleAlt = function handleAlt() {
    var _this3 = this;

    var alt = this.props.alt;

    if (!alt) {
      this.setState({
        status: ERROR
      });
      return;
    }

    var image = new window.Image();

    image.onload = function () {
      return _this3.setState({
        status: ALT
      });
    };

    image.onerror = this.handleError.bind(this, ALT);
    image.src = this.getUrl(alt);
  };

  _proto.handleClick = function handleClick(e) {
    var _this$props3 = this.props,
        onClick = _this$props3.onClick,
        target = _this$props3.target,
        src = _this$props3.src,
        href = _this$props3.href;

    if (onClick) {
      onClick(e);
      return;
    }

    if (href && target === '_modal') {
      e.preventDefault();
      (0, _events.default)({
        thumb: src,
        src: href || src,
        key: 'key'
      });
    }
  };

  _proto.renderType = function renderType(src) {
    var _this$props4 = this.props,
        title = _this$props4.title,
        fit = _this$props4.fit;
    return fit === 'fill' || fit === 'fit' ? _react.default.createElement("div", {
      className: (0, _styles.imageClass)('inner'),
      title: title,
      style: {
        backgroundImage: "url(\"" + src + "\")"
      }
    }) : _react.default.createElement("div", {
      className: (0, _styles.imageClass)('inner'),
      title: title
    }, _react.default.createElement("img", {
      alt: "",
      src: src
    }));
  };

  _proto.renderPlaceholder = function renderPlaceholder() {
    var _this$props5 = this.props,
        placeholder = _this$props5.placeholder,
        title = _this$props5.title;

    if (_react.default.isValidElement(placeholder)) {
      return _react.default.createElement("div", {
        className: (0, _styles.imageClass)('inner')
      }, placeholder);
    }

    return _react.default.createElement("div", {
      className: (0, _styles.imageClass)('inner', 'mask')
    }, _react.default.createElement("div", null, title, _react.default.createElement("span", {
      className: (0, _styles.imageClass)('placeholder')
    }, placeholder || (0, _locale.getLocale)('loading'))));
  };

  _proto.renderImage = function renderImage() {
    var status = this.state.status;
    var _this$props6 = this.props,
        alt = _this$props6.alt,
        src = _this$props6.src,
        title = _this$props6.title,
        error = _this$props6.error;

    switch (status) {
      case PLACEHOLDER:
        return this.renderPlaceholder();

      case SRC:
        return this.renderType(src);

      case ALT:
        return this.renderType(alt);

      case ERROR:
        return _react.default.createElement("div", {
          className: (0, _styles.imageClass)('inner', 'mask')
        }, _react.default.createElement("div", null, error || title || (0, _locale.getLocale)('notFound')));

      default:
        return null;
    }
  };

  _proto.render = function render() {
    var _this$props7 = this.props,
        href = _this$props7.href,
        height = _this$props7.height,
        style = _this$props7.style,
        shape = _this$props7.shape,
        fit = _this$props7.fit,
        width = _this$props7.width,
        target = _this$props7.target;
    var className = (0, _classnames.default)((0, _styles.imageClass)('_', shape, fit), this.props.className);
    var Tag = href ? 'a' : 'div';
    var props = (0, _objectSpread2.default)({
      ref: this.bindElement,
      onClick: this.handleClick,
      target: target === '_download' ? '_self' : target,
      download: target === '_download',
      className: className,
      style: Object.assign({}, style, {
        width: width,
        paddingBottom: height
      })
    }, (0, _getDataset.default)(this.props));
    if (!href || target !== '_modal') props.href = href;
    return _react.default.createElement(Tag, props, this.renderImage());
  };

  return Image;
}(_component.PureComponent);

Image.propTypes = {
  alt: _propTypes.default.string,
  className: _propTypes.default.string,
  height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  href: _propTypes.default.string,
  lazy: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.number]),
  onClick: _propTypes.default.func,
  placeholder: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.string]),
  shape: _propTypes.default.oneOf(['rounded', 'circle', 'thumbnail']),
  src: _propTypes.default.string,
  style: _propTypes.default.object,
  target: _propTypes.default.oneOf(['_blank', '_self', '_modal', '_download']),
  title: _propTypes.default.string,
  fit: _propTypes.default.oneOf(['fill', 'fit', 'stretch', 'center']),
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  container: _propTypes.default.string,
  error: _propTypes.default.node,
  autoSSL: _propTypes.default.bool,
  onError: _propTypes.default.func
};
Image.defaultProps = {
  lazy: false,
  target: '_modal',
  width: '100%',
  height: '100%'
};
var IMAGE = {};
exports.IMAGE = IMAGE;
Image.symbolType = IMAGE;
var _default = Image;
exports.default = _default;