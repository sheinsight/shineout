import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { throttleWrapper } from '../utils/lazyload';
var iframeStyle = {
  position: 'absolute',
  left: 0,
  width: 0,
  height: '100%',
  border: 0
};

var Expand =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Expand, _PureComponent);

  function Expand(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.bindElement = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindIframe = _this.bindIframe.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setHeight = _this.setHeight.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Expand.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.setHeight();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.props.setExpandHeight(0);
  };

  _proto.setHeight = function setHeight() {
    if (this.element) {
      this.props.setExpandHeight(this.element.clientHeight);
    }
  };

  _proto.bindElement = function bindElement(el) {
    this.element = el;
  };

  _proto.bindIframe = function bindIframe(el) {
    if (el && el.contentWindow) {
      el.contentWindow.onresize = throttleWrapper(this.setHeight);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        colSpan = _this$props.colSpan,
        children = _this$props.children;
    return React.createElement("tr", {
      ref: this.bindElement
    }, React.createElement("td", {
      style: {
        padding: 0
      },
      colSpan: colSpan
    }, React.createElement("iframe", {
      title: "scroll",
      ref: this.bindIframe,
      style: iframeStyle
    }), children));
  };

  return Expand;
}(PureComponent);

Expand.propTypes = {
  children: PropTypes.any,
  colSpan: PropTypes.number,
  setExpandHeight: PropTypes.func
};
export default Expand;