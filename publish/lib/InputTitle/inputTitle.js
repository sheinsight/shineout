"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _component = require("../component");

var _styles = require("./styles");

var InputTitle =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(InputTitle, _PureComponent);

  function InputTitle(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      animation: false
    };
    _this.stopAnimation = _this.stopAnimation.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
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
    return _react.default.createElement("div", {
      style: style,
      className: (0, _classnames.default)((0, _styles.inputTitleClass)('_', open && 'open', animation && 'animation'), className)
    }, _react.default.createElement("div", {
      onAnimationEnd: this.stopAnimation,
      className: (0, _classnames.default)((0, _styles.inputTitleClass)('title', 'top'), titleClass)
    }, innerTitle), _react.default.createElement("div", {
      className: (0, _classnames.default)(contentClass, (0, _styles.inputTitleClass)('content'))
    }, children), _react.default.createElement("div", {
      onAnimationEnd: this.stopAnimation,
      className: (0, _styles.inputTitleClass)('place')
    }, _react.default.createElement("div", {
      className: (0, _classnames.default)((0, _styles.inputTitleClass)('title'))
    }, placeTitle || innerTitle)));
  };

  return InputTitle;
}(_component.PureComponent);

InputTitle.propTypes = {
  innerTitle: _propTypes.default.node,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  children: _propTypes.default.node,
  open: _propTypes.default.bool,
  titleClass: _propTypes.default.string,
  placeTitle: _propTypes.default.node,
  contentClass: _propTypes.default.string
};
var _default = InputTitle;
exports.default = _default;