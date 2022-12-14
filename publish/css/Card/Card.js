"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _proptypes = require("../utils/proptypes");

var _element = require("../utils/dom/element");

var _styles = require("./styles");

var _context = require("./context");

var _func = require("../utils/func");

var _resizable = _interopRequireDefault(require("../hoc/resizable"));

var _moveable = _interopRequireDefault(require("../hoc/moveable"));

var _styles2 = require("../Modal/styles");

var _config = require("../config");

var Card =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Card, _PureComponent);

  function Card(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      collapsed: props.defaultCollapsed,
      formStatus: ''
    };
    _this.bindElement = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleSubmit = _this.handleSubmit.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleCollapse = _this.handleCollapse.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setFormStatus = _this.setFormStatus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Card.prototype;

  _proto.getCollapsed = function getCollapsed() {
    var _this$props = this.props,
        collapsible = _this$props.collapsible,
        collapsed = _this$props.collapsed;
    if (!collapsible) return undefined;
    return collapsed !== undefined ? collapsed : this.state.collapsed;
  };

  _proto.setFormStatus = function setFormStatus(status) {
    if (status !== this.state.formStatus) {
      this.setState({
        formStatus: status
      });
    }
  };

  _proto.bindElement = function bindElement(el) {
    this.element = el;
    var forwardedRef = this.props.forwardedRef;
    if (forwardedRef) forwardedRef(el);
  };

  _proto.handleCollapse = function handleCollapse() {
    var collapsed = !this.getCollapsed();
    if (this.props.onCollapse) this.props.onCollapse(collapsed);else this.setState({
      collapsed: collapsed
    });
  };

  _proto.handleSubmit = function handleSubmit(target) {
    var form = this.element.querySelector('form');
    if (form) (0, _element.dispatchEvent)(form, 'submit', target);else console.error(new Error('No form found.'));
  };

  _proto.render = function render() {
    var collapsible = this.props.collapsible;
    var collapsed = this.getCollapsed();
    var shadow = this.props.shadow === true ? 'shadow' : this.props.shadow;
    var className = (0, _classnames.default)((0, _styles.cardClass)('_', shadow, collapsible && 'collapsible', collapsed && 'collapsed', (0, _config.isRTL)() && 'rtl'), this.props.className);
    var provierValue = {
      onCollapse: this.handleCollapse,
      collapsible: collapsible,
      collapsed: collapsed,
      formStatus: this.state.formStatus,
      onSubmit: this.handleSubmit,
      setFormStatus: this.setFormStatus
    };
    return _react.default.createElement("div", {
      className: className,
      ref: this.bindElement,
      style: this.props.style
    }, _react.default.createElement(_context.Provider, {
      value: provierValue
    }, this.props.children));
  };

  return Card;
}(_react.PureComponent);

Card.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default), {
  shadow: _propTypes.default.oneOf([true, false, 'hover']),
  forwardedRef: _propTypes.default.func
});
Card.defaultProps = (0, _objectSpread2.default)({}, _proptypes.defaultProps, {
  defaultCollapsed: true,
  collapsible: false
});

var _default = (0, _func.compose)((0, _moveable.default)("." + (0, _styles.cardClass)('header') + ", ." + (0, _styles2.modalClass)('method-title')), _resizable.default)(Card);

exports.default = _default;