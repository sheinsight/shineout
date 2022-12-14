import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import immer from 'immer';
import Spin from '../Spin';
import { imageClass } from './styles';
import { PureComponent } from '../component';

var Magnify =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Magnify, _PureComponent);

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
    _this.handleMove = _this.handleMove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleResize = _this.handleResize.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleLoaded = _this.handleLoaded.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
    this.setState(immer(function (state) {
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
    return React.createElement("div", {
      onClick: this.handleResize,
      onMouseMove: onMouseMove,
      ref: function ref(el) {
        _this3.element = el;
      },
      style: style,
      className: imageClass('magnify')
    }, React.createElement("img", {
      onLoad: this.handleLoaded,
      src: src,
      alt: "",
      style: this.state.style
    }), loading && React.createElement("div", {
      className: imageClass('magnify-loading')
    }, React.createElement(Spin, {
      size: 30
    })));
  };

  return Magnify;
}(PureComponent);

Magnify.propTypes = {
  lockScroll: PropTypes.func,
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  position: PropTypes.string,
  src: PropTypes.string
};
export default Magnify;