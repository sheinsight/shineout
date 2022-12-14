import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PureComponent } from '../component';
import { inputTitleClass } from './styles';

var InputTitle =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(InputTitle, _PureComponent);

  function InputTitle(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      animation: false
    };
    _this.stopAnimation = _this.stopAnimation.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = InputTitle.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      this.startAnimation();
    }
  };

  _proto.startAnimation = function startAnimation() {
    this.setState({
      animation: true
    });
  };

  _proto.stopAnimation = function stopAnimation() {
    this.setState({
      animation: false
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        innerTitle = _this$props.innerTitle,
        className = _this$props.className,
        style = _this$props.style,
        children = _this$props.children,
        open = _this$props.open,
        titleClass = _this$props.titleClass,
        contentClass = _this$props.contentClass,
        placeTitle = _this$props.placeTitle;
    if (!innerTitle) return children;
    var animation = this.state.animation;
    return React.createElement("div", {
      style: style,
      className: classnames(inputTitleClass('_', open && 'open', animation && 'animation'), className)
    }, React.createElement("div", {
      onAnimationEnd: this.stopAnimation,
      className: classnames(inputTitleClass('title', 'top'), titleClass)
    }, innerTitle), React.createElement("div", {
      className: classnames(contentClass, inputTitleClass('content'))
    }, children), React.createElement("div", {
      onAnimationEnd: this.stopAnimation,
      className: inputTitleClass('place')
    }, React.createElement("div", {
      className: classnames(inputTitleClass('title'))
    }, placeTitle || innerTitle)));
  };

  return InputTitle;
}(PureComponent);

InputTitle.propTypes = {
  innerTitle: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  open: PropTypes.bool,
  titleClass: PropTypes.string,
  placeTitle: PropTypes.node,
  contentClass: PropTypes.string
};
export default InputTitle;