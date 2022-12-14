import _extends from "@babel/runtime/helpers/extends";
import _createClass from "@babel/runtime/helpers/createClass";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import { PureComponent } from '../component';
import Scroll from './Scroll';

var _default =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(_default, _PureComponent);

  function _default(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      left: props.scrollLeft || 0,
      top: props.scrollTop || 0
    };
    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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

    return React.createElement(Scroll, _extends({}, this.props, {
      left: left,
      top: top,
      scrollX: this.scrollX,
      scrollY: this.scrollY,
      onScroll: this.handleScroll
    }));
  };

  _createClass(_default, [{
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
}(PureComponent);

_defineProperty(_default, "displayName", 'ShineoutScroll');

_defineProperty(_default, "propTypes", {
  onScroll: PropTypes.func,
  scroll: PropTypes.oneOf(['x', 'y', 'both', '']),
  scrollLeft: PropTypes.number,
  scrollTop: PropTypes.number
});

_defineProperty(_default, "defaultProps", {
  scroll: 'both'
});

export { _default as default };