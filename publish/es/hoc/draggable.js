import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { curry } from '../utils/func';
export default curry(function (OriginComponent) {
  var Drag =
  /*#__PURE__*/
  function (_PureComponent) {
    _inheritsLoose(Drag, _PureComponent);

    function Drag(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this.handleDragStart = _this.handleDragStart.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleDrag = _this.handleDrag.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleDragEnd = _this.handleDragEnd.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
      return React.createElement(OriginComponent, _extends({}, this.props, {
        onDragStart: this.handleDragStart
      }));
    };

    return Drag;
  }(PureComponent);

  Drag.propTypes = {
    client: PropTypes.object,
    onDragStart: PropTypes.func,
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func
  };
  Drag.defaultProps = {
    client: undefined,
    onDragStart: function onDragStart() {},
    onDrag: function onDrag() {},
    onDragEnd: function onDragEnd() {}
  };
  return Drag;
});