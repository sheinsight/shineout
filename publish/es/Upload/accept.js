import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
export default (function (Component) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inheritsLoose(_class, _React$PureComponent);

    function _class() {
      return _React$PureComponent.apply(this, arguments) || this;
    }

    var _proto = _class.prototype;

    _proto.render = function render() {
      var _this$props = this.props,
          forceAccept = _this$props.forceAccept,
          accept = _this$props.accept;
      return React.createElement(Component, _extends({}, this.props, {
        accept: forceAccept || accept,
        forceAccept: !!forceAccept
      }));
    };

    return _class;
  }(React.PureComponent), _defineProperty(_class, "propTypes", {
    accept: PropTypes.string,
    forceAccept: PropTypes.string
  }), _temp;
});