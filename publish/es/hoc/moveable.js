import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { docSize } from '../utils/dom/document';
import { moveableClass } from './styles';
import { getUidStr } from '../utils/uid';
import { curry } from '../utils/func';
var DIS_LIMIT = 50;
export default curry(function (handler, Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(Moveable, _React$Component);

    function Moveable(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.state = {
        x: 0,
        y: 0,
        draging: false
      };
      _this.moveabledId = getUidStr();
      _this.handleMouseDown = _this.handleMouseDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleMouseMove = _this.handleMouseMove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleMouseUp = _this.handleMouseUp.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
      this.el = document.querySelector("." + moveableClass(this.moveabledId));
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

        if (_this2.handlerPos.right + x < DIS_LIMIT || _this2.handlerPos.left + x > docSize.width - DIS_LIMIT) {
          // eslint-disable-next-line prefer-destructuring
          x = prev.x;
        }

        if (_this2.handlerPos.bottom + y < DIS_LIMIT || _this2.handlerPos.top + y > docSize.height - DIS_LIMIT) {
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
          others = _objectWithoutPropertiesLoose(_this$props, ["moveable"]);

      if (!moveable) return React.createElement(Origin, others);
      var ms = Object.assign({}, this.props.style, this.getStyle());
      var mc = classnames(this.props.className, moveableClass('_', this.moveabledId, this.state.draging && 'draging'));
      return React.createElement(Origin, _extends({}, others, {
        style: ms,
        className: mc
      }));
    };

    return Moveable;
  }(React.Component), _defineProperty(_class, "propTypes", {
    style: PropTypes.object,
    className: PropTypes.string,
    moveable: PropTypes.bool
  }), _temp;
});