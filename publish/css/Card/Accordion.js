"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _component = require("../component");

var _styles = require("./styles");

var _config = require("../config");

var getChildId = function getChildId(child, i) {
  if (child && child.props && child.props.id !== undefined) return child.props.id;
  return i;
};

var Accordion =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Accordion, _PureComponent);

  function Accordion(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      active: props.active || props.defaultActive
    };
    return _this;
  }

  var _proto = Accordion.prototype;

  _proto.getActive = function getActive() {
    if (this.props.active !== undefined) return this.props.active;
    return this.state.active;
  };

  _proto.handleActive = function handleActive(active) {
    if (active === this.state.active) active = null;
    this.setState({
      active: active
    });
    if (this.props.onChange) this.props.onChange(active);
  };

  _proto.render = function render() {
    var _this2 = this;

    var active = this.getActive();
    return _react.Children.toArray(this.props.children).map(function (child, i) {
      var childId = getChildId(child, i);
      var props = {
        collapsed: active !== childId,
        collapsible: true,
        className: (0, _classnames.default)(typeof child === 'object' && child.className, (0, _styles.cardClass)('accordion', _config.isRTL && 'accordion-rtl')),
        onCollapse: _this2.handleActive.bind(_this2, childId)
      };
      return (0, _react.cloneElement)(child, props);
    });
  };

  return Accordion;
}(_component.PureComponent);

Accordion.propTypes = {
  active: _propTypes.default.any,
  children: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.array]),
  defaultActive: _propTypes.default.any,
  onChange: _propTypes.default.func
};
Accordion.defaultProps = {
  defaultActive: 0
};
var _default = Accordion;
exports.default = _default;