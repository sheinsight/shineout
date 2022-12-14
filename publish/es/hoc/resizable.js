import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import immer from 'immer';
import { resizableClass } from './styles';
import { getUidStr } from '../utils/uid';
import { curry } from '../utils/func';
export default curry(function (Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(Resizable, _React$Component);

    function Resizable(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.state = {
        x: 0,
        y: 0
      };
      _this.resizableId = getUidStr();
      _this.handleMouseUp = _this.handleMouseUp.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleMouseMove = _this.handleMouseMove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
      this.setState(immer(function (draft) {
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
      this.el = document.querySelector("." + resizableClass(this.resizableId));
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

        handler.className = resizableClass('handler', "handler-" + dir);
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
          others = _objectWithoutPropertiesLoose(_this$props, ["resizable", "className", "style"]);

      if (!resizable) return React.createElement(Origin, this.props);
      var ms = Object.assign({}, style, this.getStyle());
      var mc = classnames(className, resizableClass('_', this.resizableId));
      return React.createElement(Origin, _extends({}, others, {
        style: ms,
        className: mc
      }));
    };

    return Resizable;
  }(React.Component), _defineProperty(_class, "propTypes", {
    style: PropTypes.object,
    className: PropTypes.string,
    resizable: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
  }), _temp;
});