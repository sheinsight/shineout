import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PureComponent } from '../component';
import { addStack, removeStack } from '../utils/lazyload';
import { imageClass } from './styles';
import showGallery from './events';
import { getLocale } from '../locale';
import config from '../config';
import { removeProtocol } from '../utils/strings';
import getDataset from '../utils/dom/getDataset';
var PLACEHOLDER = 0;
var SRC = 1;
var ALT = 2;
var ERROR = 3;

var Image =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Image, _PureComponent);

  function Image(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      status: PLACEHOLDER
    };
    _this.bindElement = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.markToRender = _this.markToRender.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleAlt = _this.handleAlt.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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

    removeStack(this.lazyId);
    delete this.image;
  };

  _proto.getUrl = function getUrl(url) {
    var autoSSL = 'autoSSL' in this.props ? this.props.autoSSL : config.autoSSL;
    if (autoSSL) return removeProtocol(url);
    return url;
  };

  _proto.preview = function preview() {
    var _this$props2 = this.props,
        src = _this$props2.src,
        href = _this$props2.href;
    showGallery({
      thumb: src,
      src: href || src,
      key: 'key'
    });
  };

  _proto.bindElement = function bindElement(el) {
    this.element = el;
  };

  _proto.fetchImage = function fetchImage() {
    if (this.lazyId) removeStack(this.lazyId);

    if (!this.props.lazy) {
      this.markToRender();
    } else {
      var container = this.props.container;
      this.lazyId = addStack({
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
      showGallery({
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
    return fit === 'fill' || fit === 'fit' ? React.createElement("div", {
      className: imageClass('inner'),
      title: title,
      style: {
        backgroundImage: "url(\"" + src + "\")"
      }
    }) : React.createElement("div", {
      className: imageClass('inner'),
      title: title
    }, React.createElement("img", {
      alt: "",
      src: src
    }));
  };

  _proto.renderPlaceholder = function renderPlaceholder() {
    var _this$props5 = this.props,
        placeholder = _this$props5.placeholder,
        title = _this$props5.title;

    if (React.isValidElement(placeholder)) {
      return React.createElement("div", {
        className: imageClass('inner')
      }, placeholder);
    }

    return React.createElement("div", {
      className: imageClass('inner', 'mask')
    }, React.createElement("div", null, title, React.createElement("span", {
      className: imageClass('placeholder')
    }, placeholder || getLocale('loading'))));
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
        return React.createElement("div", {
          className: imageClass('inner', 'mask')
        }, React.createElement("div", null, error || title || getLocale('notFound')));

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
    var className = classnames(imageClass('_', shape, fit), this.props.className);
    var Tag = href ? 'a' : 'div';

    var props = _objectSpread({
      ref: this.bindElement,
      onClick: this.handleClick,
      target: target === '_download' ? '_self' : target,
      download: target === '_download',
      className: className,
      style: Object.assign({}, style, {
        width: width,
        paddingBottom: height
      })
    }, getDataset(this.props));

    if (!href || target !== '_modal') props.href = href;
    return React.createElement(Tag, props, this.renderImage());
  };

  return Image;
}(PureComponent);

Image.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  href: PropTypes.string,
  lazy: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  onClick: PropTypes.func,
  placeholder: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  shape: PropTypes.oneOf(['rounded', 'circle', 'thumbnail']),
  src: PropTypes.string,
  style: PropTypes.object,
  target: PropTypes.oneOf(['_blank', '_self', '_modal', '_download']),
  title: PropTypes.string,
  fit: PropTypes.oneOf(['fill', 'fit', 'stretch', 'center']),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  container: PropTypes.string,
  error: PropTypes.node,
  autoSSL: PropTypes.bool,
  onError: PropTypes.func
};
Image.defaultProps = {
  lazy: false,
  target: '_modal',
  width: '100%',
  height: '100%'
};
export var IMAGE = {};
Image.symbolType = IMAGE;
export default Image;