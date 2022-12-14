import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import { Component } from '../component';
import { noti } from '../config';
export default (function (Com, name) {
  return (
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(_class, _Component);

      function _class(props) {
        var _this;

        _this = _Component.call(this, props) || this;
        _this.handleUpdate = _this.forceUpdate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        noti.subscribe(name, _this.handleUpdate);
        return _this;
      }

      var _proto = _class.prototype;

      _proto.componentWillUnmount = function componentWillUnmount() {
        noti.unsubscribe(name, this.handleUpdate);
      };

      _proto.render = function render() {
        return React.createElement(Com, this.props);
      };

      return _class;
    }(Component)
  );
});