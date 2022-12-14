import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import immer from 'immer';
import { PureComponent } from '../component';
import normalizeWheel from '../utils/dom/normalizeWheel';
import { imageClass } from './styles';
import icons from '../icons';
import Magnify from './Magnify';
import { docSize } from '../utils/dom/document';

var Gallery =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Gallery, _PureComponent);

  function Gallery(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      current: props.current,
      direction: 'init'
    };
    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.lockScroll = _this.lockScroll.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
    this.setState(immer(function (draft) {
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
    var wheel = normalizeWheel(e);
    this.scrollX += wheel.spinX;
    if (this.scrollX < 0) this.handleClick(-1);
    if (this.scrollX > 0) this.handleClick(1);
    this.scrollTimer = setTimeout(function () {
      _this3.scrollX = 0;
    }, 1000);
  };

  _proto.renderImage = function renderImage(image, pos) {
    var windowHeight = docSize.height;
    var windowWidth = docSize.width;
    var onClick;

    if (pos !== 'center') {
      onClick = this.handleClick.bind(this, pos === 'left' ? -1 : 1);
    }

    return React.createElement("div", {
      key: image.key,
      className: imageClass(pos, this.state.direction),
      onClick: onClick
    }, React.createElement("a", {
      onClick: this.props.onClose,
      className: imageClass('close')
    }, icons.Close), React.createElement(Magnify, {
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
    result.push(React.createElement("div", {
      key: "overlay",
      className: imageClass('overlay'),
      onClick: onClose
    }));
    result.push(this.renderImage(currentImage, 'center'));
    if (images[current - 1]) result.push(this.renderImage(images[current - 1], 'left'));
    if (images[current + 1]) result.push(this.renderImage(images[current + 1], 'right'));
    return result;
  };

  return Gallery;
}(PureComponent);

Gallery.propTypes = {
  current: PropTypes.number,
  images: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired
};
Gallery.defaultProps = {
  current: 0
};
export default Gallery;