import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import { scrollClass } from '../Scroll/styles';
import { compareColumns } from '../utils/shallowEqual';
import { Component } from '../component';
export default (function (Table) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(_class, _Component);

    function _class(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        fixed: null
      };
      _this.bindWrapper = _this.bindWrapper.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.resetAutoFixedState = _this.resetAutoFixedState.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = _class.prototype;

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      var _this2 = this;

      var diff = ['fixed', 'width', 'height', 'data'].find(function (k) {
        return _this2.props[k] && prevProps[k] !== _this2.props[k];
      });
      var reset = !compareColumns(prevProps.columns, this.props.columns) || diff;

      if (reset) {
        this.setState({
          fixed: null
        });
      }
    };

    _proto.getFixed = function getFixed() {
      if (this.state.fixed !== null) return this.state.fixed;
      if (this.props.fixed === 'auto') return 'both';
      return this.props.fixed;
    };

    _proto.bindWrapper = function bindWrapper(wrapper) {
      this.wrapper = wrapper;
    };

    _proto.resetFixed = function resetFixed() {
      if (!this.wrapper) return;
      var verticalHandle = this.wrapper.querySelector("." + scrollClass('y') + "." + scrollClass('show'));
      var horizontalHandle = this.wrapper.querySelector("." + scrollClass('x') + "." + scrollClass('show'));
      if (verticalHandle && horizontalHandle) return;
      var fixed;
      if (horizontalHandle) fixed = 'x';else if (verticalHandle) fixed = 'y';
      this.setState({
        fixed: fixed
      });
    };

    _proto.fixedAuto = function fixedAuto() {
      if (this.props.fixed !== 'auto' || this.state.fixed !== null) return;
      this.resetFixed();
    };

    _proto.resetAutoFixedState = function resetAutoFixedState() {
      this.setState({
        fixed: null
      });
    };

    _proto.render = function render() {
      var fixed = this.getFixed();
      setTimeout(this.fixedAuto.bind(this));
      return React.createElement(Table, _extends({}, this.props, {
        fixed: fixed,
        bindWrapper: this.bindWrapper,
        resetFixAuto: this.resetAutoFixedState
      }));
    };

    return _class;
  }(Component), _defineProperty(_class, "propTypes", {
    fixed: PropTypes.oneOf(['x', 'y', 'both', 'auto']),
    data: PropTypes.array,
    columns: PropTypes.array
  }), _temp;
});