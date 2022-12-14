"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _component = require("../component");

var _styles = require("./styles");

var _lazyload = require("../utils/lazyload");

var Lazyload =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Lazyload, _PureComponent);

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
    this.lazyId = (0, _lazyload.addStack)({
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
    (0, _lazyload.removeStack)(this.lazyId);
  };

  _proto.render = function render() {
    var ready = this.state.ready;
    var _this$props2 = this.props,
        children = _this$props2.children,
        placeholder = _this$props2.placeholder;
    if (ready) return children;
    return _react.default.createElement("span", {
      ref: this.placeholderRef,
      className: (0, _styles.lazyloadClass)('_')
    }, placeholder);
  };

  return Lazyload;
}(_component.PureComponent);

Lazyload.propTypes = {
  children: _propTypes.default.any,
  placeholder: _propTypes.default.element,
  container: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.object]),
  offset: _propTypes.default.number
};
Lazyload.defaultProps = {
  offset: 0
};
var _default = Lazyload;
exports.default = _default;