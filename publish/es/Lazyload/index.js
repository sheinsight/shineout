import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React from 'react';
import PropTypes from 'prop-types';
import { PureComponent } from '../component';
import { lazyloadClass } from './styles';
import { addStack, removeStack } from '../utils/lazyload';

var Lazyload =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Lazyload, _PureComponent);

  function Lazyload(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      ready: false
    };

    _this.placeholderRef = function (el) {
      _this.placeholder = el;
    };

    return _this;
  }

  var _proto = Lazyload.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var _this$props = this.props,
        container = _this$props.container,
        offset = _this$props.offset;
    this.lazyId = addStack({
      offset: offset,
      container: container,
      element: this.placeholder,
      render: function render() {
        return _this2.setState({
          ready: true
        });
      }
    });
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    removeStack(this.lazyId);
  };

  _proto.render = function render() {
    var ready = this.state.ready;
    var _this$props2 = this.props,
        children = _this$props2.children,
        placeholder = _this$props2.placeholder;
    if (ready) return children;
    return React.createElement("span", {
      ref: this.placeholderRef,
      className: lazyloadClass('_')
    }, placeholder);
  };

  return Lazyload;
}(PureComponent);

Lazyload.propTypes = {
  children: PropTypes.any,
  placeholder: PropTypes.element,
  container: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  offset: PropTypes.number
};
Lazyload.defaultProps = {
  offset: 0
};
export default Lazyload;